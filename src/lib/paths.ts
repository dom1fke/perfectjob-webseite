/**
 * Präfix für Dateien aus /public. Nötig für Builds unter einem Unterordner
 * (GitHub-Pages-Vorschau, Testordner auf dem Webspace) – next/image ergänzt den
 * basePath nicht selbst.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;

/** Vorschau- und Test-Builds sollen nicht in Suchmaschinen auftauchen. */
export const noIndex = process.env.NEXT_PUBLIC_NOINDEX === "true";
