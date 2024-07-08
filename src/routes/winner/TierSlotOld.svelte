<script lang="ts">
	import type { PlayerMetadata } from '$lib';

	export let tier: number;
	export let players: PlayerMetadata[];
</script>

<div
	class="group flex first:bg-red-300 last:bg-yellow-300 [&:nth-child(2)]:bg-pink-300 [&:nth-child(3)]:bg-blue-300"
>
	<div class="flex grow flex-col justify-stretch">
		{#each players as player}
			<div class="flex h-1/2 w-full items-center gap-2">
				<img src="https://a.ppy.sh/{player.id}" alt="ICON" class="h-full w-auto" />
				<p class="font-misans text-5xl">{player.name}</p>
			</div>
		{/each}
	</div>
	<div
		class="px-3 *:text-8xl *:font-semibold group-[:nth-child(1)]:bg-red-500 group-[:nth-child(4)]:bg-yellow-500 group-[:nth-child(2)]:bg-pink-500 group-[:nth-child(3)]:bg-blue-500"
	>
		<p>T</p>
		<p>{tier}</p>
	</div>
</div>
