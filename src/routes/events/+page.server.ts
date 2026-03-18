import type { EventsResponse } from '$types/events';
import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	// This page is prerendered, so load() only runs at build time
	// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
	// Explicitly request published content with publicationState=live
	const response = await fetch(
		`${CMS_BASE_URL}/api/events?publicationState=live&sort=date_start:desc&populate=*`
	);

	if (!response.ok) {
		throw error(502, 'Failed to fetch events data');
	}

	const data: EventsResponse = await response.json();

	return {
		events: data.data
	};
};
