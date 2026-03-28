/**
 * Checkout Cooud — fluxo via API (checkout_sessions)
 *
 * checkoutUrl: deixa vazio para usar create-session.php (token só no servidor).
 * Para redirecionar sem API, preenche com URL completa da Cooud.
 */

const COOUD_CONFIG = {
  checkoutUrl: '',

  /** Relativo à raiz do site (index.html) */
  apiUrl: 'checkout/create-session.php',

  /** Usado só se apiUrl apontar directamente à API Cooud (não ao proxy PHP) */
  accessToken: '',

  prices: ['01KKRYXR4JB2R7YESK4Z69TP56'],
  amount: 15.97
};
