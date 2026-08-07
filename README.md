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
| **Move** | 12 guided sessions (Nike-Run-Club-style coached audio via on-device speech) + freestyle timer for any activity |
| **Learn** | 15 short research articles with full citations, organized by topic |
| **Together** | Non-competitive circles: shared intentions, invites, moved-together tracking |
| **Plan** | Weekly if-then intentions, calendar export (.ics), reminder notifications |
| **You** | 10-week heatmap, history, your “why,” settings, data export |

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
