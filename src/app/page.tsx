'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SparklesText } from '@/components/ui/sparkles-text';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden w-full bg-[#0F172A]">
      {/* Animated gradient background using purple/blue colors from index.html */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0F172A]">
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-[#1E293B] to-[#0F172A]" />
          {/* Glow effects similar to index.html */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-[#8B5CF644] to-transparent opacity-40" />
        </div>
      </div>
      
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(15, 23, 42)" /* --dark */
        gradientBackgroundEnd="rgb(5, 10, 26)" /* --darker */
        firstColor="139, 92, 246" /* --primary */
        secondColor="109, 40, 217" /* --primary-dark */
        thirdColor="167, 139, 250" /* --primary-light */
        fourthColor="251, 191, 36" /* --accent */
        fifthColor="51, 65, 85"    /* --gray-light */
        pointerColor="139, 92, 246" /* --primary */
        containerClassName="absolute inset-0 opacity-30"
      />
      
      <div className="container max-w-[1200px] mx-auto px-8 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8 max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <Image 
              src="/ghostlot.png" 
              alt="GhostLot Logo" 
              width={120} 
              height={120} 
              priority 
              className="mb-4 filter drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" 
            />
            <h1 className="relative text-6xl md:text-7xl mb-1 font-bold">
              <span className="bg-gradient-to-r from-[#F9FAFB] to-[#A78BFA] bg-clip-text text-transparent inline-block relative z-10">GhostLot™</span>
              <div className="absolute inset-0 -z-10 blur-[25px] opacity-70 bg-gradient-to-r from-[#8B5CF6]/40 to-[#A78BFA]/40" style={{ transform: 'scale(1.1)' }}></div>
            </h1>
            <p className="text-sm text-[#94A3B8] mb-2">by Refraction</p>
            <p className="text-2xl mt-1 text-[#F9FAFB]">Your lot. Alive after hours.</p>
            <p className="text-xl mt-2 text-[#94A3B8]">demo application</p>
          </div>

          <div className="mt-6 text-[#94A3B8]">
            <p className="mb-4">
              GhostLot™ connects shoppers to dealer inventory—whether they're on the lot or at home. Built by the Refraction team, it's designed to turn every vehicle into an interactive, hyper-mobile experience that works 24/7. Shoppers can view real-time pricing, schedule test drives, estimate payments, and reserve vehicles—all without needing to talk to a salesperson.
            </p>
            <p className="mb-4">
              Whether scanned on-site or shared through a link, GhostLot™ helps dealers convert interest into action faster—and makes shopping for a car feel more like everything else in 2025: easy, personal, and on your terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
            <Link href="/dashboard" 
              className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white rounded-lg px-6 py-4 text-center font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(139,92,246,0.4)] relative overflow-hidden group">
              <span className="relative z-10">Dealer Dashboard</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </Link>
            <Link href="/consumer-view" 
              className="bg-[#1E293B] text-[#F9FAFB] rounded-lg px-6 py-4 text-center font-semibold hover:bg-[#334155] transition-all duration-300 transform hover:-translate-y-1 border border-[#334155]">
              Consumer View
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
            <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155] shadow-md hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition duration-300">
              <h2 className="text-xl font-semibold mb-4 text-[#A78BFA]">Dealer Dashboard</h2>
              <p className="text-[#94A3B8] text-left">
                Explore the internal tools dealers use to generate QR codes, manage inventory, customize their branding, and track engagement across vehicles. Everything syncs in real time and works out of the box.
              </p>
            </div>
            
            <div className="bg-[#1E293B] rounded-lg p-6 border border-[#334155] shadow-md hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition duration-300">
              <h2 className="text-xl font-semibold mb-4 text-[#A78BFA]">Consumer View</h2>
              <p className="text-[#94A3B8] text-left">
                See the mobile-friendly experience a shopper gets when scanning a GhostLot™ QR code. From specs and video reviews to trade-in tools and test drive scheduling, it's designed to work great on any phone—no app required.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-[#1E293B] rounded-lg p-6 w-full border border-[#334155] shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#F9FAFB]">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">QR Code Generation System</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">Consumer Vehicle View</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">Inventory Management</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">Test Drive Scheduling</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">Vehicle Reservations</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FBBF24] mr-2 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                <span className="text-[#94A3B8]">Dealer Customization</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center gap-2 border-t border-[rgba(255,255,255,0.05)] mt-16 bg-[#050A1A] shadow-[0_0_5px_rgba(0,0,0,0.5)]">
        <p className="text-sm text-[#94A3B8]">© 2025 GhostLot™. GhostLot™ is a Refraction product.</p>
      </footer>
    </main>
  );
}