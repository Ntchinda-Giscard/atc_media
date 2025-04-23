"use client"
import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconActivity, IconBell, IconChartBar, IconChevronRight, IconClipboardCheck, IconClipboardText, IconDeviceCameraPhone, IconFileInvoice, IconHome, IconLogout, IconPhoto, IconScreenShare, IconUser } from '@tabler/icons-react';
import {usePathname} from "next/navigation";
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
    {label: 'Accueil', icon: <IconHome size={16} stroke={1.5} /> , href: '#'},
    {label: 'Mes écrans', icon: <IconScreenShare size={16} stroke={1.5} /> , href: '#'},
    {label: 'Diffusions', icon: <IconDeviceCameraPhone size={16} stroke={1.5} /> , href: '#'},
    {label: 'Templates', icon: <IconFileInvoice size={16} stroke={1.5} /> , href: '#'},
    {label: 'Statistiques', icon: <IconChartBar size={16} stroke={1.5} /> , href: '#'},
    {label: 'Tutoriels', icon: <IconClipboardText size={16} stroke={1.5} /> , href: '#'},
    {label: 'Médiathèque', icon: <IconPhoto size={16} stroke={1.5} /> , href: '#'},
    {label: 'Mon compte', icon: <IconUser size={16} stroke={1.5} /> , href: '/dashboard/my-account'},
    {label: 'Notifications', icon: <IconBell size={16} stroke={1.5} /> , href: '#'},
    {label: 'Déconnexion', icon: <IconLogout size={16} stroke={1.5} /> , href: '#t'},
]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <TopBar />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
        
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {side_bar_links?.map(( l, index) => (
            <NavLink
              component={Link}
              href= {l?.href}
              label= {l?.label}
              leftSection={l?.icon}
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