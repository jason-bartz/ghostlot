const fs = require('fs');
const path = require('path');

// Function to check if two files have the same component structure
function checkComponentStructure() {
  const pagePath = path.join(__dirname, 'src/app/consumer-view/page.tsx');
  const fixedPagePath = path.join(__dirname, 'src/app/consumer-view/page-fixed.tsx');
  
  try {
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    const fixedPageContent = fs.readFileSync(fixedPagePath, 'utf8');

    // Skip TypeScript type annotations for comparison
    // This regex removes type annotations but keeps the structure intact
    const normalizeContent = (content) => {
      return content
        .replace(/:\s*[a-zA-Z<>[\]{}|&]+(\s*\|\s*[a-zA-Z<>[\]{}|&]+)*\s*=>/g, '=>') // Remove return type annotations
        .replace(/:\s*[a-zA-Z<>[\]{}|&]+(\s*\|\s*[a-zA-Z<>[\]{}|&]+)*/g, '') // Remove parameter type annotations
        .replace(/<[a-zA-Z<>[\]{}|&]+(\s*\|\s*[a-zA-Z<>[\]{}|&]+)*>/g, ''); // Remove generic type parameters
    };

    const normalizedPage = normalizeContent(pageContent);
    const normalizedFixedPage = normalizeContent(fixedPageContent);

    // Check for essential component sections
    const checkForSection = (section) => {
      const pageHasSection = normalizedPage.includes(section);
      const fixedPageHasSection = normalizedFixedPage.includes(section);
      
      if (pageHasSection !== fixedPageHasSection) {
        console.error(`❌ SYNC ERROR: The "${section}" section is ${pageHasSection ? 'present' : 'missing'} in page.tsx but ${fixedPageHasSection ? 'present' : 'missing'} in page-fixed.tsx`);
        return false;
      }
      return true;
    };

    // Check for critical components
    const componentsToCheck = [
      'Vehicle Stats Banner',
      'Dealer Header',
      'Photo Carousel',
      'Vehicle Header',
      'Linktree-style buttons',
      'Test Drive Calendar Modal',
      'Vehicle Reservation Flow'
    ];

    let allComponentsInSync = true;
    for (const component of componentsToCheck) {
      if (!checkForSection(component)) {
        allComponentsInSync = false;
      }
    }

    if (allComponentsInSync) {
      console.log('✅ SYNC CHECK: All essential components are in sync between page.tsx and page-fixed.tsx');
    } else {
      console.error('❌ SYNC ERROR: page.tsx and page-fixed.tsx are out of sync. Please update both files to match.');
      process.exit(1); // Exit with error code
    }
  } catch (error) {
    console.error('Error reading files:', error);
    process.exit(1);
  }
}

// Run the check
checkComponentStructure();