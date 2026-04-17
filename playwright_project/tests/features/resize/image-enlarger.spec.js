const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Resize - Image Enlarger", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/image-enlarger");
  });

  test("should load image-enlarger page correctly", async ({ page }) => {
    await assertUploaderShell(page, "Image Enlarger", /select files/i);
    await expect(page.getByText(/Select an image to enlarge/i)).toBeVisible();
    await expect(page.getByText(/No image yet\./i)).toBeVisible();
  });

  test("should upload image and display enlarge download flow", async ({
    page,
  }) => {
    await uploadSingle(page, "tiny.png");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /tiny\.png/i,
    );
    await expect(page.getByText(/Original:/i)).toBeVisible();
    await expect(page.getByText(/Scale/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();
  });
});
