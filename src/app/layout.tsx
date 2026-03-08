import type { Metadata } from 'next';
import {
  Source_Serif_4,
  Anton,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppProviders } from '@/components/AppProviders';
import { ThemeTransitionProvider } from '@/components/animations/ThemeTransition';
import { Navbar } from '@/components/layout/Navbar';
import { ClientOverlays } from '@/components/layout/ClientOverlays';
import { AppWrapper } from '@/components/layout/AppWrapper';
import { Footer } from '@/components/layout/Footer';

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
});



const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

export const metadata: Metadata = {
  title: 'For Aulia',
  description: 'A digital letter about love, loss, growth, and the memories that still deserve respect.',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'For Aulia',
    description: 'A digital letter about love, loss, growth, and the memories that still deserve respect.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'For Aulia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Aulia',
    description: 'A digital letter about love, loss, growth, and the memories that still deserve respect.',
  },
};

import { ViewTransitions } from 'next-view-transitions';
import LenisProvider from '@/components/providers/LenisProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${anton.variable} ${playfairDisplay.variable} ${sourceSerif4.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AppProviders>
              <ThemeTransitionProvider>
                <LenisProvider>
                  <AppWrapper>
                    <Navbar />
                    <ClientOverlays />
                    {children}
                    <Footer />
                  </AppWrapper>
                </LenisProvider>
              </ThemeTransitionProvider>
            </AppProviders>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

