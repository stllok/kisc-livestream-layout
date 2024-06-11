import { BEATMAP_METADATA, MANAGER_DATA } from '$lib/state/gosu';
import { CURRENT_SCENE_NAME, change_scenes } from '$lib/state/obs_ws';
import { get } from 'svelte/store';

let LAST_IPC_STATE = 1;
MANAGER_DATA.subscribe((data) => {
	if (LAST_IPC_STATE === 1 && data.ipcState === 3 && get(CURRENT_SCENE_NAME) === 'Mappool') {
		change_scenes('Gameplay');
	}

	LAST_IPC_STATE = data.ipcState;
});

BEATMAP_METADATA.subscribe(async (data) => {
	if (get(CURRENT_SCENE_NAME) === 'Mappool') {
		await new Promise((resolve) => setTimeout(resolve, 15000));
		change_scenes('Gameplay');
	}
});
