import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, DollarSign, Target, AlertCircle, CheckCircle } from 'lucide-react';

const TiakaBusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('presentation');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { id: 'presentation', title: 'I. PRÉSENTATION DU PROJET', icon: Target },
    { id: 'marche', title: 'II. ÉTUDE DE MARCHÉ', icon: Users },
    { id: 'strategie', title: 'III. STRATÉGIE COMMERCIALE', icon: TrendingUp },
    { id: 'operationnel', title: 'IV. PLAN OPÉRATIONNEL', icon: CheckCircle },
    { id: 'financier', title: 'V. PRÉVISIONS FINANCIÈRES', icon: DollarSign },
    { id: 'kpis', title: 'VI. INDICATEURS DE PERFORMANCE', icon: AlertCircle },
    { id: 'juridique', title: 'VII. STRUCTURE JURIDIQUE', icon: CheckCircle },
  ];

  const kpis = {
    commerciaux: [
      { nom: 'Chiffre d\'affaires mensuel', cible: '1 350 000 XPF', frequence: 'Mensuel', alerte: '< 1 000 000 XPF' },
      { nom: 'Nombre de clients/jour', cible: '50', frequence: 'Quotidien', alerte: '< 35' },
      { nom: 'Panier moyen', cible: '900 XPF', frequence: 'Hebdomadaire', alerte: '< 700 XPF' },
      { nom: 'Taux de fidélisation', cible: '40%', frequence: 'Mensuel', alerte: '< 25%' },
      { nom: 'Taux de conversion visiteurs/acheteurs', cible: '65%', frequence: 'Hebdomadaire', alerte: '< 50%' },
    ],
    operationnels: [
      { nom: 'Taux de rotation des stocks', cible: '24x/an', frequence: 'Mensuel', alerte: '< 18x/an' },
      { nom: 'Taux de rupture de stock', cible: '< 5%', frequence: 'Hebdomadaire', alerte: '> 10%' },
      { nom: 'Temps d\'attente moyen caisse', cible: '< 3 min', frequence: 'Quotidien', alerte: '> 5 min' },
      { nom: 'Taux de démarque (perte/casse)', cible: '< 2%', frequence: 'Mensuel', alerte: '> 4%' },
      { nom: 'Satisfaction client (note/10)', cible: '≥ 8/10', frequence: 'Mensuel', alerte: '< 6/10' },
    ],
    financiers: [
      { nom: 'Marge brute', cible: '50%', frequence: 'Mensuel', alerte: '< 45%' },
      { nom: 'Trésorerie nette', cible: '> 1 000 000 XPF', frequence: 'Hebdomadaire', alerte: '< 500 000 XPF' },
      { nom: 'Délai moyen de paiement clients', cible: '< 7 jours', frequence: 'Mensuel', alerte: '> 15 jours' },
      { nom: 'Ratio charges/CA', cible: '< 88%', frequence: 'Mensuel', alerte: '> 92%' },
      { nom: 'Seuil de rentabilité atteint', cible: 'Mois 1', frequence: 'Mensuel', alerte: 'Non atteint M3' },
    ],
    rh: [
      { nom: 'Productivité par heure travaillée', cible: '87 000 XPF', frequence: 'Mensuel', alerte: '< 65 000 XPF' },
      { nom: 'Taux d\'absentéisme', cible: '< 3%', frequence: 'Mensuel', alerte: '> 7%' },
      { nom: 'Satisfaction employés', cible: '≥ 7/10', frequence: 'Trimestriel', alerte: '< 5/10' },
    ],
    marketing: [
      { nom: 'Taux d\'engagement réseaux sociaux', cible: '> 5%', frequence: 'Hebdomadaire', alerte: '< 2%' },
      { nom: 'Nombre d\'abonnés Instagram', cible: '+100/mois', frequence: 'Mensuel', alerte: '< 50/mois' },
      { nom: 'Taux de retour carte fidélité', cible: '35%', frequence: 'Mensuel', alerte: '< 20%' },
      { nom: 'Coût d\'acquisition client (CAC)', cible: '< 500 XPF', frequence: 'Mensuel', alerte: '> 1000 XPF' },
    ],
  };

  const recommendations = [
    {
      categorie: 'Conformité CCISM',
      items: [
        'Document clair et concis (15 pages max hors annexes) ✓',
        'Présentation soignée avec mise en page professionnelle ✓',
        'Citations des sources d\'information ✓',
        'Dossier d\'annexes complet ✓',
        'Arguments clés mis en évidence ✓',
      ]
    },
    {
      categorie: 'Aspects juridiques',
      items: [
        'Forme juridique: SARL adaptée au projet ✓',
        'Capital social: 300 000 XPF (minimum légal) ✓',
        'Immatriculation RCS à prévoir ✓',
        'Assurances obligatoires identifiées ✓',
        'Bail commercial à négocier ✓',
      ]
    },
    {
      categorie: 'Aspects fiscaux',
      items: [
        'Régime IS (Impôt sur les Sociétés) ✓',
        'TVA en régime réel mensuel (CA > 150M) ✓',
        'Patente à payer avant le 01/08 ✓',
        'Déclarations fiscales dans les délais ✓',
      ]
    },
    {
      categorie: 'Protection sociale',
      items: [
        'Gérants: Régime des Non-Salariés (RNS) ✓',
        'Cotisations CPS: 9,84% minimum ✓',
        'Futur employé: Régime Général des Salariés ✓',
        'Déclaration annuelle de revenus avant 31/03 ✓',
      ]
    },
  ];

  const timeline = [
    { phase: 'Préparation', duree: '3-6 mois', taches: ['Finalisation business plan', 'Recherche local', 'Étude concurrence', 'Contacts fournisseurs', 'RDV banque'] },
    { phase: 'Formalités', duree: '1-2 mois', taches: ['Constitution SARL', 'Immatriculation RCS', 'Obtention N° TAHITI', 'Compte bancaire pro', 'Assurances', 'Signature bail'] },
    { phase: 'Aménagement', duree: '2-3 mois', taches: ['Travaux', 'Installation équipements', 'Pose enseigne', 'Décoration', 'Tests techniques'] },
    { phase: 'Lancement', duree: '1 mois', taches: ['Stock initial', 'Paramétrage caisse', 'Communication', 'Formation', 'Inauguration'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">TIAKA</h1>
              <p className="text-xl text-slate-600 italic">Le premier Konbini Franco-Tahitien</p>
              <p className="text-sm text-slate-500 mt-2">Business Plan conforme aux recommandations CCISM Polynésie française</p>
            </div>
            <div className="text-right">
              <div className="bg-red-50 px-4 py-2 rounded-lg">
                <p className="text-xs text-slate-500">Ouverture prévue</p>
                <p className="text-2xl font-bold text-red-600">Fin 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-4 rounded-xl transition-all ${
                  activeSection === section.id
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-medium text-center">{section.title.split('.')[1]}</p>
              </button>
            );
          })}
        </div>
        {/* Contenu principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeSection === 'presentation' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                I. PRÉSENTATION DU PROJET
              </h2>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Signification du nom TIAKA</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-red-600">TIA</p>
                    <p className="text-sm text-slate-600">Dérivé de "Tiare", fleur emblématique de Tahiti</p>
                    <p className="text-xs text-slate-500 mt-1">Symbole de pureté, beauté et accueil</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-red-600">KA</p>
                    <p className="text-sm text-slate-600">Inspiré de "Kairos", mot grec ancien</p>
                    <p className="text-xs text-slate-500 mt-1">Le moment parfait, l'instant opportun</p>
                  </div>
                </div>
                <p className="text-center mt-4 text-lg font-semibold text-slate-700">
                  = "La fleur du moment parfait"
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Contexte et genèse</h3>
                <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-slate-700">
                  <p>✓ Premier konbini franco-tahitien à Papeete</p>
                  <p>✓ Concept inspiré des convenience stores japonais</p>
                  <p>✓ Réponse à un besoin identifié : absence de commerce de proximité moderne</p>
                  <p>✓ Combinaison praticité japonaise + authenticité polynésienne</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Le concept TIAKA</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-2">Commerce nouvelle génération</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• 100 m² optimisés</li>
                      <li>• 7j/7 de 6h30 à 22h</li>
                      <li>• Design épuré moderne</li>
                      <li>• Façade vitrée lumineuse</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-2">Offre hybride unique</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Produits quotidiens</li>
                      <li>• Snacks & boissons</li>
                      <li>• Produits japonais authentiques</li>
                      <li>• Produits locaux polynésiens</li>
                      <li>• Plats préparés</li>
                      <li>• Services pratiques</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="font-bold text-orange-800 mb-2">Espace de vie</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Coin consommation sur place</li>
                      <li>• Tables et chaises</li>
                      <li>• Vue sur l'extérieur</li>
                      <li>• Ambiance conviviale</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Objectifs stratégiques</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                    <p className="font-bold text-green-800">Court terme (Année 1)</p>
                    <ul className="text-sm text-slate-700 mt-2 space-y-1">
                      <li>• 50 clients/jour en moyenne</li>
                      <li>• CA de 16,2 millions XPF</li>
                      <li>• Notoriété locale solide</li>
                      <li>• Clientèle fidèle</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
                    <p className="font-bold text-blue-800">Moyen terme (Années 2-3)</p>
                    <ul className="text-sm text-slate-700 mt-2 space-y-1">
                      <li>• 60-65 clients/jour</li>
                      <li>• Diversification de l'offre</li>
                      <li>• Équipe stable recrutée</li>
                      <li>• Rentabilité optimale</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
                    <p className="font-bold text-purple-800">Long terme (Années 4-5)</p>
                    <ul className="text-sm text-slate-700 mt-2 space-y-1">
                      <li>• Position de leader konbini</li>
                      <li>• Second point de vente</li>
                      <li>• Service Click & Collect</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Valeurs fondamentales</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['Proximité', 'Qualité', 'Authenticité', 'Modernité', 'Accessibilité'].map((value) => (
                    <div key={value} className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-4 rounded-lg text-center">
                      <p className="font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'marche' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                II. ÉTUDE DE MARCHÉ
              </h2>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Le marché de Papeete</h3>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-bold text-blue-800 mb-2">Démographie</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• 26 000 habitants</li>
                        <li>• + milliers de travailleurs quotidiens</li>
                        <li>• Population jeune et active</li>
                        <li>• Forte proportion d'étudiants</li>
                        <li>• Secteur tertiaire développé</li>
                        <li>• Flux touristiques réguliers</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-blue-800 mb-2">Habitudes de consommation</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Recherche de praticité et rapidité</li>
                        <li>• Appétence produits étrangers (japonais)</li>
                        <li>• Attachement aux produits locaux</li>
                        <li>• Sensibilité horaires étendus</li>
                        <li>• Vie urbaine active</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Analyse de la concurrence</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-left">Forces</th>
                        <th className="p-3 text-left">Faiblesses</th>
                        <th className="p-3 text-left">Impact TIAKA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="bg-white">
                        <td className="p-3 font-medium">Supérettes</td>
                        <td className="p-3">Large assortiment, marques connues</td>
                        <td className="p-3">Horaires limités, ambiance froide</td>
                        <td className="p-3 text-green-600 font-medium">Faible - clientèle différente</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3 font-medium">Épiceries quartier</td>
                        <td className="p-3">Proximité, relation client</td>
                        <td className="p-3">Offre limitée, pas de modernité</td>
                        <td className="p-3 text-green-600 font-medium">Faible - positionnement différent</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3 font-medium">Stations-service</td>
                        <td className="p-3">Ouverture tardive, accessibilité voiture</td>
                        <td className="p-3">Prix élevés, offre basique</td>
                        <td className="p-3 text-orange-600 font-medium">Moyen - concurrence horaires</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Avantages compétitifs TIAKA</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    'Ouverture continue 6h30-22h, 7j/7',
                    'Concept unique fusion culturelle',
                    'Espace consommation sur place',
                    'Design moderne accueillant',
                    'Mix produits introuvable',
                    'Services pratiques intégrés'
                  ].map((advantage, idx) => (
                    <div key={idx} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm text-slate-700">✓ {advantage}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Clientèle cible</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { segment: 'Étudiants/jeunes actifs 25-35 ans', part: '40%', frequence: 'Quotidienne', panier: '800-1200 XPF', besoins: 'Snacks rapides, boissons, produits japonais' },
                    { segment: 'Travailleurs en pause 30-50 ans', part: '30%', frequence: 'Hebdomadaire', panier: '1000-1500 XPF', besoins: 'Repas midi, café, dépannage' },
                    { segment: 'Familles locales', part: '20%', frequence: '2-3x/semaine', panier: '1200-1800 XPF', besoins: 'Courses appoint, produits frais' },
                    { segment: 'Touristes', part: '10%', frequence: 'Ponctuelle', panier: '1500-2500 XPF', besoins: 'Découverte produits, souvenirs' },
                  ].map((client, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <p className="font-bold text-slate-800">{client.segment}</p>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">{client.part}</span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p><span className="font-medium">Fréquence:</span> {client.frequence}</p>
                        <p><span className="font-medium">Panier moyen:</span> {client.panier}</p>
                        <p><span className="font-medium">Besoins:</span> {client.besoins}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Tendances et opportunités</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">Tendances sociétales</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>📈 Accélération rythme de vie urbain</li>
                      <li>📈 Digitalisation des achats</li>
                      <li>📈 Recherche d'expériences authentiques</li>
                      <li>📈 Engouement culture japonaise</li>
                      <li>📈 Valorisation circuits courts</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Opportunités de marché</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✓ Marché vierge - aucun konbini existant</li>
                      <li>✓ Papeete en développement constant</li>
                      <li>✓ Tourisme en reprise post-COVID</li>
                      <li>✓ Jeunesse connectée consommatrice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === 'strategie' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                III. STRATÉGIE COMMERCIALE & MARKETING
              </h2>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Positionnement</h3>
                <p className="text-lg font-semibold text-red-700 mb-4">
                  "TIAKA se positionne comme LE konbini franco-tahitien"
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-2">Axes de positionnement</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <span className="font-medium">Praticité:</span> Horaires étendus, central, service rapide</li>
                      <li>• <span className="font-medium">Authenticité:</span> Double culture Tahiti + Japon</li>
                      <li>• <span className="font-medium">Modernité:</span> Design, outils digitaux</li>
                      <li>• <span className="font-medium">Accessibilité:</span> Prix justes, ambiance accueillante</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-2">Promesse client</p>
                    <p className="text-sm italic text-slate-700 bg-slate-50 p-3 rounded">
                      "Chez TIAKA, trouvez tout ce dont vous avez besoin, au bon moment, dans une ambiance chaleureuse qui mêle modernité japonaise et authenticité tahitienne."
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Politique de prix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Catégorie produit</th>
                        <th className="p-3 text-left">Positionnement prix</th>
                        <th className="p-3 text-left">Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="bg-white">
                        <td className="p-3">Produits de base</td>
                        <td className="p-3 font-medium text-green-600">Prix compétitifs</td>
                        <td className="p-3">Produits d'appel, fidélisation</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Produits japonais</td>
                        <td className="p-3 font-medium text-orange-600">Prix moyen-haut</td>
                        <td className="p-3">Exclusivité, importation</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Produits locaux</td>
                        <td className="p-3 font-medium text-blue-600">Prix raisonnables</td>
                        <td className="p-3">Soutien producteurs, qualité</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Plats préparés</td>
                        <td className="p-3 font-medium text-purple-600">500-1000 XPF</td>
                        <td className="p-3">Praticité, fait maison</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Services</td>
                        <td className="p-3 font-medium text-slate-600">Tarifs fixes modestes</td>
                        <td className="p-3">Fidélisation, service</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mt-3">
                  <p className="text-center text-lg font-bold text-blue-800">
                    Panier moyen cible : 900 XPF
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Communication et promotion</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                    <p className="font-bold text-yellow-800 mb-2">Phase 1 : Pré-ouverture (3 mois avant)</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Création comptes Instagram/Facebook avec teasing</li>
                      <li>• Distribution flyers quartiers cibles</li>
                      <li>• Partenariats influenceurs locaux</li>
                      <li>• Pose enseigne et décoration façade</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                    <p className="font-bold text-green-800 mb-2">Phase 2 : Lancement</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Inauguration avec dégustations gratuites</li>
                      <li>• Promotion ouverture : -20% sur sélection produits</li>
                      <li>• Jeu concours réseaux sociaux</li>
                      <li>• Relations presse (journaux locaux, radio)</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <p className="font-bold text-blue-800 mb-2">Phase 3 : Fidélisation (ongoing)</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Carte de fidélité (10 achats = 1 produit offert)</li>
                      <li>• Happy Hours (17h-19h, promos ciblées)</li>
                      <li>• Animations thématiques (semaine japonaise, fête du Tiare)</li>
                      <li>• Newsletter mensuelle</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Canaux de communication</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-3xl mb-2">📱</p>
                    <p className="font-bold text-purple-800">Réseaux sociaux</p>
                    <p className="text-xs text-slate-600 mt-1">Instagram prioritaire - cible jeune</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-3xl mb-2">📄</p>
                    <p className="font-bold text-blue-800">Flyers et affiches</p>
                    <p className="text-xs text-slate-600 mt-1">Lycées, université, bureaux</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-3xl mb-2">🏪</p>
                    <p className="font-bold text-green-800">Signalétique</p>
                    <p className="text-xs text-slate-600 mt-1">Enseigne lumineuse, vitrophanie</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-3xl mb-2">👥</p>
                    <p className="font-bold text-orange-800">Bouche-à-oreille</p>
                    <p className="text-xs text-slate-600 mt-1">Programme parrainage</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Identité visuelle</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-slate-200 p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-3">Logo TIAKA</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Symbole central : fleur de tiare stylisée</li>
                      <li>• Typographie moderne épurée</li>
                      <li>• Couleurs : blanc, bois naturel, touche rouge (Japon)</li>
                    </ul>
                  </div>
                  <div className="bg-white border-2 border-slate-200 p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-3">Charte graphique</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Ambiance zen et chaleureuse</li>
                      <li>• Photos produits de qualité</li>
                      <li>• Storytelling culturel (origine produits, recettes)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'operationnel' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                IV. PLAN OPÉRATIONNEL
              </h2>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Organisation et ressources humaines</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">Année 1 : Gestion en binôme</p>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Gérant 1</p>
                        <p className="text-sm text-slate-600">Approvisionnement, logistique, comptabilité</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Gérant 2</p>
                        <p className="text-sm text-slate-600">Vente, accueil client, communication</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Planning horaire</p>
                      <ul className="text-xs text-slate-600 mt-1 space-y-1">
                        <li>• Ouverture : 6h30-22h (15h30/jour)</li>
                        <li>• Rotation : 2 shifts de 8h avec chevauchement midi</li>
                        <li>• 1 jour fermeture/semaine par personne (roulement)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Année 2 : Recrutement employé</p>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Profil recherché</p>
                        <p className="text-sm text-slate-600">Accueil client, caisse, mise en rayon</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Contrat</p>
                        <p className="text-sm text-slate-600">CDI temps partiel évolutif</p>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Formation</p>
                        <p className="text-sm text-slate-600">Formation interne : 2 semaines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Aménagement du local (100 m²)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-bold text-orange-800 mb-2">Zone 1 : Alimentation & Snacking (40 m²)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Rayonnages muraux produits secs</li>
                        <li>• Réfrigérateurs boissons verticaux (3 unités)</li>
                        <li>• Congélateurs produits surgelés (2 unités)</li>
                        <li>• Présentoir fruits frais</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-800 mb-2">Zone 2 : Produits Japonais & Locaux (25 m²)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Étagères centrales (circulation facile)</li>
                        <li>• Mise en scène produits (ambiance japonaise)</li>
                        <li>• Corner produits polynésiens valorisés</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-2">Zone 3 : Services & Consommation (25 m²)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Comptoir caisse moderne</li>
                        <li>• Tables hautes et chaises contre baies vitrées (8 places)</li>
                        <li>• Micro-ondes en libre-service</li>
                        <li>• Borne recharge/impression</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <p className="font-bold text-slate-800 mb-2">Zone 4 : Arrière-boutique (10 m²)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Stockage réserve</li>
                        <li>• Bureau gestion</li>
                        <li>• Vestiaires employés</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-slate-800 mb-2">Ambiance générale</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-700">
                    <div>✓ Éclairage LED chaleureux</div>
                    <div>✓ Parquet bois clair</div>
                    <div>✓ Murs blancs épurés</div>
                    <div>✓ Touches décoratives japonaises et tahitiennes</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Fournisseurs et approvisionnement</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-2">Produits locaux (40%)</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Fruits/légumes : Marché Papeete</li>
                      <li>• Boissons : Brasseries/jus locaux</li>
                      <li>• Artisanat : Coopératives</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-bold text-red-800 mb-2">Produits japonais (30%)</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Importateur spécialisé PF</li>
                      <li>• Commande directe Japon</li>
                      <li>• Fréquence : trimestrielle</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-2">Produits courants (30%)</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Grossistes alimentaires Tahiti</li>
                      <li>• Centrale d'achat locale</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-slate-100 p-4 rounded-lg mt-4">
                  <p className="font-bold text-slate-800 mb-2">Stratégie d'approvisionnement</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                    <div>• Stock tampon : 2 semaines de vente</div>
                    <div>• Rotation rapide produits frais</div>
                    <div>• Gestion informatisée (logiciel caisse avec suivi stock)</div>
                    <div>• Réapprovisionnement hebdomadaire</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Outils et équipements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-white border-2 border-blue-200 p-3 rounded-lg">
                      <p className="font-medium text-blue-800 mb-2">Matériel de vente</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Caisse enregistreuse tactile</li>
                        <li>• Terminal paiement CB</li>
                        <li>• Balance électronique</li>
                        <li>• Scanner code-barres</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border-2 border-green-200 p-3 rounded-lg">
                      <p className="font-medium text-green-800 mb-2">Équipements conservation</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• 3 réfrigérateurs vitrines (300L)</li>
                        <li>• 2 congélateurs coffres (200L)</li>
                        <li>• 1 réfrigérateur produits frais</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white border-2 border-orange-200 p-3 rounded-lg">
                      <p className="font-medium text-orange-800 mb-2">Mobilier</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Rayonnages modulables (20m linéaires)</li>
                        <li>• Étagères centrales</li>
                        <li>• 4 tables hautes + 8 tabourets</li>
                        <li>• Comptoir caisse</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border-2 border-purple-200 p-3 rounded-lg">
                      <p className="font-medium text-purple-800 mb-2">Informatique/Digital</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Logiciel caisse avec gestion stock</li>
                        <li>• Ordinateur de gestion</li>
                        <li>• Internet professionnel</li>
                        <li>• Caméras surveillance (2)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeSection === 'financier' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                V. PRÉVISIONS FINANCIÈRES 5 ANS
              </h2>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Hypothèses de projection</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Année</th>
                        <th className="p-3 text-right">Clients/jour</th>
                        <th className="p-3 text-right">Panier moyen</th>
                        <th className="p-3 text-right">Jours ouverture</th>
                        <th className="p-3 text-right">CA annuel</th>
                        <th className="p-3 text-right">Croissance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { an: 1, clients: 50, panier: 900, jours: 360, ca: '16 200 000', croissance: '-' },
                        { an: 2, clients: 55, panier: 950, jours: 360, ca: '18 810 000', croissance: '+16%' },
                        { an: 3, clients: 60, panier: 1000, jours: 360, ca: '21 600 000', croissance: '+15%' },
                        { an: 4, clients: 65, panier: 1050, jours: 360, ca: '24 570 000', croissance: '+14%' },
                        { an: 5, clients: 70, panier: 1100, jours: 360, ca: '27 720 000', croissance: '+13%' },
                      ].map((row) => (
                        <tr key={row.an} className={row.an % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="p-3 font-bold">An {row.an}</td>
                          <td className="p-3 text-right">{row.clients}</td>
                          <td className="p-3 text-right">{row.panier} XPF</td>
                          <td className="p-3 text-right">{row.jours}</td>
                          <td className="p-3 text-right font-bold text-green-600">{row.ca} XPF</td>
                          <td className="p-3 text-right font-medium text-blue-600">{row.croissance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-blue-800 mb-2">Hypothèses de croissance</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Notoriété progressive via bouche-à-oreille</li>
                    <li>• Fidélisation clientèle existante</li>
                    <li>• Diversification offre produits</li>
                    <li>• Augmentation panier moyen (produits premium)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Compte de résultat prévisionnel</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Poste</th>
                        <th className="p-3 text-right">An 1</th>
                        <th className="p-3 text-right">An 2</th>
                        <th className="p-3 text-right">An 3</th>
                        <th className="p-3 text-right">An 4</th>
                        <th className="p-3 text-right">An 5</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="bg-green-50 font-bold">
                        <td className="p-3">CHIFFRE D'AFFAIRES</td>
                        <td className="p-3 text-right">16 200 000</td>
                        <td className="p-3 text-right">18 810 000</td>
                        <td className="p-3 text-right">21 600 000</td>
                        <td className="p-3 text-right">24 570 000</td>
                        <td className="p-3 text-right">27 720 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Approvisionnement (50%)</td>
                        <td className="p-3 text-right text-red-600">8 100 000</td>
                        <td className="p-3 text-right text-red-600">9 405 000</td>
                        <td className="p-3 text-right text-red-600">10 800 000</td>
                        <td className="p-3 text-right text-red-600">12 285 000</td>
                        <td className="p-3 text-right text-red-600">13 860 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Loyer</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Salaires gérants</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Salaire employé</td>
                        <td className="p-3 text-right text-red-600">0</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Électricité/eau</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Marketing/enseigne</td>
                        <td className="p-3 text-right text-red-600">200 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Divers/imprévus</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                      </tr>
                      <tr className="bg-red-50 font-bold">
                        <td className="p-3">TOTAL CHARGES</td>
                        <td className="p-3 text-right">14 300 000</td>
                        <td className="p-3 text-right">17 305 000</td>
                        <td className="p-3 text-right">18 700 000</td>
                        <td className="p-3 text-right">20 185 000</td>
                        <td className="p-3 text-right">21 760 000</td>
                      </tr>
                      <tr className="bg-green-100 font-bold text-lg">
                        <td className="p-3">RÉSULTAT NET</td>
                        <td className="p-3 text-right text-green-700">1 900 000</td>
                        <td className="p-3 text-right text-green-700">1 505 000</td>
                        <td className="p-3 text-right text-green-700">2 900 000</td>
                        <td className="p-3 text-right text-green-700">4 385 000</td>
                        <td className="p-3 text-right text-green-700">5 960 000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-slate-600">Analyse</p>
                    <p className="text-xs text-green-700 mt-1">✅ Rentabilité dès l'année 1</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm font-medium text-slate-600">Année 2</p>
                    <p className="text-xs text-orange-700 mt-1">⚠️ Baisse résultat due recrutement (investissement humain)</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-slate-600">Années 3-5</p>
                    <p className="text-xs text-blue-700 mt-1">✅ Croissance forte et régulière</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Plan de financement initial</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-bold text-red-800 mb-3">Besoins de démarrage</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">Travaux et aménagement</td>
                          <td className="py-2 text-right font-medium">1 500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Équipements</td>
                          <td className="py-2 text-right font-medium">1 500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Stock initial</td>
                          <td className="py-2 text-right font-medium">1 200 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Enseigne et communication</td>
                          <td className="py-2 text-right font-medium">500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Trésorerie de sécurité (3 mois)</td>
                          <td className="py-2 text-right font-medium">1 000 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Frais administratifs</td>
                          <td className="py-2 text-right font-medium">300 000 XPF</td>
                        </tr>
                        <tr className="bg-red-100 font-bold">
                          <td className="py-2">TOTAL BESOINS</td>
                          <td className="py-2 text-right">6 000 000 XPF</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Ressources de financement</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">Apport personnel</td>
                          <td className="py-2 text-right font-medium">300 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">5%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Emprunt bancaire</td>
                          <td className="py-2 text-right font-medium">5 200 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">87%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Aides/subventions</td>
                          <td className="py-2 text-right font-medium">500 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">8%</td>
                        </tr>
                        <tr className="bg-green-100 font-bold">
                          <td className="py-2">TOTAL RESSOURCES</td>
                          <td className="py-2 text-right">6 000 000 XPF</td>
                          <td className="py-2 text-right">100%</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="mt-4 bg-white p-3 rounded">
                      <p className="text-sm font-bold text-slate-800">Remboursement emprunt</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        <li>• Durée : 5 ans</li>
                        <li>• Taux estimé : 4,5%</li>
                        <li>• Mensualité : ~95 000 XPF</li>
                        <li>• Différé partiel : 6 mois (intérêts uniquement)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Seuil de rentabilité</h3>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-bold text-slate-800 mb-3">Calcul du point mort</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        <li>• Charges fixes annuelles : <span className="font-bold">6 200 000 XPF</span></li>
                        <li>• Marge sur coût variable : <span className="font-bold">50%</span></li>
                        <li>• Seuil de rentabilité : <span className="font-bold text-orange-600">12 400 000 XPF/an</span></li>
                        <li>• Soit environ : <span className="font-bold text-orange-600">34 clients/jour à 900 XPF</span></li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-2">✅ Objectif largement au-dessus du seuil</p>
                      <p className="text-sm text-slate-700">Objectif de 50 clients/jour représente 147% du seuil de rentabilité, offrant une marge de sécurité confortable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'kpis' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VI. INDICATEURS DE PERFORMANCE (KPIs)
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <p className="text-sm text-slate-700 mb-2">
                  Les KPIs permettent de piloter l'activité au quotidien et d'anticiper les difficultés. 
                  Ils doivent être suivis régulièrement et des actions correctives doivent être mises en place dès qu'un seuil d'alerte est franchi.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">📊 KPIs Commerciaux</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.commerciaux.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">⚙️ KPIs Opérationnels</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-orange-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.operationnels.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">💰 KPIs Financiers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.financiers.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">👥 KPIs Ressources Humaines</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-purple-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.rh.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">📱 KPIs Marketing & Communication</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-pink-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.marketing.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-bold text-yellow-800 mb-2">📋 Outils de suivi recommandés</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <span className="font-medium">Tableau de bord Excel/Google Sheets</span> : mise à jour hebdomadaire des KPIs principaux</li>
                  <li>• <span className="font-medium">Logiciel de caisse</span> : extraction automatique données ventes quotidiennes</li>
                  <li>• <span className="font-medium">Réunion hebdomadaire</span> : analyse des indicateurs avec actions correctives si nécessaire</li>
                  <li>• <span className="font-medium">Reporting mensuel</span> : synthèse complète à conserver pour suivi annuel</li>
                </ul>
              </div>
            </div>
          )}
          {activeSection === 'financier' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                V. PRÉVISIONS FINANCIÈRES 5 ANS
              </h2>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Hypothèses de projection</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Année</th>
                        <th className="p-3 text-right">Clients/jour</th>
                        <th className="p-3 text-right">Panier moyen</th>
                        <th className="p-3 text-right">Jours ouverture</th>
                        <th className="p-3 text-right">CA annuel</th>
                        <th className="p-3 text-right">Croissance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        { an: 1, clients: 50, panier: 900, jours: 360, ca: '16 200 000', croissance: '-' },
                        { an: 2, clients: 55, panier: 950, jours: 360, ca: '18 810 000', croissance: '+16%' },
                        { an: 3, clients: 60, panier: 1000, jours: 360, ca: '21 600 000', croissance: '+15%' },
                        { an: 4, clients: 65, panier: 1050, jours: 360, ca: '24 570 000', croissance: '+14%' },
                        { an: 5, clients: 70, panier: 1100, jours: 360, ca: '27 720 000', croissance: '+13%' },
                      ].map((row) => (
                        <tr key={row.an} className={row.an % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="p-3 font-bold">An {row.an}</td>
                          <td className="p-3 text-right">{row.clients}</td>
                          <td className="p-3 text-right">{row.panier} XPF</td>
                          <td className="p-3 text-right">{row.jours}</td>
                          <td className="p-3 text-right font-bold text-green-600">{row.ca} XPF</td>
                          <td className="p-3 text-right font-medium text-blue-600">{row.croissance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-blue-800 mb-2">Hypothèses de croissance</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Notoriété progressive via bouche-à-oreille</li>
                    <li>• Fidélisation clientèle existante</li>
                    <li>• Diversification offre produits</li>
                    <li>• Augmentation panier moyen (produits premium)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Compte de résultat prévisionnel</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Poste</th>
                        <th className="p-3 text-right">An 1</th>
                        <th className="p-3 text-right">An 2</th>
                        <th className="p-3 text-right">An 3</th>
                        <th className="p-3 text-right">An 4</th>
                        <th className="p-3 text-right">An 5</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="bg-green-50 font-bold">
                        <td className="p-3">CHIFFRE D'AFFAIRES</td>
                        <td className="p-3 text-right">16 200 000</td>
                        <td className="p-3 text-right">18 810 000</td>
                        <td className="p-3 text-right">21 600 000</td>
                        <td className="p-3 text-right">24 570 000</td>
                        <td className="p-3 text-right">27 720 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Approvisionnement (50%)</td>
                        <td className="p-3 text-right text-red-600">8 100 000</td>
                        <td className="p-3 text-right text-red-600">9 405 000</td>
                        <td className="p-3 text-right text-red-600">10 800 000</td>
                        <td className="p-3 text-right text-red-600">12 285 000</td>
                        <td className="p-3 text-right text-red-600">13 860 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Loyer</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Salaires gérants</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                        <td className="p-3 text-right text-red-600">2 400 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Salaire employé</td>
                        <td className="p-3 text-right text-red-600">0</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                        <td className="p-3 text-right text-red-600">1 800 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Électricité/eau</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-3">Marketing/enseigne</td>
                        <td className="p-3 text-right text-red-600">200 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                        <td className="p-3 text-right text-red-600">100 000</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-3">Divers/imprévus</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                        <td className="p-3 text-right text-red-600">600 000</td>
                      </tr>
                      <tr className="bg-red-50 font-bold">
                        <td className="p-3">TOTAL CHARGES</td>
                        <td className="p-3 text-right">14 300 000</td>
                        <td className="p-3 text-right">17 305 000</td>
                        <td className="p-3 text-right">18 700 000</td>
                        <td className="p-3 text-right">20 185 000</td>
                        <td className="p-3 text-right">21 760 000</td>
                      </tr>
                      <tr className="bg-green-100 font-bold text-lg">
                        <td className="p-3">RÉSULTAT NET</td>
                        <td className="p-3 text-right text-green-700">1 900 000</td>
                        <td className="p-3 text-right text-green-700">1 505 000</td>
                        <td className="p-3 text-right text-green-700">2 900 000</td>
                        <td className="p-3 text-right text-green-700">4 385 000</td>
                        <td className="p-3 text-right text-green-700">5 960 000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-medium text-slate-600">Analyse</p>
                    <p className="text-xs text-green-700 mt-1">✅ Rentabilité dès l'année 1</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-sm font-medium text-slate-600">Année 2</p>
                    <p className="text-xs text-orange-700 mt-1">⚠️ Baisse résultat due recrutement (investissement humain)</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-slate-600">Années 3-5</p>
                    <p className="text-xs text-blue-700 mt-1">✅ Croissance forte et régulière</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Plan de financement initial</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-bold text-red-800 mb-3">Besoins de démarrage</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">Travaux et aménagement</td>
                          <td className="py-2 text-right font-medium">1 500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Équipements</td>
                          <td className="py-2 text-right font-medium">1 500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Stock initial</td>
                          <td className="py-2 text-right font-medium">1 200 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Enseigne et communication</td>
                          <td className="py-2 text-right font-medium">500 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Trésorerie de sécurité (3 mois)</td>
                          <td className="py-2 text-right font-medium">1 000 000 XPF</td>
                        </tr>
                        <tr>
                          <td className="py-2">Frais administratifs</td>
                          <td className="py-2 text-right font-medium">300 000 XPF</td>
                        </tr>
                        <tr className="bg-red-100 font-bold">
                          <td className="py-2">TOTAL BESOINS</td>
                          <td className="py-2 text-right">6 000 000 XPF</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Ressources de financement</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2">Apport personnel</td>
                          <td className="py-2 text-right font-medium">300 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">5%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Emprunt bancaire</td>
                          <td className="py-2 text-right font-medium">5 200 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">87%</td>
                        </tr>
                        <tr>
                          <td className="py-2">Aides/subventions</td>
                          <td className="py-2 text-right font-medium">500 000 XPF</td>
                          <td className="py-2 text-right text-slate-600">8%</td>
                        </tr>
                        <tr className="bg-green-100 font-bold">
                          <td className="py-2">TOTAL RESSOURCES</td>
                          <td className="py-2 text-right">6 000 000 XPF</td>
                          <td className="py-2 text-right">100%</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="mt-4 bg-white p-3 rounded">
                      <p className="text-sm font-bold text-slate-800">Remboursement emprunt</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        <li>• Durée : 5 ans</li>
                        <li>• Taux estimé : 4,5%</li>
                        <li>• Mensualité : ~95 000 XPF</li>
                        <li>• Différé partiel : 6 mois (intérêts uniquement)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Seuil de rentabilité</h3>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-bold text-slate-800 mb-3">Calcul du point mort</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        <li>• Charges fixes annuelles : <span className="font-bold">6 200 000 XPF</span></li>
                        <li>• Marge sur coût variable : <span className="font-bold">50%</span></li>
                        <li>• Seuil de rentabilité : <span className="font-bold text-orange-600">12 400 000 XPF/an</span></li>
                        <li>• Soit environ : <span className="font-bold text-orange-600">34 clients/jour à 900 XPF</span></li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-2">✅ Objectif largement au-dessus du seuil</p>
                      <p className="text-sm text-slate-700">Objectif de 50 clients/jour représente 147% du seuil de rentabilité, offrant une marge de sécurité confortable.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'kpis' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VI. INDICATEURS DE PERFORMANCE (KPIs)
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <p className="text-sm text-slate-700 mb-2">
                  Les KPIs permettent de piloter l'activité au quotidien et d'anticiper les difficultés. 
                  Ils doivent être suivis régulièrement et des actions correctives doivent être mises en place dès qu'un seuil d'alerte est franchi.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">📊 KPIs Commerciaux</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.commerciaux.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">⚙️ KPIs Opérationnels</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-orange-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.operationnels.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">💰 KPIs Financiers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.financiers.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">👥 KPIs Ressources Humaines</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-purple-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.rh.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">📱 KPIs Marketing & Communication</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-pink-600 text-white">
                      <tr>
                        <th className="p-3 text-left">Indicateur</th>
                        <th className="p-3 text-center">Cible</th>
                        <th className="p-3 text-center">Fréquence suivi</th>
                        <th className="p-3 text-center">Seuil d'alerte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {kpis.marketing.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                          <td className="p-3 font-medium">{kpi.nom}</td>
                          <td className="p-3 text-center text-green-600 font-bold">{kpi.cible}</td>
                          <td className="p-3 text-center text-slate-600">{kpi.frequence}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{kpi.alerte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-bold text-yellow-800 mb-2">📋 Outils de suivi recommandés</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <span className="font-medium">Tableau de bord Excel/Google Sheets</span> : mise à jour hebdomadaire des KPIs principaux</li>
                  <li>• <span className="font-medium">Logiciel de caisse</span> : extraction automatique données ventes quotidiennes</li>
                  <li>• <span className="font-medium">Réunion hebdomadaire</span> : analyse des indicateurs avec actions correctives si nécessaire</li>
                  <li>• <span className="font-medium">Reporting mensuel</span> : synthèse complète à conserver pour suivi annuel</li>
                </ul>
              </div>
            </div>
          )}
          {activeSection === 'juridique' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VII. STRUCTURE JURIDIQUE & CONFORMITÉ
              </h2>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Forme juridique : SARL</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">✅ Avantages</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✓ Responsabilité limitée aux apports</li>
                      <li>✓ Structure adaptée aux couples</li>
                      <li>✓ Crédibilité vis-à-vis des banques</li>
                      <li>✓ Possibilité d'évolution (entrée associés futurs)</li>
                      <li>✓ Séparation patrimoine personnel/professionnel</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">Caractéristiques</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Capital social : <span className="font-bold">300 000 XPF</span> (minimum légal)</li>
                      <li>• 2 associés gérants égalitaires (50/50)</li>
                      <li>• Siège social : adresse du local à Papeete</li>
                      <li>• Durée : 99 ans</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Régime fiscal : IS (Impôt sur les Sociétés)</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-slate-800 mb-2">Avantages</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Séparation patrimoine personnel/professionnel</li>
                        <li>• Optimisation fiscale possible</li>
                        <li>• Déductibilité des charges</li>
                        <li>• Rémunération gérants déductible</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 mb-2">Taux</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• IS : <span className="font-bold text-red-600">27%</span> du bénéfice</li>
                        <li>• Déclaration annuelle à la DICP</li>
                        <li>• Date limite : 30/04 (si clôture 31/12)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Régime social : TNS (Travailleurs Non-Salariés)</h3>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-800 mb-3">Gérants majoritaires = RNS</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-2">Cotisations sociales CPS</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Taux maladie obligatoire : <span className="font-bold">9,84%</span></li>
                        <li>• Cotisation minimale : 7 523 XPF/mois</li>
                        <li>• Taux accident du travail optionnel : 0,77%</li>
                        <li>• Taux retraite optionnel : 20,34%</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-2">Obligations</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Déclaration annuelle revenus avant 31/03</li>
                        <li>• Plancher mensuel : 76 457 XPF</li>
                        <li>• Affiliation dès début d'activité</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">TVA</h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-800 mb-2">Régime réel mensuel (CA &gt; 5 000 000 XPF)</p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Taux applicables</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        <li>• 16% : produits manufacturés</li>
                        <li>• 13% : prestations de services</li>
                        <li>• 5% : taux réduit certains produits</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Déclarations</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        <li>• Mensuelle avant le 15 de chaque mois</li>
                        <li>• 12 déclarations par an</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Obligations</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        <li>• Facturation TVA clients</li>
                        <li>• Droit à déduction TVA achats</li>
                        <li>• Reversement mensuel DICP</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Autres taxes et obligations</h3>
                <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800">Patente</p>
                        <p className="text-sm text-slate-600 mt-1">Impôt annuel basé sur l'activité, la commune et la surface</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Paiement avant</p>
                        <p className="font-bold text-red-600">01/08</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800">Taxe d'apprentissage</p>
                        <p className="text-sm text-slate-600 mt-1">Adossée à la patente, calculée selon nombre d'employés</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Incluse dans</p>
                        <p className="font-bold text-blue-600">Patente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Conformité aux recommandations CCISM</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 p-4 rounded-lg">
                      <p className="font-bold text-slate-800 mb-3">{rec.categorie}</p>
                      <ul className="space-y-2">
                        {rec.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-sm text-slate-700 flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Timeline de création (Checklist CCISM)</h3>
                <div className="space-y-4">
                  {timeline.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 bg-slate-50 p-4 rounded">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-slate-800 text-lg">{phase.phase}</p>
                          <p className="text-sm text-slate-600">Durée estimée : {phase.duree}</p>
                        </div>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Phase {idx + 1}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {phase.taches.map((tache, tIdx) => (
                          <div key={tIdx} className="bg-white p-2 rounded text-sm text-slate-700">
                            ☐ {tache}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-blue-800 mb-2">📞 Contacts utiles CCISM</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div>
                    <p className="font-medium">Centre de Formalités des Entreprises</p>
                    <p>Tél : 40 47 27 47</p>
                    <p>Email : cdfe@ccism.pf</p>
                  </div>
                  <div>
                    <p className="font-medium">Assistance juridique</p>
                    <p>Tél : 40 47 27 30</p>
                    <p>Email : juridique@ccism.pf</p>
                  </div>
                  <div>
                    <p className="font-medium">CAGEST (comptabilité)</p>
                    <p>Tél : 40 47 27 47</p>
                    <p>Email : cagest@ccism.pf</p>
                  </div>
                  <div>
                    <p className="font-medium">Formation</p>
                    <p>Tél : 40 47 27 19</p>
                    <p>Email : formation@ccism.pf</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-bold text-green-800 mb-2">💡 Aides et financements disponibles</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div>
                    <p className="font-medium">Initiative Polynésie française</p>
                    <p>Prêt d'honneur 500K à 2,5M XPF à 0%</p>
                    <p>Tél : 40 57 09 19</p>
                  </div>
                  <div>
                    <p className="font-medium">AEPE (Aide Équipement Petites Entreprises)</p>
                    <p>50% dépenses, plafonné 3M XPF</p>
                    <p>Contact DGAE : 40 50 97 97</p>
                  </div>
                  <div>
                    <p className="font-medium">ACPR (Revitalisation Commerces Proximité)</p>
                    <p>50% dépenses, plafonné 5M XPF</p>
                    <p>Contact DGAE : 40 50 97 97</p>
                  </div>
                  <div>
                    <p className="font-medium">SOFIDEP</p>
                    <p>Prêts participatifs à partir de 1M XPF</p>
                    <p>Tél : 40 50 93 30</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section Conclusion */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-xl p-8 mt-6">
          <h2 className="text-3xl font-bold mb-6">CONCLUSION</h2>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Un projet solide et innovant</h3>
            <p className="text-white/90 leading-relaxed">
              TIAKA représente une opportunité unique d'introduire le concept de konbini en Polynésie française, 
              en l'adaptant intelligemment au contexte local. Le projet s'appuie sur des fondations solides et 
              une stratégie claire pour assurer sa réussite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <h4 className="font-bold text-lg mb-3">✅ Points forts du projet</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Marché porteur : Papeete en développement, absence concurrence</li>
                <li>• Positionnement unique : fusion culturelle inédite</li>
                <li>• Équipe motivée : couple complémentaire, vision claire</li>
                <li>• Modèle viable : rentabilité dès l'année 1</li>
                <li>• Stratégie maîtrisée : communication ciblée, gestion optimisée</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <h4 className="font-bold text-lg mb-3">🔑 Facteurs clés de succès</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Emplacement : local à fort passage à Papeete</li>
                <li>• Qualité : sélection rigoureuse des produits</li>
                <li>• Service : accueil chaleureux, rapidité, propreté</li>
                <li>• Régularité : horaires respectés, réassort constant</li>
                <li>• Communication : présence digitale active, animations</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
            <h4 className="font-bold text-xl mb-4">🎯 Vision à long terme</h4>
            <div className="space-y-3 text-white/90">
              <div className="flex items-start">
                <span className="font-bold mr-3">Année 3-5 :</span>
                <span>Consolidation position leader, recrutement équipe stable</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-3">Année 5-7 :</span>
                <span>Ouverture second point de vente (Punaauia ou Mahina)</span>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-3">Année 7-10 :</span>
                <span>Développement marque, possible franchise</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <h4 className="font-bold text-xl mb-4">💚 Engagement des porteurs</h4>
            <p className="text-white/90 leading-relaxed mb-3">
              Les fondateurs de TIAKA s'engagent à :
            </p>
            <ul className="space-y-2 text-sm text-white/90">
              <li>• Offrir une expérience client exceptionnelle quotidiennement</li>
              <li>• Valoriser les produits et producteurs locaux</li>
              <li>• Contribuer au dynamisme économique de Papeete</li>
              <li>• Créer de l'emploi local et former la jeunesse</li>
              <li>• Respecter les normes environnementales (réduction plastique, tri sélectif)</li>
            </ul>
          </div>

          <div className="text-center mt-8 pt-6 border-t-2 border-white/30">
            <p className="text-3xl font-bold mb-2">TIAKA</p>
            <p className="text-xl italic mb-4">"La fleur du moment parfait"</p>
            <p className="text-sm text-white/80">
              Parce que chaque instant mérite un commerce qui vous ressemble
            </p>
          </div>
        </div>

        {/* Footer avec résumé conformité */}
        <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Document conforme aux recommandations</p>
              <p className="text-lg font-bold">CCISM Polynésie française - Guide de l'Entrepreneur 2021</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">Version</p>
              <p className="text-2xl font-bold text-red-400">2.0 Complète</p>
              <p className="text-xs text-slate-400 mt-1">Avec KPIs et conformité totale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;