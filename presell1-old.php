<?php
/**
 * Landing presell 1 — verificação (secção em includes/sections/presell1-main.php).
 */
require __DIR__ . '/includes/site-config.php';

$pageTitle = 'Verificação de Segurança';
$htmlLang = 'pt-BR';
$extraStylesheets = ['landings/presell1.css'];
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($htmlLang, ENT_QUOTES, 'UTF-8'); ?>">
<head>
<?php require __DIR__ . '/includes/partials/landing-head.php'; ?>
</head>
<body class="landing landing--presell landing--presell1">
<?php require __DIR__ . '/includes/sections/presell1-main.php'; ?>
<script src="<?php echo htmlspecialchars($ASSET_BASE, ENT_QUOTES, 'UTF-8'); ?>/js/landings/presell1.js"></script>
</body>
</html>
