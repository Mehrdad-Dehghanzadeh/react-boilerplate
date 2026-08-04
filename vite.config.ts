import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import babel from '@rolldown/plugin-babel'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@bridge': path.resolve(__dirname, './src/bridge'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@store': path.resolve(__dirname, './src/store'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@UIKit': path.resolve(__dirname, './src/components/UIKit'),
      '@shared': path.resolve(__dirname, './src/components/shared'),
      '@Roots': path.resolve(__dirname, './src/components/Roots'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@ts': path.resolve(__dirname, './src/ts')
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
