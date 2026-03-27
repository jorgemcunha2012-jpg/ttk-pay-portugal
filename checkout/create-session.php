<?php
/**
 * Proxy PHP para a API Cooud - Checkout Sessions
 * Coloca este ficheiro na pasta checkout/ do teu site na Hostinger
 */

header('Content-Type: application/json');
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

$token = 'orbit_at_rKrcLxApoizbwTpD4On5lhNKvQNGyZNAHxbKgHull94';
$apiUrl = 'https://orbit.cooud.com/checkout_sessions';

$input = file_get_contents('php://input');
$body = $input ?: '{"prices":["01KKNG259TEA7AWMHW56NER3KT"]}';

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
