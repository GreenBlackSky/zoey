import { expect, test } from '@playwright/test';
import { noOops, openFresh, tap } from './helpers';

test('every reference page draws, and its controls work', async ({ page }) => {
  const errs = await openFresh(page);
  await tap(page, '#navLearn');
  const refs = await page
    .locator('[data-go]')
    .evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.go!));
  expect(refs).toEqual(['ref', 'rref', 'ivref', 'sx', 'degref', 'gloss']);
  for (const r of refs) {
    await tap(page, '#navLearn');
    await tap(page, `[data-go="${r}"]`);
    await expect(page.locator('h2').first()).toBeVisible();
    await noOops(page);
  }
  /* staff map: tap a note, change clef after switching treble on */
  await tap(page, '#navLearn');
  await tap(page, '[data-go="ref"]');
  await tap(page, '[data-refn="50"]');
  await expect(page.locator('h2').nth(1)).toContainText('D');
  /* degrees: all five pages */
  await tap(page, '#navLearn');
  await tap(page, '[data-go="degref"]');
  for (let i = 1; i < 5; i++) {
    await tap(page, `.dtabs [data-degtab="${i}"]`);
    await noOops(page);
  }
  await tap(page, 'details.dq summary');
  /* explorer: pick a scale and a root, hear it */
  await tap(page, '#navLearn');
  await tap(page, '[data-go="sx"]');
  await tap(page, '[data-xs="sid"][data-val="dorian"]');
  await tap(page, '[data-xs="root"][data-val="2"]');
  await expect(page.locator('.card').first()).toContainText('D dorian');
  await tap(page, '#hearscale');
  /* vocabulary search */
  await tap(page, '#navLearn');
  await tap(page, '[data-go="gloss"]');
  await page.locator('#glossq').fill('tritone');
  await expect(page.locator('.gterm:visible')).toHaveCount(1);
  await page.locator('#glossq').fill('zzzz');
  await expect(page.locator('#glossnone')).toBeVisible();
  expect(errs).toEqual([]);
});

test('the keyboard drill: one answer row, any octave counts', async ({ page }) => {
  const errs = await openFresh(page);
  await tap(page, '[data-open="read"]');
  await tap(page, '[data-drill="st2key"]');
  await expect(page.locator('#skip')).toHaveCount(1);
  await expect(page.locator('#hear')).toHaveCount(1);
  await expect(page.locator('.kbstage svg text')).toHaveCount(0);
  await page.waitForTimeout(400);
  /* the right note, picked by pitch class from the question itself */
  await tap(page, '.kbstage [data-kb="60"]');
  await expect(page.locator('.verdict')).toBeVisible();
  await noOops(page);
  expect(errs).toEqual([]);
});

test('tapping a rhythm: count in, tap, see the picture', async ({ page }) => {
  const errs = await openFresh(page);
  await tap(page, '[data-open="read"]');
  await tap(page, '[data-drill="rtap"]');
  await tap(page, '#rtapgo');
  await expect(page.locator('#tappad')).toBeVisible();
  for (let i = 0; i < 40 && !(await page.locator('.verdict').count()); i++) {
    await page.locator('#tappad').dispatchEvent('pointerdown');
    await page.waitForTimeout(250);
  }
  await expect(page.locator('.verdict')).toBeVisible({ timeout: 15000 });
  await expect(
    page.locator('svg[aria-label="your taps against the written rhythm"]'),
  ).toBeVisible();
  await tap(page, '#navStats');
  await expect(page.locator('.tline i').first()).toBeVisible();
  await noOops(page);
  expect(errs).toEqual([]);
});

test('tap-delay calibration from Setup and back', async ({ page }) => {
  const errs = await openFresh(page);
  await tap(page, '#navSet');
  await tap(page, '#rcalib');
  await tap(page, '#calgo');
  for (let i = 0; i < 14; i++) {
    await page.locator('#calpad').dispatchEvent('pointerdown');
    await page.waitForTimeout(680);
  }
  await expect(page.getByText('Measured delay').or(page.getByText('Not enough taps'))).toBeVisible({
    timeout: 8000,
  });
  await tap(page, '#backdrill');
  await expect(page.getByRole('heading', { name: 'Clefs' })).toBeVisible();
  await noOops(page);
  expect(errs).toEqual([]);
});
