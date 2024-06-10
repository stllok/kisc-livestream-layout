<script lang="ts">
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';
	import { MANAGER_DATA, MENU_DATA } from '$lib/state/gosu';
	import { dev } from '$app/environment';

	$: ENABLE_CHAT = $MENU_DATA.isChatEnabled === 1;
</script>

<!-- FOR DEVELOP ONLY EVENT -->
<svelte:window
	on:keydown={(e) => {
		if (dev && e.key === 't') {
			$MENU_DATA.isChatEnabled = $MENU_DATA.isChatEnabled === 0 ? 1 : 0;
		}
	}}
/>
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
		<div class="h-[720px] w-[1920px] bg-green-500" />

		<!-- Bottom screen -->
		<div class="relative grow">
			<div class="absolute top-0 w-full">
				<DifferenceBar />
			</div>
			<p class="absolute left-5 top-5 text-7xl font-bold text-red-400" class:hidden={ENABLE_CHAT}>
				{$MANAGER_DATA.gameplay.score.left}
			</p>
			<div
				class="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-700 data-[chaton=true]:bottom-1/2 data-[chaton=true]:left-1/4 data-[chaton=true]:translate-y-1/2"
				data-chaton={ENABLE_CHAT}
			>
				<MapInfo />
			</div>
			<p class="absolute right-5 top-5 text-7xl font-bold text-blue-500" class:hidden={ENABLE_CHAT}>
				{$MANAGER_DATA.gameplay.score.right}
			</p>
			<div
				class="absolute right-2 top-0 h-full w-1/2 animate-fadein py-2 data-[chaton=false]:animate-fadeout data-[chaton=false]:opacity-0"
				data-chaton={ENABLE_CHAT}
			>
				<ChatBox />
			</div>
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
