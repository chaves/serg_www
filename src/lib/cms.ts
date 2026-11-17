import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

/** Strapi's REST maxLimit (config/api.js in the CMS). */
const PAGE_SIZE = 1000;

/**
 * Fetches the slugs of every published entry of a Strapi collection, across
 * all result pages. Entries without a slug are skipped with a warning: one
 * incomplete entry must not fail the whole build.
 */
export async function fetchAllSlugs(collection: string): Promise<string[]> {
	const slugs: string[] = [];

	for (let page = 1, pageCount = 1; page <= pageCount; page++) {
		const url = `${CMS_BASE_URL}/api/${collection}?publicationState=live&fields[0]=slug&fields[1]=documentId&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
		const response = await fetch(url, NO_CACHE_FETCH_OPTIONS);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch ${collection} slugs: ${response.status} ${response.statusText}`
			);
		}

		const body: {
			data?: { slug?: string | null; documentId?: string }[];
			meta?: { pagination?: { pageCount?: number } };
		} = await response.json();

		for (const entry of body.data ?? []) {
			if (entry.slug?.trim()) {
				slugs.push(entry.slug);
			} else {
				console.warn(`[cms] ${collection} ${entry.documentId ?? '?'} has no slug, page skipped`);
			}
		}

		pageCount = body.meta?.pagination?.pageCount ?? 1;
	}

	return slugs;
}

/** Drops entries without a slug, so list pages never link to `/…/null`. */
export const withSlug = <T extends { slug?: string | null }>(items: T[] | null | undefined): T[] =>
	(items ?? []).filter((item) => item.slug?.trim());
