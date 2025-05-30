import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const slug = params.slug; // assuming `slug` is part of the route parameters

    try {
      const response = await fetch(`http://cms.serg.paris/api/news?filters[slug][$eq]=${slug}&populate=*`);

      if (!response.ok) {
        throw new Error(`Failed to fetch event data for slug: ${slug}`);
      }

      const data = await response.json();

      return {
        new: data.data[0] // return the first matching event
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      return {
        new: null
      };
    }
  };