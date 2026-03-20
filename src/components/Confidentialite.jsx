import React from 'react';
import { Link } from 'react-router-dom';

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-500/30 font-light leading-relaxed">
      <nav className="w-full z-50 flex justify-between items-center px-8 py-6 border-b border-white/5">
        <Link to="/" className="text-2xl font-serif tracking-widest text-[#F5E5B8] hover:opacity-80 transition-opacity">AURA</Link>
        <Link to="/" className="text-sm uppercase tracking-widest opacity-70 hover:text-[#F5E5B8] transition-colors">Retour</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-20 space-y-8 opacity-80">
        <h1 className="text-4xl font-serif text-[#F5E5B8] mb-12">🔒 Politique de Confidentialité</h1>
        <p className="text-sm opacity-60">Dernière mise à jour : 04/03/2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">1. Identité du responsable de traitement</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Responsable du traitement :</strong> ClubVirtuelPremium</li>
            <li><strong>Adresse :</strong> Paris, France</li>
            <li><strong>Email DPO / Contact données :</strong> <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">2. Données collectées et finalités</h2>
          <p>Nous collectons uniquement les données nécessaires au fonctionnement de la Plateforme.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">3. Traitement IA et transparence algorithmique</h2>
          <p>Conformément à l'EU AI Act (Règlement 2024/1689) et aux recommandations CNIL 2024 :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Les personnages virtuels sont entièrement générés par intelligence artificielle. Vous n'interagissez pas avec un humain.</li>
            <li>Les dialogues sont produits par des modèles de langage automatisés.</li>
            <li>Vos messages peuvent être transmis à des prestataires IA tiers (ex : OpenAI, ElevenLabs...) pour la génération des réponses, dans le respect de leurs politiques de confidentialité respectives.</li>
            <li>Aucune décision automatisée ayant un impact juridique ou significatif sur vous n'est prise sur la base de vos données.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">4. Destinataires des données</h2>
          <p>Vos données peuvent être partagées avec les catégories de destinataires suivants :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Prestataires techniques :</strong> hébergeur IONOS SARL, prestataires de paiement (Stripe).</li>
            <li><strong>Fournisseurs d'IA :</strong> OpenAI, ElevenLabs, pour la génération des réponses des personnages. Ces prestataires agissent en qualité de sous-traitants.</li>
            <li><strong>Autorités :</strong> en cas d'obligation légale uniquement.</li>
          </ul>

          <h3 className="text-xl text-white font-medium mt-6">4.1 Transferts hors Union Européenne</h3>
          <p>Certains prestataires d'IA sont établis aux États-Unis. Ces transferts sont encadrés par des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne, conformément à l'article 46 du RGPD.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">5. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>✅ <strong>Droit d'accès (art. 15) :</strong> obtenir une copie de vos données</li>
            <li>✅ <strong>Droit de rectification (art. 16) :</strong> corriger des données inexactes</li>
            <li>✅ <strong>Droit à l'effacement (art. 17) :</strong> supprimer vos données ("droit à l'oubli")</li>
            <li>✅ <strong>Droit à la portabilité (art. 20) :</strong> recevoir vos données dans un format lisible</li>
            <li>✅ <strong>Droit d'opposition (art. 21) :</strong> vous opposer à certains traitements</li>
            <li>✅ <strong>Droit à la limitation (art. 18) :</strong> restreindre temporairement un traitement</li>
            <li>✅ <strong>Droit de retrait du consentement :</strong> à tout moment pour les traitements basés sur le consentement</li>
          </ul>
          <p>Pour exercer vos droits, contactez-nous : <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a>. Nous répondrons dans un délai d'un mois maximum.</p>
          <p>Vous disposez également du droit d'introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-[#F5E5B8] hover:underline">www.cnil.fr</a></p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">6. Cookies</h2>
          <p>La Plateforme utilise les cookies suivants :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cookies essentiels (sans consentement requis) : session utilisateur, sécurité</li>
            <li>Cookies analytics (avec consentement) : mesure d'audience anonymisée</li>
            <li>Cookies de préférences (avec consentement) : mémorisation de vos paramètres</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">7. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : chiffrement HTTPS, mots de passe hashés, accès restreints aux données, journalisation des accès. En cas de violation de données susceptible d'affecter vos droits, vous serez notifié conformément à l'article 34 du RGPD.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">8. Mineurs</h2>
          <p>La Plateforme est réservée aux personnes majeures (18 ans ou plus). Nous ne collectons pas sciemment de données personnelles concernant des mineurs. Si vous êtes le parent ou tuteur d'un mineur ayant créé un compte, veuillez nous contacter pour procéder à sa suppression.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">9. Modifications de la présente politique</h2>
          <p>Cette politique peut être mise à jour pour refléter des évolutions légales ou techniques. La date de dernière mise à jour est indiquée en haut de cette page. Toute modification substantielle vous sera notifiée par email ou par un message visible sur la Plateforme.</p>
        </section>

      </div>
    </div>
  );
}
