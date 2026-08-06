// App shell — tiny hash router, tab bar state, and the minute-tick that
// powers plan reminders.

import * as today from './views/today.js';
import * as move from './views/move.js';
import * as player from './views/player.js';
import * as learn from './views/learn.js';
import * as together from './views/together.js';
import * as plan from './views/plan.js';
import * as you from './views/you.js';

const view = document.getElementById('view');
let cleanup = null;

const routes = [
  { match: /^#\/today$/, tab: 'today', render: el => today.render(el) },
  { match: /^#\/move$/, tab: 'move', render: el => move.render(el) },
  { match: /^#\/learn$/, tab: 'learn', render: el => learn.render(el) },
  { match: /^#\/article\/([\w-]+)$/, tab: 'learn', render: (el, m) => learn.renderArticle(el, { articleId: m[1] }) },
  { match: /^#\/together$/, tab: 'together', render: el => together.render(el) },
  { match: /^#\/plan$/, tab: 'today', render: el => plan.render(el) },
  { match: /^#\/you$/, tab: 'you', render: el => you.render(el) },
  { match: /^#\/session\/([\w-]+)$/, tab: 'move', bare: true, render: (el, m) => player.render(el, { sessionId: m[1] }) },
  { match: /^#\/free\/([\w-]+)$/, tab: 'move', bare: true, render: (el, m) => player.render(el, { activityId: m[1] }) },
];

function route() {
  const hash = location.hash || '#/today';
  const r = routes.find(x => x.match.test(hash));
  if (!r) { location.hash = '#/today'; return; }

  if (typeof cleanup === 'function') cleanup();
  cleanup = null;

  const m = hash.match(r.match);
  view.className = r.bare ? 'view bare' : 'view'; // also restarts the enter animation
  void view.offsetWidth;
  cleanup = r.render(view, m) || null;

  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === r.tab));
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();

// Reminder tick: check planned times once a minute while the app is open.
setInterval(() => plan.checkReminders(), 60 * 1000);
