"use client";

import Head from 'next/head';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>GhostLot™ - Don't Ghost Your Leads - Sign In</title>
        <meta name="description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta property="og:title" content="GhostLot™ - Don't Ghost Your Leads - Sign In" />
        <meta property="og:description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta property="og:image" content="https://ghostlot.com/opengraph-2.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://app.ghostlot.com/login" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GhostLot™" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GhostLot™ - Don't Ghost Your Leads - Sign In" />
        <meta name="twitter:description" content="Sign in to your GhostLot dashboard to manage your dealership's digital presence." />
        <meta name="twitter:image" content="/opengraph-2.webp" />
      </Head>
      {children}
    </>
  );
}