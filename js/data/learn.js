// The Learn library. Short, warm, honest — and every claim traceable to the
// research listed at the bottom of each piece. Education, not medical advice.

export const categories = [
  { id: 'foundations', name: 'Foundations', color: 'brand' },
  { id: 'body', name: 'Heart & blood sugar', color: 'accent' },
  { id: 'fuel', name: 'Fuel & water', color: 'sky' },
  { id: 'rhythm', name: 'Timing, fasting & sleep', color: 'gold' },
  { id: 'mind', name: 'Mind & together', color: 'plum' },
];

export const articles = [
  {
    id: 'movement-is-medicine',
    cat: 'foundations',
    em: '💊',
    read: 3,
    title: 'Movement is medicine (and the dose is friendlier than you think)',
    lede: 'The world’s health authorities agree on remarkably little. This, they agree on.',
    body: `
<p>If movement were a pill, it would be the most prescribed drug on Earth. Regular physical activity lowers the risk of heart disease, stroke, type 2 diabetes, at least eight cancers, dementia, depression, and early death from any cause. Physical <em>in</em>activity, meanwhile, is estimated to contribute to millions of premature deaths a year — a public-health burden in the same league as smoking.</p>
<p>The official dose, from the World Health Organization: <b>150–300 minutes a week of moderate activity</b> (a brisk walk counts), or 75–150 minutes of vigorous activity, plus <b>muscle-strengthening twice a week</b>. That's the target — not the entry fee.</p>
<h3>The part almost everyone misses</h3>
<p>The benefit curve is steepest at the bottom. Going from <em>nothing</em> to <em>a little</em> delivers the largest health returns of any step on the curve. The WHO dropped its old rule that activity only counted in 10-minute chunks: <b>every minute counts now</b>. Two flights of stairs count. The far parking spot counts.</p>
<p>So if 150 minutes sounds like a mountain, ignore the mountain. Find five minutes today. The evidence says that first five is worth more, gram for gram, than the last fifty of an athlete's week.</p>`,
    tryThis: 'Pick the smallest movement you would actually do today — one walk around the block, one song danced to — and do it before the day ends. That’s the whole assignment.',
    refs: [
      'World Health Organization. WHO guidelines on physical activity and sedentary behaviour. 2020 (Bull FC et al., Br J Sports Med 2020;54:1451–62).',
      'Lee IM et al. Effect of physical inactivity on major non-communicable diseases worldwide. Lancet 2012;380:219–29.',
      '2018 Physical Activity Guidelines Advisory Committee Scientific Report, U.S. Dept. of Health and Human Services.',
    ],
  },
  {
    id: 'heart',
    cat: 'body',
    em: '❤️',
    read: 3,
    title: 'Your heart on movement',
    lede: 'A muscle that remodels itself to match the life you live.',
    body: `
<p>Your heart is a pump that renovates itself based on demand. Ask more of it — regularly, gently — and it responds like any muscle: the chamber grows slightly, each beat pushes more blood, and your resting heart rate drifts down because the same job now takes fewer beats.</p>
<h3>What the trials show</h3>
<ul>
<li><b>Blood pressure:</b> regular aerobic exercise lowers blood pressure by roughly 5–8 mmHg in people with hypertension — in the range of a first-line medication.</li>
<li><b>Cholesterol:</b> activity nudges HDL (the “cleanup” lipoprotein) up and triglycerides down.</li>
<li><b>Risk:</b> running just 5–10 minutes a day, even at slow speeds, is associated with a 30% lower risk of all-cause death and 45% lower risk of cardiovascular death.</li>
</ul>
<p>And it is never too late to start. Studies of people who become active in middle age show they recover much of the risk profile of the always-active. The heart forgives, and it forgives quickly.</p>
<h3>What “moderate” feels like</h3>
<p>You can talk, but you couldn’t sing. That’s the whole test — no gadgets required. A brisk walk that makes conversation slightly effortful is precision medicine for the cardiovascular system.</p>`,
    tryThis: 'On your next walk, use the talk test: find the pace where full sentences are possible but singing isn’t. Memorize how it feels — that’s your “moderate.”',
    refs: [
      'Cornelissen VA, Smart NA. Exercise training for blood pressure: a systematic review and meta-analysis. J Am Heart Assoc 2013;2:e004473.',
      'Lee DC et al. Leisure-time running reduces all-cause and cardiovascular mortality risk. J Am Coll Cardiol 2014;64:472–81.',
      'American Heart Association. Getting Active to Control High Blood Pressure (heart.org).',
    ],
  },
  {
    id: 'blood-sugar',
    cat: 'body',
    em: '🩸',
    read: 4,
    title: 'The blood-sugar superpower in your legs',
    lede: 'Your muscles can pull sugar out of your blood without asking insulin’s permission.',
    body: `
<p>Here is one of the most useful facts in all of metabolic health: <b>contracting muscle takes up glucose from the blood through a doorway that doesn’t require insulin.</b> When you move — even gently — your leg muscles open that door (a transporter called GLUT4) and quietly drain the sugar spike from your last meal.</p>
<h3>The after-meal walk</h3>
<p>A 2022 meta-analysis found that light walking after eating significantly blunts the post-meal glucose spike compared with sitting — with measurable effects from as little as <b>2–5 minutes</b>. The best window is within about 60–90 minutes of eating, while glucose is peaking.</p>
<h3>The bigger picture</h3>
<p>In the landmark Diabetes Prevention Program, people at high risk of type 2 diabetes who walked about 150 minutes a week (plus modest diet changes) cut their odds of developing diabetes by <b>58%</b> — nearly double the effect of the medication arm. And for people already living with diabetes, the American Diabetes Association recommends breaking up sitting with light movement every 30 minutes, because it measurably improves glucose control.</p>
<p>None of this requires a gym. It requires a hallway.</p>`,
    tryThis: 'After your biggest meal today, stroll for 10 minutes — around the block, around the kitchen, anywhere. (Try the “Reset Walk” guided session — it talks you through the science as you go.)',
    refs: [
      'Buffey AJ et al. The acute effects of interrupting prolonged sitting with standing or light walking on postprandial glycemia: a systematic review and meta-analysis. Sports Med 2022;52:1765–87.',
      'Knowler WC et al. Reduction in the incidence of type 2 diabetes with lifestyle intervention or metformin (DPP). N Engl J Med 2002;346:393–403.',
      'Colberg SR et al. Physical activity/exercise and diabetes: ADA position statement. Diabetes Care 2016;39:2065–79.',
    ],
  },
  {
    id: 'steps',
    cat: 'foundations',
    em: '👟',
    read: 3,
    title: '10,000 steps was a marketing slogan',
    lede: 'The real number is friendlier — and the science of steps is genuinely good news.',
    body: `
<p>The famous 10,000 came from a 1965 Japanese pedometer called the <em>manpo-kei</em> — literally “10,000-step meter.” Catchy name; never a scientific finding.</p>
<p>When researchers pooled data from over 47,000 people across 15 studies, the picture that emerged was kinder: risk of early death dropped steeply up to about <b>6,000–8,000 steps a day for adults 60+</b>, and about <b>8,000–10,000 for younger adults</b> — then leveled off. People taking ~7,000 steps had roughly half the mortality risk of those taking ~3,500.</p>
<h3>How to read that</h3>
<ul>
<li>If you’re near 3,000 today, the trip to 5,000 is one of the highest-value health upgrades available to you.</li>
<li>Pace matters less than volume for longevity — a stroll and a march both count the steps.</li>
<li>There is no cliff at any number. Steps are a gradient, not a pass/fail exam.</li>
</ul>
<p>Steps are just a proxy for a life with movement woven through it — errands on foot, phone calls while pacing, stairs taken because they were there.</p>`,
    tryThis: 'Don’t chase a number this week. Instead, attach steps to something you already do: pace during one phone call a day, or walk to the farther coffee spot.',
    refs: [
      'Paluch AE et al. Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts. Lancet Public Health 2022;7:e219–28.',
      'Tudor-Locke C, Bassett DR. How many steps/day are enough? Sports Med 2004;34:1–8 (origin of manpo-kei).',
    ],
  },
  {
    id: 'exercise-snacks',
    cat: 'foundations',
    em: '🍿',
    read: 3,
    title: 'Exercise snacks: the one-minute workout is real',
    lede: 'Tiny bursts of movement, scattered through an ordinary day, show up in mortality data.',
    body: `
<p>In 2022, researchers used wrist-worn trackers on over 25,000 people who did <em>no</em> deliberate exercise at all, and looked for something they called VILPA — vigorous intermittent lifestyle physical activity. Think: hurrying for the bus, taking stairs two at a time, carrying groceries up a hill.</p>
<p>The finding was startling: just <b>three or four one-to-two-minute bursts a day</b> were associated with around <b>40% lower all-cause mortality</b> and nearly 50% lower cardiovascular mortality, compared with people who had none.</p>
<h3>The snack menu</h3>
<ul>
<li>Take every staircase like it’s a tiny hill workout.</li>
<li>Walk the fast last block — arrive slightly breathless, on purpose.</li>
<li>Ten squats while the kettle boils; a brisk hallway lap between meetings.</li>
</ul>
<p>Controlled trials back this up: stair-climbing “snacks” of three 20-second to one-minute efforts, a few times a day, measurably improve cardiorespiratory fitness in weeks. Your body doesn’t need your movement to arrive in neat 45-minute packages. It just needs it to arrive.</p>`,
    tryThis: 'Pick one “snack trigger” for this week — every time it happens (kettle, elevator, ad break), you move for 60 seconds. (The “Desk Rescue” session is a ready-made snack.)',
    refs: [
      'Stamatakis E et al. Association of wearable device-measured vigorous intermittent lifestyle physical activity with mortality. Nat Med 2022;28:2521–29.',
      'Jenkins EM et al. Do stair climbing exercise “snacks” improve cardiorespiratory fitness? Appl Physiol Nutr Metab 2019;44:681–84.',
      'Islam H, Gibala MJ, Little JP. Exercise snacks: a novel strategy to improve cardiometabolic health. Exerc Sport Sci Rev 2022;50:31–37.',
    ],
  },
  {
    id: 'strength',
    cat: 'foundations',
    em: '💪',
    read: 3,
    title: 'The guideline nobody talks about: strength, twice a week',
    lede: 'Muscle is your metabolic engine now and your independence later.',
    body: `
<p>Everyone has heard of the 150 minutes. Almost nobody has heard the second half of the guideline: <b>muscle-strengthening activity at least twice a week.</b> Fewer than a third of adults meet it — which is a shame, because the evidence is superb.</p>
<p>A 2022 meta-analysis found that 30–60 minutes per week of strength work was associated with <b>10–17% lower risk of death from all causes</b>, cardiovascular disease, and cancer — independent of aerobic exercise.</p>
<h3>Why muscle matters so much</h3>
<ul>
<li>After 30, adults lose roughly <b>3–8% of muscle per decade</b> unless they push back. Strength training is the push-back.</li>
<li>Muscle is your largest site of glucose disposal — more muscle, calmer blood sugar.</li>
<li>Grip strength predicts healthy aging so well that researchers use it as a vital sign.</li>
</ul>
<h3>It’s smaller than you think</h3>
<p>“Strength training” conjures gyms and grunting. The guideline is satisfied by bodyweight squats, wall push-ups, carrying heavy groceries, hard gardening, resistance bands. Two sessions of 15 minutes. That’s the whole ask.</p>`,
    tryThis: 'Do the “Strong Start” guided session once this week — then once more. Congratulations: you’re meeting a guideline most people have never heard of.',
    refs: [
      'Momma H et al. Muscle-strengthening activities are associated with lower risk of mortality and major NCDs: a meta-analysis. Br J Sports Med 2022;56:755–63.',
      'Volpi E et al. Muscle tissue changes with aging. Curr Opin Clin Nutr Metab Care 2004;7:405–10.',
      'Leong DP et al. Prognostic value of grip strength (PURE study). Lancet 2015;386:266–73.',
    ],
  },
  {
    id: 'water',
    cat: 'fuel',
    em: '💧',
    read: 3,
    title: 'Water: the boring advice that actually holds up',
    lede: 'No magic gallon. Just a body that runs noticeably better topped up.',
    body: `
<p>The classic “8 glasses” is folklore, but the real guidance isn’t far off. The U.S. National Academies put adequate total water intake around <b>3.7 liters a day for men and 2.7 for women</b> — with a crucial asterisk: that includes the ~20% that arrives in food, and coffee and tea count toward it too.</p>
<h3>The honest signals</h3>
<ul>
<li><b>Thirst works.</b> For everyday life, drinking when thirsty keeps most healthy people in balance.</li>
<li><b>Urine color</b> is the low-tech lab test: pale straw = fine; apple juice = drink up.</li>
<li>Even mild dehydration (1–2% of body weight) measurably dents mood, focus, and the way exercise feels — moving feels harder than it should.</li>
</ul>
<h3>Moving and sweating</h3>
<p>For sessions under an hour, water is all you need — drink to thirst before and after. Going long or sweating hard? Add fluids with electrolytes. And a practical trick that beats willpower: put water where your day already happens. A full glass by the kettle, a bottle by your keys.</p>`,
    tryThis: 'Tap the water cups on your Today screen after each glass. Aim for pale-straw urine, not a heroic number.',
    refs: [
      'Institute of Medicine (US). Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate. National Academies Press, 2005.',
      'Armstrong LE et al. Mild dehydration affects mood in healthy young women. J Nutr 2012;142:382–88.',
      'American College of Sports Medicine. Exercise and fluid replacement position stand. Med Sci Sports Exerc 2007;39:377–90.',
    ],
  },
  {
    id: 'fuel',
    cat: 'fuel',
    em: '🥗',
    read: 4,
    title: 'Calories & macros, without the fear',
    lede: 'Food is fuel and pleasure. Movement is not a debt you pay for eating.',
    body: `
<p>First, the frame this app will always use: <b>you do not exercise to “earn” food, and you do not eat to “deserve” rest.</b> Punishment framing is both joyless and — the research is clear — a poor long-term motivator. Here’s what’s actually useful to know.</p>
<h3>Calories: movement’s honest share</h3>
<p>A 30-minute brisk walk burns roughly 120–180 calories — real, but modest next to what diet changes can do. Movement’s superpower isn’t the burn; it’s everything else: insulin sensitivity, blood pressure, mood, sleep, muscle. Move because it makes you well, not to erase a cookie.</p>
<h3>Macros, in three sentences</h3>
<ul>
<li><b>Protein</b> repairs and builds muscle. Active adults do well around <b>1.2–2.0 g per kg of body weight daily</b>, spread across meals — most people land right by adding a solid protein source to each meal.</li>
<li><b>Carbohydrates</b> are your muscles’ premium fuel; they matter more the harder you move. For a walker, normal balanced eating covers it.</li>
<li><b>Fats</b> are essential — hormones, brain, vitamin absorption. No macro is a villain.</li>
</ul>
<p>And after longer or harder sessions, a snack with carbs and protein within a couple of hours helps you recover — a glass of milk, yogurt and fruit, eggs on toast. Kitchen food, not lab food.</p>`,
    tryThis: 'This week, add one palm-sized protein source to the meal where you usually skip it (breakfast, for most people). That single tweak covers most of the protein gap.',
    refs: [
      'Jäger R et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr 2017;14:20.',
      'Thomas DT et al. ACSM/Academy of Nutrition and Dietetics/Dietitians of Canada: Nutrition and Athletic Performance. Med Sci Sports Exerc 2016;48:543–68.',
      'Ainsworth BE et al. 2011 Compendium of Physical Activities. Med Sci Sports Exerc 2011;43:1575–81.',
    ],
  },
  {
    id: 'timing',
    cat: 'rhythm',
    em: '⏰',
    read: 3,
    title: 'The best time of day to move',
    lede: 'Spoiler: it’s the time you’ll actually do it. But the clock does hand out a few bonuses.',
    body: `
<p>Across the research, one finding towers over the rest: <b>consistency beats timing.</b> The health gap between “moves regularly at a random hour” and “doesn’t move” is enormous; the gap between morning and evening exercisers is a rounding error. That said, the clock offers some genuinely useful bonuses:</p>
<h3>The bonuses</h3>
<ul>
<li><b>Morning:</b> outdoor light anchors your circadian clock, which pays off at bedtime. Morning routines also survive busy days better — the day can’t cancel what already happened.</li>
<li><b>After meals:</b> the 60–90 minutes after eating is prime time for a glucose-flattening stroll.</li>
<li><b>Afternoon/evening:</b> body temperature and muscle performance peak — strength and speed tend to feel best here.</li>
<li><b>Late night:</b> gentle movement is fine. A meta-analysis found evening exercise doesn’t harm sleep — with one exception: <em>vigorous</em> effort ending within about an hour of bed can delay it. Wind down instead.</li>
</ul>
<p>The deeper advice: attach movement to an anchor that already exists — after coffee, after school drop-off, after your last meeting. Anchored habits are the ones that survive.</p>`,
    tryThis: 'Choose your anchor (“after ___, I move for ___ minutes”) and put it in your Plan. Behavioral scientists call this an implementation intention — it roughly doubles follow-through.',
    refs: [
      'Stutz J et al. Effects of evening exercise on sleep: a systematic review and meta-analysis. Sports Med 2019;49:269–87.',
      'Gollwitzer PM, Sheeran P. Implementation intentions and goal achievement: meta-analysis. Adv Exp Soc Psychol 2006;38:69–119.',
      'Chtourou H, Souissi N. The effect of training at a specific time of day. J Strength Cond Res 2012;26:1984–2005.',
    ],
  },
  {
    id: 'fasting',
    cat: 'rhythm',
    em: '🌘',
    read: 3,
    title: 'Moving while fasting: what we actually know',
    lede: 'Fasted movement is fine for most people — with honest caveats and no magic.',
    body: `
<p>Whether you practice intermittent fasting, observe religious fasts, or just like moving before breakfast, the research is reassuring: <b>for most healthy people, light-to-moderate movement in a fasted state is safe and well tolerated.</b></p>
<h3>The fat-burning claim</h3>
<p>Yes, fasted cardio burns a higher <em>proportion</em> of fat during the session. But controlled trials find that over weeks, <b>body-composition changes are essentially the same</b> fed or fasted — the body balances its books across the whole day. Do whichever feels better; that’s the honest tiebreaker.</p>
<h3>The real guidance</h3>
<ul>
<li>Keep fasted sessions <b>easy to moderate</b> — long or intense efforts on empty tend to feel disproportionately hard and can crater the rest of your day.</li>
<li>Hydrate — fasting from food is not fasting from water (outside specific religious fasts, where timing your movement near the evening meal helps).</li>
<li><b>If you take blood-sugar-lowering medication</b> (insulin, sulfonylureas), fasted exercise raises real hypoglycemia risk — plan it with your clinician.</li>
<li>Feeling dizzy, weak, or foggy is data, not weakness. Eat, rest, move later.</li>
</ul>`,
    tryThis: 'If you enjoy pre-breakfast movement, keep it — just keep it conversational. If you don’t, this is your permission slip to stop: the fat-loss magic isn’t there.',
    refs: [
      'Schoenfeld BJ et al. Body composition changes associated with fasted versus non-fasted aerobic exercise. J Int Soc Sports Nutr 2014;11:54.',
      'Vieira AF et al. Effects of aerobic exercise performed in fasted v. fed state: systematic review and meta-analysis. Br J Nutr 2016;116:1153–64.',
      'Colberg SR et al. Physical activity/exercise and diabetes: ADA position statement. Diabetes Care 2016;39:2065–79.',
    ],
  },
  {
    id: 'sleep',
    cat: 'rhythm',
    em: '😴',
    read: 3,
    title: 'Sleep: the recovery multiplier',
    lede: 'Movement and sleep are a two-way street — each makes the other better.',
    body: `
<p>Every adaptation you’re chasing — a calmer heart, steadier blood sugar, new muscle, a lighter mood — is largely <em>built during sleep</em>. Move without sleeping and you’ve written the check without funding the account.</p>
<h3>The virtuous circle</h3>
<p>The relationship runs both ways, and that’s the good news. Meta-analyses show regular exercise improves sleep quality and shortens the time it takes to fall asleep — exercise is one of the few non-drug insomnia treatments with solid evidence. And sleeping well makes movement feel easier and more appealing the next day. Enter the circle at either door.</p>
<h3>The basics that matter</h3>
<ul>
<li>Adults need <b>7 or more hours</b> a night — the consensus of the American Academy of Sleep Medicine. Short sleep raises hunger hormones, dents glucose control, and roughly doubles some injury risks in athletes.</li>
<li><b>Morning light + movement</b> is the strongest one-two punch for setting your body clock (that’s the “Morning Sun Walk” session).</li>
<li>Keep <em>vigorous</em> exercise from ending within ~1 hour of bed; gentle stretching or an evening stroll is actively helpful.</li>
</ul>`,
    tryThis: 'Protect tonight: pick a bedtime that allows 7+ hours, and try the “Wind-Down Flow” session in the hour before it.',
    refs: [
      'Kredlow MA et al. The effects of physical activity on sleep: a meta-analytic review. J Behav Med 2015;38:427–49.',
      'Watson NF et al. Recommended amount of sleep for a healthy adult: AASM/SRS consensus. Sleep 2015;38:843–44.',
      'Kline CE. The bidirectional relationship between exercise and sleep. Am J Lifestyle Med 2014;8:375–79.',
    ],
  },
  {
    id: 'mood',
    cat: 'mind',
    em: '🌦️',
    read: 3,
    title: 'The 10-minute mood shift',
    lede: 'For the mind, movement is one of the most effective interventions we have.',
    body: `
<p>If you’ve ever gone for a grumpy walk and come back a different person, you’ve replicated one of the most robust findings in health science. A 2023 umbrella review covering over 128,000 participants concluded physical activity is <b>as effective as, or more effective than</b>, first-line treatments for mild-to-moderate depression and anxiety in many populations — and it starts working fast, with mood lifting within about ten minutes of gentle movement.</p>
<h3>The dose is small</h3>
<p>A landmark dose-response analysis found that even <b>half</b> the recommended weekly activity — about 75 minutes of brisk walking a week — was associated with an 18% lower risk of depression. The curve, once again, is steepest at the start.</p>
<h3>Stack the deck</h3>
<ul>
<li><b>Go outside:</b> “green exercise” reliably outperforms the same movement indoors for mood and self-esteem.</li>
<li><b>Bring rhythm:</b> repetitive, rhythmic movement (walking, cycling, swimming) gives a ruminating mind something steady to rest on.</li>
<li><b>Bring someone:</b> moving with another person compounds the effect (see “Moving together”).</li>
</ul>
<p>None of this replaces professional care when you need it. It’s the ground floor that makes everything else work better.</p>`,
    tryThis: 'Next time your mood dips, set a 10-minute timer and walk — no destination, no pace. Check the weather inside when the timer rings.',
    refs: [
      'Singh B et al. Effectiveness of physical activity interventions for improving depression, anxiety and distress: an overview of systematic reviews. Br J Sports Med 2023;57:1203–09.',
      'Pearce M et al. Association between physical activity and risk of depression: a dose-response meta-analysis. JAMA Psychiatry 2022;79:550–59.',
      'Barton J, Pretty J. What is the best dose of nature and green exercise for improving mental health? Environ Sci Technol 2010;44:3947–55.',
    ],
  },
  {
    id: 'together',
    cat: 'mind',
    em: '🫂',
    read: 3,
    title: 'Moving together: the loneliness antidote',
    lede: 'Connection is a health behavior. Movement is one of its best delivery systems.',
    body: `
<p>In a famous meta-analysis of 148 studies, strong social relationships were associated with a <b>50% higher likelihood of survival</b> over the study periods — an effect comparable to quitting smoking, and larger than the effects of obesity or inactivity. Loneliness isn't just sad; it's physiological.</p>
<p>Which makes moving together a beautiful two-for-one: one walk with a friend is a workout <em>and</em> a dose of the other medicine.</p>
<h3>What the evidence says</h3>
<ul>
<li>A systematic review of <b>walking groups</b> found wide-ranging health improvements — blood pressure, resting heart rate, body fat, fitness, and lower depression scores — with strikingly high adherence: about three-quarters of participants stick with it.</li>
<li>Group-based activity with real social support consistently beats exercising alone on the metric that matters most: <b>still doing it months later.</b></li>
<li>Side-by-side movement is also simply an easier way to connect — conversation flows differently on a walk than across a table.</li>
</ul>
<p>This is why the Together tab exists — and why it will never have a leaderboard. The point isn’t to beat your friends. It’s to keep each other moving, and a little less alone.</p>`,
    tryThis: 'Invite one person to a standing weekly walk — same day, same time, rain-or-shine rules decided together. Set it up in Together.',
    refs: [
      'Holt-Lunstad J et al. Social relationships and mortality risk: a meta-analytic review. PLoS Med 2010;7:e1000316.',
      'Hanson S, Jones A. Is there evidence that walking groups have health benefits? A systematic review and meta-analysis. Br J Sports Med 2015;49:710–15.',
      'Burke SM et al. Group versus individual exercise contexts: a meta-analysis. Sport Exerc Psychol Rev 2006;2:13–29.',
    ],
  },
  {
    id: 'mindful-movement',
    cat: 'mind',
    em: '🌬️',
    read: 3,
    title: 'Mindfulness: the skill under every other skill',
    lede: 'Before the body can move well, attention has to arrive in it. This is trainable.',
    body: `
<p>Every movement starts the same way: you notice the body, and you choose. Which is why mindfulness isn’t a nice-to-have garnish on a movement practice — <b>it’s the doorway to one.</b> People who can’t feel their body’s honest signals over-train, under-recover, quit in shame, or never start. People who can, pace themselves — and stay.</p>
<h3>What the research says</h3>
<ul>
<li><b>It calms the machinery.</b> Slow breathing with extended exhales measurably shifts the nervous system toward its parasympathetic “safe to move” mode — a review of breathing studies found effects on heart-rate variability, blood pressure, and reported calm.</li>
<li><b>It keeps you moving.</b> Studies link mindfulness with sticking to physical activity — largely because mindful movers <em>notice</em> the satisfaction of moving, and satisfaction is what the habit loop runs on.</li>
<li><b>It works as movement.</b> Meditation programs show meaningful effects on anxiety, depression, and pain — and walking meditation trials show you don’t have to sit still to get them.</li>
</ul>
<h3>Interoception: your inner speedometer</h3>
<p>Scientists call the sense of your body from within <em>interoception</em> — heartbeat, breath, effort, tension. It’s the instrument you use every time you decide “I can push” or “I should rest.” And like any sense, it sharpens with use. Two minutes of honest checking-in before you move is calibration for everything that follows.</p>`,
    tryThis: 'Run the 3-minute “Arrive” session before your next movement — any movement. Notice whether the session after it feels different. (It usually does.)',
    refs: [
      'Zaccaro A et al. How breath-control can change your life: a systematic review on psychophysiological correlates of slow breathing. Front Hum Neurosci 2018;12:353.',
      'Tsafou KE et al. Mindfulness and satisfaction in physical activity. J Health Psychol 2016;21:1817–27.',
      'Goyal M et al. Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. JAMA Intern Med 2014;174:357–68.',
      'Teut M et al. Mindful walking in psychologically distressed individuals: a randomized controlled trial. Evid Based Complement Alternat Med 2013;2013:489856.',
    ],
  },
  {
    id: 'start-small',
    cat: 'foundations',
    em: '🌱',
    read: 3,
    title: 'How habits actually form (be kind to yourself; it’s strategy)',
    lede: 'The science of sticking with it, minus the hustle-culture noise.',
    body: `
<p>Most movement plans don’t fail from lack of willpower. They fail from bad engineering. Here’s what behavioral science actually recommends:</p>
<h3>The engineering</h3>
<ul>
<li><b>Make it specific.</b> “I’ll move more” fails; “After coffee on Mon/Wed/Fri, I walk 15 minutes” succeeds. These if-then plans (implementation intentions) roughly double follow-through in meta-analyses.</li>
<li><b>Make it small enough to be inevitable.</b> Habits form through repetition, not intensity — in the classic study, automaticity took a median of <b>66 days</b> of repeating an easy behavior. Ten minutes daily beats an hour weekly.</li>
<li><b>Stack it.</b> Attach the new habit to an existing anchor: after brushing teeth, after school drop-off, after closing the laptop.</li>
<li><b>Bundle temptation.</b> Save a favorite podcast or playlist exclusively for movement. In trials, this measurably increases gym attendance.</li>
</ul>
<h3>The kindness (this part is load-bearing)</h3>
<p>When you miss a day — you will, everyone does — the data is unambiguous: <b>self-compassion, not self-criticism, predicts getting back on track.</b> Missing once has no measurable effect on long-term habit formation. The only rule that matters is the gentlest one: never miss twice, and never make missing mean something about you.</p>`,
    tryThis: 'Write one if-then plan in your Plan tab tonight. Make it 50% smaller than the version you first thought of.',
    refs: [
      'Gollwitzer PM, Sheeran P. Implementation intentions and goal achievement: meta-analysis. Adv Exp Soc Psychol 2006;38:69–119.',
      'Lally P et al. How are habits formed: modelling habit formation in the real world. Eur J Soc Psychol 2010;40:998–1009.',
      'Breines JG, Chen S. Self-compassion increases self-improvement motivation. Pers Soc Psychol Bull 2012;38:1133–43.',
      'Milkman KL et al. Holding the Hunger Games hostage at the gym: temptation bundling. Manage Sci 2014;60:283–99.',
    ],
  },
];

export const articleById = id => articles.find(a => a.id === id);
export const catById = id => categories.find(c => c.id === id);
