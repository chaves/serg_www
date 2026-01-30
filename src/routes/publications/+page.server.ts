import type { PageServerLoad } from './$types';

// Keep publications page dynamic due to external HAL API
export const prerender = false;

// HAL Official API - no bot protection, returns JSON
const HAL_API_URL =
	'https://api.archives-ouvertes.fr/search/?q=collCode_s:LGI-ED&wt=json&fl=title_s,authFullName_s,producedDateY_i,docType_s,uri_s,journalTitle_s,conferenceTitle_s,bookTitle_s,files_s,doiId_s,halId_s&rows=1000&sort=producedDateY_i desc,docType_s asc';

// Document type labels for display
const DOC_TYPE_LABELS: Record<string, string> = {
	ART: 'Journal Articles',
	COMM: 'Conference Papers',
	POSTER: 'Posters',
	OUV: 'Books',
	COUV: 'Book Chapters',
	DOUV: 'Book Directions',
	PATENT: 'Patents',
	THESE: 'PhD Theses',
	HDR: 'HDR Theses',
	UNDEFINED: 'Working Papers',
	OTHER: 'Other Publications'
};

// Document type sort order
const DOC_TYPE_ORDER: Record<string, number> = {
	ART: 1,
	COMM: 2,
	POSTER: 3,
	OUV: 4,
	COUV: 5,
	DOUV: 6,
	PATENT: 7,
	THESE: 8,
	HDR: 9,
	UNDEFINED: 10,
	OTHER: 11
};

export interface Publication {
	id: string;
	title: string;
	authors: string[];
	year: number;
	type: string;
	typeLabel: string;
	url: string;
	journal?: string;
	conference?: string;
	book?: string;
	doi?: string;
	pdfUrl?: string;
}

export interface PublicationsByYear {
	year: number;
	byType: {
		type: string;
		typeLabel: string;
		publications: Publication[];
	}[];
}

interface HALDocument {
	halId_s?: string;
	title_s?: string[];
	authFullName_s?: string[];
	producedDateY_i?: number;
	docType_s?: string;
	uri_s?: string;
	journalTitle_s?: string;
	conferenceTitle_s?: string;
	bookTitle_s?: string;
	files_s?: string[];
	doiId_s?: string;
}

interface HALResponse {
	response: {
		numFound: number;
		start: number;
		docs: HALDocument[];
	};
}

interface CacheEntry {
	data: PublicationsByYear[];
	timestamp: number;
	totalCount: number;
}

// In-memory cache
let cache: CacheEntry | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function transformHALData(halResponse: HALResponse): { publications: PublicationsByYear[]; totalCount: number } {
	const docs = halResponse.response.docs;
	const totalCount = halResponse.response.numFound;

	// Transform documents to our Publication format
	const publications: Publication[] = docs.map((doc) => {
		const type = doc.docType_s || 'OTHER';
		return {
			id: doc.halId_s || doc.uri_s || '',
			title: doc.title_s?.[0] || 'Untitled',
			authors: doc.authFullName_s || [],
			year: doc.producedDateY_i || new Date().getFullYear(),
			type,
			typeLabel: DOC_TYPE_LABELS[type] || 'Other Publications',
			url: doc.uri_s || '',
			journal: doc.journalTitle_s,
			conference: doc.conferenceTitle_s,
			book: doc.bookTitle_s,
			doi: doc.doiId_s,
			pdfUrl: doc.files_s?.[0]
		};
	});

	// Group by year, then by type
	const byYear = new Map<number, Map<string, Publication[]>>();

	for (const pub of publications) {
		if (!byYear.has(pub.year)) {
			byYear.set(pub.year, new Map());
		}
		const yearMap = byYear.get(pub.year)!;
		if (!yearMap.has(pub.type)) {
			yearMap.set(pub.type, []);
		}
		yearMap.get(pub.type)!.push(pub);
	}

	// Convert to sorted array structure
	const result: PublicationsByYear[] = Array.from(byYear.entries())
		.sort(([a], [b]) => b - a) // Sort years descending
		.map(([year, typeMap]) => ({
			year,
			byType: Array.from(typeMap.entries())
				.sort(([a], [b]) => (DOC_TYPE_ORDER[a] || 99) - (DOC_TYPE_ORDER[b] || 99))
				.map(([type, pubs]) => ({
					type,
					typeLabel: DOC_TYPE_LABELS[type] || 'Other Publications',
					publications: pubs
				}))
		}));

	return { publications: result, totalCount };
}

async function fetchHALPublications(fetchFn: typeof fetch): Promise<{ publications: PublicationsByYear[]; totalCount: number }> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30000);

	try {
		const response = await fetchFn(HAL_API_URL, {
			signal: controller.signal,
			headers: {
				Accept: 'application/json'
			}
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HAL API returned ${response.status} ${response.statusText}`);
		}

		const data: HALResponse = await response.json();
		return transformHALData(data);
	} catch (error) {
		clearTimeout(timeoutId);
		throw error;
	}
}

function isCacheValid(): boolean {
	if (!cache) return false;
	return Date.now() - cache.timestamp < CACHE_DURATION;
}

export const load: PageServerLoad = async ({ fetch, url }) => {
	const forceRefresh = url.searchParams.get('refresh') === '1';

	try {
		// Check cache first (skip if force refresh requested)
		if (!forceRefresh && isCacheValid() && cache) {
			return {
				publications: cache.data,
				totalCount: cache.totalCount,
				cached: true,
				cacheTimestamp: cache.timestamp
			};
		}

		// Fetch fresh data from HAL API
		const { publications, totalCount } = await fetchHALPublications(fetch);

		// Update cache
		cache = {
			data: publications,
			totalCount,
			timestamp: Date.now()
		};

		return {
			publications,
			totalCount,
			cached: false,
			cacheTimestamp: Date.now()
		};
	} catch (error) {
		console.error('Error fetching HAL publications:', error);

		// Return cached data as fallback
		if (cache) {
			return {
				publications: cache.data,
				totalCount: cache.totalCount,
				cached: true,
				cacheTimestamp: cache.timestamp,
				error: `Using cached content: ${error instanceof Error ? error.message : 'Unknown error'}`
			};
		}

		return {
			publications: null,
			totalCount: 0,
			error: `Failed to load publications: ${error instanceof Error ? error.message : 'Unknown error'}`
		};
	}
};

