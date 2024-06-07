<script lang="ts">
	import { GOSUMEMORY_ADDRESS } from '$lib/state/gosu';
	import { fade } from 'svelte/transition';

	// team data
	export const team_red: string = 'UNNAMED RED';
	export const team_blue: string = 'UNNAMED BLUE';

	// map metadata
	export let mod: string;
	export let idx: number;
	export let id: number;
	export let name: string;

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
			class="absolute top-0 z-30 flex h-full w-11/12 items-center justify-center text-2xl font-semibold"
			class:text-TEAMRED={RESULT[1]}
			class:text-TEAMBLUE={!RESULT[1]}
			transition:fade
		>
			{RESULT[1] ? team_red : team_blue} Banned
		</p>
		<div transition:fade class="absolute top-0 z-20 h-full w-11/12 bg-black opacity-65"></div>
	{/if}
	<div
		style:background-image={`url('http://${GOSUMEMORY_ADDRESS}/Songs/${id} ${name}')`}
		style:box-shadow={'4px 4px 21px rgba(0,0,0,0.58)'}
		class="absolute top-0 -z-10 h-full w-11/12 bg-cover bg-local bg-center bg-origin-padding"
	/>
	<div class="absolute top-0 flex h-full w-full items-center justify-between">
		<p
			class="ml-2 w-[24rem] font-sourcehansan text-[1.5vh] font-semibold text-white drop-shadow-xl"
			style:text-shadow={'4px 4px 8px black'}
		>
			{name}
		</p>

		<p
			style:box-shadow={'4px 4px 21px rgba(0,0,0,0.68)'}
			class="z-30 w-24 rounded-xl bg-{mod} p-1 text-3xl font-bold text-white shadow-xl"
		>
			{`${mod}${mod != 'TB' ? idx : ''}`}
		</p>
	</div>
</button>
