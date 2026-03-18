import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';
import { error } from '@sveltejs/kit';

// Prerender all news pages
export const prerender = true;

// Dynamic entries: fetch all news slugs at build time
export const entries = async () => {
	const response = await fetch(
		`${CMS_BASE_URL}/api/news?publicationState=live&fields[0]=slug`,
		NO_CACHE_FETCH_OPTIONS
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch news entries: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data.data?.map((article: { slug: string }) => ({ slug: article.slug })) || [];
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const response = await fetch(
		`${CMS_BASE_URL}/api/news?publicationState=live&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
	);

	if (!response.ok) {
		throw error(
			response.status === 404 ? 404 : 502,
			`Failed to fetch news article for slug "${slug}"`
		);
	}

	const data = await response.json();
	const article = data.data?.[0];

	if (!article) {
		throw error(404, `News article "${slug}" not found`);
	}

	return {
		new: article
	};
};
