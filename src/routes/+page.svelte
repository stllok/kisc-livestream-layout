<script lang="ts">
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';

	let red_team_score = 50;
	let blue_team_score = 50;
</script>

<div class="flex h-screen w-screen flex-col justify-between">
	<div>
		<div class="flex justify-between p-3">
			<PointInfo teamname="Team RED" target_point={5} current_point={0} />
			<PointInfo teamname="Team BLUE" target_point={5} current_point={0} />
		</div>
		<hr class="h-1 bg-[#7e7295]" />

		<!-- HOW TO GET THE AREA???????? -->
		<div class="h-[720px] w-[1920px] bg-green-500"></div>
		<DifferenceBar red_score={red_team_score} blue_score={blue_team_score} />
		<div class="mx-12 flex justify-between">
			<p class="text-7xl font-bold text-red-400">{red_team_score}</p>
			<MapInfo
				title={'Hitoribocchi Tokyo'}
				artist={'kessoku band'}
				mapper={'X Light'}
				length={203}
				diff_name={'Hard Rock'}
				ar={9.3}
				od={8.5}
				cs={4}
				bpm={192}
				star_rating={6.37}
			/>
			<p class="text-7xl font-bold text-blue-500">{blue_team_score}</p>
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
