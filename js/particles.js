/**
 * ==============================================================================
 * ZENVE CRM HUB — TRANSLUCENT GLOWING BUBBLE PARTICLES ENGINE
 * ==============================================================================
 * Lightweight, 60fps floating glass bubbles with soft blue/lavender glow,
 * specular 3D light reflections, gentle sine-wave wobble, and cursor deflection.
 * ==============================================================================
 */

(function () {
  "use strict";

  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const bubbles = [];
  // Number of bubbles balanced for clean elegance without visual clutter
  const bubbleCount = Math.min(Math.floor((width * height) / 32000), 45);

  const mouse = {
    x: null,
    y: null,
    radius: 130
  };

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", function () {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);

  // Bubble Colors: Soft Sky Blue, Turquoise Cyan, Lavender, Gold Warmth
  const bubblePalettes = [
    { r: 56, g: 189, b: 248 },  // Sky Blue
    { r: 6, g: 182, b: 212 },   // Cyan
    { r: 139, g: 92, b: 246 },  // Soft Purple
    { r: 192, g: 132, b: 252 }, // Lavender
    { r: 251, g: 191, b: 36 }   // Gentle Gold Sheen
  ];

  class FloatingBubble {
    constructor(startRandomY = true) {
      this.reset(startRandomY);
    }

    reset(startRandomY = false) {
      this.x = Math.random() * width;
      this.y = startRandomY ? Math.random() * height : height + Math.random() * 40;
      this.radius = Math.random() * 9 + 4; // 4px to 13px radius
      this.vy = -(Math.random() * 0.45 + 0.25); // Float upward
      this.vxBase = (Math.random() - 0.5) * 0.2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.wobbleAngle = Math.random() * Math.PI * 2;
      this.wobbleAmp = Math.random() * 0.8 + 0.3;
      
      this.palette = bubblePalettes[Math.floor(Math.random() * bubblePalettes.length)];
      this.alpha = Math.random() * 0.35 + 0.25;
      this.sheenAlpha = this.alpha * 1.5;
    }

    update() {
      this.wobbleAngle += this.wobbleSpeed;
      this.x += this.vxBase + Math.sin(this.wobbleAngle) * this.wobbleAmp;
      this.y += this.vy;

      // Mouse interactive deflection (gentle bubble push)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.8;
          this.y -= Math.sin(angle) * force * 1.8;
        }
      }

      // Reset when floating past the top
      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();

      const { r, g, b } = this.palette;

      // 1. Outer Translucent Glowing Ring
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.6, this.alpha * 1.4)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Soft Inner Radiant Tint
      const radGrad = ctx.createRadialGradient(
        this.x - this.radius * 0.3,
        this.y - this.radius * 0.3,
        this.radius * 0.1,
        this.x,
        this.y,
        this.radius
      );
      radGrad.addColorStop(0, `rgba(255, 255, 255, ${this.sheenAlpha * 0.5})`);
      radGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.3})`);
      radGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.08})`);

      ctx.fillStyle = radGrad;
      ctx.fill();

      // 3. Specular Light Shimmer (Authentic 3D Bubble Gleam)
      ctx.beginPath();
      ctx.arc(
        this.x - this.radius * 0.38,
        this.y - this.radius * 0.38,
        Math.max(1, this.radius * 0.22),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.85, this.sheenAlpha)})`;
      ctx.shadowColor = `rgba(255, 255, 255, 0.9)`;
      ctx.shadowBlur = 4;
      ctx.fill();

      // 4. Subtle Bottom Secondary Rim Reflection
      ctx.beginPath();
      ctx.arc(
        this.x + this.radius * 0.25,
        this.y + this.radius * 0.25,
        Math.max(0.8, this.radius * 0.12),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.4})`;
      ctx.shadowBlur = 0;
      ctx.fill();

      ctx.restore();
    }
  }

  // Initialize bubbles with random Y to spread evenly across screen
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push(new FloatingBubble(true));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
