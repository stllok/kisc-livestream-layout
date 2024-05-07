<script lang="ts">
	export let red_score: number;
	export let blue_score: number;

	let is_tie = red_score - blue_score == 0;
	let is_red_win = red_score > blue_score;
</script>

<div class="flex h-4 w-screen">
	<div class="h-full bg-red-400" style:width="{(red_score / (red_score + blue_score)) * 100}%" />
	<div class="h-full bg-blue-500" style:width="{(blue_score / (red_score + blue_score)) * 100}%" />
</div>

<div class="flex">
	<div class="h-full" style:width="{(red_score / (red_score + blue_score)) * 100}%" />
	<p
		class="text-5xl font-bold"
		class:red_win={is_red_win && !is_tie}
		class:blue_win={!is_red_win && !is_tie}
	>
		{Math.abs(red_score - blue_score)}
	</p>
	<div class="h-full" style:width="{(blue_score / (red_score + blue_score)) * 100}%" />
</div>

<style lang="postcss">
	.red_win {
		@apply text-red-400;
	}
	.blue_win {
		@apply text-blue-400;
	}
</style>
