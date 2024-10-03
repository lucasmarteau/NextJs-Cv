// src/utils/api.js

export const fetchChatResponse = async (query) => {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch response from API');
    }

    const data = await response.json();
    return data.result;
};
