// Every way to move counts. Each activity carries a one-line "why it's
// wonderful" grounded in what the research says.

export const activities = [
  { id: 'walk',    name: 'Walk',       em: '🚶', why: 'The most underrated medicine there is — even light walking after meals blunts blood-sugar spikes.' },
  { id: 'run',     name: 'Run / Jog',  em: '🏃', why: 'Even 5–10 minutes a day at slow speeds is linked with markedly lower cardiovascular risk.' },
  { id: 'bike',    name: 'Bike',       em: '🚴', why: 'Joint-friendly cardio you can fold into errands and commutes — movement that goes somewhere.' },
  { id: 'yoga',    name: 'Yoga',       em: '🧘', why: 'Strength, balance and breath in one — and solid evidence for easing stress and improving sleep.' },
  { id: 'strength',name: 'Strength',   em: '💪', why: 'Muscle is your metabolic engine and your independence at 80. Guidelines say twice a week.' },
  { id: 'stretch', name: 'Stretch',    em: '🤸', why: 'A kind way to check in with your body — great as a movement snack between long sits.' },
  { id: 'dance',   name: 'Dance',      em: '💃', why: 'Cardio disguised as joy. Music plus movement lights up mood like almost nothing else.' },
  { id: 'swim',    name: 'Swim',       em: '🏊', why: 'Full-body, zero-impact, and meditative — superb if joints complain about land.' },
  { id: 'hike',    name: 'Hike',       em: '🥾', why: 'Green exercise: nature amplifies the mood benefits of moving.' },
  { id: 'play',    name: 'Play & sport', em: '⚽', why: 'Games make effort invisible. You chase the ball, not the workout.' },
  { id: 'garden',  name: 'Garden / chores', em: '🌱', why: 'NEAT — non-exercise activity — quietly burns more daily energy than workouts for most people.' },
  { id: 'mindful', name: 'Mindful movement', em: '🌬️', why: 'Attention is the skill under every other skill — sensing your body well is what lets you pace it, rest it, and enjoy it.' },
  { id: 'other',   name: 'Anything else', em: '✨', why: 'If it moves your body and you enjoyed it, it counts. It all counts.' },
];

export const byId = id => activities.find(a => a.id === id) || activities[activities.length - 1];
