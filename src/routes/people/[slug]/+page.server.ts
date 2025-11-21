import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug; // assuming `slug` is part of the route parameters

	try {
		// Use cache: 'no-store' to ensure fresh data from CMS
		const response = await fetch(
			`https://cms.serg.paris/api/people?filters[slug][$eq]=${slug}&populate=*`,
			{
				cache: 'no-store'
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch person data for slug: ${slug}`);
		}

		const data: PeopleResponse = await response.json();

		return {
			person: data.data[0] // return the first matching person
		};
	} catch (error) {
		console.error('Error fetching person:', error);
		return {
			person: null
		};
	}
};
