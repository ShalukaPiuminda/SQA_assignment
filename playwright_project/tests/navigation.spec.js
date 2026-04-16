const { test, expect } = require("@playwright/test");

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/");
  });

  test("should display navigation area", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("should display logo or site branding", async ({ page }) => {
    await expect(page.locator("body")).toContainText(/pixelssuite/i);
  });

  test("should navigate to PDF Editor page", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
    await expect(page).toHaveURL(/pdf-editor/);
    await expect(page.locator("body")).toContainText(/PDF Editor/i);
  });

  test("should support browser back after navigation", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
    await expect(page).toHaveURL(/pdf-editor/);

    await page.goBack();

    await expect(page).toHaveURL(/pixelssuite\.com/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should remain stable after refresh", async ({ page }) => {
    await page.reload();
    await expect(page.locator("body")).toBeVisible();
  });
});
