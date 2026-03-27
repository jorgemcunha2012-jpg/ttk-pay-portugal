<?php
$json = file_get_contents('php://input');
$event = json_decode($json, true);

// Lógica para Cooud ou WayMB
$status = $event['status'] ?? ($event['type'] ?? null);
$transactionId = $event['id'] ?? ($event['transactionId'] ?? null);

if ($status === 'COMPLETED' || $status === 'checkout.session.completed' || $status === 'paid') {
    
    $confirmUtm = [
        "orderId" => $transactionId,
        "status" => "paid",
        "approvedDate" => date("Y-m-d H:i:s"),
        "customer" => ["email" => $event['payer']['email'] ?? $event['customer']['email']],
        "commission" => [
            "totalPriceInCents" => 1297,
            "currency" => "EUR"
        ]
    ];

    // Envia para Utmify
    $ch = curl_init('https://api.utmify.com.br/api-credentials/orders');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($confirmUtm));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'x-api-token: DnovaZ75b6HfZSPz7gWp5vlWJPfm2lkUtYZv',
        'Content-Type: application/json'
    ]);
    curl_exec($ch);
}
http_response_code(200);