import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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"); // Remplace par ta clé API

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const response = inference.chatCompletionStream({
            model: "mistralai/Mistral-Nemo-Instruct-2407",
            messages: [{ role: "user", content: query }],
            max_tokens: 500,
        });

        let generatedText = '';
        for await (const chunk of response) {
            generatedText += chunk.choices[0]?.delta?.content || '';
        }

        console.log('Réponse de l\'API:', generatedText); // Pour déboguer
        return res.status(200).json({ result: generatedText || 'Aucune réponse' });

    } catch (error) {
        console.error('API call error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
