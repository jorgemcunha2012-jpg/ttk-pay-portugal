<?php
/** @var string $pageTitle */
/** @var string $htmlLang */
if (!isset($pageTitle)) {
    $pageTitle = 'Landing';
}
if (!isset($htmlLang)) {
    $htmlLang = 'pt-PT';
}
?>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
