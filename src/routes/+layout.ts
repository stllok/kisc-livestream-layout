export const prerender = true;
export const ssr = false;
export const csr = true;

export interface MapPools {
	string: MapPoolMetadata[];
}

export interface MapPoolMetadata {

	Artist: string;
	Title: string;
	Difficulty: string;
	Mapper: string;
	mapset_id: number;
}