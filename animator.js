// animator.js - Sistema universal de animación para spritesheets
// Uso: Cargar este script y luego llamar a Animator.load(jsonUrl, spriteSheetUrl)

class Animator {
    constructor() {
        this.animations = new Map();
        this.currentAnimation = null;
        this.currentFrame = 0;
        this.isPlaying = false;
        this.loop = true;
        this.frameTime = 0;
        this.lastUpdate = 0;
        this.canvas = null;
        this.ctx = null;
        this.spriteSheet = null;
        this.onLoadCallback = null;
        this.onFrameChangeCallback = null;
    }

    // Cargar configuración JSON y spritesheet
    static async load(jsonUrl, spriteSheetUrl = null) {
        const animator = new Animator();
        await animator._loadConfig(jsonUrl, spriteSheetUrl);
        return animator;
    }

    async _loadConfig(jsonUrl, spriteSheetUrl) {
        try {
            // Cargar JSON de configuración
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const config = await response.json();
            this.config = config;
            
            // Determinar URL del spritesheet
            const sheetUrl = spriteSheetUrl || config.spriteSheet;
            if (!sheetUrl) throw new Error('No se proporcionó URL del spritesheet');
            
            // Cargar spritesheet
            await this._loadSpriteSheet(sheetUrl);
            
            // Configurar animaciones
            this._setupAnimations(config);
            
            if (this.onLoadCallback) this.onLoadCallback(this);
            
        } catch (error) {
            console.error('Error loading animation:', error);
            throw error;
        }
    }

    async _loadSpriteSheet(url) {
        return new Promise((resolve, reject) => {
            this.spriteSheet = new Image();
            this.spriteSheet.onload = () => resolve(this.spriteSheet);
            this.spriteSheet.onerror = reject;
            this.spriteSheet.src = url;
        });
    }

    _setupAnimations(config) {
        this.animations.clear();
        
        for (const [name, animConfig] of Object.entries(config.animations)) {
            this.animations.set(name, {
                frames: animConfig.frames,
                width: animConfig.width,
                height: animConfig.height,
                speed: animConfig.speed || 0.2,
                loop: animConfig.loop !== false,
                frameTime: (animConfig.speed || 0.2) * 1000
            });
        }
    }

    // Configurar canvas donde se dibujará la animación
    setCanvas(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        return this;
    }

    // Reproducir una animación específica
    play(animationName, loop = true) {
        const animation = this.animations.get(animationName);
        if (!animation) {
            console.warn(`Animation "${animationName}" not found`);
            return;
        }

        this.currentAnimation = animationName;
        this.currentFrame = 0;
        this.isPlaying = true;
        this.loop = loop;
        this.frameTime = animation.frameTime;
        this.lastUpdate = performance.now();

        this._animate();
    }

    // Pausar animación
    pause() {
        this.isPlaying = false;
    }

    // Detener animación (reinicia al frame 0)
    stop() {
        this.isPlaying = false;
        this.currentFrame = 0;
        this._drawFrame();
    }

    // Ir a un frame específico
    gotoFrame(frameIndex) {
        const animation = this.animations.get(this.currentAnimation);
        if (!animation) return;

        this.currentFrame = Math.max(0, Math.min(frameIndex, animation.frames - 1));
        this._drawFrame();
    }

    // Bucle de animación
    _animate() {
        if (!this.isPlaying || !this.ctx || !this.spriteSheet) return;

        const now = performance.now();
        const delta = now - this.lastUpdate;
        const animation = this.animations.get(this.currentAnimation);

        if (delta >= this.frameTime) {
            this.currentFrame++;
            
            if (this.currentFrame >= animation.frames) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = animation.frames - 1;
                    this.isPlaying = false;
                }
            }

            this._drawFrame();
            this.lastUpdate = now;

            if (this.onFrameChangeCallback) {
                this.onFrameChangeCallback(this.currentFrame, animation.frames);
            }
        }

        requestAnimationFrame(() => this._animate());
    }

    // Dibujar frame actual
    _drawFrame() {
        if (!this.ctx || !this.spriteSheet || !this.currentAnimation) return;

        const animation = this.animations.get(this.currentAnimation);
        const cols = Math.floor(this.spriteSheet.width / animation.width);
        
        const col = this.currentFrame % cols;
        const row = Math.floor(this.currentFrame / cols);
        
        const sx = col * animation.width;
        const sy = row * animation.height;

        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar frame
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy, animation.width, animation.height,
            0, 0, animation.width, animation.height
        );
    }

    // Callbacks
    onLoad(callback) {
        this.onLoadCallback = callback;
        return this;
    }

    onFrameChange(callback) {
        this.onFrameChangeCallback = callback;
        return this;
    }

    // Información de la animación actual
    getCurrentAnimation() {
        return this.currentAnimation;
    }

    getCurrentFrame() {
        return this.currentFrame;
    }

    getTotalFrames() {
        const animation = this.animations.get(this.currentAnimation);
        return animation ? animation.frames : 0;
    }

    // Lista de animaciones disponibles
    getAnimationNames() {
        return Array.from(this.animations.keys());
    }
}

// Hacerlo globalmente accesible
window.Animator = Animator;
