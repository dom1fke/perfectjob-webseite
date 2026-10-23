/**
 * Baut die Webseite für einen klassischen Webspace (Apache + PHP):
 * statischer Next.js-Export + PHP-Formulare aus php/ → Ordner webspace-build/
 *
 *   npm run build:webspace            # für das Hauptverzeichnis der Domain
 *   npm run build:webspace -- /neu    # für einen Testordner (wird nicht indexiert)
 *
 * Danach den INHALT von webspace-build/ per SFTP hochladen. Die Konfiguration
 * (perfectjob-config.php) wird bewusst nicht mitgebaut – siehe php/lib/config.example.php.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const basePath = (process.argv[2] ?? "").replace(/\/+$/, "");
if (basePath && !/^\/[a-z0-9-]+$/i.test(basePath)) {
  console.error(`Ungültiger Unterordner „${basePath}“ – erwartet z. B. /neu`);
  process.exit(1);
}

const work = join(root, ".webspace-work");
const output = join(root, "webspace-build");

// 1. Arbeitskopie ohne Node-API-Routen (die lassen sich nicht statisch exportieren)
rmSync(work, { recursive: true, force: true });
mkdirSync(work);
for (const entry of ["src", "public", "package.json", "next.config.ts", "tsconfig.json", "postcss.config.mjs", "next-env.d.ts"]) {
  if (existsSync(join(root, entry))) cpSync(join(root, entry), join(work, entry), { recursive: true });
}
rmSync(join(work, "src/app/api"), { recursive: true, force: true });
symlinkSync(join(root, "node_modules"), join(work, "node_modules"), "dir");

// 2. Statischer Export
execSync("npx next build --no-lint", {
  cwd: work,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_DEPLOY_TARGET: "webspace",
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_NOINDEX: basePath ? "true" : "false",
  },
});

// 3. Ausgabe zusammenstellen: Export + PHP (ohne Werkzeuge und ohne Zugangsdaten)
rmSync(output, { recursive: true, force: true });
cpSync(join(work, "out"), output, { recursive: true });
cpSync(join(root, "php/api"), join(output, "api"), { recursive: true });
cpSync(join(root, "php/lib"), join(output, "lib"), {
  recursive: true,
  filter: (src) => !/config\.php$/.test(src) || src.endsWith("config.example.php"),
});
let htaccess = readFileSync(join(root, "php/.htaccess"), "utf8");
htaccess = htaccess.replace("ErrorDocument 404 /404.html", `ErrorDocument 404 ${basePath}/404.html`);
writeFileSync(join(output, ".htaccess"), htaccess);

// 4. Auswahllisten für die PHP-Prüfung aus den Stellen erzeugen (eine Quelle der Wahrheit)
const content = readFileSync(join(root, "src/content/content.ts"), "utf8");
const jobsBlock = content.slice(content.indexOf("export const jobs"), content.indexOf("export const employeeBenefits"));
const positions = [...jobsBlock.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]);
const workModels = JSON.parse(
  readFileSync(join(root, "src/lib/validation.ts"), "utf8")
    .match(/workModels = (\[[^\]]+\])/)[1]
    .replace(/'/g, '"'),
);
writeFileSync(
  join(output, "lib/form-options.json"),
  JSON.stringify({ positions: [...positions, "Initiativbewerbung"], workModels }, null, 2),
);

rmSync(work, { recursive: true, force: true });
console.log(`\n✓ Fertig: ${output}${basePath ? ` (für Unterordner ${basePath})` : ""}`);
console.log(`  Stellen für die PHP-Prüfung: ${positions.join(", ")}`);
