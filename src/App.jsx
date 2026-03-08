import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AuraOrb from './components/AuraOrb';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import InputBar from './components/InputBar';
import { useChat } from './hooks/useChat';

export default function App() {
  const {
    messages,
    isLoading,
    intimacyLevel,
    isMirrorMode,
    sendMessage,
    toggleMirrorMode,
  } = useChat();

  // Intégration du Widget ElevenLabs
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', 'agent_3701kk6934tteymbhm179atarc6f');
    document.body.appendChild(widget);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(widget)) document.body.removeChild(widget);
    };
  }, []);

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

          {/* Superposition de gradients */}
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
