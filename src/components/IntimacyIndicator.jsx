import { motion } from 'framer-motion';

export default function IntimacyIndicator({ level }) {
    // level: 0-100
    const intensity = level / 100;
    const glowSize = 8 + intensity * 24;
    const glowOpacity = 0.3 + intensity * 0.7;
    const pulseSpeed = 3 - intensity * 1.5;

    return (
        <div className="flex flex-col items-center gap-1" title={`Connexion : ${Math.round(level)}%`}>
            <motion.div
                style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, #fff8dc 0%, #D4AF37 50%, #b8860b 100%)`,
                    boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px rgba(212, 175, 55, ${glowOpacity})`,
                    cursor: 'default',
                }}
                animate={{
                    scale: [1, 1 + intensity * 0.2, 1],
                    boxShadow: [
                        `0 0 ${glowSize}px ${glowSize / 2}px rgba(212, 175, 55, ${glowOpacity})`,
                        `0 0 ${glowSize * 1.4}px ${glowSize * 0.7}px rgba(212, 175, 55, ${glowOpacity * 0.8})`,
                        `0 0 ${glowSize}px ${glowSize / 2}px rgba(212, 175, 55, ${glowOpacity})`,
                    ],
                }}
                transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <span style={{
                fontSize: '9px',
                color: 'rgba(212,175,55,0.5)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            }}>
                {level < 30 ? 'éveil' : level < 60 ? 'lien' : level < 85 ? 'intimité' : 'fusion'}
            </span>
        </div>
    );
}
