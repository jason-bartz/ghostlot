import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center gap-8 max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-indigo-600">GhostLot by Refraction</h1>
        <p className="text-2xl">Modern Dealership SaaS Application</p>

        <div className="mt-6 text-gray-600">
          <p className="mb-4">
            GhostLot transforms vehicle inventory management with QR code engagement technology
            that connects dealers and consumers in innovative ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
          <Link href="/dashboard" className="bg-indigo-600 text-white rounded-lg px-6 py-4 text-center font-semibold hover:bg-indigo-700 transition duration-300">
            Dealer Dashboard
          </Link>
          <Link href="/consumer-view" className="bg-indigo-100 text-indigo-800 rounded-lg px-6 py-4 text-center font-semibold hover:bg-indigo-200 transition duration-300 border border-indigo-200">
            Consumer View
          </Link>
          <Link href="/admin/test-data" className="bg-gray-100 text-indigo-600 rounded-lg px-6 py-4 text-center font-semibold hover:bg-gray-200 transition duration-300 border border-indigo-200">
            Test Data Setup
          </Link>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>QR Code Generation System</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Consumer Vehicle View</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Inventory Management</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Test Drive Scheduling</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Vehicle Reservations</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Dealer Customization</span>
            </li>
          </ul>
        </div>

        <div className="w-full mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h2 className="text-xl font-semibold mb-4 text-indigo-800">Demo Instructions</h2>
          <div className="text-left space-y-2">
            <p className="text-indigo-900">
              <span className="font-semibold">Consumer View:</span> Access the standalone consumer inventory view to browse vehicles.
            </p>
            <p className="text-indigo-900">
              <span className="font-semibold">QR Code Scanning:</span> In the dealer dashboard, navigate to QR Codes section and use the Consumer View QR Code tab to generate a QR code that links to the consumer view.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}