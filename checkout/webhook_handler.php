<?php
/**
 * callbackUrl da WayMB — notificação quando o status da transação muda.
 * @see https://github.com/Hydra-Codes/waymb-doc
 */

require_once __DIR__ . '/waymb-core.php';

$config = ttk_config();
$json = file_get_contents('php://input');
$event = json_decode($json, true);

if (!is_array($event)) {
    http_response_code(200);
    echo 'ok';
    exit;
}

$status = isset($event['status']) ? (string) $event['status'] : '';
$transactionId = isset($event['id']) ? (string) $event['id'] : (isset($event['transactionId']) ? (string) $event['transactionId'] : '');

$paid = ($status === 'COMPLETED' || $status === 'PAID' || $status === 'paid');

if ($paid && $transactionId !== '') {
    $payerEmail = '';
    if (isset($event['payer']['email'])) {
        $payerEmail = (string) $event['payer']['email'];
    }

    $confirmUtm = [
        'orderId'      => $transactionId,
        'status'       => 'paid',
        'approvedDate' => date('Y-m-d H:i:s'),
        'customer'     => ['email' => $payerEmail !== '' ? $payerEmail : 'cliente@email.pt'],
        'commission'   => [
            'totalPriceInCents' => 1297,
            'currency'          => 'EUR',
        ],
    ];

    $ch = curl_init('https://api.utmify.com.br/api-credentials/orders');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($confirmUtm));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'x-api-token: ' . $config['utmify_token'],
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($ch);
    curl_close($ch);
}

http_response_code(200);
header('Content-Type: text/plain; charset=utf-8');
echo 'ok';
