import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface VehicleData {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  stock_number: string;
  price: number;
  status: string;
  dealer_name?: string;
  dealer_phone?: string;
  dealer_location?: string;
}

export async function generateVehicleQRPDF(
  vehicleData: VehicleData,
  qrCodeDataUrl: string
): Promise<Uint8Array> {
  try {
    // Load the PDF template
    const templateUrl = '/assets/qr-code-template.pdf';
    const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(templateBytes);
    
    // Get the first page
    const page = pdfDoc.getPages()[0];
    
    // Embed the QR code image
    const qrImageBytes = await fetchDataUrlAsBytes(qrCodeDataUrl);
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    
    // Get page dimensions
    const { width, height } = page.getSize();
    
    // Calculate QR code position (center in the QR code area)
    const qrCodeWidth = 180;
    const qrCodeHeight = 180;
    const qrCodeX = 215; // Positioned in the QR code area
    const qrCodeY = 420; // From bottom of page
    
    // Add QR code image to the page
    page.drawImage(qrImage, {
      x: qrCodeX,
      y: qrCodeY,
      width: qrCodeWidth,
      height: qrCodeHeight,
    });
    
    // Load fonts
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Add vehicle information
    // Vehicle name
    page.drawText(`${vehicleData.year} ${vehicleData.make} ${vehicleData.model} ${vehicleData.trim}`, {
      x: 120,
      y: 330,
      size: 16,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    
    // Stock number
    page.drawText(`Stock# ${vehicleData.stock_number}`, {
      x: 120,
      y: 300,
      size: 14,
      font: helvetica,
      color: rgb(0, 0, 0),
    });
    
    // VIN
    page.drawText(`VIN: ${vehicleData.vin}`, {
      x: 120,
      y: 280,
      size: 12,
      font: helvetica,
      color: rgb(0, 0, 0),
    });
    
    // Price
    page.drawText(`$${vehicleData.price.toLocaleString()}`, {
      x: 120,
      y: 260,
      size: 14,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
    
    // Add dealer information
    if (vehicleData.dealer_name) {
      page.drawText(vehicleData.dealer_name, {
        x: 120,
        y: 220,
        size: 12,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
    }
    
    if (vehicleData.dealer_location) {
      page.drawText(vehicleData.dealer_location, {
        x: 120,
        y: 200,
        size: 10,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
    
    if (vehicleData.dealer_phone) {
      page.drawText(vehicleData.dealer_phone, {
        x: 120,
        y: 180,
        size: 10,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
    }
    
    // Add URL below QR code
    const vehicleUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/vehicle/${vehicleData.id}`;
    page.drawText(vehicleUrl, {
      x: 120,
      y: 380,
      size: 9,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4), // Light gray color
    });
    
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// For the EZ Loan specific template (the demo)
export async function generateEZLoanQRPDF(
  vehicleData: VehicleData,
  qrCodeDataUrl: string
): Promise<Uint8Array> {
  try {
    // Load the EZ Loan demo PDF template
    const templateUrl = '/assets/QR Code Demo.pdf';
    const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
    
    // Load the PDF document - this one already has data filled in
    const pdfDoc = await PDFDocument.load(templateBytes);
    
    // Get the first page
    const page = pdfDoc.getPages()[0];
    
    // Just to ensure we're consistent, we can still add the QR code
    const qrImageBytes = await fetchDataUrlAsBytes(qrCodeDataUrl);
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    
    // Add QR code image to the page in the same position as the template
    page.drawImage(qrImage, {
      x: 215,
      y: 420,
      width: 180,
      height: 180,
    });
    
    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating EZ Loan PDF:', error);
    throw error;
  }
}

// Helper function to convert data URL to bytes
async function fetchDataUrlAsBytes(dataUrl: string): Promise<Uint8Array> {
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = dataUrl.split(',')[1];
  // Convert base64 to binary
  const binaryString = atob(base64Data);
  // Create a Uint8Array from the binary string
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}