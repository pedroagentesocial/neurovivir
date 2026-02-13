import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: process.env.SITE_URL || (isProd ? "https://neurovivir.com" : "http://localhost:4321/"),
  base: process.env.BASE_PATH ?? (isProd ? new URL(process.env.SITE_URL || "https://neurovivir.com").pathname || "/" : "/"),
  integrations: [tailwind()],
  server: { port: 4321 }
});
