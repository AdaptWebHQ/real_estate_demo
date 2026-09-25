import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display as PlayfairDisplay, Outfit } from 'next/font/google';

const playfair = PlayfairDisplay({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurevia Estates — Spaces Designed for Better Living | Coimbatore & South India',
  description: 'Aurevia Estates is a premium South Indian property developer specializing in thoughtfully designed residential communities, luxury villas, and urban apartments in Coimbatore, Chennai, Bengaluru, and Ooty.',
  keywords: [
    'Aurevia Estates',
    'Coimbatore Real Estate',
    'Luxury Villas Kovaipudur',
    'Apartments Avinashi Road',
    'RS Puram Residences',
    'South India Developer'
  ],
  authors: [{ name: 'Aurevia Estates' }],
  openGraph: {
    title: 'Aurevia Estates — Spaces Designed for Better Living',
    description: 'Thoughtfully designed homes in exceptional locations across South India.',
    url: 'https://aureviaestates.example',
    siteName: 'Aurevia Estates',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="bg-offwhite text-charcoal font-sans antialiased selection:bg-gold selection:text-charcoal min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
