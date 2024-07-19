import { writable, type Writable } from 'svelte/store';

export interface IPCClient {
	team: string;
	spectating: {
		name: string;
		country: string;
		userID: number;
		accuracy: number;
		rankedScore: number;
		playCount: number;
		globalRank: number;
		totalPP: number;
	};
	gameplay: {
		gameMode: number;
		score: number;
		name: string;
		accuracy: number;
		hits: {
			0: number;
			50: number;
			100: number;
			300: number;
			geki: number;
			katu: number;
			sliderBreaks: number;
			unstableRate: number;
		};
		combo: {
			current: number;
			max: number;
		};
		mods: {
			num: number;
			str: string;
		};
		hp: {
			normal: number;
			smooth: number;
		};
	};
}

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
	bools: {
		scoreVisible: boolean;
		starsVisible: boolean;
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
	ipcState: 3,
	bestOF: 17,
	teamName: {
		left: 'みらくるオムライス~',
		right: 'Konai Ikanai'
	},
	stars: {
		left: 1,
		right: 1
	},
	bools: {
		scoreVisible: false,
		starsVisible: true
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

const IPC_CLIENT: Writable<IPCClient[]> = writable([]);
const WEIGHTED_TEAMRED_SCORE = writable(0);
const WEIGHTED_TEAMBLUE_SCORE = writable(0);

const GOSUMEMORY_ADDRESS = '127.0.0.1:24050';
const GOSU_WS = new WebSocket(`ws://${GOSUMEMORY_ADDRESS}/ws`);
GOSU_WS.addEventListener('message', (event) => {
	const raw_data = JSON.parse(event.data);

	MANAGER_DATA.set(raw_data['tourney']['manager']);
	MENU_DATA.set(raw_data['menu']);
	BEATMAP_METADATA.set(raw_data['menu']['bm']);
	IPC_CLIENT.set(raw_data['tourney']['ipcClients']);
});

IPC_CLIENT.subscribe((data) => {
	let [red, blue] = data.reduce(
		(sum, current) => {
			sum[current.team === 'left' ? 0 : 1] += current.gameplay.mods.str.includes('EZ')
				? current.gameplay.score * 1.75
				: current.gameplay.score;
			return sum;
		},
		[0, 0]
	);

	WEIGHTED_TEAMRED_SCORE.set(red);
	WEIGHTED_TEAMBLUE_SCORE.set(blue);
});

export {
	GOSUMEMORY_ADDRESS,
	MANAGER_DATA,
	MENU_DATA,
	BEATMAP_METADATA,
	WEIGHTED_TEAMBLUE_SCORE,
	WEIGHTED_TEAMRED_SCORE,
	IPC_CLIENT
};
