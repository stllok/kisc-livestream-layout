<script lang="ts">
	import Chat from './Chat.svelte';
	import ChatBox from './ChatBox.svelte';
	import DifferenceBar from './DifferenceBar.svelte';
	import MapInfo from './MapInfo.svelte';
	import PointInfo from './PointInfo.svelte';
	import { dev } from '$app/environment';

	const SAMPLE_CHAT = [
		{
			team: 'right',
			time: '23:00',
			name: 'Pieris',
			messageBody: 'ok'
		},
		{
			team: 'left',
			time: '23:00',
			name: '- kouyuu -',
			messageBody: 'yes'
		},
		{
			team: 'unknown',
			time: '23:00',
			name: 'stllok',
			messageBody: 'Each team require 2 player with 2 unique mods, EZ multipy 1.75'
		},
		{
			team: 'unknown',
			time: '23:00',
			name: 'stllok',
			messageBody: 'ezhd count 2 unique mod'
		},
		{
			team: 'left',
			time: '23:00',
			name: 'mcy4',
			messageBody: 'hf'
		},
		{
			team: 'right',
			time: '23:00',
			name: 'Pieris',
			messageBody: 'glglhfhf'
		},
		{
			team: 'right',
			time: '23:00',
			name: '-xxx Rumia-',
			messageBody: 'glgl'
		},
		{
			team: 'left',
			time: '23:00',
			name: 'DeathHydra',
			messageBody: 'glhf!'
		},
		{
			team: 'unknown',
			time: '23:00',
			name: 'stllok',
			messageBody: 'glhf'
		}
	];
	let red_team_score = 50;
	let blue_team_score = 50;

	let is_playing = false;

	function handle_key_down(e: KeyboardEvent) {
		switch (e.key) {
			case 't':
				is_playing = !is_playing;
				break;
		}
	}
</script>

<svelte:window on:keydown|preventDefault={handle_key_down} />

<div class="flex h-screen w-screen flex-col justify-between">
	<div class="flex grow flex-col">
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
		<div class="mx-12 flex grow justify-between">
			{#if is_playing}
				<p class="text-7xl font-bold text-red-400">{red_team_score}</p>
			{/if}
			<div class="first:self-end first:pb-2">
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
			</div>
			{#if is_playing}
				<p class="text-7xl font-bold text-blue-500">{blue_team_score}</p>
			{:else}
				<ChatBox>
					{#each SAMPLE_CHAT.reverse() as chat}
						<Chat
							time={chat.time}
							name={chat.name}
							team={chat.team === 'left' ? 1 : chat.team === 'right' ? 2 : 0}
						>
							{chat.messageBody}
						</Chat>
					{/each}
					<Chat time="123" name="Ref" team={0}>TEST</Chat>
					<Chat time="123" name="Team Red" team={1}>TEST</Chat>
					<Chat time="123" name="Team Blue" team={2}>TEST</Chat>
				</ChatBox>
			{/if}
		</div>
	</div>
	<hr class="h-4 bg-[#7e7295]" />
</div>
