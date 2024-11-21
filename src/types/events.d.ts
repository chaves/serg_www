export interface EventAttributes {
	title: string;
	slug: string;
	description: string;
	date_start: string;
	date_end: string;
    areas: [],
	attached_files: []
}

export interface Event {
	id: number;
	attributes: EventAttributes;
}

export interface EventsResponse {
	data: Event[];
}

export interface EventResponse {
	data: Event;
}