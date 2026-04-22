const { defineConfig } = require("@playwright/test");

const isUiMode = process.argv.includes("--ui");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  use: {
    // Keep browser visible and always collect trace snapshots while debugging in UI mode.
    headless: isUiMode ? false : true,
    screenshot: "on",
    screenshotDir: "./screenshots/automation",
    video: "retain-on-failure",
    trace: isUiMode ? "on" : "on-first-retry",
  },
  reporter: [["html"], ["list"]],
});
