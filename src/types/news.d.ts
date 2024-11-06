export interface NewAttributes {
	title: string;
	slug: string;
	description: string;
    areas: [],
	attached_files: []
}

export interface New {
	id: number;
	attributes: NewAttributes;
}

export interface NewsResponse {
	data: New[];
}

export interface NewResponse {
	data: New;
}
