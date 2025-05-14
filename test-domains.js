const http = require('http');

/**
 * Domain Testing Utility
 * 
 * This script tests how different domains are handled by the Next.js application.
 * It simulates requests to different domains and checks whether the appropriate
 * content is served based on the domain:
 * 
 * - ghostlot.com & www.ghostlot.com: Should serve the marketing site from index.html
 * - app.ghostlot.com: Should serve the application interface
 * 
 * Run this script with 'node test-domains.js' while the Next.js dev server is running
 * to verify correct domain-based routing.
 */

// Test domains
const domains = [
  { host: 'ghostlot.com', path: '/', expected: 'landing' },
  { host: 'www.ghostlot.com', path: '/', expected: 'landing' },
  { host: 'app.ghostlot.com', path: '/', expected: 'app' }
];

// Function to make a request
async function makeRequest(domain) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: domain.path,
      method: 'GET',
      headers: {
        'Host': domain.host
      }
    };

    const req = http.request(options, (res) => {
      console.log(`\n--- Request to ${domain.host}${domain.path} ---`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Location: ${res.headers.location || 'No redirect'}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // More specific checks for content
        // Updated to check for main website content served from index.html
        const containsLandingSignature = data.includes('dark background') || 
                                        (data.includes('Your lot. Alive after hours.') && 
                                        data.includes('background-color: var(--dark)')) ||
                                        data.includes('GhostLot lets your inventory sell itself');
                                        
        // Updated to check for demo page / app content
        const containsDemoSignature = data.includes('purple background') || 
                                     (data.includes('background-gradient-start="rgb(108, 0, 162)"') && 
                                      data.includes('Consumer View')) ||
                                     data.includes('AnimatedGradientBackground');
        
        console.log('Content markers found:');
        console.log('- Landing page markers:', containsLandingSignature);
        console.log('- App/Demo page markers:', containsDemoSignature);
        
        // Verify against expected content type
        const expectedType = domain.expected === 'landing' ? 'Landing page' : 'App interface';
        const actualType = containsLandingSignature ? 'Landing page' : 
                           containsDemoSignature ? 'App interface' : 'Unknown';
        const matchesExpected = (
          (domain.expected === 'landing' && containsLandingSignature) ||
          (domain.expected === 'app' && containsDemoSignature)
        );
        
        if (matchesExpected) {
          console.log(`✅ CORRECT: Expected ${expectedType}, got ${actualType}`);
          console.log('Content preview:', data.substring(0, 200) + '...');
        } else {
          console.log(`❌ INCORRECT: Expected ${expectedType}, got ${actualType}`);
          console.log('Content preview:', data.substring(0, 200) + '...');
          console.log('This may indicate an issue with domain routing in middleware.ts');
        }
        
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`Error: ${e.message}`);
      reject(e);
    });

    req.end();
  });
}

// Main function to test all domains
async function testDomains() {
  console.log('Starting domain routing tests...');
  console.log('Make sure your Next.js server is running on port 3000');
  
  for (const domain of domains) {
    try {
      await makeRequest(domain);
    } catch (e) {
      console.error(`Failed to test ${domain.host}: ${e.message}`);
    }
  }
  
  console.log('\nDomain testing complete!');
}

testDomains();