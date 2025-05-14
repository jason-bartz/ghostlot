// This script is responsible for loading the React dashboard demo on the landing page
(() => {
  // Create a new div to mount our React app
  const appRoot = document.createElement('div');
  appRoot.id = 'dashboard-demo-app';
  document.getElementById('dashboard-demo-container').appendChild(appRoot);

  // Load React and ReactDOM
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Display loading message while scripts load
  const loadingMessage = document.createElement('div');
  loadingMessage.style.cssText = 'text-align: center; padding: 40px; color: white;';
  loadingMessage.innerHTML = `
    <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid rgba(139, 92, 246, 0.3); border-radius: 50%; border-top-color: rgba(139, 92, 246, 1); animation: spin 1s ease-in-out infinite;"></div>
    <p style="margin-top: 20px; font-size: 16px;">Loading interactive dashboard demo...</p>
  `;
  
  // Add a style for the loading spinner animation
  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);
  
  appRoot.appendChild(loadingMessage);

  // Function to load the dashboard demo module
  const loadDashboardDemo = async () => {
    try {
      // Load Next.js runtime and React
      await loadScript('/_next/static/chunks/polyfills.js');
      await loadScript('/_next/static/chunks/webpack.js');
      await loadScript('/_next/static/chunks/main.js');
      await loadScript('/_next/static/chunks/react-refresh.js');
      
      // Load the dashboard demo chunk (this path may need to be adjusted based on your build)
      await loadScript('/_next/static/chunks/pages/dashboard-demo.js');
      
      // Remove loading message
      loadingMessage.remove();
      
      // The demo should be loaded and mounted by Next.js
      console.log('Dashboard demo loaded successfully');
    } catch (error) {
      console.error('Failed to load dashboard demo:', error);
      loadingMessage.innerHTML = `
        <p style="color: #f87171;">Unable to load interactive demo. Please reload the page to try again.</p>
      `;
    }
  };

  // Start loading the dashboard demo
  loadDashboardDemo();
})();