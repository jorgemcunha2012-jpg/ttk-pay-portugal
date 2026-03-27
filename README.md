# TikTok Pay Portugal — base do projeto

Funil de landings (quiz + presells), checkout Cooud em PHP e páginas de upsell em `ups/`.

## Requisitos

- PHP 7.4+ no servidor (para `index.php`, presells e `checkout/*.php`).
- Servir a raiz do repositório como document root (ou ajustar caminhos).

## Estrutura

| Pasta / ficheiro | Função |
|------------------|--------|
| `index.php` | Quiz principal (composto com `includes/sections/*`) |
| `presell1.php`, `presell2.php` | Presells com CSS/JS em `assets/` |
| `index.html`, `presell*.html` | Redirecionam para as versões `.php` (links antigos / hosting só estático parcial) |
| `assets/css/` | Folhas de estilo (`landings/`, `components/`, quiz, `checkout.css`) |
| `assets/js/` | Scripts do quiz; `landings/` para presells |
| `includes/site-config.php` | IDs de tracking (override com env: `TIKTOK_PIXEL_ID`, `CLARITY_PROJECT_ID`) |
| `includes/partials/` | Head, tracking, scripts do quiz, head das landings |
| `includes/sections/` | HTML reutilizável (quiz, presells) |
| `checkout/` | Checkout, webhooks, proxy |
| `ups/` | Páginas de upsell (bundles próprios) |
| `images/` | Imagens referenciadas pelo quiz |

## Nova landing PHP

1. Cria `includes/sections/minha-landing-main.php` com o markup.
2. Cria `assets/css/landings/minha-landing.css` e/ou `assets/js/landings/minha-landing.js`.
3. Adiciona `minha-landing.php` na raiz:

```php
<?php
require __DIR__ . '/includes/site-config.php';
$pageTitle = 'Título';
$htmlLang = 'pt-PT';
$extraStylesheets = ['landings/minha-landing.css'];
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($htmlLang, ENT_QUOTES, 'UTF-8'); ?>">
<head>
<?php require __DIR__ . '/includes/partials/landing-head.php'; ?>
</head>
<body class="landing landing--minha">
<?php require __DIR__ . '/includes/sections/minha-landing-main.php'; ?>
<script src="<?php echo htmlspecialchars($ASSET_BASE, ENT_QUOTES, 'UTF-8'); ?>/js/landings/minha-landing.js"></script>
</body>
</html>
```

## Deploy em subpasta

Se o site não estiver na raiz do domínio, edita `includes/site-config.php` e define `$ASSET_BASE` com o prefixo correcto (ex.: `'meusite/assets'`).

## Variáveis de ambiente (opcional)

- `TIKTOK_PIXEL_ID` — ID do pixel TikTok
- `CLARITY_PROJECT_ID` — ID do projeto Microsoft Clarity

Podes definir no painel do hosting ou copiar `.env.example` para `.env` na raiz (carregado automaticamente por `includes/site-config.php`).
