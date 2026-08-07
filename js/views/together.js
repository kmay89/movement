// Together — company, not competition. A circle is a few people and one
// shared, gentle intention. No leaderboards, ever.

import { store } from '../store.js';
import { esc, toast, shareApp } from '../ui.js';

export function render(el) {
  const s = store.get();
  if (!s.circle) return renderIntro(el);
  return renderCircle(el, s);
}

function renderIntro(el) {
  el.innerHTML = `
    <h1 class="page-title">Together</h1>
    <p class="page-sub">Moving with people is the closest thing to a cheat code: strong social ties are associated with 50% better survival odds, and walking groups keep ~75% of their members moving.</p>

    <div class="card">
      <h3 style="font-size:18px; margin-bottom:6px">Start a circle 🫂</h3>
      <p class="muted">A circle is 2–8 people and one shared intention — “a Tuesday walk”, “move 4 days a week”, “post-lunch strolls”. Nobody wins. Everybody shows up.</p>
      <label class="field">Circle name</label>
      <input type="text" id="c-name" placeholder="The Tuesday Strollers" maxlength="40">
      <label class="field">Your shared intention</label>
      <input type="text" id="c-intent" placeholder="A walk together every Tuesday at 6" maxlength="80">
      <label class="field">Who’s in? (you can add people anytime)</label>
      <input type="text" id="c-members" placeholder="Sam, Priya, Dad" maxlength="120">
      <button class="btn block mt16" id="c-create">Create the circle</button>
    </div>

    <div class="card flat">
      <b>Why no leaderboard?</b>
      <p class="muted mt8">Competition motivates a few people briefly. Belonging motivates most people for years. This tab is for wellness, happy lives, and keeping each other a little less alone — the research says that’s the durable fuel.</p>
    </div>
  `;

  el.querySelector('#c-create').addEventListener('click', () => {
    const name = el.querySelector('#c-name').value.trim() || 'Our circle';
    const intention = el.querySelector('#c-intent').value.trim() || 'Move together, gently, every week';
    const members = el.querySelector('#c-members').value.split(',').map(m => m.trim()).filter(Boolean);
    store.update(st => { st.circle = { name, intention, members }; });
    toast('Circle created. Now invite them in. 💚');
    render(el);
  });
}

function renderCircle(el, s) {
  const weekAgo = Date.now() - 7 * 86400000;
  const togetherThisWeek = s.log.filter(e => e.withOthers && e.ts > weekAgo);
  const togetherMin = togetherThisWeek.reduce((a, e) => a + e.minutes, 0);

  el.innerHTML = `
    <h1 class="page-title">${esc(s.circle.name)}</h1>
    <p class="page-sub">“${esc(s.circle.intention)}”</p>

    <div class="card">
      <div class="row between"><b>Moved together this week</b><span class="tag brand">${togetherMin} min</span></div>
      <p class="muted mt8">${togetherMin > 0
        ? `${togetherThisWeek.length} shared session${togetherThisWeek.length === 1 ? '' : 's'} — every one of them counted twice: once for the body, once for the belonging.`
        : 'No shared movement yet this week. One text is usually all it takes.'}</p>
      <button class="btn block mt12" id="c-invite">💌 Invite someone to move</button>
    </div>

    <h2 class="section-title">Your people</h2>
    <div class="card">
      ${s.circle.members.length
        ? s.circle.members.map((m, i) => `<div class="plan-item"><span class="em">🙂</span>
            <div class="t"><b>${esc(m)}</b><span>in your circle</span></div>
            <button class="btn small ghost" data-rm="${i}" aria-label="Remove">✕</button></div>`).join('')
        : `<div class="empty">Nobody yet — add your first person below.</div>`}
      <div class="row mt12" style="gap:8px">
        <input type="text" id="c-add" placeholder="Add a name" style="flex:1">
        <button class="btn small" id="c-addbtn">Add</button>
      </div>
    </div>

    <h2 class="section-title">Ideas that work</h2>
    <div class="card flat">
      <ul style="margin-left:18px" class="muted">
        <li style="margin-bottom:6px"><b>The standing date:</b> same day, same time, weekly. Decide the rain rule together.</li>
        <li style="margin-bottom:6px"><b>The walking call:</b> live far apart? Walk while you talk — same medicine, different sidewalks.</li>
        <li style="margin-bottom:6px"><b>The after-meal stroll:</b> family blood-sugar walk after dinner. Ten minutes, all ages.</li>
        <li><b>The kind check-in:</b> “did you get your minutes?” asked with love, never as a score.</li>
      </ul>
    </div>
    <p class="tiny center" style="padding:0 12px">Circles live on your device for now — synced circles with shared check-ins are on the roadmap.</p>
  `;

  el.querySelector('#c-invite').addEventListener('click', () => {
    shareApp({
      title: `Join ${s.circle.name} on Movement`,
      text: `Come move with me 🌱 I'm in a little movement circle called “${s.circle.name}” — our only rule: “${s.circle.intention}”. No competition, just company. Join me?`,
    });
  });

  el.querySelector('#c-addbtn').addEventListener('click', () => {
    const name = el.querySelector('#c-add').value.trim();
    if (!name) return;
    store.update(st => st.circle.members.push(name));
    render(el);
  });

  el.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => {
    store.update(st => st.circle.members.splice(Number(b.dataset.rm), 1));
    render(el);
  }));
}
