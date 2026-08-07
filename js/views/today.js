// Today — the warm front door. One suggested next thing, gentle progress,
// water, and today's plan. Never a wall of numbers.

import { store } from '../store.js';
import { esc, toast, greeting, cheer, logCheers, maybeCelebrateGoal } from '../ui.js';
import { sessions, sessionById } from '../data/sessions.js';
import { sparkForToday } from '../data/sparks.js';
import { activities, byId } from '../data/activities.js';
import { zenField, paletteForHour } from '../visuals.js';

let heroField = null; // torn down when Today is re-rendered or left

function suggestSession() {
  const h = new Date().getHours();
  const s = store.get();
  if (s.log.length === 0) return sessionById('first-steps');
  if (h >= 5 && h < 10) return sessionById('morning-sun');
  if ((h >= 12 && h < 15) || (h >= 18 && h < 20)) return sessionById('reset-walk');
  if (h >= 20 || h < 5) return sessionById('wind-down');
  const done = new Set(s.log.map(e => e.sessionId).filter(Boolean));
  return sessions.find(x => !done.has(x.id)) || sessionById('just-ten');
}

function weekdayIndex(d = new Date()) {
  return (d.getDay() + 6) % 7; // 0 = Monday
}

const restHeadlines = [
  'A good time to move is whenever you do.',
  'Five minutes counts. It all counts.',
  'Your body has been waiting all day to be lived in.',
  'Somewhere out there is a walk with your name on it.',
  'No pressure here. Just an open door.',
];

// Hydration, done the way the evidence actually supports: notice the signals
// instead of counting cups toward a number nobody can justify.
const THIRST = [
  { em: '😌', label: 'Not thirsty', say: 'Nicely topped up. Thirst is a genuinely good guide for most healthy adults — you can trust it.' },
  { em: '🙂', label: 'A little', say: 'Have a glass when it’s convenient. No need to chase a target.' },
  { em: '😐', label: 'Thirsty', say: 'Time for water — thirst means your body has already decided.' },
  { em: '😵', label: 'Parched', say: 'Drink now, and keep something nearby. If you’re often this dry, it’s worth a mention to your clinician.' },
];

const URINE = [
  { color: '#f5e9a8', label: 'Pale', say: 'Pale straw is the target. This is what well-hydrated looks like.' },
  { color: '#e8c95a', label: 'Yellow', say: 'Perfectly normal — a glass in the next while wouldn’t hurt.' },
  { color: '#b4791b', label: 'Dark', say: 'Dark means catch up on fluids. It’s the most reliable at-home check there is.' },
];

const movedHeadlines = m => [
  `You’ve moved ${m} minutes today. Lovely.`,
  `${m} minutes today — your heart noticed.`,
  `${m} minutes in the bank. Look at you.`,
  `${m} minutes of being gloriously alive today.`,
];

export function render(el) {
  const s = store.get();
  const todayMin = store.minutesOn(store.todayKey());
  const weekMin = store.minutesThisWeek();
  const goal = s.settings.weeklyGoalMin || 150;
  const streak = store.streak();
  const hydration = store.thirst();
  const spark = sparkForToday();
  const suggestion = suggestSession();
  const todaysPlan = s.plan.filter(p => p.days.includes(weekdayIndex()));
  const name = s.profile.name ? `, ${esc(s.profile.name)}` : '';

  const pct = Math.min(100, Math.round((weekMin / goal) * 100));

  const sky = paletteForHour();

  el.innerHTML = `
    <div class="hero sky-${sky.sky}" style="--deep:${sky.deep}; --mid:${sky.mid}; --lift:${sky.lift}; --ink:${sky.ink}; --sun:${sky.sun}">
      <canvas class="hero-zen" id="hero-zen" aria-hidden="true"></canvas>
      <span class="hero-sun" aria-hidden="true"></span>
      <div class="hero-content">
        <div class="eyebrow">${esc(greeting())}${name}</div>
        <h1>${todayMin >= 5 ? esc(cheer(movedHeadlines(todayMin))) : esc(cheer(restHeadlines))}</h1>
        <a class="btn" href="#/session/${suggestion.id}">
          <span>${suggestion.em}</span> ${esc(suggestion.title)} · ${suggestion.minutes} min
        </a>
      </div>
    </div>

    <div class="stat-row">
      <div class="stat"><div class="n">${streak}🔥</div><div class="l">day streak</div></div>
      <div class="stat"><div class="n">${weekMin}</div><div class="l">min this week</div></div>
      <div class="stat"><div class="n">${store.movementDaysTotal()}</div><div class="l">movement days</div></div>
    </div>

    <div class="card">
      <div class="row between">
        <b>Your week</b>
        <span class="tiny">${weekMin} / ${goal} min</span>
      </div>
      <div class="meter mt8"><i style="width:${pct}%"></i></div>
      <div class="tiny mt8">${pct >= 100
        ? 'You’ve met the WHO weekly guideline. Genuinely well done. 🎉'
        : 'The WHO guideline is 150 min/week — and every single minute on the way there counts.'}</div>
    </div>

    <div class="spark"><b>Today’s spark</b>${esc(spark.text)} <span class="tiny">— ${esc(spark.ref)}</span></div>

    <div class="card">
      <div class="row between">
        <b>Thirst check 💧</b>
        <span class="tiny">the signal that actually works</span>
      </div>
      <div class="thirst-row" id="thirst">
        ${THIRST.map((t, i) =>
          `<button class="thirst-btn ${hydration?.level === i ? 'on' : ''}" data-level="${i}">
            <span class="th-em">${t.em}</span><span class="th-label">${esc(t.label)}</span>
          </button>`).join('')}
      </div>
      ${hydration?.level != null ? `<p class="muted mt12">${esc(THIRST[hydration.level].say)}</p>` : ''}

      <div class="urine-check mt12">
        <div class="tiny" style="margin-bottom:7px">And the honest one — urine color today:</div>
        <div class="urine-row" id="urine">
          ${URINE.map((u, i) =>
            `<button class="urine-btn ${hydration?.urine === i ? 'on' : ''}" data-urine="${i}"
              style="--swatch:${u.color}" aria-label="${esc(u.label)}"><span></span>${esc(u.label)}</button>`).join('')}
        </div>
        ${hydration?.urine != null ? `<p class="muted mt8">${esc(URINE[hydration.urine].say)}</p>` : ''}
      </div>

      <p class="tiny mt12">Thirst is a reliable guide for most healthy adults at rest. It lags in three cases worth knowing: <b>over ~65</b>, <b>in heat</b>, and during <b>long or hard efforts</b> — then drink on a schedule rather than waiting.</p>
    </div>

    <h2 class="section-title">Today’s plan</h2>
    ${todaysPlan.length ? `<div class="card">${todaysPlan.map(p => {
        const a = byId(p.activity);
        return `<div class="plan-item"><span class="em">${a.em}</span>
          <div class="t"><b>${esc(a.name)} · ${p.minutes} min</b><span>${esc(p.time)}</span></div>
          <button class="btn small ghost" data-doplan="${p.id}">Done ✓</button></div>`;
      }).join('')}</div>`
    : `<div class="card flat empty">Nothing planned today. Rest is part of training — or <a href="#/plan">set aside some time</a>.</div>`}

    <button class="btn ghost block mt8" id="quicklog">＋ I already moved — log it</button>
  `;

  // The hero breathes with the hour you're actually in.
  heroField?.stop();
  heroField = zenField(el.querySelector('#hero-zen'), { palette: sky, density: 0.5 });

  // Thirst + urine check-ins (tap again to clear)
  el.querySelector('#thirst').addEventListener('click', e => {
    const btn = e.target.closest('[data-level]');
    if (!btn) return;
    const n = Number(btn.dataset.level);
    store.setThirst({ level: hydration?.level === n ? null : n });
    render(el);
  });

  el.querySelector('#urine').addEventListener('click', e => {
    const btn = e.target.closest('[data-urine]');
    if (!btn) return;
    const n = Number(btn.dataset.urine);
    store.setThirst({ urine: hydration?.urine === n ? null : n });
    render(el);
  });

  // Mark a plan item done
  el.querySelectorAll('[data-doplan]').forEach(btn =>
    btn.addEventListener('click', () => {
      const p = s.plan.find(x => x.id === btn.dataset.doplan);
      if (!p) return;
      const weekBefore = store.minutesThisWeek();
      store.logMovement({ minutes: p.minutes, activity: p.activity });
      if (!maybeCelebrateGoal(weekBefore)) toast('Logged. Promise kept. 🌱');
      render(el);
    }));

  el.querySelector('#quicklog').addEventListener('click', () => openQuickLog(() => render(el)));

  // Router cleanup when leaving Today. (Internal re-renders discard this, but
  // each render stops the previous field above, so only one ever runs.)
  return () => { heroField?.stop(); heroField = null; };
}

export function openQuickLog(onDone) {
  const dlg = document.createElement('dialog');
  dlg.className = 'sheet';
  dlg.innerHTML = `
    <h2>Log some movement</h2>
    <p class="muted">If it moved your body, it counts.</p>
    <label class="field">What did you do?</label>
    <div class="row" style="flex-wrap:wrap; gap:7px" id="ql-act">
      ${activities.map((a, i) =>
        `<button class="chip ${i === 0 ? 'on' : ''}" data-a="${a.id}">${a.em} ${esc(a.name)}</button>`).join('')}
    </div>
    <label class="field">For how long?</label>
    <div class="row" style="flex-wrap:wrap; gap:7px" id="ql-min">
      ${[5, 10, 15, 20, 30, 45, 60].map(m =>
        `<button class="chip ${m === 15 ? 'on' : ''}" data-m="${m}">${m} min</button>`).join('')}
    </div>
    <label class="field row" style="gap:8px; align-items:center">
      <input type="checkbox" id="ql-with" style="width:auto"> With someone 🫂
    </label>
    <div class="row mt16" style="gap:10px">
      <button class="btn ghost" id="ql-cancel">Cancel</button>
      <button class="btn block" id="ql-save" style="flex:1">Log it</button>
    </div>
  `;
  document.body.appendChild(dlg);
  dlg.showModal();

  const pick = (wrap, attr) => wrap.addEventListener('click', e => {
    const b = e.target.closest(`[data-${attr}]`);
    if (!b) return;
    wrap.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
    b.classList.add('on');
  });
  pick(dlg.querySelector('#ql-act'), 'a');
  pick(dlg.querySelector('#ql-min'), 'm');

  dlg.querySelector('#ql-cancel').addEventListener('click', () => dlg.close());
  dlg.addEventListener('close', () => dlg.remove());
  dlg.querySelector('#ql-save').addEventListener('click', () => {
    const activity = dlg.querySelector('#ql-act .chip.on')?.dataset.a || 'other';
    const minutes = Number(dlg.querySelector('#ql-min .chip.on')?.dataset.m || 15);
    const withOthers = dlg.querySelector('#ql-with').checked;
    const weekBefore = store.minutesThisWeek();
    store.logMovement({ minutes, activity, withOthers });
    dlg.close();
    if (!maybeCelebrateGoal(weekBefore)) {
      toast(withOthers ? 'Logged — movement and company. Both count. 💚' : cheer(logCheers));
    }
    if (onDone) onDone();
  });
}
