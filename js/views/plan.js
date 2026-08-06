// Plan — set aside the time. Weekly if-then intentions ("after coffee on
// Mon/Wed/Fri I walk 15 min"), calendar export, and gentle reminders.

import { store } from '../store.js';
import { esc, toast, DAY_NAMES } from '../ui.js';
import { activities, byId } from '../data/activities.js';

const BYDAY = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

export function render(el) {
  const s = store.get();

  el.innerHTML = `
    <h1 class="page-title">Plan</h1>
    <p class="page-sub">Scheduling movement roughly doubles follow-through — behavioral scientists call these if-then plans. Make yours small enough to be inevitable.</p>

    <h2 class="section-title">Your weekly intentions</h2>
    ${s.plan.length ? `<div class="card">${s.plan.map(p => {
        const a = byId(p.activity);
        return `<div class="plan-item"><span class="em">${a.em}</span>
          <div class="t"><b>${esc(a.name)} · ${p.minutes} min</b>
          <span>${p.days.map(d => DAY_NAMES[d]).join(' · ')} at ${esc(p.time)}</span></div>
          <button class="btn small ghost" data-del="${p.id}" aria-label="Remove">✕</button></div>`;
      }).join('')}</div>
      <div class="row" style="gap:10px">
        <button class="btn ghost small" id="ics">📆 Add to calendar</button>
        <button class="btn ghost small" id="notif">🔔 Remind me</button>
      </div>`
    : `<div class="card flat empty">No intentions yet. Start with one — tiny is perfect.</div>`}

    <h2 class="section-title">New intention</h2>
    <div class="card">
      <label class="field">I will…</label>
      <div class="row" style="flex-wrap:wrap; gap:7px" id="pl-act">
        ${activities.slice(0, 8).map((a, i) =>
          `<button class="chip ${i === 0 ? 'on' : ''}" data-a="${a.id}">${a.em} ${esc(a.name)}</button>`).join('')}
      </div>
      <label class="field">for this many minutes…</label>
      <div class="row" style="flex-wrap:wrap; gap:7px" id="pl-min">
        ${[10, 15, 20, 30, 45].map(m =>
          `<button class="chip ${m === 15 ? 'on' : ''}" data-m="${m}">${m}</button>`).join('')}
      </div>
      <label class="field">on these days…</label>
      <div class="dayrow" id="pl-days">
        ${DAY_NAMES.map((d, i) => `<button class="daybtn" data-d="${i}">${d[0]}</button>`).join('')}
      </div>
      <label class="field">around this time</label>
      <input type="time" id="pl-time" value="07:30">
      <button class="btn block mt16" id="pl-save">Set the intention</button>
      <p class="tiny mt8 center">Tip: anchor it to something that already happens — “after coffee”, “after school drop-off”.</p>
    </div>
  `;

  const pick = (wrap, attr, multi = false) => wrap.addEventListener('click', e => {
    const b = e.target.closest(`[data-${attr}]`);
    if (!b) return;
    if (multi) b.classList.toggle('on');
    else {
      wrap.querySelectorAll('.on').forEach(c => c.classList.remove('on'));
      b.classList.add('on');
    }
  });
  pick(el.querySelector('#pl-act'), 'a');
  pick(el.querySelector('#pl-min'), 'm');
  el.querySelector('#pl-days').addEventListener('click', e => {
    e.target.closest('[data-d]')?.classList.toggle('on');
  });

  el.querySelector('#pl-save').addEventListener('click', () => {
    const days = [...el.querySelectorAll('#pl-days .on')].map(b => Number(b.dataset.d));
    if (!days.length) { toast('Pick at least one day 🙂'); return; }
    store.update(st => st.plan.push({
      id: 'p' + Math.random().toString(36).slice(2, 9),
      activity: el.querySelector('#pl-act .on')?.dataset.a || 'walk',
      minutes: Number(el.querySelector('#pl-min .on')?.dataset.m || 15),
      days,
      time: el.querySelector('#pl-time').value || '07:30',
    }));
    toast('Intention set. Future-you says thanks. 🌱');
    render(el);
  });

  el.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
    store.update(st => { st.plan = st.plan.filter(p => p.id !== b.dataset.del); });
    render(el);
  }));

  el.querySelector('#ics')?.addEventListener('click', downloadIcs);
  el.querySelector('#notif')?.addEventListener('click', enableReminders);
}

function downloadIcs() {
  const s = store.get();
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

  const events = s.plan.map((p, i) => {
    const [hh, mm] = p.time.split(':').map(Number);
    // First occurrence: next matching day (0 = Monday in our scheme)
    const first = new Date(now);
    for (let d = 0; d < 8; d++) {
      const cand = new Date(now);
      cand.setDate(now.getDate() + d);
      cand.setHours(hh, mm, 0, 0);
      if (p.days.includes((cand.getDay() + 6) % 7) && cand > now) { first.setTime(cand.getTime()); break; }
    }
    const dt = `${first.getFullYear()}${pad(first.getMonth() + 1)}${pad(first.getDate())}T${pad(hh)}${pad(mm)}00`;
    const end = new Date(first.getTime() + p.minutes * 60000);
    const dtEnd = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
    const a = byId(p.activity);
    return [
      'BEGIN:VEVENT',
      `UID:movement-${p.id}@movement.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${dt}`,
      `DTEND:${dtEnd}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${p.days.map(d => BYDAY[d]).join(',')}`,
      `SUMMARY:${a.em} ${a.name} — movement time`,
      'DESCRIPTION:Time you set aside to move. Small counts. (Movement app)',
      'END:VEVENT',
    ].join('\r\n');
  });

  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Movement//EN', ...events, 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'movement-plan.ics';
  link.click();
  URL.revokeObjectURL(url);
  toast('Calendar file ready — open it to add your movement time.');
}

async function enableReminders() {
  if (!('Notification' in window)) {
    toast('Notifications aren’t available here — the calendar export works everywhere.');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    toast('Reminders on — you’ll get a nudge at your planned times while the app is installed/open.');
  } else {
    toast('No problem — the calendar export is just as good.');
  }
}

// Called from the app shell once a minute: fires a notification when a
// planned time arrives (works while the app is open / installed as a PWA).
export function checkReminders() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const s = store.get();
  const now = new Date();
  const wd = (now.getDay() + 6) % 7;
  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  for (const p of s.plan) {
    if (p.days.includes(wd) && p.time === hhmm) {
      const a = byId(p.activity);
      try {
        new Notification(`${a.em} Time you set aside to move`, {
          body: `${a.name}, ${p.minutes} minutes. Small counts — starting is the whole battle.`,
          tag: `movement-${p.id}-${hhmm}`,
        });
      } catch (e) { /* platform may require SW notifications */ }
    }
  }
}
