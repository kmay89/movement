// Move — the library of guided sessions plus "just move" freestyle mode.

import { esc } from '../ui.js';
import { sessions } from '../data/sessions.js';
import { activities } from '../data/activities.js';
import { paletteFor } from '../visuals.js';

export function render(el) {
  el.innerHTML = `
    <h1 class="page-title">Move</h1>
    <p class="page-sub">Guided sessions with a coach in your ear — or just press go and move your way.</p>

    <a class="card card-link flat" href="#/session/arrive" style="background:var(--plum-soft)">
      <b>🌬️ Start with three breaths</b>
      <p class="muted" style="margin-top:4px">Mindfulness is what lets movement happen — the 3-minute <b>Arrive</b> practice is the doorway into any session below.</p>
    </a>

    <h2 class="section-title">Guided sessions</h2>
    ${sessions.map(s => {
      const p = paletteFor(s.color);
      return `
      <a class="card card-link session-card" href="#/session/${s.id}">
        <div class="session-art world" style="background:linear-gradient(145deg, ${p.deep}, ${p.mid} 60%, ${p.lift})">
          <span class="wa-ring" style="color:${p.ink}"></span>
          <span class="wa-em">${s.em}</span>
        </div>
        <div class="session-body">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.tagline)}</p>
          <div class="session-meta">${s.minutes} min · ${esc(s.level)}</div>
        </div>
      </a>`;
    }).join('')}

    <h2 class="section-title">Or just move — your way</h2>
    <p class="muted" style="margin-bottom:12px">Pick anything. A gentle timer keeps you company and it all counts the same.</p>
    <div class="activity-grid">
      ${activities.map(a => `
        <a class="activity-tile" href="#/free/${a.id}">
          <span class="em">${a.em}</span>
          <span class="nm">${esc(a.name)}</span>
        </a>`).join('')}
    </div>
  `;
}
