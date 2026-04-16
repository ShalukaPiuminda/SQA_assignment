const { test, expect } = require("@playwright/test");

test.describe("PDF Editor - Controls", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
  });

  test("should display zoom controls", async ({ page }) => {
    await expect(page.getByText(/Zoom/i)).toBeVisible();
  });

  test("should display page navigation controls", async ({ page }) => {
    await expect(page.getByRole("button", { name: /prev/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /next/i })).toBeVisible();
  });

  test("should display current page number", async ({ page }) => {
    await expect(page.getByText(/^1$/)).toBeVisible();
  });

  test("should display download button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /download/i })).toBeVisible();
  });
});
