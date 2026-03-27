<?php
/**
 * Proxy PHP para listar preços da Cooud
 * Abre no browser: https://teusite.com/checkout/listar-precos.php
 * Ou com token: listar-precos.php?token=orbit_at_xxx
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$token = $_GET['token'] ?? 'orbit_at_rKrcLxApoizbwTpD4On5lhNKvQNGyZNAHxbKgHull94';
$api = 'https://orbit.cooud.com';

function cooudFetch($url, $token) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'X-Store-Access-Token: ' . $token
        ]
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ['code' => $code, 'body' => $res];
}

$stores = [];
$r = cooudFetch($api . '/stores', $token);
if ($r['code'] === 200) {
    $data = json_decode($r['body'], true);
    $stores = is_array($data) ? $data : ($data['data'] ?? $data['stores'] ?? []);
}
if (empty($stores)) {
    $r = cooudFetch($api . '/user/stores', $token);
    if ($r['code'] === 200) $stores = json_decode($r['body'], true) ?: [];
}

if ($r['code'] === 401) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido ou expirado. Gera um novo na Cooud > Integrações > Tokens.']);
    exit;
}

$prices = [];
foreach ($stores ?: [] as $store) {
    $sid = is_array($store) ? ($store['id'] ?? null) : $store->id ?? null;
    if (!$sid) continue;
    $r = cooudFetch($api . '/stores/' . $sid . '/courses', $token);
    $courses = ($r['code'] === 200) ? (json_decode($r['body'], true) ?: []) : [];
    foreach ($courses ?: [] as $course) {
        $slug = is_array($course) ? ($course['slug'] ?? null) : $course->slug ?? null;
        if (!$slug) continue;
        $r = cooudFetch($api . '/courses/' . $slug . '/prices', $token);
        $plist = ($r['code'] === 200) ? (json_decode($r['body'], true) ?: []) : [];
        foreach ($plist ?: [] as $p) {
            $prices[] = [
                'id' => is_array($p) ? ($p['id'] ?? '') : $p->id ?? '',
                'name' => is_array($p) ? ($p['name'] ?? '') : $p->name ?? '',
                'amount' => is_array($p) ? ($p['amount'] ?? 0) : $p->amount ?? 0,
                'store' => is_array($store) ? ($store['name'] ?? '') : $store->name ?? '',
                'course' => is_array($course) ? ($course['name'] ?? '') : $course->name ?? ''
            ];
        }
    }
}

echo json_encode(['prices' => $prices, 'count' => count($prices)], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
