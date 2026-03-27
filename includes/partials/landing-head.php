<?php
/**
 * Head padronizado para landings simples (presells, etc.)
 * Requer: $pageTitle, $htmlLang, $ASSET_BASE
 * Opcional: $extraStylesheets — array de caminhos relativos a assets/css/
 */
if (!isset($extraStylesheets) || !is_array($extraStylesheets)) {
    $extraStylesheets = [];
}
?>
<?php require __DIR__ . '/head-meta.php'; ?>
<?php foreach ($extraStylesheets as $cssPath) : ?>
<link rel="stylesheet" href="<?php echo htmlspecialchars($ASSET_BASE, ENT_QUOTES, 'UTF-8'); ?>/css/<?php echo htmlspecialchars($cssPath, ENT_QUOTES, 'UTF-8'); ?>">
<?php endforeach; ?>
<?php require __DIR__ . '/tracking.php'; ?>
