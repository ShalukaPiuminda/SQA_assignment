const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Compress - GIF Compressor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/gif-compressor");
  });

  test("should load gif-compressor page", async ({ page }) => {
    await assertUploaderShell(page, "GIF Compressor", /select gif/i);
    await expect(page.getByText(/Select a GIF to compress/i)).toBeVisible();
    await expect(page.getByText(/No GIF yet\./i)).toBeVisible();
  });

  test("should upload sample.gif and show GIF compression controls", async ({
    page,
  }) => {
    await uploadSingle(page, "sample.gif");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /sample\.gif/i,
    );
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText("Optimization", { exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: /^O1$/i })).toBeVisible();
    await expect(page.getByRole("radio", { name: /^O2$/i })).toBeVisible();
    await expect(page.getByRole("radio", { name: /^O3$/i })).toBeVisible();
    await expect(page.getByText("Colors", { exact: true })).toBeVisible();
    await expect(page.getByText("Lossy", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^Compress$/i }),
    ).toBeEnabled();
  });
});
