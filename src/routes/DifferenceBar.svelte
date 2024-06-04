<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';

	$: red_score = $MANAGER_DATA.gameplay.score.left;
	$: blue_score = $MANAGER_DATA.gameplay.score.right;
	$: is_tie = red_score == blue_score;
	$: is_red_win = red_score > blue_score;
</script>

<div class="flex h-4 w-screen *:duration-200">
	<div
		class="h-full bg-TEAMRED"
		style:width="{is_tie ? 50 : (red_score / (red_score + blue_score)) * 100}%"
	/>
	<div
		class="h-full bg-TEAMBLUE"
		style:width="{is_tie ? 50 : (blue_score / (red_score + blue_score)) * 100}%"
	/>
</div>

<div class="flex *:duration-200">
	<div
		class=" h-full"
		style:width="{is_tie ? 50 : (red_score / (red_score + blue_score)) * 100}%"
	/>
	<p
		class="text-5xl font-bold text-black"
		class:red_win={is_red_win && !is_tie}
		class:blue_win={!is_red_win && !is_tie}
	>
		{Math.abs(red_score - blue_score)}
	</p>
	<div
		class="h-full"
		style:width="{is_tie ? 50 : (blue_score / (red_score + blue_score)) * 100}%"
	/>
</div>

<style lang="postcss">
	.red_win {
		@apply text-red-400;
	}
	.blue_win {
		@apply text-blue-400;
	}
</style>
