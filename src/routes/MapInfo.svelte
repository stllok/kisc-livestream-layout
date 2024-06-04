<script lang="ts">
	import { BEATMAP_METADATA, GOSUMEMORY_ADDRESS } from '$lib/state/gosu';

	$: THIRD_LINE = [
		['SR', `${$BEATMAP_METADATA.stats.fullSR}*`],
		[
			'Length',
			`${('00' + Math.floor($BEATMAP_METADATA.time.full / 1000 / 60)).slice(-2)}:${('00' + Math.floor(($BEATMAP_METADATA.time.mp3 / 1000) % 60)).slice(-2)}`
		],
		['', `[${$BEATMAP_METADATA.metadata.difficulty}]`]
	];

	$: FOURTH_LINE = [
		['CS', `${$BEATMAP_METADATA.stats.memoryCS}`],
		['AR', `${$BEATMAP_METADATA.stats.memoryAR}`],
		['OD', `${$BEATMAP_METADATA.stats.memoryOD}`],
		['BPM', `${$BEATMAP_METADATA.stats.BPM.max}`]
	];
</script>

<div
	class="flex h-36 w-full gap-2 self-center duration-1000 *:text-[#7e7295] first:pb-2 [&:nth-child(2)]:justify-center"
>
	<img
		class="h-36 w-auto rounded-2xl border-2 border-[#7e22ce]"
		src={`http://${GOSUMEMORY_ADDRESS}/Songs/${$BEATMAP_METADATA.path.full}`}
		alt="BG"
	/>
	<div class="flex min-w-96 flex-col justify-around">
		<p class="overflow-visible text-4xl font-extrabold">{$BEATMAP_METADATA.metadata.title}</p>
		<div class="flex justify-between *:text-2xl *:font-bold">
			<p>{$BEATMAP_METADATA.metadata.artist}</p>
			<p>{$BEATMAP_METADATA.metadata.mapper}</p>
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
