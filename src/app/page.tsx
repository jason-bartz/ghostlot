'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SparklesText } from '@/components/ui/sparkles-text';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { useEffect } from 'react';

export default function Home() {
  // Initialize Tally when component mounts
  useEffect(() => {
    // This loads the Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full bg-[#0F172A]">
      {/* Animated gradient background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0F172A]">
        <div className="absolute inset-0 opacity-40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-[#1E293B] to-[#0F172A]" />
          {/* Glow effects */}
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
      
      {/* Header */}
      <header className="w-full fixed top-0 left-0 right-0 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="container max-w-[1200px] mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image 
                src="/ghostlot.png" 
                alt="GhostLot Logo - 24/7 Automotive Digital Retail Solution" 
                width={40} 
                height={40} 
                className="filter drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" 
              />
              <div className="ml-3 text-2xl font-extrabold bg-gradient-to-r from-[#A78BFA] to-[#FBBF24] bg-clip-text text-transparent">GhostLot</div>
            </div>
            <nav aria-label="Main Navigation">
              <div className="hidden md:flex gap-8">
                <a href="#features" className="text-white hover:text-[#A78BFA] transition-colors font-medium">Features</a>
                <a href="#how-it-works" className="text-white hover:text-[#A78BFA] transition-colors font-medium">How It Works</a>
                <a href="#benefits" className="text-white hover:text-[#A78BFA] transition-colors font-medium">Benefits</a>
                <Link href="/demo" className="text-[#FBBF24] font-semibold hover:text-[#F59E0B] transition-colors">Try Demo</Link>
              </div>
            </nav>
            <button 
              className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(139,92,246,0.4)] relative overflow-hidden"
              data-tally-open="n9a8vp" 
              data-tally-layout="modal" 
              data-tally-overlay="1" 
              data-tally-emoji-text="👻" 
              data-tally-emoji-animation="wave"
            >
              <span className="relative z-10">Join the Waitlist</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 -translate-x-full hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 relative" aria-label="GhostLot introduction">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-4xl text-[#FBBF24] animate-bounce mb-4" aria-hidden="true">✨</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
              Don't Get Ghosted by Your Leads.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl mb-8 max-w-3xl">
              GhostLot connects shoppers to dealer inventory—whether they're on the lot or at home. It's designed to turn every vehicle into an interactive, hyper-mobile experience that works 24/7. Shoppers can view real-time pricing, schedule test drives, estimate payments, and reserve vehicles—all without needing to talk to a salesperson.
            </p>
            <button 
              className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(139,92,246,0.4)] text-lg mb-12"
              data-tally-open="n9a8vp" 
              data-tally-layout="modal" 
              data-tally-overlay="1" 
              data-tally-emoji-text="👻" 
              data-tally-emoji-animation="wave"
            >
              Join the Waitlist
            </button>
            
            {/* Hero Image */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-radial from-[#8B5CF6]/30 to-transparent blur-[30px]"></div>
              <Image 
                src="/website/website-demo.gif" 
                alt="GhostLot application interface showing dealer dashboard" 
                width={900}
                height={506}
                className="rounded-xl border border-[#8B5CF6]/30 shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:shadow-[0_0_70px_rgba(139,92,246,0.7)] transition-all duration-500 hover:scale-[1.02] relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 bg-[#050A1A]" aria-label="GhostLot Features">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
              Powerful Features Built for Dealers
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto">
              GhostLot turns your entire inventory into a self-service dealership, maximizing engagement and conversions even when you're closed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Interactive QR Codes</h3>
              <p className="text-[#94A3B8]">
                Generate custom QR codes for each vehicle in your inventory. Place them on windshields, brochures, or print ads to create instant digital connections to your inventory.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📱
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Mobile-First Experience</h3>
              <p className="text-[#94A3B8]">
                Deliver a seamless mobile experience that works on any device. No app downloads required – customers simply scan and start browsing.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Real-Time Analytics</h3>
              <p className="text-[#94A3B8]">
                Track scans, test drive requests, saved vehicles, and more. Gain insights into which vehicles are getting the most attention and optimize your inventory accordingly.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🗓️
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Automated Scheduling</h3>
              <p className="text-[#94A3B8]">
                Allow customers to book test drives directly from their phones. Manage all appointments from a single dashboard and never miss a potential sale.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Digital Reservations</h3>
              <p className="text-[#94A3B8]">
                Accept deposits and secure vehicle reservations online. Customers can hold their dream car with just a few taps, even outside business hours.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="h-1 w-full bg-gradient-to-r from-[#8B5CF6] to-[#FBBF24] absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🔗
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">DMS Integration</h3>
              <p className="text-[#94A3B8]">
                Seamlessly connect with your dealer management system for real-time inventory updates. No manual data entry required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-20 bg-[#0F172A] relative" aria-label="How GhostLot Works">
        <div className="absolute inset-0 bg-gradient-radial from-[#8B5CF644] to-transparent opacity-30"></div>
        <div className="container max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
              How GhostLot Works
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto">
              Get up and running in minutes with our simple four-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
              <p className="text-[#94A3B8]">
                Link your inventory through our DMS integrations or manual upload.
              </p>
              
              {/* Connector line - visible only on desktop */}
              <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent hidden lg:block" style={{ width: 'calc(100% - 4rem)', left: 'calc(50% + 2rem)' }}></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Generate</h3>
              <p className="text-[#94A3B8]">
                Create custom QR codes for each vehicle in your inventory.
              </p>
              
              {/* Connector line - visible only on desktop */}
              <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent hidden lg:block" style={{ width: 'calc(100% - 4rem)', left: 'calc(50% + 2rem)' }}></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Place</h3>
              <p className="text-[#94A3B8]">
                Put QR codes on vehicles and marketing materials.
              </p>
              
              {/* Connector line - visible only on desktop */}
              <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#8B5CF6] to-transparent hidden lg:block" style={{ width: 'calc(100% - 4rem)', left: 'calc(50% + 2rem)' }}></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-6 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Engage</h3>
              <p className="text-[#94A3B8]">
                Monitor leads and conversions through your dealer dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="w-full py-20 bg-[#050A1A]" aria-label="GhostLot Benefits">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
                Why Dealers Choose GhostLot
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="text-[#FBBF24] mr-4 text-xl flex-shrink-0 pt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">24/7 Sales Opportunities</h4>
                    <p className="text-[#94A3B8]">
                      Convert after-hours lot visitors into qualified leads, even when your showroom is closed.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-[#FBBF24] mr-4 text-xl flex-shrink-0 pt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Reduced Staffing Pressures</h4>
                    <p className="text-[#94A3B8]">
                      Let customers self-serve basic information needs, freeing your sales team to focus on high-value activities.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-[#FBBF24] mr-4 text-xl flex-shrink-0 pt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Modern Shopping Experience</h4>
                    <p className="text-[#94A3B8]">
                      Meet evolving consumer expectations with a digital-first approach that today's car buyers prefer.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-[#FBBF24] mr-4 text-xl flex-shrink-0 pt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Increased Engagement</h4>
                    <p className="text-[#94A3B8]">
                      Boost interaction with your inventory through interactive features and digital touchpoints.
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-[#FBBF24] mr-4 text-xl flex-shrink-0 pt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">✓</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Data-Driven Insights</h4>
                    <p className="text-[#94A3B8]">
                      Leverage analytics to understand customer behavior and optimize your inventory and marketing strategy.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-[#8B5CF6]/30 to-transparent blur-[30px] -z-10"></div>
              <Image 
                src="/website/mobile-image-2.webp" 
                alt="GhostLot mobile application showing vehicle details, pricing and scheduling interface" 
                width={500} 
                height={680} 
                className="rounded-xl border border-[#334155] shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] transition-all duration-500 transform perspective-[1000px] hover:rotate-y-0 rotate-y-[-5deg] mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-20 bg-gradient-to-b from-[#0F172A] to-[#6D28D9]" aria-label="Try GhostLot Demo">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#A78BFA] bg-clip-text text-transparent">
              Try Our Interactive Demo
            </h2>
            <p className="text-[#94A3B8] text-lg max-w-3xl mx-auto">
              Experience GhostLot's dealer dashboard firsthand. See how easy it is to manage inventory, generate QR codes, and track customer engagement.
            </p>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/demo" 
              className="inline-flex items-center bg-[#FBBF24] text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-xl hover:bg-[#F59E0B] transition-colors shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">✨</span> Launch Interactive Demo
            </Link>
            <p className="mt-4 text-sm text-[#94A3B8]">
              No sign-up required. Experience the dealer dashboard instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-[#050A1A]" aria-label="Join GhostLot Waitlist">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] rounded-2xl p-16 shadow-2xl relative overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-[spin_20s_linear_infinite]"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to transform your dealership?
              </h2>
              <p className="text-white/90 text-lg mb-10">
                Join the waitlist today to be among the first dealers to access GhostLot. Limited spots available for our early access program.
              </p>
              <button 
                className="bg-white text-[#6D28D9] px-8 py-4 rounded-xl font-semibold text-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
                data-tally-open="n9a8vp" 
                data-tally-layout="modal" 
                data-tally-overlay="1" 
                data-tally-emoji-text="👻" 
                data-tally-emoji-animation="wave"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#050A1A] border-t border-[rgba(255,255,255,0.05)]" aria-label="Footer">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Image 
                src="/ghostlot.png" 
                alt="GhostLot Logo" 
                width={40} 
                height={40} 
                className="filter drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" 
              />
              <div className="ml-3 text-2xl font-extrabold bg-gradient-to-r from-[#A78BFA] to-[#FBBF24] bg-clip-text text-transparent">GhostLot</div>
            </div>
            <p className="text-[#94A3B8] max-w-md">
              Don't Get Ghosted by Your Leads.
              <br />
              GhostLot connects shoppers to dealer inventory with a seamless mobile experience that works 24/7.
            </p>
            <div className="mt-6 flex">
              <a 
                href="https://linkedin.com/company/ghostlot" 
                className="w-10 h-10 bg-[#1E293B] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.05)] hover:bg-gradient-to-br hover:from-[#8B5CF6] hover:to-[#6D28D9] transition-colors duration-300 shadow-md hover:shadow-lg"
                aria-label="Connect with GhostLot on LinkedIn"
                rel="noopener"
                target="_blank"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#94A3B8] hover:text-white transition-colors duration-300">
                  <path d="M22.4412 0H1.55882C0.697059 0 0 0.697059 0 1.55882V22.4412C0 23.3029 0.697059 24 1.55882 24H22.4412C23.3029 24 24 23.3029 24 22.4412V1.55882C24 0.697059 23.3029 0 22.4412 0ZM7.15059 20.4706H3.67059V9.04235H7.15059V20.4706ZM5.41059 7.49647C4.26353 7.49647 3.33176 6.56471 3.33176 5.42118C3.33176 4.27765 4.26353 3.34588 5.41059 3.34588C6.55412 3.34588 7.48588 4.27765 7.48588 5.42118C7.48588 6.56471 6.55412 7.49647 5.41059 7.49647ZM20.4706 20.4706H16.9906V14.9647C16.9906 13.6447 16.97 11.9153 15.1329 11.9153C13.2753 11.9153 12.9847 13.3976 12.9847 14.9224V20.4706H9.50471V9.04235H12.8447V10.5871H12.8853C13.3765 9.69176 14.5447 8.74588 16.2741 8.74588C19.7953 8.74588 20.4706 11.0659 20.4706 14.0735V20.4706Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center text-sm text-[#94A3B8] pt-8 border-t border-[rgba(255,255,255,0.05)]">
            © 2025 GhostLot by Refraction. All rights reserved.
          </div>
        </div>
      </footer>

      {/* JavaScript for smooth scrolling */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Simple scroll to sections
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              if (targetId === '#') return;
              
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            });
          });
        `
      }} />
    </main>
  );
}