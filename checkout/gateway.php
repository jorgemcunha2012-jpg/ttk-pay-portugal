<?php
/**
 * GATEWAY PORTUGAL v7.5 - DIRECT REDIRECT & UPSELL READY
 * Credenciais WayMB (MB WAY / Multibanco): .env na raiz do projeto ou variáveis do servidor.
 */

require_once __DIR__ . '/waymb-core.php';

$config = ttk_config();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: ' . ttk_url_checkout_index(), true, 302);
    exit();
}

$data    = $_POST;
$method  = $data['payment_method'] ?? 'credit_card';
$name    = strip_tags($data['name'] ?? 'Cliente');
$email   = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$nif     = preg_replace('/\D/', '', $data['document'] ?? '999999999');
$phone   = preg_replace('/\D/', '', $data['phone'] ?? '');
$orderId = 'ORD-' . time();
$isUpsell = isset($data['is_upsell']) && $data['is_upsell'] === '1';

$productName = $isUpsell ? 'Taxa de Antecipação' : 'Verificação de Perfil';
$priceCents = $isUpsell ? 990 : 1297;
$waymbAmount = $isUpsell ? 9.90 : 12.97;

ttk_notify_utmify($orderId, [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'document' => $nif,
], $productName, $priceCents, $config);

if ($method === 'credit_card') {
    $finalUrl = $config['cooud_url'] . '?email=' . urlencode($email) . '&name=' . urlencode($name);
    header('Location: ' . $finalUrl, true, 303);
    exit();
}

$r = ttk_waymb_api_create($method, $name, $email, $nif, $phone, $orderId, $waymbAmount, $config);
if ($r['ok']) {
    header('Location: ' . ttk_url_pagar(http_build_query($r['query'])), true, 303);
    exit();
}

header('Location: ' . ttk_url_checkout_index('erro=' . rawurlencode($r['error'] ?? 'Erro ao gerar pagamento.')), true, 303);
exit();
