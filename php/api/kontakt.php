<?php
/** Kontakt- und Personalanfragen – Gegenstück zu src/app/api/kontakt/route.ts */

declare(strict_types=1);
require __DIR__ . '/../lib/bootstrap.php';

pj_require_post();
pj_guard_bots();
pj_guard_rate_limit();

// Muss zu contactTopics in src/lib/validation.ts passen
$topics = ['Allgemeine Anfrage', 'Personalanfrage (Einrichtung)', 'Frage zur Bewerbung'];

$v = new PjValidator();
$v->oneOf('topic', $topics, 'Bitte ein Anliegen wählen');
$v->text('name', 120, 'Bitte geben Sie Ihren Namen an');
$v->text('organization', 160);
$v->email('email');
$v->phone('phone');
$v->text('message', 4000, 'Bitte schreiben Sie uns eine kurze Nachricht', true);
$v->privacy();
$v->respondIfInvalid();
$d = $v->data;

[$text, $html] = pj_render_fields("Neue Kontaktanfrage: {$d['topic']}", [
    ['Anliegen', $d['topic']],
    ['Name', $d['name']],
    ['Einrichtung', $d['organization']],
    ['E-Mail', $d['email']],
    ['Telefon', $d['phone']],
    ['Nachricht', $d['message']],
]);

$config = pj_config();
if (!pj_send_mail($config['mail_to'], "[Website] {$d['topic']} – {$d['name']}", $text, $html, $d['email'])) {
    error_log('Perfect Job: Kontaktformular – Versand fehlgeschlagen');
    pj_respond(502, ['error' => 'Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an oder schreiben Sie eine E-Mail.']);
}

pj_respond(200, ['ok' => true]);
