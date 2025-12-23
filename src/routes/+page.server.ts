import type { PageServerLoad } from './$types';
import type { NewsResponse } from "$types/news";
import type { EventsResponse } from "$types/events";
import { CMS_BASE_URL } from '$lib/config';

async function fetchData(url: string, fetchFn: typeof fetch) {
  // Use SvelteKit's fetch which is properly instrumented
  // This page is prerendered, so load() only runs at build time
  // Webhooks trigger rebuilds when content changes, so cache-busting is less critical
  const response = await fetchFn(url);
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