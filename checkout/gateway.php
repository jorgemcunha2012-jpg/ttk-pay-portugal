<?php
/**
 * GATEWAY PORTUGAL v7.5 - DIRECT REDIRECT & UPSELL READY
 * Apenas MB WAY (WayMB). Credenciais: .env na raiz ou variáveis do servidor.
 */

require_once __DIR__ . '/waymb-core.php';

$config = ttk_config();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . ttk_url_checkout_index(), true, 302);
    exit();
}

$data    = $_POST;
$method  = $data['payment_method'] ?? 'mbway';
$name    = strip_tags(trim($data['name'] ?? ''));
$email   = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$nif     = preg_replace('/\D/', '', $data['document'] ?? '');
$phone   = $data['phone'] ?? '';
$orderId = 'ORD-' . time();
$isUpsell = isset($data['is_upsell']) && $data['is_upsell'] === '1';

$productName = $isUpsell ? 'Taxa de Antecipação' : 'Verificação de Perfil';
$priceCents = $isUpsell ? 990 : 1297;
$waymbAmount = $isUpsell ? 9.90 : 12.97;

if ($method !== 'mbway') {
    header('Location: ' . ttk_url_checkout_index('erro=' . rawurlencode('Este checkout aceita apenas MB WAY.')), true, 303);
    exit();
}

if ($name === '' || $email === false || $email === '' || strlen($nif) < 9) {
    header('Location: ' . ttk_url_checkout_index('erro=' . rawurlencode('Preenche nome, e-mail e NIF correctamente.')), true, 303);
    exit();
}

$phoneDigits = preg_replace('/\D/', '', $phone);
ttk_notify_utmify($orderId, [
    'name' => $name,
    'email' => $email,
    'phone' => $phoneDigits,
    'document' => $nif,
], $productName, $priceCents, $config);

$r = ttk_waymb_api_create('mbway', $name, $email, $nif, $phone, $orderId, $waymbAmount, $config);
if ($r['ok']) {
    header('Location: ' . ttk_url_pagar(http_build_query($r['query'])), true, 303);
    exit();
}

header('Location: ' . ttk_url_checkout_index('erro=' . rawurlencode($r['error'] ?? 'Erro ao gerar pagamento.')), true, 303);
exit();
