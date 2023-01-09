import solid from 'solid-start/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Picross',
        short_name: 'My Picross',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      },
    }),
  ],
})
