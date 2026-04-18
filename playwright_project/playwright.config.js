const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    screenshot: "on",
    screenshotDir: "./screenshots/automation",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  reporter: [["html"], ["list"]],
});
