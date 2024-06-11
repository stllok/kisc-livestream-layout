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

<div
	class="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-[#6c5d56] p-3"
	use:autoAnimate
	bind:this={LIST_DOM}
>
	{#each $MANAGER_DATA.chat ?? [] as chat}
		<Chat
			time={chat.time}
			name={chat.name}
			team={chat.team === 'left' ? 1 : chat.team === 'right' ? 2 : 0}
		>
			{chat.messageBody}
		</Chat>
	{:else}
		<Chat time={'7:27'} name={'YOU'} team={0}>YOU SHOULD CALL REF TO !mp addref [IGN] NOW!!!</Chat>
		<Chat time={'7:27'} name={$MANAGER_DATA.teamName.left} team={1}>TEST TEAM RED COLOUR</Chat>
		<Chat time={'7:27'} name={$MANAGER_DATA.teamName.right} team={2}>TEST TEAM BLUE COLOUR</Chat>
	{/each}
</div>
