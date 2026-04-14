export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Ce message apparaîtra dans tes logs Vercel pour confirmer la réception
  console.log("Signal Stripe bien reçu sur l'API racine !");

  // On répond 200 OK à Stripe pour stopper les alertes de désactivation
  return res.status(200).json({ received: true });
}
