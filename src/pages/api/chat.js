import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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"); // Remplace par ta clé API

export default async function handler(req, res) {
    if (req.method === 'POST') {
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

            const chunks = [];
            for await (const chunk of response) {
                chunks.push(chunk.choices[0]?.delta?.content || "");
            }

            const generatedText = chunks.join('');
            console.log('Réponse de l\'API:', generatedText); // Pour déboguer
            res.status(200).json({ result: generatedText || 'Aucune réponse' }); // Renvoie le texte généré
        } catch (error) {
            console.error('API call error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
