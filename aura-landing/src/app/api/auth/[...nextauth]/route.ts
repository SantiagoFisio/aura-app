import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// On utilise SUPABASE_SERVICE_KEY pour pouvoir insérer dans la base tout en respectant RLS via le SDK admin
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Accès",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "votre@email.com" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("L'email et le mot de passe sont obligatoires");
        }

        // 1. Chercher l'utilisateur dans la table PostgreSQL 'users'
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error && error.code !== "PGRST116") {
            // PGRST116 = 0 rows returned, which means new user.
            throw new Error("Erreur de connexion à la base de données");
        }

        if (!user) {
          // 2. L'utilisateur n'existe pas -> Inscription automatique Sécurisée
          // Hachage impératif via bcrypt
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          
          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({ 
                email: credentials.email, 
                password_hash: hashedPassword,
                plan: 'essentiel' // plan par défaut
            })
            .select()
            .single();

          if (insertError) throw new Error("Erreur lors de la création du compte.");
          
          return { id: newUser.id, email: newUser.email };
        }

        // 3. L'utilisateur existe -> Connexion
        // Vérification Cryptographique du Mot de passe
        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        
        if (!isValid) {
          throw new Error("Mot de passe invalide.");
        }

        return { id: user.id, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  cookies: {
    // Forçage de la sécurité stricte sur les cookies (HttpOnly, SameSite) - Pas de LocalStorage
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true
      }
    }
  },
  pages: {
    signIn: "/register", // Redirige les erreurs vers la page de login customisée
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
          session.user.id = token.sub;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
