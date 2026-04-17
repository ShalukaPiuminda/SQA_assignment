const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Document Converter - Image to PDF", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/image-to-pdf");
  });

  test("should load image-to-pdf tool with expected controls", async ({
    page,
  }) => {
    await assertUploaderShell(page, "Image → PDF", /select images/i);

    await expect(
      page.getByText("Selected Images", { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /A4/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Letter/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Portrait/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Landscape/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Create PDF/i }),
    ).toBeDisabled();
  });

  test("should accept an image and enable create pdf action", async ({
    page,
  }) => {
    await uploadSingle(page, "tiny.png");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /tiny\.png/i,
    );
    await expect(page.getByText(/tiny\.png/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Create PDF/i }),
    ).toBeEnabled();
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
  });
});
