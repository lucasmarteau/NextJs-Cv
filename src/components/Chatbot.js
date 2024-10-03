import { useState, useCallback } from 'react';
import ChatBubble from './ChatBubble';

export default function Chatbot() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchChatResponse = useCallback(async (query) => {
        setLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Unknown error');
            }

            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error('Error during API call:', error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const addMessage = useCallback((role, content) => {
        if (content?.trim()) {
            setMessages((prevMessages) => [...prevMessages, { role, content }]);
        }
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // Ajouter le message utilisateur
        addMessage('user', trimmedInput);
        setInput('');

        // Récupérer la réponse de l'assistant
        let assistantMessageContent = await fetchChatResponse(trimmedInput);

        // Si la réponse est vide, reformuler la question
        if (!assistantMessageContent?.trim()) {
            const reformulatedMessage = "Peux-tu me dire combien font 1 + 1 ?";
            assistantMessageContent = await fetchChatResponse(reformulatedMessage);
        }

        // Ajouter le message de l'assistant
        addMessage('assistant', assistantMessageContent || "Désolé, je n'ai toujours pas compris.");
    }, [input, fetchChatResponse, addMessage]);

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
