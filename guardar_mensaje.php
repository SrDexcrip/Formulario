<?php
// Incluir la configuración de Supabase y la clase GestorMensajes
require_once 'supabase_config.php';
require_once 'components/GestorMensajes.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos = json_decode(file_get_contents('php://input'), true);

    if (isset($datos['titulo']) && isset($datos['contenido'])) {
        // Pasar las credenciales al constructor de la clase.
        $mensaje = new GestorMensajes($datos['titulo'], $datos['contenido'], $supabase_url, $supabase_key);

        if ($mensaje->guardar()) {
            echo json_encode(['status' => 'success', 'message' => 'Mensaje guardado correctamente.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el mensaje en la base de datos.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos (título o contenido).']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>