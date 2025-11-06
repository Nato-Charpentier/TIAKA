import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Edit2, Save, X, Download, Target, Users, TrendingUp, CheckCircle, DollarSign, AlertCircle, PlusCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const mergeBusinessData = (defaults, saved) => {
  if (Array.isArray(defaults)) {
    if (saved === undefined) {
      return defaults.map((item) => mergeBusinessData(item, undefined));
    }

    if (!Array.isArray(saved)) {
      return saved;
    }

    return saved.map((savedItem, index) => {
      const defaultItem = index < defaults.length ? defaults[index] : undefined;
      return mergeBusinessData(defaultItem, savedItem);
    });
  }

  if (typeof defaults === 'object' && defaults !== null) {
    if (saved === undefined) {
      const cloned = {};
      Object.keys(defaults).forEach((key) => {
        cloned[key] = mergeBusinessData(defaults[key], undefined);
      });
      return cloned;
    }

    if (saved === null || typeof saved !== 'object' || Array.isArray(saved)) {
      return saved;
    }

    const result = {};
    const keys = new Set([...Object.keys(defaults), ...Object.keys(saved)]);

    keys.forEach((key) => {
      const defaultValue = Object.prototype.hasOwnProperty.call(defaults, key) ? defaults[key] : undefined;
      const savedValue = Object.prototype.hasOwnProperty.call(saved, key) ? saved[key] : undefined;
      result[key] = mergeBusinessData(defaultValue, savedValue);
    });

    return result;
  }

  if (Array.isArray(saved)) {
    return saved.map((item) => mergeBusinessData(undefined, item));
  }

  if (saved && typeof saved === 'object') {
    return mergeBusinessData({}, saved);
  }

  return saved !== undefined ? saved : defaults;
};

const TiakaBusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('presentation');
  const [editMode, setEditMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef();

  const [businessData, setBusinessData] = useState(() => {
    const saved = localStorage.getItem('tiakaBusinessData');
    return saved ? JSON.parse(saved) : {
      nomEntreprise: 'TIAKA',
      slogan: 'Le premier Konbini Franco-Tahitien',
      dateOuverture: 'Fin 2026',
      
      presentation: {
        tiaSignification: 'Dérivé de "Tiare", fleur emblématique de Tahiti',
        tiaSymbole: 'Symbole de pureté, beauté et accueil',
        kaSignification: 'Inspiré de "Kairos", mot grec ancien',
        kaSymbole: 'Le moment parfait, l\'instant opportun',
        contexte: [
          'Premier konbini franco-tahitien à Papeete',
          'Concept inspiré des convenience stores japonais',
          'Réponse à un besoin : absence de commerce de proximité moderne',
          'Combinaison praticité japonaise + authenticité polynésienne'
        ],
        concept: {
          surface: '100 m²',
          horaires: '7j/7 de 6h30 à 22h',
          design: 'Design épuré moderne',
          facade: 'Façade vitrée lumineuse'
        },
        offre: [
          'Produits quotidiens',
          'Snacks & boissons variés',
          'Produits japonais authentiques',
          'Produits locaux polynésiens',
          'Plats préparés à emporter',
          'Services pratiques (recharge, impression)'
        ],
        valeurs: ['Proximité', 'Qualité', 'Authenticité', 'Modernité', 'Accessibilité']
      },

      marche: {
        demographie: [
          '26 000 habitants à Papeete',
          '+ milliers de travailleurs quotidiens',
          'Population jeune et active',
          'Forte proportion d\'étudiants',
          'Secteur tertiaire développé',
          'Flux touristiques réguliers'
        ],
        habitudes: [
          'Recherche de praticité et rapidité',
          'Appétence produits étrangers (japonais)',
          'Attachement aux produits locaux',
          'Sensibilité horaires étendus',
          'Vie urbaine active'
        ],
        concurrence: [
          { type: 'Supérettes', forces: 'Large assortiment', faiblesses: 'Horaires limités', impact: 'Faible' },
          { type: 'Épiceries quartier', forces: 'Proximité', faiblesses: 'Offre limitée', impact: 'Faible' },
          { type: 'Stations-service', forces: 'Ouverture tardive', faiblesses: 'Prix élevés', impact: 'Moyen' }
        ],
        avantages: [
          'Ouverture continue 6h30-22h, 7j/7',
          'Concept unique fusion culturelle',
          'Espace consommation sur place',
          'Design moderne accueillant',
          'Mix produits introuvable',
          'Services pratiques intégrés'
        ],
        clientele: [
          { segment: 'Étudiants/jeunes actifs 25-35 ans', part: '40%', frequence: 'Quotidienne', panier: '800-1200 XPF', besoins: 'Snacks rapides, boissons, produits japonais' },
          { segment: 'Travailleurs en pause 30-50 ans', part: '30%', frequence: 'Hebdomadaire', panier: '1000-1500 XPF', besoins: 'Repas midi, café, dépannage' },
          { segment: 'Familles locales', part: '20%', frequence: '2-3x/semaine', panier: '1200-1800 XPF', besoins: 'Courses appoint, produits frais' },
          { segment: 'Touristes', part: '10%', frequence: 'Ponctuelle', panier: '1500-2500 XPF', besoins: 'Découverte produits, souvenirs' }
        ],
        tendances: [
          'Accélération rythme de vie urbain',
          'Digitalisation des achats',
          'Recherche d\'expériences authentiques',
          'Engouement culture japonaise',
          'Valorisation circuits courts'
        ],
        opportunites: [
          'Marché vierge - aucun konbini existant',
          'Papeete en développement constant',
          'Tourisme en reprise post-COVID',
          'Jeunesse connectée consommatrice'
        ]
      },

      strategie: {
        positionnement: 'TIAKA se positionne comme LE konbini franco-tahitien',
        axes: [
          'Praticité : Horaires étendus, central, service rapide',
          'Authenticité : Double culture Tahiti + Japon',
          'Modernité : Design, outils digitaux',
          'Accessibilité : Prix justes, ambiance accueillante'
        ],
        promesse: 'Chez TIAKA, trouvez tout ce dont vous avez besoin, au bon moment, dans une ambiance chaleureuse qui mêle modernité japonaise et authenticité tahitienne.',
        prix: [
          { categorie: 'Produits de base', positionnement: 'Prix compétitifs', justification: 'Produits d\'appel, fidélisation' },
          { categorie: 'Produits japonais', positionnement: 'Prix moyen-haut', justification: 'Exclusivité, importation' },
          { categorie: 'Produits locaux', positionnement: 'Prix raisonnables', justification: 'Soutien producteurs' },
          { categorie: 'Plats préparés', positionnement: '500-1000 XPF', justification: 'Praticité, fait maison' }
        ],
        panierMoyen: '900 XPF',
        phases: {
          preOuverture: [
            'Création comptes Instagram/Facebook avec teasing',
            'Distribution flyers quartiers cibles',
            'Partenariats influenceurs locaux',
            'Pose enseigne et décoration façade'
          ],
          lancement: [
            'Inauguration avec dégustations gratuites',
            'Promotion ouverture : -20% sur sélection produits',
            'Jeu concours réseaux sociaux',
            'Relations presse (journaux locaux, radio)'
          ],
          fidelisation: [
            'Carte de fidélité (10 achats = 1 produit offert)',
            'Happy Hours (17h-19h, promos ciblées)',
            'Animations thématiques (semaine japonaise, fête du Tiare)',
            'Newsletter mensuelle'
          ]
        },
        canaux: [
          { type: 'Réseaux sociaux', detail: 'Instagram prioritaire - cible jeune' },
          { type: 'Flyers et affiches', detail: 'Lycées, université, bureaux' },
          { type: 'Signalétique', detail: 'Enseigne lumineuse, vitrophanie' },
          { type: 'Bouche-à-oreille', detail: 'Programme parrainage' }
        ]
      },

      operationnel: {
        annee1: {
          gerant1: 'Approvisionnement, logistique, comptabilité',
          gerant2: 'Vente, accueil client, communication',
          horaires: [
            'Ouverture : 6h30-22h (15h30/jour)',
            'Rotation : 2 shifts de 8h avec chevauchement midi',
            '1 jour fermeture/semaine par personne (roulement)'
          ]
        },
        annee2: {
          profil: 'Accueil client, caisse, mise en rayon',
          contrat: 'CDI temps partiel évolutif',
          formation: 'Formation interne : 2 semaines'
        },
        zones: [
          { nom: 'Zone 1 : Alimentation & Snacking', surface: '40 m²', equipements: ['Rayonnages muraux produits secs', 'Réfrigérateurs boissons (3 unités)', 'Congélateurs surgelés (2 unités)', 'Présentoir fruits frais'] },
          { nom: 'Zone 2 : Produits Japonais & Locaux', surface: '25 m²', equipements: ['Étagères centrales', 'Mise en scène produits japonais', 'Corner produits polynésiens'] },
          { nom: 'Zone 3 : Services & Consommation', surface: '25 m²', equipements: ['Comptoir caisse moderne', 'Tables hautes + chaises (8 places)', 'Micro-ondes libre-service', 'Borne recharge/impression'] },
          { nom: 'Zone 4 : Arrière-boutique', surface: '10 m²', equipements: ['Stockage réserve', 'Bureau gestion', 'Vestiaires employés'] }
        ],
        fournisseurs: {
          locaux: ['Fruits/légumes : Marché Papeete', 'Boissons : Brasseries/jus locaux', 'Artisanat : Coopératives'],
          japonais: ['Importateur spécialisé PF', 'Commande directe Japon', 'Fréquence : trimestrielle'],
          courants: ['Grossistes alimentaires Tahiti', 'Centrale d\'achat locale']
        },
        equipements: {
          vente: ['Caisse enregistreuse tactile', 'Terminal paiement CB', 'Balance électronique', 'Scanner code-barres'],
          conservation: ['3 réfrigérateurs vitrines (300L)', '2 congélateurs coffres (200L)', '1 réfrigérateur produits frais'],
          mobilier: ['Rayonnages modulables (20m linéaires)', 'Étagères centrales', '4 tables hautes + 8 tabourets', 'Comptoir caisse'],
          digital: ['Logiciel caisse avec gestion stock', 'Ordinateur de gestion', 'Internet professionnel', 'Caméras surveillance (2)']
        }
      },

      objectifs: {
        an1: ['50 clients/jour en moyenne', 'CA de 16,2 millions XPF', 'Notoriété locale solide', 'Clientèle fidèle'],
        an2_3: ['60-65 clients/jour', 'Diversification de l\'offre', 'Équipe stable recrutée', 'Rentabilité optimale'],
        an4_5: ['Position de leader konbini', 'Second point de vente', 'Service Click & Collect']
      },

      kpis: {
        commerciaux: [
          { nom: 'CA mensuel', cible: '1 350 000 XPF', frequence: 'Mensuel', alerte: '< 1 000 000 XPF' },
          { nom: 'Clients/jour', cible: '50', frequence: 'Quotidien', alerte: '< 35' },
          { nom: 'Panier moyen', cible: '900 XPF', frequence: 'Hebdomadaire', alerte: '< 700 XPF' },
          { nom: 'Taux fidélisation', cible: '40%', frequence: 'Mensuel', alerte: '< 25%' },
          { nom: 'Taux conversion', cible: '65%', frequence: 'Hebdomadaire', alerte: '< 50%' }
        ],
        operationnels: [
          { nom: 'Rotation stocks', cible: '24x/an', frequence: 'Mensuel', alerte: '< 18x/an' },
          { nom: 'Rupture stock', cible: '< 5%', frequence: 'Hebdomadaire', alerte: '> 10%' },
          { nom: 'Temps attente caisse', cible: '< 3 min', frequence: 'Quotidien', alerte: '> 5 min' },
          { nom: 'Taux démarque', cible: '< 2%', frequence: 'Mensuel', alerte: '> 4%' },
          { nom: 'Satisfaction client', cible: '≥ 8/10', frequence: 'Mensuel', alerte: '< 6/10' }
        ],
        financiers: [
          { nom: 'Marge brute', cible: '50%', frequence: 'Mensuel', alerte: '< 45%' },
          { nom: 'Trésorerie nette', cible: '> 1 000 000 XPF', frequence: 'Hebdomadaire', alerte: '< 500 000 XPF' },
          { nom: 'Délai paiement', cible: '< 7 jours', frequence: 'Mensuel', alerte: '> 15 jours' },
          { nom: 'Ratio charges/CA', cible: '< 88%', frequence: 'Mensuel', alerte: '> 92%' },
          { nom: 'Seuil rentabilité', cible: 'Mois 1', frequence: 'Mensuel', alerte: 'Non atteint M3' }
        ],
        rh: [
          { nom: 'Productivité/heure', cible: '87 000 XPF', frequence: 'Mensuel', alerte: '< 65 000 XPF' },
          { nom: 'Taux absentéisme', cible: '< 3%', frequence: 'Mensuel', alerte: '> 7%' },
          { nom: 'Satisfaction employés', cible: '≥ 7/10', frequence: 'Trimestriel', alerte: '< 5/10' }
        ],
        marketing: [
          { nom: 'Engagement réseaux sociaux', cible: '> 5%', frequence: 'Hebdomadaire', alerte: '< 2%' },
          { nom: 'Abonnés Instagram', cible: '+100/mois', frequence: 'Mensuel', alerte: '< 50/mois' },
          { nom: 'Taux retour fidélité', cible: '35%', frequence: 'Mensuel', alerte: '< 20%' },
          { nom: 'CAC', cible: '< 500 XPF', frequence: 'Mensuel', alerte: '> 1000 XPF' }
        ]
      },

      previsions: [
        { an: 1, clients: 50, panier: 900, jours: 360, ca: '16 200 000', croissance: '-' },
        { an: 2, clients: 55, panier: 950, jours: 360, ca: '18 810 000', croissance: '+16%' },
        { an: 3, clients: 60, panier: 1000, jours: 360, ca: '21 600 000', croissance: '+15%' },
        { an: 4, clients: 65, panier: 1050, jours: 360, ca: '24 570 000', croissance: '+14%' },
        { an: 5, clients: 70, panier: 1100, jours: 360, ca: '27 720 000', croissance: '+13%' }
      ],

      compteResultat: [
        { an: 1, ca: 16200000, appro: 8100000, loyer: 2400000, salairesG: 2400000, salaire: 0, elec: 600000, marketing: 200000, divers: 600000, resultat: 1900000 },
        { an: 2, ca: 18810000, appro: 9405000, loyer: 2400000, salairesG: 2400000, salaire: 1800000, elec: 600000, marketing: 100000, divers: 600000, resultat: 1505000 },
        { an: 3, ca: 21600000, appro: 10800000, loyer: 2400000, salairesG: 2400000, salaire: 1800000, elec: 600000, marketing: 100000, divers: 600000, resultat: 2900000 },
        { an: 4, ca: 24570000, appro: 12285000, loyer: 2400000, salairesG: 2400000, salaire: 1800000, elec: 600000, marketing: 100000, divers: 600000, resultat: 4385000 },
        { an: 5, ca: 27720000, appro: 13860000, loyer: 2400000, salairesG: 2400000, salaire: 1800000, elec: 600000, marketing: 100000, divers: 600000, resultat: 5960000 }
      ],

      financement: {
        besoins: [
          { poste: 'Travaux et aménagement', montant: '1 500 000' },
          { poste: 'Équipements', montant: '1 500 000' },
          { poste: 'Stock initial', montant: '1 200 000' },
          { poste: 'Enseigne et communication', montant: '500 000' },
          { poste: 'Trésorerie de sécurité', montant: '1 000 000' },
          { poste: 'Frais administratifs', montant: '300 000' }
        ],
        ressources: [
          { source: 'Apport personnel', montant: '300 000', pct: '5%' },
          { source: 'Emprunt bancaire', montant: '5 200 000', pct: '87%' },
          { source: 'Aides/subventions', montant: '500 000', pct: '8%' }
        ],
        emprunt: {
          duree: '5 ans',
          taux: '4,5%',
          mensualite: '~95 000 XPF',
          differe: '6 mois (intérêts uniquement)'
        }
      },

      juridique: {
        forme: 'SARL',
        avantages: [
          'Responsabilité limitée aux apports',
          'Structure adaptée aux couples',
          'Crédibilité vis-à-vis des banques',
          'Possibilité d\'évolution',
          'Séparation patrimoine'
        ],
        caracteristiques: [
          'Capital social : 300 000 XPF',
          '2 associés gérants égalitaires (50/50)',
          'Siège social : Papeete',
          'Durée : 99 ans'
        ],
        fiscal: {
          is: '27% du bénéfice',
          tva: 'Régime réel mensuel',
          patente: 'Avant 01/08 chaque année',
          declaration: 'Annuelle DICP avant 30/04'
        },
        social: {
          gerants: 'Régime Non-Salariés (RNS)',
          cps: '9,84% minimum',
          cotisationMin: '7 523 XPF/mois',
          plancher: '76 457 XPF',
          declaration: 'Annuelle avant 31/03'
        },
        timeline: [
          { phase: 'Préparation', duree: '3-6 mois', taches: ['Finalisation business plan', 'Recherche local', 'Étude concurrence', 'Contacts fournisseurs', 'RDV banque'] },
          { phase: 'Formalités', duree: '1-2 mois', taches: ['Constitution SARL', 'Immatriculation RCS', 'Obtention N° TAHITI', 'Compte bancaire pro', 'Assurances', 'Signature bail'] },
          { phase: 'Aménagement', duree: '2-3 mois', taches: ['Travaux', 'Installation équipements', 'Pose enseigne', 'Décoration', 'Tests techniques'] },
          { phase: 'Lancement', duree: '1 mois', taches: ['Stock initial', 'Paramétrage caisse', 'Communication', 'Formation', 'Inauguration'] }
        ]
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('tiakaBusinessData', JSON.stringify(businessData));
  }, [businessData]);

  const sections = [
    { id: 'presentation', title: 'I. PRÉSENTATION', icon: Target },
    { id: 'marche', title: 'II. MARCHÉ', icon: Users },
    { id: 'strategie', title: 'III. STRATÉGIE', icon: TrendingUp },
    { id: 'operationnel', title: 'IV. OPÉRATIONNEL', icon: CheckCircle },
    { id: 'financier', title: 'V. FINANCES', icon: DollarSign },
    { id: 'kpis', title: 'VI. KPIs', icon: AlertCircle },
    { id: 'juridique', title: 'VII. JURIDIQUE', icon: CheckCircle }
  ];

  const compteResultatDefinitions = [
    { key: 'ca', label: 'CA', rowClass: 'bg-green-50 font-bold', valueClass: 'text-right text-green-700 font-semibold' },
    { key: 'appro', label: 'Approvisionnement', rowClass: 'bg-white', valueClass: 'text-right text-red-600' },
    { key: 'loyer', label: 'Loyer', rowClass: 'bg-slate-50', valueClass: 'text-right text-red-600' },
    { key: 'salairesG', label: 'Salaires gérants', rowClass: 'bg-white', valueClass: 'text-right text-red-600' },
    { key: 'salaire', label: 'Salaire employé', rowClass: 'bg-slate-50', valueClass: 'text-right text-red-600' },
    { key: 'elec', label: 'Électricité/eau', rowClass: 'bg-white', valueClass: 'text-right text-red-600' },
    { key: 'marketing', label: 'Marketing & communication', rowClass: 'bg-slate-50', valueClass: 'text-right text-red-600' },
    { key: 'divers', label: 'Charges diverses', rowClass: 'bg-white', valueClass: 'text-right text-red-600' },
    { key: 'resultat', label: 'RÉSULTAT NET', rowClass: 'bg-green-100 font-bold text-lg', valueClass: 'text-right text-green-700 font-semibold' }
  ];

  const parseNumber = (value) => {
    if (typeof value === 'number') return value;
    const parsed = Number(String(value ?? '').replace(/[^0-9,-]/g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const { totalBesoins, totalRessources, totalRessourcesPct } = useMemo(() => {
    const besoins = businessData.financement.besoins.reduce((sum, item) => sum + parseNumber(item.montant), 0);
    const ressources = businessData.financement.ressources.reduce((sum, item) => sum + parseNumber(item.montant), 0);
    const ressourcesPct = businessData.financement.ressources.reduce((sum, item) => sum + parseNumber(item.pct), 0);

    return {
      totalBesoins: besoins,
      totalRessources: ressources,
      totalRessourcesPct: ressourcesPct
    };
  }, [businessData.financement.besoins, businessData.financement.ressources]);

  const updateAtPath = (path, updater) => {
    setBusinessData(prev => {
      const newData = deepClone(prev);
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
          current[key] = {};
        }
        current = current[key];
      }
      const lastKey = keys[keys.length - 1];
      const previousValue = current[lastKey];
      current[lastKey] = updater(previousValue);
      return newData;
    });
  };

  const updateValue = (path, value) => {
    updateAtPath(path, () => value);
  };

  const updateArrayItem = (path, index, value) => {
    updateAtPath(path, (items = []) => {
      const nextItems = [...items];
      nextItems[index] = value;
      return nextItems;
    });
  };

  const updateObjectInArray = (path, index, field, value) => {
    updateAtPath(path, (items = []) =>
      items.map((item, idx) =>
        idx === index
          ? {
              ...item,
              [field]: typeof item[field] === 'number' ? parseNumber(value) : value
            }
          : item
      )
    );
  };

  const addItemToArray = (path, newItem) => {
    updateAtPath(path, (items = []) => [...items, newItem]);
  };

  const removeItemFromArray = (path, index) => {
    updateAtPath(path, (items = []) => items.filter((_, idx) => idx !== index));
  };

  const updateKPI = (category, index, field, value) => {
    setBusinessData(prev => ({
      ...prev,
      kpis: {
        ...prev.kpis,
        [category]: prev.kpis[category].map((kpi, idx) => 
          idx === index ? { ...kpi, [field]: value } : kpi
        )
      }
    }));
  };

  const updatePrevision = (index, field, value) => {
    setBusinessData(prev => ({
      ...prev,
      previsions: prev.previsions.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addPrevisionRow = () => {
    addItemToArray('previsions', {
      an: businessData.previsions.length + 1,
      clients: 0,
      panier: 0,
      jours: 0,
      ca: 0,
      croissance: '0%'
    });
  };

  const removePrevisionRow = (index) => {
    updateAtPath('previsions', (items = []) =>
      items
        .filter((_, idx) => idx !== index)
        .map((item, idx) => ({ ...item, an: idx + 1 }))
    );
  };

  const updateClientele = (index, field, value) => {
    setBusinessData(prev => ({
      ...prev,
      marche: {
        ...prev.marche,
        clientele: prev.marche.clientele.map((client, idx) => 
          idx === index ? { ...client, [field]: value } : client
        )
      }
    }));
  };

  const updateConcurrence = (index, field, value) => {
    updateObjectInArray('marche.concurrence', index, field, value);
  };

  const updateStrategyPrice = (index, field, value) => {
    updateObjectInArray('strategie.prix', index, field, value);
  };

  const updateZoneField = (index, field, value) => {
    updateObjectInArray('operationnel.zones', index, field, value);
  };

  const updateZoneEquipment = (zoneIndex, equipmentIndex, value) => {
    updateAtPath('operationnel.zones', (zones = []) =>
      zones.map((zone, idx) =>
        idx === zoneIndex
          ? {
              ...zone,
              equipements: zone.equipements.map((equipement, eqIdx) =>
                eqIdx === equipmentIndex ? value : equipement
              )
            }
          : zone
      )
    );
  };

  const updateFinancementBesoin = (index, field, value) => {
    updateObjectInArray('financement.besoins', index, field, value);
  };

  const updateFinancementRessource = (index, field, value) => {
    updateObjectInArray('financement.ressources', index, field, value);
  };

  const updateEmpruntField = (field, value) => {
    updateValue(`financement.emprunt.${field}`, value);
  };

  const updateTimelinePhase = (index, field, value) => {
    updateObjectInArray('juridique.timeline', index, field, value);
  };

  const updateTimelineTask = (phaseIndex, taskIndex, value) => {
    updateAtPath('juridique.timeline', (phases = []) =>
      phases.map((phase, idx) =>
        idx === phaseIndex
          ? {
              ...phase,
              taches: phase.taches.map((task, tIdx) => (tIdx === taskIndex ? value : task))
            }
          : phase
      )
    );
  };

  const addTimelinePhase = () => {
    addItemToArray('juridique.timeline', {
      phase: 'Nouvelle phase',
      duree: '',
      taches: ['Nouvelle tâche']
    });
  };

  const removeTimelinePhase = (index) => {
    updateAtPath('juridique.timeline', (phases = []) => phases.filter((_, idx) => idx !== index));
  };

  const addTimelineTask = (phaseIndex) => {
    updateAtPath('juridique.timeline', (phases = []) =>
      phases.map((phase, idx) =>
        idx === phaseIndex ? { ...phase, taches: [...phase.taches, 'Nouvelle tâche'] } : phase
      )
    );
  };

  const removeTimelineTask = (phaseIndex, taskIndex) => {
    updateAtPath('juridique.timeline', (phases = []) =>
      phases.map((phase, idx) =>
        idx === phaseIndex
          ? { ...phase, taches: phase.taches.filter((_, tIdx) => tIdx !== taskIndex) }
          : phase
      )
    );
  };

  const updateConclusionVision = (index, field, value) => {
    updateObjectInArray('conclusion.vision', index, field, value);
  };

  const addVisionItem = () => {
    addItemToArray('conclusion.vision', { horizon: 'Nouvel horizon', detail: '' });
  };

  const removeVisionItem = (index) => {
    removeItemFromArray('conclusion.vision', index);
  };

  const formatCurrency = (value) => {
    const number = parseNumber(value);
    return new Intl.NumberFormat('fr-FR').format(number);
  };

  const formatMillions = (value) => {
    const number = parseNumber(value);
    return (number / 1_000_000).toFixed(1);
  };

  const formatPercent = (value) => {
    const number = parseNumber(value);
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(number);
  };

  const resetData = () => {
    if (window.confirm('Réinitialiser toutes les données ?')) {
      localStorage.removeItem('tiakaBusinessData');
      window.location.reload();
    }
  };

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const content = contentRef.current;
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Business_Plan_${businessData.nomEntreprise}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erreur export PDF:', error);
      alert('Erreur lors de l\'export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const EditableField = ({
    value,
    onChange,
    className = '',
    multiline = false,
    type = 'text',
    placeholder = '',
    inputClassName
  }) => {
    if (!editMode) {
      if (value && value !== '') {
        return <span className={className}>{value}</span>;
      }
      return <span className={`${className} text-slate-400 italic`}>{placeholder || 'À compléter'}</span>;
    }

    const sharedProps = {
      value: value ?? '',
      onChange: (event) => onChange(event.target.value),
      className:
        inputClassName ?? `${className} border-2 border-blue-400 rounded px-2 py-1 bg-blue-50`,
      placeholder
    };

    if (multiline) {
      return <textarea {...sharedProps} rows={4} />;
    }

    return <input {...sharedProps} type={type} />;
  };

  const EditableList = ({ items, onUpdate }) => (
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <span className="mr-2">•</span>
          {editMode ? (
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx] = e.target.value;
                onUpdate(newItems);
              }}
              className="flex-1 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
            />
          ) : <span>{item}</span>}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Barre d'outils */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditMode(!editMode)}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                editMode ? 'bg-green-500' : 'bg-blue-500'
              } text-white hover:opacity-90 transition`}
            >
              {editMode ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              {editMode ? 'Mode édition' : 'Activer édition'}
            </button>

            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-purple-500 text-white hover:opacity-90 transition"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export PDF
                </>
              )}
            </button>
          </div>

          <button
            onClick={resetData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:opacity-90 transition"
          >
            <X className="w-5 h-5" />
            Réinitialiser
          </button>
        </div>

        <div ref={contentRef}>
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">
                  <EditableField 
                    value={businessData.nomEntreprise}
                    onChange={(val) => updateValue('nomEntreprise', val)}
                  />
                </h1>
                <p className="text-xl text-slate-600 italic">
                  <EditableField 
                    value={businessData.slogan}
                    onChange={(val) => updateValue('slogan', val)}
                  />
                </p>
                <p className="text-sm text-slate-500 mt-2">Business Plan conforme CCISM Polynésie française</p>
              </div>
              <div className="bg-red-50 px-4 py-2 rounded-lg">
                <p className="text-xs text-slate-500">Ouverture prévue</p>
                <p className="text-2xl font-bold text-red-600">
                  <EditableField 
                    value={businessData.dateOuverture}
                    onChange={(val) => updateValue('dateOuverture', val)}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-4 rounded-xl transition ${
                    activeSection === section.id
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs font-medium text-center">{section.title}</p>
                </button>
              );
            })}
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* SECTION PRÉSENTATION */}
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
                      <p className="text-sm text-slate-600">
                        <EditableField 
                          value={businessData.presentation.tiaSignification}
                          onChange={(val) => updateValue('presentation.tiaSignification', val)}
                        />
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        <EditableField 
                          value={businessData.presentation.tiaSymbole}
                          onChange={(val) => updateValue('presentation.tiaSymbole', val)}
                        />
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-bold text-red-600">KA</p>
                      <p className="text-sm text-slate-600">
                        <EditableField 
                          value={businessData.presentation.kaSignification}
                          onChange={(val) => updateValue('presentation.kaSignification', val)}
                        />
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        <EditableField 
                          value={businessData.presentation.kaSymbole}
                          onChange={(val) => updateValue('presentation.kaSymbole', val)}
                        />
                      </p>
                    </div>
                  </div>
                  <p className="text-center mt-4 text-lg font-semibold text-slate-700">
                    <EditableField
                      value={businessData.presentation.concept.mantra}
                      onChange={(val) => updateValue('presentation.concept.mantra', val)}
                      className="text-slate-700"
                      inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-center"
                      placeholder="Signature concept"
                    />
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Contexte et genèse</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <EditableList
                      className="text-sm text-slate-700"
                      items={businessData.presentation.contexte}
                      onUpdate={(items) => updateValue('presentation.contexte', items)}
                      addLabel="Ajouter un point de contexte"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Le concept TIAKA</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-2">
                        <EditableField
                          value={businessData.presentation.concept.commerceTitre}
                          onChange={(val) => updateValue('presentation.concept.commerceTitre', val)}
                          className="text-blue-800 font-bold"
                          inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 font-bold text-blue-800"
                          placeholder="Titre de colonne"
                        />
                      </p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• <EditableField value={businessData.presentation.concept.surface} onChange={(val) => updateValue('presentation.concept.surface', val)} /> optimisés</li>
                        <li>• <EditableField value={businessData.presentation.concept.horaires} onChange={(val) => updateValue('presentation.concept.horaires', val)} /></li>
                        <li>• <EditableField value={businessData.presentation.concept.design} onChange={(val) => updateValue('presentation.concept.design', val)} /></li>
                        <li>• <EditableField value={businessData.presentation.concept.facade} onChange={(val) => updateValue('presentation.concept.facade', val)} /></li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-2">Offre hybride unique</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <EditableList 
                          items={businessData.presentation.offre}
                          onUpdate={(items) => updateValue('presentation.offre', items)}
                        />
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-bold text-orange-800 mb-2">
                        <EditableField
                          value={businessData.presentation.concept.experienceTitre}
                          onChange={(val) => updateValue('presentation.concept.experienceTitre', val)}
                          className="text-orange-800 font-bold"
                          inputClassName="w-full border-2 border-orange-400 rounded px-2 py-1 bg-orange-50 font-bold text-orange-800"
                          placeholder="Titre de colonne"
                        />
                      </p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.presentation.concept.experiencePoints}
                        onUpdate={(items) => updateValue('presentation.concept.experiencePoints', items)}
                        addLabel="Ajouter un atout d'espace"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Objectifs stratégiques</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <p className="font-bold text-green-800">Court terme (Année 1)</p>
                      <EditableList
                        className="text-sm text-slate-700 mt-2"
                        items={businessData.objectifs.an1}
                        onUpdate={(items) => updateValue('objectifs.an1', items)}
                        addLabel="Ajouter un objectif court terme"
                      />
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-800">Moyen terme (Années 2-3)</p>
                      <EditableList
                        className="text-sm text-slate-700 mt-2"
                        items={businessData.objectifs.an2_3}
                        onUpdate={(items) => updateValue('objectifs.an2_3', items)}
                        addLabel="Ajouter un objectif moyen terme"
                      />
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-800">Long terme (Années 4-5)</p>
                      <EditableList
                        className="text-sm text-slate-700 mt-2"
                        items={businessData.objectifs.an4_5}
                        onUpdate={(items) => updateValue('objectifs.an4_5', items)}
                        addLabel="Ajouter un objectif long terme"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Valeurs fondamentales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {businessData.presentation.valeurs.map((value, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-4 rounded-lg text-center relative">
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => removeItemFromArray('presentation.valeurs', idx)}
                            className="absolute top-2 right-2 text-white/70 hover:text-white"
                            aria-label="Supprimer la valeur"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        {editMode ? (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateArrayItem('presentation.valeurs', idx, e.target.value)}
                            className="w-full bg-white/20 border-2 border-white/50 rounded px-2 py-1 text-center font-bold"
                            placeholder="Nouvelle valeur"
                          />
                        ) : (
                          <p className="font-bold">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => addItemToArray('presentation.valeurs', '')}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-200"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter une valeur
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SECTION MARCHÉ */}
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
                        <EditableList
                          className="text-sm text-slate-700"
                          items={businessData.marche.demographie}
                          onUpdate={(items) => updateValue('marche.demographie', items)}
                          addLabel="Ajouter une donnée démographique"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-blue-800 mb-2">Habitudes de consommation</p>
                        <EditableList
                          className="text-sm text-slate-700"
                          items={businessData.marche.habitudes}
                          onUpdate={(items) => updateValue('marche.habitudes', items)}
                          addLabel="Ajouter une habitude"
                        />
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
                          {editMode && <th className="p-3 text-left w-24">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {businessData.marche.concurrence.map((conc, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3 font-medium">
                              <EditableField
                                value={conc.type}
                                onChange={(val) => updateConcurrence(idx, 'type', val)}
                                className="w-full"
                                placeholder="Type de concurrent"
                              />
                            </td>
                            <td className="p-3">
                              <EditableField
                                value={conc.forces}
                                onChange={(val) => updateConcurrence(idx, 'forces', val)}
                                className="w-full"
                                placeholder="Forces principales"
                              />
                            </td>
                            <td className="p-3">
                              <EditableField
                                value={conc.faiblesses}
                                onChange={(val) => updateConcurrence(idx, 'faiblesses', val)}
                                className="w-full"
                                placeholder="Faiblesses identifiées"
                              />
                            </td>
                            <td className="p-3 text-green-600 font-medium">
                              <EditableField
                                value={conc.impact}
                                onChange={(val) => updateConcurrence(idx, 'impact', val)}
                                className="w-full text-green-700"
                                placeholder="Impact"
                              />
                            </td>
                            {editMode && (
                              <td className="p-3">
                                <button
                                  type="button"
                                  onClick={() => removeItemFromArray('marche.concurrence', idx)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Supprimer
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => addItemToArray('marche.concurrence', { type: '', forces: '', faiblesses: '', impact: '' })}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Ajouter un concurrent
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Avantages compétitifs TIAKA</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {businessData.marche.avantages.map((advantage, idx) => (
                      <div key={idx} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          {editMode ? (
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={advantage}
                                onChange={(e) => updateArrayItem('marche.avantages', idx, e.target.value)}
                                className="flex-1 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                              />
                              <button
                                type="button"
                                onClick={() => removeItemFromArray('marche.avantages', idx)}
                                className="text-red-500 hover:text-red-600"
                                aria-label="Supprimer l'avantage"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <p className="text-sm text-slate-700 flex-1">{advantage}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => addItemToArray('marche.avantages', '')}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter un avantage
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Clientèle cible</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {businessData.marche.clientele.map((client, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-200 p-4 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <EditableField
                            value={client.segment}
                            onChange={(val) => updateClientele(idx, 'segment', val)}
                            className="font-bold text-slate-800"
                            inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 font-bold text-slate-800"
                            placeholder="Segment client"
                          />
                          <div className="flex items-center gap-2">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                              <EditableField
                                value={client.part}
                                onChange={(val) => updateClientele(idx, 'part', val)}
                                className="text-white text-center"
                                inputClassName="w-16 border-2 border-white rounded px-1 bg-red-400 text-center text-white font-bold"
                                placeholder="Part"
                              />
                            </span>
                            {editMode && (
                              <button
                                type="button"
                                onClick={() => removeItemFromArray('marche.clientele', idx)}
                                className="text-red-500 hover:text-red-600"
                                aria-label="Supprimer le segment"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <p>
                            <span className="font-medium">Fréquence:</span>{' '}
                            <EditableField
                              value={client.frequence}
                              onChange={(val) => updateClientele(idx, 'frequence', val)}
                              className="inline-block"
                              inputClassName="border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 inline-block"
                              placeholder="Fréquence"
                            />
                          </p>
                          <p>
                            <span className="font-medium">Panier moyen:</span>{' '}
                            <EditableField
                              value={client.panier}
                              onChange={(val) => updateClientele(idx, 'panier', val)}
                              className="inline-block"
                              inputClassName="border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 inline-block"
                              placeholder="Panier"
                            />
                          </p>
                          <p>
                            <span className="font-medium">Besoins:</span>{' '}
                            <EditableField
                              value={client.besoins}
                              onChange={(val) => updateClientele(idx, 'besoins', val)}
                              className="inline-block"
                              inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                              placeholder="Besoins clés"
                              multiline
                            />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => addItemToArray('marche.clientele', { segment: '', part: '', frequence: '', panier: '', besoins: '' })}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter un segment client
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Tendances et opportunités</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-3">Tendances sociétales</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.marche.tendances}
                        onUpdate={(items) => updateValue('marche.tendances', items)}
                        addLabel="Ajouter une tendance"
                      />
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">Opportunités de marché</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.marche.opportunites}
                        onUpdate={(items) => updateValue('marche.opportunites', items)}
                        addLabel="Ajouter une opportunité"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* SECTION STRATÉGIE */}
            {activeSection === 'strategie' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  III. STRATÉGIE COMMERCIALE & MARKETING
                </h2>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Positionnement</h3>
                  <p className="text-lg font-semibold text-red-700 mb-4">
                    <EditableField 
                      value={businessData.strategie.positionnement}
                      onChange={(val) => updateValue('strategie.positionnement', val)}
                    />
                  </p>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <p className="font-bold text-slate-800 mb-2">Axes de positionnement</p>
                    <EditableList
                      className="text-sm text-slate-700"
                      items={businessData.strategie.axes}
                      onUpdate={(items) => updateValue('strategie.axes', items)}
                      addLabel="Ajouter un axe"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-2">Promesse client</p>
                    <p className="text-sm italic text-slate-700 bg-slate-50 p-3 rounded">
                      <EditableField 
                        value={businessData.strategie.promesse}
                        onChange={(val) => updateValue('strategie.promesse', val)}
                      />
                    </p>
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
                          {editMode && <th className="p-3 text-left w-24">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {businessData.strategie.prix.map((p, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3">
                              <EditableField
                                value={p.categorie}
                                onChange={(val) => updateStrategyPrice(idx, 'categorie', val)}
                                className="w-full"
                                placeholder="Catégorie"
                              />
                            </td>
                            <td className="p-3 font-medium text-green-600">
                              <EditableField
                                value={p.positionnement}
                                onChange={(val) => updateStrategyPrice(idx, 'positionnement', val)}
                                className="w-full text-green-700"
                                placeholder="Positionnement"
                              />
                            </td>
                            <td className="p-3">
                              <EditableField
                                value={p.justification}
                                onChange={(val) => updateStrategyPrice(idx, 'justification', val)}
                                className="w-full"
                                placeholder="Justification"
                              />
                            </td>
                            {editMode && (
                              <td className="p-3">
                                <button
                                  type="button"
                                  onClick={() => removeItemFromArray('strategie.prix', idx)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Supprimer
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => addItemToArray('strategie.prix', { categorie: '', positionnement: '', justification: '' })}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Ajouter une catégorie
                      </button>
                    )}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg mt-3">
                    <p className="text-center text-lg font-bold text-blue-800">
                      Panier moyen cible : <EditableField 
                        value={businessData.strategie.panierMoyen}
                        onChange={(val) => updateValue('strategie.panierMoyen', val)}
                      />
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Communication et promotion</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                      <p className="font-bold text-yellow-800 mb-2">Phase 1 : Pré-ouverture (3 mois avant)</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.strategie.phases.preOuverture}
                        onUpdate={(items) => updateValue('strategie.phases.preOuverture', items)}
                        addLabel="Ajouter une action"
                      />
                    </div>

                    <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                      <p className="font-bold text-green-800 mb-2">Phase 2 : Lancement</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.strategie.phases.lancement}
                        onUpdate={(items) => updateValue('strategie.phases.lancement', items)}
                        addLabel="Ajouter une action"
                      />
                    </div>

                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                      <p className="font-bold text-blue-800 mb-2">Phase 3 : Fidélisation (ongoing)</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.strategie.phases.fidelisation}
                        onUpdate={(items) => updateValue('strategie.phases.fidelisation', items)}
                        addLabel="Ajouter une action"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Canaux de communication</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {businessData.strategie.canaux.map((canal, idx) => (
                      <div key={idx} className="bg-purple-50 p-4 rounded-lg text-center relative">
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => removeItemFromArray('strategie.canaux', idx)}
                            className="absolute top-2 right-2 text-purple-400 hover:text-red-500"
                            aria-label="Supprimer le canal"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <EditableField
                          value={canal.type}
                          onChange={(val) => updateObjectInArray('strategie.canaux', idx, 'type', val)}
                          className="font-bold text-purple-800"
                          inputClassName="w-full border-2 border-purple-300 rounded px-2 py-1 bg-white text-purple-800 font-bold"
                          placeholder="Canal"
                        />
                        <EditableField
                          value={canal.detail}
                          onChange={(val) => updateObjectInArray('strategie.canaux', idx, 'detail', val)}
                          className="text-xs text-slate-600 mt-1 block"
                          inputClassName="w-full border-2 border-purple-200 rounded px-2 py-1 bg-white text-xs"
                          placeholder="Détail"
                        />
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => addItemToArray('strategie.canaux', { type: '', detail: '' })}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter un canal
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SECTION OPÉRATIONNEL */}
            {activeSection === 'operationnel' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  IV. PLAN OPÉRATIONNEL
                </h2>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Organisation et ressources humaines</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-3">
                        <EditableField
                          value={businessData.operationnel.annee1.titre}
                          onChange={(val) => updateValue('operationnel.annee1.titre', val)}
                          className="text-blue-800 font-bold"
                          inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 font-bold text-blue-800"
                          placeholder="Titre de la première année"
                        />
                      </p>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded">
                          <p className="font-medium text-slate-800">Gérant 1</p>
                          <p className="text-sm text-slate-600">
                            <EditableField 
                              value={businessData.operationnel.annee1.gerant1}
                              onChange={(val) => updateValue('operationnel.annee1.gerant1', val)}
                            />
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="font-medium text-slate-800">Gérant 2</p>
                          <p className="text-sm text-slate-600">
                            <EditableField 
                              value={businessData.operationnel.annee1.gerant2}
                              onChange={(val) => updateValue('operationnel.annee1.gerant2', val)}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 bg-white p-3 rounded">
                        <p className="text-sm font-medium text-slate-800">Planning horaire</p>
                        <EditableList
                          className="text-xs text-slate-600 mt-1"
                          items={businessData.operationnel.annee1.horaires}
                          onUpdate={(items) => updateValue('operationnel.annee1.horaires', items)}
                          addLabel="Ajouter un créneau"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">
                        <EditableField
                          value={businessData.operationnel.annee2.titre}
                          onChange={(val) => updateValue('operationnel.annee2.titre', val)}
                          className="text-green-800 font-bold"
                          inputClassName="w-full border-2 border-green-400 rounded px-2 py-1 bg-green-50 font-bold text-green-800"
                          placeholder="Titre de la deuxième année"
                        />
                      </p>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded">
                          <p className="font-medium text-slate-800">Profil recherché</p>
                          <p className="text-sm text-slate-600">
                            <EditableField 
                              value={businessData.operationnel.annee2.profil}
                              onChange={(val) => updateValue('operationnel.annee2.profil', val)}
                            />
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="font-medium text-slate-800">Contrat</p>
                          <p className="text-sm text-slate-600">
                            <EditableField 
                              value={businessData.operationnel.annee2.contrat}
                              onChange={(val) => updateValue('operationnel.annee2.contrat', val)}
                            />
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <p className="font-medium text-slate-800">Formation</p>
                          <p className="text-sm text-slate-600">
                            <EditableField 
                              value={businessData.operationnel.annee2.formation}
                              onChange={(val) => updateValue('operationnel.annee2.formation', val)}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    <EditableField
                      value={businessData.operationnel.amenagementTitre}
                      onChange={(val) => updateValue('operationnel.amenagementTitre', val)}
                      className="text-slate-800 font-bold"
                      inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 font-bold text-slate-800"
                      placeholder="Titre de l'aménagement"
                    />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {businessData.operationnel.zones.map((zone, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-lg relative">
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => removeItemFromArray('operationnel.zones', idx)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                            aria-label="Supprimer la zone"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="mb-2">
                          <EditableField
                            value={zone.nom}
                            onChange={(val) => updateZoneField(idx, 'nom', val)}
                            className="font-bold text-slate-800"
                            inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 font-bold text-slate-800"
                            placeholder="Nom de la zone"
                          />
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Surface :{' '}
                          <EditableField
                            value={zone.surface}
                            onChange={(val) => updateZoneField(idx, 'surface', val)}
                            className="inline-block"
                            inputClassName="w-24 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                            placeholder="Surface"
                          />
                        </p>
                        <EditableList
                          className="text-xs text-slate-700"
                          items={zone.equipements}
                          onUpdate={(items) => updateObjectInArray('operationnel.zones', idx, 'equipements', items)}
                          addLabel="Ajouter un équipement"
                        />
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => addItemToArray('operationnel.zones', { nom: '', surface: '', equipements: [''] })}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter une zone
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Fournisseurs et approvisionnement</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-2">Produits locaux (40%)</p>
                      <EditableList
                        items={businessData.operationnel.fournisseurs.locaux}
                        onUpdate={(items) => updateValue('operationnel.fournisseurs.locaux', items)}
                        className="text-sm text-slate-700"
                        addLabel="Ajouter un fournisseur local"
                      />
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="font-bold text-red-800 mb-2">Produits japonais (30%)</p>
                      <EditableList
                        items={businessData.operationnel.fournisseurs.japonais}
                        onUpdate={(items) => updateValue('operationnel.fournisseurs.japonais', items)}
                        className="text-sm text-slate-700"
                        addLabel="Ajouter un fournisseur japonais"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-2">Produits courants (30%)</p>
                      <EditableList
                        items={businessData.operationnel.fournisseurs.courants}
                        onUpdate={(items) => updateValue('operationnel.fournisseurs.courants', items)}
                        className="text-sm text-slate-700"
                        addLabel="Ajouter un fournisseur service"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Outils et équipements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(businessData.operationnel.equipements).map(([cat, items]) => (
                      <div key={cat} className="bg-white border-2 border-slate-200 p-3 rounded-lg">
                        <p className="font-medium text-slate-800 mb-2 capitalize">{cat}</p>
                        <EditableList
                          items={items}
                          onUpdate={(updated) => updateValue(`operationnel.equipements.${cat}`, updated)}
                          className="text-sm text-slate-700"
                          addLabel="Ajouter un équipement"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION FINANCIER */}
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
                          <th className="p-3 text-right">Jours</th>
                          <th className="p-3 text-right">CA annuel</th>
                          <th className="p-3 text-right">Croissance</th>
                          {editMode && <th className="p-3 text-left w-24">Actions</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {businessData.previsions.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3 font-bold">An {row.an}</td>
                            <td className="p-3 text-right">
                              <EditableField
                                value={row.clients}
                                onChange={(val) => updatePrevision(idx, 'clients', val)}
                                className="block text-right"
                                inputClassName="w-20 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                type="number"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-3 text-right">
                              <EditableField
                                value={row.panier}
                                onChange={(val) => updatePrevision(idx, 'panier', val)}
                                className="block text-right"
                                inputClassName="w-24 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                type="number"
                                placeholder="0"
                              /> XPF
                            </td>
                            <td className="p-3 text-right">
                              <EditableField
                                value={row.jours}
                                onChange={(val) => updatePrevision(idx, 'jours', val)}
                                className="block text-right"
                                inputClassName="w-20 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                type="number"
                                placeholder="0"
                              />
                            </td>
                            <td className="p-3 text-right font-bold text-green-600">
                              <EditableField
                                value={row.ca}
                                onChange={(val) => updatePrevision(idx, 'ca', val)}
                                className="block text-right text-green-700"
                                inputClassName="w-32 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                placeholder="0"
                              /> XPF
                            </td>
                            <td className="p-3 text-right text-blue-600">
                              <EditableField
                                value={row.croissance}
                                onChange={(val) => updatePrevision(idx, 'croissance', val)}
                                className="block text-right text-blue-600"
                                inputClassName="w-24 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                placeholder="0%"
                              />
                            </td>
                            {editMode && (
                              <td className="p-3">
                                <button
                                  type="button"
                                  onClick={() => removePrevisionRow(idx)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  Supprimer
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {editMode && (
                      <button
                        type="button"
                        onClick={addPrevisionRow}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Ajouter une prévision
                      </button>
                    )}
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
                          <td className="p-3">CA</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right">{(cr.ca / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3">Approvisionnement</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-red-600">{(cr.appro / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3">Loyer</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-red-600">{(cr.loyer / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3">Salaires gérants</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-red-600">{(cr.salairesG / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="p-3">Salaire employé</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-red-600">{(cr.salaire / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="p-3">Électricité/eau</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-red-600">{(cr.elec / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                        <tr className="bg-green-100 font-bold text-lg">
                          <td className="p-3">RÉSULTAT NET</td>
                          {businessData.compteResultat.map((cr, idx) => (
                            <td key={idx} className="p-3 text-right text-green-700">{(cr.resultat / 1000000).toFixed(1)}M</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Plan de financement</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="font-bold text-red-800 mb-3">Besoins de démarrage</p>
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          {businessData.financement.besoins.map((b, idx) => (
                            <tr key={idx}>
                              <td className="py-2">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={b.poste}
                                    onChange={(e) => {
                                      const newB = [...businessData.financement.besoins];
                                      newB[idx].poste = e.target.value;
                                      updateValue('financement.besoins', newB);
                                    }}
                                    className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                                  />
                                ) : b.poste}
                              </td>
                              <td className="py-2 text-right">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={b.montant}
                                    onChange={(e) => {
                                      const newB = [...businessData.financement.besoins];
                                      newB[idx].montant = e.target.value;
                                      updateValue('financement.besoins', newB);
                                    }}
                                    className="w-32 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                  />
                                ) : b.montant} XPF
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-red-100 font-bold">
                            <td className="py-2">TOTAL</td>
                            <td className="py-2 text-right">6 000 000 XPF</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">Ressources</p>
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          {businessData.financement.ressources.map((r, idx) => (
                            <tr key={idx}>
                              <td className="py-2">{r.source}</td>
                              <td className="py-2 text-right">{r.montant} XPF</td>
                              <td className="py-2 text-right text-slate-600">{r.pct}</td>
                            </tr>
                          ))}
                          <tr className="bg-green-100 font-bold">
                            <td className="py-2">TOTAL</td>
                            <td className="py-2 text-right">6 000 000 XPF</td>
                            <td className="py-2 text-right">100%</td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="mt-4 bg-white p-3 rounded">
                        <p className="text-sm font-bold text-slate-800">Remboursement emprunt</p>
                        <ul className="text-xs text-slate-700 mt-2 space-y-1">
                          <li>• Durée : {businessData.financement.emprunt.duree}</li>
                          <li>• Taux : {businessData.financement.emprunt.taux}</li>
                          <li>• Mensualité : {businessData.financement.emprunt.mensualite}</li>
                          <li>• Différé : {businessData.financement.emprunt.differe}</li>
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
                          <li>• Charges fixes : <span className="font-bold">6 200 000 XPF</span></li>
                          <li>• Marge variable : <span className="font-bold">50%</span></li>
                          <li>• Seuil : <span className="font-bold text-orange-600">12 400 000 XPF/an</span></li>
                          <li>• Soit : <span className="font-bold text-orange-600">34 clients/jour à 900 XPF</span></li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-bold text-green-800 mb-2">✅ Objectif au-dessus du seuil</p>
                        <p className="text-sm text-slate-700">50 clients/jour = 147% du seuil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* SECTION KPIs */}
            {activeSection === 'kpis' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  VI. INDICATEURS DE PERFORMANCE (KPIs)
                </h2>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <p className="text-sm text-slate-700">
                    Les KPIs permettent de piloter l'activité au quotidien et d'anticiper les difficultés.
                  </p>
                  {editMode && (
                    <div className="mt-3 bg-blue-100 p-3 rounded">
                      <p className="text-sm font-bold text-blue-800">💡 Mode édition activé</p>
                    </div>
                  )}
                </div>

                {Object.entries(businessData.kpis).map(([category, kpis]) => {
                  const colors = {
                    commerciaux: { bg: 'blue', text: 'blue' },
                    operationnels: { bg: 'orange', text: 'orange' },
                    financiers: { bg: 'green', text: 'green' },
                    rh: { bg: 'purple', text: 'purple' },
                    marketing: { bg: 'pink', text: 'pink' }
                  };
                  const color = colors[category];
                  const icons = {
                    commerciaux: '📊',
                    operationnels: '⚙️',
                    financiers: '💰',
                    rh: '👥',
                    marketing: '📱'
                  };
                  
                  return (
                    <div key={category}>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 capitalize">
                        {icons[category]} {category}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className={`bg-${color.bg}-600 text-white`}>
                            <tr>
                              <th className="p-3 text-left">Indicateur</th>
                              <th className="p-3 text-center">Cible</th>
                              <th className="p-3 text-center">Fréquence</th>
                              <th className="p-3 text-center">Alerte</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {kpis.map((kpi, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : `bg-${color.bg}-50`}>
                                <td className="p-3">
                                  {editMode ? (
                                    <input
                                      type="text"
                                      value={kpi.nom}
                                      onChange={(e) => updateKPI(category, idx, 'nom', e.target.value)}
                                      className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                                    />
                                  ) : kpi.nom}
                                </td>
                                <td className="p-3 text-center text-green-600 font-bold">
                                  {editMode ? (
                                    <input
                                      type="text"
                                      value={kpi.cible}
                                      onChange={(e) => updateKPI(category, idx, 'cible', e.target.value)}
                                      className="w-32 mx-auto border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-center"
                                    />
                                  ) : kpi.cible}
                                </td>
                                <td className="p-3 text-center text-slate-600">
                                  {editMode ? (
                                    <input
                                      type="text"
                                      value={kpi.frequence}
                                      onChange={(e) => updateKPI(category, idx, 'frequence', e.target.value)}
                                      className="w-28 mx-auto border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-center"
                                    />
                                  ) : kpi.frequence}
                                </td>
                                <td className="p-3 text-center text-red-600 font-medium">
                                  {editMode ? (
                                    <input
                                      type="text"
                                      value={kpi.alerte}
                                      onChange={(e) => updateKPI(category, idx, 'alerte', e.target.value)}
                                      className="w-32 mx-auto border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-center"
                                    />
                                  ) : kpi.alerte}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="font-bold text-yellow-800 mb-2">📋 Outils de suivi</p>
                  <EditableList
                    items={businessData.outilsSuivi}
                    onUpdate={(items) => updateValue('outilsSuivi', items)}
                    className="text-sm text-slate-700"
                    addLabel="Ajouter un outil"
                  />
                </div>

                {editMode && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="font-bold text-green-800">✅ Sauvegarde automatique activée</p>
                  </div>
                )}
              </div>
            )}

            {/* SECTION JURIDIQUE */}
            {activeSection === 'juridique' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  VII. STRUCTURE JURIDIQUE & CONFORMITÉ
                </h2>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Forme juridique :{' '}
                    <EditableField
                      value={businessData.juridique.forme}
                      onChange={(val) => updateValue('juridique.forme', val)}
                      className="bg-transparent"
                    />
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">✅ Avantages</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.juridique.avantages}
                        onUpdate={(items) => updateValue('juridique.avantages', items)}
                        addLabel="Ajouter un avantage"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-3">Caractéristiques</p>
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.juridique.caracteristiques}
                        onUpdate={(items) => updateValue('juridique.caracteristiques', items)}
                        addLabel="Ajouter une caractéristique"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Régime fiscal et social</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="font-bold text-purple-800 mb-3">Fiscal</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        <li>• IS : {businessData.juridique.fiscal.is}</li>
                        <li>• TVA : {businessData.juridique.fiscal.tva}</li>
                        <li>• Patente : {businessData.juridique.fiscal.patente}</li>
                        <li>• Déclaration : {businessData.juridique.fiscal.declaration}</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-bold text-orange-800 mb-3">Social</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        <li>• Gérants : {businessData.juridique.social.gerants}</li>
                        <li>• CPS : {businessData.juridique.social.cps}</li>
                        <li>• Cotisation min : {businessData.juridique.social.cotisationMin}</li>
                        <li>• Plancher : {businessData.juridique.social.plancher}</li>
                        <li>• Déclaration : {businessData.juridique.social.declaration}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Timeline de création</h3>
                  <div className="space-y-4">
                    {businessData.juridique.timeline.map((phase, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 bg-slate-50 p-4 rounded relative">
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => removeTimelinePhase(idx)}
                            className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                            aria-label="Supprimer la phase"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-slate-800 text-lg">
                              <EditableField
                                value={phase.phase}
                                onChange={(val) => updateTimelinePhase(idx, 'phase', val)}
                              />
                            </p>
                            <p className="text-sm text-slate-600">
                              Durée :{' '}
                              <EditableField
                                value={phase.duree}
                                onChange={(val) => updateTimelinePhase(idx, 'duree', val)}
                                className="font-medium"
                              />
                            </p>
                          </div>
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Phase {idx + 1}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {phase.taches.map((tache, tIdx) => (
                            <div key={tIdx} className="bg-white p-2 rounded text-sm text-slate-700 flex items-start gap-2">
                              <span>☐</span>
                              {editMode ? (
                                <div className="flex-1 flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={tache}
                                    onChange={(e) => updateTimelineTask(idx, tIdx, e.target.value)}
                                    className="flex-1 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeTimelineTask(idx, tIdx)}
                                    className="text-red-400 hover:text-red-600"
                                    aria-label="Supprimer la tâche"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <span>{tache}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => addTimelineTask(idx)}
                            className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <PlusCircle className="w-4 h-4" />
                            Ajouter une tâche
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={addTimelinePhase}
                      className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Ajouter une phase
                    </button>
                  )}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-bold text-blue-800 mb-2">📞 Contacts CCISM</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                    <div>
                      <p className="font-medium">Centre Formalités</p>
                      <p>Tél : 40 47 27 47</p>
                      <p>Email : cdfe@ccism.pf</p>
                    </div>
                    <div>
                      <p className="font-medium">Assistance juridique</p>
                      <p>Tél : 40 47 27 30</p>
                      <p>Email : juridique@ccism.pf</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-bold text-green-800 mb-2">💡 Aides disponibles</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                    <div>
                      <p className="font-medium">Initiative PF</p>
                      <p>Prêt 500K-2,5M XPF à 0%</p>
                      <p>Tél : 40 57 09 19</p>
                    </div>
                    <div>
                      <p className="font-medium">AEPE</p>
                      <p>50% dépenses, max 3M XPF</p>
                      <p>DGAE : 40 50 97 97</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONCLUSION */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl shadow-xl p-8 mt-6">
            <h2 className="text-3xl font-bold mb-6">CONCLUSION</h2>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4">
                <EditableField
                  value={businessData.conclusion.introductionTitre}
                  onChange={(val) => updateValue('conclusion.introductionTitre', val)}
                  className="bg-transparent text-white"
                />
              </h3>
              <p className="text-white/90 leading-relaxed">
                <EditableField
                  value={businessData.conclusion.introductionTexte}
                  onChange={(val) => updateValue('conclusion.introductionTexte', val)}
                  className="bg-transparent text-white"
                />
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-3">✅ Points forts</h4>
                <EditableList
                  items={businessData.conclusion.pointsForts}
                  onUpdate={(items) => updateValue('conclusion.pointsForts', items)}
                  className="text-sm text-white/90"
                  addLabel="Ajouter un point fort"
                />
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-3">🔑 Facteurs clés</h4>
                <EditableList
                  items={businessData.conclusion.facteursCles}
                  onUpdate={(items) => updateValue('conclusion.facteursCles', items)}
                  className="text-sm text-white/90"
                  addLabel="Ajouter un facteur"
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
              <h4 className="font-bold text-xl mb-4">🎯 Vision long terme</h4>
              <div className="space-y-3 text-white/90">
                {businessData.conclusion.vision.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-bold">
                      <EditableField
                        value={item.horizon}
                        onChange={(val) => updateConclusionVision(idx, 'horizon', val)}
                        className="text-white"
                        inputClassName="border-2 border-white/60 bg-white/10 text-white rounded px-2 py-1"
                        placeholder="Horizon"
                      />
                    </span>
                    <span className="flex-1">
                      <EditableField
                        value={item.detail}
                        onChange={(val) => updateConclusionVision(idx, 'detail', val)}
                        className="block"
                        inputClassName="w-full border-2 border-white/60 bg-white/10 text-white rounded px-2 py-1"
                        placeholder="Détail"
                      />
                    </span>
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => removeVisionItem(idx)}
                        className="text-white/70 hover:text-red-200"
                        aria-label="Supprimer l'étape"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editMode && (
                <button
                  type="button"
                  onClick={addVisionItem}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
                >
                  <PlusCircle className="w-4 h-4" />
                  Ajouter une étape de vision
                </button>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-bold text-xl mb-4">💚 Engagement</h4>
              <EditableList
                items={businessData.conclusion.engagement}
                onUpdate={(items) => updateValue('conclusion.engagement', items)}
                className="text-sm text-white/90"
                addLabel="Ajouter un engagement"
              />
            </div>

            <div className="text-center pt-6 border-t-2 border-white/30">
              <p className="text-3xl font-bold mb-2">{businessData.nomEntreprise}</p>
              <p className="text-xl italic mb-4">
                <EditableField
                  value={businessData.conclusion.signatureSlogan}
                  onChange={(val) => updateValue('conclusion.signatureSlogan', val)}
                  className="bg-transparent text-white text-center"
                />
              </p>
              <p className="text-sm text-white/80">
                <EditableField
                  value={businessData.conclusion.signatureMessage}
                  onChange={(val) => updateValue('conclusion.signatureMessage', val)}
                  className="bg-transparent text-white text-center"
                />
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-6 mt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-slate-300">
                  <EditableField
                    value={businessData.footer.note}
                    onChange={(val) => updateValue('footer.note', val)}
                    className="text-sm text-slate-300"
                    inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-white/10 text-white"
                    placeholder="Note de bas de page"
                  />
                </p>
                <p className="text-lg font-bold">
                  <EditableField
                    value={businessData.footer.reference}
                    onChange={(val) => updateValue('footer.reference', val)}
                    className="text-lg font-bold text-white"
                    inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-white/10 text-white font-bold"
                    placeholder="Référence"
                  />
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">
                  <EditableField
                    value={businessData.footer.versionLabel}
                    onChange={(val) => updateValue('footer.versionLabel', val)}
                    className="text-sm text-slate-300"
                    inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-white/10 text-white"
                    placeholder="Libellé de version"
                  />
                </p>
                <p className="text-2xl font-bold text-red-400">
                  <EditableField
                    value={businessData.footer.versionName}
                    onChange={(val) => updateValue('footer.versionName', val)}
                    className="text-2xl font-bold text-red-400"
                    inputClassName="w-full border-2 border-red-400 rounded px-2 py-1 bg-red-500/20 text-white font-bold text-center"
                    placeholder="Nom de version"
                  />
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  <EditableField
                    value={businessData.footer.versionDetails}
                    onChange={(val) => updateValue('footer.versionDetails', val)}
                    className="text-xs text-slate-300"
                    inputClassName="w-full border-2 border-blue-400 rounded px-2 py-1 bg-white/10 text-white"
                    placeholder="Détails"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;
