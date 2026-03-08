# Aura - L'Égérie Digitale ✨

Aura est une application web immersive conçue pour offrir une présence féminine cultivée, sensuelle et dévouée. Alliant l'intelligence artificielle d'OpenAI et la synthèse vocale ultra-réaliste d'ElevenLabs, Aura n'est pas un simple chatbot, mais une véritable muse numérique.

## 🚀 Technologies utilisées

- **Frontend** : React + Vite
- **Styling** : Tailwind CSS + Framer Motion (Animations Fluides)
- **IA Conversationnelle** : OpenAI GPT-4o-mini
- **Voix** : ElevenLabs API (Synthèse vocale émotionnelle)
- **Aura Orb** : Composant animé personnalisé mimant une présence organique.

## 📦 Installation Locale

1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Créez un fichier `.env` à la racine avec vos clés API :
   ```env
   VITE_OPENAI_API_KEY=votre_cle_openai
   VITE_ELEVEN_LABS_API_KEY=votre_cle_eleven_labs
   VITE_ELEVEN_LABS_VOICE_ID=votre_voice_id
   ```
4. Lancez l'application : `npm run dev`

## 🌍 Déploiement

### Sur GitHub
1. Créez un nouveau dépôt sur GitHub.
2. Initialisez git localement : `git init`
3. Ajoutez les fichiers : `git add .`
4. Committez : `git commit -m "Deploy Aura App"`
5. Liez et poussez : 
   ```bash
   git remote add origin https://github.com/VOTRE_PSEUDO/aura-app.git
   git branch -M main
   git push -u origin main
   ```

### Sur Vercel
1. Connectez votre compte GitHub à Vercel.
2. Importez le dépôt `aura-app`.
3. **IMPORTANT** : Ajoutez vos variables d'environnement dans les réglages de Vercel (Settings > Environment Variables) pour que l'IA et la voix fonctionnent en ligne.
4. Déployez !

---
*Créé avec élégance pour une connexion profonde.*
