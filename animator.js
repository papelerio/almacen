// animator.js - Versión corregida
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
        this.spriteSheetLoaded = false;
    }

    static async load(jsonUrl, spriteSheetUrl = null) {
        const animator = new Animator();
        await animator._loadConfig(jsonUrl, spriteSheetUrl);
        return animator;
    }

    async _loadConfig(jsonUrl, spriteSheetUrl) {
        try {
            console.log('📥 Cargando JSON...', jsonUrl);
            const response = await fetch(jsonUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const config = await response.json();
            console.log('✅ JSON cargado:', config);
            
            // Usar la URL del spritesheet del JSON o la proporcionada
            const sheetUrl = spriteSheetUrl || config.spriteSheet;
            if (!sheetUrl) throw new Error('No se encontró URL del spritesheet');
            
            console.log('🖼️ Cargando spritesheet...', sheetUrl);
            await this._loadSpriteSheet(sheetUrl);
            
            this._setupAnimations(config);
            console.log('🎬 Animator configurado correctamente');
            
        } catch (error) {
            console.error('❌ Error en _loadConfig:', error);
            throw error;
        }
    }

    async _loadSpriteSheet(url) {
        return new Promise((resolve, reject) => {
            this.spriteSheet = new Image();
            this.spriteSheet.crossOrigin = "anonymous"; // Important para imágenes externas
            
            this.spriteSheet.onload = () => {
                console.log('✅ Spritesheet cargado:', this.spriteSheet.width, 'x', this.spriteSheet.height);
                this.spriteSheetLoaded = true;
                resolve();
            };
            
            this.spriteSheet.onerror = (err) => {
                console.error('❌ Error cargando spritesheet:', err);
                reject(new Error(`No se pudo cargar el spritesheet: ${url}`));
            };
            
            this.spriteSheet.src = url;
        });
    }

    _setupAnimations(config) {
        this.animations.clear();
        this.config = config;
        
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

    setCanvas(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        
        // Ajustar tamaño del canvas al tamaño del frame
        const firstAnim = this.animations.values().next().value;
        if (firstAnim) {
            this.canvas.width = firstAnim.width;
            this.canvas.height = firstAnim.height;
        }
        
        return this;
    }

    play(animationName = null, loop = true) {
        if (!this.spriteSheetLoaded) {
            console.warn('⚠️ Spritesheet no cargado aún');
            return;
        }

        const name = animationName || Object.keys(this.config.animations)[0];
        const animation = this.animations.get(name);
        
        if (!animation) {
            console.warn(`❌ Animación "${name}" no encontrada`);
            return;
        }

        this.currentAnimation = name;
        this.currentFrame = 0;
        this.isPlaying = true;
        this.loop = loop;
        this.frameTime = animation.frameTime;
        this.lastUpdate = performance.now();

        console.log('▶️ Reproduciendo animación:', name);
        this._animate();
    }

    _animate() {
        if (!this.isPlaying || !this.ctx || !this.spriteSheetLoaded) return;

        const now = performance.now();
        const delta = now - this.lastUpdate;
        const animation = this.animations.get(this.currentAnimation);

        if (delta >= animation.frameTime) {
            this.currentFrame++;
            
            if (this.currentFrame >= animation.frames) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = animation.frames - 1;
                    this.isPlaying = false;
                    console.log('⏹️ Animación terminada');
                }
            }

            this._drawFrame();
            this.lastUpdate = now;
        }

        requestAnimationFrame(() => this._animate());
    }

    _drawFrame() {
        if (!this.ctx || !this.spriteSheet) return;

        const animation = this.animations.get(this.currentAnimation);
        
        // Calcular posición en el spritesheet
        const cols = Math.floor(this.spriteSheet.width / animation.width);
        const col = this.currentFrame % cols;
        const row = Math.floor(this.currentFrame / cols);
        
        const sx = col * animation.width;
        const sy = row * animation.height;

        // Limpiar y dibujar
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy, animation.width, animation.height,
            0, 0, animation.width, animation.height
        );
    }

    pause() {
        this.isPlaying = false;
        console.log('⏸️ Animación pausada');
    }

    stop() {
        this.isPlaying = false;
        this.currentFrame = 0;
        this._drawFrame();
        console.log('⏹️ Animación detenida');
    }

    onFrameChange(callback) {
        this.onFrameChangeCallback = callback;
        return this;
    }

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

    getAnimationNames() {
        return Array.from(this.animations.keys());
    }
}

window.Animator = Animator;
