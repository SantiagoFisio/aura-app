import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuraOrb from './components/AuraOrb';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import InputBar from './components/InputBar';
import LandingPage from './components/LandingPage';
import { useChat } from './hooks/useChat';
import MentionsLegales from './components/MentionsLegales';
import Conditions from './components/Conditions';
import Confidentialite from './components/Confidentialite';

// Composant Principal de l'Application Aura
function AuraApp() {
  const {
    messages,
    isLoading,
    intimacyLevel,
    isMirrorMode,
    creditsRemaining,
    warningBanner,
    sendMessage,
    sendAudioMessage,
    toggleMirrorMode,
  } = useChat();

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
        {warningBanner && (
          <div id="warning-banner" className={warningBanner ? '' : 'hidden'}>
            {warningBanner}
          </div>
        )}
        
        <Header intimacyLevel={intimacyLevel} isMirrorMode={isMirrorMode} />
        
        {creditsRemaining !== null && (
           <div style={{ padding: '0 24px', fontSize: '12px', color: 'rgba(212, 175, 55, 0.8)', textAlign: 'right' }}>
               Crédits restants : <span id="credit-count">{creditsRemaining}</span>
           </div>
        )}

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
            onSendAudio={sendAudioMessage}
            isLoading={isLoading}
            isMirrorMode={isMirrorMode}
            onToggleMirror={toggleMirrorMode}
          />
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions Légales</a>
            <a href="/conditions" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>CGU</a>
            <a href="/confidentialite" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Confidentialité</a>
          </div>
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
    // Vérifier si l'utilisateur est déjà "connecté" via localStorage ou s'il revient de Stripe avec succès
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' || urlParams.get('session_id')) {
        localStorage.setItem('aura_access', 'true');
        const plan = urlParams.get('plan') || 'essential';
        localStorage.setItem('aura_plan', plan);
        // Nettoyer l'URL
        window.history.replaceState(null, '', window.location.pathname);
        return true;
    }
    return localStorage.getItem('aura_access') === 'true';
  });

  const handleAccess = (plan = 'essential') => {
    localStorage.setItem('aura_access', 'true');
    localStorage.setItem('aura_plan', plan);
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
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
      </Routes>
    </Router>
  );
}
