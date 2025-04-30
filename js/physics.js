class PhysicsBall {
  constructor() {
    this.canvas = document.getElementById("physics-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.words = document.querySelectorAll(".ladder-step");

    // Set initial opacity for all words
    this.words.forEach((word) => {
      word.style.opacity = "0.3";
    });

    // Set canvas size
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    // Physics parameters
    this.gravity = 0.1;
    this.friction = 0.99;
    this.restitution = 0.7;

    // Author images array
    this.authorImages = [
      "tim-ferris.jpg",
      "tony-robbins.jpg",
      "russell-brand.jpg",
      "stephen-king.jpg",
      "rhonda-byrne.jpg",
      "rich-roll.jpg",
      "rachel-hollis.jpg",
      "mel-robbins.jpg",
      "michelle-obama.jpg",
      "oprah-winfrey.jpg",
      "phillip-c-mcgraw.jpg",
      "marie-kondo.jpg",
      "mark-manson.jpg",
      "matthew-mcconaughey.jpg",
      "jordan-b-peterson.jpg",
      "jen-sincero.jpg",
      "jillian-michaels.jpg",
      "jay-shetty.jpg",
      "gary-vaynerchuk.jpg",
      "gwyneth-paltrow.jpg",
      "esther-hicks.jpg",
      "gabor-mate.jpeg",
      "gabrielle-bernstein.jpg",
      "donald-j-trump.jpg",
      "eckhart-tolle.jpg",
      "cameron-diaz.jpg",
      "deepak-chopra.jpg",
      "demi-lovato.jpg",
      "50-cent.jpg",
      "arnold-schwarzenegger.jpg",
      "brene-brown.jpg",
    ];
    this.currentImageIndex = 0;

    // Ball properties
    this.ball = {
      x: window.innerWidth * 0.25, // Shifted from 0.35 to 0.3
      y: -20,
      radius: 30,
      vx: 1.5,
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
    this.ball.rotation += this.ball.vx * 0.01;

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
        this.words[index].style.opacity = "1"; // Set opacity to 1 on collision
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
    this.ball.x = window.innerWidth * 0.25; // Shifted from 0.35 to 0.3
    this.ball.y = -20;
    this.ball.vx = 2;
    this.ball.vy = 0;
    this.ball.rotation = 0;

    // Cycle to the next author image
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.authorImages.length;
    this.ballImage = null; // Reset the image so it will be reloaded with the new author
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw ball
    this.ctx.save();
    this.ctx.translate(this.ball.x, this.ball.y);
    this.ctx.rotate(this.ball.rotation);

    // Create soft glow effect
    this.ctx.shadowColor = "#bfbf1d";
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // Draw a transparent circle to create the glow
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Transparent fill
    this.ctx.fill();

    // Reset shadow for the actual ball
    this.ctx.shadowColor = "transparent";
    this.ctx.shadowBlur = 0;

    // Create circular clipping path
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    this.ctx.clip();

    // Draw image
    if (!this.ballImage) {
      this.ballImage = new Image();
      this.ballImage.src = `assets/authors/${
        this.authorImages[this.currentImageIndex]
      }`;
    }

    // Calculate dimensions to fill the circle while maintaining aspect ratio
    const imgWidth = this.ballImage.width;
    const imgHeight = this.ballImage.height;
    const aspectRatio = imgWidth / imgHeight;
    const diameter = this.ball.radius * 2;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (aspectRatio > 1) {
      // Image is wider than tall
      drawHeight = diameter;
      drawWidth = drawHeight * aspectRatio;
      offsetX = -(drawWidth - diameter) / 2;
      offsetY = 0;
    } else {
      // Image is taller than wide
      drawWidth = diameter;
      drawHeight = drawWidth / aspectRatio;
      offsetX = 0;
      offsetY = -(drawHeight - diameter) / 2;
    }

    // Apply black and white filter
    this.ctx.filter = "grayscale(100%)";

    this.ctx.drawImage(
      this.ballImage,
      -this.ball.radius + offsetX,
      -this.ball.radius + offsetY,
      drawWidth,
      drawHeight
    );

    // Reset filter
    this.ctx.filter = "none";

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
  new PhysicsBall();
});
