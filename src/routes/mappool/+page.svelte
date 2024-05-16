<script lang="ts">
	import { dev } from '$app/environment';
	import Map from './Map.svelte';

	interface MappoolData {
		artist: string;
		title: string;
		difficulty: string;
	}

	function get_mappool_link(stage: string): string {
		return dev ? '/sample_mappool.json' : `/bracket/${stage}.json`;
	}

	let mappool_req: Promise<{ string: MappoolData[] }> = fetch(get_mappool_link('F')).then((_) =>
		_.json()
	);

	let is_ban = true;
	let is_team_red = true;
</script>

<div class="flex flex-col justify-between">
	<div class="flex h-screen flex-col gap-y-10">
		{#await mappool_req then mappool}
			{#each Object.entries(mappool) as [mod, maps]}
				<div class="flex flex-wrap items-center justify-around gap-x-32 gap-y-8">
					{#each maps as map, i}
						<Map
							{mod}
							idx={i + 1}
							artist={map.artist}
							title={map.title}
							difficulty={map.difficulty}
							bind:is_ban
							bind:is_team_red
						/>
					{/each}
				</div>
			{/each}
		{/await}
	</div>
	<div class="flex gap-2 bg-gray-400 p-2">
		<div class="flex flex-col gap-2">
			<button
				disabled={is_ban}
				on:click={(_) => (is_ban = !is_ban)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500">BAN</button
			>
			<button
				disabled={!is_ban}
				on:click={(_) => (is_ban = !is_ban)}
				class="bg-green-200 hover:bg-green-400 active:bg-green-600 disabled:bg-green-500"
				>PICK</button
			>
		</div>
		<div class="flex flex-col gap-2">
			<button
				disabled={is_team_red}
				on:click={(_) => (is_team_red = !is_team_red)}
				class="bg-red-200 hover:bg-red-400 active:bg-red-600 disabled:bg-red-500">TEAM RED</button
			>
			<button
				disabled={!is_team_red}
				on:click={(_) => (is_team_red = !is_team_red)}
				class="bg-blue-200 hover:bg-blue-400 active:bg-blue-600 disabled:bg-blue-500"
				>TEAM BLUE</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	button {
		@apply rounded-full px-10 py-3 duration-100;
	}
</style>
