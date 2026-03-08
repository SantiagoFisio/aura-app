import { motion } from 'framer-motion';

export default function AuraOrb({ isThinking, isTyping }) {
    const pulseSpeed = isThinking ? 1.4 : 4;
    const scaleRange = isThinking ? [1, 1.15, 1] : [1, 1.05, 1];

    return (
        <div style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* Halo de fond Ambre/Feu */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: pulseSpeed * 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(255,107,107,0.05) 50%, transparent 75%)',
                    filter: 'blur(50px)',
                    borderRadius: '50%',
                }}
            />

            {/* Couche iris - Couleurs plus chaudes (Ambre/Or) */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: scaleRange,
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                    scale: { duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }
                }}
                style={{
                    position: 'absolute',
                    width: '75%',
                    height: '75%',
                    background: 'conic-gradient(from 0deg, #D4AF37, #ff8c00, #ff4e50, #D4AF37)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    opacity: 0.8,
                    mixBlendMode: 'screen',
                }}
            />

            {/* Cœur Organique Plasma */}
            <motion.div
                animate={{
                    borderRadius: [
                        '42% 58% 50% 50% / 50% 42% 58% 50%',
                        '58% 42% 58% 42% / 42% 58% 42% 58%',
                        '50% 50% 42% 58% / 58% 50% 50% 42%',
                        '42% 58% 50% 50% / 50% 42% 58% 50%'
                    ],
                    rotate: [0, -45, 0, 45, 0],
                    scale: isThinking ? [1, 1.12, 1] : [1, 1.03, 1]
                }}
                transition={{
                    duration: pulseSpeed * 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle at 40% 40%, rgba(255,248,220,1), rgba(212,175,55,0.9) 40%, rgba(255,140,0,0.7) 75%, transparent 95%)',
                    filter: 'blur(10px)',
                }}
            />

            {/* Point lumineux central "Éclat d'Ambre" */}
            <motion.div
                animate={{
                    scale: isThinking ? [0.9, 1.4, 0.9] : [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: pulseSpeed / 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    width: '12%',
                    height: '12%',
                    background: '#fff',
                    borderRadius: '50%',
                    filter: 'blur(8px)',
                    boxShadow: '0 0 20px 5px #fff, 0 0 40px 15px #ff8c00',
                }}
            />
        </div>
    );
}
