import type { Media } from './strapi/Media';

export interface Person {
	id: number;
	first_name: string;
	last_name: string;
	category: string;
	office: string;
	email: string;
	slug: string;
	bio: string;
	areas: string[];
	picture: Media;
}

export interface PeopleResponse {
	data: Person[];
}
