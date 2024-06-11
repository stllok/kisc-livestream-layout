import { MANAGER_DATA } from '$lib/state/gosu';
import { CURRENT_SCENE_NAME, change_scenes } from '$lib/state/obs_ws';
import { get } from 'svelte/store';

let LAST_IPC_STATE = 1;
MANAGER_DATA.subscribe((data) => {
	if (LAST_IPC_STATE === 4 && data.ipcState === 1 && get(CURRENT_SCENE_NAME) === 'Gameplay') {
		change_scenes('Mappool');
	}

	LAST_IPC_STATE = data.ipcState;
});
