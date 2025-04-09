import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: {
      origin: 'https://localhost:3000',
      credentials: true,
    },
    headers: {
      'Content-Security-Policy': [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com;",
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
        "img-src 'self' data: https://via.placeholder.com https://assets.nflxext.com;",
        "connect-src 'self' http://localhost:5000 https://localhost:5001 https://accounts.google.com https://oauth2.googleapis.com;",
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
        "font-src 'self' fonts.gstatic.com data:;",
        "object-src 'none';",
        "form-action 'self';",
        "frame-ancestors 'none';",
        "base-uri 'self';"
      ].join(' ')
    }
  }
});
