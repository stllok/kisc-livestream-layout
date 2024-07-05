<script lang="ts">
	import { WEIGHTED_TEAMBLUE_SCORE, WEIGHTED_TEAMRED_SCORE } from '$lib/state/gosu';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	$: is_tie = $WEIGHTED_TEAMRED_SCORE == $WEIGHTED_TEAMBLUE_SCORE;
	$: is_red_win = $WEIGHTED_TEAMRED_SCORE > $WEIGHTED_TEAMBLUE_SCORE;
	$: DIFFS = Math.abs($WEIGHTED_TEAMRED_SCORE - $WEIGHTED_TEAMBLUE_SCORE);
	const DIFF_SMOOTH = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	$: DIFF_SMOOTH.set(DIFFS);
</script>

<!-- Color Bar -->
<div class="flex h-4 w-screen *:duration-500">
	<div
		class="h-full bg-TEAMRED"
		style:width="{is_tie
			? 50
			: ($WEIGHTED_TEAMRED_SCORE / ($WEIGHTED_TEAMRED_SCORE + $WEIGHTED_TEAMBLUE_SCORE)) * 100}%"
	/>
	<div
		class="h-full bg-TEAMBLUE"
		style:width="{is_tie
			? 50
			: ($WEIGHTED_TEAMBLUE_SCORE / ($WEIGHTED_TEAMRED_SCORE + $WEIGHTED_TEAMBLUE_SCORE)) * 100}%"
	/>
</div>

<!-- Diff Number -->
<div class="flex *:duration-500">
	<div
		class="h-full"
		style:width="{is_tie
			? 50
			: ($WEIGHTED_TEAMRED_SCORE / ($WEIGHTED_TEAMRED_SCORE + $WEIGHTED_TEAMBLUE_SCORE)) * 100}%"
	/>
	<p
		class="font-bahnschrift text-5xl font-bold"
		class:text-TEAMRED={is_red_win && !is_tie}
		class:text-TEAMBLUE={!is_red_win && !is_tie}
		class:text-black={is_tie}
	>
		{$DIFF_SMOOTH
			.toFixed(0)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	</p>
	<div
		class="h-full"
		style:width="{is_tie
			? 50
			: ($WEIGHTED_TEAMBLUE_SCORE / ($WEIGHTED_TEAMRED_SCORE + $WEIGHTED_TEAMBLUE_SCORE)) * 100}%"
	/>
</div>
