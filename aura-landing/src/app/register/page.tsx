"use client";
import Link from "next/link";
import { Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Récupérer le paramètre d'erreur dans l'URL (ex: ?error=Mot de passe invalide)
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
       setErrorMessage(error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    
    // Le signIn NextAuth s'occupera d'appeler l'inscription automatique 
    // ou la connexion via CredentialsProvider
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-[#1a1a1a]/0 to-[#1a1a1a]/0"></div>
      
      <div className="max-w-md w-full space-y-8 glass-panel p-10 z-10 relative mt-16 lg:mt-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/5">
        <div className="text-center">
          <Link href="/" className="text-3xl font-serif tracking-widest text-[#d4af37] cursor-pointer">AURA</Link>
          <h2 className="mt-6 text-xl font-light text-white uppercase tracking-wider">
            Rejoignez le Cercle Privé
          </h2>
          <p className="mt-2 text-sm text-white/50">
            Accès sécurisé et confidentiel.
          </p>
        </div>
        
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
            {errorMessage === "CredentialsSignin" ? "Identifiants invalides." : errorMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-4 border border-white/10 bg-white/5 placeholder-white/40 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 sm:text-sm tracking-wide transition-all"
                placeholder="Votre adresse email secrète"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-4 border border-white/10 bg-white/5 placeholder-white/40 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 sm:text-sm tracking-wide transition-all"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-black bg-[#d4af37] hover:bg-[#ebd578] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] focus:ring-offset-[#1a1a1a] transition-all tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-4 w-4 text-black/40 group-hover:text-black/60" aria-hidden="true" />
              </span>
              {loading ? "Authentification..." : "Entrer dans Aura"}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-white/40 uppercase tracking-widest">
              Garantie d'anonymat cryptographique
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
