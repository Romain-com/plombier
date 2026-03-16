// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lyon.plomberie-roche.fr',
  integrations: [sitemap()],
});
