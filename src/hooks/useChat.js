import { useState, useCallback, useRef } from 'react';

const USER_ID = 'test_user'; // Constante provenant du code d'origine

export function useChat() {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'aura',
            content: 'Coucou... J’espère que tu as passé une bonne journée. Comment vas-tu aujourd\'hui ?',
            timestamp: new Date(),
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const plan = localStorage.getItem('aura_plan') || 'essentiel';
    const [creditsRemaining, setCreditsRemaining] = useState(() => {
        const saved = localStorage.getItem('aura_credits');
        if (saved !== null) return parseInt(saved, 10);
        
        // Initialisation selon le plan si pas de sauvegarde
        if (plan === 'complete') return 3000;
        if (plan === 'intime') return 1000;
        return 100; // essentiel
    });
    const [warningBanner, setWarningBanner] = useState('');
    
    // Gardé pour la compatibilité avec Header.jsx
    const [intimacyLevel, setIntimacyLevel] = useState(10);
    const [isMirrorMode, setIsMirrorMode] = useState(false);
    
    const updateState = (data) => {
        if (data.credits_remaining !== undefined) {
            setCreditsRemaining(data.credits_remaining);
            localStorage.setItem('aura_credits', data.credits_remaining);
        }
        if (data.warning) {
            setWarningBanner(data.warning);
        } else {
            setWarningBanner('');
        }
    };

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

        try {
            const history = messages
                .filter(m => m.id !== 'welcome' && !m.id.startsWith('error') && m.content && !m.content.includes("Appel en cours..."))
                .map(m => ({
                    role: m.role === 'aura' ? 'assistant' : 'user',
                    content: m.content
                }))
                .slice(-10);

            const formData = new FormData();
            formData.append('user_id', USER_ID);
            formData.append('mode', 'text');
            formData.append('message', content.trim());
            formData.append('plan', plan);
            formData.append('credits', creditsRemaining.toString());
            formData.append('history', JSON.stringify(history));

            const response = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            
            if (!response.ok) {
                const errorMessage = {
                    id: `error-${Date.now()}`,
                    role: 'aura',
                    content: "Erreur: " + (data.error || "Une erreur est survenue."),
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, errorMessage]);
            } else {
                const auraMessage = {
                    id: `aura-${Date.now()}`,
                    role: 'aura',
                    content: data.text_response,
                    audioUrl: data.audio_url,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, auraMessage]);
                updateState(data);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = {
                id: `error-${Date.now()}`,
                role: 'aura',
                content: "Impossible de joindre le serveur.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, messages]);

    const sendAudioMessage = useCallback(async (mode, audioBlob) => {
        setIsLoading(true);

        try {
            const history = messages
                .filter(m => m.id !== 'welcome' && !m.id.startsWith('error') && m.content && !m.content.includes("Appel en cours..."))
                .map(m => ({
                    role: m.role === 'aura' ? 'assistant' : 'user',
                    content: m.content
                }))
                .slice(-10);

            const formData = new FormData();
            formData.append('user_id', USER_ID);
            formData.append('mode', mode); // 'voice' or 'voice_to_text'
            formData.append('audio', audioBlob, 'voice_record.webm');
            formData.append('plan', plan);
            formData.append('credits', creditsRemaining.toString());
            formData.append('history', JSON.stringify(history));

            const response = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = {
                    id: `error-${Date.now()}`,
                    role: 'aura',
                    content: "Erreur vocale: " + (data.error || "Problème serveur"),
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, errorMessage]);
            } else {
                if (mode === 'voice') {
                    if (data.user_message) {
                        setMessages(prev => [...prev, {
                            id: `user-${Date.now()}`,
                            role: 'user',
                            content: "🎤 Appel en cours...",
                            timestamp: new Date()
                        }]);
                    }
                    const auraMessage = {
                        id: `aura-${Date.now()}`,
                        role: 'aura',
                        content: data.text_response, // Le texte est conservé dans l'état, mais masqué par isAudioOnly dans l'UI
                        audioUrl: data.audio_url,
                        isAudioOnly: true,
                        timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, auraMessage]);
                } else {
                    if (data.user_message) {
                        setMessages(prev => [...prev, {
                            id: `user-${Date.now()}`,
                            role: 'user',
                            content: data.user_message,
                            timestamp: new Date()
                        }]);
                    }
                    const auraMessage = {
                        id: `aura-${Date.now()}`,
                        role: 'aura',
                        content: data.text_response,
                        audioUrl: data.audio_url,
                        timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, auraMessage]);
                }
                updateState(data);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = {
                id: `error-${Date.now()}`,
                role: 'aura',
                content: "Impossible d'envoyer l'audio.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const toggleMirrorMode = useCallback(() => {
        setIsMirrorMode(prev => !prev);
    }, []);

    return {
        messages,
        isLoading,
        intimacyLevel,
        isMirrorMode,
        creditsRemaining,
        warningBanner,
        sendMessage,
        sendAudioMessage,
        toggleMirrorMode,
    };
}
