# Movement — Roadmap

## Where we are (v1)

A zero-dependency, offline-first PWA:

- ✅ Installable on iPhone (Safari → Add to Home Screen) and Android
- ✅ 12 guided audio sessions with on-device voice coaching
- ✅ Research library with citations (15 articles), daily sparks
- ✅ Weekly plan + .ics calendar export + notifications (while installed/open)
- ✅ Circles (local-first, non-competitive), water tracking, gentle streaks, heatmap
- ✅ All data on-device; JSON export

## Music passthrough (Nike-style in-player controls)

What's shipped: a **music bar in the session player**. Without setup it offers
quick launchers (Spotify / Apple Music open alongside the coach). With a
one-time connect, it becomes real passthrough: **Spotify Connect** (Web API +
client-side PKCE — no server) shows now-playing and controls play/pause/skip
of whatever device Spotify is on. Premium accounts only; the user supplies
their own (free) Spotify Client ID from developer.spotify.com.

What needs native code (Phase 4's Capacitor wrap):

- **Apple Music passthrough** — `MPMusicPlayerController.systemMusicPlayer`
  controls the Music app's queue directly; no web equivalent exists.
  (MusicKit JS exists but is its own web player and needs a paid Apple
  Developer token — not passthrough.)
- **Spotify without the manual Client ID step** — the native Spotify App
  Remote SDK, plus a first-party registered app so users just tap "Connect".

## Phase 2 — deepen the PWA

- **Recorded human coach audio** as an optional download per session (speech synthesis
  stays as the offline/zero-cost fallback). This is the single biggest jump toward the
  Nike-Run-Club feel.
- **GPS walks/runs** (Geolocation API): distance and route on-device, never uploaded.
- **More session arcs**: multi-week programs ("First 5K", "30 days of movement snacks",
  "Strong in 6 weeks") building on the walk-run progression.
- **Push reminders via the service worker** (Web Push — supported on iOS 16.4+ for
  installed PWAs) so plan reminders fire even when the app is closed.
- **Background sync + IndexedDB** for larger content (audio) and resilience.

## Phase 3 — synced circles (the community layer)

A tiny backend (or hosted sync like Supabase) enabling:

- Real shared circles: joint intentions, "we both moved today" glow, kind nudges.
- Invite links that actually join a circle across devices.
- Strict principles: no leaderboards, no public metrics, no follower counts.
  Only mutual, consent-based sharing inside small circles.

## Phase 4 — native iOS + Apple Watch

A PWA cannot run on Apple Watch or read heart rate; that requires a native app.
The plan:

1. **Wrap iOS with Capacitor** (reuses this entire codebase as-is) for App Store
   presence, reliable notifications, and HealthKit read/write (steps, workouts,
   mindfulness minutes).
2. **Native watchOS companion in SwiftUI** — the watch is where guided sessions shine:
   - Session picker + big-button player mirroring `js/data/sessions.js` cue scripts
     (the cue format is deliberately portable JSON).
   - Haptic cues on segment changes, heart-rate display with a gentle
     "conversational zone" hint (teaching the talk test on your wrist).
   - Workout session recording to HealthKit; mindful sessions log as Mindfulness.
3. **Shared content pipeline**: sessions/articles stay in this repo as the single
   source of truth; a small build step exports them for the Swift target.

## Content pipeline (ongoing, forever)

- Every new claim ships with a citation, and articles get reviewed against new
  meta-analyses yearly. "Rooted in research, always" is a maintenance promise,
  not a launch feature.
- Editorial tone guardrails: never shame, never "earn your food", never streak guilt.
  Rest is part of training and the copy always says so.
