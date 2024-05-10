<script lang="ts">
	import Page from './+page.svelte';

	export let title: string;
	export let artist: string;
	export let mapper: string;
	export let length: number;
	export let diff_name: string;
	export let cs: number;
	export let ar: number;
	export let od: number;
	export let bpm: number;
	export let star_rating: number;

	const THIRD_LINE = [
		['SR', `${star_rating}*`],
		['Length', `${Math.floor(length / 60)}:${length % 60}`],
		['', `[${diff_name}]`]
	];

	const FOURTH_LINE = [
		['CS', `${cs.toFixed(1)}`],
		['AR', `${ar.toFixed(1)}`],
		['OD', `${od.toFixed(1)}`],
		['BPM', `${bpm}`]
	];
</script>

<div class="flex h-36 gap-2 *:text-[#7e7295]">
	<img class="h-36 w-auto rounded-2xl border-2 border-[#7e22ce]" src="/SAMPLE/bg.jpg" alt="BG" />
	<div class="flex w-96 flex-col justify-around">
		<p class="text-4xl font-extrabold">{title}</p>
		<div class="flex justify-between *:text-2xl *:font-bold">
			<p>{artist}</p>
			<p>{mapper}</p>
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
