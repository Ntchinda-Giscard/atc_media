'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home, MonitorPlay, BarChart, ImageIcon, FileText, Bell,
  User, LogOut, Users, Settings, Shield, ChevronDown,
  Folder, Share, Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/contexts/AppContext';

const menu = [
  { href: '/dashboard', label: 'Accueil', icon: <Home size={18} /> },
  { href: '/screens', label: 'Mes écrans', icon: <MonitorPlay size={18} /> },
  { href: '/playlists', label: 'Diffusions', icon: <MonitorPlay size={18} /> },
  { href: '/templates', label: 'Templates', icon: <ImageIcon size={18} /> },
  { href: '/statistics', label: 'Statistiques', icon: <BarChart size={18} /> },
  { href: '/tutorials', label: 'Tutoriels', icon: <FileText size={18} /> },
  {
    label: 'Médiathèque',
    icon: <ImageIcon size={18} />,
    children: [
      { href: '/media-folders', label: 'Folders', icon: <Folder size={16} /> },
      {
        href: '/media-folders?tab=shared',
        label: 'Partage',
        icon: <Share size={16} />
      },
      {
        href: '/media-folders?tab=trash',
        label: 'Corbeille',
        icon: <Trash2 size={16} />
      }
    ]
  },
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
  const searchParams = useSearchParams();
  const {setShowSideBar, showSideBar} = useApp();

  const currentTab = searchParams.get('tab');
  const fullPath = currentTab ? `${pathname}?tab=${currentTab}` : pathname;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  useEffect(() => {
    menu.forEach((item) => {
      if (item.children?.some((child) => fullPath === child.href)) {
        setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
      }
    });
  }, [fullPath]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSideBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside ref={dropdownRef} className={`lg:flex lg:relative flex-col justify-between w-[223px] bg-[var(--white)] border-r border-[var(--light-gray-background)] 
    absolute h-screen z-1000
    ${showSideBar ? 'flex' : 'hidden'}
    `}>
      <div className="p-4 text-xl h-[65px] font-bold text-center text-[var(--primary-color)] border-b border-[var(--light-gray-background)]">
        <span>🖥️</span> GMP
      </div>
      <nav className="flex flex-col gap-2 p-4 text-sm">
        {menu.map((item) => {
          if (item.children) {
            const isActive = item.children.some(
              child => fullPath === child.href
            );
            const isOpen = openMenus[item.label];

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    'flex items-center w-full justify-between px-3 py-2 rounded-[10px] transition text-left text-[13px]',
                    isActive
                      ? 'bg-[var(--card-bg)] text-[var(--primary-color)] font-bold'
                      : 'text-[var(--title-color)] hover:text-[var(--primary-color)] hover:bg-[var(--card-bg)] font-normal'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  <svg className={cn('transition-transform', isOpen ? 'rotate-180' : '')} width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66671 0.689942L9.54325 0.689941C11.2026 0.689941 12.1402 2.59413 11.1285 3.90937L7.69023 8.37912C6.88964 9.41989 5.32032 9.41989 4.51973 8.37912L1.08146 3.90936C0.0697375 2.59413 1.00736 0.689942 2.66671 0.689942Z" fill="#414141" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="flex flex-col gap-1 mt-2 ml-6">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-2 px-3 py-1 rounded text-[13px]',
                          fullPath === child.href
                            ? 'text-[var(--primary-color)] font-semibold'
                            : 'text-gray-600 hover:text-[var(--primary-color)]'
                        )}
                        onClick={() => setShowSideBar(false)}
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

          const isActive = fullPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setShowSideBar(false)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded  text-[13px] transition',
                isActive
                  ? 'bg-[var(--card-bg)] text-[var(--primary-color)] font-bold'
                  : 'text-[var(--title-color)] hover:text-[var(--primary-color)] hover:bg-[var(--card-bg)] font-normal'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex items-end justify-center flex-1 p-4 text-xs text-center text-gray-400">© 2025</div>
    </aside>
  );
}
