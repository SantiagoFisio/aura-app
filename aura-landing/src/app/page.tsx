import Link from "next/link";
import { Shield, Zap, Star, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden flex flex-col font-sans">
      {/* Navbar Minimaliste */}
      <nav className="w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md border-b border-white/5 fixed top-0 left-0 right-0">
        <div className="text-2xl font-serif tracking-widest text-[#d4af37]">AURA</div>
        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <Link href="/register" className="text-[#d4af37] font-bold border border-[#d4af37]/30 px-6 py-2 flex items-center gap-2 hover:bg-[#d4af37]/10 transition-all rounded-full shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Lock size={14} /> Accès Membres
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col justify-center">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-32">
          <div className="z-10 max-w-4xl flex flex-col items-center">
            <span className="inline-block text-[#d4af37] tracking-[0.3em] uppercase text-sm mb-6 font-bold drop-shadow-md">
              L'Ultime Compagnie Numérique
            </span>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight tracking-tight text-white drop-shadow-2xl">
              Entrez dans l'univers de <br /><span className="italic text-[#d4af37]">Aura</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-70 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Une présence cultivée, sensuelle et dévouée. Disponible à chaque instant, dans l'intimité la plus absolue.
            </p>
            
            <Link 
              href="/register" 
              className="group relative bg-[#d4af37] text-[#1a1a1a] px-12 py-5 rounded-full font-medium text-lg uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-[#ebd578] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative font-bold">Commencer l'expérience</span>
            </Link>
            
            <p className="mt-8 text-xs font-light tracking-wide text-white/40 uppercase gap-2 flex items-center justify-center">
              <Shield size={12} className="text-[#d4af37]" /> Chiffrement de bout en bout
            </p>
          </div>
          
          {/* Subtle Grid / Background styling */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-[#1a1a1a]/0 to-[#1a1a1a]/0"></div>
        </section>

        {/* CONCEPT & FEATURE SECTION */}
        <section className="py-32 px-8 bg-black relative border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center z-10 relative">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto border border-[#d4af37]/20 text-[#d4af37]">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-serif text-[#d4af37]">Vie Privée Ultime</h3>
              <p className="text-white/60 font-light leading-relaxed">Vos secrets sont chiffrés. Notre infrastructure garantit qu'aucune donnée sensible n'est compromise. Discrétion absolue.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto border border-[#d4af37]/20 text-[#d4af37]">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-serif text-[#d4af37]">Connexion Intuitive</h3>
              <p className="text-white/60 font-light leading-relaxed">Une architecture technologique avancée permettant d'apprendre vos préférences pour des échanges sur-mesure d'un niveau inégalé.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto border border-[#d4af37]/20 text-[#d4af37]">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-serif text-[#d4af37]">Audio Haute Fidélité</h3>
              <p className="text-white/60 font-light leading-relaxed">Découvrez la puissance de voix premium qui donnent vie à vos échanges textuels pour un réalisme émotionnel saisissant.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center px-8 bg-[#1a1a1a]">
        <div className="text-2xl font-serif text-[#d4af37] mb-6 tracking-widest">AURA</div>
        <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
          © 2026 Aura AI — Expérience Confidentielle Premium.
        </p>
      </footer>
    </div>
  );
}
