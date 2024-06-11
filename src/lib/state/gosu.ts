import { writable, type Writable } from 'svelte/store';

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

const MANAGER_DATA: Writable<TourneyManager> = writable({
	ipcState: 0,
	bestOF: 1,
	teamName: {
		left: 'TEAM RED',
		right: 'TEAM BLUE'
	},
	stars: {
		left: 0,
		right: 0
	},
	chat: null,
	gameplay: {
		score: {
			left: 0,
			right: 0
		}
	}
});

const MENU_DATA: Writable<MenuData> = writable({
	isChatEnabled: 0
});

const BEATMAP_METADATA: Writable<BeatmapMetadata> = writable({
	time: {
		firstObj: 0,
		current: 0,
		full: 0,
		mp3: 0
	},
	id: 0,
	set: 0,
	md5: '',
	metadata: {
		artist: '',
		artistOriginal: '',
		title: '',
		titleOriginal: '',
		mapper: '',
		difficulty: ''
	},
	stats: {
		AR: 0,
		CS: 0,
		OD: 0,
		HP: 0,
		SR: 0,
		BPM: {
			min: 0,
			max: 0
		},
		maxCombo: 0,
		fullSR: 0,
		memoryAR: 0,
		memoryCS: 0,
		memoryOD: 0,
		memoryHP: 0
	},
	path: {
		full: '',
		folder: '',
		file: '',
		bg: '',
		audio: ''
	}
});

const GOSUMEMORY_ADDRESS = '127.0.0.1:24050';
const GOSU_WS = new WebSocket(`ws://${GOSUMEMORY_ADDRESS}/ws`);
GOSU_WS.addEventListener('message', (event) => {
	const raw_data = JSON.parse(event.data);

	MANAGER_DATA.set(raw_data['tourney']['manager']);
	MENU_DATA.set(raw_data['menu']);
	BEATMAP_METADATA.set(raw_data['menu']['bm']);
});

export { GOSUMEMORY_ADDRESS, MANAGER_DATA, MENU_DATA, BEATMAP_METADATA };
