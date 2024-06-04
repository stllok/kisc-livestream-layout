<script>
	import { MANAGER_DATA } from '$lib/state/gosu';
	import Chat from './Chat.svelte';
</script>

<div class="flex h-full w-full flex-col-reverse overflow-hidden rounded-3xl bg-[#6c5d56] p-3">
	{#each ($MANAGER_DATA.chat ?? [{ time: '7:27', name: 'YOU', team: 2, messageBody: 'YOU SHOULD CALL REF TO !mp addref <in game name> NOW!!!' }]).reverse() as chat}
		<Chat
			time={chat.time}
			name={chat.name}
			team={chat.team === 'left' ? 1 : chat.team === 'right' ? 2 : 0}
		>
			{chat.messageBody}
		</Chat>
	{/each}
</div>
