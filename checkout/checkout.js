/**
 * Checkout Cooud - Integração com API de Checkout Sessions
 * 
 * Cria uma sessão de checkout e redireciona o cliente para a página
 * de pagamento da Cooud (cartão, Google Pay no Android, Apple Pay no iPhone).
 */

async function createCheckoutSession() {
  const btn = document.getElementById('checkout-btn');
  const errorEl = document.getElementById('checkout-error');

  // Redirecionamento direto (sem API)
  if (COOUD_CONFIG.checkoutUrl) {
    window.location.href = COOUD_CONFIG.checkoutUrl;
    return;
  }

  if (!COOUD_CONFIG.accessToken || COOUD_CONFIG.accessToken.includes('COLOQUE')) {
    showError('Configura o access token no ficheiro config.js');
    return;
  }

  if (!COOUD_CONFIG.prices.length || COOUD_CONFIG.prices[0].includes('COLOQUE')) {
    showError('Configura os IDs das ofertas no ficheiro config.js');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'A processar...';
  if (errorEl) errorEl.textContent = '';

  try {
    // API Cooud só aceita: prices, user_id, customer_email (additionalProperties: false)
    const prices = Array.isArray(COOUD_CONFIG.prices) ? COOUD_CONFIG.prices : [COOUD_CONFIG.prices];
    const body = { prices };

    const bodyString = JSON.stringify(body);
    console.log('[Cooud] Request body:', bodyString);

    const response = await fetch(COOUD_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COOUD_CONFIG.accessToken}`,
        'X-Store-Access-Token': COOUD_CONFIG.accessToken
      },
      body: bodyString
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type');
    let data = {};
    try {
      data = (contentType && contentType.includes('application/json')) ? JSON.parse(text) : {};
      if (!data.message && !data.error && text) data.raw = text.substring(0, 500);
    } catch (e) {
      data = { raw: text.substring(0, 500) };
    }

    if (!response.ok) {
      const apiMsg = data?.message || data?.error || data?.detail || 
        (typeof data?.raw === 'string' ? data.raw.substring(0, 300) : null) ||
        (data?._raw ? String(data._raw).substring(0, 300) : null) ||
        `Erro ${response.status}`;
      console.error('[Cooud] API Error:', response.status, data);
      const hint = response.status === 500 
        ? ' Contacta o suporte da Cooud para verificar o ID do preço e as permissões do token.'
        : '';
      throw new Error(apiMsg + hint);
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('A API não devolveu a URL do checkout.');
    }
  } catch (error) {
    console.error('[Cooud] Erro:', error);
    let msg = error.message || 'Erro ao criar checkout. Tenta novamente.';
    if (error.message && error.message.includes('Failed to fetch')) {
      msg = 'Não foi possível contactar o servidor. Se estás a usar o proxy, verifica se está a correr: cd checkout && node server-proxy.js';
    }
    showError(msg);
    btn.disabled = false;
    btn.textContent = `Pagar €${COOUD_CONFIG.amount.toFixed(2)}`;
  }
}

function showError(message) {
  const errorEl = document.getElementById('checkout-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

/**
 * Detecta o sistema operacional para mostrar os métodos de pagamento corretos
 */
function getPaymentMethodsLabel() {
  const ua = navigator.userAgent || navigator.vendor || '';
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  if (isAndroid) {
    return 'Cartão de crédito/débito e Google Pay';
  }
  if (isIOS) {
    return 'Cartão de crédito/débito e Apple Pay';
  }
  return 'Cartão de crédito/débito, Google Pay e Apple Pay';
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const methodsLabel = document.getElementById('payment-methods-label');
  if (methodsLabel) {
    methodsLabel.textContent = getPaymentMethodsLabel();
  }

  const btn = document.getElementById('checkout-btn');
  if (btn) {
    btn.addEventListener('click', createCheckoutSession);
  }

  // Rastrear InitiateCheckout no TikTok Pixel
  const amount = typeof COOUD_CONFIG !== 'undefined' ? COOUD_CONFIG.amount : 12.97;
  if (typeof ttq !== 'undefined' && typeof ttq.track === 'function') {
    try {
      ttq.track('InitiateCheckout', { value: amount, currency: 'EUR' });
    } catch (e) {
      console.warn('[TikTok] InitiateCheckout:', e);
    }
  }
});
