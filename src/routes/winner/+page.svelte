<script lang="ts">
	let team_blue_score = 7;
	let team_red_score = 5;
</script>

<div class="flex h-screen flex-col items-center justify-end">
	<div class="flex items-center gap-52">
		<p class="text-[33rem] font-bold text-[#b44e58]">{team_blue_score}</p>
		<p class="text-[15rem] font-bold text-[#d37981]">VS</p>
		<p class="text-[33rem] font-bold text-[#b44e58]">{team_red_score}</p>
	</div>
	<p class="text-[15rem] font-bold">WINNER</p>
</div>
