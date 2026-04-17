const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Compress - PNG Compressor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/png-compressor");
  });

  test("should load png-compressor page", async ({ page }) => {
    await assertUploaderShell(page, "PNG Compressor", /select files/i);
    await expect(
      page.getByText(/Select a PNG image to re-encode/i),
    ).toBeVisible();
    await expect(page.getByText(/No image yet\./i)).toBeVisible();
  });

  test("should upload tiny.png and show png compression actions", async ({
    page,
  }) => {
    await uploadSingle(page, "tiny.png");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /tiny\.png/i,
    );
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText(/PNG compression is lossless/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();
  });
});
