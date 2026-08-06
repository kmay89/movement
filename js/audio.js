// The coach's voice: on-device speech synthesis (free, offline, private)
// plus a soft chime from WebAudio for segment changes.

let voice = null;
let enabled = true;

function pickVoice() {
  if (voice) return voice;
  const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  // Prefer a natural en voice; Samantha is the warm default on iOS.
  voice =
    voices.find(v => /Samantha|Ava|Karen|Serena/i.test(v.name)) ||
    voices.find(v => v.lang && v.lang.startsWith('en') && v.localService) ||
    voices.find(v => v.lang && v.lang.startsWith('en')) ||
    null;
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

  buzz(pattern = [40]) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  },
};
