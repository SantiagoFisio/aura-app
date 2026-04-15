import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const event = req.body;

  // 1. On vérifie que c'est bien un paiement réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details.email;
    
    // On récupère le montant ou le type de forfait pour savoir combien de crédits donner
    const amountPaid = session.amount_total; 

    console.log(`Paiement reçu de ${customerEmail} pour un montant de ${amountPaid}`);

    // 2. On met à jour la base de données Supabase
    // ATTENTION : 'profiles' et 'credits' sont des noms d'exemple, 
    // il faut les adapter aux noms exacts de tes tables Supabase
    const { data, error } = await supabase
      .from('users') // Change 'users' par le nom de ta table (ex: 'profiles')
      .update({ credits: 100 }) // Exemple : donne 100 crédits
      .match({ email: customerEmail });

    if (error) {
      console.error("Erreur Supabase:", error);
      return res.status(500).json({ error: "Erreur lors de l'ajout des crédits" });
    }
  }

  return res.status(200).json({ received: true });
}
