// Guided sessions — a coach in your ear, Nike Run Club style.
// Every script is warm, unhurried, and quietly teaches the science.
//
// Cue timing is deliberate, and it follows the activity:
//   · Interval work — countdown 10s before every transition, the call exactly
//     on it, and near-silence during hard efforts (you can't absorb teaching
//     while breathing hard). Science goes in the recovery walks.
//   · Steady cardio — roughly every 2-3 minutes, denser at the start and
//     finish, with teaching where breathing is easy.
//   · Strength & mobility — one call per movement, landing on the segment.
//   · Mindfulness & yoga — sparse on purpose. The silence is the practice.
//
// `kind` drives the timeline markers in the player, so you can see when the
// coach will speak and what kind of moment it is before you get there.

export const cueKinds = {
  welcome:   { label: 'Welcome',    em: '👋', color: '#ffffff' },
  form:      { label: 'Body check', em: '🧍', color: '#cfe9e0' },
  science:   { label: 'Science',    em: '🔬', color: '#8fd0f0' },
  motivate:  { label: 'Motivation', em: '✨', color: '#ffd6aa' },
  milestone: { label: 'Milestone',  em: '🚩', color: '#ffb47a' },
  interval:  { label: 'Do this now', em: '⏱️', color: '#ff8a5c' },
  breath:    { label: 'Breath',     em: '🌬️', color: '#d9c2ec' },
  close:     { label: 'Finish',     em: '🎉', color: '#ffe9a8' },
};

export const sessions = [
  {
    id: 'first-steps',
    title: 'First Steps',
    tagline: 'A 15-minute walk that asks nothing of you but showing up.',
    em: '🚶',
    activity: 'walk',
    minutes: 15,
    level: 'Start here',
    color: 'brand',
    science: 'Any amount of walking counts toward the WHO’s 150 weekly minutes — and the first minutes you add deliver the biggest health return.',
    segments: [
      { at: 0, label: 'Settle in' },
      { at: 180, label: 'Find your rhythm' },
      { at: 660, label: 'Ease home' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Welcome. This is your walk — no pace to hit, nothing to prove. Just start moving, gently.' },
      { at: 45, kind: 'form', say: 'Drop your shoulders. Let your arms swing. Breathe in through your nose if you can.' },
      { at: 130, kind: 'science', say: 'Here is a secret the research keeps confirming: the biggest health gains go to people moving from nothing to something. That is you, right now.' },
      { at: 250, kind: 'form', say: 'Settle into a pace where you could chat with a friend. Comfortable is the goal today.' },
      { at: 380, kind: 'breath', say: 'Notice three things around you — a color, a sound, a smell. Movement is also how we come back to the world.' },
      { at: 450, kind: 'milestone', say: 'Halfway. However fast you are going is exactly fast enough.' },
      { at: 570, kind: 'science', say: 'Your heart is pumping a little more oxygen with every beat right now. Walks like this, repeated, literally remodel your heart for the better.' },
      { at: 660, kind: 'interval', say: 'Ease the pace down a notch. Let your breath grow quiet — we are heading home.' },
      { at: 780, kind: 'motivate', say: 'Think of one thing this walk gave you — even if it is just fifteen minutes that belonged to you.' },
      { at: 870, kind: 'close', say: 'That is it. You moved today. That is the whole game — see you tomorrow.' },
    ],
  },
  {
    id: 'arrive',
    title: 'Arrive',
    tagline: '3 minutes of breath before you move — the doorway to every session.',
    em: '🌬️',
    activity: 'mindful',
    minutes: 3,
    level: 'Before anything',
    color: 'plum',
    science: 'Slow breathing with extended exhales shifts the autonomic nervous system toward calm; mindfulness is also linked with actually staying active — people who enjoy and notice movement repeat it.',
    segments: [
      { at: 0, label: 'Land here' },
      { at: 60, label: 'Slow the exhale' },
      { at: 140, label: 'Choose your movement' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Before we move the body, we arrive in it. Stand or sit tall. Feel your feet. Take one unhurried breath.' },
      { at: 30, kind: 'form', say: 'Notice where the body is right now — tired, tight, restless, fine. No fixing. Just noticing. This noticing is what makes movement possible.' },
      { at: 60, kind: 'breath', say: 'Now breathe in for a count of four, and out for a count of six. The long exhale is a hand on the nervous system, telling it: we are safe, we can move.' },
      { at: 100, kind: 'breath', say: 'Again — in for four, out for six. Feel your shoulders drop a centimeter on their own.' },
      { at: 140, kind: 'interval', say: 'From this quieter place, ask: what does my body actually want today? A walk? A stretch? Something strong? The honest answer is the right one.' },
      { at: 165, kind: 'close', say: 'Whatever you chose — go do that now, and carry this attention with you. That was mindfulness. It takes three minutes, and it changes the whole session.' },
    ],
  },
  {
    id: 'reset-walk',
    title: 'The Reset Walk',
    tagline: 'Ten minutes after a meal — the quiet blood-sugar superpower.',
    em: '🍽️',
    activity: 'walk',
    minutes: 10,
    level: 'Anytime',
    color: 'sky',
    science: 'A 2022 meta-analysis found even 2–5 minutes of light walking after eating significantly blunts blood-sugar spikes; your muscles soak up glucose without needing extra insulin.',
    segments: [
      { at: 0, label: 'Just stroll' },
      { at: 300, label: 'Keep it easy' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'This one is beautifully simple: a slow stroll while your body digests. No effort required.' },
      { at: 55, kind: 'science', say: 'Here is what is happening inside: your leg muscles are pulling sugar straight out of your bloodstream to power each step — no insulin needed.' },
      { at: 170, kind: 'science', say: 'Researchers found even two minutes of this flattens the spike after a meal. Ten is a gift.' },
      { at: 300, kind: 'milestone', say: 'Halfway. Keep it gentle — this works best when it feels like nothing.' },
      { at: 430, kind: 'science', say: 'Imagine doing this after one meal a day. Tiny hinge, big door — especially for long-term blood-sugar health.' },
      { at: 550, kind: 'close', say: 'Coming home. Your future self, decades from now, is quietly grateful for walks exactly like this one.' },
    ],
  },
  {
    id: 'first-run',
    title: 'Run Your First Minute',
    tagline: 'Walk-run intervals that make running feel possible.',
    em: '🏃',
    activity: 'run',
    minutes: 20,
    level: 'Beginner',
    color: 'accent',
    science: 'Walk-run interval progressions are how physios build runners safely — and running even 5–10 minutes a day is linked with a 30–45% lower risk of cardiovascular death.',
    segments: [
      { at: 0, label: 'Warm-up walk' },
      { at: 300, label: 'Run 1 · 60s' },
      { at: 360, label: 'Recover · 2 min' },
      { at: 480, label: 'Run 2 · 60s' },
      { at: 540, label: 'Recover · 2 min' },
      { at: 660, label: 'Run 3 · 60s' },
      { at: 720, label: 'Recover · 2 min' },
      { at: 840, label: 'Run 4 · 60s' },
      { at: 900, label: 'Cool-down walk' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Today you become someone who runs. We start with five minutes of brisk walking — wake the legs up.' },
      { at: 90, kind: 'form', say: 'Walk tall. Shoulders down, arms swinging easily. This is the posture we will keep when we run.' },
      { at: 180, kind: 'science', say: 'Running is just walking with a moment of flight. We will visit it four times today, one gentle minute at a time. Walk-run is how physios build runners — it is the safe way in.' },
      { at: 290, kind: 'interval', say: 'Ten seconds. When you start, go slower than feels necessary. Slower than that, even.' },
      { at: 300, kind: 'interval', say: 'Run. Easy and springy.' },
      { at: 330, kind: 'motivate', say: 'Halfway through. Relaxed.' },
      { at: 360, kind: 'interval', say: 'And walk. Beautiful. Shake out your arms — two minutes to recover.' },
      { at: 410, kind: 'science', say: 'Notice your breath settling already. That is your heart doing exactly what it is built to do — and it gets faster at it every week.' },
      { at: 470, kind: 'interval', say: 'Ten seconds to run two. Same story: comically easy pace.' },
      { at: 480, kind: 'interval', say: 'Run. Feel your feet land softly.' },
      { at: 510, kind: 'motivate', say: 'Thirty seconds left. You have got this.' },
      { at: 540, kind: 'interval', say: 'Walk it off. Two of four done.' },
      { at: 590, kind: 'science', say: 'Fun fact for the recovery: even five to ten minutes of running a day is linked with a substantially lower risk of dying from heart disease. You are doing four of those minutes today.' },
      { at: 650, kind: 'interval', say: 'Ten seconds. Third of four — you are more than halfway.' },
      { at: 660, kind: 'interval', say: 'Run. Relax your jaw, relax your hands.' },
      { at: 690, kind: 'motivate', say: 'Smooth. Speed lives in relaxation.' },
      { at: 720, kind: 'interval', say: 'Walk. One more to go, and it is yours.' },
      { at: 780, kind: 'motivate', say: 'Take this recovery all the way down. Big breaths. The last one should feel like the easiest.' },
      { at: 830, kind: 'interval', say: 'Ten seconds. Make this the most relaxed minute of the day.' },
      { at: 840, kind: 'interval', say: 'Run. This is the minute you will remember when you run your first mile.' },
      { at: 870, kind: 'motivate', say: 'Last thirty seconds. Finish it easy.' },
      { at: 900, kind: 'interval', say: 'And walk, all the way home. Four minutes of running that did not exist this morning.' },
      { at: 1020, kind: 'science', say: 'Keep strolling and let the heart rate drift down. This is when the adaptation gets filed away.' },
      { at: 1140, kind: 'close', say: 'Done. Do this three times a week and next week we simply run a little more. That is the entire method.' },
    ],
  },
  {
    id: 'easy-does-it',
    title: 'Easy Does It',
    tagline: 'A 20-minute conversational run. Learn why slow builds fast.',
    em: '🌤️',
    activity: 'run',
    minutes: 20,
    level: 'Comfortable running 10 min',
    color: 'accent',
    science: 'Elite endurance athletes do roughly 80% of training at easy, conversational intensity — low intensity builds the aerobic base (heart stroke volume, mitochondria, fat metabolism) that everything else stands on.',
    segments: [
      { at: 0, label: 'Walk + ease in' },
      { at: 180, label: 'Conversational run' },
      { at: 1080, label: 'Ease home' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Today we practice the hardest skill in running: going easy on purpose. Start with a brisk walk.' },
      { at: 100, kind: 'form', say: 'Roll your shoulders back and let your arms hang loose. In a minute we lift into a jog — the slowest one you own.' },
      { at: 180, kind: 'interval', say: 'Whenever you are ready, lift into the slowest jog you can manage without walking.' },
      { at: 300, kind: 'form', say: 'The test: could you tell a friend about your day right now, in full sentences? If not, slow down. Yes, more.' },
      { at: 480, kind: 'science', say: 'Here is the science: at this easy intensity you are building mitochondria — the tiny engines in your muscle cells — and teaching your heart to pump more blood per beat.' },
      { at: 660, kind: 'science', say: 'The pros run most of their miles like this. Slow is not the absence of training. Slow IS the training.' },
      { at: 840, kind: 'form', say: 'Check in: shoulders low, hands soft, breath through the nose if it comes easy.' },
      { at: 1000, kind: 'motivate', say: 'A few minutes left at this lovely, sustainable rhythm. This pace is a place you can always come back to.' },
      { at: 1080, kind: 'interval', say: 'Start easing down toward a walk whenever you like.' },
      { at: 1170, kind: 'close', say: 'Done. Runs like this are deposits in a bank account called your aerobic base. It compounds.' },
    ],
  },
  {
    id: 'morning-sun',
    title: 'Morning Sun Walk',
    tagline: '12 minutes of daylight to set your body clock.',
    em: '🌅',
    activity: 'walk',
    minutes: 12,
    level: 'Anytime',
    color: 'gold',
    science: 'Morning outdoor light is the strongest signal for setting your circadian clock — anchoring it earlier is associated with easier sleep onset at night and better mood and alertness by day.',
    segments: [
      { at: 0, label: 'Out the door' },
      { at: 360, label: 'Light + rhythm' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Good morning. The single goal today: get daylight into your eyes while your body moves. Everything else is a bonus.' },
      { at: 85, kind: 'science', say: 'Outdoor light — even on a cloudy day — is ten to fifty times brighter than indoor light. Your brain is reading it right now and setting its clock.' },
      { at: 240, kind: 'science', say: 'That clock decides tonight: when melatonin rises, how easily you fall asleep. You are literally walking your way to better sleep.' },
      { at: 360, kind: 'interval', say: 'Pick up the pace just a little now — enough to feel warm.' },
      { at: 480, kind: 'science', say: 'Morning movement also nudges cortisol into its healthy morning peak. That is what good energy actually feels like.' },
      { at: 600, kind: 'breath', say: 'Take one slow breath of morning air on purpose. This is what a routine worth keeping feels like.' },
      { at: 690, kind: 'close', say: 'Done. Do this three mornings this week and watch what happens to your evenings.' },
    ],
  },
  {
    id: 'desk-rescue',
    title: 'Desk Rescue',
    tagline: 'A 5-minute movement snack that undoes the sitting.',
    em: '🧑‍💻',
    activity: 'stretch',
    minutes: 5,
    level: 'Anytime',
    color: 'sky',
    science: 'Short "exercise snacks" — even one-minute bursts through the day — improve fitness and glucose control; breaking up sitting every 30–60 minutes measurably improves blood sugar and blood pressure.',
    segments: [
      { at: 0, label: 'Stand + reach' },
      { at: 60, label: 'Squats' },
      { at: 130, label: 'Hips + chest' },
      { at: 210, label: 'March it out' },
    ],
    cues: [
      { at: 0, kind: 'interval', say: 'Stand up. Reach both arms to the ceiling and stretch tall — really reach.' },
      { at: 30, kind: 'form', say: 'Now roll your shoulders back, slowly, five times. Let your jaw unclench while you are at it.' },
      { at: 60, kind: 'interval', say: 'Ten slow squats to a chair — sit back, lightly touch down, stand tall.' },
      { at: 95, kind: 'science', say: 'Your biggest muscles just woke up and started clearing sugar from your blood — no insulin required.' },
      { at: 130, kind: 'interval', say: 'Stand tall, hands on hips, slow circles with your hips — five each way. Then clasp your hands behind your back and open your chest.' },
      { at: 170, kind: 'form', say: 'Breathe into that open chest. This is the exact posture sitting steals from you.' },
      { at: 210, kind: 'interval', say: 'March in place, knees high, big arm swings. Thirty seconds of being gloriously unprofessional.' },
      { at: 250, kind: 'motivate', say: 'Fifteen more seconds. Make them silly.' },
      { at: 275, kind: 'close', say: 'Done. Scientists call these exercise snacks, and sprinkled through a day they genuinely add up. Same time tomorrow?' },
    ],
  },
  {
    id: 'wind-down',
    title: 'Wind-Down Flow',
    tagline: '12 gentle minutes of yoga to hand the day back.',
    em: '🌙',
    activity: 'yoga',
    minutes: 12,
    level: 'Anytime',
    color: 'plum',
    science: 'Gentle yoga and slow breathing shift the nervous system toward its parasympathetic "rest and digest" mode; meta-analyses find yoga meaningfully improves sleep quality.',
    segments: [
      { at: 0, label: 'Arrive + breathe' },
      { at: 120, label: 'Cat–cow + child’s pose' },
      { at: 360, label: 'Forward folds' },
      { at: 540, label: 'Legs up + rest' },
    ],
    cues: [
      { at: 0, kind: 'breath', say: 'Find a bit of floor. Sit comfortably, close your eyes, and take five slow breaths — make each exhale a little longer than the inhale.' },
      { at: 75, kind: 'science', say: 'That longer exhale is a lever on your nervous system — it tells your heart, quite literally, to slow down.' },
      { at: 120, kind: 'interval', say: 'Come to hands and knees. Inhale, drop the belly and look up. Exhale, round the spine like a cat. Flow with your breath, eight slow rounds.' },
      { at: 250, kind: 'interval', say: 'Sink your hips back toward your heels, arms long — child’s pose. Let your forehead rest. Stay and breathe.' },
      { at: 360, kind: 'interval', say: 'Slowly stand, feet wide, and fold forward, knees soft as you like. Hang like a rag doll. Sway gently if that feels good.' },
      { at: 470, kind: 'form', say: 'Roll up one vertebra at a time. Notice how much slower everything feels than ten minutes ago.' },
      { at: 540, kind: 'interval', say: 'Lie on your back and rest your legs up a wall or a chair. Arms wide. Nothing to do now but breathe.' },
      { at: 660, kind: 'breath', say: 'Let your body be heavy. The day is done, and you did enough.' },
      { at: 705, kind: 'close', say: 'When you are ready, roll to one side and come up slowly. Sleep well.' },
    ],
  },
  {
    id: 'strong-start',
    title: 'Strong Start',
    tagline: '15 minutes of bodyweight strength. No equipment, all of you.',
    em: '💪',
    activity: 'strength',
    minutes: 15,
    level: 'Beginner',
    color: 'accent',
    science: 'Guidelines call for muscle-strengthening twice a week; it preserves the 3–8% of muscle mass per decade adults otherwise lose after 30, and independently lowers risk of early death by 10–17% in meta-analyses.',
    segments: [
      { at: 0, label: 'Warm-up' },
      { at: 120, label: 'Round 1' },
      { at: 400, label: 'Round 2' },
      { at: 680, label: 'Round 3' },
      { at: 810, label: 'Cool-down' },
    ],
    cues: [
      { at: 0, kind: 'interval', say: 'Two minutes to warm up: march in place, roll your shoulders, swing your arms, circle your hips. Get a little silly with it.' },
      { at: 120, kind: 'interval', say: 'Round one. Ten squats to a chair — slow down, powerful up. Rest as long as you need after.' },
      { at: 210, kind: 'interval', say: 'Now a wall push-up or counter push-up — ten, chest proud, body in one line.' },
      { at: 250, kind: 'form', say: 'Strength is a posture before it is a muscle. Keep that line from head to heels.' },
      { at: 310, kind: 'interval', say: 'Finish the round: thirty seconds of glute bridges. Squeeze at the top like you mean it.' },
      { at: 400, kind: 'interval', say: 'Round two, same three moves. Squats first — notice your balance is already steadier.' },
      { at: 490, kind: 'interval', say: 'Push-ups again. Ten of them, best form you have got.' },
      { at: 530, kind: 'science', say: 'Fun fact while you press: muscle is the organ of longevity. Grip and strength predict healthy aging so well that researchers treat them as vital signs.' },
      { at: 590, kind: 'interval', say: 'Bridges. Your glutes are the biggest muscle you own — wake the giant.' },
      { at: 680, kind: 'interval', say: 'Last round — just squats and push-ups, best form of the day. Quality over everything.' },
      { at: 750, kind: 'motivate', say: 'This is the round that counts. Slow and strong.' },
      { at: 810, kind: 'interval', say: 'Shake it out and stretch anything that asks.' },
      { at: 860, kind: 'close', say: 'Done. Twice a week of this and you are meeting the strength guideline most people have never even heard of. You are literally stronger than you were this morning.' },
    ],
  },
  {
    id: 'noticing-walk',
    title: 'The Noticing Walk',
    tagline: '15 minutes of walking meditation — movement and mindfulness are one thing.',
    em: '🧘',
    activity: 'mindful',
    minutes: 15,
    level: 'Anytime',
    color: 'plum',
    science: 'Mindful walking programs reduce psychological distress in trials, and interoception — sensing the body from within — is trainable; it is the skill that lets you pace, rest, and enjoy movement instead of enduring it.',
    segments: [
      { at: 0, label: 'Feet' },
      { at: 240, label: 'Breath' },
      { at: 480, label: 'Senses' },
      { at: 720, label: 'Open attention' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'This is a walk where the destination is your own attention. Start walking at an easy pace, and put all of it in your feet — heel, roll, toe. Heel, roll, toe.' },
      { at: 120, kind: 'breath', say: 'The mind will wander. That is not failure — noticing it wandered and coming back to the feet IS the exercise. Every return is one repetition.' },
      { at: 240, kind: 'breath', say: 'Now let the breath take center stage. Do not change it — just count steps per breath. In for three steps? Out for four? Watch the rhythm your body already chose.' },
      { at: 400, kind: 'science', say: 'Body and breath moving together like this is older than every workout ever invented. You are doing the original movement practice.' },
      { at: 480, kind: 'breath', say: 'Widen out to the senses. Find three sounds, near and far. Two things you can feel — air on skin, sun, the ground. One thing you can smell.' },
      { at: 620, kind: 'science', say: 'This is what the research calls interoception, and it is trainable — the better you sense your body, the better you pace it, rest it, and enjoy it.' },
      { at: 720, kind: 'breath', say: 'For the last stretch, hold it all loosely — feet, breath, world. Just walk, awake.' },
      { at: 860, kind: 'close', say: 'Coming home now. You did two practices at once — and each one deepens the other. Carry the noticing into the next hour.' },
    ],
  },
  {
    id: 'gratitude-mile',
    title: 'The Gratitude Mile',
    tagline: 'An 18-minute walk for the head and the heart.',
    em: '🍃',
    activity: 'walk',
    minutes: 18,
    level: 'Anytime',
    color: 'brand',
    science: 'Walking reliably lowers state anxiety and rumination — especially outdoors — and gratitude practice is one of the best-replicated wellbeing interventions in psychology. This session stacks them.',
    segments: [
      { at: 0, label: 'Arrive' },
      { at: 240, label: 'Three good things' },
      { at: 780, label: 'Carry it home' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'This walk has one job: to leave you lighter than it found you. Start at any pace that feels like kindness.' },
      { at: 120, kind: 'form', say: 'Let your walking find its own rhythm. Rhythm is half of why walking soothes us — it gives the mind a drumbeat to rest on.' },
      { at: 240, kind: 'breath', say: 'First question, take your time: what is one small thing from today you are glad happened?' },
      { at: 420, kind: 'breath', say: 'Second: who is one person you are grateful is in your life? Picture their face. Maybe tell them later.' },
      { at: 600, kind: 'breath', say: 'Third: what is one thing your body did for you today without being thanked? It has been beating your heart all day, for a start.' },
      { at: 780, kind: 'science', say: 'Research finds naming three good things, regularly, measurably lifts wellbeing for months. You just did it moving.' },
      { at: 930, kind: 'motivate', say: 'Last few minutes. Walk them however you like — you have earned an unsupervised mind.' },
      { at: 1050, kind: 'close', say: 'Home stretch. Lighter than it found you — that was the deal.' },
    ],
  },
  {
    id: 'just-ten',
    title: 'Just Ten',
    tagline: 'Ten minutes, any movement, zero pressure. Beat the couch.',
    em: '✨',
    activity: 'other',
    minutes: 10,
    level: 'Low-energy days',
    color: 'gold',
    science: 'Behavioral science finds starting is the hardest part — and mood improves within 10 minutes of light movement. On low days, a tiny promise kept beats a big plan broken.',
    segments: [
      { at: 0, label: 'Anything counts' },
      { at: 300, label: 'You showed up' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Low-energy day? Perfect — this session was built for exactly this. Walk, stretch, sway, pace the hallway. Anything that is not sitting still counts.' },
      { at: 90, kind: 'science', say: 'You do not need motivation to start. Starting is what creates the motivation. That is not a slogan, it is how the brain actually orders it.' },
      { at: 300, kind: 'milestone', say: 'Halfway. Notice your mood — studies find it lifts within about ten minutes of gentle movement. You are inside the window right now.' },
      { at: 450, kind: 'motivate', say: 'Whatever you are doing, do one more easy minute of it. Not harder. Just one more.' },
      { at: 555, kind: 'close', say: 'Done. Today you kept a promise to yourself on a hard day. That is the strongest training effect there is.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// The progression ladder. These exist so a beginner can climb from one minute
// of running to a 5K over eight weeks without ever facing a jump that feels
// impossible. Same timing discipline as above: countdown before every
// transition, short encouragement during effort, teaching in the recoveries.
// ---------------------------------------------------------------------------

// Builds the repetitive interval scaffolding so the ladder stays consistent
// and the timings can't drift apart by hand.
function intervalSession({ id, title, tagline, minutes, level, science, warmup, reps, runSec, walkSec, cues }) {
  const segments = [{ at: 0, label: 'Warm-up walk' }];
  let t = warmup;
  for (let i = 0; i < reps; i++) {
    segments.push({ at: t, label: `Run ${i + 1} · ${runSec / 60 >= 1 ? runSec / 60 + ' min' : runSec + 's'}` });
    t += runSec;
    if (i < reps - 1) {
      segments.push({ at: t, label: `Recover · ${Math.round(walkSec / 60)} min` });
      t += walkSec;
    }
  }
  segments.push({ at: t, label: 'Cool-down walk' });
  return {
    id, title, tagline, em: '🏃', activity: 'run', minutes, level,
    color: 'accent', science, segments,
    cues: cues({ warmup, runSec, walkSec, reps, total: minutes * 60 }),
  };
}

// Cue script shared by every rung of the ladder — the words change with the
// rung, the shape does not.
function ladderCues(teachings) {
  return ({ warmup, runSec, walkSec, reps, total }) => {
    const c = [
      { at: 0, kind: 'welcome', say: 'Welcome back. Five easy minutes of walking first — no rush, we are just waking the legs.' },
      { at: 90, kind: 'form', say: 'Walk tall, shoulders down, arms swinging easy. Same posture we will keep when we run.' },
      { at: 200, kind: 'science', say: teachings[0] },
    ];
    let t = warmup;
    for (let i = 0; i < reps; i++) {
      c.push({ at: t - 10, kind: 'interval', say: i === 0 ? 'Ten seconds. Start slower than feels necessary.' : `Ten seconds to run ${i + 1}.` });
      c.push({ at: t, kind: 'interval', say: i === 0 ? 'Run. Easy and springy.' : 'Run. Same easy pace.' });
      if (runSec >= 240) c.push({ at: t + Math.round(runSec / 2), kind: 'motivate', say: 'Halfway through this one. Relax your hands, relax your jaw.' });
      else c.push({ at: t + Math.round(runSec * 0.6), kind: 'motivate', say: 'Nearly there. Stay smooth.' });
      t += runSec;
      if (i < reps - 1) {
        c.push({ at: t, kind: 'interval', say: `And walk. ${i + 1} of ${reps} done — shake the arms out.` });
        const teach = teachings[1 + (i % Math.max(1, teachings.length - 1))];
        if (teach) c.push({ at: t + Math.round(walkSec * 0.4), kind: 'science', say: teach });
        t += walkSec;
      }
    }
    c.push({ at: t, kind: 'interval', say: 'And walk it home. Every one of those is in the bank now.' });
    c.push({ at: total - 60, kind: 'close', say: 'Done. This is what building looks like — small rungs, climbed on purpose. See you next session.' });
    return c;
  };
}

sessions.push(
  intervalSession({
    id: 'run-2min', title: 'Two-Minute Runs', tagline: 'Five runs of two minutes. The first real rung up.',
    minutes: 25, level: 'After your first minute', warmup: 300, reps: 5, runSec: 120, walkSec: 90,
    science: 'Progressive overload with full recoveries is how running is built safely — adding a little each week lets tendons and bone adapt alongside the heart and lungs, which adapt faster.',
    cues: ladderCues([
      'Two minutes today instead of one. That is not a small step — it is double, and your body is ready for it.',
      'Your tendons and bones adapt more slowly than your heart and lungs. That is exactly why we climb in small rungs like this.',
      'Notice how the recovery walk feels shorter than it did last week. That is your heart getting better at its job.',
      'Every easy recovery is doing real work — it is teaching your body to clear effort and go again.',
    ]),
  }),
  intervalSession({
    id: 'run-3min', title: 'Three-Minute Runs', tagline: 'Four runs of three minutes. Rhythm starts to appear.',
    minutes: 25, level: 'Comfortable with 2-minute runs', warmup: 300, reps: 4, runSec: 180, walkSec: 120,
    science: 'Around the three-minute mark your aerobic system takes over from the fast-burning stuff — this is where the endurance engine you are building actually starts to run the show.',
    cues: ladderCues([
      'Three minutes today. Somewhere in here, your aerobic engine takes the wheel — that is the system we are building.',
      'If you can still talk in full sentences, you are exactly right. Speed is not the point for months yet.',
      'Your body is making more mitochondria — tiny engines inside muscle cells — every time you do this.',
      'Runners call this base building. It is unglamorous, and it is the whole foundation.',
    ]),
  }),
  intervalSession({
    id: 'run-5min', title: 'Five-Minute Runs', tagline: 'Three runs of five minutes. Now you are a runner.',
    minutes: 28, level: 'Comfortable with 3-minute runs', warmup: 300, reps: 3, runSec: 300, walkSec: 150,
    science: 'Five continuous minutes is a real aerobic effort — and running just 5–10 minutes a day is associated with a 30–45% lower risk of cardiovascular death.',
    cues: ladderCues([
      'Five minutes at a time today. Worth knowing: five to ten minutes of running a day is linked with a substantially lower risk of dying from heart disease.',
      'Settle in. Long efforts are won by starting slower than you want to.',
      'This is the pace you will build everything else on. Learn how it feels.',
      'Three of these is fifteen minutes of running. A month ago that was four separate minutes.',
    ]),
  }),
  intervalSession({
    id: 'run-10min', title: 'Ten-Minute Runs', tagline: 'Two runs of ten minutes. The 5K is close now.',
    minutes: 30, level: 'Comfortable with 5-minute runs', warmup: 300, reps: 2, runSec: 600, walkSec: 180,
    science: 'Two ten-minute efforts with a walk between them is nearly the full 5K distance for most beginners — the body is ready well before the mind believes it.',
    cues: ladderCues([
      'Ten minutes at a time today. Add these two together and you are within touching distance of a 5K.',
      'Long and easy. If you are wondering whether to slow down, slow down.',
      'Your body is ready for this before your mind believes it. That gap is normal, and it closes.',
      'One more of these. You already know you can do it — you just did.',
    ]),
  }),
  {
    id: 'run-5k',
    title: 'Your 5K',
    tagline: 'The day it all adds up. Continuous, easy, yours.',
    em: '🏅',
    activity: 'run',
    minutes: 35,
    level: 'The finish line',
    color: 'gold',
    science: 'Eight weeks of walk-run progression is the standard, evidence-backed route from non-runner to 5K — the same structure physios use, because full recoveries let connective tissue keep pace with the heart.',
    segments: [
      { at: 0, label: 'Warm-up walk' },
      { at: 300, label: 'Your 5K' },
      { at: 1800, label: 'Cool-down walk' },
    ],
    cues: [
      { at: 0, kind: 'welcome', say: 'Today is the day. Five minutes of walking first — and while you walk, remember where this started: one single minute of running, and you were not sure about that either.' },
      { at: 120, kind: 'form', say: 'No pressure on time today. The only goal is to keep moving until it is done.' },
      { at: 240, kind: 'science', say: 'Everything you need for this you already built. Eight weeks of small rungs — that is the entire method, and it works.' },
      { at: 290, kind: 'interval', say: 'Ten seconds. Start absurdly easy. You have plenty of time to feel good later.' },
      { at: 300, kind: 'interval', say: 'And run. This is your 5K.' },
      { at: 480, kind: 'form', say: 'Settle. Shoulders down, hands soft, breathing you could hold a conversation through.' },
      { at: 780, kind: 'motivate', say: 'You are moving beautifully. Nothing to prove, just keep the rhythm.' },
      { at: 1080, kind: 'milestone', say: 'You are past halfway. From here it is just repeating what you already know how to do.' },
      { at: 1380, kind: 'motivate', say: 'This is the part you will be proud of. Stay easy — walking a little is completely allowed and changes nothing.' },
      { at: 1620, kind: 'motivate', say: 'Final stretch. Whatever pace, you are finishing this.' },
      { at: 1800, kind: 'interval', say: 'Ease down to a walk whenever you are ready. That is your 5K.' },
      { at: 1880, kind: 'close', say: 'You are a person who runs 5Ks now. That is not a phrase you would have used about yourself two months ago. Walk it out, and be genuinely proud.' },
    ],
  },
  {
    id: 'strong-build',
    title: 'Strong Build',
    tagline: '20 minutes. Same moves, more of you in them.',
    em: '🏋️',
    activity: 'strength',
    minutes: 20,
    level: 'After a few Strong Starts',
    color: 'accent',
    science: 'Progressive overload is the whole principle of strength: adding reps, range or slowness over time is what keeps muscle adapting, and 30–60 min/week of strengthening is associated with 10–17% lower all-cause mortality.',
    segments: [
      { at: 0, label: 'Warm-up' },
      { at: 120, label: 'Round 1' },
      { at: 420, label: 'Round 2' },
      { at: 720, label: 'Round 3' },
      { at: 1020, label: 'Cool-down' },
    ],
    cues: [
      { at: 0, kind: 'interval', say: 'Two minutes to warm up — march, roll the shoulders, swing the arms, circle the hips. Wake everything up.' },
      { at: 120, kind: 'interval', say: 'Round one. Twelve squats — and slow the lowering down to three full seconds. Slow is the progression today.' },
      { at: 200, kind: 'science', say: 'That slow lowering is called eccentric work, and it is one of the most reliable ways to build strength without adding any weight at all.' },
      { at: 260, kind: 'interval', say: 'Push-ups next — twelve, from a lower surface than last time if you can. Chest proud, body one line.' },
      { at: 340, kind: 'interval', say: 'Finish the round: forty-five seconds of glute bridges, squeezing hard at the top.' },
      { at: 420, kind: 'interval', say: 'Round two. Squats again — same three-second lowering. Your legs know this now.' },
      { at: 520, kind: 'form', say: 'Knees tracking over your toes, weight through the whole foot. Form before everything.' },
      { at: 580, kind: 'interval', say: 'Push-ups. Twelve more, best quality you have got.' },
      { at: 660, kind: 'interval', say: 'Bridges. Forty-five seconds. Squeeze like you mean it.' },
      { at: 720, kind: 'interval', say: 'Round three — the one that counts. Squats first.' },
      { at: 820, kind: 'science', say: 'Half an hour of this a week is associated with a meaningfully lower risk of dying early, independent of any cardio you do. Half an hour.' },
      { at: 880, kind: 'interval', say: 'Last set of push-ups. However many are honest — quality over count.' },
      { at: 950, kind: 'motivate', say: 'Final bridges. Finish strong, finish proud.' },
      { at: 1020, kind: 'interval', say: 'Shake it out. Stretch whatever asks for it — hips, chest, the fronts of the thighs.' },
      { at: 1140, kind: 'close', say: 'Done. Stronger than the last one, which was stronger than the one before. That is the whole game.' },
    ],
  },
);

export const sessionById = id => sessions.find(s => s.id === id);
