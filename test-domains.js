const http = require('http');

// Test domains
const domains = [
  { host: 'ghostlot.com', path: '/' },
  { host: 'www.ghostlot.com', path: '/' },
  { host: 'app.ghostlot.com', path: '/' }
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
        const containsLandingSignature = data.includes('dark background') || 
                                        (data.includes('Your lot. Alive after hours.') && 
                                        data.includes('background-color: var(--dark)'));
                                        
        const containsDemoSignature = data.includes('purple background') || 
                                     (data.includes('background-gradient-start="rgb(108, 0, 162)"') && 
                                      data.includes('Consumer View'));
        
        console.log('Content markers found:');
        console.log('- Landing page markers:', containsLandingSignature);
        console.log('- Demo page markers:', containsDemoSignature);
        
        if (containsLandingSignature) {
          console.log('✅ Landing page (dark-themed marketing site)');
          console.log('Content preview:', data.substring(0, 200) + '...');
        } else if (containsDemoSignature) {
          console.log('✅ Demo page (purple background with buttons)');
          console.log('Content preview:', data.substring(0, 200) + '...');
        } else {
          console.log('❌ Unknown content');
          console.log('Content preview:', data.substring(0, 200) + '...');
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