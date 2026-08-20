import { defineConfig, devices } from '@playwright/test';

const viewport = {
  width: 1920,
  height: 1080,
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    viewport,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport,
      },
    },
  ],
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
