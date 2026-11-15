import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { chapterSlugs } from './src/content/slugs.ts'

/** Every route ships as static HTML. */
const pages = [
  '/',
  '/map',
  '/calendar',
  '/quick',
  '/cv',
  ...chapterSlugs.map((slug) => `/trail/${slug}`),
].map((path) => ({ path }))

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages,
    }),
    viteReact(),
  ],
})
