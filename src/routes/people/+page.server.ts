import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';
import { CMS_BASE_URL } from '$lib/config';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// This page is prerendered, so load() only runs at build time
		// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
		// Explicitly request published content with publicationState=live
		const response = await fetch(
			`${CMS_BASE_URL}/api/people?publicationState=live&sort=last_name:asc&pagination[pageSize]=1000&populate=*`
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: PeopleResponse = await response.json();

		return {
			people: data.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			people: null,
			error: (error as Error).message
		};
	}
};
