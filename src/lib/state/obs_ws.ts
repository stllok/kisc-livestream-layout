import OBSWebSocket from 'obs-websocket-js';
import { writable } from 'svelte/store';

const OBS_WS = new OBSWebSocket();
OBS_WS.connect();

const CURRENT_SCENE_NAME = writable('');

export const change_scenes = async (sceneName: string) => {
	await OBS_WS.call('SetCurrentProgramScene', { sceneName });
};

export const broadcase_team_picking = async (is_team_red: boolean) => {
	// deprecated
};

const IS_TEAM_RED_PICKING = writable(false);
const IS_BAN_ENDED = writable(false);
OBS_WS.addListener('CustomEvent', (event) => {
	// deprecated
	console.log(event);
});

OBS_WS.addListener('CurrentProgramSceneChanged', (event) => {
	console.log(`Detected scene changed from ${event.sceneName}`);
	CURRENT_SCENE_NAME.set(event.sceneName);
});

export { IS_BAN_ENDED, IS_TEAM_RED_PICKING, CURRENT_SCENE_NAME };
