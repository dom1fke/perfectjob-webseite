/**
 * Präfix für Dateien aus /public. Nötig für Builds unter einem Unterordner
 * (GitHub-Pages-Vorschau, Testordner auf dem Webspace) – next/image ergänzt den
 * basePath nicht selbst.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;

/** true im statischen Vorschau-Build (GitHub Pages) – dort gibt es keinen Server für Formulare. */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

/** true im Build für den Webspace: statische Seite, Formulare laufen über PHP (Ordner php/). */
export const isWebspace = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "webspace";

/** Adresse eines Formular-Endpunkts – Node-Route oder PHP-Skript je nach Build. */
export const apiUrl = (name: "kontakt" | "bewerbung") =>
  isWebspace ? `${basePath}/api/${name}.php` : `/api/${name}`;
