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
	const MAX_SCORE = 1000000;

	$: DIFF_SMOOTH.set(DIFFS);
	$: BAR_PERCENT = Math.min(1, Math.pow(DIFFS / MAX_SCORE, 0.5) / 2) * 100

</script>

<!-- Color Bar -->
<div class="flex h-4 w-screen *:duration-500">
	<div
		class="h-full bg-TEAMRED"
		style:width="{50 + (is_red_win ? BAR_PERCENT : -BAR_PERCENT)}%"
	/>
	<div
		class="h-full bg-TEAMBLUE"
		style:width="{50 + (!is_red_win ? BAR_PERCENT : -BAR_PERCENT)}%"
	/>
</div>

<!-- Diff Number -->
<div class="flex *:duration-500">
	<div class="h-full" style:width="{50 + (is_red_win ? BAR_PERCENT : -BAR_PERCENT)}%" />
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
	<div class="h-full" style:width="{50 + (!is_red_win ? BAR_PERCENT : -BAR_PERCENT)}%" />
</div>
