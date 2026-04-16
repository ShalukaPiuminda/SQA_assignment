const { test, expect } = require("@playwright/test");

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/");
  });

  test("should load homepage successfully", async ({ page }) => {
    await expect(page).toHaveURL(/pixelssuite/i);
  });

  test("should display page title", async ({ page }) => {
    await expect(page).toHaveTitle(/pixelssuite|pixelssuite/i);
  });

  test("should display main heading or hero section", async ({ page }) => {
    await expect(page.locator("body")).toContainText(/convert|pdf|image|tool/i);
  });

  test("should not show blank page", async ({ page }) => {
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("should display visible main sections", async ({ page }) => {
    await expect(page.locator("body")).toContainText(/home|pdf|image|tool/i);
  });
});
