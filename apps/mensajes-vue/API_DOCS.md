# Documentación de la API - Gestor de Mensajes

Este documento describe la API de backend para la aplicación de gestión de mensajes.

**Ubicación del archivo:** `/apps/mensajes-vue/api.php`

## General

- **URL Base:** La API responde en la misma ruta que su archivo, pero se accede a través del proxy de Vite. Por ejemplo: `/api/apps/mensajes-vue/api.php`
- **Formato de datos:** Todas las peticiones y respuestas usan el formato `JSON`.

---

## Endpoints

### 1. Obtener todos los mensajes

- **Método:** `GET`
- **URL:** `/api/apps/mensajes-vue/api.php`
- **Descripción:** Recupera una lista de todos los mensajes guardados, ordenados del más reciente al más antiguo.
- **Respuesta Exitosa (Código `200 OK`):**
  - Un array de objetos JSON, donde cada objeto es un mensaje.
  ```json
  [
    {
      "titulo": "Mi primer mensaje",
      "contenido": "Este es el cuerpo del mensaje.",
      "fecha": "2023-10-27T10:00:00Z"
    },
    {
      "titulo": "Otro tema",
      "contenido": "Más contenido interesante.",
      "fecha": "2023-10-26T15:30:00Z"
    }
  ]
  ```
- **Respuesta si no hay mensajes:**
  - Un array JSON vacío `[]`.

### 2. Guardar un nuevo mensaje

- **Método:** `POST`
- **URL:** `/api/apps/mensajes-vue/api.php`
- **Descripción:** Crea y guarda un nuevo mensaje.
- **Cuerpo de la Petición (Request Body):**
  - Un objeto JSON con las siguientes propiedades:
    - `titulo` (string, requerido): El título del mensaje.
    - `contenido` (string, requerido): El cuerpo del mensaje.
  ```json
  {
    "titulo": "Nuevo post desde la API",
    "contenido": "Este contenido fue enviado como JSON."
  }
  ```
- **Respuestas:**
  - **Éxito (Código `201` Created):**
    ```json
    {
      "status": "exito",
      "message": "Mensaje guardado."
    }
    ```
  - **Error - Datos inválidos (Código `400 Bad Request`):**
    ```json
    {
      "status": "error",
      "message": "Título y contenido no pueden estar vacíos."
    }
    ```
  - **Error - Error del servidor (Código `500 Internal Server Error`):**
    ```json
    {
      "status": "error",
      "message": "Error interno al guardar."
    }
    ```
