import type { Metadata } from 'next';
import {
  Source_Serif_4,
  Anton,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppProviders } from '@/components/AppProviders';
import { ThemeTransitionProvider } from '@/components/animations/ThemeTransition';
import { Navbar } from '@/components/layout/Navbar';
import { ClientOverlays } from '@/components/layout/ClientOverlays';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${anton.variable} ${playfairDisplay.variable} ${sourceSerif4.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProviders>
            <ThemeTransitionProvider>
              <SmoothScroll>
                <Navbar />
                <ClientOverlays />
                {children}
                <Footer />
              </SmoothScroll>
            </ThemeTransitionProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}

