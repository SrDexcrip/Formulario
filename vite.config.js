import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Redirige las peticiones de /api a tu servidor PHP
      '/api': {
        // ¡CORREGIDO! Apunta al servidor PHP que se ejecuta localmente.
        target: 'http://localhost:8000',
        changeOrigin: true, // Necesario para que el servidor PHP reciba la petición correctamente
        rewrite: (path) => path.replace(/^\/api/, ''), // Quita /api de la ruta antes de enviarla
      },
    }
  }
});