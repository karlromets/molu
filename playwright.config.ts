import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "pnpm build && pnpm preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  use: {
    baseURL: process.env.BASE_URL,
  },

  testDir: "e2e",
});
