import type { PageServerLoad } from './$types';
import type { NewsResponse } from '$types/news';
import { CMS_BASE_URL } from '$lib/config';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	// This page is prerendered, so load() only runs at build time
	// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
	// Explicitly request published content with publicationState=live
	const response = await fetch(
		`${CMS_BASE_URL}/api/news?publicationState=live&sort=createdAt:desc&populate=*`
	);

	if (!response.ok) {
		throw error(502, 'Failed to fetch news data');
	}

	const data: NewsResponse = await response.json();

	return {
		news: data.data
	};
};
