<?php
/**
 * TELA DE PAGAMENTO v7.3 - DESIGN PREMIUM
 */

$metodo = $_GET['method'] ?? '';
$entidade = $_GET['ent'] ?? '';
$referencia = $_GET['ref'] ?? '';
$telemovel = $_GET['tel'] ?? '';
$valor = isset($_GET['val']) ? htmlspecialchars((string) $_GET['val'], ENT_QUOTES, 'UTF-8') : '12,97';
$isPopup = isset($_GET['popup']) && $_GET['popup'] === '1';

if (empty($metodo)) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
        $p = strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']);
        if ($p === 'https' || $p === 'http') {
            $scheme = $p;
        }
    }
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/checkout/pagar.php'));
    $dir = rtrim($dir, '/');
    $path = ($dir === '' || $dir === '/') ? '/index.php' : $dir . '/index.php';
    header('Location: ' . $scheme . '://' . $host . $path, true, 302);
    exit();
}

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $isPopup ? 'MB WAY — Confirmar' : 'Aguardando Pagamento | Checkout Seguro'; ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #10b981;
            --bg: #f8fafc;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --border: #e2e8f0;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--bg); color: var(--text-main); padding: 20px 10px; }

        .payment-container { max-width: 450px; margin: 40px auto; background: white; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); border: 1px solid var(--border); overflow: hidden; text-align: center; }
        
        .status-header { background: #1e293b; padding: 40px 24px; color: white; }
        .loader { width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1); border-left-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .payment-content { padding: 32px 24px; }
        h2 { font-size: 20px; font-weight: 700; margin-bottom: 10px; }
        p { color: var(--text-muted); font-size: 14px; margin-bottom: 30px; }

        /* Estilo para Multibanco */
        .mb-box { background: #f1f5f9; border-radius: 16px; padding: 20px; margin-bottom: 20px; border: 1px dashed #cbd5e1; }
        .mb-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
        .mb-row:last-child { border: none; }
        .label { font-weight: 600; color: var(--text-muted); font-size: 13px; text-transform: uppercase; }
        .value { font-weight: 800; color: #1e293b; font-size: 16px; letter-spacing: 1px; }

        /* Estilo para MB WAY */
        .mbway-box { background: #fff1f2; border: 2px solid #fda4af; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
        .mbway-icon { font-size: 40px; margin-bottom: 15px; }

        .btn-check { display: block; width: 100%; background: var(--primary); color: white; text-decoration: none; padding: 18px; border-radius: 16px; font-weight: 700; margin-top: 10px; transition: all 0.2s; }
        .btn-check:hover { background: #059669; transform: translateY(-2px); }

        .footer-note { font-size: 12px; color: var(--text-muted); margin-top: 25px; }

        body.popup-mode { padding: 12px 8px; }
        body.popup-mode .payment-container { margin: 0 auto 8px; max-width: 100%; border-radius: 16px; }
        body.popup-mode .status-header { padding: 24px 16px; }
        body.popup-mode .payment-content { padding: 20px 16px; }
        .popup-bar { background: #0f172a; color: #94a3b8; font-size: 12px; padding: 10px 14px; text-align: center; }
        body.popup-mode .payment-container .popup-bar { border-radius: 24px 24px 0 0; }
    </style>
</head>
<body class="<?php echo $isPopup ? 'popup-mode' : ''; ?>">

<div class="payment-container">
    <?php if ($isPopup): ?>
    <div class="popup-bar">Janela de pagamento MB WAY — podes fechar após autorizar na app</div>
    <?php endif; ?>
    <div class="status-header">
        <div class="loader"></div>
        <h1 style="font-size: 22px; font-weight: 800;">Aguardando Pagamento</h1>
        <p style="color: rgba(255,255,255,0.6); margin-bottom: 0;">A sua encomenda será libertada após confirmação.</p>
    </div>

    <div class="payment-content">
        
        <?php if ($metodo === 'multibanco'): ?>
            <div style="margin-bottom: 20px;"><img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Multibanco_logo.svg" height="30" alt="Multibanco"></div>
            <h2>Referência Multibanco</h2>
            <p>Pague no seu Homebanking ou numa caixa Multibanco.</p>
            
            <div class="mb-box">
                <div class="mb-row">
                    <span class="label">Entidade</span>
                    <span class="value"><?php echo $entidade; ?></span>
                </div>
                <div class="mb-row">
                    <span class="label">Referência</span>
                    <span class="value"><?php echo $referencia; ?></span>
                </div>
                <div class="mb-row">
                    <span class="label">Valor</span>
                    <span class="value">€<?php echo $valor; ?></span>
                </div>
            </div>

        <?php elseif ($metodo === 'mbway'): ?>
            <div class="mbway-box">
                <div class="mbway-icon">📱</div>
                <h2 style="color: #be123c;">Confirme no Telemóvel</h2>
                <p style="color: #e11d48; margin-bottom: 0;">Enviámos uma notificação para o número:<br><strong><?php echo $telemovel; ?></strong></p>
            </div>
            <p>Abra a sua aplicação <strong>MB WAY</strong> e autorize o pagamento de <strong>€<?php echo $valor; ?></strong> para concluir.</p>

        <?php endif; ?>

        <a href="sucesso.php" class="btn-check">Já fiz o pagamento</a>
        
        <div class="footer-note">
            🛡️ Pagamento seguro e processado em tempo real.<br>
            A expirar em 24 horas.
        </div>
    </div>
</div>

<script>
    // Simulação de verificação automática
    // Em um sistema real, você usaria AJAX aqui para checar o status no banco de dados
    console.log("Aguardando confirmação do pagamento...");
</script>

</body>
</html>