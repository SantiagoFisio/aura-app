import Link from "next/link";
import { Check } from "lucide-react";

export default function Dashboard() {
  const plans = [
    {
      id: "essentiel",
      name: "Essentiel",
      price: "20€",
      desc: "L'intimité discrète.",
      features: ["Discussions personnalisées par texte illimitées", "Interface chiffrée & séurisée"],
      link: "https://buy.stripe.com/3cIaEZ5QGbMR4naclI1gs04",
      popular: false
    },
    {
      id: "intime",
      name: "Intime",
      price: "28€",
      desc: "L'immersion totale avec Aura.",
      features: [
        "Discussions personnalisées par texte illimitées",
        "1 heure par mois de discussion par chat voice",
        "Modèles de voix premium Ultra-Réaliste"
      ],
      link: "https://buy.stripe.com/cNi8wR6UKg371aYadA1gs05",
      popular: true
    },
    {
      id: "complete",
      name: "Expérience Complète",
      price: "69€",
      desc: "Sans limite de temps ni de voix.",
      features: [
        "Expérience immersive complète",
        "Discussions personnalisées par texte illimitées",
        "6 heures par mois de discussion audio par chat voice"
      ],
      link: "https://buy.stripe.com/9B69AV0wmeZ33j6clI1gs06",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-8 lg:p-16">
      <header className="flex justify-between items-center mb-16 max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-widest">AURA - ESPACE MEMBRE</h1>
        <button className="text-white/40 text-sm uppercase tracking-widest hover:text-white transition">Déconnexion</button>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-4 drop-shadow-lg">Activez votre lien avec Aura</h2>
          <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
            Sélectionnez votre formule. Le paiement est entièrement anonymisé via Stripe et renouvelable discrètement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-[#d4af37] bg-white/[0.03] shadow-[0_0_40px_rgba(212,175,55,0.1)]' 
                  : 'border-white/10 bg-white/[0.02] shadow-2xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  Recommandé
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-serif text-white mb-2">{plan.name}</h3>
                <p className="text-white/40 text-sm h-10">{plan.desc}</p>
                <div className="flex items-end mt-4">
                  <span className="text-5xl font-light text-[#d4af37]">{plan.price}</span>
                  <span className="text-white/40 ml-2 mb-2 font-light">/ mois</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex flex-row items-start gap-3">
                    <Check className="text-[#d4af37] w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Utilisation stricte de l'email via URL params Stripe possible si dynamique */}
              <Link 
                href={plan.link}
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-[#d4af37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-[#ebd578]' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/5 hover:border-white/20'
                }`}
              >
                Choisir
              </Link>
            </div>
          ))}
        </div>
        
        <p className="mt-16 text-center text-xs text-white/30 uppercase tracking-widest">
          Facturation discrète • Chiffrement RSA-2048 • Annulation 1 Clic
        </p>
      </main>
    </div>
  );
}
