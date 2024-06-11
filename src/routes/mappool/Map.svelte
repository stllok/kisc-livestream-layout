<script lang="ts">
	import { BEATMAP_METADATA, MANAGER_DATA } from '$lib/state/gosu';
	import { fade, fly } from 'svelte/transition';
	import type { MapPoolMetadata } from '../+layout';
	import { bounceOut, quintOut } from 'svelte/easing';

	// map metadata
	export let mod: string;
	export let idx: number;
	export let map: MapPoolMetadata;
	// status
	export let is_ban: boolean;
	export let is_team_red: boolean;

	let PICK_EFFECT = false;

	let RESULT: [boolean, boolean] | null = null;
	function on_set() {
		RESULT = RESULT === null ? [is_ban, is_team_red] : RESULT;
		is_team_red = !is_team_red;
	}

	function on_unset() {
		RESULT = null;
	}

	async function trigger_pick_flashing() {
		PICK_EFFECT = true;
		await new Promise((resolve) => setTimeout(resolve, 1));
		PICK_EFFECT = false;
	}

	$: if ($BEATMAP_METADATA.set === map.mapset_id && !is_ban) {
		on_set();
	}
</script>

<button
	class="relative m-2 h-12 w-[36rem] rounded-2xl *:rounded-2xl *:duration-200"
	on:click={on_set}
	on:contextmenu|preventDefault={on_unset}
>
	{#if PICK_EFFECT}
		<div
			class="-z-10 h-full w-full bg-white"
			out:fade={{ delay: 0, duration: 3000, easing: bounceOut }}
		></div>
	{/if}
	{#if RESULT !== null && RESULT[0]}
		<!-- On BAN action -->
		<p
			class="absolute top-0 z-30 flex h-full w-[34.5rem] items-center justify-center text-2xl font-semibold"
			class:text-TEAMRED={RESULT[1]}
			class:text-TEAMBLUE={!RESULT[1]}
			transition:fade
		>
			{RESULT[1] ? $MANAGER_DATA.teamName.left : $MANAGER_DATA.teamName.right} Banned
		</p>
		<div transition:fade class="absolute top-0 z-20 h-full w-[34.5rem] bg-black opacity-65"></div>
	{:else if RESULT !== null && !RESULT[0]}
		<!-- On PICK Action -->
		<p
			class="absolute -bottom-5 -left-2 z-10 h-6 w-auto px-2 font-semibold text-white"
			class:bg-TEAMRED={RESULT[1]}
			class:bg-TEAMBLUE={!RESULT[1]}
			transition:fly={{ delay: 0, duration: 1000, x: 0, y: 100, opacity: 0.1, easing: quintOut }}
			on:introend={trigger_pick_flashing}
		>
			{RESULT[1] ? $MANAGER_DATA.teamName.left : $MANAGER_DATA.teamName.right} pick
		</p>
	{/if}
	<!-- Background -->
	<div
		style:background-image={`url('https://assets.ppy.sh/beatmaps/${map.mapset_id}/covers/cover@2x.jpg')`}
		style:box-shadow={'4px 4px 21px rgba(0,0,0,0.58)'}
		class="absolute top-0 -z-10 h-full w-[34.5rem] bg-cover bg-local bg-center bg-origin-padding brightness-[.8]"
	/>
	<div class="absolute top-0 flex h-full w-full items-center justify-between">
		<!-- Metadata -->
		<div class="flex w-[32rem] flex-col px-4 *:font-sourcehansan">
			<!-- Map's Song Name -->
			<p
				class="text-[1.5vh] font-semibold text-white drop-shadow-xl"
				style:text-shadow={'4px 4px 8px black'}
			>
				{map.Title}
			</p>
			<!-- Map Metadata -->
			<div class="flex justify-between *:text-[1vh]">
				<div class="inline-flex *:text-white">
					<p class="" style:text-shadow={'4px 4px 8px black'}>Artist:</p>
					<p class="font-extrabold" style:text-shadow={'4px 4px 8px black'}>
						{map.Artist}
					</p>
				</div>
				<div class="inline-flex *:text-white">
					<p class="" style:text-shadow={'4px 4px 8px black'}>Mapper:</p>
					<p class="font-extrabold" style:text-shadow={'4px 4px 8px black'}>
						{map.Mapper}
					</p>
				</div>
				<div class="inline-flex *:text-white">
					<p class="" style:text-shadow={'4px 4px 8px black'}>Difficulty:</p>
					<p class="font-extrabold" style:text-shadow={'4px 4px 8px black'}>
						{map.Difficulty}
					</p>
				</div>
			</div>
		</div>
		<!-- Mod Badge -->
		<p
			style:box-shadow={'4px 4px 21px rgba(0,0,0,0.68)'}
			class="z-30 w-14 rounded-xl bg-{mod} p-1 text-xl font-bold text-white shadow-xl"
		>
			{`${mod}${mod != 'TB' ? idx : ''}`}
		</p>
	</div>
</button>
