<script lang="ts">
	import { fade } from 'svelte/transition';
	import { MANAGER_DATA } from './state/gosu';

	export let teamname: string;
	export let target_point: number;
	export let current_point: number;
</script>

<div class="group flex gap-2 px-2 py-2 last:flex-row-reverse ">
	<img
		src="/kisc_static/team/{teamname}"
		alt="ICON"
		class="h-28 w-28 rounded-xl object-cover"
		on:error={(o) => {
			o.target.src = '/kisc_static/team/default.png';
		}}
	/>
	<div class="flex flex-col items-start justify-between group-last:items-end">
		<p class="mt-1 font-misans text-5xl font-extrabold text-TEAMRED group-last:text-TEAMBLUE">
			{teamname}
		</p>
		{#if $MANAGER_DATA.bools.starsVisible}
			<div class="flex gap-1 duration-100 group-last:flex-row-reverse" transition:fade>
				{#each Array(target_point).keys() as i}
					<div
						class="h-[50px] w-[50px] bg-contain transition-all duration-1000 group-last:-scale-x-100 data-[point=false]:saturate-0"
						data-point={i < current_point}
						style:background-image={`url("/kisc_static/point.svg")`}
					/>
				{/each}
			</div>
		{:else}
			<p class="font-misans text-3xl font-semibold">WARM-UP...</p>
		{/if}
	</div>
</div>
