import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

// Prerender all people pages
export const prerender = true;

// Dynamic entries: fetch all people slugs at build time
export const entries = async () => {
	try {
		const response = await fetch(
			`${CMS_BASE_URL}/api/people?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (!response.ok) return [];
		const data: PeopleResponse = await response.json();
		return data.data?.map((person) => ({ slug: person.slug })) || [];
	} catch (error) {
		console.error('Error fetching people entries:', error);
		return [];
	}
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug; // assuming `slug` is part of the route parameters

	try {
		// Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS
		// Explicitly request published content with publicationState=live
		const response = await fetch(
			`${CMS_BASE_URL}/api/people?publicationState=live&filters[slug][$eq]=${slug}&populate=*`,
			NO_CACHE_FETCH_OPTIONS
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
