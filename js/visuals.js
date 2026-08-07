// The visual language of Movement: stillness with something alive inside it.
//
// Three pieces, all canvas, all cheap enough to run for twenty minutes on a
// phone in your pocket:
//   · zenField  — slow concentric ripples on water. Every time the coach
//                 speaks, a ripple is born, so the voice has a visible echo.
//   · enso      — a brush-drawn Japanese ensō that completes as you move.
//                 Never quite closed, because neither is a practice.
//   · breathOrb — an orb that paces 4 in / 6 out, so a breath cue becomes
//                 something you follow rather than something you remember.
//
// Everything honours prefers-reduced-motion by rendering a still, composed
// frame instead of animating, and pauses itself when the tab is hidden.

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Each session's world. [deep, mid, lift] build the backdrop gradient;
// `ink` tints ripples and the ensō brush.
export const palettes = {
  brand: { deep: '#083f39', mid: '#12655b', lift: '#1d8770', ink: '#8ff0d5', name: 'sea' },
  accent: { deep: '#5a1e10', mid: '#a63c1d', lift: '#e8613c', ink: '#ffd0a8', name: 'ember' },
  gold: { deep: '#4a3105', mid: '#8a5f0c', lift: '#d9930d', ink: '#ffe7a8', name: 'amber' },
  sky: { deep: '#0d3347', mid: '#1b5b7d', lift: '#2c8fb8', ink: '#a8e4ff', name: 'ocean' },
  plum: { deep: '#331f37', mid: '#5c3a63', lift: '#8a5a90', ink: '#f0cdf5', name: 'twilight' },
};

export const paletteFor = key => palettes[key] || palettes.brand;

// Skies, not session colors — the app should feel like the hour you're in.
// Dawn climbs from indigo through rose into amber; night is deep and quiet.
export const skies = {
  dawn: { deep: '#3b2456', mid: '#a04a63', lift: '#f0964f', ink: '#ffd9b0', sun: '#ffdf9a', sky: 'dawn' },
  day: { deep: '#0b5249', mid: '#17796d', lift: '#3aa88a', ink: '#a8f0d8', sun: '#fff0c4', sky: 'day' },
  dusk: { deep: '#341c46', mid: '#8c3a55', lift: '#e0713f', ink: '#ffc9a8', sun: '#ffc07e', sky: 'dusk' },
  night: { deep: '#0d1330', mid: '#232e5c', lift: '#41508a', ink: '#c9d4ff', sun: '#dde5ff', sky: 'night' },
};

export function paletteForHour(h = new Date().getHours()) {
  if (h < 5) return skies.night;
  if (h < 9) return skies.dawn;
  if (h < 17) return skies.day;
  if (h < 21) return skies.dusk;
  return skies.night;
}

/**
 * A field of slow water rings. Returns a handle with .ripple() to spawn one
 * on demand (we call it when the coach speaks) and .stop() to tear down.
 */
export function zenField(canvas, { palette = palettes.brand, density = 1 } = {}) {
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  let rings = [];
  let raf = null;
  let t = 0;
  let stopped = false;

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.max(1, w * dpr);
    canvas.height = Math.max(1, h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // A ripple is a ring that grows and thins as it fades — a drop on water.
  function spawn(x, y, strength = 1) {
    rings.push({
      x: x ?? w * (0.2 + Math.random() * 0.6),
      y: y ?? h * (0.25 + Math.random() * 0.5),
      r: 0,
      max: Math.min(w, h) * (0.55 + Math.random() * 0.7) * (0.7 + strength * 0.5),
      speed: (0.22 + Math.random() * 0.16) * (1 + strength * 0.35),
      life: 1,
      strength,
    });
    if (rings.length > 14) rings.shift(); // stay calm even on cue-dense sessions
  }

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);

    // A soft breathing glow, drifting on a slow lissajous so it never repeats
    // in a way the eye can catch.
    const gx = w * (0.5 + 0.22 * Math.sin(t * 0.00013));
    const gy = h * (0.42 + 0.18 * Math.cos(t * 0.00017));
    const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.75);
    glow.addColorStop(0, hexA(palette.lift, 0.30));
    glow.addColorStop(0.45, hexA(palette.lift, 0.08));
    glow.addColorStop(1, hexA(palette.lift, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Rings.
    for (const ring of rings) {
      ring.r += ring.speed * (reduced() ? 0 : 1);
      ring.life = Math.max(0, 1 - ring.r / ring.max);
      if (ring.life <= 0) continue;
      const alpha = ring.life * ring.life * 0.30 * ring.strength;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = hexA(palette.ink, alpha);
      ctx.lineWidth = 1 + ring.life * 2.2;
      ctx.stroke();

      // A faint inner echo gives each ring depth, like light through water.
      if (ring.r > 14) {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r - 9, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(palette.ink, alpha * 0.32);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    rings = rings.filter(r => r.life > 0);
  }

  function loop(now) {
    if (stopped) return;
    t = now;
    // Ambient rings keep arriving even when nobody is speaking — the pond is
    // never quite still.
    if (!reduced() && Math.random() < 0.0022 * density) spawn(null, null, 0.5);
    drawFrame();
    raf = requestAnimationFrame(loop);
  }

  size();
  // Open on a composed scene rather than an empty one.
  spawn(w * 0.32, h * 0.34, 0.6);
  spawn(w * 0.68, h * 0.56, 0.45);
  if (reduced()) {
    rings.forEach((r, i) => { r.r = r.max * (0.35 + i * 0.18); r.life = 1 - r.r / r.max; });
    drawFrame();
  } else {
    raf = requestAnimationFrame(loop);
  }

  const onResize = () => { size(); drawFrame(); };
  addEventListener('resize', onResize);

  return {
    ripple: (strength = 1) => spawn(null, null, strength),
    rippleAt: (x, y, strength = 1) => spawn(x, y, strength),
    stop() {
      stopped = true;
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
    },
  };
}

/**
 * The ensō: one brush stroke, drawn with a living width, deliberately left
 * open. `progress` is 0..1 of the session.
 */
export function drawEnso(canvas, progress, { palette = palettes.brand, glow = 0 } = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = canvas.clientWidth;
  if (canvas.width !== size * dpr) {
    canvas.width = canvas.height = Math.max(1, size * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2, cy = size / 2;
  const radius = size * 0.40;
  const START = -Math.PI / 2 + 0.22;      // brush touches down past the top
  const SWEEP = Math.PI * 2 - 0.44;       // and lifts before it closes

  // The unwalked path, faint.
  strokeArc(ctx, cx, cy, radius, START, START + SWEEP, hexA(palette.ink, 0.16), size * 0.035);

  // The walked path, brush-weighted: thick where the brush pressed, thin as
  // it lifts. Drawn as many short segments so the width can breathe.
  const end = START + SWEEP * Math.max(0, Math.min(1, progress));
  const STEPS = 132;
  for (let i = 0; i < STEPS; i++) {
    const a0 = START + (end - START) * (i / STEPS);
    const a1 = START + (end - START) * ((i + 1) / STEPS);
    if (a1 <= a0) continue;
    const p = i / STEPS;
    // Heavy at the landing, tapering at the lift, with a little tremor.
    const weight = 0.55 + 0.45 * Math.sin(Math.PI * Math.pow(p, 0.8)) + 0.06 * Math.sin(p * 22);
    strokeArc(ctx, cx, cy, radius, a0, a1 + 0.004, hexA(palette.ink, 0.92), size * 0.030 * weight);
  }

  // A wet-ink bloom at the leading edge of the brush.
  if (progress > 0.001 && progress < 0.999) {
    const hx = cx + Math.cos(end) * radius;
    const hy = cy + Math.sin(end) * radius;
    const bloom = ctx.createRadialGradient(hx, hy, 0, hx, hy, size * (0.05 + glow * 0.04));
    bloom.addColorStop(0, hexA(palette.ink, 0.85));
    bloom.addColorStop(1, hexA(palette.ink, 0));
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(hx, hy, size * (0.05 + glow * 0.04), 0, Math.PI * 2);
    ctx.fill();
  }
}

function strokeArc(ctx, cx, cy, r, a0, a1, color, width) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, a0, a1);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
}

/**
 * Breath pacer: 4 seconds in, 6 out — the ratio that actually moves the
 * nervous system. Returns a handle; call .stop() when the moment passes.
 */
export function breathOrb(el, { inhale = 4000, exhale = 6000 } = {}) {
  let raf = null, stopped = false;
  const t0 = performance.now();
  const cycle = inhale + exhale;
  const label = el.querySelector('.bo-label');
  const disc = el.querySelector('.bo-disc');

  function frame(now) {
    if (stopped) return;
    const p = ((now - t0) % cycle);
    const inBreath = p < inhale;
    // Cosine easing makes the turn at the top and bottom feel human.
    const phase = inBreath ? p / inhale : (p - inhale) / exhale;
    const eased = (1 - Math.cos(Math.PI * phase)) / 2;
    const scale = inBreath ? 0.55 + eased * 0.45 : 1 - eased * 0.45;
    disc.style.transform = `scale(${scale.toFixed(3)})`;
    if (label) label.textContent = inBreath ? 'in…' : 'out…';
    raf = requestAnimationFrame(frame);
  }

  if (reduced()) {
    disc.style.transform = 'scale(0.85)';
    if (label) label.textContent = 'in 4 · out 6';
  } else {
    raf = requestAnimationFrame(frame);
  }

  return { stop() { stopped = true; cancelAnimationFrame(raf); } };
}

// #rrggbb + alpha → rgba()
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
