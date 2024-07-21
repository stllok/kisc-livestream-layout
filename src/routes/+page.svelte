<script lang="ts">
	import { MANAGER_DATA, WEIGHTED_TEAMBLUE_SCORE, WEIGHTED_TEAMRED_SCORE } from '$lib/state/gosu';
	import { dev } from '$app/environment';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import ChatBox from '$lib/ChatBox.svelte';
	import DifferenceBar from '$lib/DifferenceBar.svelte';
	import MapInfo from '$lib/MapInfo.svelte';
	import { CURRENT_SCENE_NAME, change_scenes } from '$lib/state/obs_ws';
	import PointLayout from '$lib/PointLayout.svelte';
	
	let LAST_IPC_STATE = 1;
	MANAGER_DATA.subscribe((data) => {
		// TODO: also write winner condition

		// Switch to mappool scene when state change from 4 to 1
		if (LAST_IPC_STATE === 4 && data.ipcState === 1 && $CURRENT_SCENE_NAME === 'Gameplay') {
			console.log('Trigger scene change on standby state');
			change_scenes('Mappool');
		}

		LAST_IPC_STATE = data.ipcState;
	});

	const RED_SCORE = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	const BLUE_SCORE = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	$: RED_SCORE.set($WEIGHTED_TEAMRED_SCORE);
	$: BLUE_SCORE.set($WEIGHTED_TEAMBLUE_SCORE);
</script>

<!-- FOR DEVELOP ONLY EVENT -->
<svelte:window
	on:keydown={(e) => {
		if (!dev) {
			return;
		}
		if (e.key === 't') {
			$MANAGER_DATA.bools.scoreVisible = !$MANAGER_DATA.bools.scoreVisible;
			console.log('?', $MANAGER_DATA.bools.scoreVisible);
		}
		if (e.key === '[') {
			$MANAGER_DATA.stars.left += 1;
		}
		if (e.key === ']') {
			$MANAGER_DATA.stars.right += 1;
		}
	}}
/>
<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col">
		<!-- Upper screen -->
		<PointLayout />

		<!-- Green screen -->
		<div class="h-[720px] w-[1920px] bg-green-500" />

		<!-- Bottom screen -->
		<div class="group relative grow" data-chaton={!$MANAGER_DATA.bools.scoreVisible}>
			<div
				class="absolute top-0 w-full animate-fadein group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				<DifferenceBar />
			</div>
			<p
				class="absolute bottom-5 left-5 animate-fadein font-bahnschrift text-7xl font-bold text-red-400 group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				{$RED_SCORE
					.toFixed(0)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</p>
			<div
				class="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-1000 group-data-[chaton=true]:bottom-1/2 group-data-[chaton=true]:left-1/4 group-data-[chaton=true]:translate-y-1/2"
			>
				<MapInfo />
			</div>
			<p
				class="absolute bottom-5 right-5 animate-fadein font-bahnschrift text-7xl font-bold text-blue-500 group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				{$BLUE_SCORE
					.toFixed(0)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</p>
			<div
				class="absolute right-2 top-0 h-full w-5/12 py-2 transition-all duration-1000 group-data-[chaton=false]:top-96"
			>
				<ChatBox />
			</div>
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
