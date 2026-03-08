import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InputBar({ onSend, isLoading, isMirrorMode, onToggleMirror }) {
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (value.trim() && !isLoading) {
            onSend(value.trim());
            setValue('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [value]);

    return (
        <div style={{
            padding: '8px 16px 24px',
            position: 'relative',
            zIndex: 10,
            background: 'transparent'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '12px',
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
                {/* Toggle Mode Button (Le bouton multi-color de gauche) */}
                <button
                    onClick={onToggleMirror}
                    title={isMirrorMode ? "Mode Écoute Pure Actif (Désactiver)" : "Activer Mode Miroir"}
                    style={{
                        minWidth: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isMirrorMode
                            ? 'conic-gradient(from 0deg, #D4AF37, #ff6b6b, #4a00e0, #D4AF37)'
                            : 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.2s',
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <span style={{ fontSize: '18px' }}>✧</span>
                </button>

                {/* Input Textarea */}
                <div style={{
                    flex: 1,
                    padding: '8px 4px',
                }}>
                    <textarea
                        ref={textareaRef}
                        id="chat-input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isMirrorMode ? "Je vous écoute..." : "Demandez ce que vous voulez..."}
                        rows={1}
                        style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            color: 'rgba(255,255,255,0.9)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '15px',
                            lineHeight: '1.4',
                            resize: 'none',
                        }}
                    />
                </div>

                {/* Send Button / Loading Orb */}
                <button
                    onClick={handleSend}
                    disabled={!value.trim() || isLoading}
                    style={{
                        minWidth: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: value.trim() && !isLoading ? 'rgba(255,255,255,0.2)' : 'transparent',
                        border: 'none',
                        color: value.trim() && !isLoading ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: value.trim() && !isLoading ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.3s, color 0.3s',
                    }}
                >
                    {isLoading ? (
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        >
                            ⟳
                        </motion.span>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
