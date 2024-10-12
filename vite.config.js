import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path for alias

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // Set an alias for components
    },
  },
  plugins: [react()],
});
