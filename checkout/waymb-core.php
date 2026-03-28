<?php
/**
 * Lógica partilhada: UTMIFY + WayMB (usada por gateway.php e api-mbway.php).
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
        'cooud_url'      => getenv('COOUD_CHECKOUT_URL') ?: 'https://checkout.cooud.com/01KM8K3YX7FGBA31N3KJANCKRB',
        'waymb_id'       => getenv('WAYMB_CLIENT_ID') ?: 'jorgemcunha_f8841059',
        'waymb_secret'   => getenv('WAYMB_CLIENT_SECRET') ?: 'f4d1a6bd-9e70-444d-ace2-ba9294f54ae2',
        'waymb_email'    => getenv('WAYMB_ACCOUNT_EMAIL') ?: '',
    ];
}

function ttk_waymb_success_url(string $orderId): string {
    $checkoutDirForUpsell = ttk_checkout_web_dir();
    $parentForUpsell = dirname($checkoutDirForUpsell);
    if ($parentForUpsell === '/' || $parentForUpsell === '.' || $parentForUpsell === '\\' || $parentForUpsell === '') {
        $upsellPath = '/upsell.php';
    } else {
        $upsellPath = rtrim(str_replace('\\', '/', $parentForUpsell), '/') . '/upsell.php';
    }
    return ttk_https_scheme() . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . $upsellPath . '?id=' . rawurlencode($orderId);
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
 * @return array{ok:bool, query?:array<string,string>, error?:string}
 */
function ttk_waymb_api_create(
    string $method,
    string $name,
    string $email,
    string $nif,
    string $phone,
    string $orderId,
    float $amount,
    array $config
): array {
    if ($config['waymb_email'] === '') {
        return ['ok' => false, 'error' => 'Configura WAYMB_ACCOUNT_EMAIL no ficheiro .env (email da conta WayMB).'];
    }

    if (strlen($phone) === 9) {
        $phone = '351' . $phone;
    }

    $wayPayload = [
        'client_id'     => $config['waymb_id'],
        'client_secret' => $config['waymb_secret'],
        'account_email' => $config['waymb_email'],
        'amount'        => $amount,
        'method'        => ($method === 'mbway') ? 'mbway' : 'multibanco',
        'payer'         => ['email' => $email, 'name' => $name, 'document' => $nif, 'phone' => $phone],
        'success_url'   => ttk_waymb_success_url($orderId),
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

    if (isset($res['statusCode']) && (int) $res['statusCode'] === 200) {
        return [
            'ok' => true,
            'query' => [
                'method' => $method,
                'ent'    => $res['referenceData']['entity'] ?? '',
                'ref'    => $res['referenceData']['reference'] ?? '',
                'tel'    => $phone,
                'tid'    => (string) ($res['id'] ?? ''),
                'val'    => number_format($amount, 2, ',', ''),
            ],
        ];
    }

    return ['ok' => false, 'error' => 'Erro ao gerar pagamento. Tente novamente.'];
}
