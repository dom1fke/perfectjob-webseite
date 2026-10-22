/**
 * Präfix für Dateien aus /public. Nötig für die GitHub-Pages-Vorschau, die unter
 * /perfectjob-webseite/ liegt – next/image ergänzt den basePath nicht selbst.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;

/** true im statischen Vorschau-Build (GitHub Pages) – dort gibt es keinen Server für Formulare. */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";
