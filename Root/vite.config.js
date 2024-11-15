import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'chart.js': 'chart.js/dist/chart.min.js',  // Explicitly point to the minified version
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,  // Increase the chunk size limit for warnings
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-svg-core',  // Externalize FontAwesome
        'chart.js',  // Externalize Chart.js if necessary
      ],
      output: {
        manualChunks(id) {
          // Split large dependencies into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('chart.js')) {
              return 'chartjs';  // Separate Chart.js into its own chunk
            }
            if (id.includes('@fortawesome')) {
              return 'fontawesome';  // Separate FontAwesome into its own chunk
            }
          }
        },
      },
    },
  },
  server: {
    fs: {
      strict: false,  // Allow serving files from outside the root directory (for static assets like SVG)
    },
  },
});
