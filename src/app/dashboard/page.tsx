"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  
  // Redirect to QR codes page by default
  useEffect(() => {
    router.push('/dashboard/qr-codes');
  }, [router]);
  
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="text-gray-500">Loading dashboard...</div>
    </div>
  );
}
