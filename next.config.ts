import type { NextConfig } from "next";

/**
 * Die Seite ist komplett statisch (kein Server-Code, keine Datenbank): `npm run build`
 * erzeugt den Ordner out/, der auf jeden Webspace hochgeladen werden kann.
 * Sicherheits-Header kommen auf dem Webspace aus public/.htaccess.
 *
 * NEXT_PUBLIC_BASE_PATH: Unterordner, z. B. /neu (Testordner) oder /perfectjob-webseite (GitHub Pages)
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
