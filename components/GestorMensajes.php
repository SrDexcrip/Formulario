<?php

// Se elimina el require_once y la dependencia del archivo de configuración.

class GestorMensajes {
    private $titulo;
    private $contenido;
    private $supabase_url;
    private $supabase_key;

    // El constructor ahora también recibe las credenciales.
    public function __construct($titulo, $contenido, $supabase_url, $supabase_key) {
        $this->titulo = $titulo;
        $this->contenido = $contenido;
        $this->supabase_url = $supabase_url;
        $this->supabase_key = $supabase_key;
    }

    public function guardar() {
        // La clase ya no usa variables globales, sino sus propias propiedades.
        $url = "{$this->supabase_url}/rest/v1/mensajes"; 

        $data = [
            'titulo' => $this->titulo,
            'contenido' => $this->contenido
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: {$this->supabase_key}",
            "Authorization: Bearer {$this->supabase_key}",
            "Content-Type: application/json",
            "Prefer: return=minimal"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return $httpcode === 201; // 201 Created
    }

    // El método estático ahora debe recibir las credenciales como argumentos.
    public static function obtenerTodos($supabase_url, $supabase_key) {
        $url = "{$supabase_url}/rest/v1/mensajes?select=*&order=created_at.desc";

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: {$supabase_key}",
            "Authorization: Bearer {$supabase_key}"
        ]);

        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpcode === 200) {
            return json_decode($response, true);
        } else {
            return [];
        }
    }
}

?>