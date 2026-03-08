import { motion } from 'framer-motion';

export default function MirrorModeToggle({ isMirrorMode, onToggle }) {
    return (
        <button
            onClick={onToggle}
            title={isMirrorMode ? "Désactiver le Mode Miroir" : "Activer le Mode Miroir (Écoute Pure)"}
            style={{
                border: `1px solid ${isMirrorMode ? 'rgba(212,175,55,0.6)' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: '20px',
                padding: '6px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                background: isMirrorMode ? 'rgba(212,175,55,0.08)' : 'transparent',
            }}
        >
            <motion.span
                style={{
                    fontSize: '12px',
                    color: isMirrorMode ? '#D4AF37' : 'rgba(255,255,255,0.35)',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    transition: 'color 0.3s ease',
                }}
                animate={{ opacity: isMirrorMode ? [1, 0.7, 1] : 1 }}
                transition={{ duration: 2, repeat: isMirrorMode ? Infinity : 0 }}
            >
                ◎ {isMirrorMode ? 'Écoute Pure' : 'Mode Miroir'}
            </motion.span>
        </button>
    );
}
