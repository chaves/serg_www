export interface New {
	id: number;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
    areas: [],
	attached_files: []
}

export interface NewsResponse {
	data: New[];
}

export interface NewResponse {
	data: New;
}
