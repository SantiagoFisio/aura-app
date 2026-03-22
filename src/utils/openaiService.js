import { AURA_SYSTEM_PROMPT, MIRROR_MODE_ADDITION } from './auraPrompt';

const N8N_WEBHOOK_URL = "https://n8n.srv983887.hstgr.cloud/webhook/685a15e3-fd4a-4f83-9871-ded6a0f2c12b";

export async function sendMessageToAura(history, userMessage, isMirrorMode = false) {
    const systemPrompt = AURA_SYSTEM_PROMPT + (isMirrorMode ? MIRROR_MODE_ADDITION : '');

    // Protocole de conversation standard
    const formattedHistory = history.map(msg => ({
        role: msg.role === 'aura' ? 'assistant' : 'user',
        content: msg.content,
    }));

    // Construction du payload JSON à envoyer vers n8n
    const payload = {
        userMessage: userMessage,
        history: formattedHistory,
        systemPrompt: systemPrompt,
        timestamp: new Date().toISOString()
    };

    try {
        console.log("Envoi du message au Webhook n8n:", N8N_WEBHOOK_URL);
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erreur webhook n8n: ${response.status} ${response.statusText}`);
        }

        // Moteur de parsing dynamique pour interpréter la réponse de n8n
        // n8n renvoie désormais tout sous forme de liste [ { "output": "bonjour" } ] ou brut
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            let data = await response.json();
            
            // Si c'est un tableau (n8n All Incoming Items), on prend le premier objet
            if (Array.isArray(data) && data.length > 0) {
                data = data[0];
            }
            
            if (typeof data === 'string') return data;
            return data.output || data.reply || data.message || data.text || JSON.stringify(data);
        } else {
            return await response.text();
        }

    } catch (error) {
        console.error("Erreur appel Webhook n8n:", error);
        throw error;
    }
}
