<?php
require_once 'components/GestorMensajes.php';
require_once 'supabase_config.php'; // Incluir la configuración de Supabase

// Pasar las credenciales a la función para obtener los mensajes
$mensajes = GestorMensajes::obtenerTodos($supabase_url, $supabase_key);
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Libro de Visitas</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <div class="container">
        <header class="site-header">
            <h1>Libro de Visitas</h1>
            <p>Deja tu mensaje y conéctate. Los mensajes se guardan en Supabase vía PHP.</p>
            <a href="index.html" class="btn-back">Volver al Portafolio</a>
        </header>

        <article class="card" id="nuevo-mensaje-card">
            <div class="card-form">
                <form id="form-mensaje">
                    <h2>Nuevo Mensaje</h2>
                    <div class="form-group">
                        <label for="titulo">Título</label>
                        <input type="text" id="titulo" name="titulo" required>
                    </div>
                    <div class="form-group">
                        <label for="contenido">Mensaje</label>
                        <textarea id="contenido" name="contenido" rows="3" required></textarea>
                    </div>
                    <button type="submit" id="guardar-mensaje">Enviar Mensaje</button>
                </form>
                <div id="form-feedback"></div>
            </div>
        </article>

        <section class="messages-section">
            <h2>Mensajes Recientes</h2>
            <div id="mensajes-lista">
                <?php if (is_array($mensajes) && !empty($mensajes)): ?>
                    <?php foreach ($mensajes as $mensaje): ?>
                        <article class="mensaje">
                            <header>
                                <h2><?= htmlspecialchars($mensaje['titulo']) ?></h2>
                                <time datetime="<?= $mensaje['created_at'] ?>"><?= date('d/m/Y H:i', strtotime($mensaje['created_at'])) ?></time>
                            </header>
                            <p><?= htmlspecialchars($mensaje['contenido']) ?></p>
                        </article>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No hay mensajes todavía. ¡Sé el primero!</p>
                <?php endif; ?>
            </div>
        </section>
    </div>

    <script src="mensajes.js"></script>
</body>
</html>