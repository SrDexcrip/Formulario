# Portafolio y Aplicaciones Modulares

Este proyecto es un portafolio personal que muestra una galería de proyectos y también contiene varias mini-aplicaciones modulares.

## Estructura del Proyecto

El proyecto ha sido reestructurado para una mejor organización y escalabilidad. Las aplicaciones independientes ahora residen dentro de la carpeta `apps/`.

- `/index.html`: La página principal del portafolio.
- `/apps/contacto-php/`: Una aplicación de formulario de contacto simple que usa PHP para el backend.
    - `index.html`: El frontend del formulario.
    - `contacto.php`: El script de backend que procesa el envío del formulario.
- `/apps/mensajes-vue/`: Una aplicación de gestión de mensajes creada con Vue.js y un backend de PHP.
    - `index.html`: El frontend de la aplicación Vue.
    - `api.php`: La API de backend que maneja las operaciones CRUD para los mensajes.
- `/formulario.html`: Un formulario independiente con validación del lado del cliente en JavaScript.
- `/vite.config.js`: Archivo de configuración para Vite, que incluye un proxy para las peticiones a la API de PHP.
- `/assets/`: Contiene imágenes y otros recursos estáticos.
- `/components/`: Contiene componentes de JavaScript (actualmente para Vue y la galería).

## Cómo Ejecutar el Proyecto

Este proyecto utiliza Vite para el servidor de desarrollo de frontend y requiere un servidor PHP para el backend.

1.  **Iniciar el servidor PHP:**
    Navega a la raíz del proyecto y ejecuta un servidor PHP que sirva los archivos. La configuración de Vite está preparada para conectarse al puerto 8000.
    ```bash
    php -S localhost:8000
    ```

2.  **Iniciar el servidor de Vite:**
    En otra terminal, instala las dependencias y ejecuta el servidor de desarrollo de Vite.
    ```bash
    npm install
    npm run dev
    ```

3.  **Acceder a la aplicación:**
    Abre tu navegador y ve a la URL que proporciona Vite (generalmente `http://localhost:5173` o similar).

El proxy en `vite.config.js` se encargará de redirigir las llamadas a la API (rutas que empiezan con `/api/...`) al servidor PHP que se ejecuta en el puerto 8000.
