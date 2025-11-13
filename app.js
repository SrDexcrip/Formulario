document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    const filters = document.querySelectorAll('.filter-btn');

    filters.forEach(button => {
        button.addEventListener('click', function () {
            // Gestionar clase activa
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');

            // Filtrar tarjetas
            for (let item of gallery.children) {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });

    // Lógica para botones de acción
    const toggleJsButton = document.getElementById('toggle-js');
    const editCardButton = document.getElementById('edit-card');

    toggleJsButton.addEventListener('click', () => {
        const jsCards = document.querySelectorAll('[data-category="js"]');
        jsCards.forEach(card => card.classList.toggle('hidden'));
    });

    editCardButton.addEventListener('click', () => {
        const firstCard = document.getElementById('card-1');
        firstCard.querySelector('h3').textContent = '¡Título cambiado!';
        firstCard.querySelector('p').textContent = 'El contenido ha sido actualizado dinámicamente con JavaScript.';
        firstCard.querySelector('img').src = 'https://via.placeholder.com/400x240?text=Imagen+Nueva';
    });
});
