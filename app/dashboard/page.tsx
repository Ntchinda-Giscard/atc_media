'use client';
import Link from 'next/link';
import { BarChart, Eye, MapPin, Timer, PlusCircle, LayoutDashboard } from 'lucide-react';
import {useEffect, useState} from "react"
import { string } from 'zod';
// import { cookies } from "next/headers"

type  User = {
  id: number
  name: string
  email: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() =>{
    const user = localStorage.getItem('user')
    if (user) {
        const parsedUser = JSON.parse(user)
        setUser(parsedUser)
      }
    
}, [])
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-700">Bienvenue {user?.name} 👋</h1>
      <p className="text-gray-500">Gérez vos écrans et contenus multimédias en toute simplicité.</p>

      <div className="flex flex-wrap gap-4">
        <button className="border border-red-500 text-red-600 px-4 py-2 rounded flex items-center gap-2">
          <PlusCircle size={16} /> Nouveau template
        </button>
        <button className="border border-red-500 text-red-600 px-4 py-2 rounded flex items-center gap-2">
          <PlusCircle size={16} /> Nouvelle liste de diffusion
        </button>
        <button className="border border-red-500 text-red-600 px-4 py-2 rounded flex items-center gap-2">
          <LayoutDashboard size={16} /> Nouvel écran
        </button>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">📊 Statistiques en Temps Réel</h2>
          <Link href="/statistics" className="text-red-500 text-sm hover:underline">Voir tous les statistiques</Link>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            📈 Taux d’engagement moyen : <span className="text-red-600 font-semibold">78%</span>
          </p>
          <p>
            🕒 Dernière mise à jour : <span className="text-red-600 font-semibold">il y a 5 min</span>
          </p>
        </div>
        <div className="w-full max-w-sm rounded-full bg-gray-100 px-4 py-6 text-center shadow">
          <div className="text-5xl font-bold text-red-500">60</div>
          <p className="text-sm text-gray-600">Écrans</p>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span className="text-green-600">🟢 Actifs</span>
            <span className="text-yellow-500">🟡 En attente</span>
            <span className="text-red-600">🔴 Hors ligne</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">🖥️ Écrans</h2>
          <Link href="/screens" className="text-red-500 text-sm hover:underline">Voir tous les écrans</Link>
        </div>
        <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Écran</th>
              <th className="text-left px-4 py-2">Localisation</th>
              <th className="text-left px-4 py-2">Temps de diffusion</th>
              <th className="text-left px-4 py-2">Vues</th>
              <th className="text-left px-4 py-2">Engagement</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Écran 1</td>
              <td className="px-4 py-2">Paris, France</td>
              <td className="px-4 py-2">12h</td>
              <td className="px-4 py-2">1 200</td>
              <td className="px-4 py-2">85%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Écran 2</td>
              <td className="px-4 py-2">Lyon, France</td>
              <td className="px-4 py-2">8h</td>
              <td className="px-4 py-2">900</td>
              <td className="px-4 py-2">78%</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Écran 3</td>
              <td className="px-4 py-2">Marseille, France</td>
              <td className="px-4 py-2">10h</td>
              <td className="px-4 py-2">1 500</td>
              <td className="px-4 py-2">82%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">🔥 Templates en vedette</h2>
          <Link href="/templates" className="text-red-500 text-sm hover:underline">Voir tous les templates</Link>
        </div>
        <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-2">Template</th>
              <th className="text-left px-4 py-2">Catégorie</th>
              <th className="text-left px-4 py-2">Durée</th>
              <th className="text-left px-4 py-2">Personnalisable</th>
              <th className="text-left px-4 py-2">Utilisation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 text-blue-600">Promo Flash</td>
              <td className="px-4 py-2">Promotions</td>
              <td className="px-4 py-2">15s</td>
              <td className="px-4 py-2">Oui</td>
              <td className="px-4 py-2">1 200 diffusions</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-blue-600">Météo Locale</td>
              <td className="px-4 py-2">Météo</td>
              <td className="px-4 py-2">10s</td>
              <td className="px-4 py-2">Oui</td>
              <td className="px-4 py-2">900 diffusions</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 text-blue-600">News Express</td>
              <td className="px-4 py-2">Actualités</td>
              <td className="px-4 py-2">20s</td>
              <td className="px-4 py-2">Oui</td>
              <td className="px-4 py-2">850 diffusions</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}