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
    widget.setAttribute('agent-id', import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'agent_7101km6e3b1de06sx7x3vsdcjn8y');
    // Basic positioning applied to the element itself
    widget.style.position = 'fixed';
    widget.style.bottom = '30px';
    widget.style.right = '30px';
    widget.style.zIndex = '10000';
    document.body.appendChild(widget);

    // Fonction pour injecter les styles directement dans le Shadow DOM du widget
    const injectShadowStyle = () => {
      const el = document.querySelector('elevenlabs-convai');
      if (el && el.shadowRoot) {
        if (!el.shadowRoot.querySelector('#aura-custom-style')) {
          const st = document.createElement('style');
          st.id = 'aura-custom-style';
          st.innerHTML = `
            /* Masquer la mention "Powered by ElevenLabs" pour l'immersion */
            ._branding { display: none !important; }
            
            /* Recadrer et re-styler la grande carte blanche */
            ._widget_container {
              background: linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(5,5,5,0.95) 100%) !important;
              border: 1px solid rgba(212, 175, 55, 0.3) !important;
              backdrop-filter: blur(16px) !important;
              border-radius: 20px !important;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212,175,55,0.1) !important;
              padding: 20px !important;
              color: #F5E5B8 !important;
            }

            /* Remplacer le texte "Need help?" */
            ._status_message {
              color: transparent !important;
              position: relative;
              font-family: 'Playfair Display', serif !important;
              margin-bottom: 15px !important;
              display: flex;
              justify-content: center;
            }
            ._status_message::after {
              content: "Une présence à votre écoute" !important;
              position: absolute;
              left: 0;
              width: 100%;
              color: rgba(245, 229, 184, 0.8) !important;
              font-size: 15px !important;
              text-align: center;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }

            /* Re-styler le bouton de lancement d'appel interne */
            button {
              background: rgba(212, 175, 55, 0.15) !important;
              border: 1px solid rgba(212, 175, 55, 0.4) !important;
              border-radius: 30px !important;
              color: #F5E5B8 !important;
              padding: 12px 24px !important;
              transition: all 0.3s ease !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: 100%;
            }
            button:hover {
              background: rgba(212, 175, 55, 0.25) !important;
              border-color: rgba(212, 175, 55, 0.6) !important;
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2) !important;
            }
            button svg {
              stroke: #D4AF37 !important;
              fill: none !important;
            }

            /* Remplacer le texte "Start a call" */
            ._btn_text {
              color: transparent !important;
              position: relative;
              margin-left: 10px;
              flex-grow: 1;
              text-align: left;
            }
            ._btn_text::after {
              content: "Parler avec Aura" !important;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              color: #F5E5B8 !important;
              font-family: 'Playfair Display', serif !important;
              font-size: 16px !important;
              letter-spacing: 0.05em;
              white-space: nowrap;
            }
          `;
          el.shadowRoot.appendChild(st);
        }
      }
    };

    // Utiliser un MutationObserver pour garantir que le style est appliqué même si le composant se re-rend
    const observer = new MutationObserver(() => injectShadowStyle());
    observer.observe(document.body, { childList: true, subtree: true });
    
    const interval = setInterval(injectShadowStyle, 200);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(widget)) document.body.removeChild(widget);
      observer.disconnect();
      clearInterval(interval);
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
