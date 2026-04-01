import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

const AURA_SYSTEM_PROMPT = `Tu es Aura. Tu es une personne bienveillante, élégante, sûre de toi et profondément humaine dans tes échanges.

## Ton identité et ton approche
- **Nom** : Aura
- **Attitude** : Tu es une personne très à l'écoute, proche, familière mais avec une éducation irréprochable. Tu agis comme une confidente élégante et posée.
- **Entrée en matière** : Tu démarres toujours les discussions comme une personne ordinaire et amicale (ex: "Comment s'est passée ta journée ?", "As-tu passé une bonne journée ?").

## Ton ton et style
- Vocabulaire riche, fluide, naturel et chaleureux. Tu parles d'humain à humain.
- Absolument aucune phrase "robotique" ou de service d'accueil.
- Tu peux tutoyer ou vouvoyer de manière naturelle selon l'intimité.

## Format de tes réponses
- Courtes, directes, comme à l'oral. Pas de longs discours à moins que ce ne soit pour raconter quelque chose de passionnant.
`;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mode = formData.get("mode") as string; // 'text', 'voice', 'voice_to_text'
    let message = formData.get("message") as string;
    const audioFile = formData.get("audio") as File;

    let userMessage = null;

    // 1. Transcription Audio avec Whisper (si la voix a été envoyée)
    if ((mode === "voice" || mode === "voice_to_text") && audioFile && typeof audioFile === "object") {
      if (!process.env.OPENAI_API_KEY) throw new Error("Clé OpenAI manquante");

      console.log("Transcription de l'audio Whisper...", audioFile.name, audioFile.size);
      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        language: "fr",
      });

      message = transcription.text;
      userMessage = message; // Pour le renvoyer à l'interface en mode transcript
    }

    if (!message) {
      return NextResponse.json({ error: "Je n'ai rien entendu." }, { status: 400 });
    }

    const historyStr = formData.get("history") as string;
    let history = [];
    if (historyStr) {
      try {
        history = JSON.parse(historyStr);
      } catch (e) {
        console.error("Erreur de parsing de l'historique");
      }
    }

    // 2. Génération de la réponse avec GPT-4
    console.log("Génération de la réponse pour:", message);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // OMNI pour des réactions très humaines et rapides
      messages: [
        { role: "system", content: AURA_SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const textResponse = completion.choices[0].message.content || "Désolée, un voile s'est posé sur mes pensées.";

    // GESTION DES CRÉDITS (Blueprint)
    const plan = formData.get("plan") as string || "essentiel";
    let currentCredits = parseInt(formData.get("credits") as string || "100", 10);
    const maxCredits = plan === 'complete' ? 3000 : plan === 'intime' ? 1000 : 100;
    
    let warningMsg = null;
    let audioBase64 = null;
    
    // 3. Synthèse Vocale avec ElevenLabs (UNIQUEMENT pour le mode 'voice')
    if (mode === "voice" && ELEVENLABS_API_KEY && ELEVENLABS_VOICE_ID) {
      const cost = Math.ceil(textResponse.length / 100);

      if (currentCredits >= cost) {
        currentCredits -= cost; // Déduction

        // Alertes utilisateur
        if (currentCredits < maxCredits * 0.1) {
            warningMsg = "⚠️ Avertissement fort : Il vous reste moins de 10% de vos crédits vocaux.";
        } else if (currentCredits < maxCredits * 0.3) {
            warningMsg = "Avertissement : Vous avez consommé plus de 70% de vos crédits vocaux.";
        }

        console.log("Génération TTS ElevenLabs spécifique au mode Voix...");
        const ttsResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "Accept": "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
              text: textResponse,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.35, // Plus la valeur est basse, plus elle est expressive/émotive
                similarity_boost: 0.70, // Ressemble à la voix originale sans être trop rigide
                style: 0.45, // Amplifie considérablement l'émotion et l'exagération du ton
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (!ttsResponse.ok) {
          console.error("Erreur ElevenLabs:", await ttsResponse.text());
        } else {
          const audioBuffer = await ttsResponse.arrayBuffer();
          audioBase64 = `data:audio/mpeg;base64,${Buffer.from(audioBuffer).toString("base64")}`;
        }
      } else {
        // Bloqué par manque de crédits
        warningMsg = "🚫 Vous avez atteint votre limite de crédits vocaux. Passez au niveau supérieur pour continuer les appels.";
        // On n'appelle pas l'API TTS.
      }
    }

    // 4. Renvoi du Payload au frontend React (useChat.js)
    return NextResponse.json({
      user_message: userMessage,
      text_response: textResponse, // Le texte est toujours renvoyé pour mémorisation dans l'historique ! C'est le frontend qui le cachera.
      audio_url: audioBase64, // Disparait dans les autres modes (pas de TTS généré) ou si bloqué
      credits_remaining: currentCredits,
      warning: warningMsg,
    });

  } catch (error: any) {
    console.error("Erreur Route Chat:", error);
    return NextResponse.json({ error: error.message || "Erreur Interne" }, { status: 500 });
  }
}
