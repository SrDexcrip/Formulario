

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mensajes</title>
 
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header class="site-header">
        <h1>Mensajes Guardados</h1>
        <a href="index.html">Volver a la galerÃ­a</a>
      </header>
      
      <main>
        <?php

        require_once 'components/GestorMensajes.php';

        $mensajes = GestorMensajes::obtenerTodos();

        if (!empty($mensajes)) {
            foreach ($mensajes as $mensaje) {
                echo "<article class='mensaje'>";
                echo "<header>";
                echo "<h2>" . htmlspecialchars($mensaje['titulo']) . "</h2>";
                echo "<time datetime='" . $mensaje['created_at'] . "'>" . date('d/m/Y H:i', strtotime($mensaje['created_at'])) . "</time>";
                echo "</header>";
                echo "<p>" . htmlspecialchars($mensaje['contenido']) . "</p>";
                echo "</article>";
            }
        } else {
            echo "<p>No hay mensajes para mostrar.</p>";
        }

        ?>
      </main>

      <footer>
        <p>Fin de los mensajes.</p>
      </footer>
    </div>
  </body>
</html>

