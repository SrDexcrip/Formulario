<?php
require_once 'components/GestorMensajes.php';
require_once 'supabase_config.php'; // Incluir la configuración de Supabase

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $titulo = $input['titulo'] ?? '';
    $contenido = $input['contenido'] ?? '';

    if (!empty($titulo) && !empty($contenido)) {
        // Crear la instancia pasando TODOS los argumentos necesarios al constructor
        $gestor = new GestorMensajes($titulo, $contenido, $supabase_url, $supabase_key);
        
        // Llamar al método guardar
        if ($gestor->guardar()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el mensaje en Supabase.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Título y contenido son obligatorios.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>