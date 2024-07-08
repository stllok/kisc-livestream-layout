<script lang="ts">
	import type { PlayerMetadata } from '$lib';

	export let tier: number;
	export let players: PlayerMetadata[];
</script>

<div class="group/tier flex items-start justify-stretch gap-5">
	<p
		class="rounded-full px-8 py-1 text-6xl font-semibold text-white group-first/tier:bg-red-400 group-last/tier:bg-yellow-300 group-[:nth-child(2)]/tier:bg-pink-300 group-[:nth-child(3)]/tier:bg-blue-500"
	>
		T{tier}
	</p>

	<div class="flex grow flex-col justify-stretch gap-2">
		{#each players as player}
			<div class="flex w-full items-center gap-4">
				<img src="https://a.ppy.sh/{player.id}" alt="ICON" class="h-24 w-auto" />
				<p class="font-misans text-5xl">{player.name}</p>
			</div>
		{/each}
	</div>
</div>
