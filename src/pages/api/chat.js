export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        try {
            const response = await fetch('https://api-inference.huggingface.co/models/distilgpt2', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: query }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('Réponse de l\'API:', data); // Pour déboguer
            res.status(200).json({ result: data.generated_text || 'Aucune réponse' });
        } catch (error) {
            console.error('API call error:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
