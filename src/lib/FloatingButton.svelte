<script>
    import { createEventDispatcher } from 'svelte';

    export let isOpen = false;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click');
    }
</script>

<button class="chat-fab" on:click={handleClick} aria-label="Open chat">
    {#if isOpen}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 9l-7 7-7-7"/>
        </svg>
    {:else}
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
    {/if}
</button>

<style>
    .chat-fab {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
    }

    .chat-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.5);
    }

    .chat-fab:active {
        transform: scale(0.95);
    }

    .chat-fab svg {
        width: 28px;
        height: 28px;
        color: white;
    }
</style>