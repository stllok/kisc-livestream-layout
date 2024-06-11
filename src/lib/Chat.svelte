<script lang="ts">
	export let time: string;
	export let name: string;
	export let team: number;
</script>

<div class="flex gap-2">
	<p class="text-xl font-semibold text-gray-100">{time}</p>
	<div class="*:inline">
		<p
			class="text-xl font-bold"
			class:ref={team == 0}
			class:team_red={team == 1}
			class:team_blue={team == 2}
		>
			{name}:
		</p>
		<p class="h-auto w-full text-wrap text-xl font-bold text-white">
			<slot />
		</p>
	</div>
</div>

<style lang="postcss">
	.team_red {
		@apply text-red-400;
	}

	.team_blue {
		@apply text-blue-400;
	}

	.ref {
		@apply text-green-400;
	}
</style>
