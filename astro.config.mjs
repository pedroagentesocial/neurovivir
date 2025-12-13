import tailwind from "@astrojs/tailwind";

/** @type {import('astro').AstroUserConfig} */
export default {
  integrations: [tailwind({})],
  server: {
    port: 4321
  }
};
