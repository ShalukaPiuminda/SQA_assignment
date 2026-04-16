const { test, expect } = require("@playwright/test");

test.describe("PDF Editor - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
  });

  test("should load the PDF Editor page successfully", async ({ page }) => {
    await expect(page).toHaveURL(/pdf-editor/);
    await expect(page.getByText(/PDF Editor/i)).toBeVisible();
  });

  test("should show the main working sections", async ({ page }) => {
    await expect(page.getByText(/Toolbar/i)).toBeVisible();
    await expect(page.getByText(/Page/i)).toBeVisible();
  });
});
