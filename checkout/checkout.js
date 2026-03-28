/**
 * Checkout Cooud - Integração com API de Checkout Sessions
 * 
 * Cria uma sessão de checkout e redireciona o cliente para a página
 * de pagamento da Cooud (cartão, Google Pay no Android, Apple Pay no iPhone).
 */

async function createCheckoutSession() {
  const btn = document.getElementById('checkout-btn');
  const errorEl = document.getElementById('checkout-error');

  if (COOUD_CONFIG.checkoutUrl && String(COOUD_CONFIG.checkoutUrl).trim() !== '') {
    window.location.href = COOUD_CONFIG.checkoutUrl;
    return;
  }

  const apiUrl = COOUD_CONFIG.apiUrl || '';
  const usePhpProxy = apiUrl.indexOf('create-session.php') !== -1;

  if (!usePhpProxy) {
    if (!COOUD_CONFIG.accessToken || COOUD_CONFIG.accessToken.includes('COLOQUE')) {
      showError('Configura o access token no ficheiro config.js');
      return;
    }
  }

  if (!COOUD_CONFIG.prices || !COOUD_CONFIG.prices.length || String(COOUD_CONFIG.prices[0]).includes('COLOQUE')) {
    showError('Configura os IDs das ofertas no ficheiro config.js');
    return;
  }

  if (!btn) return;

  btn.disabled = true;
  btn.textContent = 'A processar...';
  if (errorEl) errorEl.textContent = '';

  try {
    const prices = Array.isArray(COOUD_CONFIG.prices) ? COOUD_CONFIG.prices : [COOUD_CONFIG.prices];
    const body = { prices };

    const bodyString = JSON.stringify(body);
    console.log('[Cooud] Request body:', bodyString);

    const headers = { 'Content-Type': 'application/json' };
    if (!usePhpProxy) {
      headers['Authorization'] = 'Bearer ' + COOUD_CONFIG.accessToken;
      headers['X-Store-Access-Token'] = COOUD_CONFIG.accessToken;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
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
      let target = data.url;
      try {
        target = new URL(data.url, window.location.href).href;
      } catch (e) {
        /* mantém string original */
      }
      window.location.assign(target);
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

/**
 * O botão #checkout-btn é injectado pelo SPA (pages.js); o clique é ligado em setupCheckoutPage().
 * Aqui só deixamos helpers disponíveis globalmente.
 */
document.addEventListener('DOMContentLoaded', () => {
  const methodsLabel = document.getElementById('payment-methods-label');
  if (methodsLabel && typeof getPaymentMethodsLabel === 'function') {
    methodsLabel.textContent = getPaymentMethodsLabel();
  }
});
