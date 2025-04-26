// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { useEffect, useState } from 'react';
import '@/app/(site)/globals.css';
import { MediaProvider } from '@/contexts/MediaContex';
import useStore from '@/stores/store';


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const toggleColorScheme = (value: any) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  // const initAuth = useStore(state => state.initAuthFromLocalStorage);

  useEffect(() => {
    // initAuth();
  }, []);
  return (
    <>
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider>
        <MediaProvider>
          <Notifications />
          {children}
        </MediaProvider>
      </MantineProvider>
    </>
  );
}