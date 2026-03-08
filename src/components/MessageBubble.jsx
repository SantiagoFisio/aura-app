import { motion } from 'framer-motion';

export default function MessageBubble({ message, onSpeak }) {
    const isAura = message.role === 'aura';

    return (
        <motion.div
            className={`flex ${isAura ? 'justify-start' : 'justify-end'} mb-8 w-full`}
            initial={{ opacity: 0, x: isAura ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: isAura ? 'flex-start' : 'flex-end',
            }}
        >
            <div style={{ maxWidth: '85%' }}>
                <div
                    style={{
                        padding: '16px 20px',
                        borderRadius: isAura ? '2px 20px 20px 20px' : '20px 2px 20px 20px',
                        background: isAura
                            ? 'rgba(212, 175, 55, 0.03)'
                            : 'rgba(255, 255, 255, 0.05)',
                        border: isAura
                            ? '1px solid rgba(212, 175, 55, 0.1)'
                            : '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <p style={{
                        margin: 0,
                        fontFamily: isAura ? 'Playfair Display, serif' : 'Inter, sans-serif',
                        fontSize: isAura ? '17px' : '15px',
                        lineHeight: '1.6',
                        fontWeight: isAura ? '400' : '400',
                        fontStyle: isAura ? 'italic' : 'normal',
                        color: isAura ? '#F5E5B8' : '#ffffff',
                        letterSpacing: '0.01em',
                    }}>
                        {message.content}
                    </p>
                </div>

                {isAura && onSpeak && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '8px',
                    }}>
                        <button
                            onClick={() => onSpeak(message.content)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'rgba(212, 175, 55, 0.5)',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0 4px',
                                fontFamily: 'Inter, sans-serif',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                            onMouseEnter={e => e.target.style.color = 'rgba(212, 175, 55, 1)'}
                            onMouseLeave={e => e.target.style.color = 'rgba(212, 175, 55, 0.5)'}
                        >
                            <span>Écouter</span>
                            <span>▶</span>
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
