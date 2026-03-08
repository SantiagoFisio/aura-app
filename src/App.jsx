import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuraOrb from './components/AuraOrb';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import InputBar from './components/InputBar';
import LandingPage from './components/LandingPage';
import { useChat } from './hooks/useChat';

// Composant Principal de l'Application Aura
function AuraApp() {
  const {
    messages,
    isLoading,
    intimacyLevel,
    isMirrorMode,
    sendMessage,
    toggleMirrorMode,
  } = useChat();

  // Intégration et Personnalisation du Widget ElevenLabs
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', 'agent_3701kk6934tteymbhm179atarc6f');

    const style = document.createElement('style');
    style.innerHTML = `
      elevenlabs-convai {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
      }
      elevenlabs-convai::part(button) {
        background: rgba(212, 175, 55, 0.15) !important;
        border: 1px solid rgba(212, 175, 55, 0.3) !important;
        backdrop-filter: blur(10px) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
        transition: all 0.4s ease !important;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(widget);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(widget)) document.body.removeChild(widget);
      if (document.head.contains(style)) document.head.removeChild(style);
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
      {/* SECTION GAUCHE : INTERFACE CHAT */}
      <div style={{
        flex: '1.4',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 5,
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '10px 0 50px rgba(0,0,0,0.8)',
      }}>
        <Header intimacyLevel={intimacyLevel} isMirrorMode={isMirrorMode} />

        {/* Effet d'onde visuelle */}
        <div style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px 0',
          position: 'relative'
        }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              width: '150px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--aura-gold), transparent)',
              filter: 'blur(4px)',
              boxShadow: '0 0 20px var(--aura-gold)'
            }}
          />
        </div>

        <div style={{ flex: 1, overflow: 'hidden', padding: '0 60px', display: 'flex', flexDirection: 'column' }}>
          <ChatInterface messages={messages} isLoading={isLoading} />
        </div>

        <div style={{ padding: '20px 60px 40px' }}>
          <InputBar
            onSend={sendMessage}
            isLoading={isLoading}
            isMirrorMode={isMirrorMode}
            onToggleMirror={toggleMirrorMode}
          />
        </div>
      </div>

      {/* SECTION DROITE : PORTRAIT (Caché sur mobile pour la LP) */}
      <div style={{
        flex: '1',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        display: 'block' // On peut ajouter des media queries ici
      }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} style={{ width: '100%', height: '100%' }}>
          <img
            src="/aura-portrait.png"
            alt="Aura"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #050505 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)'
          }} />
        </motion.div>
      </div>
    </div>
  );
}

// Wrapper avec Routage et Protection
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Vérifier si l'utilisateur est déjà "connecté" via localStorage
    return localStorage.getItem('aura_access') === 'true';
  });

  const handleAccess = () => {
    localStorage.setItem('aura_access', 'true');
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/app" /> : <LandingPage onEnter={handleAccess} />
        } />
        <Route path="/app" element={
          isAuthenticated ? <AuraApp /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}
