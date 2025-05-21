import type { Media } from './strapi/Media';

export interface Prize {
	id: number;
	first_name: string;
	last_name: string;
	title: string;
	year: string;
	picture: Media;
}

export interface PrizesResponse {
	data: Prize[];
}
