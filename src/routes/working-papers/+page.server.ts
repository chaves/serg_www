// src/routes/people/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('https://cms.serg.paris/api/working-papers?sort[0]=year:desc&sort[1]=createdAt:desc&populate=*');

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await response.json();

		return {
			papers: data.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			papers: null,
			error: (error as Error).message
		};
	}
};
