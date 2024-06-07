import OBSWebSocket from 'obs-websocket-js';
import { writable } from 'svelte/store';

const OBS_WS = new OBSWebSocket();
await OBS_WS.connect();

export const change_scenes = async (sceneName: string) => {
	await OBS_WS.call('SetCurrentProgramScene', { sceneName });
};

export const broadcase_team_picking = async (is_team_red: boolean, is_ban: boolean) => {
	await OBS_WS.call('BroadcastCustomEvent', {
		eventData: {
			is_team_red,
			is_ban_ended
		}
	});
};

const IS_TEAM_RED_PICKING = writable(false);
const IS_BAN_ENDED = writable(false);
OBS_WS.addListener('CustomEvent', (event) => {
	IS_TEAM_RED_PICKING.set(event.eventData.is_team_red);
	IS_BAN_ENDED.set(event.eventData.is_ban);
});

export { IS_BAN_ENDED, IS_TEAM_RED_PICKING };
