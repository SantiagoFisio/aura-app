import { motion } from 'framer-motion';

export default function MessageBubble({ message, onSpeak }) {
    const isAura = message.role === 'aura';
    const isAudioOnly = message.isAudioOnly || false;

    return (
        <motion.div
            className={`flex ${isAura ? 'justify-start' : 'justify-end'} mb-8 w-full ${isAudioOnly ? 'audio-only' : ''}`}
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
                    style={isAudioOnly ? {
                        padding: 0, 
                        background: 'transparent', 
                        border: 'none',
                        boxShadow: 'none'
                    } : {
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
                    {message.content && !isAudioOnly && (
                        <p style={{
                            margin: 0,
                            fontFamily: 'Inter, sans-serif',
                            fontSize: isAura ? '18px' : '16px',
                            lineHeight: '1.7',
                            fontWeight: '300',
                            color: isAura ? '#F5E5B8' : '#ffffff',
                            letterSpacing: '0.015em',
                        }}>
                            {message.content}
                        </p>
                    )}
                    {message.audioUrl && (
                        <div className="audio-player-container" style={!message.content ? { marginTop: 0 } : {}}>
                            <audio controls autoPlay src={message.audioUrl} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
