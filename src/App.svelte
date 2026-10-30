<!-- Zoey: the header with its tabs, and one screen at a time. -->
<script lang="ts">
  import {
    Shell,
    PracticeHome,
    FamilyScreen,
    ScalesScreen,
    DrillScreen,
    SessionDone,
    StatsScreen,
    SetupScreen,
    TapCalibration,
    LearnIndex,
    StaffMap,
    RhythmRef,
    IntervalRef,
    Explorer,
    DegreesRef,
    Glossary,
    nav,
    session,
  } from '@greenblacksky/honmoon';
  import { APP_ID, APP_NAME, MDO_ADDS, SETUP, STATS, TABS, TEMPO_ROWS } from './app';
  import { APP_MARK } from './mark';

  const screen = $derived(nav.view.name);
</script>

<Shell appName={APP_NAME} icon={APP_MARK} tabs={TABS}>
  {#if screen === 'drill'}<DrillScreen />
  {:else if screen === 'done' && session.current}<SessionDone />
  {:else if screen === 'fam'}<FamilyScreen fam={nav.view.opt.fam} />
  {:else if screen === 'scales'}<ScalesScreen />
  {:else if screen === 'rcal'}<TapCalibration />
  {:else if screen === 'stats'}
    <StatsScreen
      sections={STATS}
      tempoRows={TEMPO_ROWS}
      tempoNote="One bar per tapped bar, newest on the right. Green is clean, amber sloppy, red too fast — graded against the click. The only chart here measuring your hands rather than your memory."
      tempoEmpty="Nothing logged yet. The Tap the rhythm drill records the tempo you held, and this becomes a line you can watch climb."
    />
  {:else if screen === 'setup'}<SetupScreen
      rows={SETUP}
      how={['written', 'repetition']}
      mdoAdds={MDO_ADDS}
      appId={APP_ID}
    />
  {:else if screen === 'learn'}<LearnIndex />
  {:else if screen === 'ref'}<StaffMap />
  {:else if screen === 'rref'}<RhythmRef />
  {:else if screen === 'ivref'}<IntervalRef />
  {:else if screen === 'sx'}<Explorer />
  {:else if screen === 'degref'}<DegreesRef />
  {:else if screen === 'gloss'}<Glossary />
  {:else}<PracticeHome />
  {/if}
</Shell>
