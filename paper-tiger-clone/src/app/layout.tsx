import type { Metadata } from 'next';
import { Inter, Anton, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeTransitionProvider } from '@/components/animations/ThemeTransition';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomContextMenu } from '@/components/ui/CustomContextMenu';
import { MusicPlayer } from '@/components/features/MusicPlayer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Cantika Intan Aulia',
  description: 'A personal story and portfolio of Cantika Intan Aulia.',
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
        className={`${inter.variable} ${anton.variable} ${spaceMono.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeTransitionProvider>
            <SmoothScroll>
              <Navbar />
              <CustomContextMenu />
              <MusicPlayer />
              <div id="main-content" className="transition-all duration-500 ease-out">
                {children}
              </div>
              <Footer />
            </SmoothScroll>
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
