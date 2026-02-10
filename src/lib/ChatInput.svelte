<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let inputMessage = "";

    function sendMessage() {
        if (inputMessage.trim() === "") return;

        dispatch('sendMessage', inputMessage.trim());
        inputMessage = "";
    }

    function handleKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<div class="bottom-container">
    <span class="warning-text">
        Umjetna inteligencija može dati krive informacije.
    </span>
    <div class="input-container">
        <div class="input-holder">
            <input
                    type="text"
                    placeholder="Pitaj me!"
                    bind:value={inputMessage}
                    on:keypress={handleKeyPress}
                    class="message-input"
            />
        </div>
        <button class="send-btn" on:click={sendMessage} aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
        </button>
    </div>
</div>

<style>
    .bottom-container {
        border-top: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /*align-items: center;*/
    }

    .warning-text {
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 10px;
        align-self: center;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .input-holder {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }

    .input-container {
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 16px;
        background: white;
        display: flex;
        gap: 8px;
    }

    .message-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 24px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
    }

    .message-input:focus {
        border-color: #10b981;
    }

    .message-input::placeholder {
        color: #9ca3af;
    }

    .send-btn {
        width: 44px;
        height: 44px;
        border: none;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: end;
        transition: all 0.2s;
        flex-shrink: 0;
    }

    .send-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    .send-btn:active {
        transform: scale(0.95);
    }

    .send-btn svg {
        width: 20px;
        height: 20px;
        color: white;
    }
</style>