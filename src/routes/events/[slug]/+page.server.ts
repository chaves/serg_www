import type { PageServerLoad } from './$types';
import type { EventsResponse } from '$types/events';
import { CMS_BASE_URL } from '$lib/config';
import { fetchAllSlugs } from '$lib/cms';
import { error } from '@sveltejs/kit';

// Prerender all event pages
export const prerender = true;

// Dynamic entries: fetch all event slugs at build time
export const entries = async () =>
	(await fetchAllSlugs('events')).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const response = await fetch(
		`${CMS_BASE_URL}/api/events?publicationState=live&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
	);

	if (!response.ok) {
		throw error(
			response.status === 404 ? 404 : 502,
			`Failed to fetch event for slug "${slug}"`
		);
	}

	const data: EventsResponse = await response.json();
	const eventData = data.data?.[0];

	if (!eventData) {
		throw error(404, `Event "${slug}" not found`);
	}

	return {
		event: eventData
	};
};
