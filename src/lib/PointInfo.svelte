<script lang="ts">
	import { fade } from 'svelte/transition';
	import { MANAGER_DATA } from './state/gosu';

	export let teamname: string;
	export let target_point: number;
	export let current_point: number;
</script>

<div class="group flex gap-2 px-2 py-2 last:flex-row-reverse">
	<enhanced:img
		src="$lib/assets/logo.png?enhanced&w=105&h=105"
		alt="ICON"
		class="rounded-xl"
		fetchpriority="high"
		loading="eager"
	/>
	<div class="flex flex-col items-start justify-between group-last:items-end">
		<p class="font-misans text-5xl font-extrabold text-TEAMRED group-last:text-TEAMBLUE">
			{teamname}
		</p>
		{#if $MANAGER_DATA.bools.starsVisible}
		<div class="flex gap-1 duration-100 group-last:flex-row-reverse" transition:fade>
			{#each Array(target_point).keys() as i}
				{#if i < current_point}
					<enhanced:img
						src="$lib/assets/point.png?w=50"
						alt="POINT"
						fetchpriority="high"
						loading="eager"
						in:fade={{ duration: 500 }}
					/>
				{:else}
					<enhanced:img
						src="$lib/assets/not-point.png?w=50"
						alt="NOTPOINT"
						fetchpriority="high"
						loading="eager"
						in:fade={{ duration: 500 }}
					/>
				{/if}
			{/each}
		</div>
		{/if}
	</div>
</div>
