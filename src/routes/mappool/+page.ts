import { MANAGER_DATA } from '$lib/state/gosu';
import { CURRENT_SCENE_NAME, change_scenes } from '$lib/state/obs_ws';
import { get } from 'svelte/store';

let LAST_IPC_STATE = 1;
MANAGER_DATA.subscribe((data) => {
	// if gameplay started and scene still on Mappool, switch back to Gameplay
	if (data.ipcState === 3 && get(CURRENT_SCENE_NAME) === 'Mappool') {
		change_scenes('Gameplay');
	}

	LAST_IPC_STATE = data.ipcState;
});
