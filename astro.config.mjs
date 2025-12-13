import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://pedroagentesocial.github.io/neurovivir/",
  base: "/neurovivir",
  integrations: [tailwind()],
  server: { port: 4321 }
});
