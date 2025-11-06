import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Edit2, Save, X, Download, Target, Users, TrendingUp, CheckCircle, DollarSign, AlertCircle, PlusCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const mergeBusinessData = (defaults, saved) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(saved) ? saved : defaults;
  }

  if (typeof defaults === 'object' && defaults !== null) {
    const result = { ...defaults };
    if (saved && typeof saved === 'object') {
      Object.keys(defaults).forEach((key) => {
        if (key in saved) {
          result[key] = mergeBusinessData(defaults[key], saved[key]);
        }
      });

      Object.keys(saved).forEach((key) => {
        if (!(key in result)) {
          result[key] = saved[key];
        }
      });
    }
    return result;
  }
@@ -338,211 +338,302 @@ const TiakaBusinessPlan = () => {
      ],
      facteursCles: [
        'Emplacement à fort passage',
        'Qualité des produits',
        'Service excellent',
        'Régularité et fiabilité',
        'Communication active'
      ],
      vision: [
        { horizon: 'An 3-5', detail: 'Consolidation leader, équipe stable' },
        { horizon: 'An 5-7', detail: 'Second point de vente' },
        { horizon: 'An 7-10', detail: 'Développement marque, franchise' }
      ],
      engagement: [
        'Expérience client exceptionnelle',
        'Valorisation produits locaux',
        'Dynamisme économique Papeete',
        'Création emploi local',
        'Respect environnement'
      ],
      signatureSlogan: '"La fleur du moment parfait"',
      signatureMessage: 'Parce que chaque instant mérite un commerce qui vous ressemble'
    }
  };

  const deepClone = (value) => (typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value)));

  const [businessData, setBusinessData] = useState(() => {
    const saved = localStorage.getItem('tiakaBusinessData');
    const parsed = saved ? JSON.parse(saved) : null;
    return mergeBusinessData(defaultData, parsed);
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
@@ -563,83 +654,147 @@ const TiakaBusinessPlan = () => {
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

  const EditableList = ({
    items,
    onUpdate,
    className = '',
    addLabel = 'Ajouter un élément',
    placeholder = 'Nouvel élément',
    bullet = true
  }) => {
    const handleChange = (index, value) => {
      const updated = [...items];
      updated[index] = value;
      onUpdate(updated);
    };

    const handleRemove = (index) => {
      const updated = items.filter((_, idx) => idx !== index);
      onUpdate(updated);
    };

    const handleAdd = () => {
      onUpdate([...(items || []), '']);
    };

    return (
      <div className={className}>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className={`flex ${bullet ? 'items-start' : 'items-center'} gap-2`}>
              {bullet && <span className="mt-1 text-slate-400">•</span>}
              {editMode ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="flex-1 border-2 border-blue-400 rounded px-2 py-1 bg-blue-50"
                    placeholder={placeholder}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-slate-500 hover:text-red-500"
                    aria-label="Supprimer l'élément"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="flex-1">{item}</span>
              )}
            </li>
          ))}
        </ul>
        {editMode && (
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <PlusCircle className="w-4 h-4" />
            {addLabel}
          </button>
        )}
      </div>
    );
  };
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
@@ -743,755 +898,887 @@ const TiakaBusinessPlan = () => {
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
                      <EditableList
                        className="text-sm text-slate-700"
                        items={businessData.presentation.offre}
                        onUpdate={(items) => updateValue('presentation.offre', items)}
                        addLabel="Ajouter un élément d'offre"
                      />
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
                        <EditableList
                          className="text-xs text-slate-600 mt-1"
                          items={businessData.operationnel.annee1.horaires}
                          onUpdate={(items) => updateValue('operationnel.annee1.horaires', items)}
                          addLabel="Ajouter un créneau"
                        />
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
                        {compteResultatDefinitions.map(({ key, label, rowClass, valueClass }) => (
                          <tr key={key} className={rowClass}>
                            <td className="p-3">{label}</td>
                            {businessData.compteResultat.map((cr, idx) => (
                              <td key={idx} className={`p-3 ${valueClass}`}>
                                {editMode ? (
                                  <input
@@ -1779,118 +2066,97 @@ const TiakaBusinessPlan = () => {
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
                        <li>
                          • IS :{' '}
                          <EditableField
                            value={businessData.juridique.fiscal.is}
                            onChange={(val) => updateValue('juridique.fiscal.is', val)}
                          />
                        </li>
                        <li>
                          • TVA :{' '}
                          <EditableField
                            value={businessData.juridique.fiscal.tva}
                            onChange={(val) => updateValue('juridique.fiscal.tva', val)}
                          />
                        </li>
                        <li>
@@ -1935,92 +2201,132 @@ const TiakaBusinessPlan = () => {
                          />
                        </li>
                        <li>
                          • Plancher :{' '}
                          <EditableField
                            value={businessData.juridique.social.plancher}
                            onChange={(val) => updateValue('juridique.social.plancher', val)}
                          />
                        </li>
                        <li>
                          • Déclaration :{' '}
                          <EditableField
                            value={businessData.juridique.social.declaration}
                            onChange={(val) => updateValue('juridique.social.declaration', val)}
                          />
                        </li>
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
@@ -2042,121 +2348,138 @@ const TiakaBusinessPlan = () => {

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