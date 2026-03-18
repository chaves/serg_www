import type { PageServerLoad } from './$types';
import type { CemsiResponse } from '$types/cemsi';
import { CMS_BASE_URL } from '$lib/config';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	// This page is prerendered, so load() only runs at build time
	// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
	// Explicitly request published content with publicationState=live
	const response = await fetch(`${CMS_BASE_URL}/api/cemsi?publicationState=live`);

	if (!response.ok) {
		throw error(502, 'Failed to fetch CEMSI data');
	}

	const data: CemsiResponse = await response.json();

	return {
		cemsi: data.data
	};
};
