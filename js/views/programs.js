// Programs — browse, join, and follow a multi-week arc.
//
// The tone here matters as much as the mechanics: a program you are behind on
// must never feel like a program you are failing. There is no red, no "missed",
// no streak to break. A week waits for you.

import { store } from '../store.js';
import { esc, toast } from '../ui.js';
import { programs, programById } from '../data/programs.js';
import { sessionById } from '../data/sessions.js';
import { paletteFor } from '../visuals.js';

export function render(el) {
  const active = store.get().program;
  const activeProgram = active ? programById(active.id) : null;

  el.innerHTML = `
    <h1 class="page-title">Programs</h1>
    <p class="page-sub">Multi-week arcs with a coach in your ear. Flexible on purpose — each week asks for a number of sessions, and you pick the days.</p>

    ${activeProgram ? `
      <h2 class="section-title">You’re in</h2>
      ${programCard(activeProgram, active)}
      <h2 class="section-title">Others, for later</h2>
    ` : ''}

    ${programs.filter(p => p.id !== active?.id).map(p => programCard(p, null)).join('')}

    <div class="card flat mt16">
      <b>Why the weeks are flexible</b>
      <p class="muted mt8">Roughly 70% of people abandon a health app within a hundred days, and rigid schedules are one of the biggest reasons. So a week here asks for a count, not a calendar — and if life happens, the week simply waits. You can repeat any week as many times as you like.</p>
    </div>
  `;
}

function programCard(p, active) {
  const pal = paletteFor(p.color);
  const totalSessions = p.weeks.reduce((a, w) => a + w.sessions.length, 0);
  const week = active ? p.weeks[Math.min(active.week, p.weeks.length - 1)] : null;
  const done = active ? (active.done[active.week] || 0) : 0;

  return `
    <a class="card card-link session-card" href="#/program/${p.id}">
      <div class="session-art world" style="background:linear-gradient(145deg, ${pal.deep}, ${pal.mid} 60%, ${pal.lift})">
        <span class="wa-ring" style="color:${pal.ink}"></span>
        <span class="wa-em">${p.em}</span>
      </div>
      <div class="session-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
        <div class="session-meta">${p.weeks.length} weeks · ${p.perWeek}×/week · ${totalSessions} sessions</div>
        ${active ? `
          <div class="prog-mini mt8">
            <div class="meter"><i style="width:${(done / week.sessions.length) * 100}%"></i></div>
            <div class="tiny mt8">Week ${active.week + 1} · ${done} of ${week.sessions.length} done</div>
          </div>` : ''}
      </div>
    </a>`;
}

export function renderOne(el, params) {
  const p = programById(params.programId);
  if (!p) { location.hash = '#/programs'; return; }

  const state = store.get().program;
  const joined = state?.id === p.id;
  const curWeek = joined ? Math.min(state.week, p.weeks.length - 1) : 0;
  const done = joined ? (state.done[curWeek] || 0) : 0;
  const week = p.weeks[curWeek];
  const weekComplete = joined && done >= week.sessions.length;
  const lastWeek = curWeek >= p.weeks.length - 1;
  const pal = paletteFor(p.color);

  el.innerHTML = `
    <a class="backlink" href="#/programs">← Programs</a>

    <div class="prog-hero" style="background:linear-gradient(150deg, ${pal.deep}, ${pal.mid} 62%, ${pal.lift})">
      <div class="ph-em">${p.em}</div>
      <h1>${esc(p.title)}</h1>
      <p>${esc(p.tagline)}</p>
      <div class="prog-facts">${p.weeks.length} weeks · ${p.perWeek} sessions a week · you choose the days</div>
    </div>

    <div class="card">
      <b>What you’ll get</b>
      <p class="muted mt8">${esc(p.promise)}</p>
      <p class="tiny mt12">🔬 ${esc(p.science)}</p>
      <p class="tiny mt8">💬 ${esc(p.honest)}</p>
    </div>

    ${joined ? `
      <h2 class="section-title">This week</h2>
      <div class="card">
        <div class="row between">
          <b>Week ${curWeek + 1} of ${p.weeks.length}</b>
          <span class="tag ${p.color}">${done} / ${week.sessions.length}</span>
        </div>
        <p class="muted mt8">${esc(week.note)}</p>
        <div class="meter mt12"><i style="width:${Math.min(100, (done / week.sessions.length) * 100)}%"></i></div>
        <div class="mt12">
          ${week.sessions.map((sid, i) => {
            const s = sessionById(sid);
            if (!s) return '';
            return `<a class="plan-item" href="#/session/${s.id}" style="color:inherit">
              <span class="em">${i < done ? '✓' : s.em}</span>
              <div class="t"><b>${esc(s.title)}</b><span>${s.minutes} min · ${esc(s.level)}</span></div>
            </a>`;
          }).join('')}
        </div>
        <p class="tiny mt12">Any order, any days. Finishing a session anywhere in the app counts toward this week.</p>
      </div>

      ${weekComplete ? `
        <div class="card" style="background:var(--${p.color}-soft)">
          <b>Week ${curWeek + 1} complete 🎉</b>
          <p class="muted mt8">${lastWeek
            ? 'That’s the whole program. Genuinely — well done. You can run it again anytime, or keep the sessions as favourites.'
            : 'Ready for the next one? No rush: repeating a week is a legitimate choice, not a step back.'}</p>
          <div class="row mt12" style="gap:10px">
            ${lastWeek ? '' : `<button class="btn small" id="pg-next">Start week ${curWeek + 2} →</button>`}
            <button class="btn small ghost" id="pg-repeat">Repeat this week</button>
          </div>
        </div>` : ''}

      <h2 class="section-title">The whole arc</h2>
      <div class="card">
        ${p.weeks.map((w, i) => `
          <div class="plan-item">
            <span class="em">${i < curWeek ? '✓' : i === curWeek ? '▸' : i + 1}</span>
            <div class="t"><b>Week ${i + 1}${i === curWeek ? ' · you are here' : ''}</b><span>${esc(w.note)}</span></div>
          </div>`).join('')}
      </div>

      <button class="btn ghost block mt16" id="pg-leave">Leave this program</button>
      <p class="tiny center mt8">Leaving keeps every session you’ve logged. Nothing is lost.</p>
    ` : `
      <h2 class="section-title">The arc</h2>
      <div class="card">
        ${p.weeks.map((w, i) => `
          <div class="plan-item">
            <span class="em">${i + 1}</span>
            <div class="t"><b>${esc(w.note)}</b><span>${w.sessions.map(s => sessionById(s)?.title).filter(Boolean).join(' · ')}</span></div>
          </div>`).join('')}
      </div>
      <button class="btn block mt16" id="pg-join">${store.get().program ? 'Switch to this program' : 'Start this program'}</button>
      ${store.get().program ? `<p class="tiny center mt8">You’re currently in another program — starting this one replaces it.</p>` : ''}
    `}
  `;

  el.querySelector('#pg-join')?.addEventListener('click', () => {
    store.startProgram(p.id);
    toast(`You’re in. Week 1: ${p.weeks[0].sessions.length} sessions, any days. 🌱`);
    renderOne(el, params);
  });

  el.querySelector('#pg-next')?.addEventListener('click', () => {
    store.advanceProgramWeek();
    toast('Next week unlocked. One rung at a time.');
    renderOne(el, params);
  });

  el.querySelector('#pg-repeat')?.addEventListener('click', () => {
    store.repeatProgramWeek();
    toast('Week reset. Repeating is building, not failing. 💚');
    renderOne(el, params);
  });

  el.querySelector('#pg-leave')?.addEventListener('click', () => {
    store.leaveProgram();
    toast('Left the program — your logged movement stays yours.');
    renderOne(el, params);
  });

  window.scrollTo(0, 0);
}
