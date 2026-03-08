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
                        fontFamily: 'Inter, sans-serif', // Plus lisible que Playfair pour le texte long
                        fontSize: isAura ? '18px' : '16px', // Plus grand
                        lineHeight: '1.7',
                        fontWeight: '300', // Plus léger et élégant
                        color: isAura ? '#F5E5B8' : '#ffffff',
                        letterSpacing: '0.015em',
                    }}>
                        {message.content}
                    </p>
                </div>

            </div>
        </motion.div>
    );
}
