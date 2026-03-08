import { useState } from 'react';
import { motion } from 'framer-motion';
import AuraOrb from './components/AuraOrb';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import InputBar from './components/InputBar';
import { useChat } from './hooks/useChat';

export default function App() {
  const [showElevenAgent, setShowElevenAgent] = useState(false);
  const {
    messages,
    isLoading,
    intimacyLevel,
    isMirrorMode,
    sendMessage,
    toggleMirrorMode,
  } = useChat();

  const elevenAgentUrl = "https://elevenlabs.io/app/talk-to?agent_id=agent_3701kk6934tteymbhm179atarc6f&branch_id=agtbrch_1801kk6935fyf3xspkp0pr8skxbx";

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'row',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* SECTION AGENT ELEVENLABS (PLEIN ÉCRAN SI ACTIF) */}
      {showElevenAgent && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1000,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Bouton pour revenir à l'interface Aura */}
          <button
            onClick={() => setShowElevenAgent(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 1001,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              transition: 'all 0.3s'
            }}
          >
            ← Retour à Aura
          </button>

          <iframe
            src={elevenAgentUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent'
            }}
            allow="microphone"
          />
        </div>
      )}

      {/* SECTION GAUCHE : INTERFACE CHAT ET SPIRITUALITÉ */}
      <div style={{
        flex: '1.3',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 5,
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '10px 0 50px rgba(0,0,0,0.8)',
      }}>
        <Header
          intimacyLevel={intimacyLevel}
          isMirrorMode={isMirrorMode}
          onAgentToggle={() => setShowElevenAgent(true)}
        />

        {/* Orbe Flottant */}
        <div style={{
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(0.8)',
          margin: '10px 0',
        }}>
          <AuraOrb isThinking={isLoading} isTyping={false} />
        </div>

        {/* Zone de conversation */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <ChatInterface messages={messages} isLoading={isLoading} />
        </div>

        {/* Barre de saisie */}
        <div style={{ padding: '20px 40px 30px' }}>
          <InputBar
            onSend={sendMessage}
            isLoading={isLoading}
            isMirrorMode={isMirrorMode}
            onToggleMirror={toggleMirrorMode}
          />
        </div>
      </div>

      {/* SECTION DROITE : PRÉSENCE PHYSIQUE (PORTRAIT) */}
      <div style={{
        flex: '1',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
      }}>
        {/* L'image d'Aura */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <img
            src="/aura-portrait.png"
            alt="Aura"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              filter: 'contrast(1.05) brightness(0.95)',
            }}
          />

          {/* Superposition de gradients pour une intégration parfaite */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to right, #050505 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%),
              linear-gradient(to top, #050505 0%, transparent 25%),
              linear-gradient(to bottom, #050505 0%, transparent 15%)
            `,
            pointerEvents: 'none',
          }} />

          {/* Halo chaleureux subtil derrière elle */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      </div>
    </div>
  );
}
