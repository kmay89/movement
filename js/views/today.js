// Today — the warm front door. One suggested next thing, gentle progress,
// water, and today's plan. Never a wall of numbers.

import { store } from '../store.js';
import { esc, toast, greeting, artBg, cheer, logCheers, maybeCelebrateGoal } from '../ui.js';
import { sessions, sessionById } from '../data/sessions.js';
import { sparkForToday } from '../data/sparks.js';
import { activities, byId } from '../data/activities.js';

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
  const water = store.water();
  const spark = sparkForToday();
  const suggestion = suggestSession();
  const todaysPlan = s.plan.filter(p => p.days.includes(weekdayIndex()));
  const name = s.profile.name ? `, ${esc(s.profile.name)}` : '';

  const pct = Math.min(100, Math.round((weekMin / goal) * 100));

  el.innerHTML = `
    <div class="hero">
      <div class="eyebrow">${esc(greeting())}${name}</div>
      <h1>${todayMin >= 5 ? esc(cheer(movedHeadlines(todayMin))) : esc(cheer(restHeadlines))}</h1>
      <a class="btn" href="#/session/${suggestion.id}">
        <span>${suggestion.em}</span> ${esc(suggestion.title)} · ${suggestion.minutes} min
      </a>
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
        <b>Water 💧</b>
        <span class="tiny">${water} of 8 cups · thirst & pale urine are the real guides</span>
      </div>
      <div class="water-cups" id="cups">
        ${Array.from({ length: 8 }, (_, i) =>
          `<button class="cup ${i < water ? 'full' : ''}" data-cup="${i + 1}" aria-label="cup ${i + 1}"></button>`).join('')}
      </div>
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

  // Water taps
  el.querySelector('#cups').addEventListener('click', e => {
    const btn = e.target.closest('[data-cup]');
    if (!btn) return;
    const n = Number(btn.dataset.cup);
    store.setWater(n === store.water() ? n - 1 : n);
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
