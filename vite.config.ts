import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: __dirname,
      build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            }
        }
      },
      base: '/SkipTheDocs/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      define: {}
    };
});
