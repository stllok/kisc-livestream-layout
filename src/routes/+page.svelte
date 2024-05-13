<script lang="ts">
	import type { ChatType, MenuData, TourneyManager } from './+layout';
	import Chat from './Chat.svelte';
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';

	const GOSUMEMORY_ADDRESS = '127.0.0.1:24050';

	let CHATS: ChatType[] = [];
	let ENABLE_CHAT = false;

	let RED_TEAM_SCORE = 0;
	let BLUE_TEAM_SCORE = 0;

	let RED_POINT = 0;
	let BLUE_POINT = 0;
	let BEST_OF = 9;

	let RED_NAME = '';
	let BLUE_NAME = '';

	let BEATMAP_INFO = {
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

	const SOCKET = new WebSocket(`ws://${GOSUMEMORY_ADDRESS}/ws`);

	SOCKET.addEventListener('message', (event) => {
		let raw_data = JSON.parse(event.data);

		let manager_data: TourneyManager = raw_data['tourney']['manager'];
		let menu_data: MenuData = raw_data['menu'];
		let bm_data = menu_data.bm;

		// let tourney_data = raw_data['tourney']['ipcClients'];
		// tourney_data.forEach((data) => {
		// 	switch (data.team) {
		// 		case 'left':
		// 			red_team_score += data.gameplay.score;
		// 			break;
		// 		case 'right':
		// 			blue_team_score += data.gameplay.score;
		// 			break;
		// 	}
		// });

		CHATS = manager_data.chat ?? [];

		BEST_OF = manager_data.bestOF;
		RED_POINT = manager_data.stars.left;
		BLUE_POINT = manager_data.stars.right;

		RED_NAME = manager_data.teamName.left;
		BLUE_NAME = manager_data.teamName.right;

		BEATMAP_INFO = {
			img_path: `http://${GOSUMEMORY_ADDRESS}/Songs/${bm_data.path.full}`,
			title: bm_data.metadata.title,
			artist: bm_data.metadata.artist,
			mapper: bm_data.metadata.mapper,
			length: bm_data.time.mp3,
			diff_name: bm_data.metadata.difficulty,
			cs: bm_data.stats.memoryCS,
			ar: bm_data.stats.memoryAR,
			od: bm_data.stats.memoryOD,
			bpm: bm_data.stats.BPM.max,
			star_rating: bm_data.stats.fullSR
		};

		RED_TEAM_SCORE = manager_data.gameplay.score.left;
		BLUE_TEAM_SCORE = manager_data.gameplay.score.right;

		ENABLE_CHAT = menu_data.isChatEnabled === 1;

		console.log(BEATMAP_INFO);
	});
</script>

<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col *:duration-500">
		<!-- Upper screen -->
		<div class="flex justify-between p-3">
			<PointInfo
				teamname={RED_NAME}
				target_point={Math.ceil(BEST_OF / 2)}
				current_point={RED_POINT}
			/>
			<PointInfo
				teamname={BLUE_NAME}
				target_point={Math.ceil(BEST_OF / 2)}
				current_point={BLUE_POINT}
			/>
		</div>
		<hr class="h-1 bg-[#7e7295]" />

		<!-- Green screen -->
		<div class="h-[720px] w-[1920px] bg-green-500"></div>

		<!-- Bottom screen -->
		{#if !ENABLE_CHAT}
			<DifferenceBar red_score={RED_TEAM_SCORE} blue_score={BLUE_TEAM_SCORE} />
		{/if}
		<div class="mx-12 flex grow justify-between">
			{#if !ENABLE_CHAT}
				<p class="text-7xl font-bold text-red-400">{RED_TEAM_SCORE}</p>
			{/if}
			<div class="first:self-end first:pb-2">
				<MapInfo {...BEATMAP_INFO} />
			</div>
			{#if !ENABLE_CHAT}
				<p class="text-7xl font-bold text-blue-500">{BLUE_TEAM_SCORE}</p>
			{:else}
				<ChatBox>
					{#each CHATS.reverse() as chat}
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
