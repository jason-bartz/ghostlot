import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads - Dashboard',
  description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
  openGraph: {
    type: 'website',
    title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads - Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: [
      {
        url: '/opengraph-3.webp',
        width: 1200,
        height: 630,
        alt: 'GhostLot - Don\'t Get Ghosted by Your Leads'
      }
    ],
    url: 'https://app.ghostlot.com/dashboard',
    siteName: 'GhostLot™',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhostLot™ - Don\'t Get Ghosted by Your Leads - Dashboard',
    description: 'Manage your dealership inventory, QR codes, test drives, reservations, and analytics in one place.',
    images: ['/opengraph-3.webp'],
  },
};