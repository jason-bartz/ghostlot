import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GhostLot™ Dealer Dashboard',
  description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
  openGraph: {
    type: 'website',
    title: 'GhostLot™ Dealer Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: ['/opengraph.webp'],
    siteName: 'GhostLot™',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostLot™ Dealer Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: ['/opengraph.webp'],
  },
};