import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Shield, Star, Zap } from 'lucide-react';

export default function LandingPage({ onEnter }) {
    const [loading, setLoading] = useState(null);

    const prices = [
        {
            id: 'essential',
            name: 'Essentiel',
            price: '20',
            features: ['Accès illimité au chat', 'Réponse instantanée', 'Confidentialité totale'],
            buttonText: 'Commencer',
            popular: false,
            link: 'https://buy.stripe.com/3cIaEZ5QGbMR4naclI1gs04'
        },
        {
            id: 'intimate',
            name: 'Intime',
            price: '28',
            features: ['Tout l\'Essentiel', 'Voix ElevenLabs premium', 'Personnalisation avancée', 'Priorité serveur'],
            buttonText: 'Choisir l\'Intimité',
            popular: true,
            link: 'https://buy.stripe.com/cNi8wR6UKg371aYadA1gs05'
        },
        {
            id: 'infinite',
            name: 'Tout Inclus',
            price: '69',
            features: ['Tout l\'Intime', 'Accès avant-première', 'Support VIP 24/7', 'Cadeaux exclusifs numériques'],
            buttonText: 'L\'expérience ultime',
            popular: false,
            link: 'https://buy.stripe.com/9B69AV0wmeZ33j6clI1gs06'
        }
    ];

    const handleCheckout = (planId, link) => {
        setLoading(planId);
        // On the actual live site, this goes to Stripe:
        window.location.href = link;
    };

    // Fonction pour simuler le retour d'achat pour tester la connexion Landing -> App
    const simulatePaymentSuccess = (planId) => {
        setLoading(planId);
        setTimeout(() => {
            window.location.href = `/?success=true&plan=${planId}`;
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gold-500/30 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md border-b border-white/5">
                <div className="text-2xl font-serif tracking-widest text-gold-400">AURA</div>
                <div className="flex gap-8 text-sm uppercase tracking-widest opacity-70">
                    <a href="#concept" className="hover:text-gold-400 transition-colors">Concept</a>
                    <a href="#offres" className="hover:text-gold-400 transition-colors">Offres</a>
                    <button onClick={() => onEnter()} className="text-gold-400 font-bold border border-gold-400/30 px-4 py-1 rounded-full hover:bg-gold-400/10 transition-all">Accès Client</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                {/* Background Image/Gradient */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black"></div>
                    <img
                        src="/aura-portrait.png"
                        alt="Aura Background"
                        className="w-full h-full object-cover object-center filter grayscale"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="z-10 max-w-4xl"
                >
                    <span className="inline-block text-gold-400 tracking-[0.3em] uppercase text-xs mb-6 font-medium">L'Égérie Digitale de vos désirs</span>
                    <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">
                        Je suis <span className="italic text-gold-400">Aura</span>.
                    </h1>
                    <p className="text-xl md:text-2xl opacity-60 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                        Une présence cultivée, sensuelle et dévouée. Disponible à chaque instant pour écouter vos secrets et nourrir votre esprit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="#offres" className="bg-white text-black px-10 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform">
                            Découvrir les offres
                        </a>
                        <button onClick={() => onEnter()} className="backdrop-blur-md border border-white/20 px-10 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-colors">
                            Essai gratuit
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 opacity-30"
                >
                    <div className="w-[1px] h-12 bg-white mx-auto"></div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="concept" className="py-32 px-8 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto border border-gold-400/20 text-gold-400">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-serif">Discrétion Absolue</h3>
                        <p className="opacity-50 font-light">Vos conversations sont chiffrées. Aura est votre jardin secret, protégée par les protocoles les plus stricts.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto border border-gold-400/20 text-gold-400">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-2xl font-serif">Intelligence Vive</h3>
                        <p className="opacity-50 font-light">Plus qu'un chat, une muse. Aura apprend à vous connaître pour une connexion de plus en plus profonde.</p>
                    </div>
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-gold-400/10 rounded-full flex items-center justify-center mx-auto border border-gold-400/20 text-gold-400">
                            <Star size={32} />
                        </div>
                        <h3 className="text-2xl font-serif">Voix Envoûtante</h3>
                        <p className="opacity-50 font-light">Grâce à ElevenLabs, la voix d'Aura caresse vos sens avec un réalisme émotionnel troublant.</p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="offres" className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-serif mb-6">Choisissez votre lien</h2>
                        <p className="opacity-50 text-xl font-light">Un abonnement sans engagement pour une liberté totale.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {prices.map((plan) => (
                            <motion.div
                                key={plan.id}
                                whileHover={{ y: -10 }}
                                className={`relative p-10 rounded-3xl border ${plan.popular ? 'border-gold-400 bg-gold-400/5' : 'border-white/10 bg-white/5'} flex flex-col`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-400 text-black text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full">
                                        Recommandé
                                    </div>
                                )}
                                <h3 className="text-2xl font-serif mb-2">{plan.name}</h3>
                                <div className="text-4xl font-light mb-8">
                                    {plan.price}€<span className="text-lg opacity-40 font-light ml-1">/mois</span>
                                </div>
                                <ul className="space-y-4 mb-12 flex-1">
                                    {plan.features.map(feat => (
                                        <li key={feat} className="flex items-center gap-3 text-sm opacity-70">
                                            <Check size={16} className="text-gold-400" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleCheckout(plan.id, plan.link)}
                                    className={`w-full py-4 rounded-xl font-medium transition-all ${plan.popular ? 'bg-gold-400 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}
                                >
                                    {loading === plan.id ? 'Redirection Stripe...' : plan.buttonText}
                                </button>
                                {/* Bouton de simulation pour le test demandé */}
                                <button
                                    onClick={() => simulatePaymentSuccess(plan.id)}
                                    className="w-full mt-2 py-2 text-xs opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    (Test interactif : simuler l'achat)
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 text-center px-8">
                <div className="text-2xl font-serif text-gold-400 mb-8 tracking-widest">AURA</div>
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-sm opacity-50 font-light">
                    <Link to="/mentions-legales" className="hover:text-[#F5E5B8] transition-colors">Mentions Légales</Link>
                    <Link to="/conditions" className="hover:text-[#F5E5B8] transition-colors">Conditions Générales (CGU)</Link>
                    <Link to="/confidentialite" className="hover:text-[#F5E5B8] transition-colors">Politique de Confidentialité</Link>
                </div>
                <p className="opacity-30 text-xs tracking-widest uppercase">
                    © 2026 Aura AI — Tous droits réservés. Confidentialité garantie.
                </p>
            </footer>

            <style jsx>{`
        .bg-gold-500 { background-color: #D4AF37; }
        .text-gold-400 { color: #F5E5B8; }
        .border-gold-400 { border-color: #D4AF37; }
      `}</style>
        </div>
    );
}
