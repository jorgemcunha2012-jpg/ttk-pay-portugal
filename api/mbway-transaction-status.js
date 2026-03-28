const { waymbTransactionInfo } = require('../lib/waymb-server');

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

  const id = body.id != null ? String(body.id) : '';
  if (!id || id.length > 200) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const info = await waymbTransactionInfo(id);
    if (!info.ok) {
      return res.status(200).json({ ok: false, message: 'Não foi possível consultar o estado.' });
    }
    const st = String(info.status || '').toUpperCase();
    const paid = st === 'COMPLETED' || st === 'PAID' || st === 'SUCCESS';
    return res.status(200).json({ ok: true, status: st, paid });
  } catch (e) {
    console.error('[mbway-transaction-status]', e);
    return res.status(500).json({ ok: false, message: 'Erro interno' });
  }
};
