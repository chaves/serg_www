import type { PageServerLoad } from './$types';
import type { EventsResponse } from '$types/events';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const slug = params.slug; // assuming `slug` is part of the route parameters

    try {
      // Use cache: 'no-store' to ensure fresh data from CMS
      const response = await fetch(`https://cms.serg.paris/api/events?filters[slug][$eq]=${slug}&populate=*`, {
        cache: 'no-store'
      });

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