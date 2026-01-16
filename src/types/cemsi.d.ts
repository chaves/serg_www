export interface CemsiData {
	id: number;
	documentId: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export interface CemsiResponse {
	data: CemsiData;
}
