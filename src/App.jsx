import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, DollarSign, Target, AlertCircle, CheckCircle, Edit2, Save, X } from 'lucide-react';

const TiakaBusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('presentation');
  const [expandedSections, setExpandedSections] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // État initial avec toutes les données modifiables
  const [businessData, setBusinessData] = useState(() => {
    // Charger depuis localStorage si disponible
    const saved = localStorage.getItem('tiakaBusinessPlan');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Données par défaut
    return {
      general: {
        nom: 'TIAKA',
        sousTitre: 'Le premier Konbini Franco-Tahitien',
        ouverture: 'Fin 2026',
        surfaceLocale: '100 m²',
        horaires: '6h30 à 22h',
        joursSemaine: '7j/7',
      },
      objectifs: {
        annee1: {
          clients: 50,
          ca: '16 200 000',
          notoriete: 'Notoriété locale solide',
          fidelisation: 'Clientèle fidèle'
        },
        annee2_3: {
          clients: '60-65',
          offre: 'Diversification de l\'offre',
          equipe: 'Équipe stable recrutée',
          rentabilite: 'Rentabilité optimale'
        },
        annee4_5: {
          position: 'Position de leader konbini',
          expansion: 'Second point de vente',
          service: 'Service Click & Collect'
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
          besoins: {
            travaux: 1500000,
            equipements: 1500000,
            stock: 1200000,
            enseigne: 500000,
            tresorerie: 1000000,
            fraisAdmin: 300000
          },
          ressources: {
            apportPersonnel: 300000,
            emprunt: 5200000,
            aides: 500000
          }
        }
      }
    };
  });

  // Sauvegarder automatiquement dans localStorage
  useEffect(() => {
    localStorage.setItem('tiakaBusinessPlan', JSON.stringify(businessData));
  }, [businessData]);

  const sections = [
    { id: 'presentation', title: 'I. PRÉSENTATION DU PROJET', icon: Target },
    { id: 'marche', title: 'II. ÉTUDE DE MARCHÉ', icon: Users },
    { id: 'strategie', title: 'III. STRATÉGIE COMMERCIALE', icon: TrendingUp },
    { id: 'operationnel', title: 'IV. PLAN OPÉRATIONNEL', icon: CheckCircle },
    { id: 'financier', title: 'V. PRÉVISIONS FINANCIÈRES', icon: DollarSign },
    { id: 'kpis', title: 'VI. INDICATEURS DE PERFORMANCE', icon: AlertCircle },
    { id: 'juridique', title: 'VII. STRUCTURE JURIDIQUE', icon: CheckCircle },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fonction pour éditer une valeur
  const handleEdit = (path, value) => {
    const keys = path.split('.');
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Fonction pour éditer un KPI
  const handleKpiEdit = (category, index, field, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.kpis[category][index][field] = value;
      return newData;
    });
  };

  // Fonction pour éditer les projections financières
  const handleFinancierEdit = (index, field, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.financier.projections[index][field] = value;
      return newData;
    });
  };

  // Fonction pour éditer les charges
  const handleChargeEdit = (index, field, value) => {
    setBusinessData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.financier.chargesAnnuelles[index][field] = parseInt(value) || 0;
      return newData;
    });
  };

  // Fonction pour réinitialiser les données
  const handleReset = () => {
    if (window.confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      localStorage.removeItem('tiakaBusinessPlan');
      window.location.reload();
    }
  };

  // Fonction pour exporter en JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(businessData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tiaka-business-plan-data.json';
    link.click();
  };

  // Composant champ éditable
  const EditableField = ({ value, path, type = 'text', className = '' }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    if (!editMode) {
      return <span className={className}>{value}</span>;
    }

    if (isEditing) {
      return (
        <div className="inline-flex items-center gap-2">
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="px-2 py-1 border-2 border-blue-500 rounded text-slate-800"
            autoFocus
          />
          <button
            onClick={() => {
              handleEdit(path, tempValue);
              setIsEditing(false);
            }}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setTempValue(value);
              setIsEditing(false);
            }}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <span
        onClick={() => setIsEditing(true)}
        className={`${className} cursor-pointer hover:bg-yellow-100 px-2 py-1 rounded border-2 border-dashed border-transparent hover:border-blue-400 transition-all`}
      >
        {value} ✏️
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Barre d'outils d'édition */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  editMode
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {editMode ? (
                  <>
                    <Save className="w-5 h-5" />
                    Mode Édition ACTIVÉ
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
                  <p className="text-sm text-yellow-800">
                    💡 Cliquez sur les textes pour les modifier. Les changements sont sauvegardés automatiquement.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
              >
                <DollarSign className="w-5 h-5" />
                Exporter JSON
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                <AlertCircle className="w-5 h-5" />
                Réinitialiser
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-t-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                <EditableField value={businessData.general.nom} path="general.nom" />
              </h1>
              <p className="text-xl text-slate-600 italic">
                <EditableField value={businessData.general.sousTitre} path="general.sousTitre" />
              </p>
              <p className="text-sm text-slate-500 mt-2">Business Plan conforme aux recommandations CCISM Polynésie française</p>
            </div>
            <div className="text-right">
              <div className="bg-red-50 px-4 py-2 rounded-lg">
                <p className="text-xs text-slate-500">Ouverture prévue</p>
                <p className="text-2xl font-bold text-red-600">
                  <EditableField value={businessData.general.ouverture} path="general.ouverture" />
                </p>
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

        {/* Contenu principal avec les sections éditables */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
        {activeSection === 'kpis' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                VI. INDICATEURS DE PERFORMANCE (KPIs) {editMode && '✏️'}
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                <p className="text-sm text-slate-700 mb-2">
                  Les KPIs permettent de piloter l'activité au quotidien et d'anticiper les difficultés. 
                  Ils doivent être suivis régulièrement et des actions correctives doivent être mises en place dès qu'un seuil d'alerte est franchi.
                </p>
              </div>

              {/* KPIs Commerciaux */}
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
                      {businessData.kpis.commerciaux.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={kpi.nom}
                                onChange={(e) => handleKpiEdit('commerciaux', idx, 'nom', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('commerciaux', idx, 'cible', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('commerciaux', idx, 'frequence', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('commerciaux', idx, 'alerte', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-center"
                              />
                            ) : (
                              kpi.alerte
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPIs Opérationnels */}
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
                      {businessData.kpis.operationnels.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={kpi.nom}
                                onChange={(e) => handleKpiEdit('operationnels', idx, 'nom', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('operationnels', idx, 'cible', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('operationnels', idx, 'frequence', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('operationnels', idx, 'alerte', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-center"
                              />
                            ) : (
                              kpi.alerte
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPIs Financiers */}
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
                      {businessData.kpis.financiers.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={kpi.nom}
                                onChange={(e) => handleKpiEdit('financiers', idx, 'nom', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('financiers', idx, 'cible', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('financiers', idx, 'frequence', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('financiers', idx, 'alerte', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-center"
                              />
                            ) : (
                              kpi.alerte
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPIs RH */}
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
                      {businessData.kpis.rh.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={kpi.nom}
                                onChange={(e) => handleKpiEdit('rh', idx, 'nom', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('rh', idx, 'cible', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('rh', idx, 'frequence', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('rh', idx, 'alerte', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-center"
                              />
                            ) : (
                              kpi.alerte
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPIs Marketing */}
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
                      {businessData.kpis.marketing.map((kpi, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                          <td className="p-3 font-medium">
                            {editMode ? (
                              <input
                                type="text"
                                value={kpi.nom}
                                onChange={(e) => handleKpiEdit('marketing', idx, 'nom', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('marketing', idx, 'cible', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('marketing', idx, 'frequence', e.target.value)}
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
                                onChange={(e) => handleKpiEdit('marketing', idx, 'alerte', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-center"
                              />
                            ) : (
                              kpi.alerte
                            )}
                          </td>
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
                V. PRÉVISIONS FINANCIÈRES 5 ANS {editMode && '✏️'}
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
                      {businessData.financier.projections.map((row, idx) => (
                        <tr key={idx} className={row.an % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="p-3 font-bold">An {row.an}</td>
                          <td className="p-3 text-right">
                            {editMode ? (
                              <input
                                type="number"
                                value={row.clients}
                                onChange={(e) => handleFinancierEdit(idx, 'clients', parseInt(e.target.value))}
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
                                onChange={(e) => handleFinancierEdit(idx, 'panier', parseInt(e.target.value))}
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
                                onChange={(e) => handleFinancierEdit(idx, 'jours', parseInt(e.target.value))}
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
                                onChange={(e) => handleFinancierEdit(idx, 'ca', e.target.value)}
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
                                onChange={(e) => handleFinancierEdit(idx, 'croissance', e.target.value)}
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
                      {businessData.financier.chargesAnnuelles.map((charge, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 font-medium">{charge.poste}</td>
                          {['an1', 'an2', 'an3', 'an4', 'an5'].map((an) => (
                            <td key={an} className="p-3 text-right text-red-600">
                              {editMode ? (
                                <input
                                  type="number"
                                  value={charge[an]}
                                  onChange={(e) => handleChargeEdit(idx, an, e.target.value)}
                                  className="w-28 px-2 py-1 border rounded text-right"
                                />
                              ) : (
                                charge[an].toLocaleString()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Afficher un message pour les autres sections */}
          {!['kpis', 'financier'].includes(activeSection) && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Section : {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-slate-600">
                Cette section utilise le contenu par défaut (non éditable pour l'instant).
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Les sections KPIs et Financier sont entièrement éditables ! 🎉
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-800 text-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Document conforme aux recommandations</p>
              <p className="text-lg font-bold">CCISM Polynésie française - Guide de l'Entrepreneur 2021</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">Version</p>
              <p className="text-2xl font-bold text-red-400">3.0 ÉDITABLE</p>
              <p className="text-xs text-slate-400 mt-1">Avec sauvegarde automatique ✨</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;