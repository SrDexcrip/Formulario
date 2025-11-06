// app.js — Manipulación del DOM para la sección "Galería / Proyectos"

// Selecciono botones y elementos clave usando selectores.
const filterButtons = document.querySelectorAll('.filter-btn'); // botones de filtro
const gallery = document.getElementById('gallery'); // contenedor de tarjetas
const toggleJsBtn = document.getElementById('toggle-js'); // botón que oculta/mostrar categoría js
const editCardBtn = document.getElementById('edit-card'); // botón para editar la primera tarjeta

// Obtengo todas las tarjetas como NodeList (live) para manipularlas.
const cards = gallery.querySelectorAll('.card');

// Función para aplicar filtro por categoría
function filterBy(category){
  // Recorremos todas las tarjetas y alternamos la clase .hidden
  cards.forEach(card => {
    const cat = card.dataset.category; // accedo al atributo data-category
    if(category === 'all' || cat === category){
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Añadir event listeners a los botones de filtro (delegación simple)
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Actualizo estado visual de botones
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.filter;
    filterBy(category);
  });
});

// Control: ocultar/mostrar tarjetas con categoría 'js'
let jsHidden = false; // estado para alternar
toggleJsBtn.addEventListener('click', () => {
  jsHidden = !jsHidden;
  cards.forEach(card => {
    if(card.dataset.category === 'js'){
      // toggle agrega/quita la clase 'hidden' según el estado
      if(jsHidden) card.classList.add('hidden');
      else card.classList.remove('hidden');
    }
  });
});

// Control: cambiar texto e imagen de la primera tarjeta
editCardBtn.addEventListener('click', () => {
  // Selecciono la primera tarjeta por id
  const first = document.getElementById('card-1');
  if(!first) return;

  // Cambiar el título (H3)
  const h3 = first.querySelector('h3');
  const p = first.querySelector('p');
  const img = first.querySelector('img');

  // Si ya fue editada, restauramos; sino, aplicamos cambios.
  if(first.dataset.edited === 'true'){
    h3.textContent = 'Proyecto Web 1';
    p.textContent = 'Landing page responsiva creada con HTML/CSS.';
    img.src = 'https://via.placeholder.com/400x240?text=Proyecto+1';
    first.dataset.edited = 'false';
  } else {
    h3.textContent = 'Proyecto Web 1 — Versión actualizada';
    p.textContent = 'Se actualizó la tarjeta dinámicamente con JavaScript. Ejemplo de cambio de texto y imagen.';
    // Cambiamos la imagen a otra URL (placeholder con otro color)
    img.src = 'https://via.placeholder.com/400x240/2b6cb0/ffffff?text=Actualizado';
    first.dataset.edited = 'true';
  }
});

// Observaciones:
// - Uso de querySelector / querySelectorAll para seleccionar elementos del DOM.
// - Añadí event listeners con addEventListener para que los cambios sean visibles sin recargar.
// - Para mostrar/ocultar uso la clase CSS 'hidden' que aplica display:none.


// =========================
// Validaciones del formulario
// =========================

// Funciones reutilizables de validación
function noEstaVacio(value) {
  return value.trim() !== '';
}

function esCorreoValido(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function tieneFuerzaContraseña(password) {
  if (password.length < 8) return false;
  const tieneLetra = /[a-zA-Z]/.test(password);
  const tieneNumero = /\d/.test(password);
  return tieneLetra && tieneNumero;
}

function coincidenContraseñas(password, confirmPassword) {
  return password === confirmPassword;
}

function mostrarError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + '-error');
  if (!field || !errorElement) return;
  field.classList.remove('valid');
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function limpiarError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + '-error');
  if (!field || !errorElement) return;
  field.classList.remove('error');
  field.classList.add('valid');
  field.setAttribute('aria-invalid', 'false');
  errorElement.style.display = 'none';
}

function validarCampo(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return true;
  const value = field.value;
  let esValido = true;
  let mensajeError = '';

  switch (fieldId) {
    case 'nombre':
      if (!noEstaVacio(value)) {
        esValido = false; mensajeError = 'El nombre completo es obligatorio';
      }
      break;
    case 'email':
      if (!noEstaVacio(value)) {
        esValido = false; mensajeError = 'El correo electrónico es obligatorio';
      } else if (!esCorreoValido(value)) {
        esValido = false; mensajeError = 'El formato del correo electrónico no es válido';
      }
      break;
    case 'password':
      if (!noEstaVacio(value)) {
        esValido = false; mensajeError = 'La contraseña es obligatoria';
      } else if (!tieneFuerzaContraseña(value)) {
        esValido = false; mensajeError = 'La contraseña debe tener al menos 8 caracteres, una letra y un número';
      }
      break;
    case 'confirmPassword':
      const password = document.getElementById('password').value;
      if (!noEstaVacio(value)) {
        esValido = false; mensajeError = 'La confirmación de contraseña es obligatoria';
      } else if (!coincidenContraseñas(password, value)) {
        esValido = false; mensajeError = 'Las contraseñas no coinciden';
      }
      break;
  }

  if (esValido) limpiarError(fieldId); else mostrarError(fieldId, mensajeError);
  return esValido;
}

function validarFormulario() {
  const campos = ['nombre','email','password','confirmPassword'];
  let formularioValido = true;
  campos.forEach(campo => { if (!validarCampo(campo)) formularioValido = false; });
  return formularioValido;
}

function mostrarMensajeExito() {
  const successMessage = document.getElementById('successMessage');
  const form = document.getElementById('registroForm');
  if (form) form.style.display = 'none';
  if (successMessage) successMessage.style.display = 'block';
}

// Configuración de eventos del DOM para el formulario
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const campos = ['nombre','email','password','confirmPassword'];

  campos.forEach(campoId => {
    const campo = document.getElementById(campoId);
    if (!campo) return;
    campo.addEventListener('blur', () => validarCampo(campoId));
    campo.addEventListener('input', () => {
      if (campo.classList.contains('error')) validarCampo(campoId);
    });
  });

  const passwordField = document.getElementById('password');
  if (passwordField) passwordField.addEventListener('input', () => {
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword && confirmPassword.value !== '') validarCampo('confirmPassword');
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validarFormulario()) mostrarMensajeExito(); else console.log('Formulario con errores');
    });
  }

  console.log('Validaciones del formulario cargadas');
});
