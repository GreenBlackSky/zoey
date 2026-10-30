import { defineConfig } from '@playwright/test';

/* End-to-end checks: build the app, serve it, and drive it like a phone. */
export default defineConfig({
  testDir: 'tests',
  timeout: 120_000,
  use: {
    baseURL: 'http://localhost:4175',
    viewport: { width: 390, height: 860 },
    isMobile: true,
    hasTouch: true,
    serviceWorkers: 'block',
    launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] },
  },
  webServer: {
    command: 'npm run build && npx vite preview --port 4175 --strictPort',
    port: 4175,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
