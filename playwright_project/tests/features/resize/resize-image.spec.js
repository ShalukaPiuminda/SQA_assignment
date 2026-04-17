const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

test.describe("Resize - Resize Image", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/resize-image");
  });

  test("should load resize-image page with controls", async ({ page }) => {
    await assertUploaderShell(page, "Resize Image", /select files/i);
    await expect(
      page.getByText(/Select an image to configure size/i),
    ).toBeVisible();
    await expect(page.getByText(/No image yet\./i)).toBeVisible();
  });

  test("should upload image and expose resize download action", async ({
    page,
  }) => {
    await uploadSingle(page, "tiny.png");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /tiny\.png/i,
    );
    await expect(page.getByText(/Original:/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();
  });
});
