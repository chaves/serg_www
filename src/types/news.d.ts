export interface New {
	id: number;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	picture: Picture;
    areas: [],
	attached_files: []
}

export interface Picture {
	url: string;
	data: {
		url: string;
	};
}

export interface NewsResponse {
	data: New[];
}

export interface NewResponse {
	data: New;
}
