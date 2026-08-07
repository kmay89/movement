// The session player — a coach in your ear.
// Guided mode runs a scripted session; freestyle is an open stopwatch
// with occasional gentle company. Both end in a kind word and a log entry.

import { store } from '../store.js';
import { coach } from '../audio.js';
import { esc, toast, fmtClock, confetti, maybeCelebrateGoal } from '../ui.js';
import { sessionById } from '../data/sessions.js';
import { byId as activityById } from '../data/activities.js';
import { spotify } from '../music.js';

const freestyleCues = [
  'Still with you. However you’re moving, it counts.',
  'Check in: shoulders soft, breath easy. Adjust anything that needs kindness.',
  'Every minute of this is a deposit in the only account that compounds forever.',
  'No pace to hit. You already did the hard part when you started.',
  'Notice one pleasant thing around you. Movement is also how we meet the world.',
  'Your heart is getting a little more efficient with every session like this.',
];

export function render(el, params) {
  const guided = !!params.sessionId;
  const session = guided ? sessionById(params.sessionId) : null;
  const activity = guided ? activityById(session.activity) : activityById(params.activityId);

  if (guided && !session) { location.hash = '#/move'; return () => {}; }

  const totalSec = guided ? session.minutes * 60 : null;

  let started = false;
  let running = false;
  let accumulated = 0;      // seconds banked before the latest resume
  let lastResume = 0;       // timestamp of latest resume
  let tick = null;
  let firedCues = new Set();
  let nextFreestyleCue = 180; // first freestyle cue at 3 min
  let wakeLock = null;

  const elapsed = () => accumulated + (running ? (Date.now() - lastResume) / 1000 : 0);

  el.innerHTML = `
    <div class="player" id="player">
      <div class="player-top">
        <button class="player-close" id="p-close" aria-label="Close">✕</button>
        <span style="font-weight:700; opacity:.85">${guided ? esc(session.title) : `Free ${esc(activity.name)}`}</span>
        <span style="width:40px"></span>
      </div>

      <div class="player-hero" id="p-body">
        <div class="em">${guided ? session.em : activity.em}</div>
        <h1>${guided ? esc(session.title) : esc(activity.name)}</h1>
        <p class="ph-sub">${guided ? esc(session.tagline) : esc(activity.why)}</p>
        ${guided ? `<p class="ph-sub" style="margin-top:14px; font-size:13px; opacity:.7">🔬 ${esc(session.science)}</p>` : ''}
        <div class="player-clock" id="p-clock" hidden>${guided ? fmtClock(totalSec) : '0:00'}</div>
        <div class="player-segment" id="p-seg" hidden></div>
        <div class="player-cue" id="p-cue" hidden></div>
      </div>

      <div class="player-meter" ${guided ? '' : 'hidden'}><i id="p-meter" style="width:0%"></i></div>
      <div class="music-bar" id="m-bar"></div>
      <div class="player-controls">
        <button class="pbtn main pulse" id="p-main">Start</button>
        <button class="pbtn" id="p-end" hidden>End</button>
      </div>
      <p class="center tiny" style="opacity:.65; margin-top:12px" id="p-hint">
        ${store.get().settings.voice
          ? 'Heads up: your coach borrows your phone’s built-in voice — a little robotic, we know 🤖 Think friendly GPS, not drill sergeant. Prefer quiet? Text-only lives in You → Settings.'
          : 'Voice is off — cues appear as text. Turn voice on in You → Settings.'}
      </p>
    </div>
  `;

  const $ = id => el.querySelector(id);
  const clockEl = $('#p-clock'), segEl = $('#p-seg'), cueEl = $('#p-cue');
  const meterEl = $('#p-meter'), mainBtn = $('#p-main'), endBtn = $('#p-end');

  // ---- music bar: Spotify passthrough when connected, launchers otherwise ----
  let musicPoll = null;

  function initMusicBar() {
    const bar = $('#m-bar');
    if (!bar) return;
    if (!spotify.connected()) {
      bar.innerHTML = `
        <span class="m-track">Music? Bring your own — it plays alongside the coach.</span>
        <span class="m-launch">
          <a class="mchip" href="https://open.spotify.com" target="_blank" rel="noopener">Spotify</a>
          <a class="mchip" href="https://music.apple.com" target="_blank" rel="noopener">Music</a>
        </span>`;
      return;
    }
    bar.innerHTML = `
      <span class="m-track" id="m-track">🎶 Checking what’s playing…</span>
      <span class="m-controls">
        <button class="mbtn" id="m-prev" aria-label="Previous track">⏮</button>
        <button class="mbtn" id="m-toggle" aria-label="Play or pause">▶︎</button>
        <button class="mbtn" id="m-next" aria-label="Next track">⏭</button>
      </span>`;
    let playing = false;
    const refresh = async () => {
      const np = await spotify.nowPlaying();
      const trackEl = $('#m-track'), toggleEl = $('#m-toggle');
      if (!trackEl || !toggleEl) return; // bar was replaced (session finished)
      if (np) {
        playing = np.playing;
        trackEl.textContent = `🎶 ${np.title} — ${np.artist}`;
        toggleEl.textContent = playing ? '⏸' : '▶︎';
      } else {
        playing = false;
        trackEl.textContent = '🎶 Press play in Spotify once — then control it here.';
        toggleEl.textContent = '▶︎';
      }
    };
    const act = async fn => { await fn(); setTimeout(refresh, 350); };
    $('#m-toggle').addEventListener('click', () => act(() => (playing ? spotify.pause() : spotify.play())));
    $('#m-next').addEventListener('click', () => act(() => spotify.next()));
    $('#m-prev').addEventListener('click', () => act(() => spotify.prev()));
    refresh();
    musicPoll = setInterval(refresh, 5000);
  }

  initMusicBar();

  function currentSegment(t) {
    if (!guided) return null;
    let cur = session.segments[0];
    for (const seg of session.segments) if (t >= seg.at) cur = seg;
    return cur;
  }

  function showCue(text) {
    cueEl.hidden = false;
    cueEl.textContent = text;
    coach.say(text);
  }

  async function grabWakeLock() {
    try { wakeLock = await navigator.wakeLock?.request('screen'); } catch (e) { /* fine without it */ }
  }

  function start() {
    started = true; running = true;
    lastResume = Date.now();
    coach.setEnabled(store.get().settings.voice);
    grabWakeLock();
    clockEl.hidden = false; segEl.hidden = guided ? false : true;
    mainBtn.textContent = 'Pause';
    mainBtn.classList.remove('pulse');
    endBtn.hidden = false;
    $('#p-hint').hidden = true;
    el.querySelectorAll('.player-hero .ph-sub').forEach(n => n.remove());
    el.querySelector('.player-hero .em')?.classList.add('moving');

    // The first time the coach ever speaks, it owns the robot voice with a wink.
    if (store.get().settings.voice && !store.get().settings.metCoach) {
      store.update(s => { s.settings.metCoach = true; });
      coach.say('Quick hello before we begin. Yes — this is your phone’s built-in voice. I know, a little robotic. A real human coach is on the roadmap; until then I promise to be the warmest robot you know. Alright — let’s move.');
    }

    tick = setInterval(update, 400);
    update();
  }

  function pause() {
    accumulated = elapsed(); // bank time BEFORE stopping the clock, or it's lost
    running = false;
    mainBtn.textContent = 'Resume';
    coach.hush();
    coach.say('Paused. Take what you need.');
  }

  function resume() {
    running = true;
    lastResume = Date.now();
    mainBtn.textContent = 'Pause';
  }

  function update() {
    const t = elapsed();
    if (guided) {
      const remain = Math.max(0, Math.round(totalSec - t));
      clockEl.textContent = fmtClock(remain);
      meterEl.style.width = `${Math.min(100, (t / totalSec) * 100)}%`;
      const seg = currentSegment(t);
      if (seg && segEl.textContent !== seg.label) {
        if (segEl.textContent) { coach.chime(); coach.buzz([60]); }
        segEl.textContent = seg.label;
      }
      for (let i = 0; i < session.cues.length; i++) {
        const cue = session.cues[i];
        if (!firedCues.has(i) && t >= cue.at) {
          firedCues.add(i);
          showCue(cue.say);
        }
      }
      if (t >= totalSec) finish(true);
    } else {
      clockEl.textContent = fmtClock(Math.floor(t));
      if (t >= nextFreestyleCue) {
        const idx = Math.floor(nextFreestyleCue / 300) % freestyleCues.length;
        showCue(freestyleCues[idx]);
        nextFreestyleCue += 300;
      }
    }
  }

  function finish(completed) {
    const minutes = Math.round(elapsed() / 60); // bank time before stopping the clock
    clearInterval(tick); tick = null; running = false;
    coach.hush();
    wakeLock?.release?.();
    if (minutes < 1) { close(); return; }
    coach.fanfare(); coach.buzz([60, 80, 60]);
    confetti(completed ? 130 : 70);
    if (completed) coach.say('And that is the session. Beautifully done.');

    $('#p-body').innerHTML = `
      <div class="em">🎉</div>
      <h1>${completed ? 'Session complete' : 'Every minute counted'}</h1>
      <p class="ph-sub">${minutes} minute${minutes === 1 ? '' : 's'} of ${esc(activity.name.toLowerCase())}. How do you feel?</p>
      <div class="row mt16" style="justify-content:center; gap:10px" id="p-mood">
        ${[['😮‍💨', 'spent'], ['😌', 'calm'], ['😊', 'good'], ['🤩', 'amazing']].map(([e, m]) =>
          `<button class="pbtn" data-mood="${m}" style="font-size:26px; padding:12px 18px">${e}</button>`).join('')}
      </div>
    `;
    el.querySelector('.player-meter')?.remove();
    mainBtn.hidden = true; endBtn.hidden = true;

    $('#p-mood').addEventListener('click', e => {
      const b = e.target.closest('[data-mood]');
      if (!b) return;
      const weekBefore = store.minutesThisWeek();
      store.logMovement({
        minutes,
        activity: activity.id,
        sessionId: guided ? session.id : null,
        mood: b.dataset.mood,
      });
      close('#/today');
      if (!maybeCelebrateGoal(weekBefore)) {
        toast(`Logged ${minutes} min. See you next time. 💚`);
      }
    });
  }

  function close(dest = '#/move') {
    clearInterval(tick); tick = null;
    clearInterval(musicPoll); musicPoll = null;
    coach.hush();
    wakeLock?.release?.();
    location.hash = dest; // explicit — history.back() could leave the app on deep links
  }

  mainBtn.addEventListener('click', () => {
    if (!started) start();
    else if (running) pause();
    else resume();
  });

  endBtn.addEventListener('click', () => finish(false));

  $('#p-close').addEventListener('click', () => {
    if (started && elapsed() > 60 && running) { pause(); finish(false); }
    else close();
  });

  // cleanup when the router swaps views
  return () => {
    clearInterval(tick);
    clearInterval(musicPoll);
    coach.hush();
    wakeLock?.release?.();
  };
}
