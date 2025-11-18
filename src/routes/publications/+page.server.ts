import type { PageServerLoad } from './$types';

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

async function fetchHALContent(): Promise<string> {
	try {
		const response = await fetch(HAL_URL, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; SERG-Bot/1.0)'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch HAL content: ${response.status}`);
		}

		const html = await response.text();
		// Extract just the body content
		return extractBodyContent(html);
	} catch (error) {
		console.error('Error fetching HAL content:', error);
		throw error;
	}
}

function isCacheValid(): boolean {
	if (!cache) return false;
	const now = Date.now();
	return now - cache.timestamp < CACHE_DURATION;
}

export const load: PageServerLoad = async () => {
	try {
		// Check if we have valid cached content
		if (isCacheValid() && cache) {
			return {
				halContent: cache.html,
				cached: true,
				cacheTimestamp: cache.timestamp
			};
		}

		// Fetch fresh content
		const html = await fetchHALContent();

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
				error: 'Using cached content due to fetch error'
			};
		}
		return {
			halContent: null,
			error: 'Failed to load publications content'
		};
	}
};

