const { test, expect } = require("@playwright/test");
const fs = require("fs");
const {
  assertUploaderShell,
  fixture,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

function buildSizedPng(targetBytes, fileName) {
  const tinyPng = fs.readFileSync(fixture("tiny.png"));
  const paddingBytes = Math.max(targetBytes - tinyPng.length, 0);

  return {
    name: fileName,
    mimeType: "image/png",
    buffer: Buffer.concat([tinyPng, Buffer.alloc(paddingBytes, 0)]),
  };
}

test.describe("Compress - PNG Compressor", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/png-compressor");
  });

  test("should load png-compressor page", async ({ page }) => {
    await assertUploaderShell(page, "PNG Compressor", /select files/i);
    await expect(
      page.getByText(/Select a PNG image to re-encode/i),
    ).toBeVisible();
    await expect(page.getByText(/No image yet\./i)).toBeVisible();
  });

  test("should upload tiny.png and show png compression actions", async ({
    page,
  }) => {
    await uploadSingle(page, "tiny.png");

    await expect(page.locator('input[type="file"]').first()).toHaveValue(
      /tiny\.png/i,
    );
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
    await expect(page.getByText(/PNG compression is lossless/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();
  });

  test("should show max upload size guidance", async ({ page }) => {
    await expect(page.getByText(/Supported: PNG, JPG, WEBP/i)).toBeVisible();
    await expect(page.getByText(/Max 20MB/i)).toBeVisible();
  });

  test("should block PNG uploads larger than 20MB", async ({ page }) => {
    const withinLimit = buildSizedPng(20 * 1024 * 1024, "within-limit.png");
    const overLimit = buildSizedPng(21 * 1024 * 1024, "over-limit.png");
    const fileInput = page.locator('input[type="file"]').first();

    await fileInput.setInputFiles(withinLimit);
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).toBeEnabled();

    await page.getByRole("button", { name: /Clear/i }).click();
    await expect(page.getByText(/No image yet\./i)).toBeVisible();

    await fileInput.setInputFiles(overLimit);

    await expect(page.getByText(/No image yet\./i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Download PNG/i }),
    ).not.toBeVisible();
  });
});
