import {
  DEFAULT_GROUPS,
  configureGroups,
  configureRoutes,
  configureStore,
  installDefaultNormalizers,
  load,
  RLEVELS,
  type GroupDef,
  type StatsSection,
  type SetupRow,
  type Tab,
} from '@greenblacksky/honmoon';

/* What Zoey is made of: reading, names and keys, the ear, scales on
   the page, and every reference. The screens all come from the engine. */

export const APP_ID = 'zoey';
export const APP_NAME = 'Zoey';

export const GROUPS: GroupDef[] = [
  {
    ...DEFAULT_GROUPS.read,
    drills: ['st2en', 'st2solf', 'st2key', 'rvalue', 'rcount', 'rfill', 'rhear', 'rtap'],
  },
  {
    ...DEFAULT_GROUPS.names,
    drills: ['en2solf', 'solf2en', 'st2mdo', 'en2mdo', 'mdo2en', 'en2deg', 'deg2en'],
  },
  { ...DEFAULT_GROUPS.ear, need: 'Sound on', drills: ['ivhear', 'chhear', 'scalehear'] },
  {
    ...DEFAULT_GROUPS.scale,
    sb: 'Degrees, staves, steps and formulas: a scale read and written, not played.',
    need: 'Nothing but the screen',
    drills: ['scdeg', 'scstaff', 'scwrite', 'scsteps', 'screcipe'],
  },
];

export const ROUTES = [
  'home',
  'fam',
  'scales',
  'drill',
  'done',
  'rcal',
  'stats',
  'setup',
  'learn',
  'ref',
  'rref',
  'ivref',
  'sx',
  'degref',
  'gloss',
];

export const TABS: Tab[] = [
  {
    id: 'navHome',
    label: 'Practice',
    to: 'home',
    views: ['home', 'fam', 'scales', 'drill', 'done', 'rcal'],
  },
  {
    id: 'navLearn',
    label: 'Learn',
    to: 'learn',
    views: ['learn', 'ref', 'rref', 'ivref', 'sx', 'degref', 'gloss'],
  },
  { id: 'navStats', label: 'Stats', to: 'stats', views: ['stats'] },
  { id: 'navSet', label: 'Setup', to: 'setup', views: ['setup'] },
];

export const STATS: StatsSection[] = [
  'overall',
  'twoweeks',
  'areas',
  'bynote',
  'staff',
  'scales',
  'byscale',
  'weakest',
  'tempo',
  'data',
];
export const SETUP: SetupRow[] = [
  'range',
  'acc',
  'pref',
  'appearance',
  'hints',
  'clefs',
  'mdo',
  'rhythm',
  'sound',
  'how',
];
export const MDO_ADDS =
  'Turning this on adds five drills under Names &amp; keys: reading a note on the staff as a syllable in a given key, naming a note’s syllable or scale degree, and the reverse. It is the thing that makes a melody transposable in your head, and the thing that makes singing a written line possible without a reference note for every phrase. It is also a real second language, so leave it off until the fixed-do and staff drills feel easy.';
export const TEMPO_ROWS = RLEVELS.map((level) => ({
  k: 'rh:' + level.id,
  n: 'Tapping — ' + level.n.toLowerCase(),
}));

export function setup(): void {
  configureStore({ key: 'honmoon.zoey.v1' });
  configureGroups(GROUPS);
  configureRoutes(ROUTES);
  installDefaultNormalizers();
  load();
}
