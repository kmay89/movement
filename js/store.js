// Local-first state. Everything lives on the device in localStorage —
// no accounts, no tracking, yours.

const KEY = 'movement.v1';

const defaults = () => ({
  profile: { name: '', why: '', createdAt: new Date().toISOString() },
  log: [],          // { id, date: 'YYYY-MM-DD', minutes, activity, sessionId?, mood?, withOthers? }
  thirst: {},       // { 'YYYY-MM-DD': { level: 0-3, urine: 0-2|null, ts } }
  plan: [],         // { id, days: [0-6], time: 'HH:MM', activity, minutes }
  circle: null,     // { name, intention, members: [names] }
  readArticles: [],
  settings: { voice: true, weeklyGoalMin: 150 },
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults(), ...JSON.parse(raw) };
  } catch (e) { /* corrupted state falls back to defaults */ }
  return defaults();
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full/private mode */ }
}

export const store = {
  get: () => state,

  update(fn) {
    fn(state);
    save();
  },

  // ---- dates ----
  todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  },

  // ---- logging movement ----
  logMovement({ minutes, activity, sessionId = null, mood = null, withOthers = false }) {
    const entry = {
      id: 'm' + Math.random().toString(36).slice(2, 9),
      date: this.todayKey(),
      ts: Date.now(),
      minutes: Math.max(1, Math.round(minutes)),
      activity, sessionId, mood, withOthers,
    };
    this.update(s => s.log.push(entry));
    return entry;
  },

  minutesOn(dateKey) {
    return state.log.filter(e => e.date === dateKey).reduce((a, e) => a + e.minutes, 0);
  },

  minutesThisWeek() {
    const now = new Date();
    const mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7)); // back to Monday
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      if (d > now) break;
      total += this.minutesOn(this.todayKey(d));
    }
    return total;
  },

  // A "movement day" is any day with ≥5 intentional minutes. Streak counts
  // consecutive movement days ending today or yesterday (today isn't over yet
  // — an unfinished today never breaks a streak).
  streak() {
    let n = 0;
    const d = new Date();
    if (this.minutesOn(this.todayKey(d)) < 5) d.setDate(d.getDate() - 1);
    while (this.minutesOn(this.todayKey(d)) >= 5) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  },

  movementDaysTotal() {
    return new Set(state.log.filter(e => e.minutes >= 5).map(e => e.date)).size;
  },

  // ---- hydration ----
  // We track the signals the evidence actually supports — thirst and urine
  // color — rather than counting cups toward an invented daily number.
  thirst(dateKey = this.todayKey()) {
    return state.thirst[dateKey] || null;
  },

  setThirst(patch) {
    const k = this.todayKey();
    this.update(s => {
      s.thirst[k] = { level: null, urine: null, ...(s.thirst[k] || {}), ...patch, ts: Date.now() };
    });
  },
};
