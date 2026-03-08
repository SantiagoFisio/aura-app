import { useCallback, useRef, useState, useEffect } from 'react';

// Utiliser trim() pour éviter les espaces invisibles ou les retours à la ligne dans le .env
const API_KEY = (import.meta.env.VITE_ELEVEN_LABS_API_KEY || "").trim();
const VOICE_ID = (import.meta.env.VITE_ELEVEN_LABS_VOICE_ID || "").trim();

export function useVoice() {
    const audioRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const speak = useCallback(async (text) => {
        if (!API_KEY || !VOICE_ID) {
            console.warn("ElevenLabs: API Key ou Voice ID manquant dans le .env");
            return;
        }

        try {
            console.log(`[ElevenLabs] Tentative d'envoi... (Key: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)})`);

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            setIsSpeaking(true);

            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': API_KEY,
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Erreur API ElevenLabs (401: Unauthorized veut dire que la clé est invalide)", errorData);
                throw new Error(`Erreur ElevenLabs: ${response.status}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            audio.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(url);
            };

            audio.onerror = (e) => {
                console.error("Erreur de lecture audio:", e);
                setIsSpeaking(false);
            };

            audioRef.current = audio;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Auto-lecture bloquée par le navigateur:", error);
                    setIsSpeaking(false);
                });
            }

        } catch (error) {
            console.error('Erreur synthèse vocale ElevenLabs:', error);
            setIsSpeaking(false);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsSpeaking(false);
        }
    }, []);

    return { speak, stop, isSpeaking };
}
