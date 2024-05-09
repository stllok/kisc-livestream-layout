<script lang="ts">
	export let time: string;
	export let name: string;
	export let team: number;
</script>

<div class="flex gap-2 overflow-hidden">
	<p>{time}</p>
	<div class="flex">
		<p>{name}</p>
		<p>:</p>
	</div>
	<p class="h-auto w-full text-wrap">
		<slot />
	</p>
</div>
