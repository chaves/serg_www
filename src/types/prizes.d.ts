export interface Prize {
	id: number;
	first_name: string;
	last_name: string;
	title: string;
	year: string;
}

export interface PrizesResponse {
	data: Prize[];
}
