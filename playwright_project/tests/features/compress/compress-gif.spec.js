const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("Compress - Image", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/compress-image");
  });

  test("should load compress image page", async ({ page }) => {
    await expect(
      page.getByText("Compress Image", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/Drag and drop your file here/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Select files/i }),
    ).toBeVisible();
  });

  test("should upload sample gif and show compress-image controls", async ({
    page,
  }) => {
    const fileInput = page.locator('input[type="file"]').first();
    const gifPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "sample_files",
      "sample.gif",
    );

    await fileInput.setInputFiles(gifPath);

    await expect(fileInput).toHaveValue(/sample\.gif/i);
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText("Compress", { exact: true })).toBeVisible();
    await expect(page.getByText(/Quality/i)).toBeVisible();
    await expect(page.getByRole("combobox")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /^Download$/i }),
    ).toBeEnabled();
  });
});
