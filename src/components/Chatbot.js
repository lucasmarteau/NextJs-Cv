import { useState } from 'react';
import ChatBubble from './ChatBubble';

export default function Chatbot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchChatResponse = async (query) => {
        setLoading(true);
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch response from API: ${errorData.error || 'Unknown error'}`);
        }

        const data = await response.json();
        setLoading(false);
        return data.result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { role: 'user', content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const assistantMessageContent = await fetchChatResponse(input);
            const assistantMessage = { role: 'assistant', content: assistantMessageContent };
            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <ChatBubble key={index} message={msg.content} role={msg.role} />
                ))}
                {loading && <p>Loading...</p>}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question..."
            rows="2"
            required
        />
                <button type="submit" disabled={!input.trim()}>Envoyer</button>
            </form>
        </div>
    );
}
