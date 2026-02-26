import React, { useEffect, useRef } from 'react';

export default function FireworksBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const DEBUG = false;

    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const GRAVITY = 0.02;
    // New apex configuration: specify how far rockets should climb from the bottom
    // `DESIRED_CLIMB_FRACTION` is the fraction of canvas height the rocket should climb.
    // Example: 0.33 => rocket climbs roughly 1/3 of the screen from the bottom.
    const DESIRED_CLIMB_FRACTION = 0.33; // default climb = 33% of canvas height
    const CLIMB_VARIANCE = 0.06; // +/- variance on climb fraction

    function resize() {
      w = canvas.width = canvas.clientWidth || canvas.clientWidth;
      h = canvas.height = canvas.clientHeight || canvas.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const rockets = [];
    const particles = [];

    function spawnRocket() {
      // spawn one or two slower rockets from bottom with slight horizontal variance
      const spawnCount = Math.random() < 0.6 ? 2 : 1; // denser: often spawn two
      for (let s = 0; s < spawnCount; s++) {
        const x = Math.random() * w * 0.9 + w * 0.05;
        // shift targets upward slightly more (user requested higher apex)
        // base range: ~0.5% to 5% of canvas height (closer to the top)
        // compute climb fraction (percent of canvas height from bottom), with small variance
        const climbFraction = Math.max(0, Math.min(1, DESIRED_CLIMB_FRACTION + (Math.random() - 0.5) * CLIMB_VARIANCE));
        // climb (pixels) = fraction * h; targetY is measured from top, starting at (h + 10)
        const climb = climbFraction * h;
        const targetY = (h + 10) - climb;
        // required speed magnitude using kinematic: speed = sqrt(2 * g * climb)
        const requiredSpeed = Math.sqrt(2 * GRAVITY * Math.max(0, climb));
        // choose a slightly varied speed around the required speed, with a sensible minimum
        const speed = Math.max(1.6, requiredSpeed * (0.9 + Math.random() * 0.2));
        if (DEBUG) console.log('spawnRocket', { x: Math.round(x), speed: Number(speed.toFixed(2)), targetY: Math.round(targetY), climbFraction: Number(climbFraction.toFixed(3)), climb: Math.round(climb), w: Math.round(w), h: Math.round(h) });
        rockets.push({ x, y: h + 10, vx: (Math.random() - 0.5) * 0.4, vy: -speed, targetY });
      }
    }

    function explode(rx, ry) {
      // enlarge explosions: increase particle speed multiplier and particle size
      // original small multiplier was ~0.2; 7x -> ~1.4 multiplier
      const count = 10 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const baseSpeed = 0.6 + Math.random() * 1.2;
        const speed = baseSpeed * 1.4; // ~7x the small value used earlier
        particles.push({
          x: rx,
          y: ry,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 40,
          // slightly smaller particle dots per request
          r: 0.8 + Math.random() * 1.2
        });
      }
    }

    let last = 0;
    let rafId;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.vy += GRAVITY; // gravity
        r.x += r.vx;
        r.y += r.vy;
        // trail
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y);
          rockets.splice(i, 1);
        }
      }

      // draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += GRAVITY; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        const a = Math.max(0, p.life / 60);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0 || p.y > h + 20) particles.splice(i, 1);
      }

      const now = performance.now();
      // shorter interval on average -> denser fireworks
      if (!last || now - last > 300 + Math.random() * 600) {
        spawnRocket();
        last = now;
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="fireworks-canvas" />;
}
