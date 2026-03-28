<?php
/**
 * Proxy para POST /transactions/info da WayMB (documentação: corpo JSON { "id": "..." }).
 * Usado pela página pagar.php para consultar o estado (ex.: PENDING, COMPLETED).
 */

require_once __DIR__ . '/waymb-core.php';

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método não permitido']);
    exit();
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$id = '';
if (is_array($data) && isset($data['id'])) {
    $id = (string) $data['id'];
}
if ($id === '' && isset($_POST['id'])) {
    $id = (string) $_POST['id'];
}

if ($id === '' || strlen($id) > 200) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'ID inválido']);
    exit();
}

$info = ttk_waymb_api_transaction_info($id);
if (!$info['ok']) {
    echo json_encode(['ok' => false, 'message' => 'Não foi possível consultar o estado.']);
    exit();
}

$st = strtoupper($info['status'] ?? '');
echo json_encode([
    'ok'     => true,
    'status' => $st,
    'paid'   => ($st === 'COMPLETED' || $st === 'PAID' || $st === 'SUCCESS'),
]);
