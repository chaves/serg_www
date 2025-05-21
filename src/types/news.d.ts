import type { Media } from './strapi/Media';

export interface New {
	id: number;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	picture: Media;
	areas: [];
	attached_files: [];
}

export interface NewsResponse {
	data: New[];
}

export interface NewResponse {
	data: New;
}
