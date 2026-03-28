<?php
/**
 * Cria transação WayMB (apenas MB WAY) e devolve JSON com URL absoluta para abrir em popup.
 * A API WayMB não fornece iframe; o pagamento confirma-se na app MB WAY. O popup mostra instruções.
 */

require_once __DIR__ . '/waymb-core.php';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método não permitido']);
    exit();
}

$config = ttk_config();
$data = $_POST;

$method = $data['payment_method'] ?? 'mbway';
if ($method !== 'mbway') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Apenas pagamento por MB WAY está disponível.']);
    exit();
}

$name  = strip_tags(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$nif   = preg_replace('/\D/', '', $data['document'] ?? '');
$phone = $data['phone'] ?? '';
$orderId = 'ORD-' . time();
$isUpsell = isset($data['is_upsell']) && $data['is_upsell'] === '1';

$productName = $isUpsell ? 'Taxa de Antecipação' : 'Verificação de Perfil';
$priceCents = $isUpsell ? 990 : 1297;
$waymbAmount = $isUpsell ? 9.90 : 12.97;

if ($name === '') {
    echo json_encode(['ok' => false, 'message' => 'Indica o teu nome.']);
    exit();
}
if ($email === false || $email === '') {
    echo json_encode(['ok' => false, 'message' => 'Indica um e-mail válido.']);
    exit();
}
if (strlen($nif) < 9) {
    echo json_encode(['ok' => false, 'message' => 'Indica um NIF válido (9 dígitos).']);
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

if (!$r['ok']) {
    echo json_encode(['ok' => false, 'message' => $r['error'] ?? 'Erro ao gerar pagamento.']);
    exit();
}

$q = $r['query'];
$q['popup'] = '1';
echo json_encode([
    'ok' => true,
    'popupUrl' => ttk_url_pagar(http_build_query($q)),
    'transactionId' => $q['tid'] ?? '',
]);
