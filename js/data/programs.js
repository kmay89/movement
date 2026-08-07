// Programs — the thing that pulls you into next week.
//
// Deliberately flexible, the way the plans people actually finish are: each
// week asks for N sessions, and you choose which days. There is no "you
// missed Tuesday" in this app, because that message is where most people quit.
//
// A missed week isn't failure either — the program simply waits, and you can
// repeat a week whenever you'd rather build than push.

export const programs = [
  {
    id: 'first-5k',
    title: 'Your First 5K',
    tagline: 'Eight weeks from “I don’t run” to running 5K.',
    em: '🏅',
    color: 'accent',
    perWeek: 3,
    promise: 'You will run 5 kilometres. Not quickly — that is not the point — but continuously, and on purpose.',
    science: 'Walk-run progressions with full recoveries are the standard evidence-backed route from non-runner to 5K: connective tissue adapts more slowly than the heart and lungs, so small rungs and real recoveries are what keep you injury-free.',
    honest: 'Eight weeks is a real commitment, and it works if you do roughly three sessions a week. Miss some? Repeat the week. Nobody is counting but you.',
    weeks: [
      { note: 'Meeting running. One minute at a time.', sessions: ['first-run', 'first-run', 'first-run'] },
      { note: 'The same, but it already feels different.', sessions: ['first-run', 'run-2min', 'first-run'] },
      { note: 'Doubling the effort. Your legs are ready.', sessions: ['run-2min', 'run-2min', 'run-2min'] },
      { note: 'Rhythm appears somewhere in here.', sessions: ['run-2min', 'run-3min', 'run-2min'] },
      { note: 'Three minutes at a time — the aerobic engine takes over.', sessions: ['run-3min', 'run-3min', 'easy-does-it'] },
      { note: 'Five-minute runs. This is the week people call themselves runners.', sessions: ['run-3min', 'run-5min', 'run-5min'] },
      { note: 'Long efforts. The distance is nearly yours.', sessions: ['run-5min', 'run-10min', 'run-5min'] },
      { note: 'Two easy ones, then the day itself.', sessions: ['run-10min', 'easy-does-it', 'run-5k'] },
    ],
  },
  {
    id: 'walk-well',
    title: 'Walk Yourself Well',
    tagline: 'Four weeks of walking that changes your baseline.',
    em: '🚶',
    color: 'brand',
    perWeek: 5,
    promise: 'You will end the month meeting the WHO’s 150 minutes a week — the single most evidence-backed health target there is.',
    science: 'The benefit curve for physical activity is steepest at the bottom: going from little to some delivers the largest returns of any step. Walking is the most sustainable way to make that step, and after-meal walks add a blood-sugar benefit on top.',
    honest: 'Five short walks a week sounds like a lot until you see them: most are 10–15 minutes. This is a program about frequency, not heroics.',
    weeks: [
      { note: 'Just showing up. Short and kind.', sessions: ['first-steps', 'reset-walk', 'morning-sun', 'reset-walk', 'just-ten'] },
      { note: 'Adding daylight and a little intent.', sessions: ['morning-sun', 'reset-walk', 'first-steps', 'gratitude-mile', 'reset-walk'] },
      { note: 'Longer legs on it now.', sessions: ['morning-sun', 'gratitude-mile', 'reset-walk', 'noticing-walk', 'first-steps'] },
      { note: 'The week it stops feeling like a program.', sessions: ['morning-sun', 'gratitude-mile', 'noticing-walk', 'reset-walk', 'gratitude-mile'] },
    ],
  },
  {
    id: 'strong-6',
    title: 'Strong in Six Weeks',
    tagline: 'Twice a week. The guideline nobody talks about.',
    em: '💪',
    color: 'plum',
    perWeek: 2,
    promise: 'You will meet the muscle-strengthening guideline — the half of the advice fewer than a third of adults ever manage.',
    science: 'Guidelines call for strengthening twice weekly; 30–60 minutes a week is associated with 10–17% lower risk of death from all causes, independent of cardio. Adults lose 3–8% of muscle per decade after 30 without it.',
    honest: 'Two sessions a week, 15–20 minutes, no equipment. The hardest part is believing that is genuinely enough. It is.',
    weeks: [
      { note: 'Meeting the movements.', sessions: ['strong-start', 'strong-start'] },
      { note: 'Same session, steadier balance.', sessions: ['strong-start', 'strong-start'] },
      { note: 'Adding slowness — the free progression.', sessions: ['strong-start', 'strong-build'] },
      { note: 'Both sessions, more of you in them.', sessions: ['strong-build', 'strong-start'] },
      { note: 'Building properly now.', sessions: ['strong-build', 'strong-build'] },
      { note: 'The week you notice the stairs got easier.', sessions: ['strong-build', 'strong-build'] },
    ],
  },
  {
    id: 'snacks-30',
    title: '30 Days of Movement Snacks',
    tagline: 'Tiny bursts, scattered through ordinary days.',
    em: '🍿',
    color: 'sky',
    perWeek: 5,
    promise: 'You will prove to yourself that movement does not need a gym, a change of clothes, or an hour.',
    science: 'Three or four one-to-two-minute bursts a day were associated with ~40% lower all-cause mortality in wrist-tracker data from 25,000 non-exercisers — and stair-climbing "snacks" measurably improve fitness within weeks.',
    honest: 'The point is not the sessions. It is noticing that a hallway, a staircase, and four spare minutes were always available.',
    weeks: [
      { note: 'Finding the gaps in your day.', sessions: ['desk-rescue', 'desk-rescue', 'just-ten', 'desk-rescue', 'reset-walk'] },
      { note: 'Snacking without thinking about it.', sessions: ['desk-rescue', 'reset-walk', 'desk-rescue', 'just-ten', 'desk-rescue'] },
      { note: 'Adding a little intensity where it fits.', sessions: ['desk-rescue', 'just-ten', 'reset-walk', 'desk-rescue', 'arrive'] },
      { note: 'It is a habit now, not a project.', sessions: ['desk-rescue', 'reset-walk', 'desk-rescue', 'just-ten', 'desk-rescue'] },
    ],
  },
];

export const programById = id => programs.find(p => p.id === id);
