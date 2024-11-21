export interface FileAttributes {
	name: string;
	alternativeText: string;
	hash: string;
	ext: string;
	mime: string;
	size: string;
	url: string;
}

export interface File {
	id: number;
	attributes: FileAttributes;
}

export interface FilesResponse {
	data: FilesResponse[];
}

export interface FileResponse {
	data: File;
}
