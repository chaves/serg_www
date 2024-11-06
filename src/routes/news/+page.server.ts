// src/routes/people/+page.server.ts
import type { PageServerLoad } from './$types';
import { flattenObj } from '$lib/utils';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('https://cms.serg.paris/api/news?populate=*');

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: unknown = await flattenObj(response.json());

    return {
      news: data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      people: null,
      error: (error as Error).message,
    };
  }
};