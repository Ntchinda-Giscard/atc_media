'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home, MonitorPlay, BarChart, ImageIcon, FileText, Bell,
  User, LogOut, Users, Settings, Shield, ChevronDown
} from 'lucide-react';
import { useState } from 'react';

const menu = [
  { href: '/dashboard', label: 'Accueil', icon: <Home size={18} /> },
  { href: '/screens', label: 'Mes écrans', icon: <MonitorPlay size={18} /> },
  { href: '/playlists', label: 'Diffusions', icon: <MonitorPlay size={18} /> },
  { href: '/templates', label: 'Templates', icon: <ImageIcon size={18} /> },
  { href: '/statistics', label: 'Statistiques', icon: <BarChart size={18} /> },
  { href: '/tutorials', label: 'Tutoriels', icon: <FileText size={18} /> },
  { href: '/media-folders', label: 'Médiathèque', icon: <ImageIcon size={18} /> },
  {
    label: 'Mon compte',
    icon: <User size={18} />,
    children: [
      { href: '/settings', label: 'Paramètres', icon: <Settings size={16} /> },
      { href: '/subusers', label: 'Sous comptes', icon: <Users size={16} /> },
      { href: '/privacy', label: 'Protection des données', icon: <Shield size={16} /> }
    ]
  },
  { href: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { href: '/logout', label: 'Déconnexion', icon: <LogOut size={18} /> }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openAccount, setOpenAccount] = useState(true);

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-4 font-bold text-xl border-b border-gray-200 text-center text-red-600">
          <span>🖥️</span> GMP
        </div>
        <nav className="flex flex-col p-4 gap-2 text-sm">
          {menu.map((item) => {
            if (item.children) {
              const isActive = item.children.some(child => pathname === child.href || pathname.startsWith(child.href));
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenAccount(!openAccount)}
                    className={cn(
                      'flex items-center w-full justify-between px-3 py-2 rounded transition text-left',
                      isActive
                        ? 'bg-red-100 text-red-600 font-semibold border-l-4 border-red-500'
                        : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn('transition-transform', openAccount ? 'rotate-180' : '')}
                    />
                  </button>
                  {openAccount && (
                    <div className="ml-6 mt-2 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-2 px-3 py-1 rounded text-sm',
                            pathname === child.href
                              ? 'text-red-600 font-semibold'
                              : 'text-gray-600 hover:text-red-600'
                          )}
                        >
                          {child.icon}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded text-sm transition',
                  isActive
                    ? 'bg-red-100 text-red-600 font-semibold border-l-4 border-red-500'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="text-center p-4 text-xs text-gray-400">© 2025</div>
    </aside>
  );
}
