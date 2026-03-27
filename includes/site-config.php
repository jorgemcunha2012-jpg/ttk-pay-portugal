<?php
/**
 * Configuração global das landings (override com variáveis de ambiente no servidor).
 */
if (!defined('LANDING_ROOT')) {
    define('LANDING_ROOT', dirname(__DIR__));
}

$__envFile = LANDING_ROOT . '/.env';
if (is_readable($__envFile)) {
    foreach (file($__envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $__line) {
        $__line = trim($__line);
        if ($__line === '' || (isset($__line[0]) && $__line[0] === '#')) {
            continue;
        }
        if (preg_match('/^([A-Z][A-Z0-9_]*)=(.*)$/', $__line, $__m)) {
            putenv($__m[1] . '=' . trim($__m[2], " \t\"'"));
        }
    }
}

$TIKTOK_PIXEL_ID = getenv('TIKTOK_PIXEL_ID') ?: 'D5S7LCJC77U7L31UJJEG';
$CLARITY_PROJECT_ID = getenv('CLARITY_PROJECT_ID') ?: 'udbympghov';

/** Caminho relativo aos assets (funciona em subpastas se as páginas estiverem na mesma raiz) */
$ASSET_BASE = 'assets';
