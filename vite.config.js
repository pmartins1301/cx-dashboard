import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['bessie-rubiaceous-secondarily.ngrok-free.dev'],
  },
});
