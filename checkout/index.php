<?php
/**
 * CHECKOUT SEGURO v8.0 - DINÂMICO (PRINCIPAL / UPSELL)
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

        /* Payment Grid */
        .payment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
        .payment-option { cursor: pointer; position: relative; }
        .payment-option input { position: absolute; opacity: 0; cursor: pointer; }
        
        .option-content { border: 2px solid var(--border); border-radius: 16px; padding: 16px 8px; text-align: center; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; }
        .option-content .icon { font-size: 24px; }
        .option-content span:last-child { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }

        .payment-option input:checked + .option-content { border-color: var(--primary); background: rgba(16, 185, 129, 0.04); }
        .payment-option input:checked + .option-content span:last-child { color: var(--primary); }

        .brand-logos { display: flex; gap: 4px; margin-top: 5px; justify-content: center; }
        .brand-logos img { height: 8px; opacity: 0.7; }

        .btn-submit { width: 100%; background: var(--primary); color: white; border: none; padding: 18px; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3); margin-top: 10px; }
        .btn-submit:hover { background: var(--primary-dark); transform: translateY(-1px); }

        .security-info { margin-top: 30px; text-align: center; font-size: 12px; color: var(--text-muted); }
        .trust-icons { display: flex; justify-content: center; gap: 15px; margin-bottom: 12px; filter: grayscale(1); opacity: 0.4; }

        .error-msg { color: var(--error); font-size: 12px; margin-top: -12px; margin-bottom: 12px; display: none; font-weight: 500; }
        .input-error { border-color: var(--error) !important; background: #fff1f2 !important; }

        @media (max-width: 440px) {
            .input-row { grid-template-columns: 1fr; }
            .payment-grid { grid-template-columns: 1fr; }
            .option-content { flex-direction: row; padding: 12px 20px; justify-content: flex-start; gap: 15px; }
            .brand-logos { margin-top: 0; margin-left: auto; }
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
        <input type="hidden" name="is_upsell" value="<?php echo $isUpsell ? '1' : '0'; ?>">
        <input type="hidden" name="utm_source" id="utm_source">
        <input type="hidden" name="utm_campaign" id="utm_campaign">

        <div class="checkout-content">
            <div class="step-title">1. Dados de Faturação</div>
            <input type="text" name="name" placeholder="Nome Completo" required class="input-field">
            <input type="email" name="email" placeholder="E-mail para o comprovativo" required class="input-field">
            
            <div class="input-row">
                <input type="text" name="document" id="nif" placeholder="NIF (Portugal)" required class="input-field" maxlength="9">
                <div style="display: flex; flex-direction: column;">
                    <input type="tel" name="phone" id="phone" placeholder="Telemóvel" required class="input-field" maxlength="9">
                    <span id="phone-error" class="error-msg">Número MB WAY inválido</span>
                </div>
            </div>

            <div class="step-title" style="margin-top: 10px;">2. Método de Pagamento</div>
            <div class="payment-grid">
                <label class="payment-option">
                    <input type="radio" name="payment_method" value="credit_card" checked>
                    <div class="option-content">
                        <span class="icon">💳</span>
                        <span>Cartão</span>
                        <div class="brand-logos">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard">
                        </div>
                    </div>
                </label>

                <label class="payment-option">
                    <input type="radio" name="payment_method" value="mbway" id="method-mbway">
                    <div class="option-content">
                        <span class="icon">📱</span>
                        <span>MB WAY</span>
                    </div>
                </label>

                <label class="payment-option">
                    <input type="radio" name="payment_method" value="multibanco">
                    <div class="option-content">
                        <span class="icon">🏦</span>
                        <span>REF MB</span>
                    </div>
                </label>
            </div>

            <button type="submit" class="btn-submit" id="btn-text">Finalizar Pagamento</button>

            <div class="security-info">
                <div class="trust-icons">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Multibanco_logo.svg" height="12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" height="12">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Google_Pay_Logo.svg" height="12">
                </div>
                <p>🔒 SSL 256-bit | Processamento Seguro WayMB & Orbit</p>
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

    form.onsubmit = function(e) {
        const isMBWay = document.getElementById('method-mbway').checked;
        const phoneValue = phoneInput.value;
        const btn = document.getElementById('btn-text');

        // Validação básica de Telemóvel Português para MB WAY
        if (isMBWay && (phoneValue.length !== 9 || !phoneValue.startsWith('9'))) {
            e.preventDefault();
            phoneInput.classList.add('input-error');
            phoneError.style.display = 'block';
            window.scrollTo({ top: phoneInput.offsetTop - 100, behavior: 'smooth' });
            return false;
        }

        btn.innerHTML = "A processar...";
        btn.style.opacity = "0.7";
        btn.style.pointerEvents = "none";
    };

    phoneInput.addEventListener('keyup', function() {
        if (this.value.length === 9) {
            this.classList.remove('input-error');
            phoneError.style.display = 'none';
        }
    });
</script>

</body>
</html>