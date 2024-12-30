// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), AstroPWA({
    /* your pwa options */
  }), react()],
});