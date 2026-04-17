const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Document Converter - Word to PDF", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/word-to-pdf");
  });

  test("should load word-to-pdf page and uploader", async ({ page }) => {
    await assertUploaderShell(page, "Word → PDF", /select word/i);
    await expect(
      page.getByText(/Choose a \.docx file for best compatibility/i),
    ).toBeVisible();
  });

  test("should accept a docx file and enable conversion", async ({ page }) => {
    await uploadSingle(page, "sample.docx");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /sample\.docx/i,
    );
    await expect(page.getByText(/sample\.docx/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Convert to PDF/i }),
    ).toBeEnabled();
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
  });
});
