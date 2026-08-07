# Movement 🌱

**Make moving feel like living, not like work.**

Movement is a warm, research-rooted companion that helps you weave movement into your
day — guided audio sessions with a coach in your ear, gentle weekly plans, a research
library you can actually trust, and circles of friends to move with. No leaderboards.
No shame. No ads. Everything counts.

## The philosophy

- **Every minute counts.** The health-benefit curve is steepest going from *nothing* to
  *a little* (WHO 2020). The app celebrates five minutes like other apps celebrate marathons.
- **Rooted in research, always.** Every claim in the app cites its source — heart health,
  blood sugar, hydration, macros, fasting, sleep, timing, habit science, loneliness.
- **Mindfulness allows movement.** Attention is the skill under every other skill; the
  3-minute “Arrive” practice is the doorway into every session.
- **Together, not versus.** Circles share intentions and company, never scores.
  Belonging is the durable fuel — the research says so.

## What's inside

| Tab | What it does |
| --- | --- |
| **Today** | Time-aware session suggestion, gentle streak, weekly minutes vs. the WHO 150, water tracking, a daily research spark, today's plan |
| **Move** | 18 guided sessions (Nike-Run-Club-style coached audio via on-device speech), 4 multi-week **Programs**, + freestyle timer for any activity |
| **Learn** | 15 short research articles with full citations, organized by topic |
| **Together** | Non-competitive circles: shared intentions, invites, moved-together tracking |
| **Plan** | Weekly if-then intentions, calendar export (.ics), reminder notifications |
| **You** | 10-week heatmap, history, your “why,” settings, data export |

## It updates itself

Installed on a home screen there's no address bar to reload from, so the app
keeps itself current:

- The service worker **never calls `skipWaiting()` on install**. A new version
  downloads and then *waits* — we never swap the app out from under someone
  mid-session.
- The page checks for a new version **every hour and whenever you come back to
  the app**, then shows a banner: *"A new version is ready. Your history stays
  exactly as it is."* One tap posts `skipWaiting` to the waiting worker, it
  takes over, and the page reloads once.
- The reload is guarded so it only fires for a genuine update — our worker
  calls `clients.claim()`, which also fires `controllerchange` on the very
  first install, and reloading there would make every new visitor see the app
  flash for no reason.
- Afterwards you get **the log** — a short note on what changed, in plain
  language. Browsable anytime from **You → version**.

User data lives in `localStorage`, entirely separate from the cached app
files, so an update never touches a single logged minute. When you ship,
bump `APP_VERSION` in `js/data/changelog.js` (add an entry) and `VERSION` in
`sw.js`.

## First run: why this exists

A single scannable screen on first launch (and always available from
You → *Why Movement exists*) covering the why and the four differences:
**it stays on your phone** — no account, no sign-up, no tracking, no ads,
nothing sold, everything in this device's own storage and exportable or
erasable in one tap; **rooted in research** with every claim citing its
source; **company, not competition**; and **every minute genuinely counts**.

It closes with honest timelines — mood and sleep in *days*, easier stairs in
*weeks*, strength and body composition in *months* — because knowing the real
schedule is the best protection against quitting in week three. One screen,
one button: onboarding friction is itself a quit driver.

## Sharing

Shared links render a proper preview card in iMessage, Slack, WhatsApp and
Twitter: `og-image.jpg` (1200×630, ~74KB) drawn in the app's own language —
dawn sky, ripples, an open ensō. Edit `scripts/og-card.html` and regenerate
with `node scripts/make_og.js` (needs Playwright; the PNG output is committed
so the app itself stays dependency-free). The Open Graph tags use absolute
URLs pointing at the production host — change `og:url` and `og:image` together
if you deploy elsewhere. In-app share buttons (Together invites, You →
*Share Movement*) send the URL via the Web Share API so the card actually
appears in the message.

## The look: stillness with something alive inside it

Movement is built to feel calm and to keep you company — never busy, never
shouty. Three ideas carry it (all in `js/visuals.js`, all pure canvas, no
libraries):

- **Ripples on water.** A slow field of concentric rings drifts behind every
  session. Every time the coach speaks, a ripple is born — so the voice has a
  visible echo, and the screen answers you.
- **The ensō.** Your progress is drawn as a Japanese ensō: one brush stroke,
  weighted heavy where it lands and tapering as it lifts, wet ink blooming at
  the leading edge — and deliberately never quite closed, because neither is a
  practice. The clock sits inside it.
- **A breath pacer.** When the coach gives a breath cue, an orb rises and
  paces 4 seconds in, 6 seconds out — the ratio that actually shifts the
  nervous system — so you follow it instead of trying to remember it.

Every session also has its **own color world** — sea, ember, amber, ocean or
twilight — that tints its background, ensō and ripples, and previews as a
thumbnail in the Move list. **Today wears the hour you're in**: dawn climbs
from indigo through rose to amber, day is sea-green, dusk burns coral, and
night is deep blue with stars and a moon.

All of it respects `prefers-reduced-motion` by composing a still frame instead
of animating, and it tears down cleanly when you leave the screen.

## Programs — the thing that pulls you into next week

Four multi-week arcs, each built on the guided sessions: **Your First 5K**
(8 weeks, an eight-rung walk-run ladder from one minute to 5K), **Walk
Yourself Well** (4 weeks to the WHO's 150 min/week), **Strong in Six Weeks**
(2×/week, the strengthening guideline most people never hear), and **30 Days
of Movement Snacks**.

They are **flexible by design**, the way the plans people actually finish are:
a week asks for a *number* of sessions, not specific days. Finishing any
session anywhere in the app counts toward the current week, the program's next
session becomes your Today suggestion, and a quiet week simply waits — you can
repeat any week as often as you like, and the app calls that building, not
failing. A median 70% of people abandon a health app within 100 days, with
rigid schedules and shame among the biggest reasons; this is our answer.

## Guided sessions

Scripted coaching with timed voice cues (Web Speech API — free, offline, private),
soft chimes, progress, pause/resume, a mood check at the end — and a music bar:
connect Spotify (Premium) once and get Nike-style play/pause/skip passthrough
right in the player; Apple Music passthrough ships with the native app.

**You can see the whole session before you start it.** Every spoken check-in
appears as a colored marker on the timeline — 👋 welcome, 🧍 body check,
🔬 science, ✨ motivation, 🚩 milestone, ⏱️ do-this-now, 🌬️ breath, 🎉 finish —
with taller ticks at segment boundaries. Markers brighten as they pass, the
next one pulses, and a line under the track reads *"Next: ✨ Motivation in
0:18."* Cue timing follows the activity: interval runs get a 10-second
countdown and near-silence during hard efforts (teaching moves to the recovery
walks), strength gets one call per movement landing on the set, and yoga and
mindfulness stay deliberately sparse — the silence is the practice. Sessions teach the
science as you move: post-meal glucose walks, zone-2 easy runs, walk-run progressions,
morning circadian walks, exercise snacks, strength, yoga wind-downs, walking meditation,
gratitude walks.

## Running it

It's a zero-dependency static PWA — no build step, no framework, nothing to install:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Deploy by serving the repo root from any static host (GitHub Pages works as-is).
All paths are relative, so subpath hosting is fine.

**Install on iPhone:** open in Safari → Share → *Add to Home Screen*. Runs full-screen,
offline, with notifications (iOS 16.4+).
**Install on Android:** Chrome offers “Install app.”

## Architecture

```
index.html            app shell + tab bar
manifest.webmanifest  PWA manifest (installable, shortcuts)
sw.js                 offline-first service worker (cache-first + background refresh)
css/app.css           design system (light/dark, safe-areas, system fonts)
js/app.js             hash router
js/store.js           local-first state (localStorage; no accounts, no tracking)
js/audio.js           coach voice (speech synthesis) + chimes (WebAudio)
js/data/              content: sessions, articles, activities, daily sparks
js/views/             today, move, player, learn, together, plan, you
scripts/make_icons.py pure-stdlib PNG icon generator
```

Privacy: all data lives on the device. Export it any time from the You tab.

## iPhone & Apple Watch

The PWA installs on iPhone today. The native path (App Store + a true watchOS app
with workout tracking and heart rate) is mapped out in
[docs/ROADMAP.md](docs/ROADMAP.md).

## Disclaimer

Movement is education and encouragement, not medical advice. If you have a condition
or take medication that activity affects, involve your clinician.
