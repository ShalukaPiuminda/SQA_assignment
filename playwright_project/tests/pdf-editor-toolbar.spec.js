const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("PDF Editor - Toolbar Visibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
  });

  test("should display the file chooser", async ({ page }) => {
    await expect(page.locator('input[type="file"]')).toBeVisible();
  });

  test("should display undo, redo, and download buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /undo/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /redo/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /download/i })).toBeVisible();
  });

  test("should display toolbar controls area", async ({ page }) => {
    await expect(page.getByText(/Toolbar/i)).toBeVisible();
    await expect(page.getByText(/Zoom/i)).toBeVisible();
  });

  test("should show all key editing controls after uploading a PDF", async ({
    page,
  }) => {
    const fileInput = page.locator('input[type="file"]');
    const filePath = path.join(__dirname, "..", "sample_files", "JUnit.pdf");

    await fileInput.setInputFiles(filePath);

    await expect(page.getByRole("button", { name: /select/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^text$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /pencil/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /highlight/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /whiteout/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /eraser/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /toggle detected text boxes/i }),
    ).toBeVisible();

    await expect(page.getByRole("combobox").first()).toBeVisible();
    await expect(page.getByRole("spinbutton").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /^bold$/i })).toBeVisible();

    await expect(page.getByRole("button", { name: /^l$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^c$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^r$/i })).toBeVisible();

    await expect(page.getByRole("button", { name: /download/i })).toBeEnabled();
    await expect(page.getByText(/1\s*\/\s*\d+/)).toBeVisible();
  });
});
