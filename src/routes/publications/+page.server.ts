import type { PageServerLoad } from './$types';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';
import https from 'https';
import { URL } from 'url';

// Keep publications page dynamic due to external HAL API
// This page is not prerendered and uses server-side rendering
export const prerender = false;

const HAL_URL =
	'https://haltools.archives-ouvertes.fr/Public/afficheRequetePubli.php?typdoc=(\'ART\',\'COMM\',\'POSTER\',\'OUV\',\'COUV\',\'DOUV\',\'PATENT\',\'THESE\',\'HDR\')&collection_exp=LGI-ED&CB_auteur=oui&CB_titre=oui&CB_article=oui&langue=Anglais&tri_exp=annee_publi&tri_exp2=typdoc&tri_exp3=date_publi&ordre_aff=TA&CB_rubriqueDiv=oui&Fen=Aff&css=../css/VisuOmbreVignettes.css';

interface CacheEntry {
	html: string;
	timestamp: number;
}

// In-memory cache (in production, consider using Redis or a file-based cache)
let cache: CacheEntry | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function extractBodyContent(html: string): string {
	// Extract content from the body, specifically the #res_script div
	const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
	if (!bodyMatch) return html;

	const bodyContent = bodyMatch[1];

	// Find the opening div with id="res_script"
	const resScriptStart = bodyContent.search(/<div[^>]*id=["']res_script["'][^>]*>/i);
	if (resScriptStart === -1) {
		return bodyContent;
	}

	// Find the position after the opening tag
	const afterOpenTag = bodyContent.indexOf('>', resScriptStart) + 1;

	// Now we need to find the matching closing </div> tag
	// We'll count opening and closing divs to find the matching one
	let depth = 1;
	let pos = afterOpenTag;

	while (pos < bodyContent.length && depth > 0) {
		const nextOpen = bodyContent.indexOf('<div', pos);
		const nextClose = bodyContent.indexOf('</div>', pos);

		if (nextClose === -1) {
			// No more closing tags, return everything from start to end
			return bodyContent.substring(afterOpenTag);
		}

		if (nextOpen !== -1 && nextOpen < nextClose) {
			// Found an opening div before the closing one
			depth++;
			pos = bodyContent.indexOf('>', nextOpen) + 1;
		} else {
			// Found a closing div
			depth--;
			if (depth === 0) {
				// This is the matching closing tag
				return bodyContent.substring(afterOpenTag, nextClose);
			}
			pos = nextClose + 6; // Move past '</div>'
		}
	}

	// If we couldn't find a matching closing tag, return everything from the start
	return bodyContent.substring(afterOpenTag);
}

/**
 * Fetch using https module as fallback when fetch API fails (e.g., SSL issues)
 */
function fetchWithHttps(url: string, timeout: number = 30000): Promise<string> {
	return new Promise((resolve, reject) => {
		const parsedUrl = new URL(url);
		const options = {
			hostname: parsedUrl.hostname,
			path: parsedUrl.pathname + parsedUrl.search,
			method: 'GET',
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; SERG-Bot/1.0)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': '0'
			},
			// Allow self-signed or problematic certificates (HAL's certificate chain might have issues)
			rejectUnauthorized: false
		};

		const timeoutId = setTimeout(() => {
			req.destroy();
			reject(new Error(`Request timeout after ${timeout}ms`));
		}, timeout);

		const req = https.request(options, (res) => {
			if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
				clearTimeout(timeoutId);
				reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage || ''}`));
				return;
			}

			let data = '';
			res.on('data', (chunk) => {
				data += chunk.toString();
			});

			res.on('end', () => {
				clearTimeout(timeoutId);
				if (!data || data.trim().length === 0) {
					reject(new Error('HAL returned empty content'));
					return;
				}
				resolve(data);
			});
		});

		req.on('error', (err) => {
			clearTimeout(timeoutId);
			reject(new Error(`HTTPS request failed: ${err.message}`));
		});

		req.end();
	});
}

async function fetchHALContent(fetchFn: typeof fetch, retries: number = 2): Promise<string> {
	const FETCH_TIMEOUT = 30000; // 30 seconds
	let lastError: Error | null = null;

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			// Create an AbortController for timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

			try {
				// Merge headers properly - use plain object for better compatibility
				const headers = {
					...(NO_CACHE_FETCH_OPTIONS.headers as Record<string, string>),
					'User-Agent': 'Mozilla/5.0 (compatible; SERG-Bot/1.0)',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
				};

				const response = await fetchFn(HAL_URL, {
					...NO_CACHE_FETCH_OPTIONS,
					signal: controller.signal,
					headers
				});

				clearTimeout(timeoutId);

				if (!response.ok) {
					throw new Error(`HTTP ${response.status} ${response.statusText}`);
				}

				const html = await response.text();

				if (!html || html.trim().length === 0) {
					throw new Error('HAL returned empty content');
				}

				// Extract just the body content
				const extractedContent = extractBodyContent(html);

				if (!extractedContent || extractedContent.trim().length === 0) {
					throw new Error('Could not extract content from HAL response');
				}

				return extractedContent;
			} catch (fetchError) {
				clearTimeout(timeoutId);

				// Don't retry on certain errors
				if (fetchError instanceof Error) {
					// Don't retry on HTTP errors (4xx, 5xx) - these won't change
					if (fetchError.message.startsWith('HTTP 4') || fetchError.message.startsWith('HTTP 5')) {
						throw fetchError;
					}

					// Don't retry on content extraction errors
					if (fetchError.message.includes('empty content') || fetchError.message.includes('Could not extract')) {
						throw fetchError;
					}

					// If fetch fails with network/SSL error, try https module as fallback
					if (
						(fetchError instanceof TypeError && fetchError.message.includes('fetch')) ||
						fetchError.message.includes('certificate') ||
						fetchError.message.includes('SSL') ||
						fetchError.message.includes('TLS')
					) {
						console.warn('Fetch API failed, trying https module fallback...', fetchError.message);
						try {
							const html = await fetchWithHttps(HAL_URL, FETCH_TIMEOUT);
							const extractedContent = extractBodyContent(html);

							if (!extractedContent || extractedContent.trim().length === 0) {
								throw new Error('Could not extract content from HAL response');
							}

							return extractedContent;
						} catch (httpsError) {
							// If https module also fails, continue with retry logic
							lastError = httpsError instanceof Error ? httpsError : new Error(String(httpsError));
							if (attempt < retries) {
								const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
								console.warn(`HAL fetch attempt ${attempt + 1} failed, retrying in ${delay}ms...`, lastError?.message);
								await new Promise(resolve => setTimeout(resolve, delay));
								continue;
							}
							throw httpsError;
						}
					}

					lastError = fetchError;
				} else {
					lastError = new Error(String(fetchError));
				}

				// If this is not the last attempt, wait before retrying
				if (attempt < retries) {
					const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // Exponential backoff, max 5s
					console.warn(`HAL fetch attempt ${attempt + 1} failed, retrying in ${delay}ms...`, lastError?.message);
					await new Promise(resolve => setTimeout(resolve, delay));
					continue;
				}

				throw fetchError;
			}
		} catch (error) {
			// If we've exhausted all retries, throw the last error with context
			if (attempt === retries) {
				console.error(`Error fetching HAL content after ${retries + 1} attempts:`, error);
				console.error('HAL URL:', HAL_URL);

				if (error instanceof Error) {
					// Provide more context in the error message
					let errorMessage = error.message;

					if (error.name === 'AbortError') {
						errorMessage = `Request timeout after ${FETCH_TIMEOUT}ms - HAL server may be slow or unreachable`;
					} else if (error instanceof TypeError && error.message.includes('fetch')) {
						errorMessage = `Network error: Unable to connect to HAL server. This could be due to network issues, DNS problems, or the HAL server being down. Original error: ${error.message}`;
					} else if (!errorMessage.includes('Failed to fetch HAL publications')) {
						errorMessage = `Failed to fetch HAL publications: ${errorMessage}`;
					}

					throw new Error(errorMessage);
				}
				throw new Error('Failed to fetch HAL publications: Unknown error occurred');
			}
		}
	}

	// This should never be reached, but TypeScript needs it
	throw lastError || new Error('Failed to fetch HAL publications: Unknown error occurred');
}

function isCacheValid(): boolean {
	if (!cache) return false;
	const now = Date.now();
	return now - cache.timestamp < CACHE_DURATION;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Check if we have valid cached content
		if (isCacheValid() && cache) {
			return {
				halContent: cache.html,
				cached: true,
				cacheTimestamp: cache.timestamp
			};
		}

		// Fetch fresh content using SvelteKit's fetch
		const html = await fetchHALContent(fetch);

		// Update cache
		cache = {
			html,
			timestamp: Date.now()
		};

		return {
			halContent: html,
			cached: false,
			cacheTimestamp: Date.now()
		};
	} catch (error) {
		console.error('Error loading HAL content:', error);
		// Return cached content even if expired, as fallback
		if (cache) {
			return {
				halContent: cache.html,
				cached: true,
				cacheTimestamp: cache.timestamp,
				error: `Using cached content due to fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`
			};
		}
		return {
			halContent: null,
			error: `Failed to load publications content: ${error instanceof Error ? error.message : 'Unknown error'}`
		};
	}
};

