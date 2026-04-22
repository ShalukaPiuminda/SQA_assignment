const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

const converterTools = [
  {
    key: "to-jpg",
    label: "To JPG",
    url: "https://www.pixelssuite.com/convert-to-jpg",
  },
  {
    key: "to-png",
    label: "To PNG",
    url: "https://www.pixelssuite.com/convert-to-png",
  },
  {
    key: "to-webp",
    label: "To WebP",
    url: "https://www.pixelssuite.com/convert-to-webp",
  },
];

const validConverterTools = converterTools.filter(
  (tool) => tool?.key && tool?.label && tool?.url,
);

test.describe("Image Converter Tab", () => {
  test("should open each image converter route from top navigation", async ({
    page,
  }) => {
    await page.goto("https://www.pixelssuite.com/");

    for (const tool of validConverterTools) {
      await page
        .getByRole("button", { name: /^Image Converter/i })
        .first()
        .click();
      await page
        .getByRole("button", { name: new RegExp(`^${tool.label}$`, "i") })
        .first()
        .click();
      await expect(page).toHaveURL(
        new RegExp(tool.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
      await expect(
        page.getByText("Convert Image", { exact: true }),
      ).toBeVisible();
      await page.goBack();
    }
  });

  for (const tool of validConverterTools) {
    test(`should load ${tool.key} tool and convert after upload`, async ({
      page,
    }) => {
      await page.goto(tool.url);

      await assertUploaderShell(page, "Convert Image", /select files/i);
      await expect(page.getByText(/Select an image to convert/i)).toBeVisible();
      await expect(page.getByText(/No image yet\./i)).toBeVisible();

      await uploadSingle(page, "car.jpg");

      await expect(page.locator('input[type="file"]').first()).toHaveValue(
        /car\.jpg/i,
      );
      await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
      await expect(page.getByText("Convert", { exact: true })).toBeVisible();
      await expect(page.getByText(/Size:/i)).toBeVisible();
      await expect(page.getByText("Format", { exact: true })).toBeVisible();
      await expect(
        page.getByRole("combobox", { name: /Choose output format/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /^Download$/i }),
      ).toBeEnabled();
    });
  }
});
