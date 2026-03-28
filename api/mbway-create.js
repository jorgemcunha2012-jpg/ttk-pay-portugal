const { createMbWayTransaction } = require('../lib/waymb-server');

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
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método não permitido' });
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch {
    return res.status(400).json({ ok: false, message: 'JSON inválido' });
  }

  try {
    const result = await createMbWayTransaction(req, body);
    if (!result.ok) {
      return res.status(400).json({ ok: false, message: result.message });
    }
    return res.status(200).json({
      ok: true,
      popupUrl: result.popupUrl,
      transactionId: result.transactionId,
    });
  } catch (e) {
    console.error('[mbway-create]', e);
    return res.status(500).json({ ok: false, message: 'Erro interno' });
  }
};
