import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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");

const CONTEXT = `
Lucas Marteau est un étudiant en développement informatique à Sup De Vinci, actuellement en troisième année. Il est passionné par la technologie et la programmation et recherche une alternance pour mettre en pratique ses compétences dans le développement informatique.

Éducation :
- Bachelor en Ingénierie des Systèmes d’Information, Sup De Vinci (2022 - présent, Chantepie)
- Bac Pro Artisanat et Métiers d'Art, Léonard de Vinci (2019 - 2022, Mayenne)

Expériences :
- Développeur PHP (Stage) chez Nouvelles Directions (Mai 2024 - Juin 2024, Nantes)
  - Création d’une extension WordPress
  - Web scraping
- Chargé de Communication (Stage) chez Beauty Success (Décembre 2022 - Janvier 2023, Laval)
  - Création de supports de communication
  - Gestion des réseaux sociaux

Compétences :
- Langages de programmation : JavaScript, C#, Python, PHP
- Développement web : Next.js
- Développement mobile : React Native
- Graphisme : Illustrator, Photoshop, InDesign

Langues :
- Français (natif)
- Anglais (B2)

Loisirs :
- Blender 3D
- Culture musicale
- Skateboarding

Coordonnées :
- Téléphone : 07 71 74 27 62
- Adresse : 35200, Rennes
- Âge : 20 ans (23/07/2004)
- GitHub : github.com/lucasmarteau
- E-mail : lucasmarteau.2004@gmail.com

Certifications :
- RGPD CNIL
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.setHeader('Allow', ['POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const messageWithContext = CONTEXT + " " + query;

        const response = inference.chatCompletionStream({
            model: "mistralai/Mistral-Nemo-Instruct-2407",
            messages: [{ role: "user", content: messageWithContext }],
            max_tokens: 500,
        });

        let generatedText = '';
        for await (const chunk of response) {
            generatedText += chunk.choices[0]?.delta?.content || '';
        }

        console.log('Réponse de l\'API:', generatedText);
        return res.status(200).json({ result: generatedText || 'Aucune réponse' });

    } catch (error) {
        console.error('API call error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
