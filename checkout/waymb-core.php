<?php
/**
 * WayMB API — https://github.com/Hydra-Codes/waymb-doc
 * Base: POST https://api.waymb.com/transactions/create | /transactions/info
 */

function ttk_load_dotenv(): void {
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;
    $path = dirname(__DIR__) . '/.env';
    if (!is_readable($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || (isset($line[0]) && $line[0] === '#')) {
            continue;
        }
        if (preg_match('/^([A-Z][A-Z0-9_]*)=(.*)$/', $line, $m)) {
            putenv($m[1] . '=' . trim($m[2], " \t\"'"));
        }
    }
}

function ttk_https_scheme(): string {
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        return 'https';
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
        $p = strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']);
        if ($p === 'https' || $p === 'http') {
            return $p;
        }
    }
    return 'http';
}

function ttk_checkout_web_dir(): string {
    $s = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/checkout/gateway.php'));
    return rtrim($s, '/');
}

/** Origem pública (callback WayMB). WAYMB_PUBLIC_BASE_URL no .env se o proxy mentir no Host. */
function ttk_site_public_origin(): string {
    $fromEnv = getenv('WAYMB_PUBLIC_BASE_URL');
    if (is_string($fromEnv) && $fromEnv !== '') {
        $fromEnv = rtrim(trim($fromEnv), '/');
        if (preg_match('#^https?://#i', $fromEnv)) {
            return $fromEnv;
        }
    }
    $scheme = ttk_https_scheme();
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $scheme . '://' . $host;
}

function ttk_waymb_callback_url(): string {
    $base = ttk_site_public_origin();
    $dir = ttk_checkout_web_dir();
    $suffix = ($dir === '' || $dir === '/') ? '/webhook_handler.php' : $dir . '/webhook_handler.php';
    return $base . $suffix;
}

function ttk_url_pagar(string $query): string {
    $scheme = ttk_https_scheme();
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $dir = ttk_checkout_web_dir();
    $path = ($dir === '' || $dir === '/') ? '/pagar.php' : $dir . '/pagar.php';
    return $scheme . '://' . $host . $path . '?' . $query;
}

function ttk_url_checkout_index(string $query = ''): string {
    $scheme = ttk_https_scheme();
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $dir = ttk_checkout_web_dir();
    $path = ($dir === '' || $dir === '/') ? '/index.php' : $dir . '/index.php';
    $q = $query !== '' ? ('?' . $query) : '';
    return $scheme . '://' . $host . $path . $q;
}

function ttk_config(): array {
    ttk_load_dotenv();
    return [
        'utmify_token'   => getenv('UTMIFY_TOKEN') ?: 'DnovaZ75b6HfZSPz7gWp5vlWJPfm2lkUtYZv',
        'waymb_id'       => getenv('WAYMB_CLIENT_ID') ?: 'jorgemcunha_f8841059',
        'waymb_secret'   => getenv('WAYMB_CLIENT_SECRET') ?: 'f4d1a6bd-9e70-444d-ace2-ba9294f54ae2',
        'waymb_email'    => getenv('WAYMB_ACCOUNT_EMAIL') ?: '',
    ];
}

function ttk_waymb_success_url(string $orderId): string {
    $origin = ttk_site_public_origin();
    $checkoutDirForUpsell = ttk_checkout_web_dir();
    $parentForUpsell = dirname($checkoutDirForUpsell);
    if ($parentForUpsell === '/' || $parentForUpsell === '.' || $parentForUpsell === '\\' || $parentForUpsell === '') {
        $upsellPath = '/upsell.php';
    } else {
        $upsellPath = rtrim(str_replace('\\', '/', $parentForUpsell), '/') . '/upsell.php';
    }
    return $origin . $upsellPath . '?id=' . rawurlencode($orderId);
}

/**
 * Telefone do pagador para MB WAY (PT): documentação exige string; uso internacional 351 + 9 dígitos.
 */
function ttk_waymb_normalize_phone_pt(string $raw): array {
    $digits = preg_replace('/\D/', '', $raw);
    if ($digits === '') {
        return ['ok' => false, 'error' => 'Indica o número MB WAY.', 'phone' => ''];
    }
    if (strlen($digits) === 9 && ($digits[0] ?? '') === '9') {
        return ['ok' => true, 'phone' => '351' . $digits];
    }
    if (strlen($digits) === 12 && substr($digits, 0, 3) === '351' && ($digits[3] ?? '') === '9') {
        return ['ok' => true, 'phone' => $digits];
    }
    return ['ok' => false, 'error' => 'Número MB WAY inválido: usa 9 dígitos (começados por 9) ou 351 + número.', 'phone' => $digits];
}

/**
 * Extrai mensagem de erro da resposta WayMB (ex.: campo "error" ou "message").
 */
function ttk_waymb_parse_error_response($res): string {
    if (is_array($res)) {
        if (!empty($res['error']) && is_string($res['error'])) {
            return $res['error'];
        }
        if (!empty($res['message']) && is_string($res['message'])) {
            return $res['message'];
        }
    }
    return 'Erro ao gerar pagamento MB WAY. Tenta novamente.';
}

/**
 * @param array{name:string,email:string,phone:string,document:string} $customer
 */
function ttk_notify_utmify(string $orderId, array $customer, string $productName, int $priceInCents, array $config): void {
    $chUtm = curl_init('https://api.utmify.com.br/api-credentials/orders');
    curl_setopt($chUtm, CURLOPT_POST, 1);
    curl_setopt($chUtm, CURLOPT_POSTFIELDS, json_encode([
        'orderId' => $orderId,
        'status' => 'waiting_payment',
        'customer' => [
            'name' => $customer['name'],
            'email' => $customer['email'],
            'phone' => $customer['phone'],
            'document' => $customer['document'],
        ],
        'products' => [['id' => 'prod_01', 'name' => $productName, 'quantity' => 1, 'priceInCents' => $priceInCents]],
        'commission' => ['totalPriceInCents' => $priceInCents, 'currency' => 'EUR'],
    ]));
    curl_setopt($chUtm, CURLOPT_HTTPHEADER, ['x-api-token: ' . $config['utmify_token'], 'Content-Type: application/json']);
    curl_setopt($chUtm, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chUtm, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($chUtm);
    curl_close($chUtm);
}

/**
 * POST /transactions/info — corpo JSON { "id": "..." } conforme documentação.
 *
 * @return array{ok:bool, status?:string, raw?:array}
 */
function ttk_waymb_api_transaction_info(string $transactionId): array {
    $ch = curl_init('https://api.waymb.com/transactions/info');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['id' => $transactionId], JSON_UNESCAPED_SLASHES));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 25);
    $raw = curl_exec($ch);
    curl_close($ch);
    $res = json_decode((string) $raw, true);
    if (!is_array($res)) {
        return ['ok' => false];
    }
    $status = isset($res['status']) ? (string) $res['status'] : '';
    return ['ok' => true, 'status' => $status, 'raw' => $res];
}

/**
 * @return array{ok:bool, query?:array<string,string>, error?:string}
 */
function ttk_waymb_api_create(
    string $method,
    string $name,
    string $email,
    string $nif,
    string $phoneRaw,
    string $orderId,
    float $amount,
    array $config
): array {
    if ($config['waymb_email'] === '') {
        return ['ok' => false, 'error' => 'Configura WAYMB_ACCOUNT_EMAIL no ficheiro .env (email da conta WayMB).'];
    }

    if ($method !== 'mbway') {
        return ['ok' => false, 'error' => 'Apenas MB WAY está disponível.'];
    }

    $norm = ttk_waymb_normalize_phone_pt($phoneRaw);
    if (!$norm['ok']) {
        return ['ok' => false, 'error' => $norm['error']];
    }
    $phone = $norm['phone'];

    $failedUrl = ttk_url_checkout_index('erro=' . rawurlencode('O pagamento MB WAY não foi concluído. Podes tentar novamente.'));

    $wayPayload = [
        'client_id'     => $config['waymb_id'],
        'client_secret' => $config['waymb_secret'],
        'account_email' => $config['waymb_email'],
        'amount'        => round($amount, 2),
        'currency'      => 'EUR',
        'method'        => 'mbway',
        'payer'         => [
            'email'    => $email,
            'name'     => $name,
            'document' => $nif,
            'phone'    => $phone,
        ],
        'callbackUrl'   => ttk_waymb_callback_url(),
        'success_url'   => ttk_waymb_success_url($orderId),
        'failed_url'    => $failedUrl,
    ];

    $ch = curl_init('https://api.waymb.com/transactions/create');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($wayPayload, JSON_UNESCAPED_SLASHES));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 45);

    $raw_res = curl_exec($ch);
    curl_close($ch);

    $res = json_decode((string) $raw_res, true);

    if (!is_array($res)) {
        return ['ok' => false, 'error' => 'Resposta inválida da API WayMB. Verifica a ligação ao servidor.'];
    }

    if (!isset($res['statusCode']) || (int) $res['statusCode'] !== 200) {
        return ['ok' => false, 'error' => ttk_waymb_parse_error_response($res)];
    }

    if (array_key_exists('generatedMBWay', $res) && $res['generatedMBWay'] !== true) {
        return ['ok' => false, 'error' => ttk_waymb_parse_error_response($res)];
    }

    $tid = (string) ($res['id'] ?? $res['transactionID'] ?? '');
    if ($tid === '') {
        return ['ok' => false, 'error' => 'Resposta WayMB sem ID de transação.'];
    }

    return [
        'ok' => true,
        'query' => [
            'method' => 'mbway',
            'ent'    => isset($res['referenceData']['entity']) ? (string) $res['referenceData']['entity'] : '',
            'ref'    => isset($res['referenceData']['reference']) ? (string) $res['referenceData']['reference'] : '',
            'tel'    => $phone,
            'tid'    => $tid,
            'val'    => number_format($amount, 2, ',', ''),
        ],
    ];
}
