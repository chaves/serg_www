import type { PageServerLoad } from './$types';
import type { NewsResponse } from "$types/news";
import type { EventsResponse } from "$types/events";

async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export const load: PageServerLoad = async () => {
  try {
    const dataDesc = await fetchData(`https://cms.serg.paris/api/home-description`);
    const dataNews: NewsResponse = await fetchData('https://cms.serg.paris/api/news?sort=createdAt:desc');
    const dataEvents: EventsResponse = await fetchData('https://cms.serg.paris/api/events?sort=date_start:desc');

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