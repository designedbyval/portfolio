// @ts-check
import { defineConfig } from 'astro/config';

// Static output — Vercel deploys this with zero config (Framework preset: Astro).
// Set `site` to your final domain for canonical URLs.
export default defineConfig({
  site: 'https://valencia-portfolio.vercel.app',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
});
