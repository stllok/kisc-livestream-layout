<script lang="ts">
	import { TEAM_DATA } from '$lib';
	import { MANAGER_DATA } from '$lib/state/gosu';
	import TierSlot from './TierSlot.svelte';

	$: IS_LEFT_WIN = $MANAGER_DATA.stars.left > $MANAGER_DATA.stars.right;
	$: TEAMNAME = IS_LEFT_WIN ? $MANAGER_DATA.teamName.left : $MANAGER_DATA.teamName.right
	$: PLAYERS = TEAM_DATA[TEAMNAME] ?? []
</script>


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