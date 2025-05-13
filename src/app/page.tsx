import Link from 'next/link';
import Image from 'next/image';
import { SparklesText } from '@/components/ui/sparkles-text';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden w-full">
      {/* Animated gradient background with more colors */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(108, 0, 162)"
        gradientBackgroundEnd="rgb(0, 17, 82)"
        firstColor="18, 113, 255"
        secondColor="221, 74, 255"
        thirdColor="100, 220, 255"
        fourthColor="200, 50, 50"
        fifthColor="180, 180, 50"
        pointerColor="140, 100, 255"
        containerClassName="absolute inset-0 opacity-40"
      />
      
      <div className="flex flex-col items-center justify-center gap-8 max-w-3xl text-center relative z-10">
        <div className="flex flex-col items-center">
          <Image src="/ghostlot-favicon.svg" alt="GhostLot Logo" width={120} height={120} priority className="mb-4" />
          <SparklesText text="GhostLot™" className="text-7xl mb-1" colors={{ first: "#FFC400", second: "#FF7A00" }} />
          <p className="text-sm text-gray-600 mb-2">by Refraction</p>
          <p className="text-2xl mt-1">Your lot. Alive after hours.</p>
        </div>

        <div className="mt-6 text-gray-600">
          <p className="mb-4">
            GhostLot™ connects shoppers to dealer inventory—whether they're on the lot or at home. Built by the Refraction team, it's designed to turn every vehicle into an interactive, hyper-mobile experience that works 24/7. Shoppers can view real-time pricing, schedule test drives, estimate payments, and reserve vehicles—all without needing to talk to a salesperson.
          </p>
          <p className="mb-4">
            Whether scanned on-site or shared through a link, GhostLot™ helps dealers convert interest into action faster—and makes shopping for a car feel more like everything else in 2025: easy, personal, and on your terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
          <Link href="/dashboard" className="bg-indigo-600 text-white rounded-lg px-6 py-4 text-center font-semibold hover:bg-indigo-700 transition duration-300">
            Dealer Dashboard
          </Link>
          <Link href="/consumer-view" className="bg-indigo-100 text-indigo-800 rounded-lg px-6 py-4 text-center font-semibold hover:bg-indigo-200 transition duration-300 border border-indigo-200">
            Consumer View
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Dealer Dashboard</h2>
            <p className="text-gray-700 text-left">
              Explore the internal tools dealers use to generate QR codes, manage inventory, customize their branding, and track engagement across vehicles. Everything syncs in real time and works out of the box.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800">Consumer View</h2>
            <p className="text-gray-700 text-left">
              See the mobile-friendly experience a shopper gets when scanning a GhostLot™ QR code. From specs and video reviews to trade-in tools and test drive scheduling, it's designed to work great on any phone—no app required.
            </p>
          </div>
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
      </div>
      
      {/* Footer */}
      <footer className="w-full mt-16 py-6 flex flex-col items-center gap-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">© 2025 GhostLot™. GhostLot™ is a Refraction product.</p>
      </footer>
    </main>
  );
}