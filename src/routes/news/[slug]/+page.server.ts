import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

// Prerender all news pages
export const prerender = true;

// Dynamic entries: fetch all news slugs at build time
export const entries = async () => {
	try {
		const response = await fetch(
			`${CMS_BASE_URL}/api/news?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (!response.ok) return [];
		const data = await response.json();
		return data.data?.map((article: { slug: string }) => ({ slug: article.slug })) || [];
	} catch (error) {
		console.error('Error fetching news entries:', error);
		return [];
	}
};

export const load: PageServerLoad = async ({ fetch, params }) => {
    const slug = params.slug; // assuming `slug` is part of the route parameters

    try {
      // This page is prerendered, so load() only runs at build time
      // Webhooks trigger rebuilds when content changes, so cache-busting is less critical
      // Explicitly request published content with publicationState=live
      const response = await fetch(`${CMS_BASE_URL}/api/news?publicationState=live&filters[slug][$eq]=${slug}&populate=*`);

      if (!response.ok) {
        throw new Error(`Failed to fetch news data for slug: ${slug}`);
      }

      const data = await response.json();

      return {
        new: data.data[0] // return the first matching news item
      };
    } catch (error) {
      console.error("Error fetching news:", error);
      return {
        new: null
      };
    }
  };