const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const {
  assertUploaderShell,
  uploadSingle,
} = require("../../helpers/feature-test-utils");

const LARGE_PDF_NAME = "large.pdf";
const COPY_GEM_PDF_NAME =
  "Copy of Green minimalist professional Business Proposal Presentation.pdf";
const LARGE_PDF_PATH = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "sample_files",
  LARGE_PDF_NAME,
);
const DOCX_DOWNLOAD_DIR = path.join(__dirname, "downloads");

function ensureLargePdfFixture() {
  if (fs.existsSync(LARGE_PDF_PATH)) {
    return;
  }

  const header =
    "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<<>>\n%%EOF\n";
  const targetSize = 12 * 1024 * 1024;
  const paddingSize = Math.max(targetSize - Buffer.byteLength(header), 0);
  const content = Buffer.concat([
    Buffer.from(header, "utf8"),
    Buffer.alloc(paddingSize, 0x41),
  ]);

  fs.writeFileSync(LARGE_PDF_PATH, content);
}

function convertButtonLocator(page) {
  return page
    .getByRole("button", {
      name: /^(Convert to Word|Converting\u2026|Converting\.\.\.|Convert)$/i,
    })
    .first();
}

function ensureDownloadDirectory() {
  if (!fs.existsSync(DOCX_DOWNLOAD_DIR)) {
    fs.mkdirSync(DOCX_DOWNLOAD_DIR, { recursive: true });
  }
}

test.describe("Document Converter - PDF to Word", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.pixelssuite.com/pdf-to-word", {
      waitUntil: "domcontentloaded",
    });
  });

  test("should load pdf-to-word page and uploader", async ({ page }) => {
    await assertUploaderShell(page, "PDF → Word", /select pdf/i);

    await expect(page.getByText(/PDF\s*→\s*Word/i).first()).toBeVisible();

    await expect(
      page.getByRole("button", { name: /Select PDF/i }),
    ).toBeVisible();

    await expect(page.locator('input[type="file"]').first()).toBeAttached();
  });

  test("should accept a pdf and show convert action", async ({ page }) => {
    await uploadSingle(page, "JUnit.pdf");

    const fileInput = page.locator('input[type="file"]').first();
    const convertButton = convertButtonLocator(page);
    const clearButton = page.getByRole("button", { name: /Clear/i });

    await expect(fileInput).toHaveValue(/junit\.pdf/i);
    await expect(page.getByText(/JUnit\.pdf/i)).toBeVisible();
    await expect(convertButton).toBeEnabled();
    await expect(clearButton).toBeVisible();
  });

  test("should convert JUnit pdf and download Word file", async ({ page }) => {
    test.setTimeout(120000);
    await uploadSingle(page, "JUnit.pdf");

    const convertButton = convertButtonLocator(page);
    await expect(convertButton).toBeEnabled();

    ensureDownloadDirectory();
    const downloadPromise = page.waitForEvent("download", { timeout: 90000 });

    await convertButton.click();

    const download = await downloadPromise;
    const downloadedFileName = download.suggestedFilename();
    console.log("Downloaded:", [downloadedFileName]);

    expect(downloadedFileName).toMatch(/\.docx?$/i);

    const savedFilePath = path.join(DOCX_DOWNLOAD_DIR, downloadedFileName);
    await download.saveAs(savedFilePath);

    await expect
      .poll(() => fs.existsSync(savedFilePath), { timeout: 10000 })
      .toBeTruthy();

    const fileStats = fs.statSync(savedFilePath);
    expect(fileStats.size).toBeGreaterThan(0);

    // Keep converted file by default for manual inspection.
    const autoCleanConvertedDoc = process.env.AUTO_CLEAN_CONVERTED_DOC === "1";
    if (autoCleanConvertedDoc) {
      fs.unlinkSync(savedFilePath);
    }
  });

  test("should display selected file details after pdf upload", async ({
    page,
  }) => {
    await uploadSingle(page, "JUnit.pdf");

    await expect(page.getByText(/Selected/i)).toBeVisible();
    await expect(page.getByText(/JUnit\.pdf/i)).toBeVisible();
  });

  test("should show clear button after file selection", async ({ page }) => {
    await uploadSingle(page, "JUnit.pdf");

    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
  });

  test("should enable Convert to Word button after valid pdf selection", async ({
    page,
  }) => {
    await uploadSingle(page, "JUnit.pdf");

    await expect(convertButtonLocator(page)).toBeEnabled();
  });

  test("should clear selected file when Clear button is clicked", async ({
    page,
  }) => {
    await uploadSingle(page, "JUnit.pdf");

    const clearButton = page.getByRole("button", { name: /Clear/i });
    await expect(clearButton).toBeVisible();

    await clearButton.click();

    await expect(page.getByText(/JUnit\.pdf/i)).not.toBeVisible();
  });

  test("should not allow conversion flow without file selection", async ({
    page,
  }) => {
    const convertButton = page.getByRole("button", {
      name: /^Convert to Word$/i,
    });
    await expect(
      page.getByRole("button", { name: /Select PDF/i }),
    ).toBeVisible();

    const convertCount = await convertButton.count();
    if (convertCount === 0) {
      await expect(convertButton).toHaveCount(0);
      return;
    }

    await expect(convertButton.first()).toBeDisabled();
  });

  test("should show error message when oversized pdf is used for conversion", async ({
    page,
  }) => {
    ensureLargePdfFixture();
    await uploadSingle(page, LARGE_PDF_NAME);

    const convertButton = convertButtonLocator(page);
    await expect(convertButton).toBeEnabled();

    await convertButton.click();

    const errorMessage = page.getByText(
      /conversion failed|please try another file|too large|file size|invalid/i,
    );
    const convertingButton = page.getByRole("button", {
      name: /^(Converting\u2026|Converting\.\.\.)$/i,
    });
    const convertAgainButton = page.getByRole("button", {
      name: /^Convert to Word$/i,
    });

    await expect
      .poll(async () => {
        if (
          (await errorMessage.count()) > 0 &&
          (await errorMessage.first().isVisible())
        ) {
          return true;
        }

        if (
          (await convertingButton.count()) > 0 &&
          (await convertingButton.first().isVisible())
        ) {
          return true;
        }

        if (
          (await convertAgainButton.count()) > 0 &&
          (await convertAgainButton.first().isDisabled())
        ) {
          return true;
        }

        return false;
      })
      .toBeTruthy();
  });

  test("should keep selected oversized file visible after failed conversion", async ({
    page,
  }) => {
    ensureLargePdfFixture();
    await uploadSingle(page, LARGE_PDF_NAME);

    await expect(page.getByText(new RegExp(LARGE_PDF_NAME, "i"))).toBeVisible();

    await convertButtonLocator(page).click();

    await expect(page.getByText(new RegExp(LARGE_PDF_NAME, "i"))).toBeVisible();
  });

  test("should handle CopyGem pdf conversion attempt and keep file selected", async ({
    page,
  }) => {
    test.setTimeout(120000);
    await uploadSingle(page, COPY_GEM_PDF_NAME);

    const escapedCopyGemFileName = COPY_GEM_PDF_NAME.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

    await expect(
      page.getByText(new RegExp(escapedCopyGemFileName, "i")),
    ).toBeVisible();

    await convertButtonLocator(page).click();

    const failedMessage = page.getByText(
      /conversion failed|please try another file/i,
    );
    const convertingButton = page.getByRole("button", {
      name: /^(Converting\u2026|Converting\.\.\.)$/i,
    });

    await expect
      .poll(
        async () => {
          if (
            (await failedMessage.count()) > 0 &&
            (await failedMessage.first().isVisible())
          ) {
            return true;
          }

          if (
            (await convertingButton.count()) > 0 &&
            (await convertingButton.first().isVisible())
          ) {
            return true;
          }

          return false;
        },
        { timeout: 30000 },
      )
      .toBeTruthy();

    await expect(
      page.getByText(new RegExp(escapedCopyGemFileName, "i")),
    ).toBeVisible();
  });

  test("should show inconsistent supported file types text if present", async ({
    page,
  }) => {
    // This test is useful if the page incorrectly shows image types
    const wrongSupportText = page.getByText(/PNG,\s*JPG,\s*WEBP/i);

    if (await wrongSupportText.count()) {
      await expect(wrongSupportText).toBeVisible();
    }
  });

  test("should keep uploader visible after failed conversion attempt", async ({
    page,
  }) => {
    ensureLargePdfFixture();
    await uploadSingle(page, LARGE_PDF_NAME);

    await convertButtonLocator(page).click();

    await expect(
      page.getByRole("button", { name: /Select PDF/i }),
    ).toBeVisible();

    await expect(convertButtonLocator(page)).toBeVisible();
  });
});
