import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// This page is prerendered, so load() only runs at build time
		// Webhooks trigger rebuilds when content changes, so cache-busting is less critical
		// Explicitly request published content with publicationState=live
		const response = await fetch(`${CMS_BASE_URL}/api/working-papers?publicationState=live&sort[0]=year:desc&sort[1]=createdAt:desc&populate=*`);

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
