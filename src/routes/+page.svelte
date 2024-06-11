<script lang="ts">
	import { MANAGER_DATA, MENU_DATA } from '$lib/state/gosu';
	import { dev } from '$app/environment';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import ChatBox from '$lib/ChatBox.svelte';
	import DifferenceBar from '$lib/DifferenceBar.svelte';
	import MapInfo from '$lib/MapInfo.svelte';
	import PointInfo from '$lib/PointInfo.svelte';

	$: ENABLE_CHAT = $MENU_DATA.isChatEnabled === 1;
	let FORCE_ENABLE_CHAT = false;

	const RED_SCORE = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	const BLUE_SCORE = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	$: RED_SCORE.set($MANAGER_DATA.gameplay.score.left);
	$: BLUE_SCORE.set($MANAGER_DATA.gameplay.score.right);
</script>

<!-- FOR DEVELOP ONLY EVENT -->
<svelte:window
	on:keydown={(e) => {
		if (dev && e.key === 't') {
			FORCE_ENABLE_CHAT = !FORCE_ENABLE_CHAT;
			console.log('?', FORCE_ENABLE_CHAT);
		}
	}}
/>
<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col">
		<!-- Upper screen -->
		<div class="flex h-[130px] justify-between">
			<PointInfo
				teamname={$MANAGER_DATA.teamName.left}
				target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
				current_point={$MANAGER_DATA.stars.left}
			/>
			<PointInfo
				teamname={$MANAGER_DATA.teamName.right}
				target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
				current_point={$MANAGER_DATA.stars.right}
			/>
		</div>

		<!-- Green screen -->
		<div class="h-[720px] w-[1920px] bg-green-500" />

		<!-- Bottom screen -->
		<div class="group relative grow" data-chaton={ENABLE_CHAT || FORCE_ENABLE_CHAT}>
			<div
				class="absolute top-0 w-full animate-fadein group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				<DifferenceBar />
			</div>
			<p
				class="absolute left-5 top-5 animate-fadein text-7xl font-bold text-red-400 group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				{$RED_SCORE.toFixed(0)}
			</p>
			<div
				class="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-1000 group-data-[chaton=true]:bottom-1/2 group-data-[chaton=true]:left-1/4 group-data-[chaton=true]:translate-y-1/2"
			>
				<MapInfo />
			</div>
			<p
				class="absolute right-5 top-5 animate-fadein text-7xl font-bold text-blue-500 group-data-[chaton=true]:animate-fadeout group-data-[chaton=true]:opacity-0"
			>
				{$BLUE_SCORE.toFixed(0)}
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
