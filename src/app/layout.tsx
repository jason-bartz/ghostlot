import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads',
  description: 'GhostLot connects automotive shoppers to dealer inventory 24/7 with interactive QR codes, digital reservations, and self-service features - even when the dealership is closed.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ghostlot.com'),
  keywords: ['car dealership software', 'automotive digital retailing', 'QR code inventory', 'dealership tech', 'after hours car shopping'],
  icons: {
    icon: '/ghostlot.png',
    apple: '/ghostlot.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://ghostlot.com',
    title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads',
    description: 'Transform your dealership with 24/7 digital connections to your inventory. GhostLot™ lets shoppers view, save, and reserve vehicles even when you\'re closed.',
    images: [
      {
        url: '/opengraph-3.webp',
        width: 1200,
        height: 630,
        alt: 'GhostLot - Don\'t Get Ghosted by Your Leads'
      }
    ],
    siteName: 'GhostLot™',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://ghostlot.com',
    title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads',
    description: 'Transform your dealership with 24/7 digital connections to your inventory. GhostLot™ lets shoppers view, save, and reserve vehicles even when you\'re closed.',
    images: ['/opengraph-3.webp'],
    imageAlt: 'GhostLot - Don\'t Get Ghosted by Your Leads'
  },
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
