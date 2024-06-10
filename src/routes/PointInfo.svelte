<script lang="ts">
	import { fade } from 'svelte/transition';
	import point from '$lib/assets/point.png?enhanced&w=50';
	import not_point from '$lib/assets/not-point.png?enhanced&w=50';
	import logo from '$lib/assets/logo.png?enhanced&w=105&h=105';

	export let teamname: string;
	export let target_point: number;
	export let current_point: number;
</script>

<div class="group flex gap-2 last:flex-row-reverse">
	<enhanced:img src={logo} alt="ICON" class="rounded-xl" fetchpriority="high" loading="eager" />
	<div class="flex flex-col items-start justify-center group-last:items-end">
		<p class="text-5xl font-bold text-TEAMRED group-last:text-TEAMBLUE">
			{teamname}
		</p>
		<div class="flex gap-1 duration-100 group-last:flex-row-reverse">
			{#each Array(target_point).keys() as i}
				<!-- <img src={i < current_point ? '/point.avif' : '/not-point.avif'} alt="POINT" /> -->
				{#key i}
					<enhanced:img
						src={i < current_point ? point : not_point}
						alt="POINT"
						fetchpriority="high"
						loading="eager"
						in:fade
						out:fade
					/>
				{/key}
			{/each}
		</div>
	</div>
</div>
