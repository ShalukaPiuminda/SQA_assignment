const { test, expect } = require("@playwright/test");
const { uploadMany } = require("../../helpers/feature-test-utils");

test.describe("Resize - Bulk Resize", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/bulk-resize");
  });

  test("should load bulk-resize options and disabled process button by default", async ({
    page,
  }) => {
    await expect(page.getByText("Bulk Resize", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/Select multiple images to resize/i),
    ).toBeVisible();
    await expect(page.getByText(/Options/i)).toBeVisible();
    await expect(page.getByLabel(/Keep aspect/i)).toBeChecked();
    await expect(
      page.getByRole("button", { name: /Process\s*&\s*Download/i }),
    ).toBeDisabled();
  });

  test("should accept multiple files and enable process and download", async ({
    page,
  }) => {
    await uploadMany(page, ["tiny.png", "tiny-2.png"]);

    await expect(page.getByText(/tiny\.png/i)).toBeVisible();
    await expect(page.getByText(/tiny-2\.png/i)).toBeVisible();

    const processButton = page.getByRole("button", {
      name: /Process\s*&\s*Download/i,
    });
    await expect(processButton).toBeEnabled();

    await processButton.click();
    await expect(processButton).toBeVisible();
  });
});
