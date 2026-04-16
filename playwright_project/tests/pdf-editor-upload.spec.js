const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("PDF Editor - Upload", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
  });

  test("should allow selecting a PDF file", async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    const filePath = path.join(__dirname, "..", "sample_files", "JUnit.pdf");

    await fileInput.setInputFiles(filePath);
    await expect(fileInput).toHaveValue(/junit\.pdf/i);
  });
});
