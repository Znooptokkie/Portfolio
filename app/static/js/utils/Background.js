export class Starfield {
    constructor(canvasId, numStars = 50) {
        this.stars = [];
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawStars();
            requestAnimationFrame(this.draw);
        };
        const canvasEl = document.getElementById(canvasId);
        if (!canvasEl)
            throw new Error("Canvas not found");
        const context = canvasEl.getContext("2d");
        if (!context)
            throw new Error("2D context not supported");
        this.canvas = canvasEl;
        this.ctx = context;
        this.numStars = numStars;
        this.initStars();
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
        this.draw();
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    initStars() {
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.8 + 0.2
            });
        }
    }
    drawStars() {
        for (let star of this.stars) {
            star.x += star.speedX;
            star.y += star.speedY;
            if (star.x < 0)
                star.x = this.canvas.width;
            if (star.x > this.canvas.width)
                star.x = 0;
            if (star.y < 0)
                star.y = this.canvas.height;
            if (star.y > this.canvas.height)
                star.y = 0;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(46, 204, 113, ${star.alpha})`;
            this.ctx.shadowColor = "rgba(46, 204, 113, 0.8)";
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
        }
    }
}
