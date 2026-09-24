// =========================================================================
// 3D TAMIL GLYPH NEURAL SPHERE GENERATION ANIMATION MODULE
// Fibonacci Sphere (340 nodes), Bioluminescent Core, Kinetic Physics,
// Synaptic Filaments, Interactive Supernova Splash & Glass Progress Badge
// =========================================================================

export const TAMIL_MATRIX_GLYPHS = [
  'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ',
  'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல',
  'வ', 'ழ', 'ள', 'ற', 'ன', 'தி', 'மி', 'ழி', 'தை', 'மெ', 'ழீ', 'ஸ்ரீ',
  'சா', 'சு', 'தா', 'து', 'நா', 'பா', 'மா', 'மு', 'யா', 'ரா', 'வா', 'ழா',
  'கா', 'கி', 'சீ', 'தீ', 'நீ', 'பீ', 'மீ', 'லீ', 'வீ', 'ழூ', 'றோ', 'னோ'
];

export const SPHERE_NODE_COUNT = 340;
export const GOLDEN_RATIO_PHI = Math.PI * (3 - Math.sqrt(5)); // ~2.3999632

export class TamilNeuralSphereAnimation {
  constructor(canvasElement, progressBadgeElement) {
    this.canvas = canvasElement;
    this.progressBadge = progressBadgeElement;
    this.progressText = progressBadgeElement ? progressBadgeElement.querySelector('span') : null;
    this.ctx = canvasElement ? canvasElement.getContext('2d', { alpha: true }) : null;
    
    this.isRunning = false;
    this.animId = null;
    this.progressTimer = null;
    this.startTime = null;
    this.progress = 1;

    // Interactive pointer state
    this.pointer = {
      x: -999,
      y: -999,
      lastX: -999,
      lastY: -999,
      vx: 0,
      vy: 0,
      speed: 0,
      isInside: false,
      collapseFactor: 1.0,
      targetCollapse: 1.0,
      lastTime: 0,
      clickSplash: 0
    };

    // Initialize 340 Fibonacci nodes
    this.particles = Array.from({ length: SPHERE_NODE_COUNT }, (_, i) => {
      const y = 1 - (i / (SPHERE_NODE_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = GOLDEN_RATIO_PHI * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const glyph = TAMIL_MATRIX_GLYPHS[i % TAMIL_MATRIX_GLYPHS.length];
      return {
        x,
        y,
        z,
        theta,
        glyph,
        index: i,
        offX: 0,
        offY: 0,
        offZ: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        screenX: 0,
        screenY: 0,
        splashEnergy: 0
      };
    });

    this.time = 0;
    this.width = 440;
    this.height = 320;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Bound handlers
    this.handleResize = this.updateDimensions.bind(this);
    this.handlePointerMove = this.onPointerMove.bind(this);
    this.handlePointerEnter = this.onPointerEnter.bind(this);
    this.handlePointerLeave = this.onPointerLeave.bind(this);
    this.handlePointerDown = this.onPointerDown.bind(this);
  }

  updateDimensions() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.round(rect.width || this.canvas.offsetWidth || 440);
    const h = Math.round(rect.height || this.canvas.offsetHeight || 320);

    if (w > 0 && h > 0 && (w !== this.width || h !== this.height || this.canvas.width !== Math.floor(w * this.dpr))) {
      this.width = w;
      this.height = h;
      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      if (this.ctx) {
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
      }
    }
  }

  onPointerMove(e) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const now = performance.now();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    if (this.pointer.lastX !== -999 && this.pointer.lastTime > 0) {
      const dt = Math.max(1, now - this.pointer.lastTime);
      const dx = curX - this.pointer.lastX;
      const dy = curY - this.pointer.lastY;
      const instantSpeed = Math.hypot(dx, dy) / (dt / 16.6);
      this.pointer.vx = dx * 0.5;
      this.pointer.vy = dy * 0.5;
      this.pointer.speed = Math.min(instantSpeed, 50);
    }

    this.pointer.x = curX;
    this.pointer.y = curY;
    this.pointer.lastX = curX;
    this.pointer.lastY = curY;
    this.pointer.lastTime = now;
    this.pointer.isInside = true;
    this.pointer.targetCollapse = 0.72;
  }

  onPointerEnter(e) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.isInside = true;
    this.pointer.targetCollapse = 0.68;
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;
    this.pointer.lastX = this.pointer.x;
    this.pointer.lastY = this.pointer.y;
    this.pointer.lastTime = performance.now();
  }

  onPointerLeave() {
    this.pointer.isInside = false;
    this.pointer.targetCollapse = 1.0;
    this.pointer.speed = 0;
    this.pointer.x = -999;
    this.pointer.y = -999;
    this.pointer.lastX = -999;
    this.pointer.lastY = -999;
  }

  onPointerDown(e) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.clickSplash = 1.0;
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;

    // Supernova click impulse: fling letters outward radially
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const dx = p.screenX - this.pointer.x;
      const dy = p.screenY - this.pointer.y;
      const dist = Math.max(12, Math.hypot(dx, dy));
      const force = Math.min(38, (320 / dist) * 16);
      p.vx += (dx / dist) * force + (Math.random() - 0.5) * 8;
      p.vy += (dy / dist) * force + (Math.random() - 0.5) * 8;
      p.vz += (Math.random() - 0.5) * force * 0.8;
      p.splashEnergy = 1.0;
    }
  }

  setProgress(val) {
    this.progress = Math.max(1, Math.min(100, Math.round(val)));
    if (this.progressText) {
      this.progressText.textContent = `${this.progress}%`;
    }
  }

  start(startTime = null) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = startTime || Date.now();
    this.time = 0;
    this.setProgress(1);

    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.updateDimensions();

    // Attach listeners
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerenter', this.handlePointerEnter);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('resize', this.handleResize);

    // Progress timer
    this.progressTimer = setInterval(() => {
      if (!this.isRunning) return;
      const elapsed = Date.now() - this.startTime;
      let p = Math.round(98 * (1 - Math.exp(-elapsed / 8500)));
      if (p < 1) p = 1;
      if (p > 98) p = 98;
      this.setProgress(p);
    }, 120);

    const render = () => {
      if (!this.isRunning) return;
      this.renderFrame();
      this.animId = requestAnimationFrame(render);
    };

    this.animId = requestAnimationFrame(render);
  }

  stop() {
    this.isRunning = false;
    this.setProgress(100);
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }

    if (this.canvas) {
      this.canvas.removeEventListener('pointermove', this.handlePointerMove);
      this.canvas.removeEventListener('pointerenter', this.handlePointerEnter);
      this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
      this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    }
    window.removeEventListener('resize', this.handleResize);
  }

  renderFrame() {
    try {
      this.updateDimensions();
      const ctx = this.ctx;
      const width = this.width;
      const height = this.height;

      if (!ctx || width <= 0 || height <= 0) return;

      this.time += 0.018;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const baseRadius = Math.max(30, Math.min(width, height) * 0.39);

      const ptr = this.pointer;

      // Hover collapse physics
      ptr.collapseFactor += (ptr.targetCollapse - ptr.collapseFactor) * 0.08;
      ptr.clickSplash *= 0.92;
      ptr.speed *= 0.88;

      const isFastMovement = ptr.isInside && ptr.speed > 3.2;
      const splashRadius = Math.min(width, height) * 0.48;
      const particles = this.particles;

      // 1. Kinetic Splash & Physics Integration Loop
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isFastMovement) {
          const dx = p.screenX - ptr.x;
          const dy = p.screenY - ptr.y;
          const dist = Math.hypot(dx, dy);

          if (dist < splashRadius) {
            const proximity = 1 - dist / splashRadius;
            const impulse = proximity * Math.min(ptr.speed * 2.2, 42);
            const pushX = (ptr.vx * 0.75 + (dist > 0 ? (dx / dist) * 12 : 0)) * proximity;
            const pushY = (ptr.vy * 0.75 + (dist > 0 ? (dy / dist) * 12 : 0)) * proximity;
            p.vx += pushX * 0.45;
            p.vy += pushY * 0.45;
            p.vz += (Math.random() - 0.5) * impulse * 0.4;
            p.splashEnergy = Math.min(1.0, p.splashEnergy + proximity * 0.8);
          }
        }

        if (ptr.isInside && !isFastMovement && ptr.x > 0) {
          const dx = ptr.x - p.screenX;
          const dy = ptr.y - p.screenY;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 15) {
            const pull = (1 - dist / 140) * 0.35;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;
          }
        }

        const springK = 0.042;
        const damping = 0.87;

        p.vx += -springK * p.offX;
        p.vy += -springK * p.offY;
        p.vz += -springK * p.offZ;

        p.vx *= damping;
        p.vy *= damping;
        p.vz *= damping;

        p.offX += p.vx;
        p.offY += p.vy;
        p.offZ += p.vz;

        p.splashEnergy *= 0.94;
      }

      // 2. Bioluminescent Ambient Core & Cursor Aura
      if (baseRadius > 10) {
        const currentCoreRadius = baseRadius * ptr.collapseFactor;
        const coreGlow = ctx.createRadialGradient(
          centerX, centerY, 2,
          centerX, centerY, currentCoreRadius * 1.3
        );
        coreGlow.addColorStop(0, 'rgba(236, 72, 153, 0.20)');
        coreGlow.addColorStop(0.40, 'rgba(59, 130, 246, 0.13)');
        coreGlow.addColorStop(0.75, 'rgba(37, 99, 235, 0.05)');
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.fillRect(0, 0, width, height);

        if (ptr.isInside && ptr.x > 0) {
          const cursorAura = ctx.createRadialGradient(
            ptr.x, ptr.y, 4,
            ptr.x, ptr.y, 110
          );
          cursorAura.addColorStop(0, 'rgba(255, 42, 133, 0.28)');
          cursorAura.addColorStop(0.5, 'rgba(59, 130, 246, 0.16)');
          cursorAura.addColorStop(1, 'transparent');
          ctx.fillStyle = cursorAura;
          ctx.fillRect(ptr.x - 110, ptr.y - 110, 220, 220);
        }

        // Orbit Ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, currentCoreRadius * 1.05, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.16 + Math.sin(this.time * 2.2) * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 12]);
        ctx.lineDashOffset = -this.time * 20;
        ctx.stroke();
        ctx.restore();
      }

      // 3. 3D Rotation Math
      const rotY = this.time * 0.42;
      const rotX = 0.26 + Math.sin(this.time * 0.3) * 0.12;
      const rotZ = Math.cos(this.time * 0.2) * 0.06;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      // 4. Project 3D Nodes
      const projectedNodes = [];
      const boundMargin = 16;
      const minX = boundMargin;
      const maxX = width - boundMargin;
      const minY = boundMargin;
      const maxY = height - boundMargin;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        const wave = Math.sin(p.theta * 2.5 - this.time * 3.0) * 0.065 +
                     Math.cos(p.y * 3.5 + this.time * 2.0) * 0.035;
        const dynamicRadius = baseRadius * ptr.collapseFactor * (1 + wave + Math.sin(this.time * 0.9) * 0.02);

        const fov = 380;
        const zDistance = fov - (z2 * dynamicRadius + p.offZ) * 0.45;
        const scale = fov / Math.max(10, zDistance);

        let px = centerX + (x3 * dynamicRadius + p.offX) * scale;
        let py = centerY + (y3 * dynamicRadius + p.offY) * scale;

        if (px < minX) {
          px = minX;
          p.vx = Math.abs(p.vx) * 0.7;
          p.offX = (minX - centerX) / scale - x3 * dynamicRadius;
        } else if (px > maxX) {
          px = maxX;
          p.vx = -Math.abs(p.vx) * 0.7;
          p.offX = (maxX - centerX) / scale - x3 * dynamicRadius;
        }

        if (py < minY) {
          py = minY;
          p.vy = Math.abs(p.vy) * 0.7;
          p.offY = (minY - centerY) / scale - y3 * dynamicRadius;
        } else if (py > maxY) {
          py = maxY;
          p.vy = -Math.abs(p.vy) * 0.7;
          p.offY = (maxY - centerY) / scale - y3 * dynamicRadius;
        }

        p.screenX = px;
        p.screenY = py;

        const depthNorm = Math.max(0, Math.min(1, (z2 + 1) * 0.5));

        projectedNodes.push({
          px,
          py,
          z: z2,
          theta: p.theta,
          depthNorm,
          scale,
          glyph: p.glyph,
          splashEnergy: p.splashEnergy,
          index: i
        });
      }

      // 5. Sort Back-to-Front
      projectedNodes.sort((a, b) => a.z - b.z);

      // 6. Draw Synaptic Filaments
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        if (p1.z < 0.16 && p1.splashEnergy < 0.2) continue;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          if (p2.z < 0.16 && p2.splashEnergy < 0.2) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < 40) {
            const lineAlpha = (1 - dist / 40) * 0.26 * Math.min(p1.depthNorm, p2.depthNorm);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = p1.depthNorm > 0.75 || p1.splashEnergy > 0.3
              ? `rgba(244, 63, 94, ${lineAlpha})`
              : `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // 7. Draw Characters
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const isFront = p.z > 0;
        const isSplashing = p.splashEnergy > 0.15;

        if (isFront || isSplashing) {
          const sizeBonus = isSplashing ? p.splashEnergy * 4 : 0;
          const fontSize = Math.max(8.5, Math.round((9.2 + p.depthNorm * 3.8 + sizeBonus) * p.scale));
          const isApex = p.depthNorm > 0.80 || isSplashing;

          ctx.font = `${isApex ? '750' : '650'} ${fontSize}px "Noto Sans Tamil", "Mukta Malar", "Plus Jakarta Sans", system-ui, sans-serif`;

          if (isApex) {
            ctx.fillStyle = isSplashing ? '#ffffff' : '#ff2a85';
            ctx.shadowColor = isSplashing ? '#ff2a85' : '#ff65a3';
            ctx.shadowBlur = isSplashing ? 12 : 8;
            ctx.fillText(p.glyph, p.px, p.py);
            ctx.shadowBlur = 0;
          } else if (p.depthNorm > 0.52) {
            const colorShift = Math.sin(p.theta * 2.0 + this.time * 1.5);
            if (colorShift > 0.05) {
              const alpha = Math.min(1, 0.85 + p.depthNorm * 0.15 + (isSplashing ? 0.15 : 0));
              ctx.fillStyle = `rgba(244, 63, 94, ${alpha})`;
              ctx.shadowColor = 'rgba(244, 63, 94, 0.45)';
              ctx.shadowBlur = 4;
              ctx.fillText(p.glyph, p.px, p.py);
              ctx.shadowBlur = 0;
            } else {
              const alpha = Math.min(1, 0.82 + p.depthNorm * 0.18 + (isSplashing ? 0.15 : 0));
              ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.shadowColor = 'rgba(59, 130, 246, 0.4)';
              ctx.shadowBlur = 4;
              ctx.fillText(p.glyph, p.px, p.py);
              ctx.shadowBlur = 0;
            }
          } else {
            const alpha = 0.65 + p.depthNorm * 0.25;
            ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.fillText(p.glyph, p.px, p.py);
          }
        } else {
          const fontSize = Math.max(6.8, Math.round((7.2 + p.depthNorm * 2.2) * p.scale));
          ctx.font = `500 ${fontSize}px "Noto Sans Tamil", "Mukta Malar", "Plus Jakarta Sans", system-ui, sans-serif`;
          const alpha = 0.14 + p.depthNorm * 0.28;
          ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.fillText(p.glyph, p.px, p.py);
        }
      }
    } catch (e) {
      console.error('Error in 3D Tamil Sphere render frame:', e);
    }
  }
}

// Global Singleton Instance Helper
let activeNeuralSphere = null;

export const NeuralSphereModule = {
  startAnimation(canvasId = 'tamil-neural-sphere-canvas', badgeId = 'dot-matrix-progress-badge', startTime = null) {
    const canvas = typeof canvasId === 'string' ? document.getElementById(canvasId) : canvasId;
    const badge = typeof badgeId === 'string' ? document.getElementById(badgeId) : badgeId;
    if (!canvas) return null;

    if (!activeNeuralSphere || activeNeuralSphere.canvas !== canvas) {
      activeNeuralSphere = new TamilNeuralSphereAnimation(canvas, badge);
    }
    activeNeuralSphere.start(startTime);
    return activeNeuralSphere;
  },

  setProgress(val) {
    if (activeNeuralSphere) {
      activeNeuralSphere.setProgress(val);
    }
  },

  stopAnimation() {
    if (activeNeuralSphere) {
      activeNeuralSphere.stop();
    }
  },

  getInstance() {
    return activeNeuralSphere;
  }
};

window.NeuralSphereModule = NeuralSphereModule;
