import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_BASE_URL } from './src/api/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Make sure this matches the port you want your dev server to run on
    
    // CSP Headers
    headers: {
      'Content-Security-Policy': `
        default-src 'self'; 
        script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
        style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
        img-src 'self' data:; 
        frame-ancestors 'none'; 
        font-src 'self' fonts.gstatic.com data:; 
        connect-src 'self' ${API_BASE_URL} http://localhost:5000 https://localhost:5000 data:; 
        object-src 'none'; 
        base-uri 'self'; 
        form-action 'self';
      `,
    },
  },
})
