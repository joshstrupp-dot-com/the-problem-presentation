class PhysicsBall {
  constructor() {
    this.canvas = document.getElementById("physics-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.words = document.querySelectorAll(".ladder-step");

    // Set canvas size
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Physics parameters
    this.gravity = 0.5;
    this.friction = 0.99;
    this.restitution = 0.7;

    // Ball properties
    this.ball = {
      x: window.innerWidth * 0.3,
      y: -20,
      radius: 10,
      vx: 2,
      vy: 0,
      rotation: 0,
    };

    // Convert word positions to physics platforms
    this.platforms = this.getWordPlatforms();

    // Start animation
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.platforms = this.getWordPlatforms();
  }

  getWordPlatforms() {
    return Array.from(this.words).map((word) => {
      const rect = word.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        angle: 15 * (Math.PI / 180), // Slight upward angle for rolling
      };
    });
  }

  update() {
    // Apply gravity
    this.ball.vy += this.gravity;

    // Update position
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // Update rotation based on horizontal velocity
    this.ball.rotation += this.ball.vx * 0.1;

    // Check collisions with platforms
    this.platforms.forEach((platform, index) => {
      if (this.checkCollision(this.ball, platform)) {
        this.handleCollision(this.ball, platform);

        // Add slight upward velocity when hitting a platform
        this.ball.vy = -Math.abs(this.ball.vy) * this.restitution;

        // Ensure forward momentum
        this.ball.vx = Math.max(this.ball.vx, 2);

        // Trigger word animation
        this.words[index].style.transform = "scale(1.05)";
        setTimeout(() => {
          this.words[index].style.transform = "scale(1)";
        }, 150);
      }
    });

    // Apply friction
    this.ball.vx *= this.friction;
    this.ball.vy *= this.friction;

    // Reset if ball goes off screen
    if (this.ball.y > window.innerHeight || this.ball.x > window.innerWidth) {
      this.resetBall();
    }
  }

  checkCollision(ball, platform) {
    // Simple rectangle collision detection
    return (
      ball.x + ball.radius > platform.x &&
      ball.x - ball.radius < platform.x + platform.width &&
      ball.y + ball.radius > platform.y &&
      ball.y - ball.radius < platform.y + platform.height
    );
  }

  handleCollision(ball, platform) {
    // Adjust ball position to rest on the platform
    ball.y = platform.y - ball.radius;

    // Add velocity in the direction of the platform angle
    ball.vx += Math.cos(platform.angle) * 0.5;
    ball.vy += Math.sin(platform.angle) * 0.5;
  }

  resetBall() {
    this.ball.x = window.innerWidth * 0.3;
    this.ball.y = -20;
    this.ball.vx = 2;
    this.ball.vy = 0;
    this.ball.rotation = 0;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ball
    this.ctx.save();
    this.ctx.translate(this.ball.x, this.ball.y);
    this.ctx.rotate(this.ball.rotation);

    // Ball body
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#000";
    this.ctx.fill();

    // Ball line (to show rotation)
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.ball.radius, 0);
    this.ctx.strokeStyle = "#fff";
    this.ctx.stroke();

    this.ctx.restore();
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PhysicsBall();
});
