import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
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
      '@ts': path.resolve(__dirname, './src/ts')
    }
  },

  plugins: [react(), tsconfigPaths(), svgr()],
  optimizeDeps: {
    exclude: ['buffer', 'process', 'util', 'events']
  }
})
