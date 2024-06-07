<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';

	$: is_tie = $MANAGER_DATA.gameplay.score.left == $MANAGER_DATA.gameplay.score.right;
	$: is_red_win = $MANAGER_DATA.gameplay.score.left > $MANAGER_DATA.gameplay.score.right;
</script>

<!-- Color Bar -->
<div class="flex h-4 w-screen *:duration-500">
	<div
		class="h-full bg-TEAMRED"
		style:width="{is_tie
			? 50
			: ($MANAGER_DATA.gameplay.score.left /
					($MANAGER_DATA.gameplay.score.left + $MANAGER_DATA.gameplay.score.right)) *
				100}%"
	/>
	<div
		class="h-full bg-TEAMBLUE"
		style:width="{is_tie
			? 50
			: ($MANAGER_DATA.gameplay.score.right /
					($MANAGER_DATA.gameplay.score.left + $MANAGER_DATA.gameplay.score.right)) *
				100}%"
	/>
</div>

<!-- Diff Number -->
<div class="flex *:duration-500">
	<div
		class="h-full"
		style:width="{is_tie
			? 50
			: ($MANAGER_DATA.gameplay.score.left /
					($MANAGER_DATA.gameplay.score.left + $MANAGER_DATA.gameplay.score.right)) *
				100}%"
	/>
	<p
		class="text-5xl font-bold"
		class:text-TEAMRED={is_red_win && !is_tie}
		class:text-TEAMBLUE={!is_red_win && !is_tie}
		class:text-black={is_tie}
	>
		{Math.abs($MANAGER_DATA.gameplay.score.left - $MANAGER_DATA.gameplay.score.right)}
	</p>
	<div
		class="h-full"
		style:width="{is_tie
			? 50
			: ($MANAGER_DATA.gameplay.score.right /
					($MANAGER_DATA.gameplay.score.left + $MANAGER_DATA.gameplay.score.right)) *
				100}%"
	/>
</div>
