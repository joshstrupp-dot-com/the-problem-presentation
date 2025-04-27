// Get CSS variables for colors
const style = getComputedStyle(document.documentElement);
const orangeColor = parseInt(
  style.getPropertyValue("--color-orange").trim().replace("#", "0x")
);
const tealColor = parseInt(
  style.getPropertyValue("--color-teal").trim().replace("#", "0x")
);

document.addEventListener("DOMContentLoaded", () => {
  // Initialize PixiJS
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    antialias: true,
    transparent: true,
    view: document.getElementById("background-canvas"),
    resolution: window.devicePixelRatio || 1,
  });

  // Create lines
  const lines = [];
  const numPoints = 20; // More points for smoother curves
  const lineConfigs = [
    {
      color: orangeColor,
      yOffset: -0.2,
      alpha: 0.4,
      rotation: -15, // Rotation in degrees
      frequency: 0.2,
      amplitude: 90,
      speed: 0.0015,
    },
    {
      color: tealColor,
      yOffset: 0.2,
      alpha: 0.4,
      rotation: 12, // Rotation in degrees
      frequency: 0.5,
      amplitude: 70,
      speed: 0.002,
    },
  ];

  lineConfigs.forEach((config) => {
    const points = [];
    const radians = (config.rotation * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    for (let i = 0; i < numPoints; i++) {
      // Create base point
      const x = (i / (numPoints - 1)) * window.innerWidth;
      const y = window.innerHeight * (0.5 + config.yOffset);

      // Apply rotation around center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotatedX = centerX + (x - centerX) * cos - (y - centerY) * sin;
      const rotatedY = centerY + (x - centerX) * sin + (y - centerY) * cos;

      points.push(new PIXI.Point(rotatedX, rotatedY));
    }

    const line = new PIXI.Graphics();
    line.lineStyle(3, config.color, config.alpha);
    lines.push({
      graphic: line,
      points,
      basePoints: points.map((p) => ({ x: p.x, y: p.y })),
      config,
      timeOffset: Math.random() * Math.PI * 2, // Random phase offset
    });
  });

  // Animation
  let time = 0;
  app.ticker.add(() => {
    time += 0.002;

    lines.forEach((line) => {
      line.graphic.clear();
      line.graphic.lineStyle(3, line.config.color, line.config.alpha);

      // Update points with varied wave patterns
      line.points.forEach((point, i) => {
        const basePoint = line.basePoints[i];
        const normalizedX = i / (numPoints - 1);

        // Create complex wave pattern
        const wave1 =
          Math.sin(
            time * line.config.speed * 1000 +
              i * line.config.frequency +
              line.timeOffset
          ) * line.config.amplitude;
        const wave2 =
          Math.sin(
            time * line.config.speed * 500 +
              i * line.config.frequency * 2 +
              line.timeOffset
          ) *
          (line.config.amplitude * 0.5);
        const wave3 =
          Math.sin(
            time * line.config.speed * 250 +
              i * line.config.frequency * 4 +
              line.timeOffset
          ) *
          (line.config.amplitude * 0.25);

        const totalWave = wave1 + wave2 + wave3;

        // Apply wave in the direction perpendicular to rotation
        const radians = (line.config.rotation * Math.PI) / 180;
        point.x = basePoint.x - Math.sin(radians) * totalWave;
        point.y = basePoint.y + Math.cos(radians) * totalWave;
      });

      // Draw smooth curve
      line.graphic.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length - 2; i++) {
        const xc = (line.points[i].x + line.points[i + 1].x) / 2;
        const yc = (line.points[i].y + line.points[i + 1].y) / 2;
        line.graphic.quadraticCurveTo(
          line.points[i].x,
          line.points[i].y,
          xc,
          yc
        );
      }
      line.graphic.quadraticCurveTo(
        line.points[line.points.length - 2].x,
        line.points[line.points.length - 2].y,
        line.points[line.points.length - 1].x,
        line.points[line.points.length - 1].y
      );
    });

    app.stage.removeChildren();
    lines.forEach((line) => app.stage.addChild(line.graphic));
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);

    lines.forEach((line) => {
      const radians = (line.config.rotation * Math.PI) / 180;
      const cos = Math.cos(radians);
      const sin = Math.sin(radians);

      line.points.forEach((point, i) => {
        const x = (i / (numPoints - 1)) * window.innerWidth;
        const y = window.innerHeight * (0.5 + line.config.yOffset);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const rotatedX = centerX + (x - centerX) * cos - (y - centerY) * sin;
        const rotatedY = centerY + (x - centerX) * sin + (y - centerY) * cos;

        line.basePoints[i] = { x: rotatedX, y: rotatedY };
        point.x = rotatedX;
        point.y = rotatedY;
      });
    });
  });
});
