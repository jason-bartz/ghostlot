import dynamic from 'next/dynamic';

// Dynamically import the LandingPage component
const LandingPage = dynamic(() => import('./landing-page'), {
  ssr: true, // Enable server-side rendering
  loading: () => <div>Loading...</div>
});

export default function Home() {
  return <LandingPage />;
}