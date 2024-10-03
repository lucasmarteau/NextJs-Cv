import { API_ENDPOINT } from './constants';

export const fetchChatResponse = async (query) => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.error || 'Failed to fetch response from API');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('API error:', error);
        throw new Error('Error fetching response');
    }
};
