const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Document Converter - PDF to Word", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-to-word");
  });

  test("should load pdf-to-word page and uploader", async ({ page }) => {
    await assertUploaderShell(page, "PDF → Word", /select pdf/i);
    await expect(
      page.getByText(/Choose a text-based PDF exported from Word/i),
    ).toBeVisible();
  });

  test("should accept a pdf and show convert action", async ({ page }) => {
    await uploadSingle(page, "JUnit.pdf");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /junit\.pdf/i,
    );
    await expect(page.getByText(/JUnit\.pdf/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Convert to Word/i }),
    ).toBeEnabled();
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
  });
});
