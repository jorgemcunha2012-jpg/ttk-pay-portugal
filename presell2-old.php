<?php
/**
 * Landing presell 2 — progresso anual (secção em includes/sections/presell2-main.php).
 */
require __DIR__ . '/includes/site-config.php';

$pageTitle = 'Seu progresso anual';
$htmlLang = 'pt-BR';
$extraStylesheets = ['landings/presell2.css'];
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($htmlLang, ENT_QUOTES, 'UTF-8'); ?>">
<head>
<?php require __DIR__ . '/includes/partials/landing-head.php'; ?>
</head>
<body class="landing landing--presell landing--presell2">
<?php require __DIR__ . '/includes/sections/presell2-main.php'; ?>
<script src="<?php echo htmlspecialchars($ASSET_BASE, ENT_QUOTES, 'UTF-8'); ?>/js/landings/presell2.js"></script>
</body>
</html>
