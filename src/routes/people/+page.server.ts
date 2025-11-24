// src/routes/people/+page.server.ts
import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS
		// Explicitly request published content with publicationState=live
		const response = await fetch(`${CMS_BASE_URL}/api/people?publicationState=live&sort=last_name:asc&pagination[pageSize]=1000&populate=*`, NO_CACHE_FETCH_OPTIONS);

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
