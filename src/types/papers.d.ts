export interface PaperAttributes {
	year: string;
    title: string;
	slug: string;
    authors: string;
	abstract: string;
    areas: [],
	files: []
}

export interface Paper {
	id: number;
	attributes: PaperAttributes;
}

export interface PapersResponse {
	data: Paper[];
}

export interface PaperResponse {
	data: Paper;
}
