<?php
/**
 * GATEWAY PORTUGAL v7.5 - DIRECT REDIRECT & UPSELL READY
 */

$config = [
    'utmify_token'   => 'DnovaZ75b6HfZSPz7gWp5vlWJPfm2lkUtYZv',
    'cooud_url'      => 'https://checkout.cooud.com/01KM8K3YX7FGBA31N3KJANCKRB', // Seu link em EURO
    'waymb_id'       => 'carloseduardo66699_98cdfe91',
    'waymb_secret'   => 'c38d3914-47d1-4221-b82a-2291dc976d6c',
    'waymb_email'    => 'carloseduardo66699@gmail.com'
];

$data    = $_POST;
$method  = $data['payment_method'] ?? 'credit_card';
$name    = strip_tags($data['name'] ?? 'Cliente');
$email   = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$nif     = preg_replace('/\D/', '', $data['document'] ?? '999999999'); 
$phone   = preg_replace('/\D/', '', $data['phone'] ?? '');    
$orderId = "ORD-" . time();

// --- 1. REGISTRO UTMIFY (PRÉ-VENDA) ---
$chUtm = curl_init('https://api.utmify.com.br/api-credentials/orders');
curl_setopt($chUtm, CURLOPT_POST, 1);
curl_setopt($chUtm, CURLOPT_POSTFIELDS, json_encode([
    "orderId" => $orderId,
    "status" => "waiting_payment",
    "customer" => ["name" => $name, "email" => $email, "phone" => $phone, "document" => $nif],
    "products" => [["id" => "prod_01", "name" => "Verificação de Perfil", "quantity" => 1, "priceInCents" => 1297]],
    "commission" => ["totalPriceInCents" => 1297, "currency" => "EUR"]
]));
curl_setopt($chUtm, CURLOPT_HTTPHEADER, ['x-api-token: '.$config['utmify_token'], 'Content-Type: application/json']);
curl_setopt($chUtm, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chUtm, CURLOPT_SSL_VERIFYPEER, false);
curl_exec($chUtm);
curl_close($chUtm);

// --- 2. PROCESSAMENTO ---

if ($method === 'credit_card') {
    
    // REDIRECIONAMENTO DIRETO (GARANTE EURO E FOTO)
    // Se quiser passar o email para o checkout (alguns aceitam via URL):
    $finalUrl = $config['cooud_url'] . "?email=" . urlencode($email) . "&name=" . urlencode($name);
    
    header("Location: " . $finalUrl);
    exit();

} else {
    // MB WAY OU MULTIBANCO via WAYMB (Mantemos a API para gerar os códigos)
    
    if (strlen($phone) === 9) { $phone = "351" . $phone; }

    $wayPayload = [
        "client_id"     => $config['waymb_id'],
        "client_secret" => $config['waymb_secret'],
        "account_email" => $config['waymb_email'],
        "amount"        => 12.97,
        "method"        => ($method === 'mbway') ? 'mbway' : 'multibanco',
        "payer"         => ["email" => $email, "name" => $name, "document" => $nif, "phone" => $phone],
        // AQUI ESTÁ O TRUQUE DO UPSELL:
        // Se o pagamento for aprovado, mandamos para o upsell.php em vez do sucesso.php
        "success_url"   => "https://".$_SERVER['HTTP_HOST']."/upsell.php?id=".$orderId
    ];

    $ch = curl_init('https://api.waymb.com/transactions/create');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($wayPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $raw_res = curl_exec($ch);
    $res = json_decode($raw_res, true);
    curl_close($ch);

    if (isset($res['statusCode']) && $res['statusCode'] == 200) {
        $params = http_build_query([
            'method' => $method,
            'ent'    => $res['referenceData']['entity'] ?? '',
            'ref'    => $res['referenceData']['reference'] ?? '',
            'tel'    => $phone,
            'tid'    => $res['id'] ?? ''
        ]);
        header("Location: pagar.php?" . $params); 
        exit();
    } else {
        header("Location: index.php?erro=" . urlencode("Erro ao gerar pagamento. Tente novamente."));
        exit();
    }
}