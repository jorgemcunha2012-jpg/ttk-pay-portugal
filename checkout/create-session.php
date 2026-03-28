<?php
/**
 * Proxy PHP para a API Cooud - Checkout Sessions
 * Coloca este ficheiro na pasta checkout/ do teu site na Hostinger
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Token da loja Cooud (mantém fora do JavaScript público)
$token = getenv('COOUD_ACCESS_TOKEN') ?: 'orbit_at_rRTOL8RLzoRian2lFScWnnkx3DQbYKs8NUwAXAjsKBU';
$apiUrl = 'https://orbit.cooud.com/checkout_sessions';

$input = file_get_contents('php://input');
$defaultBody = json_encode(['prices' => ['01KKRYXR4JB2R7YESK4Z69TP56']]);
$body = (trim((string) $input) !== '') ? $input : $defaultBody;

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token,
        'X-Store-Access-Token: ' . $token
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
