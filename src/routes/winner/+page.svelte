<script lang="ts">
	import { TEAM_DATA } from '$lib';
	import { MANAGER_DATA } from '$lib/state/gosu';
	import { onMount } from 'svelte';
	import TierSlot from './TierSlot.svelte';
	import { STATIC_TEAMNAMES, type TeamConfig } from '$lib/state/team';

	$: IS_LEFT_WIN = $MANAGER_DATA.stars.left > $MANAGER_DATA.stars.right;
</script>

{#await STATIC_TEAMNAMES then TEAMNAMES}
{@const TEAMNAME = IS_LEFT_WIN ? TEAMNAMES.left : TEAMNAMES.right}
{@const PLAYERS = TEAM_DATA[TEAMNAME] ?? []}

<div
	class="group/main flex h-screen w-screen flex-col items-center justify-center gap-8"
	data-is-red-win={IS_LEFT_WIN}
>
	<p
		class="font-alegreya text-9xl group-data-[is-red-win=false]/main:text-[#2b4390] group-data-[is-red-win=true]/main:text-[#902b2b]"
	>
		Winner
	</p>
	<p
		class="font-alegreya text-9xl group-data-[is-red-win=false]/main:text-[#2b4390] group-data-[is-red-win=true]/main:text-[#902b2b]"
	>
		{TEAMNAME}
	</p>
	<div class="grid grid-cols-2 grid-rows-2 gap-4">
		{#each Array(4) as _, i}
			<TierSlot
				players={[
					PLAYERS[i * 2] ?? {
						id: 0,
						name: 'NOT EXISTS'
					},
					PLAYERS[i * 2 + 1] ?? {
						id: 0,
						name: 'NOT EXISTS'
					}
				]}
				tier={i + 1}
			/>
		{/each}
	</div>
</div>
{/await}