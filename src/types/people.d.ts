export interface Picture {
	url: string;
	data: {
		attributes: {
			url: string;
		};
	};
}

export interface PersonAttributes {
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

export interface Person {
	id: number;
	attributes: PersonAttributes;
}

export interface PeopleResponse {
	data: Person[];
}