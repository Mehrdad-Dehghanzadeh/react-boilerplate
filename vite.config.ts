import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import babel from '@rolldown/plugin-babel'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@bridge': path.resolve(import.meta.dirname, './src/bridge'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@locales': path.resolve(import.meta.dirname, './src/locales'),
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@layout': path.resolve(import.meta.dirname, './src/layout'),
      '@constants': path.resolve(import.meta.dirname, './src/constants'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@services': path.resolve(import.meta.dirname, './src/services'),
      '@UIKit': path.resolve(import.meta.dirname, './src/components/UIKit'),
      '@shared': path.resolve(import.meta.dirname, './src/components/shared'),
      '@Roots': path.resolve(import.meta.dirname, './src/components/Roots'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@ts': path.resolve(import.meta.dirname, './src/ts')
    }
  },

  plugins: [
    react(),
    svgr(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ],

  optimizeDeps: {
    exclude: ['buffer', 'process', 'util', 'events']
  }
})
