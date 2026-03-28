/**
 * Lógica WayMB + UTMIFY (Node). Paridade com checkout/waymb-core.php
 * @see https://github.com/Hydra-Codes/waymb-doc
 */

function getConfig() {
  return {
    utmify_token: process.env.UTMIFY_TOKEN || '',
    waymb_id: process.env.WAYMB_CLIENT_ID || '',
    waymb_secret: process.env.WAYMB_CLIENT_SECRET || '',
    waymb_email: process.env.WAYMB_ACCOUNT_EMAIL || '',
  };
}

function getPublicOrigin(req) {
  const env = process.env.WAYMB_PUBLIC_BASE_URL;
  if (env && /^https?:\/\//i.test(String(env).trim())) {
    return String(env).trim().replace(/\/$/, '');
  }
  const proto = (req.headers['x-forwarded-proto'] || 'https')
    .toString()
    .split(',')[0]
    .trim();
  const host = (req.headers['x-forwarded-host'] || req.headers.host || 'localhost')
    .toString()
    .split(',')[0]
    .trim();
  return `${proto}://${host}`;
}

function checkoutPathPrefix() {
  const p = process.env.CHECKOUT_PATH_PREFIX || '/checkout';
  return p.replace(/\/$/, '') || '/checkout';
}

function urlCheckoutIndex(origin, query) {
  const prefix = checkoutPathPrefix();
  const q = query ? (query.startsWith('?') ? query : `?${query}`) : '';
  return `${origin}${prefix}/index.html${q}`;
}

function urlPagar(origin, query) {
  const prefix = checkoutPathPrefix();
  return `${origin}${prefix}/pagar.html?${query}`;
}

function urlWebhook(origin) {
  return `${origin}/api/webhook-waymb`;
}

function urlSuccess(origin, orderId) {
  const path = process.env.WAYMB_SUCCESS_PATH || '/index.html';
  const sep = path.includes('?') ? '&' : '?';
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}${sep}id=${encodeURIComponent(orderId)}`;
}

function normalizePhonePt(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) {
    return { ok: false, error: 'Indica o número MB WAY.', phone: '' };
  }
  if (digits.length === 9 && digits[0] === '9') {
    return { ok: true, phone: `351${digits}` };
  }
  if (
    digits.length === 12 &&
    digits.startsWith('351') &&
    digits[3] === '9'
  ) {
    return { ok: true, phone: digits };
  }
  return {
    ok: false,
    error:
      'Número MB WAY inválido: usa 9 dígitos (começados por 9) ou 351 + número.',
    phone: digits,
  };
}

function parseWaymbError(res) {
  if (res && typeof res === 'object') {
    if (typeof res.error === 'string' && res.error) return res.error;
    if (typeof res.message === 'string' && res.message) return res.message;
  }
  return 'Erro ao gerar pagamento MB WAY. Tenta novamente.';
}

async function notifyUtmify(orderId, customer, productName, priceInCents, config) {
  if (!config.utmify_token) return;
  try {
    await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'x-api-token': config.utmify_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        status: 'waiting_payment',
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          document: customer.document,
        },
        products: [
          {
            id: 'prod_01',
            name: productName,
            quantity: 1,
            priceInCents,
          },
        ],
        commission: {
          totalPriceInCents: priceInCents,
          currency: 'EUR',
        },
      }),
    });
  } catch (_) {
    /* não bloquear checkout */
  }
}

async function waymbTransactionInfo(transactionId) {
  const res = await fetch('https://api.waymb.com/transactions/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: transactionId }),
  });
  const raw = await res.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false };
  }
  if (!data || typeof data !== 'object') return { ok: false };
  const status = data.status != null ? String(data.status) : '';
  return { ok: true, status, raw: data };
}

/**
 * @param {import('http').IncomingMessage} req
 */
async function createMbWayTransaction(req, body) {
  const config = getConfig();
  const origin = getPublicOrigin(req);

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const nif = String(body.document || '').replace(/\D/g, '');
  const phoneRaw = body.phone != null ? String(body.phone) : '';
  const isUpsell = body.is_upsell === true || body.is_upsell === '1' || body.is_upsell === 1;

  const productName = isUpsell ? 'Taxa de Antecipação' : 'Verificação de Perfil';
  const priceCents = isUpsell ? 990 : 1297;
  const amount = isUpsell ? 9.9 : 12.97;

  if (!name) return { ok: false, message: 'Indica o teu nome.' };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return { ok: false, message: 'Indica um e-mail válido.' };
  if (nif.length < 9) return { ok: false, message: 'Indica um NIF válido (9 dígitos).' };

  if (!config.waymb_email || !config.waymb_id || !config.waymb_secret) {
    return {
      ok: false,
      message:
        'Configura WAYMB_CLIENT_ID, WAYMB_CLIENT_SECRET e WAYMB_ACCOUNT_EMAIL nas variáveis de ambiente.',
    };
  }

  const norm = normalizePhonePt(phoneRaw);
  if (!norm.ok) return { ok: false, message: norm.error };

  const orderId = `ORD-${Date.now()}`;
  const phoneDigits = phoneRaw.replace(/\D/g, '');

  await notifyUtmify(
    orderId,
    { name, email, phone: phoneDigits, document: nif },
    productName,
    priceCents,
    config
  );

  const failedUrl = urlCheckoutIndex(
    origin,
    `erro=${encodeURIComponent('O pagamento MB WAY não foi concluído. Podes tentar novamente.')}`
  );

  const wayPayload = {
    client_id: config.waymb_id,
    client_secret: config.waymb_secret,
    account_email: config.waymb_email,
    amount: Math.round(amount * 100) / 100,
    currency: 'EUR',
    method: 'mbway',
    payer: {
      email,
      name,
      document: nif,
      phone: norm.phone,
    },
    callbackUrl: urlWebhook(origin),
    success_url: urlSuccess(origin, orderId),
    failed_url: failedUrl,
  };

  const wres = await fetch('https://api.waymb.com/transactions/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wayPayload),
  });

  const wtext = await wres.text();
  let res;
  try {
    res = JSON.parse(wtext);
  } catch {
    return {
      ok: false,
      message: 'Resposta inválida da API WayMB. Verifica a ligação ao servidor.',
    };
  }

  if (!res || typeof res !== 'object') {
    return {
      ok: false,
      message: 'Resposta inválida da API WayMB. Verifica a ligação ao servidor.',
    };
  }

  if (Number(res.statusCode) !== 200) {
    return { ok: false, message: parseWaymbError(res) };
  }

  if (Object.prototype.hasOwnProperty.call(res, 'generatedMBWay') && res.generatedMBWay !== true) {
    return { ok: false, message: parseWaymbError(res) };
  }

  const tid = String(res.id || res.transactionID || '');
  if (!tid) {
    return { ok: false, message: 'Resposta WayMB sem ID de transação.' };
  }

  const ref = res.referenceData || {};
  const params = new URLSearchParams({
    method: 'mbway',
    ent: ref.entity != null ? String(ref.entity) : '',
    ref: ref.reference != null ? String(ref.reference) : '',
    tel: norm.phone,
    tid,
    val: amount.toFixed(2).replace('.', ','),
    popup: '1',
  });

  const popupUrl = urlPagar(origin, params.toString());

  return {
    ok: true,
    popupUrl,
    transactionId: tid,
  };
}

async function handleWebhookPayload(payload) {
  const config = getConfig();
  const event = payload;
  if (!event || typeof event !== 'object') return;

  const status = event.status != null ? String(event.status) : '';
  const transactionId = String(event.id || event.transactionId || '');

  const paid =
    status === 'COMPLETED' ||
    status === 'PAID' ||
    status === 'paid';

  if (!paid || !transactionId) return;

  if (!config.utmify_token) return;

  let payerEmail = '';
  if (event.payer && typeof event.payer.email === 'string') {
    payerEmail = event.payer.email;
  }

  try {
    await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'x-api-token': config.utmify_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: transactionId,
        status: 'paid',
        approvedDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        customer: { email: payerEmail || 'cliente@email.pt' },
        commission: { totalPriceInCents: 1297, currency: 'EUR' },
      }),
    });
  } catch (_) {}
}

module.exports = {
  getConfig,
  getPublicOrigin,
  createMbWayTransaction,
  waymbTransactionInfo,
  handleWebhookPayload,
  urlCheckoutIndex,
};
