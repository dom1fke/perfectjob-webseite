<?php
/**
 * Konfiguration der Formulare auf dem Webspace.
 *
 * Kopieren nach „perfectjob-config.php“ – am besten EINE Ebene ÜBER dem
 * öffentlichen Webordner (z. B. /perfectjob-config.php, wenn die Seite in
 * /htdocs liegt). Notfalls als lib/config.php daneben ablegen; der Ordner lib/
 * ist per .htaccess gesperrt.
 */
return [
    // Empfänger der Anfragen und Bewerbungen
    'mail_to' => 'info@perfectjob-mainz.de',

    // Absender – muss eine Adresse der eigenen Domain sein, sonst verwirft der Hoster die Mail
    'mail_from' => 'website@perfectjob-mainz.de',
    'mail_from_name' => 'Perfect Job Website',

    // Für die Eingangsbestätigung an Bewerber:innen
    'company_name' => 'Perfect Job',
    'company_phone' => '06131 5705001',

    // true = keine E-Mails senden, nur ins PHP-Fehlerprotokoll schreiben (zum Testen)
    'dry_run' => false,
];
