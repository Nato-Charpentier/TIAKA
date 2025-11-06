import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Save, X, Download, Target, Users, TrendingUp, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const updateValue = (path, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const updateArrayItem = (path, index, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]][index] = value;
      return newData;
    });
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

  const resetData = () => {
    if (window.confirm('Réinitialiser toutes les données ?')) {
      localStorage.removeItem('tiakaBusinessData');
      window.location.reload();
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    setEditMode(false);
    
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');
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

  const EditableField = ({ value, onChange, className = '' }) => {
    if (!editMode) return <span className={className}>{value}</span>;
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} border-2 border-blue-400 rounded px-2 py-1 bg-blue-50`}
      />
    );
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
                    = "La fleur du moment parfait"
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Contexte et genèse</h3>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
                    <EditableList 
                      items={businessData.presentation.contexte}
                      onUpdate={(items) => updateValue('presentation.contexte', items)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Le concept TIAKA</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-2">Commerce nouvelle génération</p>
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
                      <p className="font-bold text-orange-800 mb-2">Espace de vie</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Coin consommation sur place</li>
                        <li>• Tables et chaises contre baies vitrées</li>
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
                      <ul className="text-sm text-slate-700 mt-2">
                        <EditableList 
                          items={businessData.objectifs.an1}
                          onUpdate={(items) => updateValue('objectifs.an1', items)}
                        />
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
                      <p className="font-bold text-blue-800">Moyen terme (Années 2-3)</p>
                      <ul className="text-sm text-slate-700 mt-2">
                        <EditableList 
                          items={businessData.objectifs.an2_3}
                          onUpdate={(items) => updateValue('objectifs.an2_3', items)}
                        />
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
                      <p className="font-bold text-purple-800">Long terme (Années 4-5)</p>
                      <ul className="text-sm text-slate-700 mt-2">
                        <EditableList 
                          items={businessData.objectifs.an4_5}
                          onUpdate={(items) => updateValue('objectifs.an4_5', items)}
                        />
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Valeurs fondamentales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {businessData.presentation.valeurs.map((value, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-red-500 to-orange-500 text-white p-4 rounded-lg text-center">
                        {editMode ? (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateArrayItem('presentation.valeurs', idx, e.target.value)}
                            className="w-full bg-white/20 border-2 border-white/50 rounded px-2 py-1 text-center font-bold"
                          />
                        ) : (
                          <p className="font-bold">{value}</p>
                        )}
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
                  II. ÉTUDE DE MARCHÉ
                </h2>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Le marché de Papeete</h3>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-bold text-blue-800 mb-2">Démographie</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <EditableList 
                            items={businessData.marche.demographie}
                            onUpdate={(items) => updateValue('marche.demographie', items)}
                          />
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-blue-800 mb-2">Habitudes de consommation</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          <EditableList 
                            items={businessData.marche.habitudes}
                            onUpdate={(items) => updateValue('marche.habitudes', items)}
                          />
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
                        {businessData.marche.concurrence.map((conc, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3 font-medium">{conc.type}</td>
                            <td className="p-3">{conc.forces}</td>
                            <td className="p-3">{conc.faiblesses}</td>
                            <td className="p-3 text-green-600 font-medium">{conc.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Avantages compétitifs TIAKA</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {businessData.marche.avantages.map((advantage, idx) => (
                      <div key={idx} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="text-sm text-slate-700">
                          ✓ {editMode ? (
                            <input
                              type="text"
                              value={advantage}
                              onChange={(e) => updateArrayItem('marche.avantages', idx, e.target.value)}
                              className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 mt-1"
                            />
                          ) : advantage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Clientèle cible</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {businessData.marche.clientele.map((client, idx) => (
                      <div key={idx} className="bg-white border-2 border-slate-200 p-4 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <p className="font-bold text-slate-800">
                            {editMode ? (
                              <input
                                type="text"
                                value={client.segment}
                                onChange={(e) => updateClientele(idx, 'segment', e.target.value)}
                                className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                              />
                            ) : client.segment}
                          </p>
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                            {editMode ? (
                              <input
                                type="text"
                                value={client.part}
                                onChange={(e) => updateClientele(idx, 'part', e.target.value)}
                                className="w-12 border-2 border-white rounded px-1 bg-red-400 text-center text-white"
                              />
                            ) : client.part}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <p>
                            <span className="font-medium">Fréquence:</span>{' '}
                            {editMode ? (
                              <input
                                type="text"
                                value={client.frequence}
                                onChange={(e) => updateClientele(idx, 'frequence', e.target.value)}
                                className="border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                              />
                            ) : client.frequence}
                          </p>
                          <p>
                            <span className="font-medium">Panier moyen:</span>{' '}
                            {editMode ? (
                              <input
                                type="text"
                                value={client.panier}
                                onChange={(e) => updateClientele(idx, 'panier', e.target.value)}
                                className="border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                              />
                            ) : client.panier}
                          </p>
                          <p>
                            <span className="font-medium">Besoins:</span>{' '}
                            {editMode ? (
                              <input
                                type="text"
                                value={client.besoins}
                                onChange={(e) => updateClientele(idx, 'besoins', e.target.value)}
                                className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 mt-1"
                              />
                            ) : client.besoins}
                          </p>
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
                        <EditableList 
                          items={businessData.marche.tendances}
                          onUpdate={(items) => updateValue('marche.tendances', items)}
                        />
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">Opportunités de marché</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        <EditableList 
                          items={businessData.marche.opportunites}
                          onUpdate={(items) => updateValue('marche.opportunites', items)}
                        />
                      </ul>
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
                    <ul className="text-sm text-slate-700 space-y-1">
                      <EditableList 
                        items={businessData.strategie.axes}
                        onUpdate={(items) => updateValue('strategie.axes', items)}
                      />
                    </ul>
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
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {businessData.strategie.prix.map((p, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3">{p.categorie}</td>
                            <td className="p-3 font-medium text-green-600">{p.positionnement}</td>
                            <td className="p-3">{p.justification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                      <ul className="text-sm text-slate-700 space-y-1">
                        <EditableList 
                          items={businessData.strategie.phases.preOuverture}
                          onUpdate={(items) => updateValue('strategie.phases.preOuverture', items)}
                        />
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                      <p className="font-bold text-green-800 mb-2">Phase 2 : Lancement</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <EditableList 
                          items={businessData.strategie.phases.lancement}
                          onUpdate={(items) => updateValue('strategie.phases.lancement', items)}
                        />
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                      <p className="font-bold text-blue-800 mb-2">Phase 3 : Fidélisation (ongoing)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <EditableList 
                          items={businessData.strategie.phases.fidelisation}
                          onUpdate={(items) => updateValue('strategie.phases.fidelisation', items)}
                        />
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Canaux de communication</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {businessData.strategie.canaux.map((canal, idx) => (
                      <div key={idx} className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="font-bold text-purple-800">{canal.type}</p>
                        <p className="text-xs text-slate-600 mt-1">{canal.detail}</p>
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
                        <ul className="text-xs text-slate-600 mt-1 space-y-1">
                          <EditableList 
                            items={businessData.operationnel.annee1.horaires}
                            onUpdate={(items) => updateValue('operationnel.annee1.horaires', items)}
                          />
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">Année 2 : Recrutement employé</p>
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
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Aménagement du local (100 m²)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {businessData.operationnel.zones.map((zone, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-lg">
                        <p className="font-bold text-slate-800 mb-2">{zone.nom}</p>
                        <p className="text-sm text-slate-600 mb-2">Surface : {zone.surface}</p>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {zone.equipements.map((eq, eqIdx) => (
                            <li key={eqIdx}>• {eq}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Fournisseurs et approvisionnement</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-2">Produits locaux (40%)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {businessData.operationnel.fournisseurs.locaux.map((f, idx) => (
                          <li key={idx}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="font-bold text-red-800 mb-2">Produits japonais (30%)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {businessData.operationnel.fournisseurs.japonais.map((f, idx) => (
                          <li key={idx}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-2">Produits courants (30%)</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {businessData.operationnel.fournisseurs.courants.map((f, idx) => (
                          <li key={idx}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Outils et équipements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(businessData.operationnel.equipements).map(([cat, items]) => (
                      <div key={cat} className="bg-white border-2 border-slate-200 p-3 rounded-lg">
                        <p className="font-medium text-slate-800 mb-2 capitalize">{cat}</p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {items.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
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
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {businessData.previsions.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-3 font-bold">An {row.an}</td>
                            <td className="p-3 text-right">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={row.clients}
                                  onChange={(e) => updatePrevision(idx, 'clients', e.target.value)}
                                  className="w-20 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                />
                              ) : row.clients}
                            </td>
                            <td className="p-3 text-right">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={row.panier}
                                  onChange={(e) => updatePrevision(idx, 'panier', e.target.value)}
                                  className="w-24 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                />
                              ) : row.panier} XPF
                            </td>
                            <td className="p-3 text-right">{row.jours}</td>
                            <td className="p-3 text-right font-bold text-green-600">
                              {editMode ? (
                                <input
                                  type="text"
                                  value={row.ca}
                                  onChange={(e) => updatePrevision(idx, 'ca', e.target.value)}
                                  className="w-32 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                />
                              ) : row.ca} XPF
                            </td>
                            <td className="p-3 text-right text-blue-600">{row.croissance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Tableau de bord Excel/Sheets hebdomadaire</li>
                    <li>• Logiciel de caisse : extraction données automatique</li>
                    <li>• Réunion hebdomadaire : analyse + actions correctives</li>
                    <li>• Reporting mensuel : synthèse complète</li>
                  </ul>
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
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Forme juridique : {businessData.juridique.forme}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">✅ Avantages</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        {businessData.juridique.avantages.map((av, idx) => (
                          <li key={idx}>✓ {av}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800 mb-3">Caractéristiques</p>
                      <ul className="text-sm text-slate-700 space-y-2">
                        {businessData.juridique.caracteristiques.map((car, idx) => (
                          <li key={idx}>• {car}</li>
                        ))}
                      </ul>
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
                      <div key={idx} className="border-l-4 border-red-500 bg-slate-50 p-4 rounded">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-slate-800 text-lg">{phase.phase}</p>
                            <p className="text-sm text-slate-600">Durée : {phase.duree}</p>
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
              <h3 className="text-2xl font-bold mb-4">Un projet solide et innovant</h3>
              <p className="text-white/90 leading-relaxed">
                TIAKA représente une opportunité unique d'introduire le concept de konbini en Polynésie française, 
                en l'adaptant intelligemment au contexte local.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-3">✅ Points forts</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Marché porteur sans concurrence directe</li>
                  <li>• Positionnement unique fusion culturelle</li>
                  <li>• Équipe motivée et complémentaire</li>
                  <li>• Rentabilité dès l'année 1</li>
                  <li>• Stratégie claire et maîtrisée</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-3">🔑 Facteurs clés</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Emplacement à fort passage</li>
                  <li>• Qualité des produits</li>
                  <li>• Service excellent</li>
                  <li>• Régularité et fiabilité</li>
                  <li>• Communication active</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
              <h4 className="font-bold text-xl mb-4">🎯 Vision long terme</h4>
              <div className="space-y-3 text-white/90">
                <div className="flex items-start">
                  <span className="font-bold mr-3">An 3-5 :</span>
                  <span>Consolidation leader, équipe stable</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-3">An 5-7 :</span>
                  <span>Second point de vente</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-3">An 7-10 :</span>
                  <span>Développement marque, franchise</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h4 className="font-bold text-xl mb-4">💚 Engagement</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Expérience client exceptionnelle</li>
                <li>• Valorisation produits locaux</li>
                <li>• Dynamisme économique Papeete</li>
                <li>• Création emploi local</li>
                <li>• Respect environnement</li>
              </ul>
            </div>

            <div className="text-center pt-6 border-t-2 border-white/30">
              <p className="text-3xl font-bold mb-2">{businessData.nomEntreprise}</p>
              <p className="text-xl italic mb-4">"La fleur du moment parfait"</p>
              <p className="text-sm text-white/80">
                Parce que chaque instant mérite un commerce qui vous ressemble
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-6 mt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-slate-300">Document conforme CCISM</p>
                <p className="text-lg font-bold">Guide Entrepreneur 2021 - Polynésie française</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">Version</p>
                <p className="text-2xl font-bold text-red-400">2.0 Complète</p>
                <p className="text-xs text-slate-400 mt-1">Éditable + Export PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;