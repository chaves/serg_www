export interface File {
	id: number;
	name: string;
	alternativeText: string;
	hash: string;
	ext: string;
	mime: string;
	size: string;
	url: string;
}

export interface FilesResponse {
	data: FilesResponse[];
}

export interface FileResponse {
	data: File;
}
