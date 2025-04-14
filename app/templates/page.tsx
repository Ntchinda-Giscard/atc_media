'use client';
import { useState } from 'react';
import {
  Eye, Pencil, XCircle, PlusCircle,
  LayoutList, LayoutGrid
} from 'lucide-react';
import Image from 'next/image';

export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const templates = [
    {
      title: 'Promo Flash',
      category: 'Promotions',
      duration: '15s',
      customizable: true,
      usage: '1200 diffusions',
      image: '/templates/promo-flash.jpg'
    },
    {
      title: 'Météo Locale',
      category: 'Météo',
      duration: '10s',
      customizable: true,
      usage: '900 diffusions',
      image: '/templates/meteo.jpg'
    },
    {
      title: 'News Express',
      category: 'Actualités',
      duration: '20s',
      customizable: true,
      usage: '850 diffusions',
      image: '/templates/news.jpg'
    }
  ];

  const userTemplates = [
    {
      title: 'Promo - Été 2025',
      modified: '12/03/2025',
      status: 'Actif',
      image: '/user/promo-ete.jpg'
    },
    {
      title: 'Black Friday Deal',
      modified: '10/03/2025',
      status: 'En attente',
      image: '/user/black-friday.jpg'
    },
    {
      title: 'Menu Restaurant',
      modified: '08/03/2025',
      status: 'Expiré',
      image: '/user/menu.jpg'
    }
  ];

  const statusColor: { [key: string]: string } = {
    'Actif': 'text-green-600',
    'En attente': 'text-yellow-500',
    'Expiré': 'text-red-500'
  };

  return (
    <div className="space-y-12">
      {/* Bibliothèque */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">🎨 Bibliothèque de Templates</h2>
            <p className="text-sm text-gray-500">Choisissez parmi une variété de modèles pour rendre vos contenus attractifs et engageants.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('list')}><LayoutList className={viewMode === 'list' ? 'text-red-500' : 'text-gray-400'} /></button>
            <button onClick={() => setViewMode('grid')}><LayoutGrid className={viewMode === 'grid' ? 'text-red-500' : 'text-gray-400'} /></button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <table className="w-full mt-6 text-sm border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-2">Template</th>
                <th className="text-left px-4 py-2">Catégorie</th>
                <th className="text-left px-4 py-2">Durée recommandée</th>
                <th className="text-left px-4 py-2">Personnalisable</th>
                <th className="text-left px-4 py-2">Utilisation</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((tpl, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-blue-600">{tpl.title}</td>
                  <td className="px-4 py-2">{tpl.category}</td>
                  <td className="px-4 py-2">{tpl.duration}</td>
                  <td className="px-4 py-2">{tpl.customizable ? '✅ Oui' : '❌ Non'}</td>
                  <td className="px-4 py-2">{tpl.usage}</td>
                  <td className="px-4 py-2 text-gray-600 space-x-2">
                    <Eye size={16} className="inline" /> | <Pencil size={16} className="inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((tpl, index) => (
              <div key={index} className="bg-white shadow rounded p-2 text-sm">
                <Image src={tpl.image} alt={tpl.title} width={200} height={120} className="rounded" />
                <p className="mt-2 font-semibold">{tpl.title}</p>
                <div className="flex gap-2 mt-1 text-gray-500 text-xs">
                  <span>📁</span><span>{tpl.category}</span>
                </div>
                <div className="flex gap-2 text-gray-500 text-xs">
                  <span>⏱️</span><span>{tpl.duration}</span>
                </div>
                <div className="flex justify-end gap-2 mt-2 text-gray-600">
                  <Eye size={16} /> <Pencil size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mes Templates enregistrés */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center gap-2">🗂️ Mes Templates enregistrés</h2>
          <div className="flex gap-2 items-center">
            <button onClick={() => setViewMode('list')}><LayoutList className={viewMode === 'list' ? 'text-red-500' : 'text-gray-400'} /></button>
            <button onClick={() => setViewMode('grid')}><LayoutGrid className={viewMode === 'grid' ? 'text-red-500' : 'text-gray-400'} /></button>
            <button className="bg-red-600 text-white text-sm px-4 py-2 rounded flex items-center gap-1">
              <PlusCircle size={16} /> Créer un template
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <table className="w-full mt-6 text-sm border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-2">Nom du template</th>
                <th className="text-left px-4 py-2">Dernière modification</th>
                <th className="text-left px-4 py-2">Statut</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userTemplates.map((tpl, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{tpl.title}</td>
                  <td className="px-4 py-2">{tpl.modified}</td>
                  <td className={`px-4 py-2 font-semibold ${statusColor[tpl.status]}`}>{tpl.status}</td>
                  <td className="px-4 py-2 text-gray-600 space-x-2">
                    <Eye size={16} className="inline" /> | <Pencil size={16} className="inline" /> | <XCircle size={16} className="inline text-red-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {userTemplates.map((tpl, index) => (
              <div key={index} className="bg-white shadow rounded p-2 text-sm">
                <Image src={tpl.image} alt={tpl.title} width={200} height={120} className="rounded" />
                <p className="mt-2 font-semibold">{tpl.title}</p>
                <div className="flex justify-end gap-2 mt-2 text-gray-600">
                  <Eye size={16} /> <Pencil size={16} /> <XCircle size={16} className="text-red-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
