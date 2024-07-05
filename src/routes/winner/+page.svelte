<script lang="ts">
	import { TEAM_DATA } from '$lib';
	import { MANAGER_DATA } from '$lib/state/gosu';
	import TierSlot from './TierSlot.svelte';

	$: IS_LEFT_WIN = $MANAGER_DATA.stars.left > $MANAGER_DATA.stars.right;
	$: TEAMNAME = IS_LEFT_WIN ? $MANAGER_DATA.teamName.left : $MANAGER_DATA.teamName.right;
	$: PLAYERS = TEAM_DATA[TEAMNAME] ?? [];
</script>

<div
	class="group fixed top-1/2 h-96 w-full -translate-y-1/2 data-[left-win=false]:bg-blue-300 data-[left-win=true]:bg-red-300"
	data-left-win={IS_LEFT_WIN}
>
	<!-- Team info -->
	<div
		class="absolute -top-16 left-8 flex h-[32rem] w-96 grow flex-col justify-between group-data-[left-win=false]:bg-TEAMBLUE group-data-[left-win=true]:bg-TEAMRED"
	>
		<img src="/kisc_static/team/{TEAMNAME}" alt="ICON" class="h-auto w-full" />
		<p class="grow text-center font-misans text-4xl">{TEAMNAME}</p>
	</div>
	<!-- player list -->
	<div class="absolute right-0 grid h-96 w-[94rem] grid-cols-2 grid-rows-2">
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
