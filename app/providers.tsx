// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client"
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { useState } from 'react';


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    const toggleColorScheme = (value: any) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>{children}</MantineProvider>
      </body>
    </html>
  );
}