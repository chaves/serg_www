import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	// This page is prerendered, so load() only runs at build time
	// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
	// Explicitly request published content with publicationState=live
	const response = await fetch(
		`${CMS_BASE_URL}/api/working-papers?publicationState=live&sort[0]=year:desc&sort[1]=createdAt:desc&populate=*`
	);

	if (!response.ok) {
		throw error(502, 'Failed to fetch working papers data');
	}

	const data = await response.json();

	return {
		papers: data.data
	};
};
