// animator.js - Versión mejorada para IAs
class Animator {
    constructor(config = null, canvas = null) {
        this.animations = new Map();
        this.currentAnimation = null;
        this.currentFrame = 0;
        this.isPlaying = false;
        this.loop = true;
        this.frameTime = 0;
        this.lastUpdate = 0;
        this.canvas = canvas;
        this.ctx = canvas ? canvas.getContext('2d') : null;
        this.spriteSheet = null;
        
        if (config) {
            this.init(config);
        }
    }

    // MÉTODO SINCRÓNICO para IAs (nuevo)
    init(config) {
        this.config = config;
        this._setupAnimations(config);
        return this;
    }

    // MÉTODO ASÍNCRONO original (mantener compatibilidad)
    static async load(jsonUrl, spriteSheetUrl = null) {
        const animator = new Animator();
        await animator._loadConfig(jsonUrl, spriteSheetUrl);
        return animator;
    }

    // Cargar desde JSON directamente (nuevo - para IAs)
    static fromJSON(jsonData, canvas = null) {
        const animator = new Animator();
        animator.config = jsonData;
        animator._setupAnimations(jsonData);
        if (canvas) animator.setCanvas(canvas);
        return animator;
    }

    async _loadConfig(jsonUrl, spriteSheetUrl) {
        const response = await fetch(jsonUrl);
        const config = await response.json();
        this.config = config;
        
        const sheetUrl = spriteSheetUrl || config.spriteSheet;
        if (sheetUrl) {
            await this._loadSpriteSheet(sheetUrl);
        }
        
        this._setupAnimations(config);
    }

    async _loadSpriteSheet(url) {
        return new Promise((resolve, reject) => {
            this.spriteSheet = new Image();
            this.spriteSheet.onload = resolve;
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

    setCanvas(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        return this;
    }

    play(animationName = null, loop = true) {
        const name = animationName || Object.keys(this.config.animations)[0];
        const animation = this.animations.get(name);
        
        if (!animation) {
            console.warn(`Animation "${name}" not found`);
            return;
        }

        this.currentAnimation = name;
        this.currentFrame = 0;
        this.isPlaying = true;
        this.loop = loop;
        this.frameTime = animation.frameTime;
        this.lastUpdate = performance.now();

        this._animate();
    }

    // ... (resto de métodos igual)
    _animate() {
        if (!this.isPlaying || !this.ctx) return;

        const now = performance.now();
        const delta = now - this.lastUpdate;
        const animation = this.animations.get(this.currentAnimation);

        if (delta >= this.frameTime) {
            this.currentFrame++;
            if (this.currentFrame >= animation.frames) {
                this.currentFrame = this.loop ? 0 : animation.frames - 1;
                if (!this.loop) this.isPlaying = false;
            }
            this._drawFrame();
            this.lastUpdate = now;
        }
        requestAnimationFrame(() => this._animate());
    }

    _drawFrame() {
        if (!this.ctx || !this.spriteSheet) return;

        const animation = this.animations.get(this.currentAnimation);
        const cols = Math.floor(this.spriteSheet.width / animation.width);
        const col = this.currentFrame % cols;
        const row = Math.floor(this.currentFrame / cols);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.spriteSheet,
            col * animation.width, row * animation.height,
            animation.width, animation.height,
            0, 0, animation.width, animation.height
        );
    }

    pause() { this.isPlaying = false; }
    stop() { this.isPlaying = false; this.currentFrame = 0; this._drawFrame(); }
}

window.Animator = Animator;
