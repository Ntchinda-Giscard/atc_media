"use client"
import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconActivity, IconBell, IconChartBar, IconChevronRight, IconClipboardCheck, IconClipboardText, IconDeviceCameraPhone, IconFileInvoice, IconHome, IconLogout, IconPhoto, IconScreenShare, IconUser } from '@tabler/icons-react';
import { usePathname } from "next/navigation";
import TopBar from './top-bar';
import Link from "next/link"

export default function BasicAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const side_bar_links = [
    { label: 'Accueil', icon: <IconHome size={16} stroke={1.5} />, href: '/dashboard' },
    { label: 'Mes écrans', icon: <IconScreenShare size={16} stroke={1.5} />, href: '/dashboard/screens' },
    { label: 'Diffusions', icon: <IconDeviceCameraPhone size={16} stroke={1.5} />, href: '/dashboard/broadcast' },
    { label: 'Templates', icon: <IconFileInvoice size={16} stroke={1.5} />, href: '/dashboard/templates' },
    { label: 'Statistiques', icon: <IconChartBar size={16} stroke={1.5} />, href: '/dashboard/statistics' },
    { label: 'Tutoriels', icon: <IconClipboardText size={16} stroke={1.5} />, href: '/dashboard/tutorials' },
    { label: 'Médiathèque', icon: <IconPhoto size={16} stroke={1.5} />, href: '/dashboard/media-folders' },
    { label: 'Mon compte', icon: <IconUser size={16} stroke={1.5} />, href: '/dashboard/my-account' },
    { label: 'Notifications', icon: <IconBell size={16} stroke={1.5} />, href: '/dashboard/notifications' },
    { label: 'Déconnexion', icon: <IconLogout size={16} stroke={1.5} />, href: '#' },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <div className='w-full h-full flex items-center fles-row'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mr={10} />
          <TopBar />

        </div>

      </AppShell.Header>
      <AppShell.Navbar p="md">
        {side_bar_links?.map((l, index) => (
          <NavLink
            key={index}
            component={Link}
            href={l?.href}
            label={l?.label}
            leftSection={l?.icon}
            color='#EE0202'
            // rightSection={
            //   <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
            // }
            variant="subtle"
            active={pathname === l?.href}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}