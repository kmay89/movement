// The front door — shown once, on the first launch, and findable forever
// after from You → Why Movement exists.
//
// Kept deliberately short. Onboarding friction is itself a quit driver, so
// this is one scannable screen and a button, not a five-step wizard.

import { store } from '../store.js';
import { zenField, skies } from '../visuals.js';

let field = null;

export function render(el) {
  el.innerHTML = `
    <div class="welcome" style="--deep:${skies.dawn.deep}; --mid:${skies.dawn.mid}; --lift:${skies.dawn.lift}; --ink:${skies.dawn.ink}">
      <canvas class="zen-canvas" id="w-zen" aria-hidden="true"></canvas>
      <div class="welcome-inner">

        <div class="w-top">
          <div class="w-mark" aria-hidden="true"></div>
          <h1>Movement</h1>
          <p class="w-tag">Make moving feel like living, not like work.</p>
        </div>

        <div class="w-card">
          <h2>Why we built this</h2>
          <p>Movement is the closest thing we have to a wonder drug — it lowers the risk of heart disease, diabetes, dementia and depression, and adds years worth living. Almost nobody takes the dose.</p>
          <p>Not because people don’t know. Because every app made it feel like <em>work</em>: scores to chase, streaks to guilt you, leaderboards to lose, calories to repay. So we built the opposite.</p>
        </div>

        <div class="w-card">
          <h2>What makes it different</h2>

          <div class="w-point">
            <span class="w-em">🔒</span>
            <div>
              <b>It’s yours, and it stays on your phone</b>
              <p>No account. No sign-up. No tracking, no ads, nothing sold — ever. Every session, every note lives in this device’s own storage, and you can export or erase all of it in one tap. We built it this way because your body is nobody else’s business.</p>
            </div>
          </div>

          <div class="w-point">
            <span class="w-em">🔬</span>
            <div>
              <b>Rooted in research, always</b>
              <p>Every claim in this app names its source — WHO guidelines, the Lancet, JAMA, NEJM. If we tell you something works, you can go check. If the evidence is thin, we say that too.</p>
            </div>
          </div>

          <div class="w-point">
            <span class="w-em">🫂</span>
            <div>
              <b>Company, not competition</b>
              <p>There are no leaderboards here and there never will be. Circles exist so you can move <em>with</em> people — because strong social ties are linked with about 50% better survival odds, and that is a medicine too.</p>
            </div>
          </div>

          <div class="w-point">
            <span class="w-em">🌱</span>
            <div>
              <b>Every minute genuinely counts</b>
              <p>The health-benefit curve is steepest at the very bottom: going from nothing to a little beats every other step. Five minutes is a real win here, and a rest day is part of training, not a failure.</p>
            </div>
          </div>
        </div>

        <div class="w-card">
          <h2>What to honestly expect</h2>
          <ul class="w-timeline">
            <li><b>Days</b> — mood lifts and sleep improves. You’ll feel this one first.</li>
            <li><b>Weeks</b> — stairs get easier, resting heart rate drifts down.</li>
            <li><b>Months</b> — strength, endurance and body composition shift.</li>
          </ul>
          <p class="w-fine">Anything promising faster is selling you something. Knowing the real timeline is the single best protection against quitting in week three.</p>
        </div>

        <button class="btn block w-go" id="w-go">Let’s move 🌱</button>
        <p class="w-fine center">Free, forever. It’s education and encouragement — not medical advice.</p>
      </div>
    </div>
  `;

  field?.stop();
  field = zenField(el.querySelector('#w-zen'), { palette: skies.dawn, density: 0.6 });

  el.querySelector('#w-go').addEventListener('click', () => {
    store.update(s => { s.settings.seenWelcome = true; });
    location.hash = '#/today';
  });

  return () => { field?.stop(); field = null; };
}
