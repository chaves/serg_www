export interface Paper {
	id: number;
	year: string;
    title: string;
	slug: string;
    authors: string;
	abstract: string;
    areas: [],
	files: []
}

export interface PapersResponse {
	data: Paper[];
}

export interface PaperResponse {
	data: Paper;
}
