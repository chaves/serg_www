export interface PrizeAttributes {
	first_name: string;
	last_name: string;
	title: string;
	year: string;
}

export interface Prize {
	id: number;
	attributes: PrizeAttributes;
}

export interface PrizesResponse {
	data: Prize[];
}
