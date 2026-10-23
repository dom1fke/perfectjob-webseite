<?php
/**
 * Gemeinsame Funktionen für die Formular-Endpunkte auf dem Webspace.
 * Gegenstück zu src/lib/validation.ts, src/lib/spam-guard.ts und src/lib/mail.ts
 * der Node-Variante – Antworten haben dasselbe JSON-Format.
 *
 * Wichtig: Diese Skripte schützen nicht vor Lücken in PHP selbst. Der Webspace
 * muss eine aktuelle PHP-Version nutzen (siehe php/tools/php-version-check.php).
 */

declare(strict_types=1);

const PJ_MIN_FILL_SECONDS = 2.5;
const PJ_RATE_WINDOW_SECONDS = 600;
const PJ_RATE_MAX_PER_WINDOW = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** Lädt die Konfiguration – bevorzugt außerhalb des öffentlichen Webordners. */
function pj_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $candidates = [
        dirname($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) . '/perfectjob-config.php',
        __DIR__ . '/config.php',
    ];
    foreach ($candidates as $file) {
        if (is_file($file)) {
            $config = require $file;
            return $config;
        }
    }
    error_log('Perfect Job: keine Konfiguration gefunden (perfectjob-config.php bzw. lib/config.php)');
    pj_respond(503, ['error' => 'Das Formular ist gerade nicht verfügbar. Bitte rufen Sie uns an oder schreiben Sie eine E-Mail.']);
}

function pj_respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function pj_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        pj_respond(405, ['error' => 'Methode nicht erlaubt.']);
    }
    // Upload größer als post_max_size → PHP verwirft alle Felder
    if (empty($_POST) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
        pj_respond(413, ['fieldErrors' => ['files' => 'Die Dateien sind zusammen größer als 10 MB.']]);
    }
}

/** Honeypot + Mindestzeit. Bots erhalten eine scheinbare Erfolgsmeldung. */
function pj_guard_bots(): void
{
    $honeypot = (string) ($_POST['website'] ?? '');
    $started = (float) ($_POST['_ts'] ?? 0) / 1000;
    if ($honeypot !== '' || $started <= 0 || microtime(true) - $started < PJ_MIN_FILL_SECONDS) {
        pj_respond(200, ['ok' => true]);
    }
}

/** Einfache Ratenbegrenzung pro IP (gehashte IP, Dateien im temporären Ordner). */
function pj_guard_rate_limit(): void
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $file = sys_get_temp_dir() . '/pj-rate-' . hash('sha256', $ip . __DIR__) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = json_decode((string) @file_get_contents($file), true) ?: [];
    }
    $hits = array_values(array_filter($hits, fn ($t) => is_int($t) && $now - $t < PJ_RATE_WINDOW_SECONDS));
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    if (count($hits) > PJ_RATE_MAX_PER_WINDOW) {
        pj_respond(429, ['error' => 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an.']);
    }
}

/* ---------- Validierung ---------- */

final class PjValidator
{
    public array $errors = [];
    public array $data = [];

    /** Text bereinigen: trimmen, Steuerzeichen entfernen (Zeilenumbrüche nur bei $multiline). */
    private function clean(string $name, bool $multiline): string
    {
        $value = $_POST[$name] ?? '';
        if (!is_string($value)) {
            return '';
        }
        $value = trim($value);
        $pattern = $multiline ? '/[^\P{C}\n\t]/u' : '/\p{C}/u';
        return (string) preg_replace($pattern, '', $value);
    }

    private function fail(string $name, string $message): void
    {
        $this->errors[$name] ??= $message;
    }

    public function text(string $name, int $max, ?string $requiredMessage = null, bool $multiline = false): void
    {
        $value = $this->clean($name, $multiline);
        if ($requiredMessage !== null && $value === '') {
            $this->fail($name, $requiredMessage);
        } elseif (mb_strlen($value) > $max) {
            $this->fail($name, "Maximal $max Zeichen");
        }
        $this->data[$name] = $value;
    }

    public function email(string $name): void
    {
        $value = $this->clean($name, false);
        if (mb_strlen($value) > 200 || !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->fail($name, 'Bitte eine gültige E-Mail-Adresse angeben');
        }
        $this->data[$name] = $value;
    }

    public function phone(string $name, ?string $requiredMessage = null): void
    {
        $value = $this->clean($name, false);
        if ($value === '' && $requiredMessage !== null) {
            $this->fail($name, $requiredMessage);
        } elseif ($value !== '' && (mb_strlen($value) > 40 || !preg_match('#^[+0-9 ()/-]{6,}$#', $value))) {
            $this->fail($name, 'Bitte eine gültige Telefonnummer angeben');
        }
        $this->data[$name] = $value;
    }

    public function oneOf(string $name, array $allowed, string $message, ?string $default = null): void
    {
        $value = $this->clean($name, false);
        if ($value === '' && $default !== null) {
            $value = $default;
        }
        if (!in_array($value, $allowed, true)) {
            $this->fail($name, $message);
        }
        $this->data[$name] = $value;
    }

    public function privacy(): void
    {
        if (($_POST['privacy'] ?? '') !== 'on') {
            $this->fail('privacy', 'Bitte stimmen Sie der Datenschutzerklärung zu');
        }
    }

    public function respondIfInvalid(): void
    {
        if ($this->errors) {
            pj_respond(422, ['fieldErrors' => $this->errors]);
        }
    }
}

/* ---------- Datei-Uploads ---------- */

const PJ_UPLOAD_MAX_FILES = 5;
const PJ_UPLOAD_MAX_TOTAL = 10 * 1024 * 1024;
/** Endung => [erlaubte MIME-Typen laut finfo, Dateisignatur] */
const PJ_UPLOAD_TYPES = [
    'pdf' => [['application/pdf'], "%PDF"],
    'jpg' => [['image/jpeg'], "\xFF\xD8\xFF"],
    'jpeg' => [['image/jpeg'], "\xFF\xD8\xFF"],
    'png' => [['image/png'], "\x89PNG"],
    'doc' => [['application/msword', 'application/CDFV2', 'application/x-ole-storage'], "\xD0\xCF\x11\xE0"],
    'docx' => [['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'], "PK\x03\x04"],
];

/**
 * Prüft die hochgeladenen Dateien. Sie werden NICHT gespeichert, sondern nur aus
 * dem temporären Upload-Ordner gelesen und direkt an die E-Mail gehängt.
 *
 * @return list<array{name: string, type: string, content: string}>
 */
function pj_uploaded_files(string $field = 'files'): array
{
    $raw = $_FILES[$field] ?? null;
    if (!$raw || !is_array($raw['name'] ?? null)) {
        return [];
    }
    $files = [];
    $total = 0;
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    foreach ($raw['name'] as $i => $originalName) {
        $error = $raw['error'][$i] ?? UPLOAD_ERR_NO_FILE;
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error === UPLOAD_ERR_INI_SIZE || $error === UPLOAD_ERR_FORM_SIZE) {
            pj_respond(422, ['fieldErrors' => [$field => 'Die Dateien sind zusammen größer als 10 MB.']]);
        }
        $tmp = (string) ($raw['tmp_name'][$i] ?? '');
        if ($error !== UPLOAD_ERR_OK || !is_uploaded_file($tmp)) {
            pj_respond(422, ['fieldErrors' => [$field => 'Eine Datei konnte nicht hochgeladen werden. Bitte erneut versuchen.']]);
        }
        if (count($files) >= PJ_UPLOAD_MAX_FILES) {
            pj_respond(422, ['fieldErrors' => [$field => 'Bitte höchstens ' . PJ_UPLOAD_MAX_FILES . ' Dateien anhängen.']]);
        }
        $size = (int) filesize($tmp);
        $total += $size;
        if ($total > PJ_UPLOAD_MAX_TOTAL) {
            pj_respond(422, ['fieldErrors' => [$field => 'Die Dateien sind zusammen größer als 10 MB.']]);
        }

        $name = pj_safe_filename((string) $originalName);
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $mime = (string) $finfo->file($tmp);
        $content = (string) file_get_contents($tmp);
        $type = PJ_UPLOAD_TYPES[$ext] ?? null;
        if (!$type || !in_array($mime, $type[0], true) || !str_starts_with($content, $type[1])) {
            pj_respond(422, ['fieldErrors' => [$field => "„{$name}“ hat kein erlaubtes Format (PDF, JPG, PNG, Word)."]]);
        }
        $files[] = ['name' => $name, 'type' => $type[0][0], 'content' => $content];
    }
    return $files;
}

function pj_safe_filename(string $name): string
{
    $name = basename(str_replace('\\', '/', $name));
    $name = (string) preg_replace('/[^\p{L}\p{N}._ -]/u', '_', $name);
    return mb_substr($name !== '' ? $name : 'datei', 0, 100);
}

/* ---------- E-Mail ---------- */

/** Entfernt Zeilenumbrüche aus Kopfzeilen (Schutz vor Header-Injection). */
function pj_header_value(string $value): string
{
    return trim((string) preg_replace('/[\r\n]+/', ' ', $value));
}

function pj_encode_header(string $value): string
{
    return mb_encode_mimeheader(pj_header_value($value), 'UTF-8', 'B', "\r\n");
}

/**
 * Versendet eine E-Mail über die mail()-Funktion des Hosters.
 * Mit 'dry_run' => true in der Konfiguration wird nur ins Fehlerprotokoll geschrieben.
 */
function pj_send_mail(string $to, string $subject, string $text, string $html, ?string $replyTo = null, array $attachments = []): bool
{
    $config = pj_config();
    $from = pj_header_value((string) $config['mail_from']);
    $fromName = (string) ($config['mail_from_name'] ?? 'Perfect Job Website');
    $to = pj_header_value($to);

    if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        error_log('Perfect Job: ungültige Absender- oder Empfängeradresse');
        return false;
    }

    $boundary = 'pj-' . bin2hex(random_bytes(12));
    $alt = 'pj-alt-' . bin2hex(random_bytes(12));

    $headers = [
        'From: ' . pj_encode_header($fromName) . " <$from>",
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'X-Mailer: PerfectJob-Website',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . pj_header_value($replyTo);
    }

    $body = "--$boundary\r\n"
        . "Content-Type: multipart/alternative; boundary=\"$alt\"\r\n\r\n"
        . "--$alt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$alt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$alt--\r\n";
    foreach ($attachments as $file) {
        $filename = pj_encode_header($file['name']);
        $body .= "--$boundary\r\n"
            . "Content-Type: {$file['type']}; name=\"$filename\"\r\n"
            . "Content-Disposition: attachment; filename=\"$filename\"\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($file['content']));
    }
    $body .= "--$boundary--\r\n";

    if (!empty($config['dry_run'])) {
        error_log("[mail:dry-run] An: $to | Betreff: $subject\n$text");
        return true;
    }

    // -f setzt den Envelope-Absender – viele Hoster verlangen eine Adresse der eigenen Domain
    return mail($to, pj_encode_header($subject), $body, implode("\r\n", $headers), '-f' . $from);
}

/** Baut Text- und HTML-Version einer Tabellen-Mail (wie renderFields in src/lib/mail.ts). */
function pj_render_fields(string $title, array $fields): array
{
    $rows = array_filter($fields, fn ($row) => $row[1] !== '');
    $text = $title . "\n\n" . implode("\n", array_map(fn ($r) => "{$r[0]}: {$r[1]}", $rows));
    $e = fn (string $s) => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $html = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#1d2126">'
        . '<h2 style="color:#d30b11;margin:0 0 16px">' . $e($title) . '</h2><table cellpadding="8" style="border-collapse:collapse">';
    foreach ($rows as [$k, $v]) {
        $html .= '<tr><td style="vertical-align:top;color:#646b75;border-bottom:1px solid #eee;white-space:nowrap">' . $e($k)
            . '</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">' . $e($v) . '</td></tr>';
    }
    $html .= '</table></div>';
    return [$text, $html];
}
