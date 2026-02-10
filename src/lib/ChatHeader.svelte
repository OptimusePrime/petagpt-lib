<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClose() {
        dispatch('close');
    }

    function handleClear() {
        dispatch("clear");
    }
</script>

<div class="chat-header">
    <div class="header-content">
        <div class="bot-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </div>
        <div>

        </div>
        <div class="header-text">
            <div class="bot-name">PetaGPT</div>
            <div class="bot-status">Dostupan</div>
        </div>
    </div>
    <div class="header-buttons">
        <button on:click={handleClear} title="Clear conversation" class="clear-conversation-btn" aria-label="Clear chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
        </button>
        <button title="Close chat" class="close-btn" on:click={handleClose} aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
    </div>
</div>

<style>
    .chat-header {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .header-buttons {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    .bot-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bot-avatar svg {
        width: 24px;
        height: 24px;
    }

    .header-text {
        display: flex;
        flex-direction: column;
    }

    .bot-name {
        font-weight: 600;
        font-size: 16px;
    }

    .bot-status {
        font-size: 12px;
        opacity: 0.9;
    }

    .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
    }

    .close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .clear-conversation-btn {
        width: 32px;
        height: 32px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transition: background 0.2s;
    }

    .clear-conversation-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    .close-btn svg {
        width: 20px;
        height: 20px;
        color: white;
    }
</style>