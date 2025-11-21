import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug; // assuming `slug` is part of the route parameters

	try {
		// Use cache: 'no-store' to ensure fresh data from CMS
		const response = await fetch(
			`https://cms.serg.paris/api/working-papers?filters[slug][$eq]=${slug}&populate=*`,
			{
				cache: 'no-store'
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch paper data for slug: ${slug}`);
		}

		const data = await response.json();

		return {
			paper: data.data[0] // return the first matching paper
		};
	} catch (error) {
		console.error('Error fetching paper:', error);
		return {
			paper: null
		};
	}
};
