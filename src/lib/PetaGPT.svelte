<svelte:options customElement="petagpt-client" />

<script lang="ts">
    import FloatingButton from "./FloatingButton.svelte";
    import ChatWindow from "./ChatWindow.svelte";
    import { onMount } from "svelte";

    const API_URL = "https://chatbot.petagimnazija.hr";

    type Sender = "user" | "assistant";
    type ChatMessage = {
        text: string;
        sender: Sender;
        time: Date;
        pending?: boolean;
    };

    let isOpen = false;
    let messages: ChatMessage[] = [
        {
            text: "Dobar dan! Kako vam mogu pomoći?",
            sender: "assistant",
            time: new Date(),
        },
    ];
    let conversationId: string | null;

    onMount(async () => {
        await createConversation();

        try {
            const resp = await fetch(`${API_URL}/chat/messages/${conversationId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const respBody = await resp.json();
            if (!respBody?.messages) {
                return;
            }

            for (const msg of respBody.messages) {
                messages.push({
                    text: msg.content,
                    sender: msg.role,
                    time: new Date(Date.parse(msg.created_at)),
                });
            }
            messages = messages
        } catch (err: unknown) {
            console.error("Failed to retrieve messages:", err);
        }
    });

    function toggleChat() {
        console.log(messages)
        isOpen = !isOpen;
        if (isOpen) {
            createConversation();
        }
    }

    async function clearConversation() {
        await createConversation();

        localStorage.removeItem("petagpt_conversation_id");

        messages = [
            {
                text: "Dobar dan! Kako vam mogu pomoći?",
                sender: "assistant",
                time: new Date(),
            },
        ];
    }

    async function createConversation() {
        localStorage.removeItem("petagpt_conversation_id")
        conversationId = localStorage.getItem("petagpt_conversation_id");
        if (!conversationId) {
            conversationId = crypto.randomUUID();
            localStorage.setItem("petagpt_conversation_id", conversationId);
        }

        try {
            const resp = await fetch(`${API_URL}/chat/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: conversationId,
                }),
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            // Replace the placeholder with an error message
            messages = [
                ...messages.slice(0, -1),
                { text: `Error: ${msg}`, sender: "assistant", time: new Date() },
            ];
            console.error("Failed to fetch /chat:", err);
        }
    }

    async function handleSendMessage(event: CustomEvent<string>) {
        console.log("Hello")
        const messageText = event.detail;
        console.log(messageText)

        // Add user message
        const userMessage: ChatMessage = {
            text: messageText,
            sender: "user",
            time: new Date(),
        };
        messages = [...messages, userMessage];

        // Build OAI-compatible messages array (exclude any pending placeholders)
        // const oaiMessages = messages.map((m) => ({
        //     role: m.sender === "user" ? "user" : "assistant",
        //     content: m.text,
        // }));

        // Add a temporary placeholder bot message while we await the server response
        const placeholder: ChatMessage = {
            text: "...",
            sender: "assistant",
            time: new Date(),
            pending: true,
        };
        messages = [...messages, placeholder];

        console.log(messageText)

        try {
            const resp = await fetch(`${API_URL}/chat/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: conversationId,
                    user_message: messageText,
                }),
                signal: AbortSignal.timeout(3 * 60 * 1000)
            });

            if (!resp.body) {
                throw new Error("Internal server error.");
            }

            const reader = resp.body.getReader();
            const decoder = new TextDecoder("utf-8");


            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                console.log(`Reader done: ${done}`)

                const chunk = decoder.decode(value, { stream: true });

                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data:")) {
                        const data = line.slice(5);
                        console.log(`Data: ${data}`)

                        if (data === "[DONE]") {
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            const text = parsed.delta || "";

                            if(messages[messages.length - 1].pending) {
                                messages[messages.length - 1].text = "";
                                messages[messages.length - 1].pending = false;
                            }

                            console.log(`New text: ${text}`);


                            messages[messages.length - 1].text += text;
                            messages = messages;

                        } catch (e) {
                            messages = [
                                ...messages.slice(0, -1),
                                { text: `An unexpected error occurred.`, sender: "assistant", time: new Date() },
                            ];
                            console.error("Failed to fetch /chat:", e);
                        }
                    }
                }
            }

/*            if (!resp.ok) {
                throw new Error(`Server responded with ${resp.status}`);
            }

            const data = await resp.json();
            const botText =
                typeof data === "object" && data !== null && "response" in data
                    ? String((data as any).response)
                    : String(data);

            // Replace the placeholder with the real bot response
            messages = [
                ...messages.slice(0, -1),
                { text: botText, sender: "assistant", time: new Date() },
            ];*/
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            // Replace the placeholder with an error message
            messages = [
                ...messages.slice(0, -1),
                { text: `Error: ${msg}`, sender: "assistant", time: new Date() },
            ];
            console.error("Failed to fetch /chat:", err);
        }
    }
</script>

<div class="chatbot-container">
    {#if isOpen}
        <ChatWindow
            {messages}
            on:close={toggleChat}
            on:clear={async () => await clearConversation()}
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    @media (max-width: 576px) {
        .chatbot-container {
            display: flex;
            justify-content: center;
            align-items: center;
/*            bottom: 25%;
            right: 25%;*/
        }
    }
</style>
