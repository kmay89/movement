// Daily sparks — one small, true, research-rooted thing per day.
// Rotates deterministically by date so everyone sees the same spark on the same day.

export const sparks = [
  { text: 'Two minutes of walking after a meal measurably lowers your blood-sugar spike. Your legs are a metabolic organ.', ref: 'Buffey et al., Sports Med 2022' },
  { text: 'The biggest health gains go to people going from nothing to a little. The first five minutes are the most valuable of the week.', ref: 'WHO Guidelines 2020' },
  { text: '“10,000 steps” was a 1965 pedometer ad. The mortality curve actually bends around 6,000–8,000 — and every step before that counts too.', ref: 'Paluch et al., Lancet Public Health 2022' },
  { text: 'Three or four one-minute bursts of vigorous daily movement — stairs, hills, hurrying — are associated with ~40% lower mortality.', ref: 'Stamatakis et al., Nature Medicine 2022' },
  { text: 'Mood measurably lifts within about 10 minutes of gentle movement. A grumpy walk is evidence-based medicine.', ref: 'Singh et al., BJSM 2023' },
  { text: 'Regular aerobic exercise lowers blood pressure about as much as a first-line medication.', ref: 'Cornelissen & Smart, JAHA 2013' },
  { text: 'Adults lose 3–8% of muscle per decade after 30 — unless they do strength work. Twice a week is the guideline.', ref: 'Volpi et al., 2004; WHO 2020' },
  { text: 'One walk with a friend is two medicines: strong social ties are associated with 50% better survival odds.', ref: 'Holt-Lunstad et al., PLoS Med 2010' },
  { text: 'Walking groups keep ~75% of their members. Accountability you like is the strongest adherence tech ever invented.', ref: 'Hanson & Jones, BJSM 2015' },
  { text: 'Morning daylight in your eyes — even cloudy daylight — is the strongest lever for falling asleep easily tonight.', ref: 'Circadian research; Stutz et al. 2019' },
  { text: 'Exercise is one of the few non-drug treatments for insomnia with solid meta-analytic support.', ref: 'Kredlow et al., J Behav Med 2015' },
  { text: '150 min/week of walking (plus small diet changes) cut diabetes risk by 58% in the landmark DPP trial — beating the medication arm.', ref: 'Knowler et al., NEJM 2002' },
  { text: 'Running 5–10 minutes a day, even slowly, is associated with a 45% lower risk of cardiovascular death.', ref: 'Lee et al., JACC 2014' },
  { text: 'Mild dehydration — just 1–2% — dents mood and focus and makes movement feel harder than it is. Pale-straw urine is the goal.', ref: 'Armstrong et al., J Nutr 2012' },
  { text: 'If-then plans (“after coffee, I walk 15 minutes”) roughly double follow-through. Vague goals are where habits go to die.', ref: 'Gollwitzer & Sheeran, 2006' },
  { text: 'Missing one day has no measurable effect on habit formation. Self-criticism does. Never make missing mean something about you.', ref: 'Lally et al., 2010; Breines & Chen, 2012' },
  { text: 'The same walk done outdoors beats the indoor version for mood and self-esteem. Nature is an amplifier.', ref: 'Barton & Pretty, 2010' },
  { text: 'The talk test is real science: able to talk but not sing = moderate intensity. No gadget required.', ref: 'CDC / ACSM guidance' },
  { text: 'Elite endurance athletes do ~80% of their training at easy, conversational pace. Slow is not cheating; slow is the method.', ref: 'Seiler, Int J Sports Physiol Perform 2010' },
  { text: 'Muscle contraction pulls glucose from your blood without needing insulin. Every flight of stairs is a tiny dose of metabolic medicine.', ref: 'Richter & Hargreaves, Physiol Rev 2013' },
  { text: 'Fasted cardio burns more fat during the session — but body composition ends up the same either way. Do what feels good.', ref: 'Schoenfeld et al., JISSN 2014' },
  { text: 'Housework, gardening, and fidgeting — “NEAT” — burn more daily energy than formal workouts for most people. It all counts.', ref: 'Levine, Best Pract Res Clin Endocrinol Metab 2002' },
  { text: 'Grip strength predicts long-term health so well that researchers treat it as a vital sign. Carry the heavy groceries.', ref: 'Leong et al., Lancet 2015' },
  { text: 'Evening exercise doesn’t hurt sleep — unless it’s vigorous and ends within an hour of bed. Wind down gently instead.', ref: 'Stutz et al., Sports Med 2019' },
  { text: 'Even 75 minutes of brisk walking a week — half the guideline — is associated with an 18% lower risk of depression.', ref: 'Pearce et al., JAMA Psychiatry 2022' },
  { text: 'Habits took a median of 66 days to feel automatic in the classic study. Be patient with yourself; you’re mid-build.', ref: 'Lally et al., 2010' },
  { text: 'Save a favorite podcast exclusively for walks. “Temptation bundling” measurably boosts consistency.', ref: 'Milkman et al., Manage Sci 2014' },
  { text: 'Your heart literally remodels with regular movement: more blood per beat, fewer beats per minute. Rest is when it shows.', ref: 'AHA; exercise physiology consensus' },
  { text: 'A longer exhale than inhale is a direct lever on your nervous system — in for 4, out for 6, and the body hears “safe to move.”', ref: 'Zaccaro et al., Front Hum Neurosci 2018' },
  { text: 'Mindful movers stay movers: noticing how good movement feels is what the habit loop actually runs on.', ref: 'Tsafou et al., J Health Psychol 2016' },
  { text: 'Interoception — sensing your body from within — is trainable, and it’s the skill that turns exercise from enduring into enjoying.', ref: 'Mindful walking RCTs; Teut et al. 2013' },
];

export function sparkForToday(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86400000);
  return sparks[dayIndex % sparks.length];
}
