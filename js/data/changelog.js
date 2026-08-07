// The log. Shown once after the app updates itself, and browsable anytime
// from You → version.
//
// Written for the person using the app, not for developers: what changed for
// them, in their language. Newest first.

export const APP_VERSION = '1.8.0';

export const changelog = [
  {
    version: '1.8.0',
    date: '2026-08-07',
    title: 'It keeps itself up to date',
    items: [
      'Movement now notices when a new version ships and offers a one-tap refresh — no App Store, no reinstalling.',
      'After it updates, you get this note explaining what changed. You can always re-read it from You → version.',
      'Your movement history, plans and circles live separately from the app itself, so an update never touches them.',
    ],
  },
  {
    version: '1.7.0',
    date: '2026-08-07',
    title: 'A front door, and a card worth sharing',
    items: [
      'A first-run screen explaining why this exists, what makes it different, and what to honestly expect — always re-readable from You.',
      'Shared links now show a proper preview card in iMessage and elsewhere, drawn in the app’s own style.',
      'Share buttons in Together and You send the link so a friend sees that card.',
    ],
  },
  {
    version: '1.6.0',
    date: '2026-08-07',
    title: 'Programs',
    items: [
      'Four multi-week arcs: Your First 5K, Walk Yourself Well, Strong in Six Weeks, and 30 Days of Movement Snacks.',
      'Each week asks for a number of sessions, not particular days — you choose when. A missed week simply waits, and repeating one counts as building.',
      'Six new guided sessions, including a run ladder from two-minute intervals all the way to your 5K.',
    ],
  },
  {
    version: '1.5.0',
    date: '2026-08-07',
    title: 'Thirst, not cup-counting',
    items: [
      'The water counter is gone. It contradicted our own research page: there is no evidence for a universal daily cup target.',
      'In its place, the two signals that actually work — how thirsty you are, and urine color — plus the three cases where thirst genuinely lags.',
    ],
  },
  {
    version: '1.4.0',
    date: '2026-08-07',
    title: 'A visual soul',
    items: [
      'Sessions now sit on living water: every time the coach speaks, a ripple appears.',
      'Your progress is drawn as an ensō — one brush stroke, left deliberately open.',
      'Breath cues raise an orb that paces four seconds in, six out.',
      'Every session has its own color world, and Today wears the hour you’re in.',
    ],
  },
  {
    version: '1.3.0',
    date: '2026-08-07',
    title: 'See the coach before you hear them',
    items: [
      'Every spoken check-in now appears as a marker on the session timeline, so you can see what’s coming.',
      'All sessions retimed to suit their activity — countdowns before intervals, quiet during hard efforts, sparse during yoga.',
    ],
  },
  {
    version: '1.2.0',
    date: '2026-08-06',
    title: 'Music controls',
    items: [
      'Play, pause and skip your music from inside a session by connecting Spotify once.',
      'Without connecting, quick launchers for Spotify and Apple Music sit in the player.',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-08-06',
    title: 'Pause fix and a little more joy',
    items: [
      'Fixed pausing a session losing the time you’d already put in.',
      'Confetti when you finish, and a coach who admits up front that it’s a computer voice.',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-08-06',
    title: 'Hello',
    items: [
      'Guided sessions, a research library with every claim cited, weekly plans, and circles for moving with people.',
      'Everything on your device. No account, no tracking, no ads.',
    ],
  },
];

export const latest = () => changelog[0];
export const entryFor = v => changelog.find(c => c.version === v);
