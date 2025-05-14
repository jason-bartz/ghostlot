import '../globals.css';
import './banner-fix.css'; // Import the banner fix CSS
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2023 Toyota Camry XLE | Available at E-Z Loan Auto Sales',
  description: 'View full specs, watch reviews, estimate payments, and schedule a test drive—right from your phone.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ghostlot.com'),
  icons: {
    icon: '/ghostlot-favicon.svg',
    apple: '/ghostlot-favicon.svg',
  },
  openGraph: {
    type: 'website',
    title: '2023 Toyota Camry XLE | Available at E-Z Loan Auto Sales',
    description: 'View full specs, watch reviews, estimate payments, and schedule a test drive—right from your phone.',
    images: ['/demo-vehicle/camry1.webp'],
    siteName: 'GhostLot™'
  },
  twitter: {
    card: 'summary_large_image',
    title: '2023 Toyota Camry XLE | Available at E-Z Loan Auto Sales',
    description: 'View full specs, watch reviews, estimate payments, and schedule a test drive—right from your phone.',
    images: ['/demo-vehicle/camry1.webp']
  }
};

export default function ConsumerViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}