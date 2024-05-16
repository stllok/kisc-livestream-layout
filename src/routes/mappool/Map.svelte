<script lang="ts">
	import { fade } from 'svelte/transition';

	export let mod: string;
	export let idx: number;
	export let artist: string;
	export let title: string;
	export let difficulty: string;

	// status
	export let is_ban: boolean;
	export let is_team_red: boolean;

	let RESULT: [boolean, boolean] | null = null;
	function on_set() {
		RESULT = [is_ban, is_team_red];
	}

	function on_unset() {
		RESULT = null;
	}
</script>

<button
	class="m-2 h-16 w-[38rem] rounded-2xl *:rounded-2xl *:duration-200"
	style:box-shadow={'4px 4px 21px rgba(0,0,0,0.58)'}
	on:click={on_set}
	on:contextmenu|preventDefault={on_unset}
>
	{#if RESULT !== null}
		<div
			class="absolute top-3 z-30 h-full w-full text-4xl font-semibold"
			class:team_red={RESULT[1]}
			class:team_blue={!RESULT[1]}
			transition:fade
		>
			Team {RESULT[1] ? 'Red' : 'Blue'} Banned
		</div>
		<div transition:fade class="absolute z-20 h-full w-full bg-black opacity-65"></div>
	{/if}
	<div
		style:background-image={`url("/SAMPLE/bg.jpg")`}
		class="-z-10 h-full w-full bg-cover bg-local bg-center bg-origin-padding"
	/>
	<div class="relative -top-14 flex items-center justify-between">
		<p
			class="drop-shadow-2x loverflow-hidden ml-5 text-nowrap text-3xl font-semibold text-white"
			style:text-shadow={'4px 4px 8px black'}
		>
			{artist} - {title} [{difficulty}]
		</p>

		<p
			style:box-shadow={'4px 4px 21px rgba(0,0,0,0.68)'}
			class="z-30 -mr-14 w-24 rounded-xl bg-{mod} p-1 text-4xl font-bold text-white shadow-xl"
		>
			{mod}{mod != 'TB' ? idx : ''}
		</p>
	</div>
</button>

<style lang="postcss">
	.team_red {
		@apply text-red-300;
	}

	.team_blue {
		@apply text-blue-300;
	}
</style>
