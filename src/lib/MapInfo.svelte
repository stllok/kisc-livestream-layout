<script lang="ts">
	import { BEATMAP_METADATA, GOSUMEMORY_ADDRESS } from '$lib/state/gosu';
	import { onMount } from 'svelte';
	import { MAPPOOL, type MapPoolMetadata, type MapPools } from './state/mappool';

	let CURRENT_MAP_ID = 0;

	let MAP: MapPoolMetadata | null = null;

	let red_pick: boolean | null = null;

	let mappool: MapPools = {};
	onMount(async () => {
		mappool = await MAPPOOL;
	});

	BEATMAP_METADATA.subscribe((bm) => {
		if (bm.id !== CURRENT_MAP_ID) {
			red_pick = red_pick !== null ? !red_pick : red_pick;
			Object.entries(mappool).forEach(([_, maps]) =>
				maps.forEach((map: MapPoolMetadata) => {
					if ($BEATMAP_METADATA.id === map.beatmap_id) {
						MAP = map;
					}
				})
			);
			CURRENT_MAP_ID = bm.id;

			MAP = MAP?.beatmap_id === $BEATMAP_METADATA.id ? MAP : null;
			console.log(MAP);
		}
	});

	$: THIRD_LINE = [
		['SR', `${MAP?.star.toFixed(2) ?? $BEATMAP_METADATA.stats.fullSR}*`],
		[
			'Length',
			`${('00' + Math.floor((MAP?.length ?? $BEATMAP_METADATA.time.full / 1000) / 60)).slice(-2)}:${('00' + Math.floor((MAP?.length ?? $BEATMAP_METADATA.time.full / 1000) % 60)).slice(-2)}`
		],
		['', `[${MAP?.difficulty ?? $BEATMAP_METADATA.metadata.difficulty}]`]
	];

	$: FOURTH_LINE = [
		['CS', `${MAP?.cs.toFixed(1) ?? $BEATMAP_METADATA.stats.memoryCS}`],
		['AR', `${MAP?.ar.toFixed(1) ?? $BEATMAP_METADATA.stats.memoryAR}`],
		['OD', `${MAP?.od.toFixed(1) ?? $BEATMAP_METADATA.stats.memoryOD}`],
		['BPM', `${MAP?.bpm ?? $BEATMAP_METADATA.stats.BPM.max}`]
	];
</script>

<div
	class="flex h-36 w-full gap-2 self-center duration-1000 *:h-36 *:text-[#7e7295] first:pb-2 [&:nth-child(2)]:justify-center"
>
	<button
		on:click={() => (red_pick = red_pick === null ? true : !red_pick)}
		on:contextmenu|preventDefault={() => (red_pick = null)}
	>
		<img
			class="w-64 h-36 rounded-3xl border-4 object-cover duration-1000 data-[team=blue]:border-TEAMBLUE_BORDER data-[team=none]:border-[#7e22ce] data-[team=red]:border-TEAMRED_BORDER"
			data-team={red_pick === null ? 'none' : red_pick ? 'red' : 'blue'}
			src={`http://${GOSUMEMORY_ADDRESS}/Songs/${$BEATMAP_METADATA.path.full}`}
			alt="BG"
		/>
	</button>
	<div class="flex min-w-[32rem] flex-col justify-around *:font-misans">
		<p class="overflow-visible text-3xl font-extrabold">
			{MAP?.title ?? $BEATMAP_METADATA.metadata.title}
		</p>
		<div class="flex justify-between *:text-2xl *:font-bold">
			<p>{MAP?.artist ?? $BEATMAP_METADATA.metadata.artist}</p>
			<p>{MAP?.mapper ?? $BEATMAP_METADATA.metadata.mapper}</p>
		</div>
		<div class="flex justify-between">
			{#each THIRD_LINE as line}
				<div class="flex items-end gap-1 first:text-red-400 [&:nth-child(2)]:text-blue-500">
					<p class="text-sm font-semibold">{line[0]}</p>
					<p class="text-xl font-bold">{line[1]}</p>
				</div>
			{/each}
		</div>
		<div class="flex justify-between *:text-xl *:font-bold">
			{#each FOURTH_LINE as line}
				<p>{line[0]}</p>
				<p>{line[1]}</p>
				<p class="last:hidden">/</p>
			{/each}
		</div>
	</div>
</div>
