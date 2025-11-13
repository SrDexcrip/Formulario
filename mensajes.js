document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-mensaje');
    const feedback = document.getElementById('form-feedback');
    const listaMensajes = document.getElementById('mensajes-lista');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = form.titulo.value;
        const contenido = form.contenido.value;

        // Mostrar feedback usando clases de CSS
        feedback.className = 'feedback'; // Clase base
        feedback.textContent = 'Enviando...';

        try {
            // RUTA CORREGIDA: Apuntar al archivo en la raíz del proyecto
            const response = await fetch('guardar_mensaje.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, contenido })
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Feedback de éxito
                feedback.classList.add('success');
                feedback.textContent = '¡Mensaje enviado con éxito!';
                form.reset();

                // Añadir el nuevo mensaje a la lista usando la estructura CORRECTA
                const nuevoMensaje = document.createElement('article');
                nuevoMensaje.className = 'mensaje'; // Usar la clase correcta

                const fecha = new Date();
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;

                nuevoMensaje.innerHTML = `
                    <header>
                        <h2>${escapeHTML(titulo)}</h2>
                        <time datetime="${fecha.toISOString()}">${fechaFormateada}</time>
                    </header>
                    <p>${escapeHTML(contenido)}</p>
                `;
                
                // Insertar al principio de la lista
                if (listaMensajes.querySelector('p')) {
                    // Si estaba el mensaje de "No hay mensajes", se reemplaza
                    listaMensajes.innerHTML = '';
                }
                listaMensajes.prepend(nuevoMensaje);

            } else {
                throw new Error(result.message || 'Error desconocido al guardar.');
            }
        } catch (error) {
            // Feedback de error
            feedback.className = 'feedback error';
            feedback.textContent = `Error: ${error.message}`;
        }

        // Ocultar el mensaje de feedback después de unos segundos
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = '';
        }, 5000);
    });

    // Función para escapar HTML y prevenir XSS
    function escapeHTML(str) {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
});