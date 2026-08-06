// Small shared UI helpers.

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

// Session-card art backgrounds per color tag.
export const artBg = {
  brand: 'var(--brand-soft)',
  accent: 'var(--accent-soft)',
  gold: 'var(--gold-soft)',
  sky: 'var(--sky-soft)',
  plum: 'var(--plum-soft)',
};
