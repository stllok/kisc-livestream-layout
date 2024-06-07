<script lang="ts">
	import { GOSUMEMORY_ADDRESS } from '$lib/state/gosu';
	import { fade } from 'svelte/transition';
	import type { MapPoolMetadata } from '../+layout';

	// team data
	export const team_red: string = 'UNNAMED RED';
	export const team_blue: string = 'UNNAMED BLUE';

	// map metadata
	export let mod: string;
	export let idx: number;
	export let map: MapPoolMetadata;
	// status
	export let is_ban: boolean;
	export let is_team_red: boolean;

	let RESULT: [boolean, boolean] | null = null;
	function on_set() {
		RESULT = RESULT === null ? [is_ban, is_team_red] : RESULT;
	}

	function on_unset() {
		RESULT = null;
	}
</script>

<button
	class="relative m-2 h-12 w-[30rem] rounded-2xl *:rounded-2xl *:duration-200"
	on:click={on_set}
	on:contextmenu|preventDefault={on_unset}
>
	{#if RESULT !== null}
		<p
			class="absolute top-0 z-30 flex h-full w-[28rem] items-center justify-center text-2xl font-semibold"
			class:text-TEAMRED={RESULT[1]}
			class:text-TEAMBLUE={!RESULT[1]}
			transition:fade
		>
			{RESULT[1] ? team_red : team_blue} Banned
		</p>
		<div transition:fade class="absolute top-0 z-20 h-full w-[28rem] bg-black opacity-65"></div>
	{/if}
	<div
		style:background-image={`url('https://assets.ppy.sh/beatmaps/${map.mapset_id}/covers/cover@2x.jpg')`}
		style:box-shadow={'4px 4px 21px rgba(0,0,0,0.58)'}
		class="absolute top-0 -z-10 h-full w-[28.5rem] bg-cover bg-local bg-center bg-origin-padding blur-[1px]"
	/>
	<div class="absolute top-0 flex h-full w-full items-center justify-between">
		<div class="ml-2 w-[26rem] flex flex-col *:font-sourcehansan">
			<p
				class="text-[1.5vh] font-semibold text-white drop-shadow-xl"
				style:text-shadow={'4px 4px 8px black'}
			>
				{map.Title}
			</p>
			<p class="text-white text-[1vh]" 
			style:text-shadow={'4px 4px 8px black'}>Artist: {map.Artist} Difficulty: {map.Difficulty}</p>
		</div>

		<p
			style:box-shadow={'4px 4px 21px rgba(0,0,0,0.68)'}
			class="z-30 w-14 rounded-xl bg-{mod} p-1 text-xl font-bold text-white shadow-xl"
		>
			{`${mod}${mod != 'TB' ? idx : ''}`}
		</p>
	</div>
</button>
