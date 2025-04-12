'use client';
import { Eye, Pencil, XCircle, RefreshCcw, Filter, PlusCircle } from 'lucide-react';

export default function BroadcastsPage() {
  const broadcasts = [
    { title: 'Promo Pâques 2025', target: 'Boutique A', period: '01/04/2025 - 10/04/2025', type: 'Image', status: 'En cours' },
    { title: 'Infos Matinales', target: 'Écran #B103', period: '11/04/2025 - 15/04/2025', type: 'Vidéo', status: 'Planifié' },
    { title: 'Publicité Météo', target: 'Groupe Pharmacie', period: '01/04/2025 - 05/04/2025', type: 'Texte', status: 'Terminé' }
  ];

  const statusColor = {
    'En cours': 'text-green-600',
    'Planifié': 'text-yellow-500',
    'Terminé': 'text-gray-500'
  };

  return (
    <div className="space-y-12">
      {/* Tableau des diffusions */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">📋 Tableau des diffusions</h2>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded text-sm text-gray-600 flex items-center gap-1">
              <Filter size={14} /> Filtre
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1">
              <PlusCircle size={16} /> Nouvelle Diffusion
            </button>
          </div>
        </div>
        <table className="w-full mt-4 text-sm border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Titre</th>
              <th className="text-left px-4 py-2">Cible</th>
              <th className="text-left px-4 py-2">Période</th>
              <th className="text-left px-4 py-2">Type de contenu</th>
              <th className="text-left px-4 py-2">Statut</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {broadcasts.map((b, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{b.title}</td>
                <td className="px-4 py-2">{b.target}</td>
                <td className="px-4 py-2">{b.period}</td>
                <td className="px-4 py-2">{b.type}</td>
                <td className={`px-4 py-2 font-semibold ${statusColor[b.status]}`}>{b.status}</td>
                <td className="px-4 py-2 space-x-2 text-gray-600">
                  <Eye size={16} className="inline" />
                  {' '}|{' '}
                  {b.status === 'Terminé' ? (
                    <RefreshCcw size={16} className="inline" />
                  ) : (
                    <>
                      <Pencil size={16} className="inline" /> |{' '}
                      <XCircle size={16} className="inline text-red-500" />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Calendrier de planification */}
      <section>
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">📅 Calendrier de planification</h2>
        <div className="flex gap-4 mt-4 text-sm text-gray-700 font-semibold border-b">
          <span className="px-3 py-2 border-b-2 border-red-600 text-red-600">Mensuel</span>
          <span className="px-3 py-2">Hebdomadaire</span>
          <span className="px-3 py-2">Quotidien</span>
        </div>
        <div className="mt-4 border rounded p-4 bg-white text-center text-gray-500">
          <p>(Un vrai composant de calendrier comme FullCalendar ou react-calendar peut être intégré ici)</p>
          <p className="mt-2">Exemple : Promo Pâques, Infos Matinales, Publicité Météo</p>
        </div>
      </section>
    </div>
  );
}
