const { test, expect } = require("@playwright/test");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

const cropTools = [
  {
    label: "To JPG",
    url: "https://www.pixelssuite.com/crop-jpg",
    heading: "Crop JPG",
  },
  {
    label: "To PNG",
    url: "https://www.pixelssuite.com/crop-png",
    heading: "Crop PNG",
  },
  {
    label: "To WebP",
    url: "https://www.pixelssuite.com/crop-webp",
    heading: "Crop WebP",
  },
];

test.describe("Crop Tab", () => {
  test("should navigate from homepage crop section to each crop tool", async ({
    page,
  }) => {
    await page.goto("https://www.pixelssuite.com/");

    for (const tool of cropTools) {
      await page
        .getByRole("button", { name: new RegExp(`^${tool.label}$`, "i") })
        .first()
        .click();
      await expect(page).toHaveURL(
        new RegExp(tool.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
      await expect(page.getByText(tool.heading, { exact: true })).toBeVisible();
      await page.goBack();
    }
  });

  for (const tool of cropTools) {
    test(`should load ${tool.heading} tool and accept car.webp`, async ({
      page,
    }) => {
      await page.goto(tool.url);

      await assertUploaderShell(page, tool.heading, /select files/i);
      await expect(page.getByText(/Select an image to crop/i)).toBeVisible();
      await expect(page.getByText(/No image yet\./i)).toBeVisible();

      await uploadSingle(page, "car.webp");

      await expect(page.locator('input[type="file"]').first()).toHaveValue(
        /car\.webp/i,
      );
      await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
      await expect(page.getByText(/Original:/i)).toBeVisible();
      await expect(
        page.getByRole("spinbutton", { name: /^X$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("spinbutton", { name: /^Y$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("spinbutton", { name: /^Width$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("spinbutton", { name: /^Height$/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /^Download$/i }),
      ).toBeEnabled();
    });
  }
});
