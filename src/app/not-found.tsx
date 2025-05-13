export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-5 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <div className="text-5xl mb-8">👻</div>
      <p className="text-xl mb-8">Oops! This page has vanished like a ghost.</p>
      <a 
        href="/" 
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
      >
        Return to Home
      </a>
    </div>
  );
}