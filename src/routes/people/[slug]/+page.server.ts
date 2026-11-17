import type { PageServerLoad } from './$types';
import type { PeopleResponse } from '$types/people';
import { CMS_BASE_URL } from '$lib/config';
import { fetchAllSlugs } from '$lib/cms';
import { error } from '@sveltejs/kit';

// Prerender all people pages
export const prerender = true;

// Dynamic entries: fetch all people slugs at build time
export const entries = async () =>
	(await fetchAllSlugs('people')).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const response = await fetch(
		`${CMS_BASE_URL}/api/people?publicationState=live&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
	);

	if (!response.ok) {
		throw error(
			response.status === 404 ? 404 : 502,
			`Failed to fetch person for slug "${slug}"`
		);
	}

	const data: PeopleResponse = await response.json();
	const person = data.data?.[0];

	if (!person) {
		throw error(404, `Person "${slug}" not found`);
	}

	return {
		person
	};
};
