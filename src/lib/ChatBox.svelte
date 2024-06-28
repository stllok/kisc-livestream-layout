<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { MANAGER_DATA } from '$lib/state/gosu';
	import Chat from './Chat.svelte';

	let LIST_DOM: HTMLElement;

	MANAGER_DATA.subscribe(() => {
		if (LIST_DOM !== undefined) {
			LIST_DOM.scroll({ top: LIST_DOM.scrollHeight, behavior: 'smooth' });
		}
	});
</script>

<div class="flex h-full w-full flex-col rounded-3xl bg-[#6c5d56] p-3">
	<div class="flex  flex-col h-full w-full overflow-hidden" bind:this={LIST_DOM} use:autoAnimate>
		{#each $MANAGER_DATA.chat ?? [] as chat}
			<Chat
				time={chat.time}
				name={chat.name}
				team={chat.team === 'left' ? 1 : chat.team === 'right' ? 2 : 0}
			>
				{chat.messageBody}
			</Chat>
		{:else}
			<Chat time={'7:27'} name={'YOU'} team={0}>YOU SHOULD CALL REF TO !mp addref [IGN] NOW!!!</Chat
			>
			<Chat time={'7:27'} name={'TEAM RED'} team={1}>TEST TEAM RED COLOUR</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>TEST TEAM BLUE COLOUR</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
			<Chat time={'7:27'} name={'TEAM BLUE'} team={2}>BUMP</Chat>
		{/each}
	</div>
</div>
