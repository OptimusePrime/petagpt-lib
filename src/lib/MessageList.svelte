<script lang="ts">
    import Message from './Message.svelte';
    import { afterUpdate, onMount } from 'svelte';

    type Sender = 'user' | 'bot';
    export type ChatMessage = { text: string; sender: Sender; time: Date; pending?: boolean };
    // let messagesContainer;
    export let messages: ChatMessage[] = [];

    let messagesContainer: HTMLDivElement | null = null;

    onMount(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    });

</script>

<div class="messages-container" bind:this={messagesContainer}>
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