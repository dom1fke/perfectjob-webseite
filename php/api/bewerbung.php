<?php
/** Bewerbungen mit Anhängen – Gegenstück zu src/app/api/bewerbung/route.ts */

declare(strict_types=1);
require __DIR__ . '/../lib/bootstrap.php';

pj_require_post();
pj_guard_bots();
pj_guard_rate_limit();

$config = pj_config();

// Muss zu positions/workModels in src/lib/validation.ts passen (wird beim Build aus den Stellen erzeugt)
$options = json_decode((string) @file_get_contents(__DIR__ . '/../lib/form-options.json'), true) ?: [];
$positions = $options['positions'] ?? [];
$workModels = $options['workModels'] ?? ['Vollzeit', 'Teilzeit', 'Minijob', 'Noch offen'];

$v = new PjValidator();
$v->oneOf('position', $positions, 'Bitte eine Stelle wählen');
$v->text('firstName', 120, 'Bitte Vornamen angeben');
$v->text('lastName', 120, 'Bitte Nachnamen angeben');
$v->email('email');
$v->phone('phone', 'Bitte Telefonnummer angeben, damit wir Sie erreichen');
$v->text('city', 120);
$v->text('qualification', 200);
$v->oneOf('workModel', $workModels, 'Bitte Eingabe prüfen', 'Noch offen');
$v->text('startDate', 40);
$v->text('message', 4000, null, true);
$v->privacy();
$v->respondIfInvalid();
$d = $v->data;

$attachments = pj_uploaded_files('files');

$name = "{$d['firstName']} {$d['lastName']}";
[$text, $html] = pj_render_fields("Neue Bewerbung: {$d['position']}", [
    ['Stelle', $d['position']],
    ['Name', $name],
    ['E-Mail', $d['email']],
    ['Telefon', $d['phone']],
    ['Wohnort', $d['city']],
    ['Qualifikation', $d['qualification']],
    ['Arbeitszeit', $d['workModel']],
    ['Frühester Start', $d['startDate']],
    ['Nachricht', $d['message']],
    ['Anhänge', implode(', ', array_column($attachments, 'name')) ?: 'keine (Kurzbewerbung)'],
]);

if (!pj_send_mail($config['mail_to'], "[Bewerbung] {$d['position']} – $name", $text, $html, $d['email'], $attachments)) {
    error_log('Perfect Job: Bewerbung – Versand fehlgeschlagen');
    pj_respond(502, ['error' => 'Ihre Bewerbung konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.']);
}

// Eingangsbestätigung – fester Text, damit das Formular nicht für Spam missbraucht werden kann
$company = (string) ($config['company_name'] ?? 'Perfect Job');
$phone = (string) ($config['company_phone'] ?? '');
$confirm = "Hallo {$d['firstName']},\n\nvielen Dank für Ihre Bewerbung als {$d['position']}! Wir haben Ihre Unterlagen erhalten und melden uns in der Regel innerhalb von 48 Stunden bei Ihnen.\n\n"
    . ($phone !== '' ? "Bei Fragen erreichen Sie uns unter $phone.\n\n" : '')
    . "Herzliche Grüße\nIhr Team von $company";
$confirmHtml = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1d2126">'
    . nl2br(htmlspecialchars($confirm, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</div>';
if (!pj_send_mail($d['email'], "Ihre Bewerbung bei $company", $confirm, $confirmHtml)) {
    error_log('Perfect Job: Bewerbung – Eingangsbestätigung fehlgeschlagen');
}

pj_respond(200, ['ok' => true]);
