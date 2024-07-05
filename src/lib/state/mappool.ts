export interface MapPools {
	[key: string]: MapPoolMetadata[];
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

export const MAPPOOL: Promise<MapPools> = fetch(`/kisc_static/current_stage.json`).then((_) =>
	_.json()
);
