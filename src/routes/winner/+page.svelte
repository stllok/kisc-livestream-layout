<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';

	$: team_red_score = $MANAGER_DATA.stars.left;
	$: team_blue_score = $MANAGER_DATA.stars.right;
</script>

<div class="flex h-screen flex-col items-center justify-end">
	<div class="flex items-center gap-52">
		<p class="text-[33rem] font-bold text-TEAMBLUE">{team_blue_score}</p>
		<p class="text-[15rem] font-bold text-[#d37981]">VS</p>
		<p class="text-[33rem] font-bold text-TEAMRED">{team_red_score}</p>
	</div>
	<p
		class="text-[15rem] font-bold"
		class:text-TEAMBLUE={team_blue_score > team_red_score}
		class:text-TEAMRED={team_red_score > team_blue_score}
	>
		WINNER
	</p>
</div>
