const { createApp, ref, computed } = Vue;

const projectCardComponent = {
  props: {
    title: String,
    description: String,
    image: String,
    accent: String,
  },
  setup(props) {
    const localTitle = ref(props.title);
    const isActive = ref(false);

    const cardStyle = computed(() => ({
      '--accent-color': isActive.value ? props.accent : '#f0f0f0',
      border: isActive.value ? `2px solid ${props.accent}` : 'none',
    }));

    const toggleActive = () => {
      isActive.value = !isActive.value;
      console.log(`Card '${localTitle.value}' active state: ${isActive.value}`);
    };

    const updateTitle = () => {
      localTitle.value = "¡Título Actualizado!";
    };

    // Fallback por si la imagen original falla
    const onImageError = (e) => {
        e.target.src = 'assets/proyecto1.jpg'; // <- IMAGEN LOCAL
    };

    return { 
      localTitle, 
      cardStyle, 
      toggleActive, 
      updateTitle,
      onImageError
    };
  },
  template: `
        <article class="card vue-card" :style="cardStyle">
          <img v-if="image" :src="image" :alt="localTitle" @error="onImageError" />
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
  components: { ProjectCard: projectCardComponent },
  data() {
    return {
      projects: [
        { title: 'Tarjeta Vue 1', description: 'Componente reutilizable: tarjeta de presentación.', image: 'assets/proyecto1.jpg', accent: '#e76f51' }, // <- IMAGEN LOCAL
        { title: 'Tarjeta Vue 2', description: 'Muestra propiedades y comportamientos dinámicos.', image: 'assets/proyecto1.jpg', accent: '#2a9d8f' }, // <- IMAGEN LOCAL
        { title: 'Tarjeta Vue 3', description: 'Fácil de reusar en tu portafolio.', image: 'assets/proyecto1.jpg', accent: '#2b6cb0' } // <- IMAGEN LOCAL
      ]
    };
  }
}).mount('#vue-app');

// Comentarios sobre la elección de Vue (para tu PDF):
// - Vue vía CDN permite integrar rápidamente componentes en sitios estáticos sin toolchain.
// - La API Composition (setup + ref) facilita crear estado local y comportamientos reusables.
// - Ventajas: curvas de aprendizaje suaves, rendimiento ligero y componentes encapsulados.