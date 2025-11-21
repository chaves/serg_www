// src/routes/people/+page.server.ts
import type { PageServerLoad } from './$types';
import type { NewsResponse } from '$types/news';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Use cache: 'no-store' to ensure fresh data from CMS
    const response = await fetch('https://cms.serg.paris/api/news?sort=createdAt:desc&populate=*', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: NewsResponse = await response.json();

    return {
      news: data.data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      news: null,
      error: (error as Error).message,
    };
  }
};