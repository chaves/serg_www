import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { fetchAllSlugs } from '$lib/cms';
import { error } from '@sveltejs/kit';

// Prerender all working paper pages
export const prerender = true;

// Dynamic entries: fetch all working paper slugs at build time
export const entries = async () =>
	(await fetchAllSlugs('working-papers')).map((slug) => ({ slug }));

export const load: PageServerLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const response = await fetch(
		`${CMS_BASE_URL}/api/working-papers?publicationState=live&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
	);

	if (!response.ok) {
		throw error(
			response.status === 404 ? 404 : 502,
			`Failed to fetch working paper for slug "${slug}"`
		);
	}

	const data = await response.json();
	const paper = data.data?.[0];

	if (!paper) {
		throw error(404, `Working paper "${slug}" not found`);
	}

	return {
		paper
	};
};
