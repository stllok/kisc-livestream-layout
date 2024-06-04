<script>
	import { MANAGER_DATA } from "$lib/state/gosu";
	import PointInfo from "./PointInfo.svelte";
</script>

<div class="flex justify-between p-3 h-[120px]">
    <PointInfo
        teamname={$MANAGER_DATA.teamName.left}
        target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
        current_point={$MANAGER_DATA.stars.left}
    />
    <PointInfo
        teamname={$MANAGER_DATA.teamName.right}
        target_point={Math.ceil($MANAGER_DATA.bestOF / 2)}
        current_point={$MANAGER_DATA.stars.right}
    />
</div>