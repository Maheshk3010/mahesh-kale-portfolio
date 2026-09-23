import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/mahi/portfolio";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>`,
          { headers: { "Content-Type": "application/xml; charset=utf-8" } },
        ),
    },
  },
});
