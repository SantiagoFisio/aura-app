import React from 'react';
import { Link } from 'react-router-dom';

export default function Conditions() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold-500/30 font-light leading-relaxed">
      <nav className="w-full z-50 flex justify-between items-center px-8 py-6 border-b border-white/5">
        <Link to="/" className="text-2xl font-serif tracking-widest text-[#F5E5B8] hover:opacity-80 transition-opacity">AURA</Link>
        <Link to="/" className="text-sm uppercase tracking-widest opacity-70 hover:text-[#F5E5B8] transition-colors">Retour</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-20 space-y-8 opacity-80">
        <h1 className="text-4xl font-serif text-[#F5E5B8] mb-12">📄 Conditions Générales d'Utilisation (CGU)</h1>
        <p className="text-sm opacity-60">Version en vigueur au : 04/03/2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 1 – Objet du service</h2>
          <p>La Plateforme est une plateforme numérique de compagnie virtuelle permettant aux utilisateurs de dialoguer et d'interagir avec des personnages entièrement virtuels générés par intelligence artificielle. Ces personnages ont été conçus à des fins de divertissement, de conversation et de bien-être numérique.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 2 – Accès et inscription</h2>
          <h3 className="text-xl text-white font-medium mt-6">2.1 Conditions d'accès</h3>
          <p>L'accès à la Plateforme est réservé aux personnes âgées d'au moins 18 ans (ou l'âge légal de majorité dans votre pays de résidence). En vous inscrivant, vous attestez répondre à cette condition.</p>
          
          <h3 className="text-xl text-white font-medium mt-6">2.2 Création de compte</h3>
          <p>L'utilisation de certaines fonctionnalités nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes et à maintenir la confidentialité de ses identifiants de connexion. Tout accès via votre compte relève de votre responsabilité.</p>
          
          <h3 className="text-xl text-white font-medium mt-6">2.3 Résiliation du compte</h3>
          <p>Vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil ou en contactant : <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a>. La Plateforme se réserve le droit de suspendre ou supprimer tout compte qui violerait les présentes CGU.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 3 – Offres et tarification</h2>
          <h3 className="text-xl text-white font-medium mt-6">3.1 Accès gratuit</h3>
          <p>Une version gratuite de la Plateforme est accessible avec des fonctionnalités limitées.</p>

          <h3 className="text-xl text-white font-medium mt-6">3.2 Abonnement premium</h3>
          <p>Des fonctionnalités avancées sont disponibles via un abonnement payant. Les tarifs, durées et modalités sont indiqués sur la page de tarification du site. Les paiements sont traités de manière sécurisée.</p>
          <p>Conformément à l'article L221-18 du Code de la consommation, vous bénéficiez d'un droit de rétractation de 14 jours à compter de la souscription.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 4 – Règles de conduite</h2>
          <p>En utilisant la Plateforme, l'utilisateur s'engage à :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ne pas tenter de faire croire à d'autres utilisateurs que les personnages IA sont des humains réels</li>
            <li>Ne pas utiliser la Plateforme à des fins illicites, malveillantes ou contraires aux bonnes mœurs</li>
            <li>Ne pas tenter de collecter des données d'autres utilisateurs</li>
            <li>Ne pas reproduire ou exploiter commercialement les personnages ou contenus de la Plateforme</li>
            <li>Ne pas chercher à contourner les systèmes de sécurité ou à manipuler les algorithmes d'IA</li>
            <li>Ne pas utiliser la Plateforme pour harceler, menacer ou nuire à autrui</li>
            <li>Respecter les droits de propriété intellectuelle de la Plateforme</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 5 – Intelligence artificielle et transparence</h2>
          <p>La Plateforme utilise des technologies d'IA pour générer les dialogues, les comportements et les personnalités des personnages virtuels. Ces systèmes sont entraînés sur des données et ne garantissent pas l'exactitude factuelle de toutes leurs réponses.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 6 – Limitation de responsabilité</h2>
          <p>Nous nous efforçons de maintenir la Plateforme accessible et fonctionnelle, mais ne pouvons garantir une disponibilité continue. En aucun cas, nous ne saurions être tenus responsables :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Du contenu généré par les personnages IA, qui ne constitue pas de conseils professionnels (médicaux, juridiques, financiers ou psychologiques)</li>
            <li>Des décisions prises par l'utilisateur sur la base d'interactions avec les personnages virtuels</li>
            <li>Des interruptions de service pour maintenance ou cas de force majeure</li>
            <li>Des dommages résultant d'une utilisation non conforme aux présentes CGU</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 7 – Propriété intellectuelle</h2>
          <p>L'ensemble des personnages, noms, visuels, voix, scénarios et contenus de la Plateforme sont notre propriété exclusive et sont protégés par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 8 – Données personnelles</h2>
          <p>La collecte et le traitement de vos données personnelles sont décrits dans notre Politique de Confidentialité disponible sur la Plateforme. Nous respectons le RGPD et la loi Informatique et Libertés.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 9 – Modification des CGU</h2>
          <p>Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle. La poursuite de l'utilisation de la Plateforme après notification vaut acceptation des nouvelles CGU.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 10 – Droit applicable et litiges</h2>
          <p>Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera d'abord recherchée. En cas d'échec, les tribunaux compétents du ressort de Paris seront saisis.</p>
          <p>Conformément à l'article L.612-1 du Code de la consommation, en cas de litige avec un consommateur, vous pouvez recourir gratuitement à un médiateur de la consommation.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-white mt-10">Article 11 – Contact</h2>
          <p>Pour toute question : <a href="mailto:info@clubvirtuelpremium.com" className="text-[#F5E5B8] hover:underline">info@clubvirtuelpremium.com</a></p>
        </section>

      </div>
    </div>
  );
}
