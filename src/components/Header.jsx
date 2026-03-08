import { motion } from 'framer-motion';
import IntimacyIndicator from './IntimacyIndicator';

export default function Header({ intimacyLevel, isMirrorMode, onAgentToggle }) {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 24px 10px',
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
        }}>
            {/* Gauche : Nom / Statut Minimaliste */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '26px',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '0.02em',
                }}>
                    Aura
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {isMirrorMode ? 'Mode Écoute pure' : 'Égérie Digitale'}
                    </span>
                </div>
            </div>

            {/* Droite : Actions et Indicateur */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Nouveau bouton Appel Vocal Agent ElevenLabs */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onAgentToggle}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#D4AF37', // Couleur or pour rappeler l'élégance d'Aura
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                    title="Démarrer un appel vocal avec Aura"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-1.21a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </motion.button>

                <IntimacyIndicator level={intimacyLevel} />
            </div>
        </header>
    );
}
