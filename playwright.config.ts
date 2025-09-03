import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  // Make CI less flaky:
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: true,
    actionTimeout: 0,
    navigationTimeout: 30000,
  },
  // Optional: keep a friendly reporter in CI
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
