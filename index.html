<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Menús Núcleo</title>
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
            position: relative;
            overflow: hidden;
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
            position: relative;
            z-index: 10;
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
        
        .menu-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .menu-layer.active {
            pointer-events: auto;
        }
        
        .menu-element {
            position: absolute;
            transition: transform 0.3s;
            overflow: hidden;
            pointer-events: auto;
        }
        
        .menu-element img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            display: block;
        }
        
        /* Tags MINI para elementos dentro de los menús */
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
        
        .fondo {
            /* Los fondos son estáticos por defecto */
        }
        
        /* Tags NUCLEO para capas completas */
        .flash-layer {
            animation: flashIn 0.5s ease-out;
        }
        
        .interfaz-layer {
            z-index: 100;
            pointer-events: auto;
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
        
        /* Animaciones para tags NUCLEO */
        @keyframes flashIn {
            0% {
                background-color: white;
            }
            100% {
                background-color: transparent;
            }
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
        
        /* Ocultar elementos en pantalla completa */
        body.fullscreen h1,
        body.fullscreen .controls {
            display: none;
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
    <div class="container">
        <h1>Sistema de Menús Núcleo</h1>
        
        <div class="menu-container" id="menuContainer">
            <div class="loading" id="loadingMessage">Cargando núcleo desde GitHub...</div>
        </div>
        
        <div class="controls">
            <button id="fullscreenBtn">Pantalla Completa</button>
        </div>
    </div>

    <script>
        // URLs
        const NUCLEO_URL = 'https://raw.githubusercontent.com/papelerio/almacen/refs/heads/main/nucleo-menus.json';
        
        // Variables globales
        let nucleoData = null;
        let menusCargados = {};
        let capasActivas = [];
        let indiceMenuActual = 0;
        let currentImageMode = 'fill';

        // Referencias a elementos DOM
        const menuContainer = document.getElementById('menuContainer');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const loadingMessage = document.getElementById('loadingMessage');

        // Función para cargar el JSON núcleo desde GitHub
        async function cargarNucleo() {
            try {
                loadingMessage.textContent = 'Cargando núcleo desde GitHub...';
                
                const response = await fetch(NUCLEO_URL);
                
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                nucleoData = await response.json();
                
                // Ordenar menús por el campo "orden"
                nucleoData.sort((a, b) => a.orden - b.orden);
                
                // Buscar el primer menú con ORDEN 1 (no 0)
                const primerMenuIndex = nucleoData.findIndex(menu => menu.orden === 1);
                
                if (primerMenuIndex !== -1) {
                    await cargarMenuPorIndice(primerMenuIndex);
                } else {
                    // Si no hay menú con orden 1, buscar el primero con orden > 0
                    const primerMenuValidoIndex = nucleoData.findIndex(menu => menu.orden > 0);
                    if (primerMenuValidoIndex !== -1) {
                        await cargarMenuPorIndice(primerMenuValidoIndex);
                    } else {
                        throw new Error('No se encontraron menús con orden mayor a 0');
                    }
                }
                
                loadingMessage.style.display = 'none';
                
            } catch (error) {
                console.error('Error al cargar el núcleo:', error);
                loadingMessage.innerHTML = `
                    <div class="error-message">
                        <strong>Error al cargar el núcleo</strong><br>
                        No se pudo cargar el archivo JSON núcleo desde GitHub.<br>
                        <button onclick="cargarNucleo()" style="margin-top: 10px;">Reintentar</button>
                    </div>
                `;
            }
        }

        // Función para cargar un menú específico por índice
        async function cargarMenuPorIndice(index) {
            if (!nucleoData || index >= nucleoData.length) {
                console.error('Índice de menú inválido');
                return;
            }
            
            const menuInfo = nucleoData[index];
            indiceMenuActual = index;
            
            // Si el menú ya está cargado, reutilizarlo
            if (menusCargados[menuInfo.url]) {
                mostrarMenu(menuInfo, menusCargados[menuInfo.url]);
            } else {
                // Cargar el menú desde la URL
                try {
                    const response = await fetch(menuInfo.url);
                    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                    
                    const menuData = await response.json();
                    menusCargados[menuInfo.url] = menuData;
                    mostrarMenu(menuInfo, menuData);
                    
                } catch (error) {
                    console.error(`Error al cargar el menú ${menuInfo.nombre}:`, error);
                }
            }
        }

        // Función para mostrar un menú en la capa correspondiente
        function mostrarMenu(menuInfo, menuData) {
            // Limpiar capas anteriores (excepto las de interfaz)
            capasActivas = capasActivas.filter(capa => {
                if (capa.classList.contains('interfaz-layer')) {
                    return true; // Mantener capas de interfaz
                }
                capa.remove();
                return false;
            });
            
            // Crear nueva capa para este menú
            const capa = document.createElement('div');
            capa.className = 'menu-layer active';
            
            // Aplicar tags NUCLEO
            if (menuInfo.tag === 'flash') {
                capa.classList.add('flash-layer');
            } else if (menuInfo.tag === 'interfaz') {
                capa.classList.add('interfaz-layer');
            }
            
            // Crear elementos del menú
            menuData.cuadros.forEach(cuadro => {
                const element = document.createElement('div');
                element.className = 'menu-element';
                
                // Establecer posición y tamaño
                element.style.left = cuadro.x + '%';
                element.style.top = cuadro.y + '%';
                element.style.width = cuadro.ancho + '%';
                element.style.height = cuadro.alto + '%';
                
                // Crear imagen
                const img = document.createElement('img');
                img.src = cuadro.url;
                img.alt = cuadro.nombre;
                img.style.objectFit = currentImageMode;
                
                // Manejar errores de imagen
                img.onerror = function() {
                    console.error(`Error al cargar imagen: ${cuadro.url}`);
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5FcnJvciBjYXJnYW5kbyBpbWFnZW48L3RleHQ+PC9zdmc+';
                };
                
                element.appendChild(img);
                
                // Aplicar tags MINI según el nombre
                if (cuadro.nombre === 'fondo') {
                    element.classList.add('fondo');
                } else if (cuadro.nombre.startsWith('boton.')) {
                    element.classList.add('boton');
                    
                    // Agregar funcionalidad a los botones
                    element.addEventListener('click', function() {
                        if (cuadro.nombre === 'boton.start') {
                            // Desplegar menú "controles"
                            cargarMenuInterfaz('controles');
                        } else {
                            // Efecto para otros botones
                            this.style.transform = 'scale(0.9)';
                            setTimeout(() => {
                                this.style.transform = 'scale(1)';
                            }, 200);
                        }
                    });
                } else if (cuadro.nombre === 'logo') {
                    element.classList.add('logo');
                }
                
                capa.appendChild(element);
            });
            
            menuContainer.appendChild(capa);
            capasActivas.push(capa);
        }

        // Función para cargar un menú de interfaz por nombre
        async function cargarMenuInterfaz(nombreMenu) {
            const menuInfo = nucleoData.find(menu => menu.nombre === nombreMenu && menu.orden === 0);
            if (!menuInfo) {
                console.error(`Menú de interfaz "${nombreMenu}" no encontrado`);
                return;
            }
            
            // Verificar si ya está cargado
            if (menusCargados[menuInfo.url]) {
                mostrarMenuInterfaz(menuInfo, menusCargados[menuInfo.url]);
            } else {
                try {
                    const response = await fetch(menuInfo.url);
                    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                    
                    const menuData = await response.json();
                    menusCargados[menuInfo.url] = menuData;
                    mostrarMenuInterfaz(menuInfo, menuData);
                    
                } catch (error) {
                    console.error(`Error al cargar menú de interfaz ${menuInfo.nombre}:`, error);
                }
            }
        }

        // Función para mostrar un menú de interfaz (superpuesto)
        function mostrarMenuInterfaz(menuInfo, menuData) {
            // Verificar si ya existe una capa de este menú
            const capaExistente = document.querySelector(`.interfaz-layer[data-menu="${menuInfo.nombre}"]`);
            if (capaExistente) {
                capaExistente.remove();
                return;
            }
            
            const capa = document.createElement('div');
            capa.className = 'menu-layer active interfaz-layer';
            capa.dataset.menu = menuInfo.nombre;
            
            // Crear elementos del menú
            menuData.cuadros.forEach(cuadro => {
                const element = document.createElement('div');
                element.className = 'menu-element';
                
                element.style.left = cuadro.x + '%';
                element.style.top = cuadro.y + '%';
                element.style.width = cuadro.ancho + '%';
                element.style.height = cuadro.alto + '%';
                
                const img = document.createElement('img');
                img.src = cuadro.url;
                img.alt = cuadro.nombre;
                img.style.objectFit = currentImageMode;
                
                img.onerror = function() {
                    console.error(`Error al cargar imagen: ${cuadro.url}`);
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5FcnJvciBjYXJnYW5kbyBpbWFnZW48L3RleHQ+PC9zdmc+';
                };
                
                element.appendChild(img);
                
                // Aplicar tags MINI
                if (cuadro.nombre === 'fondo') {
                    element.classList.add('fondo');
                } else if (cuadro.nombre.startsWith('boton.')) {
                    element.classList.add('boton');
                    
                    element.addEventListener('click', function() {
                        this.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            this.style.transform = 'scale(1)';
                        }, 200);
                    });
                } else if (cuadro.nombre === 'logo') {
                    element.classList.add('logo');
                }
                
                capa.appendChild(element);
            });
            
            menuContainer.appendChild(capa);
            capasActivas.push(capa);
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

        // Event listeners
        fullscreenBtn.addEventListener('click', enterFullscreen);

        // Detectar cambios en el modo de pantalla completa
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                document.body.classList.remove('fullscreen');
            }
        });

        // Cargar el núcleo al iniciar
        window.addEventListener('DOMContentLoaded', cargarNucleo);
    </script>
</body>
</html>
