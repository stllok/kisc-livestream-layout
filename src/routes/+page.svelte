<script lang="ts">
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';
	import { MANAGER_DATA, MENU_DATA } from '$lib/state/gosu';

	window.addEventListener('obs-websocket-test-event', function (event) {
		console.log(event);
	});

	$: ENABLE_CHAT = $MENU_DATA.isChatEnabled === 1;
</script>

<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col *:duration-500">
		<!-- Upper screen -->
		<div class="flex justify-between p-3">
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
		<div class="h-[720px] w-[1920px] bg-green-500"></div>

		<!-- Bottom screen -->
		{#if !ENABLE_CHAT}
			<DifferenceBar />
		{/if}
		<div class="relative mx-12 flex grow items-center justify-center">
			{#if !ENABLE_CHAT}
				<p class="absolute left-0 text-7xl font-bold text-red-400">
					{$MANAGER_DATA.gameplay.score.left}
				</p>
			{/if}
			<MapInfo />
			{#if !ENABLE_CHAT}
				<p class="absolute right-0 text-7xl font-bold text-blue-500">
					{$MANAGER_DATA.gameplay.score.right}
				</p>
			{:else}
				<ChatBox />
			{/if}
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
