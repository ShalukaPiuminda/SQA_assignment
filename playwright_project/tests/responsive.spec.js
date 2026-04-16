const { test, expect } = require("@playwright/test");

const viewports = [
  { label: "mobile", width: 390, height: 844 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1366, height: 768 },
];

test.describe("Responsive - PDF Editor", () => {
  for (const viewport of viewports) {
    test(`should render core sections on ${viewport.label}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("https://www.pixelssuite.com/pdf-editor");

      await expect(page.getByText(/PDF Editor/i)).toBeVisible();
      await expect(page.getByText(/Toolbar/i)).toBeVisible();
      await expect(page.getByText(/Page/i)).toBeVisible();
      await expect(page.locator('input[type="file"]')).toBeVisible();
      await expect(
        page.getByRole("button", { name: /download/i }),
      ).toBeVisible();
    });
  }
});
