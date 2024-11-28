export interface Event {
	id: number;
	title: string;
	slug: string;
	description: string;
	date_start: string;
	date_end: string;
	picture: Picture;
    areas: [];
	attached_files: [];
	publishedAt: string;
}

export interface Picture {
	url: string;
	data: {
		url: string;
	};
}

export interface EventsResponse {
	data: Event[];
}

export interface EventResponse {
	data: Event;
}