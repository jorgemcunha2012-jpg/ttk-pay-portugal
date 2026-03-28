const { handleWebhookPayload } = require('../lib/waymb-server');

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body != null && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      resolve(req.body);
      return;
    }
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (req.method !== 'POST') {
    return res.status(405).send('method');
  }
  try {
    const payload = await parseJsonBody(req);
    await handleWebhookPayload(payload);
  } catch (e) {
    console.error('[webhook-waymb]', e);
  }
  return res.status(200).send('ok');
};
