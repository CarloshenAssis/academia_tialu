import type { NextConfig } from "next";

const securityHeaders = [
  // Força HTTPS por 2 anos (navegador nem tenta HTTP depois da 1ª visita)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // Impede o site de ser embutido em iframe de terceiros (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Impede o navegador de "adivinhar" tipo de arquivo (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa pra sites externos ao clicar em links
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia APIs sensíveis do navegador que o app não usa
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
