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

            {/* Droite : Indicateur d'intimité */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <IntimacyIndicator level={intimacyLevel} />
            </div>
        </header>
    );
}
