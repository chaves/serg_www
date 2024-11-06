import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug; // assuming `slug` is part of the route parameters

	try {
		const response = await fetch(
			`http://cms.serg.paris/api/people?filters[slug][$eq]=${slug}&populate=*`
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch event data for slug: ${slug}`);
		}

		const data: PeopleResponse = await response.json();

		return {
			person: data.data[0] // return the first matching event
		};
	} catch (error) {
		console.error('Error fetching event:', error);
		return {
			new: null
		};
	}
};
