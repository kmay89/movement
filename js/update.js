// Self-update — the same pattern we use across our apps.
//
// The service worker never calls skipWaiting() on install: a new version
// installs quietly and then *waits*, so we never swap the app out from under
// someone mid-session. Instead the page notices a waiting version, offers a
// one-tap refresh, and only then tells the worker to take over.
//
// We look for updates hourly and whenever the app comes back to the
// foreground — which is what makes this work when it's installed on a home
// screen, where there is no address bar to reload from.
//
// User data lives in localStorage, entirely separate from the cached app
// files, so an update never touches a single logged minute.

import { store } from './store.js';
import { esc } from './ui.js';
import { APP_VERSION, changelog, latest } from './data/changelog.js';

export { APP_VERSION };

const HOUR = 60 * 60 * 1000;

export function initUpdates() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('./sw.js').then(reg => {
    const offer = () => showBanner(reg);

    // A version that finished installing while we were running is ready now.
    if (reg.waiting && navigator.serviceWorker.controller) offer();

    reg.addEventListener('updatefound', () => {
      const incoming = reg.installing;
      if (!incoming) return;
      incoming.addEventListener('statechange', () => {
        // `controller` tells us this is an update, not the very first install.
        if (incoming.state === 'installed' && navigator.serviceWorker.controller) offer();
      });
    });

    const check = () => { try { reg.update(); } catch (e) { /* offline is fine */ } };
    setInterval(check, HOUR);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
    check();
  }).catch(() => { /* no service worker: the app still works, just not offline */ });

  // The new worker took over — reload once so the page matches it.
  //
  // Only for a genuine update, though: our worker calls clients.claim(), so
  // the very first install also fires controllerchange. Reloading there would
  // mean every new visitor sees the app flash and reload for no reason.
  // A controller already present at boot is what distinguishes the two.
  const wasControlled = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!wasControlled || reloaded) return;
    reloaded = true;
    location.reload();
  });
}

function showBanner(reg) {
  if (document.getElementById('upd-banner')) return;
  const el = document.createElement('div');
  el.className = 'upd-banner';
  el.id = 'upd-banner';
  el.setAttribute('role', 'status');
  el.innerHTML = `
    <span class="upd-txt"><b>A new version is ready.</b><br>Your history stays exactly as it is.</span>
    <button class="btn small" id="upd-go">Refresh</button>
    <button class="upd-x" id="upd-later" aria-label="Later">✕</button>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));

  el.querySelector('#upd-go').addEventListener('click', () => {
    // Remember that we chose to update, so the log can greet us afterwards.
    store.update(s => { s.settings.pendingUpdate = true; });
    if (reg.waiting) reg.waiting.postMessage('skipWaiting');
    else location.reload();
  });

  el.querySelector('#upd-later').addEventListener('click', () => el.remove());
}

// Called on boot: if the app changed version since last run, show the log.
// A brand-new install just records the version silently — the welcome screen
// is that person's introduction, not a changelog.
export function maybeShowWhatsNew() {
  const s = store.get();
  const seen = s.settings.lastVersion;
  const fresh = !seen && !s.log.length && !s.settings.seenWelcome;

  if (seen === APP_VERSION) return;

  store.update(st => {
    st.settings.lastVersion = APP_VERSION;
    st.settings.pendingUpdate = false;
  });

  if (fresh) return;         // first ever launch
  if (!seen) return;         // upgraded from before we tracked versions
  showWhatsNew(APP_VERSION);
}

export function showWhatsNew(version = APP_VERSION) {
  const entry = changelog.find(c => c.version === version) || latest();
  const dlg = document.createElement('dialog');
  dlg.className = 'sheet';
  dlg.innerHTML = `
    <h2>${esc(entry.title)}</h2>
    <p class="muted">Version ${esc(entry.version)} · updated itself, no App Store required</p>
    <ul class="whats-new mt16">
      ${entry.items.map(i => `<li>${esc(i)}</li>`).join('')}
    </ul>
    <button class="btn block mt16" id="wn-ok">Lovely, thanks</button>
    <button class="btn ghost block mt8" id="wn-all">See every version</button>
  `;
  document.body.appendChild(dlg);
  dlg.showModal();
  dlg.addEventListener('close', () => dlg.remove());
  dlg.querySelector('#wn-ok').addEventListener('click', () => dlg.close());
  dlg.querySelector('#wn-all').addEventListener('click', () => {
    dlg.close();
    showFullLog();
  });
}

export function showFullLog() {
  const dlg = document.createElement('dialog');
  dlg.className = 'sheet';
  dlg.innerHTML = `
    <h2>What’s changed</h2>
    <p class="muted">You’re on version ${APP_VERSION}. Movement updates itself — the app checks for a new version every hour and whenever you come back to it.</p>
    <div class="log-list mt16">
      ${changelog.map(c => `
        <div class="log-entry">
          <div class="row between">
            <b>${esc(c.title)}</b>
            <span class="tiny">${esc(c.version)}</span>
          </div>
          <ul class="whats-new mt8">${c.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>
    <button class="btn block mt16" id="lg-ok">Close</button>
  `;
  document.body.appendChild(dlg);
  dlg.showModal();
  dlg.addEventListener('close', () => dlg.remove());
  dlg.querySelector('#lg-ok').addEventListener('click', () => dlg.close());
}
