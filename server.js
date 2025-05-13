const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const host = req.headers.host || '';
      
      // For debugging
      console.log(`Request: ${host}${pathname}`);

      // For main domain, serve static index.html at the root
      if ((host.includes('ghostlot.com') && !host.includes('app.ghostlot.com')) && pathname === '/') {
        try {
          // Use path.resolve to get absolute path
          const filePath = path.resolve(process.cwd(), 'public', 'index.html');
          console.log('Serving static file:', filePath);
          
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(content);
          } else {
            console.error('index.html not found at path:', filePath);
          }
        } catch (err) {
          console.error('Error serving index.html:', err);
        }
      } 
      
      // For app subdomain or any other route, use Next.js
      return handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Server error:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});