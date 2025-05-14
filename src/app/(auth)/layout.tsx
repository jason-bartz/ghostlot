"use client";

import Head from 'next/head';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>GhostLot™ - Authentication</title>
        <meta name="description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta property="og:title" content="GhostLot™ - Authentication" />
        <meta property="og:description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta property="og:image" content="/opengraph.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GhostLot™" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GhostLot™ - Authentication" />
        <meta name="twitter:description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta name="twitter:image" content="/opengraph.webp" />
      </Head>
      {children}
    </>
  );
}