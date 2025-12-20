<script>
    import { marked } from 'marked';

    export let message;

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function renderMarkdown(text) {
        return marked(text, {
            breaks: true,
            gfm: true
        });
    }
</script>

<div class="message {message.sender}">
    <div class="message-bubble">
        <div class="message-text">
            {@html renderMarkdown(message.text)}
        </div>
        <div class="message-time">{formatTime(message.time)}</div>
    </div>
</div>

<style>
    .message {
        display: flex;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .message.bot {
        justify-content: flex-start;
    }

    .message.user {
        justify-content: flex-end;
    }

    .message-bubble {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .message.bot .message-bubble {
        background: white;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .message.user .message-bubble {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-bottom-right-radius: 4px;
    }

    .message-text {
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
    }

    .message-text :global(h1),
    .message-text :global(h2),
    .message-text :global(h3),
    .message-text :global(h4),
    .message-text :global(h5),
    .message-text :global(h6) {
        margin: 12px 0 8px 0;
        font-weight: 600;
    }

    .message-text :global(h1) {
        font-size: 1.5em;
    }

    .message-text :global(h2) {
        font-size: 1.3em;
    }

    .message-text :global(h3) {
        font-size: 1.1em;
    }

    .message-text :global(p) {
        margin: 8px 0;
    }

    .message-text :global(ul),
    .message-text :global(ol) {
        margin: 8px 0 8px 20px;
        padding: 0;
    }

    .message-text :global(li) {
        margin: 4px 0;
    }

    .message-text :global(code) {
        background: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
    }

    .message.user .message-text :global(code) {
        background: rgba(255, 255, 255, 0.2);
    }

    .message-text :global(pre) {
        background: #1e293b;
        color: #e2e8f0;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 8px 0;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        line-height: 1.4;
    }

    .message-text :global(pre code) {
        background: none;
        padding: 0;
        border-radius: 0;
    }

    .message-text :global(blockquote) {
        border-left: 4px solid #d1d5db;
        padding: 8px 12px;
        margin: 8px 0;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .message.user .message-text :global(blockquote) {
        border-left-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.1);
    }

    .message-text :global(a) {
        color: #3b82f6;
        text-decoration: none;
        border-bottom: 1px solid #3b82f6;
    }

    .message.user .message-text :global(a) {
        color: #bfdbfe;
        border-bottom-color: #bfdbfe;
    }

    .message-text :global(a:hover) {
        opacity: 0.8;
    }

    .message-text :global(strong) {
        font-weight: 600;
    }

    .message-text :global(em) {
        font-style: italic;
    }

    .message-text :global(hr) {
        border: none;
        border-top: 1px solid #d1d5db;
        margin: 12px 0;
    }

    .message-time {
        font-size: 11px;
        opacity: 0.7;
        align-self: flex-end;
    }
</style>