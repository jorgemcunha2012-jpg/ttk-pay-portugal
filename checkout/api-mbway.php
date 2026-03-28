<?php
/**
 * Cria transação WayMB (MB WAY / Multibanco) e devolve JSON com URL absoluta para abrir em popup.
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

$method = $data['payment_method'] ?? '';
if ($method !== 'mbway' && $method !== 'multibanco') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Este endpoint é apenas para MB WAY ou Multibanco.']);
    exit();
}

$name  = strip_tags($data['name'] ?? 'Cliente');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$nif   = preg_replace('/\D/', '', $data['document'] ?? '999999999');
$phone = preg_replace('/\D/', '', $data['phone'] ?? '');
$orderId = 'ORD-' . time();
$isUpsell = isset($data['is_upsell']) && $data['is_upsell'] === '1';

$productName = $isUpsell ? 'Taxa de Antecipação' : 'Verificação de Perfil';
$priceCents = $isUpsell ? 990 : 1297;
$waymbAmount = $isUpsell ? 9.90 : 12.97;

if ($method === 'mbway' && (strlen($phone) !== 9 || ($phone[0] ?? '') !== '9')) {
    echo json_encode(['ok' => false, 'message' => 'Indica um número MB WAY válido (9 dígitos, começado por 9).']);
    exit();
}

ttk_notify_utmify($orderId, [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'document' => $nif,
], $productName, $priceCents, $config);

$r = ttk_waymb_api_create($method, $name, $email, $nif, $phone, $orderId, $waymbAmount, $config);

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
