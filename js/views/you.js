// You — gentle progress, your why, and settings. A mirror, not a report card.

import { store } from '../store.js';
import { esc, toast, DAY_NAMES } from '../ui.js';
import { byId } from '../data/activities.js';
import { spotify } from '../music.js';

export function render(el) {
  const s = store.get();
  const totalMin = s.log.reduce((a, e) => a + e.minutes, 0);
  const favorite = favoriteActivity(s.log);

  el.innerHTML = `
    <h1 class="page-title">You</h1>
    <p class="page-sub">${s.profile.why ? `Your why: “${esc(s.profile.why)}”` : 'Progress here is measured in showing up, not in beating anyone.'}</p>

    <div class="stat-row">
      <div class="stat"><div class="n">${store.streak()}🔥</div><div class="l">day streak</div></div>
      <div class="stat"><div class="n">${totalMin >= 60 ? Math.round(totalMin / 60) + 'h' : totalMin + 'm'}</div><div class="l">all-time moved</div></div>
      <div class="stat"><div class="n">${favorite ? favorite.em : '—'}</div><div class="l">${favorite ? esc(favorite.name.toLowerCase()) : 'no favorite yet'}</div></div>
    </div>

    <h2 class="section-title">Last 10 weeks</h2>
    <div class="card">
      <div class="heatmap">${heatmapCells()}</div>
      <div class="tiny mt8">Each square is a day — darker means more minutes. Gaps aren’t failures; they’re just days. The pattern is what matters.</div>
    </div>

    <h2 class="section-title">Recent movement</h2>
    ${s.log.length ? `<div class="card">${[...s.log].slice(-6).reverse().map(e => {
        const a = byId(e.activity);
        return `<div class="plan-item"><span class="em">${a.em}</span>
          <div class="t"><b>${esc(a.name)} · ${e.minutes} min${e.withOthers ? ' · 🫂' : ''}${e.mood ? ' · ' + moodEmoji(e.mood) : ''}</b>
          <span>${esc(e.date)}</span></div></div>`;
      }).join('')}</div>`
    : `<div class="card flat empty">Your story starts with the first log. It can be five minutes.</div>`}

    <h2 class="section-title">About you</h2>
    <div class="card">
      <label class="field">Your name</label>
      <input type="text" id="u-name" value="${esc(s.profile.name)}" placeholder="What should the app call you?" maxlength="30">
      <label class="field">Your why (shown to future-you on hard days)</label>
      <input type="text" id="u-why" value="${esc(s.profile.why)}" placeholder="e.g. To keep up with my kids for decades" maxlength="90">
      <label class="field">Weekly minutes intention</label>
      <div class="row" style="flex-wrap:wrap; gap:7px" id="u-goal">
        ${[90, 150, 200, 300].map(g =>
          `<button class="chip ${(s.settings.weeklyGoalMin || 150) === g ? 'on' : ''}" data-g="${g}">${g}${g === 150 ? ' (WHO)' : ''}</button>`).join('')}
      </div>
      <label class="field row" style="gap:8px; align-items:center; flex-wrap:wrap">
        <input type="checkbox" id="u-voice" ${s.settings.voice ? 'checked' : ''} style="width:auto"> Coach voice in guided sessions
        <span class="tiny" style="font-weight:400; width:100%">It’s your phone’s built-in voice — charmingly robotic for now; recorded human coaches are on the roadmap. Off = text-only cues.</span>
      </label>
      <button class="btn block mt12" id="u-save">Save</button>
    </div>

    <h2 class="section-title">Music</h2>
    <div class="card" id="music-card">
      ${spotify.connected() ? `
        <b>🎶 Spotify controls connected</b>
        <p class="muted mt8">Play, pause, and skip live in the session player — whatever device your Spotify is playing on. (Apple Music controls need the native app; it’s on the roadmap.)</p>
        <button class="btn ghost small mt12" id="sp-off">Disconnect</button>
      ` : `
        <b>🎶 Control your music mid-session</b>
        <p class="muted mt8">Connect Spotify and get play / pause / skip right inside the player — the Nike-style passthrough. Needs Spotify Premium and a one-time, slightly nerdy setup:</p>
        <ol class="muted" style="margin:10px 0 0 20px; font-size:14px">
          <li style="margin-bottom:6px">Create a (free) app at <b>developer.spotify.com/dashboard</b></li>
          <li style="margin-bottom:6px">Add this exact Redirect URI to it:<br><code style="font-size:12px; word-break:break-all" id="sp-uri"></code></li>
          <li>Paste the app’s <b>Client ID</b> below and connect</li>
        </ol>
        <label class="field">Spotify Client ID</label>
        <input type="text" id="sp-id" placeholder="e.g. 1a2b3c4d5e6f…" autocomplete="off">
        <button class="btn block mt12" id="sp-connect">Connect Spotify</button>
        <p class="tiny mt8">Your tokens stay on this device. Apple Music passthrough requires native APIs — it ships with the iOS app (see roadmap).</p>
      `}
    </div>

    <div class="card flat">
      <b>📲 Put Movement on your phone</b>
      <p class="muted mt8">On iPhone: open this app in Safari → Share → <b>Add to Home Screen</b>. It installs like a native app — full screen, offline, with notifications. Android: Chrome will offer “Install app”.</p>
    </div>

    <div class="row" style="gap:10px">
      <button class="btn ghost small" id="u-export">Export my data</button>
      <button class="btn ghost small" id="u-reset">Start fresh</button>
    </div>
    <p class="tiny mt12 center">Everything lives on your device. No account, no tracking, no ads. Your movement is yours.</p>
  `;

  el.querySelector('#u-goal').addEventListener('click', e => {
    const b = e.target.closest('[data-g]');
    if (!b) return;
    el.querySelectorAll('#u-goal .on').forEach(c => c.classList.remove('on'));
    b.classList.add('on');
  });

  el.querySelector('#u-save').addEventListener('click', () => {
    store.update(st => {
      st.profile.name = el.querySelector('#u-name').value.trim();
      st.profile.why = el.querySelector('#u-why').value.trim();
      st.settings.voice = el.querySelector('#u-voice').checked;
      st.settings.weeklyGoalMin = Number(el.querySelector('#u-goal .on')?.dataset.g || 150);
    });
    toast('Saved 💚');
    render(el);
  });

  // Music card
  const uriEl = el.querySelector('#sp-uri');
  if (uriEl) uriEl.textContent = spotify.redirectUri();
  el.querySelector('#sp-connect')?.addEventListener('click', () => {
    const id = el.querySelector('#sp-id').value.trim();
    if (!id) { toast('Paste your Spotify Client ID first 🙂'); return; }
    spotify.beginAuth(id);
  });
  el.querySelector('#sp-off')?.addEventListener('click', () => {
    spotify.disconnect();
    toast('Spotify disconnected.');
    render(el);
  });

  el.querySelector('#u-export').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(store.get(), null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'movement-data.json';
    link.click();
    URL.revokeObjectURL(url);
  });

  el.querySelector('#u-reset').addEventListener('click', () => {
    if (confirm('Start completely fresh? This erases your log, plan, and circle on this device.')) {
      localStorage.removeItem('movement.v1');
      location.reload();
    }
  });
}

function favoriteActivity(log) {
  if (!log.length) return null;
  const counts = {};
  for (const e of log) counts[e.activity] = (counts[e.activity] || 0) + e.minutes;
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return byId(top[0]);
}

function moodEmoji(m) {
  return { spent: '😮‍💨', calm: '😌', good: '😊', amazing: '🤩' }[m] || '';
}

function heatmapCells() {
  // 10 columns of weeks, rows Mon–Sun, ending this week.
  const cells = [];
  const now = new Date();
  const monThisWeek = new Date(now);
  monThisWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  for (let w = 9; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const day = new Date(monThisWeek);
      day.setDate(monThisWeek.getDate() - w * 7 + d);
      if (day > now) { cells.push('<span class="hm-cell" style="opacity:.35"></span>'); continue; }
      const min = store.minutesOn(store.todayKey(day));
      const lvl = min >= 30 ? 'l3' : min >= 15 ? 'l2' : min >= 5 ? 'l1' : '';
      cells.push(`<span class="hm-cell ${lvl}" title="${store.todayKey(day)}: ${min} min"></span>`);
    }
  }
  return cells.join('');
}
