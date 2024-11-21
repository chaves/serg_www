import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {

  const title = params.title; // assuming `title` is part of the route parameters

	try {
		const response = await fetch(
			`http://cms.serg.paris/api/events?filters[slug][$eq]=${title}&populate=*`
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch event data for slug: ${title}`);
		}

		const data = await response.json();
		console.log(data.data[0]);
		return {
			event: data.data[0] // return the first matching event
		};
	} catch (error) {
		console.error('Error fetching event:', error);
		return {
			event: null
		};
	}
};
