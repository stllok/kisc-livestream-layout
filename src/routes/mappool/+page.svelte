<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';
	import PointLayout from '$lib/PointLayout.svelte';
	import Map from './Map.svelte';
	import { MAPPOOL } from '$lib/state/mappool';
	import ChatBox from '$lib/ChatBox.svelte';

	let IS_BAN = true;
	let IS_TEAMRED = true;
</script>

<div class="flex h-screen flex-col justify-between">
	<div>
		<PointLayout />
		<!-- Map grid -->
		{#await MAPPOOL then mappool}
			<div class="flex flex-col gap-y-4">
				{#each Object.entries(mappool) as [mod, maps]}
					<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
						{#each maps as map, i}
							<Map {mod} idx={i + 1} {map} bind:is_ban={IS_BAN} bind:is_team_red={IS_TEAMRED} />
						{/each}
					</div>
				{/each}
			</div>
		{/await}
	</div>
	<!-- Control panel -->
	<div class="flex h-[120px] gap-2 bg-gray-400 p-2">
		<div class="flex flex-col gap-2">
			<button
				disabled={IS_BAN}
				on:click={() => (IS_BAN = !IS_BAN)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500">BAN</button
			>
			<button
				disabled={!IS_BAN}
				on:click={() => (IS_BAN = !IS_BAN)}
				class="bg-green-200 hover:bg-green-400 active:bg-green-600 disabled:bg-green-500"
				>PICK</button
			>
		</div>
		<div class="flex flex-col gap-2">
			<button
				disabled={IS_TEAMRED}
				on:click={() => (IS_TEAMRED = !IS_TEAMRED)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500"
				>{$MANAGER_DATA.teamName.left}</button
			>
			<button
				disabled={!IS_TEAMRED}
				on:click={() => (IS_TEAMRED = !IS_TEAMRED)}
				class="bg-blue-200 hover:bg-blue-400 active:bg-blue-600 disabled:bg-blue-500"
				>{$MANAGER_DATA.teamName.right}</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	button {
		@apply rounded-full px-10 py-3 duration-100;
	}
</style>
