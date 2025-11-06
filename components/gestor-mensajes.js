// components/gestor-mensajes.js

const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    // --- ESTADO REACTIVO ---
    // ¡CORREGIDO! Ahora apunta a la ruta del proxy configurado en Vite.
    const API_URL = '/api/api.php';

    // Un array reactivo para almacenar la lista de mensajes
    const mensajes = ref([]);

    // Variables reactivas para los campos del formulario
    const nuevoTitulo = ref('');
    const nuevoContenido = ref('');

    // Un objeto reactivo para manejar los estados de la aplicación (cargando, errores)
    const estado = ref({
      cargando: true,
      error: null, // Almacenará mensajes de error
    });

    // --- MÉTODOS ---

    /**
     * Carga los mensajes desde la API de PHP.
     */
    const cargarMensajes = async () => {
      estado.value.cargando = true;
      estado.value.error = null;
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        mensajes.value = data; // Actualiza el array de mensajes
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
        estado.value.error = 'No se pudieron cargar los mensajes desde el servidor.';
      } finally {
        estado.value.cargando = false;
      }
    };

    /**
     * Envía un nuevo mensaje a la API de PHP.
     */
    const guardarMensaje = async () => {
      if (!nuevoTitulo.value.trim() || !nuevoContenido.value.trim()) {
        estado.value.error = 'El título y el contenido no pueden estar vacíos.';
        return;
      }

      estado.value.error = null;

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            titulo: nuevoTitulo.value,
            contenido: nuevoContenido.value,
          }),
        });

        if (!response.ok) {
            // Intenta leer el mensaje de error del servidor si lo hay
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        // Limpia el formulario
        nuevoTitulo.value = '';
        nuevoContenido.value = '';

        // Recarga la lista de mensajes para mostrar el nuevo
        await cargarMensajes();

      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        estado.value.error = `No se pudo guardar el mensaje: ${error.message}`;
      }
    };

    // --- HOOK DE CICLO DE VIDA ---

    // onMounted se ejecuta una vez que el componente está montado en el DOM.
    // Es el lugar perfecto para cargar los datos iniciales.
    onMounted(() => {
      cargarMensajes();
    });

    // --- RETORNO ---
    // Expone las variables y métodos al template HTML
    return {
      mensajes,
      nuevoTitulo,
      nuevoContenido,
      estado,
      guardarMensaje,
    };
  },
}).mount('#app-gestor-mensajes');