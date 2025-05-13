"use client";

import QRCodePreview from '@/components/qrcode/QRCodePreview';

export default function QRCodePreviewPage({ params }: { params: { id: string } }) {
  return <QRCodePreview vehicleId={params.id} />;
}
