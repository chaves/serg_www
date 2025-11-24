import type { PageServerLoad } from './$types';
import type { NewsResponse } from "$types/news";
import type { EventsResponse } from "$types/events";
import { CMS_BASE_URL } from '$lib/config';
import { NO_CACHE_FETCH_OPTIONS } from '$lib/utils';

async function fetchData(url: string, fetchFn: typeof fetch) {
  // Use SvelteKit's fetch which is properly instrumented
  // Use NO_CACHE_FETCH_OPTIONS to ensure fresh data from CMS on each request
  // This bypasses all caches (browser, CDN, proxy) to ensure new published content is immediately visible
  const response = await fetchFn(url, NO_CACHE_FETCH_OPTIONS);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Explicitly request published content with publicationState=live
    const dataDesc = await fetchData(`${CMS_BASE_URL}/api/home-description?publicationState=live`, fetch);
    const dataNews: NewsResponse = await fetchData(`${CMS_BASE_URL}/api/news?publicationState=live&sort=createdAt:desc`, fetch);
    const dataEvents: EventsResponse = await fetchData(`${CMS_BASE_URL}/api/events?publicationState=live&sort=date_start:desc`, fetch);

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