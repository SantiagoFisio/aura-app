import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Configuration minimale du webhook Stripe
// Assurez-vous de définir STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET dans votre .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18", // Utilisez la version courante
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error(`Erreur de signature Webhook: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Traiter l'événement completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const metadata = session.metadata;

    console.log(`Paiement réussi pour: ${customerEmail}`);
    
    // ICI: Implémenter la logique d'activation en base de données Supabase / PostgreSQL
    // Exemple: await supabase.from('users').update({ plan: 'active', plan_type: metadata?.planId }).eq('email', customerEmail);
  }

  return new NextResponse('OK', { status: 200 });
}
