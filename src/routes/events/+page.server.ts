// src/routes/people/+page.server.ts
import type { EventsResponse } from '$types/events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('https://cms.serg.paris/api/events?sort=date_start:desc&populate=*');

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: EventsResponse = await response.json();

		return {
			events: data.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			people: null,
			error: (error as Error).message
		};
	}
};
