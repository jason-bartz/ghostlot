const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const host = req.headers.host || '';

    // For the main domain (ghostlot.com or www.ghostlot.com), serve index.html for the root path
    if ((host === 'ghostlot.com' || host === 'www.ghostlot.com') && pathname === '/') {
      console.log('Serving index.html for', host);
      const filePath = path.join(__dirname, 'public', 'index.html');
      
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error('Error reading index.html:', err);
          return handle(req, res, parsedUrl);
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(content);
      });
    } else {
      // For all other paths or hosts (including app.ghostlot.com), use normal Next.js handling
      return handle(req, res, parsedUrl);
    }
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});