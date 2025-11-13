document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-publicacion');
    const tabla = document.getElementById('tabla-publicaciones').getElementsByTagName('tbody')[0];

    // --- Configuración de Supabase ---
    const SUPABASE_URL = 'https://omkujvtezqbveriuikgw.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta3VqdnRlenFidmVyaXVpa2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDgyNTIsImV4cCI6MjA3ODM4NDI1Mn0.kij5Od9C69Q0DSz3pv3pwy7cNQ7hM5IkWxZqalHlTMA';
    const API_ENDPOINT = `${SUPABASE_URL}/rest/v1/publicaciones`;

    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal' // Para que POST/PATCH/DELETE no devuelvan datos
    };

    // --- Funciones de la API ---

    const obtenerPublicaciones = async () => {
        try {
            const respuesta = await fetch(`${API_ENDPOINT}?select=*`, { headers });
            if (!respuesta.ok) throw new Error(`Error al cargar: ${respuesta.statusText}`);
            
            const publicaciones = await respuesta.json();
            tabla.innerHTML = '';
            publicaciones.forEach(pub => {
                const fila = tabla.insertRow();
                fila.innerHTML = `
                    <td>${pub.titulo}</td>
                    <td>${pub.contenido}</td>
                    <td>
                        <button class="editar" data-id="${pub.id}" data-titulo="${pub.titulo}" data-contenido="${pub.contenido}">Editar</button>
                        <button class="eliminar" data-id="${pub.id}">Eliminar</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Error obteniendo publicaciones:", error);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('publicacion-id').value;
        const titulo = document.getElementById('titulo').value;
        const contenido = document.getElementById('contenido').value;
        
        const publicacion = { titulo, contenido };

        let url = API_ENDPOINT;
        let method = 'POST';

        if (id) {
            url = `${API_ENDPOINT}?id=eq.${id}`;
            method = 'PATCH';
        }

        try {
            const respuesta = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(publicacion)
            });
            if (!respuesta.ok) throw new Error(`Error al guardar: ${respuesta.statusText}`);

            formulario.reset();
            document.getElementById('publicacion-id').value = '';
            obtenerPublicaciones();

        } catch (error) {
            console.error("Error al guardar la publicación:", error);
        }
    };

    const manejarClickTabla = async (e) => {
        const target = e.target;

        if (target.classList.contains('eliminar')) {
            const id = target.dataset.id;
            if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
                try {
                    const respuesta = await fetch(`${API_ENDPOINT}?id=eq.${id}`, {
                        method: 'DELETE',
                        headers
                    });
                    if (!respuesta.ok) throw new Error(`Error al eliminar: ${respuesta.statusText}`);
                    obtenerPublicaciones();
                } catch (error) {
                    console.error("Error eliminando:", error);
                }
            }
        }

        if (target.classList.contains('editar')) {
            document.getElementById('publicacion-id').value = target.dataset.id;
            document.getElementById('titulo').value = target.dataset.titulo;
            document.getElementById('contenido').value = target.dataset.contenido;
        }
    };

    // --- Asignar Eventos ---
    formulario.addEventListener('submit', manejarSubmit);
    tabla.addEventListener('click', manejarClickTabla);

    // --- Carga Inicial ---
    obtenerPublicaciones();
});