<?php
/**
 * Einmal-Prüfung: Läuft auf dem Webspace eine PHP-Version mit den Sicherheits-
 * korrekturen vom 21.10.2026 (CVE-2026-109618, CVE-2026-109619)?
 *
 * Wird NICHT automatisch hochgeladen. Zum Prüfen einzeln in /api/ hochladen,
 * die /api/.htaccess kurz um diesen Dateinamen ergänzen, aufrufen – und danach
 * SOFORT wieder löschen.
 */
declare(strict_types=1);
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');

$patched = ['8.2' => '8.2.35', '8.3' => '8.3.36', '8.4' => '8.4.27', '8.5' => '8.5.12'];
$branch = PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION;
if (isset($patched[$branch])) {
    $ok = version_compare(PHP_VERSION, $patched[$branch], '>=');
} else {
    $ok = version_compare(PHP_VERSION, '8.6.0', '>=');
}

echo "PHP-Version: " . PHP_VERSION . "\n";
echo $ok
    ? "OK – Sicherheitsupdate vom Oktober 2026 ist enthalten.\n"
    : "ACHTUNG – diese Version ist angreifbar. Bitte im Kundenmenü des Hosters auf eine aktuelle Version umstellen (mind. " . ($patched[$branch] ?? '8.4.27') . ").\n";
echo "mail(): " . (function_exists('mail') ? 'verfügbar' : 'NICHT verfügbar') . "\n";
echo "mbstring: " . (extension_loaded('mbstring') ? 'verfügbar' : 'NICHT verfügbar') . "\n";
echo "fileinfo: " . (extension_loaded('fileinfo') ? 'verfügbar' : 'NICHT verfügbar') . "\n";
echo "upload_max_filesize: " . ini_get('upload_max_filesize') . " / post_max_size: " . ini_get('post_max_size') . "\n";
