import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Save, X, Download, Target, Users, TrendingUp, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TiakaBusinessPlan = () => {
  const [activeSection, setActiveSection] = useState('presentation');
  const [editMode, setEditMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const contentRef = useRef();

  // États pour les données éditables
  const [businessData, setBusinessData] = useState(() => {
    const saved = localStorage.getItem('tiakaBusinessData');
    return saved ? JSON.parse(saved) : {
      nomEntreprise: 'TIAKA',
      slogan: 'Le premier Konbini Franco-Tahitien',
      dateOuverture: 'Fin 2026',
      
      presentation: {
        contexte: [
          'Premier konbini franco-tahitien à Papeete',
          'Concept inspiré des convenience stores japonais',
          'Réponse à un besoin : absence de commerce de proximité moderne',
          'Combinaison praticité japonaise + authenticité polynésienne'
        ],
        valeurs: ['Proximité', 'Qualité', 'Authenticité', 'Modernité', 'Accessibilité']
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
            {activeSection === 'presentation' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  I. PRÉSENTATION DU PROJET
                </h2>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Contexte</h3>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
                    <EditableList 
                      items={businessData.presentation.contexte}
                      onUpdate={(items) => updateValue('presentation.contexte', items)}
                    />
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

            {activeSection === 'financier' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  V. PRÉVISIONS FINANCIÈRES
                </h2>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Projections 5 ans</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800 text-white">
                        <tr>
                          <th className="p-3 text-left">Année</th>
                          <th className="p-3 text-right">Clients/jour</th>
                          <th className="p-3 text-right">Panier</th>
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
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Financement</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="font-bold text-red-800 mb-3">Besoins</p>
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
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-bold text-green-800 mb-3">Ressources</p>
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          {businessData.financement.ressources.map((r, idx) => (
                            <tr key={idx}>
                              <td className="py-2">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={r.source}
                                    onChange={(e) => {
                                      const newR = [...businessData.financement.ressources];
                                      newR[idx].source = e.target.value;
                                      updateValue('financement.ressources', newR);
                                    }}
                                    className="w-full border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                                  />
                                ) : r.source}
                              </td>
                              <td className="py-2 text-right">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={r.montant}
                                    onChange={(e) => {
                                      const newR = [...businessData.financement.ressources];
                                      newR[idx].montant = e.target.value;
                                      updateValue('financement.ressources', newR);
                                    }}
                                    className="w-32 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50 text-right"
                                  />
                                ) : r.montant} XPF
                              </td>
                              <td className="py-2 text-right text-slate-600">{r.pct}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

                {Object.entries(businessData.kpis).map(([category, kpis]) => {
                  const colors = {
                    commerciaux: 'blue',
                    operationnels: 'orange',
                    financiers: 'green',
                    rh: 'purple',
                    marketing: 'pink'
                  };
                  const color = colors[category];
                  
                  return (
                    <div key={category}>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 capitalize">
                        {category}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className={`bg-${color}-600 text-white`}>
                            <tr>
                              <th className="p-3 text-left">Indicateur</th>
                              <th className="p-3 text-center">Cible</th>
                              <th className="p-3 text-center">Fréquence</th>
                              <th className="p-3 text-center">Alerte</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {kpis.map((kpi, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : `bg-${color}-50`}>
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

                {editMode && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="font-bold text-green-800">✅ Modifications sauvegardées automatiquement</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'marche' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  II. ÉTUDE DE MARCHÉ
                </h2>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Marché de Papeete</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• 26 000 habitants + flux quotidiens</li>
                    <li>• Population jeune et active</li>
                    <li>• Forte proportion d'étudiants</li>
                    <li>• Recherche praticité et rapidité</li>
                    <li>• Appétence produits japonais</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'strategie' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  III. STRATÉGIE COMMERCIALE
                </h2>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Positionnement</h3>
                  <p className="text-lg font-semibold text-red-700">
                    TIAKA : LE konbini franco-tahitien
                  </p>
                  <p className="text-sm text-slate-700 mt-3 italic">
                    "Trouvez tout ce dont vous avez besoin, au bon moment, dans une ambiance chaleureuse 
                    qui mêle modernité japonaise et authenticité tahitienne."
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'operationnel' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  IV. PLAN OPÉRATIONNEL
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">Année 1 : Binôme</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Gérant 1 : Appro, logistique, compta</li>
                      <li>• Gérant 2 : Vente, accueil, comm</li>
                      <li>• Ouverture : 6h30-22h, 7j/7</li>
                      <li>• Rotation : 2 shifts de 8h</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">Année 2 : Recrutement</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Profil : Accueil, caisse, rayon</li>
                      <li>• Contrat : CDI temps partiel</li>
                      <li>• Formation : 2 semaines</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'juridique' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-red-500 pb-3">
                  VII. STRUCTURE JURIDIQUE
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-bold text-green-800 mb-3">SARL - Avantages</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>✓ Responsabilité limitée</li>
                      <li>✓ Adapté aux couples</li>
                      <li>✓ Crédibilité bancaire</li>
                      <li>✓ Évolution possible</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-bold text-blue-800 mb-3">Caractéristiques</p>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• Capital : 300 000 XPF</li>
                      <li>• 2 gérants (50/50)</li>
                      <li>• Siège : Papeete</li>
                      <li>• Durée : 99 ans</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-800 mb-3">Régime fiscal et social</p>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• IS : 27% du bénéfice</li>
                    <li>• TVA : Régime réel mensuel</li>
                    <li>• Gérants : RNS - CPS 9,84%</li>
                    <li>• Patente annuelle avant 01/08</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-yellow-800 mb-3">Timeline création</p>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold">Phase 1: Préparation</p>
                      <p className="text-xs text-slate-600">3-6 mois</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold">Phase 2: Formalités</p>
                      <p className="text-xs text-slate-600">1-2 mois</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold">Phase 3: Aménagement</p>
                      <p className="text-xs text-slate-600">2-3 mois</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-bold">Phase 4: Lancement</p>
                      <p className="text-xs text-slate-600">1 mois</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conclusion */}
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
                  <li>• Marché porteur sans concurrence</li>
                  <li>• Positionnement unique</li>
                  <li>• Équipe complémentaire</li>
                  <li>• Rentabilité dès l'année 1</li>
                  <li>• Stratégie claire</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <h4 className="font-bold text-lg mb-3">🔑 Facteurs clés</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Emplacement stratégique</li>
                  <li>• Qualité des produits</li>
                  <li>• Service excellent</li>
                  <li>• Régularité</li>
                  <li>• Communication active</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-6 border-t-2 border-white/30">
              <p className="text-3xl font-bold mb-2">{businessData.nomEntreprise}</p>
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
                <p className="text-sm text-slate-300">Document conforme CCISM</p>
                <p className="text-lg font-bold">Guide de l'Entrepreneur 2021 - Polynésie française</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">Version</p>
                <p className="text-2xl font-bold text-red-400">2.0 Éditable</p>
                <p className="text-xs text-slate-400 mt-1">KPIs + Export PDF + Sauvegarde auto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiakaBusinessPlan;