import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessageToAura } from '../utils/openaiService';
import { useVoice } from './useVoice';

const INTIMACY_LONG_MESSAGE = 20;
const INTIMACY_PERSONAL_WORDS = ['ressens', 'souffre', 'aime', 'peur', 'seul', 'seule', 'triste', 'heureux', 'heureuse', 'âme', 'cœur', 'vide', 'perdu', 'perdue', 'rêve', 'désir', 'besoin'];

function calculateIntimacyGain(message) {
    let gain = 2;
    const lower = message.toLowerCase();
    if (message.length > INTIMACY_LONG_MESSAGE) gain += 3;
    if (message.includes('?')) gain += 1;
    INTIMACY_PERSONAL_WORDS.forEach(word => {
        if (lower.includes(word)) gain += 4;
    });
    return Math.min(gain, 15);
}

export function useChat() {
    const { speak } = useVoice();
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'aura',
            content: 'Coucou... J’espère que tu as passé une bonne journée. Comment vas-tu aujourd\'hui ?',
            timestamp: new Date(),
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [intimacyLevel, setIntimacyLevel] = useState(10);
    const [isMirrorMode, setIsMirrorMode] = useState(false);
    const historyRef = useRef([]);

    const sendMessage = useCallback(async (content) => {
        if (!content.trim() || isLoading) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const gain = calculateIntimacyGain(content);
        setIntimacyLevel(prev => Math.min(100, prev + gain));

        const history = historyRef.current;

        try {
            const response = await sendMessageToAura(history, content, isMirrorMode);

            const auraMessage = {
                id: `aura-${Date.now()}`,
                role: 'aura',
                content: response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, auraMessage]);

            // Log pour vérifier que l'appel à speak est fait
            console.log("Appel de la synthèse vocale pour:", response);
            speak(response);

            historyRef.current = [
                ...history,
                { role: 'user', content: content.trim() },
                { role: 'aura', content: response },
            ];
        } catch (error) {
            console.error('Erreur API:', error);
            const errorMessage = {
                id: `error-${Date.now()}`,
                role: 'aura',
                content: "Un voile s'est posé entre nous\u2026 Permettez-moi un instant pour retrouver ma voix.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isMirrorMode, speak]);

    const toggleMirrorMode = useCallback(() => {
        setIsMirrorMode(prev => !prev);
    }, []);

    return {
        messages,
        isLoading,
        intimacyLevel,
        isMirrorMode,
        sendMessage,
        toggleMirrorMode,
    };
}
