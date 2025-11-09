import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export const metadata = {
  title: 'Nebbulon News - Latest Finance, Tech, Automobiles & Cinema News',
  description: 'Stay updated with the latest news in finance, technology, automobiles, and cinema. Your trusted source for breaking news and in-depth analysis.',
  keywords: 'news, finance, technology, automobiles, cinema, breaking news',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-4287519101247440" />
        {/* Google AdSense Script */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4287519101247440"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
