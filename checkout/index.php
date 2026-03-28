<?php
/**
 * CHECKOUT MB WAY (WayMB) — principal / upsell
 */

// 1. Lógica de Detecção de Produto
$isUpsell = (isset($_GET['upsell']) && $_GET['upsell'] == 'true');

if ($isUpsell) {
    $valorExibicao = "9,90";
    $nomeProduto = "Taxa de Antecipação";
    $corHeader = "#10b981"; // Verde para o Upsell (Passa ideia de avanço/sucesso)
} else {
    $valorExibicao = "12,97";
    $nomeProduto = "Verificação de Perfil";
    $corHeader = "#e11d48"; // Vermelho original para a Venda 1
}
?>
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout Seguro | Finalizar Encomenda</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #10b981;
            --primary-dark: #059669;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --error: #e11d48;
            --border: #e2e8f0;
            --header-color: <?php echo $corHeader; ?>;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }

        body { background-color: var(--bg); color: var(--text-main); line-height: 1.5; padding: 20px 10px; }

        .checkout-container { max-width: 480px; margin: 0 auto; background: var(--card-bg); border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02); overflow: hidden; border: 1px solid var(--border); }

        /* Header Area Dinâmica */
        .checkout-header { background: var(--header-color); padding: 32px 24px; color: white; text-align: center; transition: background 0.3s; }
        .checkout-header p { font-size: 14px; opacity: 0.8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
        .checkout-header .product-name { font-size: 13px; font-weight: 700; background: rgba(0,0,0,0.1); padding: 4px 10px; border-radius: 6px; display: inline-block; margin-bottom: 10px; }
        .checkout-header .amount { font-size: 36px; font-weight: 800; margin-bottom: 12px; }
        .checkout-header .badge { background: rgba(255, 255, 255, 0.2); color: white; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }

        /* Content Area */
        .checkout-content { padding: 32px 24px; }
        .step-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; color: var(--text-main); display: flex; align-items: center; gap: 10px; }
        .step-title::before { content: ''; width: 4px; height: 16px; background: var(--primary); border-radius: 10px; display: inline-block; }

        /* Input Styles */
        .input-field { width: 100%; padding: 14px 16px; background: #f1f5f9; border: 2px solid transparent; border-radius: 12px; font-size: 15px; transition: all 0.2s; margin-bottom: 16px; color: var(--text-main); }
        .input-field:focus { background: #fff; border-color: var(--primary); outline: none; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .mbway-only-note { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 14px; padding: 14px 16px; font-size: 14px; color: var(--text-main); margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        .mbway-only-note strong { color: #047857; }

        .btn-submit { width: 100%; background: var(--primary); color: white; border: none; padding: 18px; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3); margin-top: 10px; }
        .btn-submit:hover { background: var(--primary-dark); transform: translateY(-1px); }

        .security-info { margin-top: 30px; text-align: center; font-size: 12px; color: var(--text-muted); }

        .error-msg { color: var(--error); font-size: 12px; margin-top: -12px; margin-bottom: 12px; display: none; font-weight: 500; }
        .input-error { border-color: var(--error) !important; background: #fff1f2 !important; }

        @media (max-width: 440px) {
            .input-row { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

<div class="checkout-container">
    <div class="checkout-header">
        <div class="product-name"><?php echo $nomeProduto; ?></div>
        <p>Valor Total a Pagar</p>
        <div class="amount">€<?php echo $valorExibicao; ?></div>
        <div class="badge">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg>
            Pagamento 100% Seguro
        </div>
    </div>

    <?php if(isset($_GET['erro'])): ?>
        <div style="background: #fff1f2; color: #be123c; padding: 16px; margin: 20px 24px 0; border-radius: 12px; font-size: 13px; text-align: center; border: 1px solid #fee2e2; font-weight: 600;">
            ⚠️ <?php echo htmlspecialchars($_GET['erro']); ?>
        </div>
    <?php endif; ?>

    <form action="gateway.php" method="POST" id="form-checkout">
        <input type="hidden" name="payment_method" value="mbway">
        <input type="hidden" name="is_upsell" value="<?php echo $isUpsell ? '1' : '0'; ?>">
        <input type="hidden" name="utm_source" id="utm_source">
        <input type="hidden" name="utm_campaign" id="utm_campaign">

        <div class="checkout-content">
            <div class="step-title">1. Os teus dados</div>
            <input type="text" name="name" placeholder="Nome completo" required class="input-field">
            <input type="email" name="email" placeholder="E-mail" required class="input-field">

            <div class="input-row">
                <input type="text" name="document" id="nif" placeholder="NIF" required class="input-field" maxlength="9">
                <div style="display: flex; flex-direction: column;">
                    <input type="tel" name="phone" id="phone" placeholder="Número MB WAY (9 dígitos)" required class="input-field" maxlength="9" inputmode="numeric" autocomplete="tel-national">
                    <span id="phone-error" class="error-msg">Número MB WAY inválido (9 dígitos, começado por 9)</span>
                </div>
            </div>

            <div class="step-title" style="margin-top: 10px;">2. Pagamento</div>
            <div class="mbway-only-note">
                <span style="font-size: 22px;">📱</span>
                <span><strong>Apenas MB WAY.</strong> Após clicares em pagar, abre-se uma janela com instruções — confirma na app MB WAY no telemóvel.</span>
            </div>

            <button type="submit" class="btn-submit" id="btn-text">Pagar com MB WAY</button>

            <div class="security-info">
                <p>🔒 Pagamento processado pela WayMB (MB WAY)</p>
            </div>
        </div>
    </form>
</div>

<script>
    // Captura UTMs da URL
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('utm_source').value = urlParams.get('utm_source') || '';
    document.getElementById('utm_campaign').value = urlParams.get('utm_campaign') || '';

    const phoneInput = document.getElementById('phone');
    const nifInput = document.getElementById('nif');
    const phoneError = document.getElementById('phone-error');
    const form = document.getElementById('form-checkout');

    // Somente números nos campos NIF e Telefone
    [phoneInput, nifInput].forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
        });
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const phoneValue = phoneInput.value;
        const btn = document.getElementById('btn-text');

        if (phoneValue.length !== 9 || phoneValue[0] !== '9') {
            phoneInput.classList.add('input-error');
            phoneError.style.display = 'block';
            window.scrollTo({ top: phoneInput.offsetTop - 100, behavior: 'smooth' });
            return;
        }

        btn.disabled = true;
        btn.textContent = 'A processar...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
        const fd = new FormData(form);
        try {
            const res = await fetch('api-mbway.php', { method: 'POST', body: fd, credentials: 'same-origin' });
            const data = await res.json().catch(function() { return {}; });
            if (!data.ok) {
                alert(data.message || 'Não foi possível iniciar o pagamento.');
                btn.disabled = false;
                btn.textContent = 'Pagar com MB WAY';
                btn.style.opacity = '1';
                btn.style.pointerEvents = '';
                return;
            }
            const opts = 'width=440,height=680,scrollbars=yes,resizable=yes,noopener,noreferrer';
            const win = window.open(data.popupUrl, 'WayMBPagamento', opts);
            if (!win) {
                window.location.href = data.popupUrl;
            }
        } catch (err) {
            console.error(err);
            alert('Erro de rede. Tenta novamente.');
        }
        btn.disabled = false;
        btn.textContent = 'Pagar com MB WAY';
        btn.style.opacity = '1';
        btn.style.pointerEvents = '';
    });

    phoneInput.addEventListener('keyup', function() {
        if (this.value.length === 9) {
            this.classList.remove('input-error');
            phoneError.style.display = 'none';
        }
    });
</script>

</body>
</html>