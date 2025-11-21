import type { PageServerLoad } from './$types';
import type { NewsResponse } from "$types/news";
import type { EventsResponse } from "$types/events";

async function fetchData(url: string, fetchFn: typeof fetch) {
  // Use SvelteKit's fetch which is properly instrumented
  // Add cache: 'no-store' to ensure fresh data from CMS on each request
  const response = await fetchFn(url, {
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const dataDesc = await fetchData(`https://cms.serg.paris/api/home-description`, fetch);
    const dataNews: NewsResponse = await fetchData('https://cms.serg.paris/api/news?sort=createdAt:desc', fetch);
    const dataEvents: EventsResponse = await fetchData('https://cms.serg.paris/api/events?sort=date_start:desc', fetch);

    return {
      description: dataDesc.data,
      news: dataNews.data,
      events: dataEvents.data
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      description: null
    };
  }
};