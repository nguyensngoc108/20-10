class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.reset();
    }

    reset() {
        // Random position and velocity
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height;
        this.velY = -(Math.random() * 5 + 9); // Increased velocity for higher fireworks
        this.velX = Math.random() * 3 - 1.5; // Slightly wider horizontal spread
        this.gravity = 0.08; // Slightly increased gravity for a faster fall

        // Random color (garish bright colors)
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        this.size = Math.random() * 3 + 2; // Larger firework size
        this.shrink = 0.98; // Reduced shrink for longer-lasting fireworks
        this.resistance = 0.98;
        this.explodeSize = Math.random() * 20 + 40; // Larger explosion size
        this.exploded = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        if (!this.exploded) {
            // Apply velocity
            this.velY += this.gravity;
            this.x += this.velX;
            this.y += this.velY;

            // Shrink firework over time
            this.size *= this.shrink;

            // Resistance
            this.velX *= this.resistance;
            this.velY *= this.resistance;

            // Explode when it slows down enough
            if (this.velY >= -0.5) {
                this.explode();
            }
        }

        // Keep fireworks within bounds
        if (this.y >= this.canvas.height) {
            this.reset();
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < this.explodeSize; i++) {
            particles.push(new Particle(this.x, this.y, this.color, this.canvas));
        }
    }
}

class Particle {
    constructor(x, y, color, canvas) {
        this.x = x;
        this.y = y;
        this.velX = (Math.random() * 3 - 1.5) * 3; // More spread in explosion
        this.velY = (Math.random() * 3 - 1.5) * 3;
        this.size = Math.random() * 3 + 2; // Larger particles
        this.gravity = 0.07;
        this.shrink = 0.96; // Slightly slower shrink rate
        this.alpha = 1;
        this.color = color;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.velY += this.gravity;
        this.size *= this.shrink;
        this.alpha -= 0.02; // Slower fade-out for particles
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.restore();
    }
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

// Increase the firework frequency and make them larger
function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create new fireworks more frequently
    if (Math.random() < 0.1) { // Increased probability of fireworks appearing
        fireworks.push(new Firework(canvas));
    }

    // Update and draw fireworks
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.exploded) {
            fireworks.splice(index, 1);
        }
    });

    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

// Start animation
animateFireworks();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
