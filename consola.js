<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reproductor de Menú Principal</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: white;
            transition: all 0.3s;
        }
        
        .container {
            width: 100%;
            max-width: 800px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            margin-bottom: 20px;
            transition: all 0.3s;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #ffcc00;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
            transition: all 0.3s;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            font-size: 18px;
        }
        
        .menu-container {
            position: relative;
            width: 100%;
            height: 450px;
            background-color: #000;
            border-radius: 10px;
            overflow: hidden;
            margin: 0 auto;
            border: 3px solid #444;
            transition: all 0.3s;
        }
        
        .menu-element {
            position: absolute;
            transition: transform 0.3s;
        }
        
        .logo {
            animation: float 3s ease-in-out infinite;
        }
        
        .boton {
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .boton:hover {
            transform: scale(1.05);
            filter: brightness(1.2);
        }
        
        .boton:active {
            transform: scale(0.95);
            filter: brightness(0.8);
        }
        
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            flex-wrap: wrap;
            transition: all 0.3s;
        }
        
        button {
            background: linear-gradient(to bottom, #4a6fc9, #2a4ba0);
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
            background: linear-gradient(to bottom, #5a7fd9, #3a5bc0);
        }
        
        button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .screen-green {
            background-color: #00aa00 !important;
            transition: background-color 1s;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        @media (max-width: 600px) {
            .menu-container {
                height: 300px;
            }
            
            h1 {
                font-size: 1.5rem;
            }
        }
        
        /* Estilos para pantalla completa */
        body.fullscreen {
            padding: 0;
            background: #000;
            justify-content: flex-start;
        }
        
        body.fullscreen .container {
            max-width: 100%;
            width: 100%;
            height: 100vh;
            border-radius: 0;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            background: #000;
        }
        
        body.fullscreen .menu-container {
            flex: 1;
            height: 100%;
            border-radius: 0;
            border: none;
        }
        
        body.fullscreen h1,
        body.fullscreen .controls {
            display: none;
        }
        
        /* Botón para salir de pantalla completa (solo visible en modo pantalla completa) */
        .exit-fullscreen {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            cursor: pointer;
            z-index: 1000;
            display: none;
            font-size: 16px;
        }
        
        body.fullscreen .exit-fullscreen {
            display: block;
        }
        
        .exit-fullscreen:hover {
            background: rgba(0, 0, 0, 0.9);
        }
        
        .error-message {
            color: #ff6b6b;
            text-align: center;
            padding: 20px;
            background: rgba(255, 0, 0, 0.1);
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <button class="exit-fullscreen" id="exitFullscreenBtn">Salir Pantalla Completa</button>
    
    <div class="container">
        <h1>Reproductor de Menú Principal</h1>
        
        <div class="menu-container" id="menuContainer">
            <div class="loading" id="loadingMessage">Cargando menú desde GitHub...</div>
        </div>
        
        <div class="controls">
            <button id="resetBtn">Reiniciar</button>
            <button id="fullscreenBtn">Pantalla Completa</button>
        </div>
    </div>

    <script>
        // URL del JSON en GitHub
        const JSON_URL = 'https://raw.githubusercontent.com/papelerio/almacen/refs/heads/main/menuprincipal.json';
        
        // Variable global para almacenar los datos del menú
        let menuData = null;

        // Referencias a elementos DOM
        const menuContainer = document.getElementById('menuContainer');
        const resetBtn = document.getElementById('resetBtn');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
        const loadingMessage = document.getElementById('loadingMessage');

        // Función para cargar el JSON desde GitHub
        async function loadJSONFromGitHub() {
            try {
                loadingMessage.textContent = 'Cargando menú desde GitHub...';
                
                const response = await fetch(JSON_URL);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                menuData = await response.json();
                loadingMessage.style.display = 'none';
                loadMenu();
                
            } catch (error) {
                console.error('Error al cargar el JSON:', error);
                loadingMessage.innerHTML = `
                    <div class="error-message">
                        <strong>Error al cargar el menú</strong><br>
                        No se pudo cargar el archivo JSON desde GitHub.<br>
                        <button onclick="loadJSONFromGitHub()" style="margin-top: 10px;">Reintentar</button>
                    </div>
                `;
            }
        }

        // Función para cargar y mostrar el menú
        function loadMenu() {
            if (!menuData || !menuData.cuadros) {
                console.error('Datos del menú no disponibles');
                return;
            }
            
            // Limpiar contenedor
            menuContainer.innerHTML = '';
            menuContainer.classList.remove('screen-green');
            
            // Crear elementos del menú
            menuData.cuadros.forEach(cuadro => {
                const element = document.createElement('div');
                element.className = 'menu-element';
                
                // Establecer posición y tamaño basado en porcentajes
                element.style.left = cuadro.x + '%';
                element.style.top = cuadro.y + '%';
                element.style.width = cuadro.ancho + '%';
                element.style.height = cuadro.alto + '%';
                
                // Crear imagen
                const img = document.createElement('img');
                img.src = cuadro.url;
                img.alt = cuadro.nombre;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                
                // Manejar errores de carga de imagen
                img.onerror = function() {
                    console.error(`Error al cargar imagen: ${cuadro.url}`);
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5FcnJvciBjYXJnYW5kbyBpbWFnZW48L3RleHQ+PC9zdmc+';
                };
                
                element.appendChild(img);
                
                // Aplicar clases según el nombre
                if (cuadro.nombre === 'fondo') {
                    // Los fondos son estáticos, no necesitan clase adicional
                } else if (cuadro.nombre.startsWith('boton.')) {
                    element.classList.add('boton');
                    
                    // Agregar evento de clic para botones
                    element.addEventListener('click', function() {
                        if (cuadro.nombre === 'boton.start') {
                            // Transformar la pantalla en verde
                            menuContainer.classList.add('screen-green');
                            
                            // Mostrar mensaje
                            setTimeout(() => {
                                alert('¡Botón Start presionado! Pantalla transformada a verde.');
                            }, 500);
                        } else {
                            // Efecto para otros botones
                            this.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                this.style.transform = 'scale(1)';
                            }, 200);
                            
                            alert(`Botón ${cuadro.nombre} presionado`);
                        }
                    });
                } else if (cuadro.nombre === 'logo') {
                    element.classList.add('logo');
                }
                
                menuContainer.appendChild(element);
            });
        }

        // Función para entrar en pantalla completa
        function enterFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
                });
                document.body.classList.add('fullscreen');
            }
        }

        // Función para salir de pantalla completa
        function exitFullscreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            document.body.classList.remove('fullscreen');
        }

        // Event listeners
        resetBtn.addEventListener('click', loadMenu);
        fullscreenBtn.addEventListener('click', enterFullscreen);
        exitFullscreenBtn.addEventListener('click', exitFullscreen);

        // Detectar cambios en el modo de pantalla completa
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                document.body.classList.remove('fullscreen');
            }
        });

        // Cargar el JSON al iniciar
        window.addEventListener('DOMContentLoaded', loadJSONFromGitHub);
    </script>
</body>
</html>
