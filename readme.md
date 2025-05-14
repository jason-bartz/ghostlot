# GhostLot by Refraction - Dealership SaaS App

![GhostLot Logo](public/ghostlot-logo.png)

## Overview

GhostLot is a comprehensive SaaS platform for auto dealerships that revolutionizes the car buying and selling experience. This application enables dealerships to manage their inventory, generate QR codes for vehicles, track test drive requests, manage reservations, and analyze customer interactions with their inventory.

The platform consists of a marketing website (ghostlot.com) and a full-featured application interface (app.ghostlot.com) that serves both dealerships and consumers.

## Key Features

### For Dealerships

- **QR Code Generation**: Generate and print QR codes for vehicles in inventory
- **Inventory Management**: Add, edit, and track vehicles with status updates (Active, Reserved, Sold)
- **Customizable Profile**: Personalize the dealership's branding and business information
- **Test Drive Request Management**: Track and respond to customer test drive requests
- **Vehicle Reservation System**: Process vehicle reservations with status tracking
- **Analytics Dashboard**: Visualize performance metrics including QR scans, test drives, and more
- **Integrated Settings**: Connect with DMS providers and manage notifications

### For Consumers

- **Mobile-Optimized Vehicle View**: Scan QR codes to access comprehensive vehicle information
- **Vehicle Specs & Reviews**: View detailed specifications and expert reviews
- **Interactive Payment Calculator**: Calculate monthly payments with customizable terms
- **Trade-In Estimator**: Get estimated trade-in values
- **Test Drive Scheduling**: Schedule test drives directly through the app
- **Vehicle Reservation**: Reserve vehicles with secure deposits
- **User Profiles**: Save favorite vehicles and track appointments

## Demo

This is a demo version of the GhostLot platform that showcases the core functionality. It includes:

1. A toggle feature to switch between dealer and consumer views
2. Sample data for demonstration purposes
3. Interactive UI components that simulate the full application experience

## Technical Details

- Built with Next.js 13.4 (App Router) and React 18
- Styled with Tailwind CSS
- Supabase for authentication and database
- Uses Lucide React for icons
- Framer Motion for animations
- Mobile-responsive design with adaptive layouts
- Interactive UI with gradient animations
- Implements modern React patterns including hooks and context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ghostlot-demo.git
   cd ghostlot-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following content:
   ```
   # Supabase Environment Variables
   # For development, you'll need to replace these with your actual Supabase credentials
   # or use placeholder values for development without a Supabase instance
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-supabase-settings
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

6. To run domain testing (test how different domains are handled):
   ```bash
   npm run test-domains
   ```
   Note: The Next.js dev server must be running for this test to work.

## Supabase Configuration

This application uses Supabase for backend services including authentication and database. For development and testing:

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Copy your project URL (Settings > API > Project URL) and anon key (Settings > API > Project API keys) to the `.env.local` file
4. To set up the required tables and schema, see the [database setup guide](database-setup.md)

Note: For development without a Supabase instance, you can use mock values in the environment variables, but many features will not work correctly.

## Deployment

For deployment instructions, please see [DEPLOYMENT.md](DEPLOYMENT.md).

## Project Structure

```
ghostlot/
├── public/                      # Static assets
│   ├── index.html               # Marketing website HTML (served at ghostlot.com)
│   ├── ghostlot-favicon.svg     # Favicon
│   ├── ghostlot-logo.png        # Logo
│   └── assets/                  # Other static assets like images and PDFs
├── src/
│   ├── app/                     # Next.js App Router structure
│   │   ├── (auth)/              # Authentication routes (login, signup)
│   │   ├── admin/               # Admin panel routes
│   │   ├── consumer-view/       # Consumer-facing pages
│   │   ├── dashboard/           # Dealer dashboard routes
│   │   │   ├── analytics/       # Analytics dashboard
│   │   │   ├── inventory/       # Inventory management
│   │   │   ├── qr-codes/        # QR code generation
│   │   │   ├── reservations/    # Reservation management
│   │   │   ├── settings/        # Dealer settings
│   │   │   └── test-drives/     # Test drive management
│   │   ├── vehicle/             # Individual vehicle pages
│   │   ├── globals.css          # Global CSS styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Root page
│   ├── components/              # React components
│   │   ├── admin/               # Admin-specific components
│   │   ├── analytics/           # Analytics components
│   │   ├── auth/                # Authentication components
│   │   ├── common/              # Shared components
│   │   ├── inventory/           # Inventory management components
│   │   ├── qrcode/              # QR code related components
│   │   ├── reservations/        # Reservation components
│   │   ├── settings/            # Settings components
│   │   ├── testdrive/           # Test drive components
│   │   ├── ui/                  # UI components (buttons, cards, etc.)
│   │   └── vehicle/             # Vehicle-specific components
│   ├── contexts/                # React context providers
│   ├── lib/                     # Utility libraries and helpers
│   ├── middleware.ts            # Next.js middleware for routing
│   └── utils/                   # Utility functions and services
├── .gitignore
├── CLAUDE.md                    # Claude instructions file
├── COMPONENT_SYNC.md            # Component synchronization guidelines
├── database-setup.md            # Database setup instructions
├── middleware.ts                # Root middleware for domain routing
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── sync-check.js                # Component sync verification script
├── tailwind.config.js           # Tailwind CSS configuration
└── test-domains.js              # Domain routing test utility
```

## Development Utilities

### Component Sync Check

The project includes a component synchronization system that ensures consumer-view pages maintain consistent structure:

```bash
npm run sync-check
```

This utility verifies that consumer-facing components follow the established patterns and structure.

### Domain Testing

Test the domain-based routing with:

```bash
npm run test-domains
```

This utility validates that different domains (ghostlot.com, www.ghostlot.com, app.ghostlot.com) correctly serve the appropriate content.

## UI Component Library

The project includes several custom UI components:

- **Gradient Components**: Multiple gradient background options with different animation styles:
  - `BackgroundGradientAnimation`: Complex multi-layer interactive gradient
  - `AnimatedGradientBackground`: Simpler breathing gradient with theme support
  - `DemoGradient`: Ready-to-use demo implementations with content

- **Data Management Utilities**: 
  - `TestDataSetup`: Tools for generating sample data for development and demos
  - `SampleDataGenerator`: Utility for creating realistic test data
  - `DataImportService`: Service for importing and managing sample data

## License

This demo is provided for demonstration purposes only.

## Contact

For more information about Refraction and GhostLot, contact:

- Website: [www.refraction.dev](https://www.refraction.dev)
- Email: info@refraction.dev

---

*Note: This is a demo application and not intended for production use without further development and security enhancements.*
