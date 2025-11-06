// components/project-card.js
// Componente reusable para el proyecto — implementado con Vue 3 (CDN)
// --------------------------------------------------------------------
// Estructura y objetivos:
// - Exporta (registra) un componente llamado `project-card` que acepta
//   propiedades (props) para hacerlo reutilizable: title, description, image, accent.
// - Implementa dos comportamientos dinámicos: toggle de resaltado (cambio de color)
//   y actualización del título (simula llegada de nuevos datos).
// - Está pensado para integrarse simplemente cargando Vue (CDN) y este archivo.

const { createApp, ref } = Vue;

const ProjectCard = {
  name: 'project-card',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false, default: '' },
    accent: { type: String, required: false, default: '#2b6cb0' }
  },
  setup(props) {
    // Estado local reactivo del componente
    // `active` controla si la tarjeta está resaltada (cambio visual).
    const active = ref(false);

    // `localTitle` permite modificar el título dentro del componente sin
    // actualizar la fuente de datos externa. Es útil para demostrar actualización.
  const localTitle = ref(props.title);

    function toggleActive() {
      active.value = !active.value;
    }

    function updateTitle() {
      // Simula una actualización de datos: concatenamos una etiqueta.
      localTitle.value = localTitle.value.includes('(actualizado)') ? props.title : (localTitle.value + ' (actualizado)');
    }

    return { active, localTitle, toggleActive, updateTitle };
  },
  template: `
    <article class="card vue-card" :style="{borderColor: active ? accent : 'transparent'}">
      <!-- En esta parte va la imagen. Recomendación: imagen profesional 16:9, alta resolución, fondo neutro o captura representativa del proyecto. -->
      <img v-if="image" :src="image" :alt="localTitle" @error="(e)=>e.target.src='https://via.placeholder.com/400x240?text=VUE'" />
      <h3>{{ localTitle }}</h3>
      <p>{{ description }}</p>
      <div class="vue-actions">
        <button @click="toggleActive" aria-pressed="false">Toggle resaltar</button>
        <button @click="updateTitle">Actualizar título</button>
      </div>
    </article>
  `
};

// Montaje de la aplicación Vue que utiliza el componente
createApp({
  components: { ProjectCard },
  data() {
    return {
      projects: [
        { title: 'Tarjeta Vue 1', description: 'Componente reutilizable: tarjeta de presentación.', image: 'https://via.placeholder.com/400x240?text=VUE+1', accent: '#e76f51' },
        { title: 'Tarjeta Vue 2', description: 'Muestra propiedades y comportamientos dinámicos.', image: 'https://via.placeholder.com/400x240?text=VUE+2', accent: '#2a9d8f' },
        { title: 'Tarjeta Vue 3', description: 'Fácil de reusar en tu portafolio.', image: 'https://via.placeholder.com/400x240?text=VUE+3', accent: '#2b6cb0' }
      ]
    };
  }
}).mount('#vue-app');

// Comentarios sobre la elección de Vue (para tu PDF):
// - Vue vía CDN permite integrar rápidamente componentes en sitios estáticos sin toolchain.
// - La API Composition (setup + ref) facilita crear estado local y comportamientos reusables.
// - Ventajas: curvas de aprendizaje suaves, rendimiento ligero y componentes encapsulados.
