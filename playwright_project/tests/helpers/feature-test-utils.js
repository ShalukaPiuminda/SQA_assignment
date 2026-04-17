const path = require("path");
const { expect } = require("@playwright/test");

function fixture(name) {
  return path.join(__dirname, "..", "..", "sample_files", name);
}

async function assertUploaderShell(page, headingText, selectButtonPattern) {
  await expect(page.getByText(headingText, { exact: true })).toBeVisible();
  await expect(page.getByText(/Drag and drop your file here/i)).toBeVisible();
  await expect(
    page.getByText(/or click to browse from your device/i),
  ).toBeVisible();
  await expect(page.getByText(/Supported: PNG, JPG, WEBP/i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: selectButtonPattern }),
  ).toBeVisible();
}

async function uploadSingle(page, fileName) {
  await page
    .locator('input[type="file"]')
    .first()
    .setInputFiles(fixture(fileName));
}

async function uploadMany(page, fileNames) {
  const files = fileNames.map((name) => fixture(name));
  await page.locator('input[type="file"]').first().setInputFiles(files);
}

module.exports = {
  fixture,
  assertUploaderShell,
  uploadSingle,
  uploadMany,
};
