'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: 'GMP TEST',
    email: 'gmptest@gmail.com',
    phone: '+XXX XXX XXX XXX',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'Français',
    timezone: 'UTC+1 (Europe/Paris)',
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
        <span className="text-blue-500 text-3xl">👤</span> Mon Compte
      </h1>

      <div className="flex gap-4 text-center text-sm font-semibold text-gray-600 border-b">
        <div className="border-b-2 border-red-500 text-red-600 px-4 py-2">⚙️ PARAMÈTRES</div>
        <div className="px-4 py-2">👥 SOUS-COMPTES</div>
        <div className="px-4 py-2">🔒 PROTECTION DES DONNÉES</div>
      </div>

      {/* Infos perso */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Informations Personnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nom" value={form.name} className="input" />
          <input type="email" placeholder="Adresse email" value={form.email} className="input" />
          <input type="text" placeholder="Téléphone" value={form.phone} className="input md:col-span-2" />
        </div>
      </div>

      {/* Mot de passe */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Changer le mot de passe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="password" placeholder="Mot de passe actuel" className="input" />
          <div></div>
          <input type="password" placeholder="Nouveau mot de passe" className="input" />
          <input type="password" placeholder="Confirmer le mot de passe" className="input" />
        </div>
      </div>

      {/* Préférences */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Préférences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="input">
            <option>Français</option>
            <option>Anglais</option>
          </select>
          <select className="input">
            <option>UTC+1 (Europe/Paris)</option>
            <option>UTC+0 (Londres)</option>
            <option>UTC-5 (New York)</option>
          </select>
        </div>
      </div>

      <div className="pt-6">
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
