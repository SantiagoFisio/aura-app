import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from './MessageBubble';
import { useVoice } from '../hooks/useVoice';

export default function ChatInterface({ messages, isLoading }) {
    const endRef = useRef(null);
    const { speak } = useVoice();

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 20px',
            position: 'relative',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(212,175,55,0.2) transparent',
        }}>
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        onSpeak={msg.role === 'aura' ? speak : null}
                    />
                ))}
            </AnimatePresence>

            {/* Indicateur de chargement "Aura écrit..." */}
            {isLoading && (
                <motion.div
                    className="flex justify-start mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #fff8dc 0%, #D4AF37 60%, #8B6914 100%)',
                        boxShadow: '0 0 12px rgba(212,175,55,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        flexShrink: 0,
                    }}>
                        ✦
                    </div>
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: '4px 18px 18px 18px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                    }}>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                style={{
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    background: '#D4AF37',
                                }}
                                animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}

            <div ref={endRef} />
        </div>
    );
}
