import { expect, test } from '@playwright/test';
import { answerOnce, familiesAndDrills, noOops, openFresh, tap } from './helpers';

/* Every drill opens, asks something, takes an answer and comes back to its
   own family; every screen draws; nothing throws anywhere. */

test('every drill, end to end', async ({ page }) => {
  const errs = await openFresh(page);
  /* switch on what is off by default, so every drill is reachable */
  await tap(page, '#navSet');
  await tap(page, '[data-set="mdo"]');
  await tap(page, '[data-set="acc"]');
  const list = await familiesAndDrills(page);
  expect(list.length).toBeGreaterThan(0);
  for (const [fam, id] of list) {
    await tap(page, '#navHome');
    await tap(page, `[data-open="${fam}"]`);
    await tap(page, `[data-drill="${id}"]`);
    await expect(page.locator('.ask').first(), id + ' asks something').toBeVisible();
    await page.waitForTimeout(350); // a new question ignores taps for its first 320 ms
    const how = await answerOnce(page);
    if (how && how !== '#rtapgo' && how !== '.taplayer [data-f]') {
      await expect(page.locator('.verdict'), id + ' takes an answer').toBeVisible();
    }
    await page.waitForTimeout(150);
    await noOops(page);
    const back = await page.locator('.bar .ghost').first().getAttribute('id');
    expect(['backfam', 'backscales'], id + ' goes back to its family').toContain(back);
  }
  expect(errs).toEqual([]);
});

test('a whole session, and its summary', async ({ page }) => {
  const errs = await openFresh(page);
  await tap(page, '[data-set="slen"][data-val="15"]');
  await tap(page, '#startsess');
  for (let i = 0; i < 40 && (await page.locator('#endsess').count()); i++) {
    if (await page.locator('#next').count()) {
      await tap(page, '#next');
      continue;
    }
    await page.waitForTimeout(350);
    if (!(await answerOnce(page))) {
      break;
    }
    await page.waitForTimeout(100);
  }
  if (await page.locator('#endsess').count()) {
    await tap(page, '#endsess');
  }
  await expect(page.getByRole('heading', { name: 'Session done' })).toBeVisible();
  await noOops(page);
  expect(errs).toEqual([]);
});

test('the other screens draw', async ({ page }) => {
  const errs = await openFresh(page);
  const tabs = await page
    .locator('header .hbtn[id^="nav"]')
    .evaluateAll((els) => els.map((e) => '#' + e.id));
  for (const tab of tabs) {
    await tap(page, tab);
    await noOops(page);
  }
  await tap(page, '#navHome');
  const fams = await page
    .locator('[data-open]')
    .evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.open!));
  for (const f of fams) {
    await tap(page, '#navHome');
    await tap(page, `[data-open="${f}"]`);
    await expect(page.locator('h2').first()).toBeVisible();
    await noOops(page);
  }
  expect(errs).toEqual([]);
});
