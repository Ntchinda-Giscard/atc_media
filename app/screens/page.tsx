'use client';
import { Eye, Pencil, XCircle, PlusCircle, MapPin, Filter } from 'lucide-react';

export default function ScreensPage() {
  const screens = [
    { name: 'Écran #001', group: 'Boutique A', location: 'Paris, France', last: '05/04/2025 - 10:12', status: 'Connecté' },
    { name: 'Écran #002', group: 'Boutique B', location: 'Lyon, France', last: '05/04/2025 - 18:30', status: 'Hors ligne' },
    { name: 'Écran #003', group: 'Supermarché X', location: 'Marseille, France', last: '03/04/2025 - 17:00', status: 'En erreur' },
  ];

  const groups = [
    { name: 'Boutique A', count: 5, last: '05/04/2025 - 10:00', online: 3, offline: 1 },
    { name: 'Pharmacie X', count: 3, last: '04/04/2025 - 18:20', online: 3, offline: 0 },
    { name: 'Super U', count: 7, last: '05/04/2025 - 09:30', online: 6, error: 1 },
  ];

  return (
    <div className="space-y-12">
      {/* Écrans */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">📋 Tableau de bord des écrans</h2>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded text-sm text-gray-600 flex items-center gap-1">
              <Filter size={14} /> Filtre
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1">
              <PlusCircle size={16} /> Ajouter un écran
            </button>
          </div>
        </div>
        <table className="w-full mt-4 text-sm border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Nom</th>
              <th className="text-left px-4 py-2">Groupe</th>
              <th className="text-left px-4 py-2">Localisation</th>
              <th className="text-left px-4 py-2">Dernière Diffusion</th>
              <th className="text-left px-4 py-2">Statut</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {screens.map((screen, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{screen.name}</td>
                <td className="px-4 py-2">{screen.group}</td>
                <td className="px-4 py-2">{screen.location}</td>
                <td className="px-4 py-2">{screen.last}</td>
                <td className="px-4 py-2">
                  {screen.status === 'Connecté' ? '🟢' : screen.status === 'Hors ligne' ? '🔴' : '🟠'} {screen.status}
                </td>
                <td className="px-4 py-2 space-x-2 text-gray-600">
                  <Eye size={16} className="inline" /> | <Pencil size={16} className="inline" /> | <XCircle size={16} className="inline text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Groupes d'écrans */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">📁 Groupes d'Écrans</h2>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded text-sm text-gray-600 flex items-center gap-1">
              <Filter size={14} /> Filtre
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1">
              <PlusCircle size={16} /> Ajouter un groupe
            </button>
          </div>
        </div>
        <table className="w-full mt-4 text-sm border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Nom</th>
              <th className="text-left px-4 py-2">Nombre d'écrans</th>
              <th className="text-left px-4 py-2">Dernière Activité</th>
              <th className="text-left px-4 py-2">Statut Global</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{group.name}</td>
                <td className="px-4 py-2">{group.count}</td>
                <td className="px-4 py-2">{group.last}</td>
                <td className="px-4 py-2">
                  <span className="text-green-600">{group.online} en ligne</span>
                  {group.offline ? ` / ${group.offline} hors ligne` : ''}
                  {group.error ? ` / ${group.error} en erreur` : ''}
                </td>
                <td className="px-4 py-2 space-x-2 text-gray-600">
                  <Eye size={16} className="inline" /> | <Pencil size={16} className="inline" /> | <XCircle size={16} className="inline text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Localisation */}
      <section>
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">🌐 Localisation</h2>
        <div className="rounded overflow-hidden border mt-4">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.28%2C48.85%2C2.39%2C48.89&layer=mapnik"
            className="w-full h-[300px]"
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
