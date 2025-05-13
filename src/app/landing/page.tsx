export default function LandingPage() {
  // Add metadata to help identify this page during testing
  return (
    <div>
      {/* This comment is used for testing - dark background */}
      <div dangerouslySetInnerHTML={{ __html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GhostLot™ - Your Lot. Alive After Hours.</title>
    <meta name="description" content="GhostLot™ connects automotive shoppers to dealer inventory 24/7 with interactive QR codes, digital reservations, and self-service features - even when the dealership is closed.">
    <meta name="keywords" content="car dealership software, automotive digital retailing, QR code inventory, dealership tech, after hours car shopping">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ghostlot.com">
    <meta property="og:title" content="GhostLot™ - Your Lot. Alive After Hours.">
    <meta property="og:description" content="Transform your dealership with 24/7 digital connections to your inventory. GhostLot™ lets shoppers view, save, and reserve vehicles even when you're closed.">
    <meta property="og:image" content="/opengraph.webp">
    <meta property="og:image:alt" content="GhostLot mobile dealership experience">
    <meta property="og:site_name" content="GhostLot™">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://ghostlot.com">
    <meta name="twitter:title" content="GhostLot™ - Your Lot. Alive After Hours.">
    <meta name="twitter:description" content="Transform your dealership with 24/7 digital connections to your inventory. GhostLot™ lets shoppers view, save, and reserve vehicles even when you're closed.">
    <meta name="twitter:image" content="/opengraph.webp">
    <meta name="twitter:image:alt" content="GhostLot mobile dealership experience">
    
    <style>
        :root {
            --primary: #8B5CF6;           /* Vibrant purple */
            --primary-dark: #6D28D9;      /* Deeper purple */
            --primary-light: #A78BFA;     /* Light purple */
            --accent: #FBBF24;            /* Gold for contrast */
            --dark: #0F172A;              /* Very dark blue/black */
            --darker: #050A1A;            /* Even darker for sections */
            --light: #F9FAFB;             /* White/light for text */
            --gray: #94A3B8;              /* Medium gray */
            --gray-dark: #1E293B;         /* Dark gray for cards */
            --gray-light: #334155;        /* Lighter gray for borders */
            --glow-purple: #8B5CF644;     /* Purple with transparency for glow effects */
            --glow-gold: #FBBF2444;       /* Gold with transparency for glow effects */
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            color: var(--light);
            background-color: var(--dark);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            z-index: 2;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            z-index: 100;
        }

        .header-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 0;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            height: 2.5rem;
            filter: drop-shadow(0 0 8px var(--glow-purple));
        }

        .logo-text {
            font-size: 1.5rem;
            font-weight: 800;
            margin-left: 0.75rem;
            background: linear-gradient(to right, var(--primary-light), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 15px var(--glow-purple);
        }

        .nav-links {
            display: flex;
            gap: 2rem;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--light);
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, var(--primary), var(--accent));
            transition: width 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--primary-light);
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .cta-button {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            padding: 0.75rem 1.75rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px var(--glow-purple);
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: 0.5s;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 25px var(--glow-purple);
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .hero {
            margin-top: 0;
            padding: 10rem 0 6rem;
            background: radial-gradient(circle at top right, var(--gray-dark), var(--dark));
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 70% 30%, var(--glow-purple), transparent 35%);
            opacity: 0.4;
        }

        .hero-content {
            max-width: 650px;
            position: relative;
            z-index: 2;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(to right, var(--light), var(--primary-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 20px var(--glow-purple);
        }

        .hero p {
            font-size: 1.25rem;
            color: var(--gray);
            margin-bottom: 2.5rem;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }

        .hero-stars {
            position: absolute;
            top: 10px;
            right: 100px;
            color: var(--accent);
            font-size: 2rem;
            animation: float 3s ease-in-out infinite;
            text-shadow: 0 0 15px var(--glow-gold);
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .hero-image {
            position: absolute;
            right: -5%;
            top: 50%;
            transform: translateY(-50%);
            width: 50%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
            opacity: 0.85;
            transition: all 0.5s ease;
        }

        .hero-image:hover {
            transform: translateY(-50%) scale(1.02);
            opacity: 1;
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.5);
        }

        .sparkles-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }

        .section {
            padding: 8rem 0;
            position: relative;
        }

        .section:nth-child(odd) {
            background-color: var(--darker);
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
            position: relative;
        }

        .section-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(to right, var(--light), var(--primary-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .section-header p {
            max-width: 700px;
            margin: 0 auto;
            color: var(--gray);
            font-size: 1.125rem;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }

        .feature-card {
            background-color: var(--gray-dark);
            padding: 2rem;
            border-radius: 1rem;
            border: 1px solid var(--gray-light);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            z-index: -1;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-icon {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px var(--glow-purple);
        }

        .feature-card:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 0 25px var(--glow-purple);
        }

        .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--light);
        }

        .feature-card p {
            color: var(--gray);
            line-height: 1.7;
        }

        .how-it-works {
            background: radial-gradient(circle at center, var(--gray-dark), var(--darker));
            position: relative;
            overflow: hidden;
        }

        .how-it-works::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 70%, var(--glow-purple), transparent 35%);
            opacity: 0.3;
        }

        .steps {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            position: relative;
            z-index: 2;
        }

        .step {
            position: relative;
            text-align: center;
        }

        .step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 2rem;
            right: -1.5rem;
            width: 3rem;
            height: 2px;
            background: linear-gradient(to right, var(--primary), transparent);
            z-index: 1;
        }

        .step-number {
            width: 4rem;
            height: 4rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.5rem;
            font-weight: 600;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 15px var(--glow-purple);
            transition: all 0.3s ease;
        }

        .step:hover .step-number {
            transform: scale(1.1);
            box-shadow: 0 0 25px var(--glow-purple);
        }

        .step h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--light);
        }

        .step p {
            color: var(--gray);
            font-size: 0.95rem;
        }

        .benefits {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .benefits-content h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(to right, var(--light), var(--primary-light));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .benefits-list {
            list-style: none;
        }

        .benefits-list li {
            margin-bottom: 2rem;
            display: flex;
            align-items: flex-start;
            transition: transform 0.3s ease;
        }

        .benefits-list li:hover {
            transform: translateX(5px);
        }

        .check-icon {
            color: var(--accent);
            margin-right: 1rem;
            font-size: 1.25rem;
            flex-shrink: 0;
            text-shadow: 0 0 10px var(--glow-gold);
        }

        .benefits-list h4 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--light);
        }

        .benefits-list p {
            color: var(--gray);
            line-height: 1.7;
        }

        .benefits-image {
            width: 100%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: all 0.5s ease;
            transform: perspective(1000px) rotateY(-5deg);
            border: 1px solid var(--gray-light);
        }

        .benefits-image:hover {
            transform: perspective(1000px) rotateY(0);
            box-shadow: 0 15px 40px rgba(139, 92, 246, 0.3);
        }

        .cta-section {
            background: linear-gradient(45deg, var(--primary-dark), var(--primary));
            color: white;
            text-align: center;
            border-radius: 1rem;
            padding: 4rem 2rem;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }

        .cta-section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 2;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .cta-section p {
            font-size: 1.125rem;
            max-width: 700px;
            margin: 0 auto 2.5rem;
            position: relative;
            z-index: 2;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            z-index: 2;
        }

        .cta-primary {
            background-color: white;
            color: var(--primary);
            border: none;
            padding: 0.85rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-primary:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
        }

        footer {
            background-color: var(--darker);
            color: var(--light);
            padding: 4rem 0 2rem;
            position: relative;
            overflow: hidden;
        }

        footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }

        .footer-logo img {
            height: 2.5rem;
            filter: drop-shadow(0 0 8px var(--glow-purple));
        }

        .footer-logo-text {
            font-size: 1.5rem;
            font-weight: 800;
            margin-left: 0.75rem;
            background: linear-gradient(to right, var(--primary-light), var(--accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .footer-description {
            color: var(--gray);
            margin-bottom: 1.5rem;
            max-width: 400px;
        }

        .copyright {
            text-align: center;
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            color: var(--gray);
            font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
            .hero h1 {
                font-size: 3rem;
            }

            .hero-image {
                width: 40%;
            }

            .features {
                grid-template-columns: repeat(2, 1fr);
            }

            .steps {
                grid-template-columns: repeat(2, 1fr);
                gap: 3rem;
            }

            .step:nth-child(2)::after {
                display: none;
            }
        }

        @media (max-width: 768px) {
            .header-inner {
                flex-direction: column;
                padding: 1rem 0;
            }

            .nav-links {
                margin: 1rem 0;
            }

            .hero {
                padding: 8rem 0 4rem;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.125rem;
            }

            .hero-image {
                display: none;
            }

            .hero-content {
                max-width: none;
                text-align: center;
            }

            .section {
                padding: 4rem 0;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .features {
                grid-template-columns: 1fr;
            }

            .steps {
                grid-template-columns: 1fr;
            }

            .step::after {
                display: none;
            }

            .benefits {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .cta-buttons {
                flex-direction: column;
                gap: 1rem;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 0 1rem;
            }

            .nav-links {
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }

            .hero h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    
    <header>
        <div class="container">
            <div class="header-inner">
                <div class="logo">
                    <img src="/ghostlot-favicon.svg" alt="GhostLot Logo - 24/7 Automotive Digital Retail Solution">
                    <div class="logo-text">GhostLot™</div>
                </div>
                <nav aria-label="Main Navigation">
                    <div class="nav-links">
                        <a href="#features" aria-label="Learn about GhostLot features">Features</a>
                        <a href="#how-it-works" aria-label="Discover how GhostLot works">How It Works</a>
                        <a href="#benefits" aria-label="See dealer benefits">Benefits</a>
                    </div>
                </nav>
                <button class="cta-button" data-tally-open="n9a8vp" data-tally-layout="modal" data-tally-overlay="1" data-tally-emoji-text="👻" data-tally-emoji-animation="wave" aria-label="Join the GhostLot waitlist">Join the Waitlist</button>
            </div>
        </div>
    </header>

    <section class="hero" aria-label="GhostLot introduction">
        <div class="sparkles-container" id="sparkles-effect"></div>
        <div class="container">
            <div class="hero-content">
                <span class="hero-stars" aria-hidden="true">✨</span>
                <h1>Your lot. Alive after hours.</h1>
                <p>GhostLot™ connects shoppers to dealer inventory—whether they're on the lot or at home. It's designed to turn every vehicle into an interactive, hyper-mobile experience that works 24/7. Shoppers can view real-time pricing, schedule test drives, estimate payments, and reserve vehicles—all without needing to talk to a salesperson.</p>
                <button class="cta-button" data-tally-open="n9a8vp" data-tally-layout="modal" data-tally-overlay="1" data-tally-emoji-text="👻" data-tally-emoji-animation="wave" aria-label="Join the GhostLot waitlist">Join the Waitlist</button>
            </div>
            <img src="/website/desktop-image.png" alt="GhostLot mobile application interface showing vehicle details and pricing" class="hero-image" loading="eager" width="600" height="400" />
        </div>
    </section>

    <section class="section" id="features" aria-label="GhostLot Features">
        <div class="container">
            <div class="section-header">
                <h2>Powerful Features Built for Dealers</h2>
                <p>GhostLot™ turns your entire inventory into a self-service dealership, maximizing engagement and conversions even when you're closed.</p>
            </div>
            <div class="features">
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">🔍</div>
                    <h3>Interactive QR Codes</h3>
                    <p>Generate custom QR codes for each vehicle in your inventory. Place them on windshields, brochures, or print ads to create instant digital connections to your inventory.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">📱</div>
                    <h3>Mobile-First Experience</h3>
                    <p>Deliver a seamless mobile experience that works on any device. No app downloads required – customers simply scan and start browsing.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">📊</div>
                    <h3>Real-Time Analytics</h3>
                    <p>Track scans, test drive requests, saved vehicles, and more. Gain insights into which vehicles are getting the most attention and optimize your inventory accordingly.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">🗓️</div>
                    <h3>Automated Scheduling</h3>
                    <p>Allow customers to book test drives directly from their phones. Manage all appointments from a single dashboard and never miss a potential sale.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">💰</div>
                    <h3>Digital Reservations</h3>
                    <p>Accept deposits and secure vehicle reservations online. Customers can hold their dream car with just a few taps, even outside business hours.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon" aria-hidden="true">🔗</div>
                    <h3>DMS Integration</h3>
                    <p>Seamlessly connect with your dealer management system for real-time inventory updates. No manual data entry required.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section how-it-works" id="how-it-works" aria-label="How GhostLot Works">
        <div class="container">
            <div class="section-header">
                <h2>How GhostLot™ Works</h2>
                <p>Get up and running in minutes with our simple four-step process.</p>
            </div>
            <div class="steps">
                <div class="step">
                    <div class="step-number" aria-hidden="true">1</div>
                    <h3>Connect</h3>
                    <p>Link your inventory through our DMS integrations or manual upload.</p>
                </div>
                <div class="step">
                    <div class="step-number" aria-hidden="true">2</div>
                    <h3>Generate</h3>
                    <p>Create custom QR codes for each vehicle in your inventory.</p>
                </div>
                <div class="step">
                    <div class="step-number" aria-hidden="true">3</div>
                    <h3>Place</h3>
                    <p>Put QR codes on vehicles and marketing materials.</p>
                </div>
                <div class="step">
                    <div class="step-number" aria-hidden="true">4</div>
                    <h3>Engage</h3>
                    <p>Monitor leads and conversions through your dealer dashboard.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section" id="benefits" aria-label="GhostLot Benefits">
        <div class="container">
            <div class="benefits">
                <div class="benefits-content">
                    <h2>Why Dealers Choose GhostLot™</h2>
                    <ul class="benefits-list">
                        <li>
                            <div class="check-icon" aria-hidden="true">✓</div>
                            <div>
                                <h4>24/7 Sales Opportunities</h4>
                                <p>Convert after-hours lot visitors into qualified leads, even when your showroom is closed.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon" aria-hidden="true">✓</div>
                            <div>
                                <h4>Reduced Staffing Pressures</h4>
                                <p>Let customers self-serve basic information needs, freeing your sales team to focus on high-value activities.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon" aria-hidden="true">✓</div>
                            <div>
                                <h4>Modern Shopping Experience</h4>
                                <p>Meet evolving consumer expectations with a digital-first approach that today's car buyers prefer.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon" aria-hidden="true">✓</div>
                            <div>
                                <h4>Increased Engagement</h4>
                                <p>Boost interaction with your inventory through interactive features and digital touchpoints.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon" aria-hidden="true">✓</div>
                            <div>
                                <h4>Data-Driven Insights</h4>
                                <p>Leverage analytics to understand customer behavior and optimize your inventory and marketing strategy.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <img src="/website/mobile-image-2.webp" alt="GhostLot mobile application showing vehicle details, pricing and scheduling interface" class="benefits-image" loading="lazy" width="500" height="680" />
            </div>
        </div>
    </section>

    <section class="section" aria-label="Join GhostLot Waitlist">
        <div class="container">
            <div class="cta-section">
                <h2>Ready to transform your dealership?</h2>
                <p>Join the waitlist today to be among the first dealers to access GhostLot™. Limited spots available for our early access program.</p>
                <div class="cta-buttons">
                    <button class="cta-primary" data-tally-open="n9a8vp" data-tally-layout="modal" data-tally-overlay="1" data-tally-emoji-text="👻" data-tally-emoji-animation="wave" aria-label="Join the GhostLot waitlist">Join the Waitlist</button>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div>
                    <div class="footer-logo">
                        <img src="/ghostlot-favicon.svg" alt="GhostLot Logo" width="40" height="40">
                        <div class="footer-logo-text">GhostLot™</div>
                    </div>
                    <p class="footer-description">
                        Your lot. Alive after hours.
                        <br />
                        GhostLot™ connects shoppers to dealer inventory with a seamless mobile experience that works 24/7.
                    </p>
                </div>
            </div>
            <div class="copyright">
                © 2025 GhostLot™ by Refraction. All rights reserved.
            </div>
        </div>
    </footer>

    <script>
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

        // Sticky header effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Create floating particles effect
        function createParticles() {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles';
            document.body.appendChild(particlesContainer);
            
            const numberOfParticles = 30;
            
            for (let i = 0; i < numberOfParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 2px and 6px
                const size = Math.random() * 4 + 2;
                particle.style.width = \`\${size}px\`;
                particle.style.height = \`\${size}px\`;
                
                // Random horizontal position
                const xPos = Math.random() * 100;
                particle.style.left = \`\${xPos}%\`;
                
                // Random animation duration between 10s and 30s
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = \`\${duration}s\`;
                
                // Random delay so they don't all start at the same time
                const delay = Math.random() * 10;
                particle.style.animationDelay = \`\${delay}s\`;
                
                // Add particle to the container
                particlesContainer.appendChild(particle);
            }
        }
        
        // Initialize particles when the page loads
        window.addEventListener('DOMContentLoaded', createParticles);
    </script>
</body>
</html>
    ` }}/>
      </div>
  );
}