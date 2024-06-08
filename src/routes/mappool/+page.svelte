<script lang="ts">
	import { dev } from '$app/environment';
	import { MANAGER_DATA } from '$lib/state/gosu';
	import type { MapPools } from '../+layout';
	import PointLayout from '../PointLayout.svelte';
	import Map from './Map.svelte';

	function get_mappool_link(stage: string): string {
		return dev ? '/bracket/sample_mappool.json' : `/bracket/${stage}.json`;
	}

	let mappool_req: Promise<MapPools> = fetch(get_mappool_link('F')).then((_) => _.json());

	let is_ban = true;
	let is_team_red = true;
</script>

<div class="flex h-screen flex-col justify-between">
	<div>
		<PointLayout />
		<!-- Map grid -->
		<div class="mt-4 flex flex-col gap-y-4">
			{#await mappool_req then mappool}
				{#each Object.entries(mappool) as [mod, maps]}
					<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
						{#each maps as map, i}
							<Map {mod} idx={i + 1} {map} bind:is_ban bind:is_team_red />
						{/each}
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<!-- Control panel -->
	<div class="flex gap-2 bg-gray-400 p-2">
		<div class="flex flex-col gap-2">
			<button
				disabled={is_ban}
				on:click={() => (is_ban = !is_ban)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500">BAN</button
			>
			<button
				disabled={!is_ban}
				on:click={() => (is_ban = !is_ban)}
				class="bg-green-200 hover:bg-green-400 active:bg-green-600 disabled:bg-green-500"
				>PICK</button
			>
		</div>
		<div class="flex flex-col gap-2">
			<button
				disabled={is_team_red}
				on:click={() => (is_team_red = !is_team_red)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500"
				>{$MANAGER_DATA.teamName.left}</button
			>
			<button
				disabled={!is_team_red}
				on:click={() => (is_team_red = !is_team_red)}
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
