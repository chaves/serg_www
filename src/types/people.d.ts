export interface Picture {
	url: string;
	data: {
		url: string;
	};
}

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
	picture: Picture;
}

export interface PeopleResponse {
	data: Person[];
}