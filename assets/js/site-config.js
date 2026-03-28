/**
 * URL base onde está o checkout (HTML + /api na Vercel ou mesmo domínio).
 *
 * - Vazio: caminho relativo `checkout/index.html` (quiz e checkout no mesmo site).
 * - Preenchido: redireciona para esse URL (ex.: funil num domínio, checkout noutro).
 *
 * Preferir: window.TTK_CHECKOUT_BASE_URL = 'https://checkout.teudominio.pt';
 * Legado: TTK_CHECKOUT_PHP_BASE (mesmo efeito).
 */
window.TTK_CHECKOUT_BASE_URL = '';
window.TTK_CHECKOUT_PHP_BASE = '';
