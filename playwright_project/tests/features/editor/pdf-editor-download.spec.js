const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

test.describe("PDF Editor - Download Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-editor");
  });

  test("should download the PDF file when download button is clicked", async ({
    page,
  }) => {
    // Upload a PDF file first
    const fileInput = page.locator('input[type="file"]');
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "sample_files",
      "JUnit.pdf",
    );

    await fileInput.setInputFiles(filePath);

    // Wait for PDF to load in editor
    await page.waitForTimeout(2000);

    // Listen for download event
    const downloadPromise = page.waitForEvent("download");

    // Click download button
    const downloadButton = page.getByRole("button", { name: /download/i });
    await expect(downloadButton).toBeVisible();
    await downloadButton.click();

    // Wait for download to complete
    const download = await downloadPromise;
    const downloadedFileName = download.suggestedFilename();

    // Print the same style of download output used in custom script-based tools.
    console.log("Downloaded:", [downloadedFileName]);

    // Verify download properties
    expect(downloadedFileName).toBeTruthy();
    expect(downloadedFileName.toLowerCase().includes(".pdf")).toBeTruthy();

    // Save and verify file
    const downloadPath = path.join(__dirname, "downloads");
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    const savedFilePath = path.join(downloadPath, downloadedFileName);
    await download.saveAs(savedFilePath);

    // Verify file exists and has content
    expect(fs.existsSync(savedFilePath)).toBeTruthy();
    const fileStats = fs.statSync(savedFilePath);
    expect(fileStats.size).toBeGreaterThan(0);

    // Keep file by default. Auto-clean only when explicitly requested.
    // PowerShell: $env:AUTO_CLEAN_DOWNLOAD="1"
    const autoCleanDownload = process.env.AUTO_CLEAN_DOWNLOAD === "1";
    if (autoCleanDownload) {
      fs.unlinkSync(savedFilePath);
    }
  });

  test("should download button remain functional after UI interactions", async ({
    page,
  }) => {
    // Upload a PDF file
    const fileInput = page.locator('input[type="file"]');
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "sample_files",
      "JUnit.pdf",
    );

    await fileInput.setInputFiles(filePath);
    await page.waitForTimeout(2000);

    // Verify download button is visible
    const downloadButton = page.getByRole("button", { name: /download/i });
    await expect(downloadButton).toBeVisible();

    // Try clicking undo button (if available and enabled)
    const undoButton = page.getByRole("button", { name: /undo/i });
    if (await undoButton.isVisible()) {
      const isEnabled = await undoButton.isEnabled();
      if (isEnabled) {
        await undoButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Try clicking redo button (if available and enabled)
    const redoButton = page.getByRole("button", { name: /redo/i });
    if (await redoButton.isVisible()) {
      const isEnabled = await redoButton.isEnabled();
      if (isEnabled) {
        await redoButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Verify download button is still visible and functional
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();
  });

  test("should not allow download without uploading a file", async ({
    page,
  }) => {
    // Try to find download button without uploading file
    const downloadButton = page.getByRole("button", { name: /download/i });

    // Download button should either not exist or be disabled
    const isVisible = await downloadButton.isVisible().catch(() => false);
    if (isVisible) {
      const isDisabled = await downloadButton.isDisabled();
      expect(isDisabled).toBeTruthy();
    }
  });

  test("should maintain download button visibility during toolbar interactions", async ({
    page,
  }) => {
    // Upload a PDF file
    const fileInput = page.locator('input[type="file"]');
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "sample_files",
      "JUnit.pdf",
    );

    await fileInput.setInputFiles(filePath);
    await page.waitForTimeout(2000);

    // Download button should be visible
    const downloadButton = page.getByRole("button", { name: /download/i });
    await expect(downloadButton).toBeVisible();

    // Try interacting with other toolbar buttons
    const selectButton = page.getByRole("button", { name: /select/i });
    if (await selectButton.isVisible()) {
      await selectButton.click();
      await page.waitForTimeout(500);
    }

    // Download button should still be visible
    await expect(downloadButton).toBeVisible();
  });
});
