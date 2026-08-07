// Small shared UI helpers — plus the fun: confetti, cheers, celebrations.

import { store } from './store.js';

export const esc = s =>
  String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2900);
}

export function fmtClock(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function greeting(d = new Date()) {
  const h = d.getHours();
  if (h < 5) return 'Hello, night owl';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 22) return 'Good evening';
  return 'Winding down?';
}

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ---------- fun ----------

export const cheer = list => list[Math.floor(Math.random() * list.length)];

export const logCheers = [
  'Logged. It all counts. 💚',
  'Look at you go. Logged. ✨',
  'Future-you just high-fived past-you. 🖐️',
  'In the bank. Your heart noticed. 💚',
  'Logged — promise kept. 🌱',
];

// A quick burst of brand-colored confetti. Skipped for reduced-motion folks.
export function confetti(count = 90) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#e8613c', '#d9930d', '#0e5b52', '#2c8f78', '#2c6e8f', '#7c4d79', '#ffd6aa'];
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:100';
  c.width = innerWidth;
  c.height = innerHeight;
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const ps = Array.from({ length: count }, (_, i) => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.6,
    y: innerHeight * 0.3 + (Math.random() - 0.5) * 80,
    vx: (Math.random() - 0.5) * 7,
    vy: -(2 + Math.random() * 7),
    s: 4 + Math.random() * 5,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[i % colors.length],
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62);
      ctx.restore();
    }
    if (++frames < 140) requestAnimationFrame(tick);
    else c.remove();
  })();
}

// Call with minutesThisWeek() captured BEFORE logging; if that log crossed
// the weekly goal, throw the party and return true (caller skips its toast).
export function maybeCelebrateGoal(weekMinBefore) {
  const goal = store.get().settings.weeklyGoalMin || 150;
  if (weekMinBefore < goal && store.minutesThisWeek() >= goal) {
    confetti(140);
    toast(`${goal} minutes this week — you met your goal. Genuinely superb. 🎉`);
    return true;
  }
  return false;
}

// Share the app itself. Sending the URL (not just text) is what makes
// iMessage, WhatsApp and Slack render the link-preview card.
export async function shareApp({ title = 'Movement', text }) {
  const url = location.origin + location.pathname;
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (e) {
      if (e && e.name === 'AbortError') return false; // user changed their mind
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    toast('Copied — paste it anywhere.');
  } catch (e) {
    toast(url);
  }
  return true;
}

// Soft tints for light-background cards (the Learn library). Session cards
// use the full palettes from visuals.js instead.
export const softBg = {
  brand: 'var(--brand-soft)',
  accent: 'var(--accent-soft)',
  gold: 'var(--gold-soft)',
  sky: 'var(--sky-soft)',
  plum: 'var(--plum-soft)',
};
