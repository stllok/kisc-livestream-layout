<script lang="ts">
	import { MANAGER_DATA } from '$lib/state/gosu';
</script>

<div class="flex h-screen flex-col items-center justify-end">
	<div class="flex items-center gap-52">
		<p class="text-[33rem] font-bold text-TEAMRED">{$MANAGER_DATA.stars.left}</p>
		<p class="text-[15rem] font-bold text-[#d37981]">VS</p>
		<p class="text-[33rem] font-bold text-TEAMBLUE">{$MANAGER_DATA.stars.right}</p>
	</div>
	<p
		class="text-[15rem] font-bold"
		class:text-TEAMBLUE={$MANAGER_DATA.stars.right > $MANAGER_DATA.stars.left}
		class:text-TEAMRED={$MANAGER_DATA.stars.left > $MANAGER_DATA.stars.right}
	>
		WINNER
	</p>
</div>
