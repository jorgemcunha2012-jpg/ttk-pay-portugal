<?php
/**
 * Landing principal — Quiz TikTok (composição por secções reutilizáveis).
 */
require __DIR__ . '/includes/site-config.php';

$pageTitle = 'TikTok Quiz';
$htmlLang = 'pt-PT';
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($htmlLang, ENT_QUOTES, 'UTF-8'); ?>">
<head>
<?php require __DIR__ . '/includes/partials/head-meta.php'; ?>
<?php require __DIR__ . '/includes/partials/stylesheets-quiz.php'; ?>
<?php require __DIR__ . '/includes/partials/tracking.php'; ?>
</head>
<body class="landing landing--quiz">
  <div class="app-container">
<?php
require __DIR__ . '/includes/sections/quiz-header.php';
require __DIR__ . '/includes/sections/quiz-progress.php';
require __DIR__ . '/includes/sections/quiz-container.php';
require __DIR__ . '/includes/sections/quiz-modals.php';
require __DIR__ . '/includes/sections/quiz-terms.php';
?>
  </div>

<?php
require __DIR__ . '/includes/sections/quiz-confetti.php';
require __DIR__ . '/includes/sections/quiz-method-modal.php';
require __DIR__ . '/includes/partials/scripts-quiz.php';
?>
</body>
</html>
