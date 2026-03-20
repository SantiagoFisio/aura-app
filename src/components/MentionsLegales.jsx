import React from 'react';
import { Link } from 'react-router-dom';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-500/30 font-light leading-relaxed">
      <nav className="w-full z-50 flex justify-between items-center px-8 py-6 border-b border-white/5">
        <Link to="/" className="text-2xl font-serif tracking-widest text-[#F5E5B8] hover:opacity-80 transition-opacity">AURA</Link>
        <Link to="/" className="text-sm uppercase tracking-widest opacity-70 hover:text-[#F5E5B8] transition-colors">Retour</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-20 space-y-8 opacity-80">
        <h1 className="text-4xl font-serif text-[#F5E5B8] mb-12">📋 Mentions Légales</h1>
        <p className="text-sm opacity-60">Dernière mise à jour : 04/03/2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">1. Éditeur du site</h2>
          <p>Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les informations relatives à l'éditeur du site sont les suivantes :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dénomination sociale :</strong> ClubVirtuelPremium</li>
            <li><strong>Forme juridique :</strong> SAS / SARL / Auto-entrepreneur</li>
            <li><strong>Siège social :</strong> Paris, France</li>
            <li><strong>Directeur de la publication :</strong> Jaque</li>
            <li><strong>Email de contact :</strong> <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a></li>
            <li><strong>Site web :</strong> <a href="https://clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">https://clubvirtuelpremium.com</a></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">2. Hébergeur</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nom de l'hébergeur :</strong> IONOS SARL</li>
            <li><strong>Hotline :</strong> 0970 808 911</li>
            <li><strong>Site web :</strong> <a href="https://www.ionos.fr" className="text-[#F5E5B8] hover:underline">https://www.ionos.fr</a></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">3. Nature du service et utilisation de l'intelligence artificielle</h2>
          <p>Le site propose une plateforme numérique permettant aux utilisateurs de rencontrer et discuter avec des personnages virtuels générés par intelligence artificielle, dans un cadre de compagnie numérique et de divertissement.</p>
          <p>Aucun personnage présent sur la plateforme ne représente une personne réelle. Toute ressemblance avec des personnes existantes serait purement fortuite.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">4. Propriété intellectuelle</h2>
          <p>L'ensemble des éléments constituant le site (textes, images, personnages, voix, illustrations, logos, icônes, structure, base de données) est la propriété exclusive ou fait l'objet de licences dûment accordées.</p>
          <p>Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle de ces éléments, quel que soit le support utilisé, est strictement interdite sans l'autorisation préalable et écrite, sous peine de poursuites judiciaires.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">5. Données personnelles</h2>
          <p>Le traitement des données personnelles collectées sur ce site est régi par notre Politique de Confidentialité, consultable à la rubrique dédiée du site. Conformément au Règlement Général sur la Protection des Données (RGPD – Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'opposition, de portabilité et d'effacement de vos données.</p>
          <p>Pour exercer ces droits : <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a></p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">6. Cookies</h2>
          <p>Ce site utilise des cookies nécessaires à son fonctionnement ainsi que des cookies analytiques (avec votre consentement). Vous pouvez gérer vos préférences depuis le bandeau cookies présent lors de votre première visite.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">7. Responsabilité</h2>
          <p>Les personnages virtuels présents sur la plateforme sont des intelligences artificielles à but de divertissement. Les conversations générées ne constituent pas de conseils médicaux, psychologiques, juridiques ou financiers. En cas de détresse émotionnelle, nous vous encourageons à contacter un professionnel de santé.</p>
          <p>Nous ne pouvons être tenus responsables des dommages directs ou indirects résultant de l'utilisation du site.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white">8. Droit applicable</h2>
          <p>Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera soumis à la compétence exclusive des tribunaux compétents.</p>
        </section>
      </div>

      <style jsx>{`
        .bg-gold-500 { background-color: #D4AF37; }
        .text-gold-400 { color: #F5E5B8; }
        .border-gold-400 { border-color: #D4AF37; }
      `}</style>
    </div>
  );
}
