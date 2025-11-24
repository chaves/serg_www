import type { PageServerLoad } from './$types';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const slug = params.slug; // assuming `slug` is part of the route parameters

    try {
      // Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS
      // Explicitly request published content with publicationState=live
      const response = await fetch(`${CMS_BASE_URL}/api/news?publicationState=live&filters[slug][$eq]=${slug}&populate=*`, NO_CACHE_FETCH_OPTIONS);

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