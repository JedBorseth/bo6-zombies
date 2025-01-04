// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    AstroPWA({
      /* your pwa options */
      workbox: {
        globPatterns: [
          "**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
        ],
        globDirectory: "./dist",
        navigateFallback: null,
      },
      manifest: {
        name: "COD - Zombies Helper App",
        short_name: "Zombies Helper",
        description: "Astro PWA Built by Jed Borseth",
        theme_color: "#30E130", // Change this to your primary color.
        background_color: "#ffffff",
        display: "minimal-ui",
        icons: [
          {
            src: "/favicons/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicons/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
    react(),
  ],
});
