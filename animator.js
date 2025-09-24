// animator.js - Librería ligera para animación de spritesheets
class SpriteAnimator {
    constructor(options = {}) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.spriteSheet = null;
        this.animations = {};
        this.currentAnimation = null;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.isPlaying = false;
        this.loop = true;
        
        // Configuración por defecto
        this.config = {
            scale: options.scale || 1,
            flipX: options.flipX || false,
            flipY: options.flipY || false,
            debug: options.debug || false
        };
    }

    // Cargar configuración desde JSON
    async loadFromJSON(jsonUrl, spriteSheetUrl = null) {
        try {
            const response = await fetch(jsonUrl);
            const config = await response.json();
            
            if (spriteSheetUrl) {
                config.spriteSheet = spriteSheetUrl;
            }
            
            return this.setup(config);
        } catch (error) {
            console.error('Error loading animation JSON:', error);
            throw error;
        }
    }

    // Configurar animaciones desde objeto JSON
    async setup(config) {
        this.configData = config;
        
        // Cargar spritesheet
        await this.loadSpriteSheet(config.spriteSheet);
        
        // Configurar animaciones
        this.animations = config.animations;
        
        // Establecer primera animación por defecto
        const firstAnim = Object.keys(this.animations)[0];
        if (firstAnim) {
            this.setAnimation(firstAnim);
        }
        
        return this;
    }

    // Cargar imagen del spritesheet
    loadSpriteSheet(url) {
        return new Promise((resolve, reject) => {
            this.spriteSheet = new Image();
            this.spriteSheet.onload = () => {
                console.log('Spritesheet loaded:', url);
                resolve();
            };
            this.spriteSheet.onerror = reject;
            this.spriteSheet.src = url;
        });
    }

    // Establecer animación actual
    setAnimation(name, loop = true) {
        if (this.animations[name]) {
            this.currentAnimation = name;
            this.currentFrame = 0;
            this.frameTimer = 0;
            this.loop = loop;
            this.isPlaying = true;
            return true;
        }
        console.warn(`Animation "${name}" not found`);
        return false;
    }

    // Reproducir animación
    play() {
        this.isPlaying = true;
    }

    // Pausar animación
    pause() {
        this.isPlaying = false;
    }

    // Detener animación (reinicia al frame 0)
    stop() {
        this.isPlaying = false;
        this.currentFrame = 0;
        this.frameTimer = 0;
    }

    // Actualizar lógica de animación
    update(deltaTime) {
        if (!this.isPlaying || !this.currentAnimation) return;

        const anim = this.animations[this.currentAnimation];
        this.frameTimer += deltaTime;

        if (this.frameTimer >= anim.speed) {
            this.frameTimer = 0;
            this.currentFrame++;

            if (this.currentFrame >= anim.frames) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = anim.frames - 1;
                    this.isPlaying = false;
                }
            }
        }
    }

    // Renderizar frame actual
    render(x, y) {
        if (!this.spriteSheet || !this.currentAnimation) return;

        const anim = this.animations[this.currentAnimation];
        const frameWidth = anim.width;
        const frameHeight = anim.height;
        
        // Calcular posición del frame en el spritesheet
        const cols = Math.floor(this.spriteSheet.width / frameWidth);
        const row = Math.floor(this.currentFrame / cols);
        const col = this.currentFrame % cols;
        
        const sx = col * frameWidth;
        const sy = row * frameHeight;
        
        // Configurar transformaciones
        this.ctx.save();
        
        // Posición
        let drawX = x;
        let drawY = y;
        
        // Escala
        const scaleX = this.config.flipX ? -this.config.scale : this.config.scale;
        const scaleY = this.config.flipY ? -this.config.scale : this.config.scale;
        
        if (this.config.flipX) drawX += frameWidth * this.config.scale;
        if (this.config.flipY) drawY += frameHeight * this.config.scale;
        
        this.ctx.translate(drawX, drawY);
        this.ctx.scale(scaleX, scaleY);
        
        // Dibujar frame
        this.ctx.drawImage(
            this.spriteSheet,
            sx, sy, frameWidth, frameHeight,
            0, 0, frameWidth, frameHeight
        );
        
        this.ctx.restore();
        
        // Debug info
        if (this.config.debug) {
            this.drawDebugInfo(x, y, frameWidth, frameHeight);
        }
    }

    // Dibujar información de debug
    drawDebugInfo(x, y, width, height) {
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, width * this.config.scale, height * this.config.scale);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(
            `${this.currentAnimation} (${this.currentFrame + 1}/${this.animations[this.currentAnimation].frames})`,
            x, y - 5
        );
    }

    // Obtener lista de animaciones disponibles
    getAnimationList() {
        return Object.keys(this.animations);
    }

    // Obtener información de la animación actual
    getCurrentAnimationInfo() {
        if (!this.currentAnimation) return null;
        
        return {
            name: this.currentAnimation,
            currentFrame: this.currentFrame,
            totalFrames: this.animations[this.currentAnimation].frames,
            speed: this.animations[this.currentAnimation].speed,
            isPlaying: this.isPlaying
        };
    }
}

// Versión simplificada para uso rápido
class QuickAnimator {
    static async create(canvas, jsonUrl, spriteSheetUrl = null) {
        const animator = new SpriteAnimator({ canvas });
        await animator.loadFromJSON(jsonUrl, spriteSheetUrl);
        return animator;
    }
}

// Hacer disponible globalmente
window.SpriteAnimator = SpriteAnimator;
window.QuickAnimator = QuickAnimator;
