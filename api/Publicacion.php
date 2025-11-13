<?php
require_once 'BaseDatos.php';

class Publicacion {
    private $db;
    private $tableName = 'publicaciones';

    public function __construct($db) { // <-- Corregido: recibe la instancia de la BD
        $this->db = $db;
    }

    // Método para obtener todas las publicaciones
    public function obtenerTodos() {
        $url = $this->db->getUrl() . '/rest/v1/' . $this->tableName . '?select=*';
        $resultado = $this->db->ejecutarCurl($url);
        if ($resultado['httpcode'] === 200) {
            return json_decode($resultado['response'], true);
        } else {
            return ['error' => 'Error al leer las publicaciones', 'httpcode' => $resultado['httpcode']];
        }
    }

    // Método para obtener una publicación por su ID
    public function obtenerPorId($id) {
        $url = $this->db->getUrl() . '/rest/v1/' . $this->tableName . '?id=eq.' . $id . '&select=*';
        $resultado = $this->db->ejecutarCurl($url);
        if ($resultado['httpcode'] === 200) {
            return json_decode($resultado['response'], true);
        } else {
            return ['error' => 'Error al leer la publicación', 'httpcode' => $resultado['httpcode']];
        }
    }

    // Método para crear una nueva publicación
    public function crear($titulo, $contenido) { // <-- Corregido: acepta argumentos separados
        $datos = ['titulo' => $titulo, 'contenido' => $contenido];
        $url = $this->db->getUrl() . '/rest/v1/' . $this->tableName;
        $resultado = $this->db->ejecutarCurl($url, 'POST', $datos);
        return $resultado['httpcode'] === 201;
    }

    // Método para actualizar una publicación
    public function actualizar($id, $titulo, $contenido) { // <-- Corregido: acepta argumentos separados
        $datos = ['titulo' => $titulo, 'contenido' => $contenido];
        $url = $this->db->getUrl() . '/rest/v1/' . $this->tableName . '?id=eq.' . $id;
        $resultado = $this->db->ejecutarCurl($url, 'PATCH', $datos);
        return $resultado['httpcode'] === 204; 
    }

    // Método para eliminar una publicación
    public function eliminar($id) {
        $url = $this->db->getUrl() . '/rest/v1/' . $this->tableName . '?id=eq.' . $id;
        $resultado = $this->db->ejecutarCurl($url, 'DELETE');
        return $resultado['httpcode'] === 204;
    }
}
?>