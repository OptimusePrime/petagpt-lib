<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import ChatHeader from './ChatHeader.svelte';
    import MessageList from './MessageList.svelte';
    import ChatInput from './ChatInput.svelte';

    let { messageListEl = $bindable<HTMLDivElement>(), messages = [] }: { messageListEl?: HTMLDivElement, messages: ChatMessage[] } = $props();

    type Sender = 'user' | 'bot';
    export type ChatMessage = { text: string; sender: Sender; time: Date; pending?: boolean };

    // export let messages: ChatMessage[] = [];

    const dispatch = createEventDispatcher();

    function handleSendMessage(event: CustomEvent<string>) {
        dispatch('sendMessage', event.detail);
    }
</script>

<div class="chat-window">
    <ChatHeader on:close on:clear />
    <MessageList bind:ref={messageListEl} {messages} />
    <ChatInput on:sendMessage={handleSendMessage} />
</div>

<style>
    .chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 580px;
        max-height: calc(100vh - 120px);
        background: white;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        .chat-window {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            bottom: 70px;
            right: -10px;
        }
    }
</style>