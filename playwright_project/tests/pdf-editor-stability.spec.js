const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("PDF Editor - Stability", () => {
  test("should remain stable after refresh", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
    await page.reload();
    await expect(page.getByText(/PDF Editor/i)).toBeVisible();
  });

  test("should remain stable after clicking several visible controls", async ({
    page,
  }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");

    const fileInput = page.locator('input[type="file"]');
    const pdfPath = path.join(__dirname, "..", "sample_files", "JUnit.pdf");
    const prevBtn = page.getByRole("button", { name: /prev/i });
    const nextBtn = page.getByRole("button", { name: /next/i });
    const downloadBtn = page.getByRole("button", { name: /download/i });

    await fileInput.setInputFiles(pdfPath);

    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    await expect(downloadBtn).toBeVisible();

    if (await nextBtn.isEnabled()) {
      await nextBtn.click();
    }

    await expect(downloadBtn).toBeEnabled();
    await downloadBtn.click({ trial: true });
    await expect(page.getByText(/Page/i)).toBeVisible();
  });
});
