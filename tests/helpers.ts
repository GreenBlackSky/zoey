import { expect, type Page } from '@playwright/test';

/** Open the app fresh, with nothing saved, and collect any error it throws. */
export async function openFresh(page: Page): Promise<string[]> {
  const errs: string[] = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('#app header');
  return errs;
}
/** A real tap: touch → pointer events, which is what the tap fix listens for. */
export async function tap(page: Page, selector: string): Promise<boolean> {
  const el = page.locator(selector).first();
  if (!(await el.count())) {
    return false;
  }
  /* a correct answer moves on by itself after 1.2 s, so a button can vanish
     between finding it and tapping it — that is not a failure */
  try {
    await el.scrollIntoViewIfNeeded({ timeout: 2000 });
    await el.tap({ timeout: 2000 });
  } catch {
    return false;
  }
  await page.waitForTimeout(120);
  return true;
}
export async function noOops(page: Page): Promise<void> {
  await expect(page.locator('#oops')).toBeHidden();
}
/** Tap whatever answers the question on screen, once. */
export async function answerOnce(page: Page): Promise<string | null> {
  for (const sel of [
    '.key:not([disabled])',
    '.ropt:not([disabled])',
    '[data-kb]',
    '.taplayer [data-f]',
    '[data-self]',
    '#rtapgo',
  ]) {
    if (await page.locator(sel).count()) {
      await tap(page, sel);
      return sel;
    }
  }
  if (await page.locator('#skip').count()) {
    await tap(page, '#skip');
    return '#skip';
  }
  return null;
}
/** Every drill button in every family on the Practice screen. */
export async function familiesAndDrills(page: Page): Promise<[string, string][]> {
  const out: [string, string][] = [];
  await tap(page, '#navHome');
  const fams = await page
    .locator('[data-open]')
    .evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.open!));
  for (const f of fams) {
    await tap(page, '#navHome');
    await tap(page, `[data-open="${f}"]`);
    const ds = await page
      .locator('[data-drill]')
      .evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.drill!));
    ds.forEach((d) => out.push([f, d]));
  }
  return out;
}
