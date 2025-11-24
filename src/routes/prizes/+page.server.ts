// src/routes/people/+page.server.ts
import type { PrizesResponse } from '../../types/prizes';
import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS
		// Explicitly request published content with publicationState=live
		const response = await fetch(
			`${CMS_BASE_URL}/api/prizes?publicationState=live&sort[0]=year:desc&sort[1]=last_name&populate=*&pagination[pageSize]=1000`,
			NO_CACHE_FETCH_OPTIONS
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: PrizesResponse = await response.json();

		return {
			prizes: data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			prizes: null,
			error: (error as Error).message
		};
	}
};
