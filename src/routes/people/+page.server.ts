// src/routes/people/+page.server.ts
import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('https://cms.serg.paris/api/people?populate=*&pagination[pageSize]=1000');

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: PeopleResponse = await response.json();

		return {
			people: data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			people: null,
			error: (error as Error).message
		};
	}
};
