import OpenAI from 'openai';
import { AURA_SYSTEM_PROMPT, MIRROR_MODE_ADDITION } from './auraPrompt';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Dans un vrai projet de production, il ne faut jamais exposer la clé OpenAI côté client.
// L'option dangerouslyAllowBrowser est requise par la librairie OpenAI pour l'utiliser dans un projet Vite (frontend 100%).
const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
});

export async function sendMessageToAura(history, userMessage, isMirrorMode = false) {
    const systemPrompt = AURA_SYSTEM_PROMPT + (isMirrorMode ? MIRROR_MODE_ADDITION : '');

    // Convertir l'historique interne au format OpenAI: 'assistant' ou 'user'
    const formattedHistory = history.map(msg => ({
        role: msg.role === 'aura' ? 'assistant' : 'user',
        content: msg.content,
    }));

    const messages = [
        { role: 'system', content: systemPrompt },
        ...formattedHistory,
        { role: 'user', content: userMessage }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Modèle très rapide et compétent pour le chat
            messages: messages,
            temperature: 0.9,
            max_tokens: 512,
            top_p: 0.95,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Erreur OpenAI:", error);
        throw error;
    }
}
