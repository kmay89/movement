// The coach's voice: on-device speech synthesis (free, offline, private)
// plus a soft chime from WebAudio for segment changes.

let voice = null;
let enabled = true;

function pickVoice() {
  if (voice) return voice;
  const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const en = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  // Work down a warmth ranking: enhanced/neural voices first, then the
  // friendlier named system voices, then any local English voice.
  const prefer = [
    /premium|enhanced|natural|neural/i,
    /Samantha|Ava|Allison|Serena|Karen|Moira|Tessa/i,
    /Google (US|UK) English/i,
  ];
  for (const re of prefer) {
    const v = en.find(x => re.test(x.name));
    if (v) { voice = v; return voice; }
  }
  voice = en.find(v => v.localService) || en[0] || null;
  return voice;
}

if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => { voice = null; pickVoice(); };
}

export const coach = {
  setEnabled(on) { enabled = on; if (!on) this.hush(); },

  say(text) {
    if (!enabled || !window.speechSynthesis || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = 0.98;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  },

  hush() {
    if (window.speechSynthesis) speechSynthesis.cancel();
  },

  // Two soft rising tones — gentle, not an alarm.
  chime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const play = (freq, at, dur) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, ctx.currentTime + at);
        g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + dur);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + at);
        o.stop(ctx.currentTime + at + dur + 0.05);
      };
      play(660, 0, 0.35);
      play(880, 0.18, 0.45);
      setTimeout(() => ctx.close(), 1200);
    } catch (e) { /* audio unavailable */ }
  },

  // A bright little rising arpeggio for finishing something — a celebration,
  // not a notification.
  fanfare() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const play = (freq, at, dur, gain = 0.16) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, ctx.currentTime + at);
        g.gain.linearRampToValueAtTime(gain, ctx.currentTime + at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + dur);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + at);
        o.stop(ctx.currentTime + at + dur + 0.05);
      };
      play(523.25, 0, 0.4);      // C5
      play(659.25, 0.13, 0.4);   // E5
      play(783.99, 0.26, 0.55);  // G5
      play(1046.5, 0.4, 0.8, 0.12); // C6, held
      setTimeout(() => ctx.close(), 1800);
    } catch (e) { /* audio unavailable */ }
  },

  buzz(pattern = [40]) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  },
};
