"use client"
import { AppShell, Burger, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconChartBar, IconClipboardText, IconDeviceCameraPhone, IconFileInvoice, IconHome, IconLogout, IconScreenShare, IconUser } from '@tabler/icons-react';
import { usePathname, useSearchParams } from "next/navigation";
import TopBar from './top-bar';
import Link from "next/link"
import { Folder, ImageIcon, Share, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';


const side_bar_links = [
  { label: 'Accueil', icon: <IconHome size={16} stroke={1.5} />, href: '/dashboard' },
  { label: 'Mes écrans', icon: <IconScreenShare size={16} stroke={1.5} />, href: '/dashboard/screens' },
  { label: 'Diffusions', icon: <IconDeviceCameraPhone size={16} stroke={1.5} />, href: '/dashboard/broadcast' },
  { label: 'Templates', icon: <IconFileInvoice size={16} stroke={1.5} />, href: '/dashboard/templates' },
  { label: 'Statistiques', icon: <IconChartBar size={16} stroke={1.5} />, href: '/dashboard/statistics' },
  { label: 'Tutoriels', icon: <IconClipboardText size={16} stroke={1.5} />, href: '/dashboard/tutorials' },
  {
    label: 'Médiathèque',
    icon: <ImageIcon size={18} />,
    children: [
      { href: '/dashboard/media-folders/imports', label: 'Importations', icon: <Folder size={16} /> },
      { href: '/dashboard/media-folders/projects', label: 'Projets', icon: <Folder size={16} /> },
      {
        href: '/dashboard/media-folders/shared',
        label: 'Partage',
        icon: <Share size={16} />
      },
      {
        href: '/dashboard/media-folders/trash',
        label: 'Corbeille',
        icon: <Trash2 size={16} />
      }
    ]
  },
  { label: 'Mon compte', icon: <IconUser size={16} stroke={1.5} />, href: '/dashboard/my-account' },
  { label: 'Notifications', icon: <IconBell size={16} stroke={1.5} />, href: '/dashboard/notifications' },
  { label: 'Déconnexion', icon: <IconLogout size={16} stroke={1.5} />, href: '#' },
]


export default function BasicAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab');
  const fullPath = currentTab ? `${pathname}?tab=${currentTab}` : pathname;

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (label: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOpenMenus((prev: { [x: string]: any; }) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <div className='flex items-center w-full h-full fles-row'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr={10} />
          <TopBar />

        </div>

      </AppShell.Header>
      <AppShell.Navbar p="md">
        {side_bar_links?.map((item, index) => {
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
                      // onClick={() => setShowSideBar(false)}
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
          return (
            <NavLink
              key={index}
              component={Link}
              href={item?.href}
              label={item?.label}
              leftSection={item?.icon}
              color='#EE0202'
              // rightSection={
              //   <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
              // }
              variant="subtle"
              active={pathname === item?.href}
            />
          )
        })}
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}