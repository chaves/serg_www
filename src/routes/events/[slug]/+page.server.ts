import type { PageServerLoad } from './$types';
import type { EventsResponse } from '$types/events';
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

// Prerender all event pages
export const prerender = true;

// Dynamic entries: fetch all event slugs at build time
export const entries = async () => {
	try {
		const response = await fetch(
			`${CMS_BASE_URL}/api/events?publicationState=live&fields[0]=slug`,
			NO_CACHE_FETCH_OPTIONS
		);
		if (!response.ok) return [];
		const data: EventsResponse = await response.json();
		return data.data?.map((event) => ({ slug: event.slug })) || [];
	} catch (error) {
		console.error('Error fetching event entries:', error);
		return [];
	}
};

export const load: PageServerLoad = async ({ fetch, params }) => {
    const slug = params.slug; // assuming `slug` is part of the route parameters

    try {
      // Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS
      // Explicitly request published content with publicationState=live
      const response = await fetch(`${CMS_BASE_URL}/api/events?publicationState=live&filters[slug][$eq]=${slug}&populate=*`, NO_CACHE_FETCH_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch event data for slug: ${slug}`);
      }

      const data : EventsResponse = await response.json();

      return {
        event: data.data[0] // return the first matching event
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      return {
        event: null
      };
    }
  };