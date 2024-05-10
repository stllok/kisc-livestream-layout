<script lang="ts">
	import Chat from './Chat.svelte';
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';

	const GOSUMEMORY_ADDRESS = '127.0.0.1:24050';

	let chats = [];

	let red_team_score = 0;
	let blue_team_score = 0;

	let red_point = 0;
	let blue_point = 0;
	let best_of = 9;

	let red_name = '';
	let blue_name = '';

	let beatmap_info = {
		img_path: '',
		title: '',
		artist: '',
		mapper: '',
		length: 0,
		diff_name: '',
		ar: 0,
		od: 0,
		cs: 0,
		bpm: 0,
		star_rating: 0
	};

	let is_playing = false; // Listen for messages
	const SOCKET = new WebSocket(`ws://${GOSUMEMORY_ADDRESS}/ws`);
	SOCKET.addEventListener('message', (event) => {
		red_team_score = 0;
		blue_team_score = 0;
		let raw_data = JSON.parse(event.data);

		let manager_data = raw_data['tourney']['manager'];
		let tourney_data = raw_data['tourney']['ipcClients'];

		let tourney_state = raw_data['tourney']['manager']['ipcState'];
		chats = raw_data['tourney']['manager']['chat'] ?? [];

		best_of = manager_data['bestOF'];
		red_point = manager_data['stars']['left'];
		blue_point = manager_data['stars']['right'];

		red_name = manager_data['teamName']['left'];
		blue_name = manager_data['teamName']['right'];

		let bm_data = raw_data['menu']['bm'];

		let img_path = bm_data['path']['full'];

		beatmap_info = {
			img_path: `http://${GOSUMEMORY_ADDRESS}/Songs/${img_path}`,
			title: bm_data['metadata']['title'],
			artist: bm_data['metadata']['artist'],
			mapper: bm_data['metadata']['mapper'],
			length: bm_data['time']['mp3'],
			diff_name: bm_data['metadata']['difficulty'],
			cs: bm_data['stats']['CS'],
			ar: bm_data['stats']['AR'],
			od: bm_data['stats']['OD'],
			bpm: bm_data['stats']['BPM']['max'],
			star_rating: bm_data['stats']['SR']
		};
		tourney_data.forEach((data) => {
			switch (data.team) {
				case 'left':
					red_team_score += data.gameplay.score;
					break;
				case 'right':
					blue_team_score += data.gameplay.score;
					break;
			}
		});
		console.log(`Current state: ${tourney_state}`);
		console.log(beatmap_info);

		is_playing = tourney_state === 3 || tourney_state === 4;
	});
</script>

<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col *:duration-500">
		<!-- Upper screen -->
		<div class="flex justify-between p-3">
			<PointInfo
				teamname={red_name}
				target_point={Math.ceil(best_of / 2)}
				current_point={red_point}
			/>
			<PointInfo
				teamname={blue_name}
				target_point={Math.ceil(best_of / 2)}
				current_point={blue_point}
			/>
		</div>
		<hr class="h-1 bg-[#7e7295]" />

		<!-- Green screen -->
		<div class="h-[720px] w-[1920px] bg-green-500"></div>

		<!-- Bottom screen -->
		{#if is_playing}
			<DifferenceBar red_score={red_team_score} blue_score={blue_team_score} />
		{/if}
		<div class="mx-12 flex grow justify-between">
			{#if is_playing}
				<p class="text-7xl font-bold text-red-400">{red_team_score}</p>
			{/if}
			<div class="first:self-end first:pb-2">
				<MapInfo {...beatmap_info} />
			</div>
			{#if is_playing}
				<p class="text-7xl font-bold text-blue-500">{blue_team_score}</p>
			{:else}
				<ChatBox>
					{#each chats.reverse() as chat}
						<Chat
							time={chat.time}
							name={chat.name}
							team={chat.team === 'left' ? 1 : chat.team === 'right' ? 2 : 0}
						>
							{chat.messageBody}
						</Chat>
					{/each}
				</ChatBox>
			{/if}
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
