import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure that chart.js is correctly aliased if necessary (useful for module resolution)
      'chart.js': 'chart.js/dist/chart.min.js', // Make sure the correct path is used
      // You can also add custom aliases for other modules if needed
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increase the chunk size limit for warnings
    rollupOptions: {
      external: [
        '@fortawesome/fontawesome-svg-core', // Externalize FontAwesome if you don't want it bundled
        'chart.js', // Externalize Chart.js if you don't want it bundled
      ],
      output: {
        manualChunks(id) {
          // Split large dependencies into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('chart.js')) {
              return 'chartjs'; // Separate Chart.js into its own chunk
            }
            if (id.includes('@fortawesome')) {
              return 'fontawesome'; // Separate FontAwesome into its own chunk
            }
          }
        },
      },
    },
  },
  server: {
    fs: {
      strict: false, // Allow serving files from outside the root directory (for static assets like SVG)
    },
    proxy: {
      // If you're having any issues with API requests or needing proxy support, you can add proxy config here
      // '/api': 'http://localhost:5000', // Example of proxying API calls
    },
  },
});
