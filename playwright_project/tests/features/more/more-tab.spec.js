const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

const moreTools = [
  {
    label: "Rotate",
    url: "https://www.pixelssuite.com/rotate-image",
    heading: "Rotate Image",
  },
  {
    label: "Flip",
    url: "https://www.pixelssuite.com/flip-image",
    heading: "Flip Image",
  },
  {
    label: "Meme",
    url: "https://www.pixelssuite.com/meme-generator",
    heading: "Meme Generator",
  },
  {
    label: "Color Picker",
    url: "https://www.pixelssuite.com/color-picker",
    heading: "Color Picker",
  },
  {
    label: "Image → Text",
    url: "https://www.pixelssuite.com/image-to-text",
    heading: "Image → Text (OCR)",
  },
];

test.describe("More Tab", () => {
  test("should open each more tool route from top navigation", async ({
    page,
  }) => {
    await page.goto("https://www.pixelssuite.com/");

    for (const tool of moreTools) {
      await page.getByRole("button", { name: /^More/i }).first().click();
      await page
        .getByRole("button", { name: new RegExp(`^${tool.label}$`, "i") })
        .first()
        .click();
      await expect(page).toHaveURL(
        new RegExp(tool.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
      await expect(
        page.getByText(tool.heading, { exact: true }).first(),
      ).toBeVisible();
      await page.goBack();
    }
  });

  test("should validate rotate image flow", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/rotate-image");
    await assertUploaderShell(page, "Rotate Image", /select files/i);

    await uploadSingle(page, "car.jpg");

    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText("Rotate", { exact: true })).toBeVisible();
    await expect(page.getByRole("slider")).toBeVisible();
    await expect(page.getByRole("button", { name: /-90/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Reset/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /\+90/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download Rotated/i }),
    ).toBeEnabled();
  });

  test("should validate flip image flow", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/flip-image");
    await assertUploaderShell(page, "Flip Image", /select files/i);

    await uploadSingle(page, "car.jpg");

    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText("Flip", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: /Flip Horizontal/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: /Flip Vertical/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();
  });

  test("should validate meme generator flow", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/meme-generator");
    await assertUploaderShell(page, "Meme Generator", /select files/i);

    await uploadSingle(page, "car.jpg");

    await expect(page.getByText(/Text & Style/i)).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /Top text/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /Bottom text/i }),
    ).toBeVisible();
    await expect(page.getByText(/Font size/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download Meme/i }),
    ).toBeEnabled();
  });

  test("should validate color picker controls", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/color-picker");

    await expect(
      page.getByText("Color Picker", { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText(/Selected Color/i)).toBeVisible();
    await expect(page.getByText(/Hex Code/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /^RGB$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^HSV$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^HSL$/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /^CMYK$/i })).toBeVisible();
  });

  test("should validate image-to-text OCR flow", async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/image-to-text");
    await assertUploaderShell(page, "Image → Text (OCR)", /select image/i);

    await uploadSingle(page, "car.jpg");

    await expect(
      page.getByRole("button", { name: /Clear/i }).first(),
    ).toBeVisible();
    await expect(page.getByText("Options", { exact: true })).toBeVisible();
    await expect(page.getByText("Language", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Start OCR/i }),
    ).toBeVisible();
    await expect(page.getByText("Result", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Copy$/i })).toBeVisible();
  });
});
