import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Statischer Export: GitHub-Pages-Vorschau (.github/workflows/pages.yml) oder Webspace mit PHP (scripts/build-webspace.mjs)
const isStaticExport =
  process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true" || process.env.NEXT_PUBLIC_DEPLOY_TARGET === "webspace";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.openstreetmap.org",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const serverConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

// Statische Dateien: kein Node-Server, keine Bildoptimierung. Header kommen auf dem Webspace aus php/.htaccess.
const staticExportConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default isStaticExport ? staticExportConfig : serverConfig;
