export interface MapPools {
	string: MapPoolMetadata[];
}

export interface MapPoolMetadata {
	artist: string;
	title: string;
	difficulty: string;
	mapper: string;
	star: number;
	bpm: number;
	length: number;
	cs: number;
	ar: number;
	od: number;
	hp: number;
	beatmap_id: number;
	beatmapset_id: number;
}


export const MAPPOOL: MapPools = await fetch(`/current_stage.json`).then((_) => _.json());