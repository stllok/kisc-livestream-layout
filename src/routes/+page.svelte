<script lang="ts">
	import Chat from './Chat.svelte';
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';

	let red_team_score = 50;
	let blue_team_score = 50;

	let is_playing = false;	// Listen for messages
	const SOCKET = new WebSocket('ws://127.0.0.1:24050/ws');
	SOCKET.addEventListener('message', (event) => {
		red_team_score = 0;
		blue_team_score = 0 ;
		let tourney_data = JSON.parse(event.data)['tourney']['ipcClients'];

		tourney_data.forEach((data) => {
			switch(data.team) {
					case "left":
					red_team_score += data.gameplay.score;
					break;
					case "right":
					blue_team_score += data.gameplay.score;
					break;
			}
		});
		console.log(tourney_data);
	});
</script>

<div class="flex h-screen w-screen flex-col justify-between">
	<div>
		<!-- Upper screen -->
		<div class="flex justify-between p-3">
			<PointInfo teamname="Team RED" target_point={5} current_point={0} />
			<PointInfo teamname="Team BLUE" target_point={5} current_point={0} />
		</div>
		<hr class="h-1 bg-[#7e7295]" />

		<!-- Green screen -->
		<div class="h-[720px] w-[1920px] bg-green-500"></div>

		<!-- Bottom screen -->
		<DifferenceBar red_score={red_team_score} blue_score={blue_team_score} {is_playing} />
		<div class="mx-12 mt-3 flex grow justify-between">
			{#if is_playing}
				<p class="text-7xl font-bold text-red-400">{red_team_score}</p>
			{/if}
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
			{#if is_playing}
				<p class="text-7xl font-bold text-blue-500">{blue_team_score}</p>
			{:else}
				<ChatBox>
					<Chat time="123" name="123" team={0}>TEST</Chat>
					<Chat time="123" name="123" team={1}>TEST</Chat>
					<Chat time="123" name="123" team={2}>TEST</Chat>
				</ChatBox>
			{/if}
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
