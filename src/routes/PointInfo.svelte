<script lang="ts">
	import { fade } from 'svelte/transition';

	export let teamname: string;
	export let target_point: number;
	export let current_point: number;

	function handle_score(is_add: boolean) {
		current_point = Math.min(target_point, Math.max(0, current_point + (is_add ? 1 : -1)));
	}
</script>

<div class="group flex gap-2 last:flex-row-reverse">
	<img src="https://a.ppy.sh/14817468" alt="ICON" class="w-24 rounded-3xl" />
	<div class="flex flex-col items-start justify-center group-last:items-end">
		<p class="text-5xl font-bold text-red-400 group-last:text-blue-500">{teamname}</p>
		<button
			class="flex gap-1 duration-100 group-last:flex-row-reverse"
			on:click={() => handle_score(true)}
			on:contextmenu|preventDefault={() => handle_score(false)}
		>
			{#each Array(target_point).keys() as i}
				<!-- <img src={i < current_point ? '/point.avif' : '/not-point.avif'} alt="POINT" /> -->
				{#key i}
					{#if i < current_point}
						<img src="/point.avif" alt="POINT" in:fade />
					{:else}
						<img src="/not-point.avif" alt="NOT_POINT" in:fade />
					{/if}
				{/key}
			{/each}
		</button>
	</div>
</div>
