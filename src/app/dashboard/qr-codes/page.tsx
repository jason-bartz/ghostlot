"use client";

import QRCodeGenerator from '@/components/qrcode/QRCodeGenerator';

export default function QRCodesPage() {
  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <h2 className="text-xl font-semibold py-4 px-6">Vehicle QR Codes</h2>
      </div>
      <QRCodeGenerator />
    </div>
  );
}