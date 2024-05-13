export const prerender = true;
export const ssr = false;

export interface ChatType {
	team: string;
	time: string;
	name: string;
	messageBody: string;
}

export interface TourneyManager {
	ipcState: number;
	bestOF: number;
	teamName: {
		left: string;
		right: string;
	};
	stars: {
		left: number;
		right: number;
	};
	chat: ChatType[] | null;
	gameplay: {
		score: {
			left: number;
			right: number;
		};
	};
}

export interface MenuData {
	isChatEnabled: number;
	bm: BeatmapMetadata;
}

export interface BeatmapMetadata {
	time: {
		firstObj: number;
		current: number;
		full: number;
		mp3: number;
	};
	id: number;
	set: number;
	md5: string;
	metadata: {
		artist: string;
		artistOriginal: string;
		title: string;
		titleOriginal: string;
		mapper: string;
		difficulty: string;
	};
	stats: {
		AR: number;
		CS: number;
		OD: number;
		HP: number;
		SR: number;
		BPM: {
			min: number;
			max: number;
		};
		maxCombo: number;
		fullSR: number;
		memoryAR: number;
		memoryCS: number;
		memoryOD: number;
		memoryHP: number;
	};
	path: {
		full: string;
		folder: string;
		file: string;
		bg: string;
		audio: string;
	};
}
