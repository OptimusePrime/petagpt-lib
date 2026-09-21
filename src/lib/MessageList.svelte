<script lang="ts">
    import Message from './Message.svelte';
    import { onMount } from 'svelte';

    let {
        messages = [],
        ref = $bindable<HTMLDivElement>(),
    }: { messages?: ChatMessage[], ref?: HTMLDivElement } = $props();


    type Sender = 'user' | 'bot';
    export type ChatMessage = { text: string; sender: Sender; time: Date; pending?: boolean };
    // let messagesContainer;
    // export let messages: ChatMessage[] = [];

    // let messagesContainer: HTMLDivElement | null = null;

    onMount(() => {
        ref.scrollTop = ref.scrollHeight;

    });

</script>

<div class="messages-container" bind:this={ref}>
    {#each messages as message}
        <Message {message} />
    {/each}
</div>

<style>
    .messages-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f9fafb;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .messages-container::-webkit-scrollbar {
        width: 6px;
    }

    .messages-container::-webkit-scrollbar-track {
        background: transparent;
    }

    .messages-container::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 3px;
    }
</style>