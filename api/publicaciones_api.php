<?php
// Define el tipo de contenido como JSON para todas las respuestas
header('Content-Type: application/json');

require_once 'Publicacion.php';
require_once 'BaseDatos.php';

// Inicializa la conexión a la base de datos
$baseDatos = BaseDatos::obtenerInstancia();
$publicacion = new Publicacion($baseDatos);

// Determina el método de la solicitud (GET, POST, PUT, DELETE)
$metodo = $_SERVER['REQUEST_METHOD'];

// Gestiona la solicitud según el método
switch ($metodo) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Obtener una sola publicación por su ID
            $resultado = $publicacion->obtenerPorId($_GET['id']);
        } else {
            // Obtener todas las publicaciones
            $resultado = $publicacion->obtenerTodos(); // <-- CORREGIDO
        }
        echo json_encode($resultado);
        break;

    case 'POST':
        // Crear una nueva publicación
        $datos = json_decode(file_get_contents('php://input'), true);
        if ($publicacion->crear($datos['titulo'], $datos['contenido'])) {
            http_response_code(201); // Creado
            echo json_encode(['mensaje' => 'Publicación creada con éxito']);
        } else {
            http_response_code(400); // Solicitud incorrecta
            echo json_encode(['error' => 'No se pudo crear la publicación']);
        }
        break;

    case 'PUT':
        // Actualizar una publicación existente
        $id = $_GET['id'] ?? null;
        $datos = json_decode(file_get_contents('php://input'), true);

        if ($id && $publicacion->actualizar($id, $datos['titulo'], $datos['contenido'])) {
            http_response_code(200); // OK
            echo json_encode(['mensaje' => 'Publicación actualizada con éxito']);
        } else {
            http_response_code(400); // Solicitud incorrecta
            echo json_encode(['error' => 'No se pudo actualizar la publicación']);
        }
        break;

    case 'DELETE':
        // Eliminar una publicación
        $id = $_GET['id'] ?? null;
        if ($id && $publicacion->eliminar($id)) {
            http_response_code(200); // OK
            echo json_encode(['mensaje' => 'Publicación eliminada con éxito']);
        } else {
            http_response_code(400); // Solicitud incorrecta
            echo json_encode(['error' => 'No se pudo eliminar la publicación']);
        }
        break;

    default:
        http_response_code(405); // Método no permitido
        echo json_encode(['error' => 'Método no soportado']);
        break;
}
?>