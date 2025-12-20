<svelte:options customElement="petagpt-client" />

<script lang="ts">
    import FloatingButton from './FloatingButton.svelte';
    import ChatWindow from './ChatWindow.svelte';

    type Sender = 'user' | 'bot';
    type ChatMessage = { text: string; sender: Sender; time: Date; pending?: boolean };

    let isOpen = false;
    let messages: ChatMessage[] = [
        { text: "Dobar dan! Kako vam mogu pomoći?", sender: "bot", time: new Date() }
    ];

    function toggleChat() {
        isOpen = !isOpen;
    }

    async function handleSendMessage(event: CustomEvent<string>) {
        const messageText = event.detail;

        // Add user message
        const userMessage: ChatMessage = { text: messageText, sender: "user", time: new Date() };
        messages = [
            ...messages,
            userMessage
        ];

        // Build OAI-compatible messages array (exclude any pending placeholders)
        const oaiMessages = messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        }));

        // Add a temporary placeholder bot message while we await the server response
        const placeholder: ChatMessage = { text: '...', sender: 'bot', time: new Date(), pending: true };
        messages = [
            ...messages,
            placeholder
        ];

        try {
            const resp = await fetch('http://localhost:7030/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: oaiMessages })
            });

            if (!resp.ok) {
                throw new Error(`Server responded with ${resp.status}`);
            }

            const data = await resp.json();
            const botText = typeof data === 'object' && data !== null && 'response' in data
                ? String((data as any).response)
                : String(data);

            // Replace the placeholder with the real bot response
            messages = [
                ...messages.slice(0, -1),
                { text: botText, sender: 'bot', time: new Date() }
            ];
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            // Replace the placeholder with an error message
            messages = [
                ...messages.slice(0, -1),
                { text: `Error: ${msg}`, sender: 'bot', time: new Date() }
            ];
            console.error('Failed to fetch /chat:', err);
        }
    }
</script>

<div class="chatbot-container">
    {#if isOpen}
        <ChatWindow
                {messages}
                on:close={toggleChat}
                on:sendMessage={handleSendMessage}
        />
    {/if}

    <FloatingButton {isOpen} on:click={toggleChat} />
</div>

<style>
    .chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    @media (max-width: 480px) {
        .chatbot-container {
            bottom: 10px;
            right: 10px;
        }
    }
</style>