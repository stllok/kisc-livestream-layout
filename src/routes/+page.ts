import { MANAGER_DATA } from '$lib/state/gosu';
import { change_scenes } from '$lib/state/obs_ws';

let LAST_IPC_STATE = 1;
MANAGER_DATA.subscribe((data) => {
	// also write winner condition
	if (LAST_IPC_STATE === 4 && data.ipcState === 1) {
		change_scenes('Mappool');
	}

	LAST_IPC_STATE = data.ipcState;
});
