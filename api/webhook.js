import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details.email;
    const amount = session.amount_total / 100; // Conversion centimes -> Euros

    let creditsToAdd = 0;
    let planName = "";

    // --- LOGIQUE DE TES FORFAITS ---
    if (amount >= 60) { 
      creditsToAdd = 3600; // Forfait Complet 69€
      planName = "complet";
    } else if (amount >= 25) { 
      creditsToAdd = 600;  // Forfait Intime 28€
      planName = "intime";
    } else if (amount >= 18) {
      creditsToAdd = 45;   // Forfait Essentiel 20€
      planName = "essentiel";
    }

    console.log(`Paiement de ${amount}€ reçu de ${email}. Plan: ${planName}. Ajout de ${creditsToAdd} crédits.`);

    if (creditsToAdd > 0) {
      // Mise à jour de la table 'users' dans Supabase
      const { error } = await supabase
        .from('users')
        .update({ 
          credits: creditsToAdd,
          plan: planName 
        })
        .match({ email: email });

      if (error) {
        console.error("Erreur Supabase:", error);
        return res.status(500).json({ error: "Erreur mise à jour crédits" });
      }
    }
  }

  return res.status(200).json({ received: true });
}
