import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: isProd ? "https://pedroagentesocial.github.io/neurovivir/" : "http://localhost:4321/",
  base: isProd ? "/neurovivir" : "/",
  integrations: [tailwind()],
  server: { port: 4321 }
});
