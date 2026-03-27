/**
 * Servidor proxy para a API Cooud
 * 
 * O erro "internal server error" pode ocorrer quando a API é chamada
 * diretamente do browser (CORS ou restrições de segurança).
 * 
 * Executa: node server-proxy.js
 * Depois altera checkout/config.js: apiUrl: 'http://localhost:3001/checkout_sessions'
 */

const http = require('http');

const COOUD_API = 'https://orbit.cooud.com';
const ACCESS_TOKEN = 'orbit_at_79tvIPxJS5V7lfkAfrnUSHud_ZuzPtkLFf4t-h7er4Q';
const PORT = process.env.PORT || 3002;  // 3002 se 3001 estiver ocupada

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/checkout_sessions') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const response = await fetch(`${COOUD_API}/checkout_sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'X-Store-Access-Token': ACCESS_TOKEN
          },
          body: body || '{"prices":["01KKNG259TEA7AWMHW56NER3KT"]}'
        });
        const data = await response.text();
        res.writeHead(response.status, { 'Content-Type': 'application/json' });
        res.end(data);
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Proxy Cooud em http://localhost:${PORT}`);
  console.log('Em config.js: apiUrl = "http://localhost:' + PORT + '/checkout_sessions"');
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Porta', PORT, 'ocupada. O proxy pode já estar a correr!');
    console.log('Se sim, usa http://localhost:' + PORT + '/checkout_sessions no config.js');
    console.log('Ou mata o processo: lsof -ti:' + PORT + ' | xargs kill');
  } else {
    throw err;
  }
});
