# 🧩 Next.js Frontend - Plateforme Multimédia

Ce frontend est développé avec **Next.js (App Router)** pour consommer l’API Laravel REST.

## ✨ Fonctionnalités incluses

- ✅ Authentification avec gestion des rôles (`admin`, `éditeur`, `lecteur`)
- ✅ Navigation latérale dynamique
- ✅ Pages prêtes pour tous les modules : écrans, templates, médias, tutoriels, etc.
- ✅ Intégration API via `axios` avec `withCredentials: true`
- ✅ Composants UI personnalisés (`Button`, `Card`, `Toast`)
- ✅ Architecture modulaire et extensible

## 📁 Structure

- `app/` : Pages du projet
- `contexts/AuthContext.tsx` : Contexte global utilisateur
- `lib/axios.js` : Configuration des appels API
- `components/ui/` : Composants visuels
- `app/layout.tsx` : Layout principal avec barre latérale

## 🚀 Installation

```bash
npm install
npm run dev
```

## 🌐 Variables d'environnement

Créer un fichier `.env.local` avec :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🔒 Sécurité

Ce frontend s'appuie sur des **cookies HttpOnly** pour sécuriser l’authentification.

