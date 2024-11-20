// src/routes/people/+page.server.ts
import type { PrizesResponse } from "../../types/prizes";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const response = await fetch('https://cms.serg.paris/api/prizes?sort[0]=year:desc&sort[1]=last_name');

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: PrizesResponse = await response.json();

    return {
      prizes: data,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      prizes: null,
      error: (error as Error).message,
    };
  }
};