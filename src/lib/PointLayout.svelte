<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';
	import PointInfo from './PointInfo.svelte';
	import { STATIC_TEAMNAMES } from './state/team';
</script>

{#await STATIC_TEAMNAMES then TEAMNAMES}
	<div class="flex h-[130px] justify-between">
		<PointInfo
			teamname={TEAMNAMES.left}
			target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
			current_point={$MANAGER_DATA.stars.left}
		/>
		<PointInfo
			teamname={TEAMNAMES.right}
			target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
			current_point={$MANAGER_DATA.stars.right}
		/>
	</div>
{/await}
