/**
 * Checkout MB WAY (PHP + WayMB) — URL do servidor onde /checkout/ corre com PHP.
 *
 * - Vazio: usa caminho relativo checkout/index.php (funciona se o quiz e o PHP
 *   estiverem no MESMO domínio, ex.: só Hostinger).
 * - Preenchido: redireciona para esse domínio (obrigatório na Vercel / front estático).
 *
 * Exemplo: window.TTK_CHECKOUT_PHP_BASE = 'https://omeudominio.pt';
 * (sem barra no fim; pode incluir subpasta: https://dominio.pt/meuprojeto)
 */
window.TTK_CHECKOUT_PHP_BASE = '';
