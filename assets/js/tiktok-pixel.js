/**
 * TikTok Pixel Events Tracking
 * Envia ao TikTok APENAS eventos de venda paga (CompletePayment e Purchase).
 */

/** Eventos permitidos: só vendas pagas */
const ALLOWED_EVENTS = ['CompletePayment', 'Purchase'];

/**
 * Função centralizada para rastrear eventos do TikTok Pixel
 * Só envia CompletePayment e Purchase (vendas geradas e pagas).
 */
function trackTikTokEvent(eventName, eventData = {}) {
  if (!ALLOWED_EVENTS.includes(eventName)) {
    return; // Não enviar nada além de vendas pagas
  }
  let eventSent = false;
  const maxRetries = 5; // Aumentado para 5 tentativas
  let retryCount = 0;
  
  function trySend() {
    // Método 1: API padrão do TikTok Pixel (ttq) - PRIORIDADE MÁXIMA
    if (typeof ttq !== 'undefined' && typeof ttq.track === 'function') {
      try {
        ttq.track(eventName, eventData);
        eventSent = true;
        console.log(`✅ TikTok Pixel (ttq): ${eventName}`, eventData);
        return true;
      } catch (e) {
        console.error(`❌ Erro ao rastrear ${eventName} (ttq):`, e);
      }
    }
    
    // Método 2: API direta do TikTok (alternativa)
    if (typeof window !== 'undefined' && window.tiktokq && Array.isArray(window.tiktokq)) {
      try {
        window.tiktokq.push(['track', eventName, eventData]);
        eventSent = true;
        console.log(`✅ TikTok Pixel (tiktokq): ${eventName}`, eventData);
        return true;
      } catch (e) {
        console.error(`❌ Erro ao rastrear ${eventName} (tiktokq):`, e);
      }
    }
    
    return false;
  }
  
  // Tentar enviar imediatamente
  if (trySend()) {
    return; // Sucesso imediato
  }
  
  // Se falhar, tentar novamente com retry
  const retryInterval = setInterval(() => {
    retryCount++;
    if (trySend()) {
      clearInterval(retryInterval);
    } else if (retryCount >= maxRetries) {
      clearInterval(retryInterval);
      // Se ainda não enviou, salvar como pendente
      if (!eventSent) {
        savePendingEvent(eventName, eventData);
        console.warn(`⚠️ Evento ${eventName} salvo como pendente após ${maxRetries} tentativas`);
      }
    }
  }, 500);
  
  // Limpar após 10 segundos (tempo suficiente para várias tentativas)
  setTimeout(() => {
    clearInterval(retryInterval);
    if (!eventSent) {
      savePendingEvent(eventName, eventData);
    }
  }, 10000);
}

/**
 * Salva evento pendente no localStorage (apenas vendas pagas)
 */
function savePendingEvent(eventName, eventData) {
  if (!ALLOWED_EVENTS.includes(eventName)) return;
  try {
    const pendingEvents = JSON.parse(localStorage.getItem('tiktok_pending_events') || '[]');
    if (pendingEvents.length < 50) {
      pendingEvents.push({
        event: eventName,
        data: eventData,
        timestamp: Date.now()
      });
      localStorage.setItem('tiktok_pending_events', JSON.stringify(pendingEvents));
    }
  } catch (e) {
    console.error('Erro ao salvar evento pendente:', e);
  }
}

/**
 * Envia eventos pendentes de venda quando o pixel carregar
 */
function sendPendingEvents() {
  try {
    const pendingEvents = JSON.parse(localStorage.getItem('tiktok_pending_events') || '[]');
    if (pendingEvents.length === 0) return;
    const pixelAvailable = (typeof ttq !== 'undefined' && typeof ttq.track === 'function') ||
                           (typeof window !== 'undefined' && window.tiktokq);
    if (!pixelAvailable) return;
    let sentCount = 0;
    const remaining = pendingEvents.filter(eventObj => {
      if (!ALLOWED_EVENTS.includes(eventObj.event)) return true; // manter outros (não enviar)
      const eventAge = Date.now() - eventObj.timestamp;
      if (eventAge >= 3600000) return true; // expirado, descartar
      trackTikTokEvent(eventObj.event, eventObj.data);
      sentCount++;
      return false; // removido da lista
    });
    localStorage.setItem('tiktok_pending_events', JSON.stringify(remaining));
    if (sentCount > 0) console.log(`✅ ${sentCount} vendas pendentes enviadas ao TikTok`);
  } catch (e) {
    console.error('Erro ao enviar eventos pendentes:', e);
  }
}

/**
 * Outros eventos: não enviados ao TikTok (apenas vendas pagas).
 * Funções mantidas para não quebrar chamadas existentes no site.
 */
function trackPageView() { /* não envia */ }
function trackAddToCart() { /* não envia */ }
function trackInitiateCheckout() { /* não envia */ }
function trackGenerateLead() { /* não envia */ }
function trackSubmitForm() { /* não envia */ }
function trackContact() { /* não envia */ }

/**
 * Evento: CompletePayment
 * Disparado quando o pagamento é confirmado (venda paga)
 */
function trackCompletePayment(amount, transactionId) {
  trackTikTokEvent('CompletePayment', {
    content_type: 'product',
    value: amount,
    currency: 'EUR',
    transaction_id: transactionId
  });
}

/**
 * Evento: Purchase
 * Disparado quando o pagamento é confirmado (venda paga)
 */
function trackPurchase(amount, transactionId) {
  trackTikTokEvent('Purchase', {
    content_type: 'product',
    value: amount,
    currency: 'EUR',
    quantity: 1,
    transaction_id: transactionId
  });
}

// Função para verificar se pixel está carregado
function isPixelLoaded() {
  return (typeof ttq !== 'undefined' && typeof ttq.track === 'function') ||
         (typeof window !== 'undefined' && window.tiktokq && Array.isArray(window.tiktokq));
}

// Aguardar pixel carregar e enviar vendas pendentes (não dispara outros eventos)
function initPixelTracking() {
  let attempts = 0;
  const maxAttempts = 20;
  const checkPixel = setInterval(() => {
    attempts++;
    if (isPixelLoaded()) {
      clearInterval(checkPixel);
      sendPendingEvents();
      console.log('✅ TikTok Pixel carregado (apenas vendas pagas serão enviadas)');
    } else if (attempts >= maxAttempts) {
      clearInterval(checkPixel);
      console.warn('⚠️ TikTok Pixel não carregou. Vendas serão enviadas quando carregar.');
    }
  }, 500);
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPixelTracking);
} else {
  initPixelTracking();
}

// Tentar enviar eventos pendentes quando página carregar completamente
window.addEventListener('load', () => {
  setTimeout(sendPendingEvents, 2000);
});

// Verificar eventos pendentes periodicamente (a cada 5 segundos)
setInterval(() => {
  if (isPixelLoaded()) {
    sendPendingEvents();
  }
}, 5000);
