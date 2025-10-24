import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, DollarSign, Target, AlertCircle, CheckCircle, Edit2, Save, X, Download, RotateCcw, Plus, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, DollarSign, Target, AlertCircle, CheckCircle, Edit2, Save, X, Download, RotateCcw, Plus, Trash2, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TiakaBusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('presentation');
  const [editMode, setEditMode] = useState(false);

  // État initial avec TOUTES les données éditables
  const [businessData, setBusinessData] = useState(() => {
    const saved = localStorage.getItem('tiakaBusinessPlan');
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      general: {
        nom: 'TIAKA',
        sousTitre: 'Le premier Konbini Franco-Tahitien',
        ouverture: 'Fin 2026',
        lieu: 'Papeete, Tahiti',
        surface: '100 m²',
        horaires: '6h30 à 22h',
        jours: '7j/7',
      },
      presentation: {
        tiaSignification: 'Dérivé de "Tiare", fleur emblématique de Tahiti',
        tiaSymbole: 'Symbole de pureté, beauté et accueil',
        kaSignification: 'Inspiré de "Kairos", mot grec ancien',
        kaSymbole: 'Le moment parfait, l\'instant opportun',
        contexte: [
          'Premier konbini franco-tahitien à Papeete',
          'Concept inspiré des convenience stores japonais',
          'Réponse à un besoin identifié : absence de commerce de proximité moderne',
          'Combinaison praticité japonaise + authenticité polynésienne'
        ],
        valeurs: ['Proximité', 'Qualité', 'Authenticité', 'Modernité', 'Accessibilité'],
      },
      objectifs: {
        courtTerme: {
          titre: 'Court terme (Année 1)',
          items: [
            '50 clients/jour en moyenne',
            'CA de 16,2 millions XPF',
            'Notoriété locale solide',
            'Clientèle fidèle'
          ]
        },
        moyenTerme: {
          titre: 'Moyen terme (Années 2-3)',
          items: [
            '60-65 clients/jour',
            'Diversification de l\'offre',
            'Équipe stable recrutée',
            'Rentabilité optimale'
          ]
        },
        longTerme: {
          titre: 'Long terme (Années 4-5)',
          items: [
            'Position de leader konbini',
            'Second point de vente',
            'Service Click & Collect'
          ]
        }
      },
      marche: {
        demographie: {
          titre: 'Démographie',
          items: [
            '26 000 habitants',
            '+ milliers de travailleurs quotidiens',
            'Population jeune et active',
            'Forte proportion d\'étudiants',
            'Secteur tertiaire développé',
            'Flux touristiques réguliers'
          ]
        },
        habitudes: {
          titre: 'Habitudes de consommation',
          items: [
            'Recherche de praticité et rapidité',
            'Appétence produits étrangers (japonais)',
            'Attachement aux produits locaux',
            'Sensibilité horaires étendus',
            'Vie urbaine active'
          ]
        },
        concurrence: [
          {
            type: 'Supérettes',
            forces: 'Large assortiment, marques connues',
            faiblesses: 'Horaires limités, ambiance froide',
            impact: 'Faible - clientèle différente'
          },
          {
            type: 'Épiceries quartier',
            forces: 'Proximité, relation client',
            faiblesses: 'Offre limitée, pas de modernité',
            impact: 'Faible - positionnement différent'
          },
          {
            type: 'Stations-service',
            forces: 'Ouverture tardive, accessibilité voiture',
            faiblesses: 'Prix élevés, offre basique',
            impact: 'Moyen - concurrence horaires'
          }
        ],
        avantages: [
          'Ouverture continue 6h30-22h, 7j/7',
          'Concept unique fusion culturelle',
          'Espace consommation sur place',
          'Design moderne accueillant',
          'Mix produits introuvable',
          'Services pratiques intégrés'
        ],
        segments: [
          {
            nom: 'Étudiants/jeunes actifs 25-35 ans',
            part: '40%',
            frequence: 'Quotidienne',
            panier: '800-1200 XPF',
            besoins: 'Snacks rapides, boissons, produits japonais'
          },
          {
            nom: 'Travailleurs en pause 30-50 ans',
            part: '30%',
            frequence: 'Hebdomadaire',
            panier: '1000-1500 XPF',
            besoins: 'Repas midi, café, dépannage'
          },
          {
            nom: 'Familles locales',
            part: '20%',
            frequence: '2-3x/semaine',
            panier: '1200-1800 XPF',
            besoins: 'Courses appoint, produits frais'
          },
          {
            nom: 'Touristes',
            part: '10%',
            frequence: 'Ponctuelle',
            panier: '1500-2500 XPF',
            besoins: 'Découverte produits, souvenirs'
          }
        ]
      },
      strategie: {
        positionnement: {
          titre: 'TIAKA se positionne comme LE konbini franco-tahitien',
          axes: [
            { nom: 'Praticité', description: 'Horaires étendus, central, service rapide' },
            { nom: 'Authenticité', description: 'Double culture Tahiti + Japon' },
            { nom: 'Modernité', description: 'Design, outils digitaux' },
            { nom: 'Accessibilité', description: 'Prix justes, ambiance accueillante' }
          ],
          promesse: 'Chez TIAKA, trouvez tout ce dont vous avez besoin, au bon moment, dans une ambiance chaleureuse qui mêle modernité japonaise et authenticité tahitienne.'
        },
        prix: [
          { categorie: 'Produits de base', positionnement: 'Prix compétitifs', justification: 'Produits d\'appel, fidélisation' },
          { categorie: 'Produits japonais', positionnement: 'Prix moyen-haut', justification: 'Exclusivité, importation' },
          { categorie: 'Produits locaux', positionnement: 'Prix raisonnables', justification: 'Soutien producteurs, qualité' },
          { categorie: 'Plats préparés', positionnement: '500-1000 XPF', justification: 'Praticité, fait maison' },
          { categorie: 'Services', positionnement: 'Tarifs fixes modestes', justification: 'Fidélisation, service' }
        ],
        panierMoyen: '900 XPF',
        communication: {
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
        }
      },
      operationnel: {
        rh: {
          annee1: {
            titre: 'Année 1 : Gestion en binôme',
            gerant1: 'Approvisionnement, logistique, comptabilité',
            gerant2: 'Vente, accueil client, communication',
            planning: [
              'Ouverture : 6h30-22h (15h30/jour)',
              'Rotation : 2 shifts de 8h avec chevauchement midi',
              '1 jour fermeture/semaine par personne (roulement)'
            ]
          },
          annee2: {
            titre: 'Année 2 : Recrutement employé',
            profil: 'Accueil client, caisse, mise en rayon',
            contrat: 'CDI temps partiel évolutif',
            formation: 'Formation interne : 2 semaines'
          }
        },
        amenagement: {
          zone1: {
            nom: 'Zone 1 : Alimentation & Snacking',
            surface: '40 m²',
            elements: [
              'Rayonnages muraux produits secs',
              'Réfrigérateurs boissons verticaux (3 unités)',
              'Congélateurs produits surgelés (2 unités)',
              'Présentoir fruits frais'
            ]
          },
          zone2: {
            nom: 'Zone 2 : Produits Japonais & Locaux',
            surface: '25 m²',
            elements: [
              'Étagères centrales (circulation facile)',
              'Mise en scène produits (ambiance japonaise)',
              'Corner produits polynésiens valorisés'
            ]
          },
          zone3: {
            nom: 'Zone 3 : Services & Consommation',
            surface: '25 m²',
            elements: [
              'Comptoir caisse moderne',
              'Tables hautes et chaises contre baies vitrées (8 places)',
              'Micro-ondes en libre-service',
              'Borne recharge/impression'
            ]
          },
          zone4: {
            nom: 'Zone 4 : Arrière-boutique',
            surface: '10 m²',
            elements: [
              'Stockage réserve',
              'Bureau gestion',
              'Vestiaires employés'
            ]
          },
          ambiance: [
            'Éclairage LED chaleureux',
            'Parquet bois clair',
            'Murs blancs épurés',
            'Touches décoratives japonaises et tahitiennes'
          ]
        },
        fournisseurs: {
          locaux: {
            titre: 'Produits locaux (40%)',
            items: [
              'Fruits/légumes : Marché Papeete',
              'Boissons : Brasseries/jus locaux',
              'Artisanat : Coopératives'
            ]
          },
          japonais: {
            titre: 'Produits japonais (30%)',
            items: [
              'Importateur spécialisé PF',
              'Commande directe Japon',
              'Fréquence : trimestrielle'
            ]
          },
          courants: {
            titre: 'Produits courants (30%)',
            items: [
              'Grossistes alimentaires Tahiti',
              'Centrale d\'achat locale'
            ]
          },
          strategie: [
            'Stock tampon : 2 semaines de vente',
            'Rotation rapide produits frais',
            'Gestion informatisée (logiciel caisse avec suivi stock)',
            'Réapprovisionnement hebdomadaire'
          ]
        },
        equipements: {
          vente: [
            'Caisse enregistreuse tactile',
            'Terminal paiement CB',
            'Balance électronique',
            'Scanner code-barres'
          ],
          conservation: [
            '3 réfrigérateurs vitrines (300L)',
            '2 congélateurs coffres (200L)',
            '1 réfrigérateur produits frais'
          ],
          mobilier: [
            'Rayonnages modulables (20m linéaires)',
            'Étagères centrales',
            '4 tables hautes + 8 tabourets',
            'Comptoir caisse'
          ],
          digital: [
            'Logiciel caisse avec gestion stock',
            'Ordinateur de gestion',
            'Internet professionnel',
            'Caméras surveillance (2)'
          ]
        }
      },
      financier: {
        projections: [
          { an: 1, clients: 50, panier: 900, jours: 360, ca: '16 200 000', croissance: '-' },
          { an: 2, clients: 55, panier: 950, jours: 360, ca: '18 810 000', croissance: '+16%' },
          { an: 3, clients: 60, panier: 1000, jours: 360, ca: '21 600 000', croissance: '+15%' },
          { an: 4, clients: 65, panier: 1050, jours: 360, ca: '24 570 000', croissance: '+14%' },
          { an: 5, clients: 70, panier: 1100, jours: 360, ca: '27 720 000', croissance: '+13%' },
        ],
        chargesAnnuelles: [
          { poste: 'Approvisionnement (50%)', an1: 8100000, an2: 9405000, an3: 10800000, an4: 12285000, an5: 13860000 },
          { poste: 'Loyer', an1: 2400000, an2: 2400000, an3: 2400000, an4: 2400000, an5: 2400000 },
          { poste: 'Salaires gérants', an1: 2400000, an2: 2400000, an3: 2400000, an4: 2400000, an5: 2400000 },
          { poste: 'Salaire employé', an1: 0, an2: 1800000, an3: 1800000, an4: 1800000, an5: 1800000 },
          { poste: 'Électricité/eau', an1: 600000, an2: 600000, an3: 600000, an4: 600000, an5: 600000 },
          { poste: 'Marketing/enseigne', an1: 200000, an2: 100000, an3: 100000, an4: 100000, an5: 100000 },
          { poste: 'Divers/imprévus', an1: 600000, an2: 600000, an3: 600000, an4: 600000, an5: 600000 },
        ],
        financement: {
          besoins: [
            { poste: 'Travaux et aménagement', montant: 1500000 },
            { poste: 'Équipements', montant: 1500000 },
            { poste: 'Stock initial', montant: 1200000 },
            { poste: 'Enseigne et communication', montant: 500000 },
            { poste: 'Trésorerie de sécurité (3 mois)', montant: 1000000 },
            { poste: 'Frais administratifs', montant: 300000 }
          ],
          ressources: [
            { source: 'Apport personnel', montant: 300000, pourcentage: '5%' },
            { source: 'Emprunt bancaire', montant: 5200000, pourcentage: '87%' },
            { source: 'Aides/subventions', montant: 500000, pourcentage: '8%' }
          ],
          emprunt: {
            duree: '5 ans',
            taux: '4,5%',
            mensualite: '~95 000 XPF',
            differe: '6 mois (intérêts uniquement)'
          }
        },
        seuilRentabilite: {
          chargesFixes: '6 200 000 XPF',
          marge: '50%',
          seuil: '12 400 000 XPF/an',
          clientsJour: '34 clients/jour à 900 XPF'
        }
      },
      kpis: {
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
      },
      juridique: {
        forme: {
          type: 'SARL',
          capital: '300 000 XPF',
          associes: '2 associés gérants égalitaires (50/50)',
          siege: 'Adresse du local à Papeete',
          duree: '99 ans'
        },
        fiscal: {
          regime: 'IS (Impôt sur les Sociétés)',
          taux: '27%',
          declaration: 'Annuelle à la DICP',
          dateLimit: '30/04 (si clôture 31/12)'
        },
        social: {
          regime: 'TNS (Travailleurs Non-Salariés)',
          tauxMaladie: '9,84%',
          cotisationMin: '7 523 XPF/mois',
          plancher: '76 457 XPF',
          declaration: 'Annuelle avant 31/03'
        },
        tva: {
          regime: 'Régime réel mensuel',
          taux: ['16% : produits manufacturés', '13% : prestations de services', '5% : taux réduit certains produits'],
          declarations: 'Mensuelle avant le 15 de chaque mois'
        },
        timeline: [
          {
            phase: 'Préparation',
            duree: '3-6 mois',
            taches: ['Finalisation business plan', 'Recherche local', 'Étude concurrence', 'Contacts fournisseurs', 'RDV banque']
          },
          {
            phase: 'Formalités',
            duree: '1-2 mois',
            taches: ['Constitution SARL', 'Immatriculation RCS', 'Obtention N° TAHITI', 'Compte bancaire pro', 'Assurances', 'Signature bail']
          },
          {
            phase: 'Aménagement',
            duree: '2-3 mois',
            taches: ['Travaux', 'Installation équipements', 'Pose enseigne', 'Décoration', 'Tests techniques']
          },
          {
            phase: 'Lancement',
            duree: '1 mois',
            taches: ['Stock initial', 'Paramétrage caisse', 'Communication', 'Formation', 'Inauguration']
          }
        ]
      }
    };
  });

  const sections = [
    { id: 'presentation', title: 'I. PRÉSENTATION DU PROJET', icon: Target },
    { id: 'marche', title: 'II. ÉTUDE DE MARCHÉ', icon: Users },
    { id: 'strategie', title: 'III. STRATÉGIE COMMERCIALE', icon: TrendingUp },
    { id: 'operationnel', title: 'IV. PLAN OPÉRATIONNEL', icon: CheckCircle },
    { id: 'financier', title: 'V. PRÉVISIONS FINANCIÈRES', icon: DollarSign },
    { id: 'kpis', title: 'VI. INDICATEURS DE PERFORMANCE', icon: AlertCircle },
    { id: 'juridique', title: 'VII. STRUCTURE JURIDIQUE', icon: CheckCircle },
  ];

  // Sauvegarder automatiquement
  useEffect(() => {
    localStorage.setItem('tiakaBusinessPlan', JSON.stringify(businessData));
  }, [businessData]);

  // Fonctions d'édition
  const handleEdit = (path, value) => {
    const keys = path.split('.');
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayEdit = (path, index, value) => {
    const keys = path.split('.');
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          current[keys[i]][index] = value;
        } else {
          current = current[keys[i]];
        }
      }
      
      return newData;
    });
  };

  const handleArrayAdd = (path, defaultValue) => {
    const keys = path.split('.');
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]].push(defaultValue);
      return newData;
    });
  };

  const handleArrayRemove = (path, index) => {
    const keys = path.split('.');
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]].splice(index, 1);
      return newData;
    });
  };

  const handleKpiEdit = (category, index, field, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.kpis[category][index][field] = value;
      return newData;
    });
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      localStorage.removeItem('tiakaBusinessPlan');
      window.location.reload();
    }
  };

  const handleExport = () => {
    const handleExportPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);

    // Fonction helper pour ajouter une nouvelle page si nécessaire
    const checkPageBreak = (neededSpace = 10) => {
      if (yPos + neededSpace > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    // Fonction pour ajouter du texte avec retour à la ligne automatique
    const addText = (text, fontSize = 10, fontStyle = 'normal', color = [0, 0, 0]) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', fontStyle);
      doc.setTextColor(...color);
      
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        checkPageBreak();
        doc.text(line, margin, yPos);
        yPos += fontSize * 0.5;
      });
      yPos += 5;
    };

    // Fonction pour ajouter un titre de section
    const addSectionTitle = (title, color = [220, 38, 38]) => {
      checkPageBreak(15);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...color);
      doc.text(title, margin, yPos);
      yPos += 8;
      doc.setDrawColor(...color);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 10;
    };

    // Fonction pour ajouter un sous-titre
    const addSubTitle = (title) => {
      checkPageBreak(12);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 51, 51);
      doc.text(title, margin, yPos);
      yPos += 8;
    };

    // Page de garde
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, pageWidth, 80, 'F');
    
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(businessData.general.nom, pageWidth / 2, 35, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text(businessData.general.sousTitre, pageWidth / 2, 50, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Ouverture prévue : ${businessData.general.ouverture}`, pageWidth / 2, 65, { align: 'center' });

    yPos = 100;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Business Plan conforme aux recommandations', pageWidth / 2, yPos, { align: 'center' });
    doc.text('CCISM Polynésie française', pageWidth / 2, yPos + 5, { align: 'center' });

    yPos = pageHeight - 40;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPos, { align: 'center' });

    // Nouvelle page pour le sommaire
    doc.addPage();
    yPos = margin;
    
    addSectionTitle('SOMMAIRE', [220, 38, 38]);
    const sommaire = [
      'I. PRÉSENTATION DU PROJET',
      'II. ÉTUDE DE MARCHÉ',
      'III. STRATÉGIE COMMERCIALE & MARKETING',
      'IV. PLAN OPÉRATIONNEL',
      'V. PRÉVISIONS FINANCIÈRES 5 ANS',
      'VI. INDICATEURS DE PERFORMANCE (KPIs)',
      'VII. STRUCTURE JURIDIQUE & CONFORMITÉ'
    ];
    
    sommaire.forEach((item, idx) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 51, 51);
      doc.text(`${item}`, margin + 5, yPos);
      doc.text(`${idx + 3}`, pageWidth - margin - 10, yPos, { align: 'right' });
      yPos += 10;
    });

    // SECTION I - PRÉSENTATION
    doc.addPage();
    yPos = margin;
    addSectionTitle('I. PRÉSENTATION DU PROJET');
    
    addSubTitle('Signification du nom TIAKA');
    addText(`TIA : ${businessData.presentation.tiaSignification}`, 10, 'normal');
    addText(`${businessData.presentation.tiaSymbole}`, 9, 'italic', [100, 100, 100]);
    addText(`KA : ${businessData.presentation.kaSignification}`, 10, 'normal');
    addText(`${businessData.presentation.kaSymbole}`, 9, 'italic', [100, 100, 100]);
    addText('= "La fleur du moment parfait"', 11, 'bold', [220, 38, 38]);

    addSubTitle('Contexte et genèse');
    businessData.presentation.contexte.forEach(item => {
      addText(`• ${item}`, 10);
    });

    addSubTitle('Informations générales');
    addText(`Surface : ${businessData.general.surface}`, 10);
    addText(`Horaires : ${businessData.general.horaires}, ${businessData.general.jours}`, 10);
    addText(`Lieu : ${businessData.general.lieu}`, 10);

    addSubTitle('Valeurs fondamentales');
    addText(businessData.presentation.valeurs.join(' • '), 10, 'bold', [220, 38, 38]);

    // Objectifs
    checkPageBreak(40);
    addSubTitle('Objectifs stratégiques');
    
    ['courtTerme', 'moyenTerme', 'longTerme'].forEach(terme => {
      checkPageBreak(30);
      addText(businessData.objectifs[terme].titre, 11, 'bold');
      businessData.objectifs[terme].items.forEach(item => {
        addText(`• ${item}`, 9);
      });
    });

    // SECTION II - MARCHÉ
    doc.addPage();
    yPos = margin;
    addSectionTitle('II. ÉTUDE DE MARCHÉ');

    addSubTitle('Le marché de Papeete');
    addText('Démographie', 10, 'bold');
    businessData.marche.demographie.items.forEach(item => {
      addText(`• ${item}`, 9);
    });

    checkPageBreak(30);
    addText('Habitudes de consommation', 10, 'bold');
    businessData.marche.habitudes.items.forEach(item => {
      addText(`• ${item}`, 9);
    });

    // Concurrence
    checkPageBreak(50);
    addSubTitle('Analyse de la concurrence');
    
    const concurrenceData = businessData.marche.concurrence.map(c => [
      c.type, 
      c.forces, 
      c.faiblesses, 
      c.impact
    ]);

    doc.autoTable({
      startY: yPos,
      head: [['Type', 'Forces', 'Faiblesses', 'Impact TIAKA']],
      body: concurrenceData,
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 3 }
    });
    yPos = doc.lastAutoTable.finalY + 10;

    // Avantages compétitifs
    checkPageBreak(30);
    addSubTitle('Avantages compétitifs TIAKA');
    businessData.marche.avantages.forEach(avantage => {
      addText(`✓ ${avantage}`, 9, 'normal', [34, 139, 34]);
    });

    // Clientèle cible
    doc.addPage();
    yPos = margin;
    addSubTitle('Clientèle cible');
    
    businessData.marche.segments.forEach(segment => {
      checkPageBreak(25);
      addText(`${segment.nom} (${segment.part})`, 10, 'bold');
      addText(`Fréquence : ${segment.frequence} | Panier : ${segment.panier}`, 9);
      addText(`Besoins : ${segment.besoins}`, 9, 'italic', [100, 100, 100]);
    });

    // SECTION III - STRATÉGIE
    doc.addPage();
    yPos = margin;
    addSectionTitle('III. STRATÉGIE COMMERCIALE & MARKETING');

    addSubTitle('Positionnement');
    addText(businessData.strategie.positionnement.titre, 11, 'bold', [220, 38, 38]);
    addText('Axes de positionnement :', 10, 'bold');
    businessData.strategie.positionnement.axes.forEach(axe => {
      addText(`• ${axe.nom} : ${axe.description}`, 9);
    });
    addText('Promesse client :', 10, 'bold');
    addText(`"${businessData.strategie.positionnement.promesse}"`, 9, 'italic');

    // Politique de prix
    checkPageBreak(50);
    addSubTitle('Politique de prix');
    
    const prixData = businessData.strategie.prix.map(p => [
      p.categorie,
      p.positionnement,
      p.justification
    ]);

    doc.autoTable({
      startY: yPos,
      head: [['Catégorie', 'Positionnement', 'Justification']],
      body: prixData,
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 3 }
    });
    yPos = doc.lastAutoTable.finalY + 10;

    addText(`Panier moyen cible : ${businessData.strategie.panierMoyen}`, 11, 'bold', [37, 99, 235]);

    // Communication
    doc.addPage();
    yPos = margin;
    addSubTitle('Stratégie de communication');
    
    addText('Phase 1 : Pré-ouverture', 10, 'bold');
    businessData.strategie.communication.preOuverture.forEach(item => {
      addText(`• ${item}`, 9);
    });

    addText('Phase 2 : Lancement', 10, 'bold');
    businessData.strategie.communication.lancement.forEach(item => {
      addText(`• ${item}`, 9);
    });

    addText('Phase 3 : Fidélisation', 10, 'bold');
    businessData.strategie.communication.fidelisation.forEach(item => {
      addText(`• ${item}`, 9);
    });

    // SECTION IV - OPÉRATIONNEL
    doc.addPage();
    yPos = margin;
    addSectionTitle('IV. PLAN OPÉRATIONNEL');

    addSubTitle('Organisation Ressources Humaines');
    addText(businessData.operationnel.rh.annee1.titre, 10, 'bold');
    addText(`Gérant 1 : ${businessData.operationnel.rh.annee1.gerant1}`, 9);
    addText(`Gérant 2 : ${businessData.operationnel.rh.annee1.gerant2}`, 9);
    
    addText(businessData.operationnel.rh.annee2.titre, 10, 'bold');
    addText(`Profil : ${businessData.operationnel.rh.annee2.profil}`, 9);
    addText(`Contrat : ${businessData.operationnel.rh.annee2.contrat}`, 9);

    // Aménagement
    checkPageBreak(40);
    addSubTitle('Aménagement du local');
    ['zone1', 'zone2', 'zone3', 'zone4'].forEach(zone => {
      checkPageBreak(20);
      addText(`${businessData.operationnel.amenagement[zone].nom} (${businessData.operationnel.amenagement[zone].surface})`, 10, 'bold');
      businessData.operationnel.amenagement[zone].elements.forEach(el => {
        addText(`• ${el}`, 8);
      });
    });

    // SECTION V - FINANCIER
    doc.addPage();
    yPos = margin;
    addSectionTitle('V. PRÉVISIONS FINANCIÈRES 5 ANS');

    addSubTitle('Hypothèses de projection');
    
    const projectionsData = businessData.financier.projections.map(p => [
      `An ${p.an}`,
      p.clients,
      `${p.panier} XPF`,
      p.jours,
      `${p.ca} XPF`,
      p.croissance
    ]);

    doc.autoTable({
      startY: yPos,
      head: [['Année', 'Clients/j', 'Panier', 'Jours', 'CA annuel', 'Croiss.']],
      body: projectionsData,
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2 }
    });
    yPos = doc.lastAutoTable.finalY + 15;

    // Compte de résultat
    checkPageBreak(60);
    addSubTitle('Compte de résultat prévisionnel (XPF)');
    
    const chargesData = [];
    
    // CA
    chargesData.push([
      'CHIFFRE D\'AFFAIRES',
      businessData.financier.projections[0].ca,
      businessData.financier.projections[1].ca,
      businessData.financier.projections[2].ca,
      businessData.financier.projections[3].ca,
      businessData.financier.projections[4].ca
    ]);

    // Charges
    businessData.financier.chargesAnnuelles.forEach(charge => {
      chargesData.push([
        charge.poste,
        charge.an1.toLocaleString(),
        charge.an2.toLocaleString(),
        charge.an3.toLocaleString(),
        charge.an4.toLocaleString(),
        charge.an5.toLocaleString()
      ]);
    });

    // Total charges
    const totaux = ['TOTAL CHARGES'];
    for (let i = 1; i <= 5; i++) {
      const total = businessData.financier.chargesAnnuelles.reduce((sum, c) => sum + c[`an${i}`], 0);
      totaux.push(total.toLocaleString());
    }
    chargesData.push(totaux);

    // Résultat
    const resultats = ['RÉSULTAT NET'];
    for (let i = 0; i < 5; i++) {
      const ca = parseInt(businessData.financier.projections[i].ca.replace(/\s/g, ''));
      const charges = businessData.financier.chargesAnnuelles.reduce((sum, c) => sum + c[`an${i + 1}`], 0);
      resultats.push((ca - charges).toLocaleString());
    }
    chargesData.push(resultats);

    doc.autoTable({
      startY: yPos,
      head: [['Poste', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5']],
      body: chargesData,
      theme: 'grid',
      headStyles: { fillColor: [51, 51, 51], textColor: 255 },
      margin: { left: margin, right: margin },
      styles: { fontSize: 7, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 }
      }
    });
    yPos = doc.lastAutoTable.finalY + 15;

    // Plan de financement
    doc.addPage();
    yPos = margin;
    addSubTitle('Plan de financement initial');

    addText('Besoins de démarrage', 10, 'bold');
    let totalBesoins = 0;
    businessData.financier.financement.besoins.forEach(b => {
      addText(`${b.poste} : ${b.montant.toLocaleString()} XPF`, 9);
      totalBesoins += b.montant;
    });
    addText(`TOTAL BESOINS : ${totalBesoins.toLocaleString()} XPF`, 11, 'bold', [220, 38, 38]);

    checkPageBreak(30);
    addText('Ressources de financement', 10, 'bold');
    let totalRessources = 0;
    businessData.financier.financement.ressources.forEach(r => {
      addText(`${r.source} : ${r.montant.toLocaleString()} XPF (${r.pourcentage})`, 9);
      totalRessources += r.montant;
    });
    addText(`TOTAL RESSOURCES : ${totalRessources.toLocaleString()} XPF`, 11, 'bold', [34, 139, 34]);

    // SECTION VI - KPIs
    doc.addPage();
    yPos = margin;
    addSectionTitle('VI. INDICATEURS DE PERFORMANCE (KPIs)');

    const kpiCategories = {
      commerciaux: '📊 KPIs Commerciaux',
      operationnels: '⚙️ KPIs Opérationnels',
      financiers: '💰 KPIs Financiers',
      rh: '👥 KPIs RH',
      marketing: '📱 KPIs Marketing'
    };

    Object.entries(businessData.kpis).forEach(([category, kpis]) => {
      checkPageBreak(40);
      addSubTitle(kpiCategories[category]);
      
      const kpiData = kpis.map(kpi => [
        kpi.nom,
        kpi.cible,
        kpi.frequence,
        kpi.alerte
      ]);

      doc.autoTable({
        startY: yPos,
        head: [['Indicateur', 'Cible', 'Fréquence', 'Alerte']],
        body: kpiData,
        theme: 'striped',
        headStyles: { fillColor: [220, 38, 38], textColor: 255 },
        margin: { left: margin, right: margin },
        styles: { fontSize: 7, cellPadding: 2 }
      });
      yPos = doc.lastAutoTable.finalY + 10;
    });

    // SECTION VII - JURIDIQUE
    doc.addPage();
    yPos = margin;
    addSectionTitle('VII. STRUCTURE JURIDIQUE & CONFORMITÉ');

    addSubTitle('Forme juridique');
    Object.entries(businessData.juridique.forme).forEach(([key, value]) => {
      const labels = {
        type: 'Type',
        capital: 'Capital social',
        associes: 'Associés',
        siege: 'Siège',
        duree: 'Durée'
      };
      addText(`${labels[key]} : ${value}`, 9);
    });

    checkPageBreak(30);
    addSubTitle('Régime fiscal');
    Object.entries(businessData.juridique.fiscal).forEach(([key, value]) => {
      const labels = {
        regime: 'Régime',
        taux: 'Taux',
        declaration: 'Déclaration',
        dateLimit: 'Date limite'
      };
      addText(`${labels[key]} : ${value}`, 9);
    });

    checkPageBreak(30);
    addSubTitle('Régime social');
    addText(`Régime : ${businessData.juridique.social.regime}`, 9);
    addText(`Taux maladie : ${businessData.juridique.social.tauxMaladie}`, 9);
    addText(`Cotisation min : ${businessData.juridique.social.cotisationMin}`, 9);
    addText(`Déclaration : ${businessData.juridique.social.declaration}`, 9);

    // Timeline
    doc.addPage();
    yPos = margin;
    addSubTitle('Timeline de création');
    
    businessData.juridique.timeline.forEach((phase, idx) => {
      checkPageBreak(25);
      addText(`Phase ${idx + 1} : ${phase.phase} (${phase.duree})`, 10, 'bold');
      phase.taches.forEach(tache => {
        addText(`☐ ${tache}`, 8);
      });
    });

    // Conclusion
    doc.addPage();
    yPos = margin;
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CONCLUSION', pageWidth / 2, 35, { align: 'center' });

    yPos = 80;
    doc.setTextColor(0, 0, 0);
    addSubTitle('Un projet solide et innovant');
    addText('TIAKA représente une opportunité unique d\'introduire le concept de konbini en Polynésie française, en l\'adaptant intelligemment au contexte local.');
    
    addText('Points forts du projet :', 10, 'bold');
    addText('• Marché porteur avec absence de concurrence directe', 9);
    addText('• Positionnement unique : fusion culturelle inédite', 9);
    addText('• Modèle économique viable : rentabilité dès l\'année 1', 9);
    addText('• Stratégie de communication maîtrisée', 9);

    checkPageBreak(30);
    addText('Vision à long terme :', 10, 'bold');
    addText('Année 3-5 : Consolidation position leader', 9);
    addText('Année 5-7 : Ouverture second point de vente', 9);
    addText('Année 7-10 : Développement marque, possible franchise', 9);

    // Footer final
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38);
    doc.text('TIAKA', pageWidth / 2, pageHeight - 30, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('"La fleur du moment parfait"', pageWidth / 2, pageHeight - 20, { align: 'center' });

    // Sauvegarder le PDF
    doc.save(`TIAKA-Business-Plan-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Composant champ éditable simple
  const EditableText = ({ value, onChange, className = '', multiline = false }) => {
    if (!editMode) {
      return <span className={className}>{value}</span>;
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} w-full px-3 py-2 border-2 border-blue-400 rounded-lg focus:border-blue-600 focus:outline-none bg-yellow-50`}
          rows={3}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} px-3 py-2 border-2 border-blue-400 rounded-lg focus:border-blue-600 focus:outline-none bg-yellow-50`}
      />
    );
  };

  // Composant liste éditable
  const EditableList = ({ items, path, title }) => {
    return (
      <div className="space-y-2">
        {title && <p className="font-bold text-slate-800 mb-2">{title}</p>}
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-slate-700">•</span>
              <EditableText
                value={item}
                onChange={(val) => handleArrayEdit(path, idx, val)}
                className="flex-1 text-sm text-slate-700"
              />
              {editMode && items.length > 1 && (
                <button
                  onClick={() => handleArrayRemove(path, idx)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
        {editMode && (
          <button
            onClick={() => handleArrayAdd(path, 'Nouveau point')}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 mt-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un point
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Barre d'outils */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  editMode
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {editMode ? (
                  <>
                    <Save className="w-5 h-5" />
                    Mode Édition ACTIVÉ ✓
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Activer Mode Édition
                  </>
                )}
              </button>
              
              {editMode && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 px-3 py-2 rounded">
                  <p className="text-sm text-yellow-800 font-medium">
                    💡 Mode édition actif - Tous les champs sont modifiables. Sauvegarde automatique !
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                <FileText className="w-5 h-5" />
                Exporter PDF
              </button>
              
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
              >
                <Download className="w-5 h-5" />
                Exporter JSON
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                <EditableText
                  value={businessData.general.nom}
                  onChange={(val) => handleEdit('general.nom', val)}
                  className="text-4xl font-bold"
                />
              </h1>
              <p className="text-xl text-slate-600 italic">
                <EditableText
                  value={businessData.general.sousTitre}
                  onChange={(val) => handleEdit('general.sousTitre', val)}
                  className="text-xl"
                />
              </p>
              <p className="text-sm text-slate-500 mt-2">Business Plan conforme aux recommandations CCISM Polynésie française</p>
            </div>
            <div className="text-right">
              <div className="bg-red-50 px-4 py-2 rounded-lg">
                <p className="text-xs text-slate-500">Ouverture prévue</p>
                <p className="text-2xl font-bold text-red-600">
                  <EditableText
                    value={businessData.general.ouverture}
                    onChange={(val) => handleEdit('general.ouverture', val)}
                    className="text-2xl font-bold"
                  />
                </p>
              </div>
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
          
          {/* SECTION PRÉSENTATION */}
          {activeSection === 'presentation' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                I. PRÉSENTATION DU PROJET {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* Signification du nom */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Signification du nom TIAKA</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-red-600">TIA</p>
                    <EditableText
                      value={businessData.presentation.tiaSignification}
                      onChange={(val) => handleEdit('presentation.tiaSignification', val)}
                      className="text-sm text-slate-600 block mt-1"
                    />
                    <EditableText
                      value={businessData.presentation.tiaSymbole}
                      onChange={(val) => handleEdit('presentation.tiaSymbole', val)}
                      className="text-xs text-slate-500 block mt-1"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-red-600">KA</p>
                    <EditableText
                      value={businessData.presentation.kaSignification}
                      onChange={(val) => handleEdit('presentation.kaSignification', val)}
                      className="text-sm text-slate-600 block mt-1"
                    />
                    <EditableText
                      value={businessData.presentation.kaSymbole}
                      onChange={(val) => handleEdit('presentation.kaSymbole', val)}
                      className="text-xs text-slate-500 block mt-1"
                    />
                  </div>
                </div>
                <p className="text-center mt-4 text-lg font-semibold text-slate-700">
                  = "La fleur du moment parfait"
                </p>
              </div>

              {/* Contexte */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Contexte et genèse</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <EditableList
                    items={businessData.presentation.contexte}
                    path="presentation.contexte"
                  />
                </div>
              </div>

              {/* Concept TIAKA */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Le concept TIAKA</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-2">Commerce nouvelle génération</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• <EditableText value={businessData.general.surface} onChange={(val) => handleEdit('general.surface', val)} className="inline" /></li>
                      <li>• <EditableText value={`${businessData.general.jours} de ${businessData.general.horaires}`} onChange={(val) => handleEdit('general.horaires', val)} className="inline" /></li>
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

              {/* Objectifs stratégiques */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Objectifs stratégiques</h3>
                <div className="space-y-3">
                  {['courtTerme', 'moyenTerme', 'longTerme'].map((terme) => (
                    <div key={terme} className={`border-l-4 ${terme === 'courtTerme' ? 'border-green-500 bg-green-50' : terme === 'moyenTerme' ? 'border-blue-500 bg-blue-50' : 'border-purple-500 bg-purple-50'} pl-4 p-3 rounded`}>
                      <p className={`font-bold ${terme === 'courtTerme' ? 'text-green-800' : terme === 'moyenTerme' ? 'text-blue-800' : 'text-purple-800'}`}>
                        <EditableText
                          value={businessData.objectifs[terme].titre}
                          onChange={(val) => handleEdit(`objectifs.${terme}.titre`, val)}
                        />
                      </p>
                      <div className="mt-2">
                        <EditableList
                          items={businessData.objectifs[terme].items}
                          path={`objectifs.${terme}.items`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valeurs */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Valeurs fondamentales</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {businessData.presentation.valeurs.map((value, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-4 rounded-lg text-center">
                      <EditableText
                        value={value}
                        onChange={(val) => handleArrayEdit('presentation.valeurs', idx, val)}
                        className="font-bold text-white bg-transparent text-center w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION MARCHÉ */}
          {activeSection === 'marche' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                II. ÉTUDE DE MARCHÉ {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* Marché de Papeete */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Le marché de Papeete</h3>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <EditableList
                        items={businessData.marche.demographie.items}
                        path="marche.demographie.items"
                        title={businessData.marche.demographie.titre}
                      />
                    </div>
                    <div>
                      <EditableList
                        items={businessData.marche.habitudes.items}
                        path="marche.habitudes.items"
                        title={businessData.marche.habitudes.titre}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Concurrence */}
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
                        {editMode && <th className="p-3 text-center">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {businessData.marche.concurrence.map((concurrent, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-medium">
                            <EditableText
                              value={concurrent.type}
                              onChange={(val) => {
                                const newConcurrence = [...businessData.marche.concurrence];
                                newConcurrence[idx].type = val;
                                handleEdit('marche.concurrence', newConcurrence);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <EditableText
                              value={concurrent.forces}
                              onChange={(val) => {
                                const newConcurrence = [...businessData.marche.concurrence];
                                newConcurrence[idx].forces = val;
                                handleEdit('marche.concurrence', newConcurrence);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <EditableText
                              value={concurrent.faiblesses}
                              onChange={(val) => {
                                const newConcurrence = [...businessData.marche.concurrence];
                                newConcurrence[idx].faiblesses = val;
                                handleEdit('marche.concurrence', newConcurrence);
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <EditableText
                              value={concurrent.impact}
                              onChange={(val) => {
                                const newConcurrence = [...businessData.marche.concurrence];
                                newConcurrence[idx].impact = val;
                                handleEdit('marche.concurrence', newConcurrence);
                              }}
                              className="text-green-600 font-medium"
                            />
                          </td>
                          {editMode && (
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  const newConcurrence = [...businessData.marche.concurrence];
                                  newConcurrence.splice(idx, 1);
                                  handleEdit('marche.concurrence', newConcurrence);
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      const newConcurrent = { type: 'Nouveau type', forces: 'Forces', faiblesses: 'Faiblesses', impact: 'Impact' };
                      handleEdit('marche.concurrence', [...businessData.marche.concurrence, newConcurrent]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un concurrent
                  </button>
                )}
              </div>

              {/* Avantages compétitifs */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Avantages compétitifs TIAKA</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {businessData.marche.avantages.map((advantage, idx) => (
                    <div key={idx} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <EditableText
                          value={advantage}
                          onChange={(val) => handleArrayEdit('marche.avantages', idx, val)}
                          className="text-sm text-slate-700 flex-1"
                        />
                        {editMode && businessData.marche.avantages.length > 1 && (
                          <button
                            onClick={() => handleArrayRemove('marche.avantages', idx)}
                            className="p-1 text-red-500 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {editMode && (
                  <button
                    onClick={() => handleArrayAdd('marche.avantages', 'Nouvel avantage')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un avantage
                  </button>
                )}
              </div>

              {/* Clientèle cible */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Clientèle cible</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {businessData.marche.segments.map((segment, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 p-4 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <EditableText
                          value={segment.nom}
                          onChange={(val) => {
                            const newSegments = [...businessData.marche.segments];
                            newSegments[idx].nom = val;
                            handleEdit('marche.segments', newSegments);
                          }}
                          className="font-bold text-slate-800 flex-1"
                        />
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                          <EditableText
                            value={segment.part}
                            onChange={(val) => {
                              const newSegments = [...businessData.marche.segments];
                              newSegments[idx].part = val;
                              handleEdit('marche.segments', newSegments);
                            }}
                            className="bg-transparent text-white text-center w-12"
                          />
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>
                          <span className="font-medium">Fréquence:</span>{' '}
                          <EditableText
                            value={segment.frequence}
                            onChange={(val) => {
                              const newSegments = [...businessData.marche.segments];
                              newSegments[idx].frequence = val;
                              handleEdit('marche.segments', newSegments);
                            }}
                            className="inline"
                          />
                        </p>
                        <p>
                          <span className="font-medium">Panier moyen:</span>{' '}
                          <EditableText
                            value={segment.panier}
                            onChange={(val) => {
                              const newSegments = [...businessData.marche.segments];
                              newSegments[idx].panier = val;
                              handleEdit('marche.segments', newSegments);
                            }}
                            className="inline"
                          />
                        </p>
                        <p>
                          <span className="font-medium">Besoins:</span>{' '}
                          <EditableText
                            value={segment.besoins}
                            onChange={(val) => {
                              const newSegments = [...businessData.marche.segments];
                              newSegments[idx].besoins = val;
                              handleEdit('marche.segments', newSegments);
                            }}
                            className="inline"
                          />
                        </p>
                      </div>
                      {editMode && (
                        <button
                          onClick={() => {
                            const newSegments = [...businessData.marche.segments];
                            newSegments.splice(idx, 1);
                            handleEdit('marche.segments', newSegments);
                          }}
                          className="mt-3 flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1 rounded text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                          Supprimer ce segment
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      const newSegment = {
                        nom: 'Nouveau segment',
                        part: '0%',
                        frequence: 'À définir',
                        panier: '0 XPF',
                        besoins: 'À définir'
                      };
                      handleEdit('marche.segments', [...businessData.marche.segments, newSegment]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un segment
                  </button>
                )}
              </div>
            </div>
          )}
          {/* SECTION STRATÉGIE */}
          {activeSection === 'strategie' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                III. STRATÉGIE COMMERCIALE & MARKETING {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* Positionnement */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Positionnement</h3>
                <p className="text-lg font-semibold text-red-700 mb-4">
                  <EditableText
                    value={businessData.strategie.positionnement.titre}
                    onChange={(val) => handleEdit('strategie.positionnement.titre', val)}
                    className="text-lg font-semibold"
                  />
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-2">Axes de positionnement</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      {businessData.strategie.positionnement.axes.map((axe, idx) => (
                        <li key={idx}>
                          • <span className="font-medium">
                            <EditableText
                              value={axe.nom}
                              onChange={(val) => {
                                const newAxes = [...businessData.strategie.positionnement.axes];
                                newAxes[idx].nom = val;
                                handleEdit('strategie.positionnement.axes', newAxes);
                              }}
                              className="inline"
                            />:</span>{' '}
                          <EditableText
                            value={axe.description}
                            onChange={(val) => {
                              const newAxes = [...businessData.strategie.positionnement.axes];
                              newAxes[idx].description = val;
                              handleEdit('strategie.positionnement.axes', newAxes);
                            }}
                            className="inline"
                          />
                          {editMode && (
                            <button
                              onClick={() => {
                                const newAxes = [...businessData.strategie.positionnement.axes];
                                newAxes.splice(idx, 1);
                                handleEdit('strategie.positionnement.axes', newAxes);
                              }}
                              className="ml-2 text-red-500 hover:bg-red-50 rounded p-1 inline-flex"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newAxe = { nom: 'Nouvel axe', description: 'Description' };
                          handleEdit('strategie.positionnement.axes', [...businessData.strategie.positionnement.axes, newAxe]);
                        }}
                        className="mt-2 flex items-center gap-2 text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Plus className="w-3 h-3" />
                        Ajouter un axe
                      </button>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-slate-800 mb-2">Promesse client</p>
                    <EditableText
                      value={businessData.strategie.positionnement.promesse}
                      onChange={(val) => handleEdit('strategie.positionnement.promesse', val)}
                      className="text-sm italic text-slate-700 bg-slate-50 p-3 rounded w-full"
                      multiline
                    />
                  </div>
                </div>
              </div>

              {/* Politique de prix */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Politique de prix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="p-3 text-left">Catégorie produit</th>
                        <th className="p-3 text-left">Positionnement prix</th>
                        <th className="p-3 text-left">Justification</th>
                        {editMode && <th className="p-3 text-center">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {businessData.strategie.prix.map((prix, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3">
                            <EditableText
                              value={prix.categorie}
                              onChange={(val) => {
                                const newPrix = [...businessData.strategie.prix];
                                newPrix[idx].categorie = val;
                                handleEdit('strategie.prix', newPrix);
                              }}
                            />
                          </td>
                          <td className="p-3 font-medium">
                            <EditableText
                              value={prix.positionnement}
                              onChange={(val) => {
                                const newPrix = [...businessData.strategie.prix];
                                newPrix[idx].positionnement = val;
                                handleEdit('strategie.prix', newPrix);
                              }}
                              className="text-green-600 font-medium"
                            />
                          </td>
                          <td className="p-3">
                            <EditableText
                              value={prix.justification}
                              onChange={(val) => {
                                const newPrix = [...businessData.strategie.prix];
                                newPrix[idx].justification = val;
                                handleEdit('strategie.prix', newPrix);
                              }}
                            />
                          </td>
                          {editMode && (
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  const newPrix = [...businessData.strategie.prix];
                                  newPrix.splice(idx, 1);
                                  handleEdit('strategie.prix', newPrix);
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      const newPrix = { categorie: 'Nouvelle catégorie', positionnement: 'Prix', justification: 'Justification' };
                      handleEdit('strategie.prix', [...businessData.strategie.prix, newPrix]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter une catégorie
                  </button>
                )}
                <div className="bg-blue-50 p-4 rounded-lg mt-3">
                  <p className="text-center text-lg font-bold text-blue-800">
                    Panier moyen cible :{' '}
                    <EditableText
                      value={businessData.strategie.panierMoyen}
                      onChange={(val) => handleEdit('strategie.panierMoyen', val)}
                      className="inline"
                    />
                  </p>
                </div>
              </div>

              {/* Communication */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Communication et promotion</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                    <p className="font-bold text-yellow-800 mb-2">Phase 1 : Pré-ouverture (3 mois avant)</p>
                    <EditableList
                      items={businessData.strategie.communication.preOuverture}
                      path="strategie.communication.preOuverture"
                    />
                  </div>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                    <p className="font-bold text-green-800 mb-2">Phase 2 : Lancement</p>
                    <EditableList
                      items={businessData.strategie.communication.lancement}
                      path="strategie.communication.lancement"
                    />
                  </div>
                  
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <p className="font-bold text-blue-800 mb-2">Phase 3 : Fidélisation (ongoing)</p>
                    <EditableList
                      items={businessData.strategie.communication.fidelisation}
                      path="strategie.communication.fidelisation"
                    />
                  </div>
                </div>
              </div>

              {/* Canaux de communication */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Canaux de communication</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { emoji: '📱', nom: 'Réseaux sociaux', desc: 'Instagram prioritaire - cible jeune' },
                    { emoji: '📄', nom: 'Flyers et affiches', desc: 'Lycées, université, bureaux' },
                    { emoji: '🏪', nom: 'Signalétique', desc: 'Enseigne lumineuse, vitrophanie' },
                    { emoji: '👥', nom: 'Bouche-à-oreille', desc: 'Programme parrainage' }
                  ].map((canal, idx) => (
                    <div key={idx} className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-3xl mb-2">{canal.emoji}</p>
                      <p className="font-bold text-purple-800">{canal.nom}</p>
                      <p className="text-xs text-slate-600 mt-1">{canal.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION OPÉRATIONNEL */}
          {activeSection === 'operationnel' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                IV. PLAN OPÉRATIONNEL {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* RH */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Organisation et ressources humaines</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">
                      <EditableText
                        value={businessData.operationnel.rh.annee1.titre}
                        onChange={(val) => handleEdit('operationnel.rh.annee1.titre', val)}
                      />
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Gérant 1</p>
                        <EditableText
                          value={businessData.operationnel.rh.annee1.gerant1}
                          onChange={(val) => handleEdit('operationnel.rh.annee1.gerant1', val)}
                          className="text-sm text-slate-600 w-full"
                        />
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Gérant 2</p>
                        <EditableText
                          value={businessData.operationnel.rh.annee1.gerant2}
                          onChange={(val) => handleEdit('operationnel.rh.annee1.gerant2', val)}
                          className="text-sm text-slate-600 w-full"
                        />
                      </div>
                    </div>
                    <div className="mt-3 bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Planning horaire</p>
                      <EditableList
                        items={businessData.operationnel.rh.annee1.planning}
                        path="operationnel.rh.annee1.planning"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">
                      <EditableText
                        value={businessData.operationnel.rh.annee2.titre}
                        onChange={(val) => handleEdit('operationnel.rh.annee2.titre', val)}
                      />
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Profil recherché</p>
                        <EditableText
                          value={businessData.operationnel.rh.annee2.profil}
                          onChange={(val) => handleEdit('operationnel.rh.annee2.profil', val)}
                          className="text-sm text-slate-600 w-full"
                        />
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Contrat</p>
                        <EditableText
                          value={businessData.operationnel.rh.annee2.contrat}
                          onChange={(val) => handleEdit('operationnel.rh.annee2.contrat', val)}
                          className="text-sm text-slate-600 w-full"
                        />
                      </div>
                      <div className="bg-white p-3 rounded">
                        <p className="font-medium text-slate-800">Formation</p>
                        <EditableText
                          value={businessData.operationnel.rh.annee2.formation}
                          onChange={(val) => handleEdit('operationnel.rh.annee2.formation', val)}
                          className="text-sm text-slate-600 w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aménagement */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Aménagement du local (100 m²)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {['zone1', 'zone2', 'zone3', 'zone4'].map((zone, idx) => {
                    const colors = ['orange', 'purple', 'blue', 'slate'];
                    const color = colors[idx];
                    return (
                      <div key={zone} className={`bg-${color}-50 p-4 rounded-lg`}>
                        <p className={`font-bold text-${color}-800 mb-2`}>
                          <EditableText
                            value={businessData.operationnel.amenagement[zone].nom}
                            onChange={(val) => handleEdit(`operationnel.amenagement.${zone}.nom`, val)}
                          />
                          {' '}
                          (<EditableText
                            value={businessData.operationnel.amenagement[zone].surface}
                            onChange={(val) => handleEdit(`operationnel.amenagement.${zone}.surface`, val)}
                            className="inline"
                          />)
                        </p>
                        <EditableList
                          items={businessData.operationnel.amenagement[zone].elements}
                          path={`operationnel.amenagement.${zone}.elements`}
                        />
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg mt-4">
                  <p className="font-bold text-slate-800 mb-2">Ambiance générale</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {businessData.operationnel.amenagement.ambiance.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-700">✓</span>
                        <EditableText
                          value={item}
                          onChange={(val) => handleArrayEdit('operationnel.amenagement.ambiance', idx, val)}
                          className="text-sm text-slate-700 flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fournisseurs */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Fournisseurs et approvisionnement</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {['locaux', 'japonais', 'courants'].map((type) => {
                    const colors = { locaux: 'green', japonais: 'red', courants: 'blue' };
                    const color = colors[type];
                    return (
                      <div key={type} className={`bg-${color}-50 p-4 rounded-lg`}>
                        <p className={`font-bold text-${color}-800 mb-2`}>
                          <EditableText
                            value={businessData.operationnel.fournisseurs[type].titre}
                            onChange={(val) => handleEdit(`operationnel.fournisseurs.${type}.titre`, val)}
                          />
                        </p>
                        <EditableList
                          items={businessData.operationnel.fournisseurs[type].items}
                          path={`operationnel.fournisseurs.${type}.items`}
                        />
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-slate-100 p-4 rounded-lg mt-4">
                  <p className="font-bold text-slate-800 mb-2">Stratégie d'approvisionnement</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {businessData.operationnel.fournisseurs.strategie.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-700">•</span>
                        <EditableText
                          value={item}
                          onChange={(val) => handleArrayEdit('operationnel.fournisseurs.strategie', idx, val)}
                          className="text-sm text-slate-700 flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Équipements */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Outils et équipements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(businessData.operationnel.equipements).map(([key, items], idx) => {
                    const titles = { vente: 'Matériel de vente', conservation: 'Équipements conservation', mobilier: 'Mobilier', digital: 'Informatique/Digital' };
                    const colors = ['blue', 'green', 'orange', 'purple'];
                    const color = colors[idx];
                    return (
                      <div key={key} className={`bg-white border-2 border-${color}-200 p-3 rounded-lg`}>
                        <p className={`font-medium text-${color}-800 mb-2`}>{titles[key]}</p>
                        <EditableList
                          items={items}
                          path={`operationnel.equipements.${key}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {/* SECTION FINANCIER */}
          {activeSection === 'financier' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                V. PRÉVISIONS FINANCIÈRES 5 ANS {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* Hypothèses de projection */}
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
                      {businessData.financier.projections.map((row, idx) => (
                        <tr key={idx} className={row.an % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="p-3 font-bold">An {row.an}</td>
                          <td className="p-3 text-right">
                            {editMode ? (
                              <input
                                type="number"
                                value={row.clients}
                                onChange={(e) => {
                                  const newProj = [...businessData.financier.projections];
                                  newProj[idx].clients = parseInt(e.target.value) || 0;
                                  handleEdit('financier.projections', newProj);
                                }}
                                className="w-20 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              row.clients
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {editMode ? (
                              <input
                                type="number"
                                value={row.panier}
                                onChange={(e) => {
                                  const newProj = [...businessData.financier.projections];
                                  newProj[idx].panier = parseInt(e.target.value) || 0;
                                  handleEdit('financier.projections', newProj);
                                }}
                                className="w-24 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              `${row.panier} XPF`
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {editMode ? (
                              <input
                                type="number"
                                value={row.jours}
                                onChange={(e) => {
                                  const newProj = [...businessData.financier.projections];
                                  newProj[idx].jours = parseInt(e.target.value) || 0;
                                  handleEdit('financier.projections', newProj);
                                }}
                                className="w-20 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              row.jours
                            )}
                          </td>
                          <td className="p-3 text-right font-bold text-green-600">
                            {editMode ? (
                              <input
                                type="text"
                                value={row.ca}
                                onChange={(e) => {
                                  const newProj = [...businessData.financier.projections];
                                  newProj[idx].ca = e.target.value;
                                  handleEdit('financier.projections', newProj);
                                }}
                                className="w-32 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              `${row.ca} XPF`
                            )}
                          </td>
                          <td className="p-3 text-right font-medium text-blue-600">
                            {editMode ? (
                              <input
                                type="text"
                                value={row.croissance}
                                onChange={(e) => {
                                  const newProj = [...businessData.financier.projections];
                                  newProj[idx].croissance = e.target.value;
                                  handleEdit('financier.projections', newProj);
                                }}
                                className="w-20 px-2 py-1 border rounded text-right"
                              />
                            ) : (
                              row.croissance
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Compte de résultat */}
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
                      {/* CA */}
                      <tr className="bg-green-50 font-bold">
                        <td className="p-3">CHIFFRE D'AFFAIRES</td>
                        {businessData.financier.projections.map((proj) => (
                          <td key={proj.an} className="p-3 text-right">{proj.ca}</td>
                        ))}
                      </tr>
                      
                      {/* Charges */}
                      {businessData.financier.chargesAnnuelles.map((charge, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={charge.poste}
                                onChange={(e) => {
                                  const newCharges = [...businessData.financier.chargesAnnuelles];
                                  newCharges[idx].poste = e.target.value;
                                  handleEdit('financier.chargesAnnuelles', newCharges);
                                }}
                                className="w-full px-2 py-1 border rounded"
                              />
                            ) : (
                              charge.poste
                            )}
                          </td>
                          {['an1', 'an2', 'an3', 'an4', 'an5'].map((an) => (
                            <td key={an} className="p-3 text-right text-red-600">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={charge[an]}
                                  onChange={(e) => {
                                    const newCharges = [...businessData.financier.chargesAnnuelles];
                                    newCharges[idx][an] = parseInt(e.target.value) || 0;
                                    handleEdit('financier.chargesAnnuelles', newCharges);
                                  }}
                                  className="w-28 px-2 py-1 border rounded text-right"
                                />
                              ) : (
                                charge[an].toLocaleString()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Total charges */}
                      <tr className="bg-red-50 font-bold">
                        <td className="p-3">TOTAL CHARGES</td>
                        {['an1', 'an2', 'an3', 'an4', 'an5'].map((an) => {
                          const total = businessData.financier.chargesAnnuelles.reduce((sum, charge) => sum + charge[an], 0);
                          return <td key={an} className="p-3 text-right">{total.toLocaleString()}</td>;
                        })}
                      </tr>
                      
                      {/* Résultat */}
                      <tr className="bg-green-100 font-bold text-lg">
                        <td className="p-3">RÉSULTAT NET</td>
                        {businessData.financier.projections.map((proj, idx) => {
                          const an = `an${proj.an}`;
                          const ca = parseInt(proj.ca.replace(/\s/g, ''));
                          const charges = businessData.financier.chargesAnnuelles.reduce((sum, charge) => sum + charge[an], 0);
                          const resultat = ca - charges;
                          return (
                            <td key={proj.an} className="p-3 text-right text-green-700">
                              {resultat.toLocaleString()}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {editMode && (
                  <button
                    onClick={() => {
                      const newCharge = { poste: 'Nouveau poste', an1: 0, an2: 0, an3: 0, an4: 0, an5: 0 };
                      handleEdit('financier.chargesAnnuelles', [...businessData.financier.chargesAnnuelles, newCharge]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter une ligne de charge
                  </button>
                )}
              </div>

              {/* Plan de financement */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Plan de financement initial</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-bold text-red-800 mb-3">Besoins de démarrage</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        {businessData.financier.financement.besoins.map((besoin, idx) => (
                          <tr key={idx}>
                            <td className="py-2">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={besoin.poste}
                                  onChange={(e) => {
                                    const newBesoins = [...businessData.financier.financement.besoins];
                                    newBesoins[idx].poste = e.target.value;
                                    handleEdit('financier.financement.besoins', newBesoins);
                                  }}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              ) : (
                                besoin.poste
                              )}
                            </td>
                            <td className="py-2 text-right font-medium">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={besoin.montant}
                                  onChange={(e) => {
                                    const newBesoins = [...businessData.financier.financement.besoins];
                                    newBesoins[idx].montant = parseInt(e.target.value) || 0;
                                    handleEdit('financier.financement.besoins', newBesoins);
                                  }}
                                  className="w-32 px-2 py-1 border rounded text-right"
                                />
                              ) : (
                                `${besoin.montant.toLocaleString()} XPF`
                              )}
                            </td>
                            {editMode && (
                              <td className="py-2 text-right">
                                <button
                                  onClick={() => {
                                    const newBesoins = [...businessData.financier.financement.besoins];
                                    newBesoins.splice(idx, 1);
                                    handleEdit('financier.financement.besoins', newBesoins);
                                  }}
                                  className="text-red-500 hover:bg-red-100 p-1 rounded"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                        <tr className="bg-red-100 font-bold">
                          <td className="py-2">TOTAL BESOINS</td>
                          <td className="py-2 text-right">
                            {businessData.financier.financement.besoins.reduce((sum, b) => sum + b.montant, 0).toLocaleString()} XPF
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newBesoin = { poste: 'Nouveau besoin', montant: 0 };
                          handleEdit('financier.financement.besoins', [...businessData.financier.financement.besoins, newBesoin]);
                        }}
                        className="flex items-center gap-2 text-sm px-2 py-1 bg-green-500 text-white rounded mt-2"
                      >
                        <Plus className="w-3 h-3" />
                        Ajouter
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Ressources de financement</p>
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        {businessData.financier.financement.ressources.map((ressource, idx) => (
                          <tr key={idx}>
                            <td className="py-2">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={ressource.source}
                                  onChange={(e) => {
                                    const newRessources = [...businessData.financier.financement.ressources];
                                    newRessources[idx].source = e.target.value;
                                    handleEdit('financier.financement.ressources', newRessources);
                                  }}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              ) : (
                                ressource.source
                              )}
                            </td>
                            <td className="py-2 text-right font-medium">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={ressource.montant}
                                  onChange={(e) => {
                                    const newRessources = [...businessData.financier.financement.ressources];
                                    newRessources[idx].montant = parseInt(e.target.value) || 0;
                                    handleEdit('financier.financement.ressources', newRessources);
                                  }}
                                  className="w-32 px-2 py-1 border rounded text-right"
                                />
                              ) : (
                                `${ressource.montant.toLocaleString()} XPF`
                              )}
                            </td>
                            <td className="py-2 text-right text-slate-600">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={ressource.pourcentage}
                                  onChange={(e) => {
                                    const newRessources = [...businessData.financier.financement.ressources];
                                    newRessources[idx].pourcentage = e.target.value;
                                    handleEdit('financier.financement.ressources', newRessources);
                                  }}
                                  className="w-16 px-2 py-1 border rounded text-right"
                                />
                              ) : (
                                ressource.pourcentage
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-green-100 font-bold">
                          <td className="py-2">TOTAL RESSOURCES</td>
                          <td className="py-2 text-right">
                            {businessData.financier.financement.ressources.reduce((sum, r) => sum + r.montant, 0).toLocaleString()} XPF
                          </td>
                          <td className="py-2 text-right">100%</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="mt-4 bg-white p-3 rounded">
                      <p className="text-sm font-bold text-slate-800">Remboursement emprunt</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        {Object.entries(businessData.financier.financement.emprunt).map(([key, value]) => (
                          <li key={key}>
                            • {key.charAt(0).toUpperCase() + key.slice(1)} :{' '}
                            {editMode ? (
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => handleEdit(`financier.financement.emprunt.${key}`, e.target.value)}
                                className="inline-block px-2 py-1 border rounded"
                              />
                            ) : (
                              value
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seuil de rentabilité */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Seuil de rentabilité</h3>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-bold text-slate-800 mb-3">Calcul du point mort</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        {Object.entries(businessData.financier.seuilRentabilite).map(([key, value]) => {
                          const labels = {
                            chargesFixes: 'Charges fixes annuelles',
                            marge: 'Marge sur coût variable',
                            seuil: 'Seuil de rentabilité',
                            clientsJour: 'Soit environ'
                          };
                          return (
                            <li key={key}>
                              • {labels[key]} : <span className="font-bold">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleEdit(`financier.seuilRentabilite.${key}`, e.target.value)}
                                    className="inline-block px-2 py-1 border rounded"
                                  />
                                ) : (
                                  value
                                )}
                              </span>
                            </li>
                          );
                        })}
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

          {/* SECTION KPIs */}
          {activeSection === 'kpis' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VI. INDICATEURS DE PERFORMANCE (KPIs) {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <p className="text-sm text-slate-700 mb-2">
                  Les KPIs permettent de piloter l'activité au quotidien et d'anticiper les difficultés. 
                  Ils doivent être suivis régulièrement et des actions correctives doivent être mises en place dès qu'un seuil d'alerte est franchi.
                </p>
              </div>

              {/* Toutes les catégories de KPIs */}
              {Object.entries(businessData.kpis).map(([category, kpis]) => {
                const categoryInfo = {
                  commerciaux: { title: '📊 KPIs Commerciaux', color: 'blue' },
                  operationnels: { title: '⚙️ KPIs Opérationnels', color: 'orange' },
                  financiers: { title: '💰 KPIs Financiers', color: 'green' },
                  rh: { title: '👥 KPIs Ressources Humaines', color: 'purple' },
                  marketing: { title: '📱 KPIs Marketing & Communication', color: 'pink' }
                };
                const info = categoryInfo[category];
                
                return (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{info.title}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className={`bg-${info.color}-600 text-white`}>
                          <tr>
                            <th className="p-3 text-left">Indicateur</th>
                            <th className="p-3 text-center">Cible</th>
                            <th className="p-3 text-center">Fréquence suivi</th>
                            <th className="p-3 text-center">Seuil d'alerte</th>
                            {editMode && <th className="p-3 text-center">Actions</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {kpis.map((kpi, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : `bg-${info.color}-50`}>
                              <td className="p-3 font-medium">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={kpi.nom}
                                    onChange={(e) => handleKpiEdit(category, idx, 'nom', e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                ) : (
                                  kpi.nom
                                )}
                              </td>
                              <td className="p-3 text-center text-green-600 font-bold">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={kpi.cible}
                                    onChange={(e) => handleKpiEdit(category, idx, 'cible', e.target.value)}
                                    className="w-full px-2 py-1 border rounded text-center"
                                  />
                                ) : (
                                  kpi.cible
                                )}
                              </td>
                              <td className="p-3 text-center text-slate-600">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={kpi.frequence}
                                    onChange={(e) => handleKpiEdit(category, idx, 'frequence', e.target.value)}
                                    className="w-full px-2 py-1 border rounded text-center"
                                  />
                                ) : (
                                  kpi.frequence
                                )}
                              </td>
                              <td className="p-3 text-center text-red-600 font-medium">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={kpi.alerte}
                                    onChange={(e) => handleKpiEdit(category, idx, 'alerte', e.target.value)}
                                    className="w-full px-2 py-1 border rounded text-center"
                                  />
                                ) : (
                                  kpi.alerte
                                )}
                              </td>
                              {editMode && (
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => {
                                      const newKpis = [...businessData.kpis[category]];
                                      newKpis.splice(idx, 1);
                                      handleEdit(`kpis.${category}`, newKpis);
                                    }}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newKpi = { nom: 'Nouvel indicateur', cible: 'À définir', frequence: 'Mensuel', alerte: 'À définir' };
                          handleEdit(`kpis.${category}`, [...businessData.kpis[category], newKpi]);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                      >
                        <Plus className="w-4 h-4" />
                        Ajouter un KPI
                      </button>
                    )}
                  </div>
                );
              })}

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
          {/* SECTION JURIDIQUE */}
          {activeSection === 'juridique' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VII. STRUCTURE JURIDIQUE & CONFORMITÉ {editMode && <span className="text-yellow-500">✏️</span>}
              </h2>

              {/* Forme juridique */}
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
                      {Object.entries(businessData.juridique.forme).map(([key, value]) => {
                        const labels = {
                          type: 'Type',
                          capital: 'Capital social',
                          associes: 'Associés',
                          siege: 'Siège social',
                          duree: 'Durée'
                        };
                        return (
                          <li key={key}>
                            • {labels[key]} : <span className="font-bold">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleEdit(`juridique.forme.${key}`, e.target.value)}
                                  className="inline-block px-2 py-1 border rounded w-full mt-1"
                                />
                              ) : (
                                value
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Régime fiscal */}
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
                      <p className="font-bold text-slate-800 mb-2">Détails</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {Object.entries(businessData.juridique.fiscal).map(([key, value]) => {
                          const labels = {
                            regime: 'Régime',
                            taux: 'Taux IS',
                            declaration: 'Déclaration',
                            dateLimit: 'Date limite'
                          };
                          return (
                            <li key={key}>
                              • {labels[key]} : {editMode ? (
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleEdit(`juridique.fiscal.${key}`, e.target.value)}
                                  className="inline-block px-2 py-1 border rounded"
                                />
                              ) : (
                                <span className="font-bold">{value}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Régime social */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Régime social : TNS (Travailleurs Non-Salariés)</h3>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-800 mb-3">Gérants majoritaires = RNS</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-2">Cotisations sociales CPS</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {Object.entries(businessData.juridique.social).filter(([key]) => key !== 'regime' && key !== 'declaration').map(([key, value]) => {
                          const labels = {
                            tauxMaladie: 'Taux maladie obligatoire',
                            cotisationMin: 'Cotisation minimale',
                            plancher: 'Plancher mensuel'
                          };
                          return (
                            <li key={key}>
                              • {labels[key]} : {editMode ? (
                                <input
                                  type="text"
                                  value={value}
                                  onChange={(e) => handleEdit(`juridique.social.${key}`, e.target.value)}
                                  className="inline-block px-2 py-1 border rounded"
                                />
                              ) : (
                                <span className="font-bold">{value}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 mb-2">Obligations</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Déclaration annuelle revenus : {editMode ? (
                          <input
                            type="text"
                            value={businessData.juridique.social.declaration}
                            onChange={(e) => handleEdit('juridique.social.declaration', e.target.value)}
                            className="inline-block px-2 py-1 border rounded"
                          />
                        ) : (
                          <span className="font-bold">{businessData.juridique.social.declaration}</span>
                        )}</li>
                        <li>• Affiliation dès début d'activité</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* TVA */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">TVA</h3>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-800 mb-2">
                    {editMode ? (
                      <input
                        type="text"
                        value={businessData.juridique.tva.regime}
                        onChange={(e) => handleEdit('juridique.tva.regime', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      businessData.juridique.tva.regime
                    )}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Taux applicables</p>
                      <ul className="text-xs text-slate-700 mt-2 space-y-1">
                        {businessData.juridique.tva.taux.map((taux, idx) => (
                          <li key={idx}>
                            {editMode ? (
                              <input
                                type="text"
                                value={taux}
                                onChange={(e) => handleArrayEdit('juridique.tva.taux', idx, e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs"
                              />
                            ) : (
                              `• ${taux}`
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-sm font-medium text-slate-800">Déclarations</p>
                      <p className="text-xs text-slate-700 mt-2">
                        {editMode ? (
                          <input
                            type="text"
                            value={businessData.juridique.tva.declarations}
                            onChange={(e) => handleEdit('juridique.tva.declarations', e.target.value)}
                            className="w-full px-2 py-1 border rounded text-xs"
                          />
                        ) : (
                          `• ${businessData.juridique.tva.declarations}`
                        )}
                      </p>
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

              {/* Timeline */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Timeline de création (Checklist CCISM)</h3>
                <div className="space-y-4">
                  {businessData.juridique.timeline.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 bg-slate-50 p-4 rounded">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 text-lg">
                            {editMode ? (
                              <input
                                type="text"
                                value={phase.phase}
                                onChange={(e) => {
                                  const newTimeline = [...businessData.juridique.timeline];
                                  newTimeline[idx].phase = e.target.value;
                                  handleEdit('juridique.timeline', newTimeline);
                                }}
                                className="w-full px-2 py-1 border rounded"
                              />
                            ) : (
                              phase.phase
                            )}
                          </p>
                          <p className="text-sm text-slate-600">
                            Durée estimée : {editMode ? (
                              <input
                                type="text"
                                value={phase.duree}
                                onChange={(e) => {
                                  const newTimeline = [...businessData.juridique.timeline];
                                  newTimeline[idx].duree = e.target.value;
                                  handleEdit('juridique.timeline', newTimeline);
                                }}
                                className="inline-block px-2 py-1 border rounded"
                              />
                            ) : (
                              phase.duree
                            )}
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
                              <input
                                type="text"
                                value={tache}
                                onChange={(e) => {
                                  const newTimeline = [...businessData.juridique.timeline];
                                  newTimeline[idx].taches[tIdx] = e.target.value;
                                  handleEdit('juridique.timeline', newTimeline);
                                }}
                                className="flex-1 px-2 py-1 border rounded text-xs"
                              />
                            ) : (
                              <span className="flex-1">{tache}</span>
                            )}
                            {editMode && (
                              <button
                                onClick={() => {
                                  const newTimeline = [...businessData.juridique.timeline];
                                  newTimeline[idx].taches.splice(tIdx, 1);
                                  handleEdit('juridique.timeline', newTimeline);
                                }}
                                className="text-red-500 hover:bg-red-50 p-1 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {editMode && (
                        <button
                          onClick={() => {
                            const newTimeline = [...businessData.juridique.timeline];
                            newTimeline[idx].taches.push('Nouvelle tâche');
                            handleEdit('juridique.timeline', newTimeline);
                          }}
                          className="flex items-center gap-2 text-sm px-2 py-1 bg-green-500 text-white rounded mt-2"
                        >
                          <Plus className="w-3 h-3" />
                          Ajouter une tâche
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      const newPhase = {
                        phase: 'Nouvelle phase',
                        duree: 'À définir',
                        taches: ['Tâche 1', 'Tâche 2']
                      };
                      handleEdit('juridique.timeline', [...businessData.juridique.timeline, newPhase]);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter une phase
                  </button>
                )}
              </div>

              {/* Contacts utiles */}
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

              {/* Aides disponibles */}
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

          <div className="text-center mt-8 pt-6 border-t-2 border-white/30">
            <p className="text-3xl font-bold mb-2">TIAKA</p>
            <p className="text-xl italic mb-4">"La fleur du moment parfait"</p>
            <p className="text-sm text-white/80">
              Parce que chaque instant mérite un commerce qui vous ressemble
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-slate-300">Document conforme aux recommandations</p>
              <p className="text-lg font-bold">CCISM Polynésie française - Guide de l'Entrepreneur 2021</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">Version</p>
              <p className="text-2xl font-bold text-red-400">4.0 ÉDITION COMPLÈTE</p>
              <p className="text-xs text-slate-400 mt-1">100% Éditable • Sauvegarde automatique ✨</p>
            </div>
          </div>
          
          {editMode && (
            <div className="mt-4 pt-4 border-t border-slate-700 text-center">
              <p className="text-sm text-slate-400">
                💾 Toutes les modifications sont automatiquement sauvegardées dans votre navigateur
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;