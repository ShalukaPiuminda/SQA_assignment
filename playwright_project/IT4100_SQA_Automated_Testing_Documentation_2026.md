# BSc (Hons) in Information Technology - Year 4

# Assignment 2026 - IT4100 SQA Semester 1

## Automated Testing Documentation

### 1. System Under Test

- Application: https://www.pixelssuite.com/
- Scope used in this project: Homepage, Navigation, Compress, Crop, Document Converter, PDF Editor, Image Converter, Resize, More tools
- Out of scope: Transliteration feature

### 2. Automation Tool and Environment

- Tool: Playwright (@playwright/test)
- Project path: c:/Users/Piuminda Jayaweera/Desktop/SQA/sqa_assignment/playwright_project
- Tests location: tests/
- Sample input files location: sample_files/
- Execution artifacts location: test-results/
- HTML report location: playwright-report/index.html

### 2.1 Sample Automation Scripts

The following short snippets are included to satisfy the requirement "Automated test cases with scripts".

ATC-043 - Homepage Load (Playwright example)

```javascript
const { test, expect } = require("@playwright/test");

test("should load homepage successfully", async ({ page }) => {
  await page.goto("https://www.pixelssuite.com/");
  await expect(page).toHaveTitle(/Pixelss|Pixelssuite/i);
});
```

ATC-029 - Image Converter Route Navigation (Playwright example)

```javascript
const { test, expect } = require("@playwright/test");

test("should open each image converter route from top navigation", async ({
  page,
}) => {
  await page.goto("https://www.pixelssuite.com/");
  await page
    .getByRole("button", { name: /^Image Converter/i })
    .first()
    .click();
  await page
    .getByRole("button", { name: /^To JPG$/i })
    .first()
    .click();
  await expect(page).toHaveURL(/convert-to-jpg/i);
});
```

ATC-001 - Homepage Load (Selenium example for cross-tool member)

```java
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class HomePageSeleniumTest {
	@Test
	void shouldLoadHomePage() {
		WebDriver driver = new ChromeDriver();
		try {
			driver.get("https://www.pixelssuite.com/");
			assertTrue(driver.getTitle().toLowerCase().contains("pixel"));
		} finally {
			driver.quit();
		}
	}
}
```

ATC-050 - Navigate to PDF Editor (Selenium example)

```java
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class NavigationSeleniumTest {
	@Test
	void shouldNavigateToPdfEditor() {
		WebDriver driver = new ChromeDriver();
		try {
			driver.get("https://www.pixelssuite.com/");
			driver.findElement(By.linkText("PDF Editor")).click();
			assertTrue(driver.getCurrentUrl().contains("pdf-editor"));
		} finally {
			driver.quit();
		}
	}
}
```

ATC-006 - PNG Compressor Upload (Playwright small snippet)

```javascript
const { test, expect } = require("@playwright/test");

test("should upload tiny.png and show png compression actions", async ({
  page,
}) => {
  await page.goto("https://www.pixelssuite.com/png-compressor");
  await page
    .locator('input[type="file"]')
    .first()
    .setInputFiles("sample_files/tiny.png");
  await expect(
    page.getByRole("button", { name: /Download PNG/i }),
  ).toBeEnabled();
});
```

ATC-027 - PDF Upload (Playwright small snippet)

```javascript
const { test, expect } = require("@playwright/test");

test("should allow selecting a PDF file", async ({ page }) => {
  await page.goto("https://www.pixelssuite.com/pdf-editor");
  await page
    .locator('input[type="file"]')
    .setInputFiles("sample_files/JUnit.pdf");
  await expect(page.locator('input[type="file"]')).toHaveValue(/junit\.pdf/i);
});
```

ATC-048 - Navigation Area Visible (Cypress small snippet)

```javascript
describe("Navigation", () => {
  it("should display navigation area", () => {
    cy.visit("https://www.pixelssuite.com/");
    cy.get("header, nav").should("be.visible");
  });
});
```

ATC-047 - Main Sections Visible (TestNG + Selenium small snippet)

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

public class HomeSectionsTest {
		@Test
		public void shouldDisplayVisibleMainSections() {
				WebDriver driver = new ChromeDriver();
				try {
						driver.get("https://www.pixelssuite.com/");
						Assert.assertTrue(driver.findElements(By.tagName("section")).size() > 0);
				} finally {
						driver.quit();
				}
		}
}
```

### 3. Execution Summary (Latest Run)

- Total automated script files: 20
- Total automated test cases: 52
- Latest run status file: test-results/.last-run.json
- Latest run status: passed
- Failed tests in latest run: 0

### 4. Automated Test Cases with Scripts

| Test Case ID | Automated Test Scenario                                                | Script File Path                                           | Script Reference |
| ------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------- |
| AUTO-TC-001  | should load compress image page                                        | tests/features/compress/compress-gif.spec.js               | line 9           |
| AUTO-TC-002  | should upload sample gif and show compress-image controls              | tests/features/compress/compress-gif.spec.js               | line 19          |
| AUTO-TC-003  | should load gif-compressor page                                        | tests/features/compress/gif-compressor.spec.js             | line 12          |
| AUTO-TC-004  | should upload sample.gif and show GIF compression controls             | tests/features/compress/gif-compressor.spec.js             | line 18          |
| AUTO-TC-005  | should load png-compressor page                                        | tests/features/compress/png-compressor.spec.js             | line 12          |
| AUTO-TC-006  | should upload tiny.png and show png compression actions                | tests/features/compress/png-compressor.spec.js             | line 20          |
| AUTO-TC-007  | should navigate from homepage crop section to each crop tool           | tests/features/crop/crop-tab.spec.js                       | line 26          |
| AUTO-TC-008  | should load ${tool.heading} tool and accept car.webp                   | tests/features/crop/crop-tab.spec.js                       | line 45          |
| AUTO-TC-009  | should load image-to-pdf tool with expected controls                   | tests/features/document-converter/image-to-pdf.spec.js     | line 12          |
| AUTO-TC-010  | should accept an image and enable create pdf action                    | tests/features/document-converter/image-to-pdf.spec.js     | line 31          |
| AUTO-TC-011  | should load pdf-to-word page and uploader                              | tests/features/document-converter/pdf-to-word.spec.js      | line 12          |
| AUTO-TC-012  | should accept a pdf and show convert action                            | tests/features/document-converter/pdf-to-word.spec.js      | line 19          |
| AUTO-TC-013  | should load word-to-pdf page and uploader                              | tests/features/document-converter/word-to-pdf.spec.js      | line 12          |
| AUTO-TC-014  | should accept a docx file and enable conversion                        | tests/features/document-converter/word-to-pdf.spec.js      | line 19          |
| AUTO-TC-015  | should display zoom controls                                           | tests/features/editor/pdf-editor-controls.spec.js          | line 8           |
| AUTO-TC-016  | should display page navigation controls                                | tests/features/editor/pdf-editor-controls.spec.js          | line 12          |
| AUTO-TC-017  | should display current page number                                     | tests/features/editor/pdf-editor-controls.spec.js          | line 17          |
| AUTO-TC-018  | should display download button                                         | tests/features/editor/pdf-editor-controls.spec.js          | line 21          |
| AUTO-TC-019  | should load the PDF Editor page successfully                           | tests/features/editor/pdf-editor-load.spec.js              | line 8           |
| AUTO-TC-020  | should show the main working sections                                  | tests/features/editor/pdf-editor-load.spec.js              | line 13          |
| AUTO-TC-021  | should remain stable after refresh                                     | tests/features/editor/pdf-editor-stability.spec.js         | line 5           |
| AUTO-TC-022  | should remain stable after clicking several visible controls           | tests/features/editor/pdf-editor-stability.spec.js         | line 11          |
| AUTO-TC-023  | should display the file chooser                                        | tests/features/editor/pdf-editor-toolbar.spec.js           | line 9           |
| AUTO-TC-024  | should display undo, redo, and download buttons                        | tests/features/editor/pdf-editor-toolbar.spec.js           | line 13          |
| AUTO-TC-025  | should display toolbar controls area                                   | tests/features/editor/pdf-editor-toolbar.spec.js           | line 19          |
| AUTO-TC-026  | should show all key editing controls after uploading a PDF             | tests/features/editor/pdf-editor-toolbar.spec.js           | line 24          |
| AUTO-TC-027  | should allow selecting a PDF file                                      | tests/features/editor/pdf-editor-upload.spec.js            | line 9           |
| AUTO-TC-028  | should render core sections on ${viewport.label}                       | tests/features/editor/responsive.spec.js                   | line 11          |
| AUTO-TC-029  | should open each image converter route from top navigation             | tests/features/image-converter/image-converter-tab.spec.js | line 26          |
| AUTO-TC-030  | should load ${tool.key} tool and convert after upload                  | tests/features/image-converter/image-converter-tab.spec.js | line 51          |
| AUTO-TC-031  | should open each more tool route from top navigation                   | tests/features/more/more-tab.spec.js                       | line 36          |
| AUTO-TC-032  | should validate rotate image flow                                      | tests/features/more/more-tab.spec.js                       | line 57          |
| AUTO-TC-033  | should validate flip image flow                                        | tests/features/more/more-tab.spec.js                       | line 74          |
| AUTO-TC-034  | should validate meme generator flow                                    | tests/features/more/more-tab.spec.js                       | line 93          |
| AUTO-TC-035  | should validate color picker controls                                  | tests/features/more/more-tab.spec.js                       | line 112         |
| AUTO-TC-036  | should validate image-to-text OCR flow                                 | tests/features/more/more-tab.spec.js                       | line 126         |
| AUTO-TC-037  | should load bulk-resize options and disabled process button by default | tests/features/resize/bulk-resize.spec.js                  | line 9           |
| AUTO-TC-038  | should accept multiple files and enable process and download           | tests/features/resize/bulk-resize.spec.js                  | line 23          |
| AUTO-TC-039  | should load image-enlarger page correctly                              | tests/features/resize/image-enlarger.spec.js               | line 12          |
| AUTO-TC-040  | should upload image and display enlarge download flow                  | tests/features/resize/image-enlarger.spec.js               | line 18          |
| AUTO-TC-041  | should load resize-image page with controls                            | tests/features/resize/resize-image.spec.js                 | line 12          |
| AUTO-TC-042  | should upload image and expose resize download action                  | tests/features/resize/resize-image.spec.js                 | line 20          |
| AUTO-TC-043  | should load homepage successfully                                      | tests/homepage.spec.js                                     | line 8           |
| AUTO-TC-044  | should display page title                                              | tests/homepage.spec.js                                     | line 12          |
| AUTO-TC-045  | should display main heading or hero section                            | tests/homepage.spec.js                                     | line 16          |
| AUTO-TC-046  | should not show blank page                                             | tests/homepage.spec.js                                     | line 20          |
| AUTO-TC-047  | should display visible main sections                                   | tests/homepage.spec.js                                     | line 24          |
| AUTO-TC-048  | should display navigation area                                         | tests/navigation.spec.js                                   | line 8           |
| AUTO-TC-049  | should display logo or site branding                                   | tests/navigation.spec.js                                   | line 12          |
| AUTO-TC-050  | should navigate to PDF Editor page                                     | tests/navigation.spec.js                                   | line 16          |
| AUTO-TC-051  | should support browser back after navigation                           | tests/navigation.spec.js                                   | line 22          |
| AUTO-TC-052  | should remain stable after refresh                                     | tests/navigation.spec.js                                   | line 32          |

### 5. Test Execution Results with Screenshots

Execution evidence images are generated as test-finished-1.png files under each test artifact folder in test-results/.

| Evidence ID  | Image File Name     | Image Path                                                                                    |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------- |
| AUTO-EVD-001 | test-finished-1.png | test-results/features-compress-compress-58029-how-compress-image-controls/test-finished-1.png |
| AUTO-EVD-002 | test-finished-1.png | test-results/features-compress-compress-e4fc8-ld-load-compress-image-page/test-finished-1.png |
| AUTO-EVD-003 | test-finished-1.png | test-results/features-compress-gif-comp-42561-ld-load-gif-compressor-page/test-finished-1.png |
| AUTO-EVD-004 | test-finished-1.png | test-results/features-compress-gif-comp-5a84f-ow-GIF-compression-controls/test-finished-1.png |
| AUTO-EVD-005 | test-finished-1.png | test-results/features-compress-png-comp-1a019-ld-load-png-compressor-page/test-finished-1.png |
| AUTO-EVD-006 | test-finished-1.png | test-results/features-compress-png-comp-beda5-how-png-compression-actions/test-finished-1.png |
| AUTO-EVD-007 | test-finished-1.png | test-results/features-crop-crop-tab-Cro-5d886-NG-tool-and-accept-car-webp/test-finished-1.png |
| AUTO-EVD-008 | test-finished-1.png | test-results/features-crop-crop-tab-Cro-820be-PG-tool-and-accept-car-webp/test-finished-1.png |
| AUTO-EVD-009 | test-finished-1.png | test-results/features-crop-crop-tab-Cro-89c36-p-section-to-each-crop-tool/test-finished-1.png |
| AUTO-EVD-010 | test-finished-1.png | test-results/features-crop-crop-tab-Cro-99134-bP-tool-and-accept-car-webp/test-finished-1.png |
| AUTO-EVD-011 | test-finished-1.png | test-results/features-document-converte-31c43-f-to-word-page-and-uploader/test-finished-1.png |
| AUTO-EVD-012 | test-finished-1.png | test-results/features-document-converte-83f47-nd-enable-create-pdf-action/test-finished-1.png |
| AUTO-EVD-013 | test-finished-1.png | test-results/features-document-converte-97d16--file-and-enable-conversion/test-finished-1.png |
| AUTO-EVD-014 | test-finished-1.png | test-results/features-document-converte-b5a22-rd-to-pdf-page-and-uploader/test-finished-1.png |
| AUTO-EVD-015 | test-finished-1.png | test-results/features-document-converte-b7bfb-tool-with-expected-controls/test-finished-1.png |
| AUTO-EVD-016 | test-finished-1.png | test-results/features-document-converte-be52e-pdf-and-show-convert-action/test-finished-1.png |
| AUTO-EVD-017 | test-finished-1.png | test-results/features-editor-pdf-editor-0bb61-ld-display-the-file-chooser/test-finished-1.png |
| AUTO-EVD-018 | test-finished-1.png | test-results/features-editor-pdf-editor-22bc5-DF-Editor-page-successfully/test-finished-1.png |
| AUTO-EVD-019 | test-finished-1.png | test-results/features-editor-pdf-editor-4b012-o-redo-and-download-buttons/test-finished-1.png |
| AUTO-EVD-020 | test-finished-1.png | test-results/features-editor-pdf-editor-51dcb-display-current-page-number/test-finished-1.png |
| AUTO-EVD-021 | test-finished-1.png | test-results/features-editor-pdf-editor-5b7f1-w-the-main-working-sections/test-finished-1.png |
| AUTO-EVD-022 | test-finished-1.png | test-results/features-editor-pdf-editor-79871--allow-selecting-a-PDF-file/test-finished-1.png |
| AUTO-EVD-023 | test-finished-1.png | test-results/features-editor-pdf-editor-8eb52-uld-display-download-button/test-finished-1.png |
| AUTO-EVD-024 | test-finished-1.png | test-results/features-editor-pdf-editor-ab1b2-trols-after-uploading-a-PDF/test-finished-1.png |
| AUTO-EVD-025 | test-finished-1.png | test-results/features-editor-pdf-editor-b1f88-ng-several-visible-controls/test-finished-1.png |
| AUTO-EVD-026 | test-finished-1.png | test-results/features-editor-pdf-editor-e5883-hould-display-zoom-controls/test-finished-1.png |
| AUTO-EVD-027 | test-finished-1.png | test-results/features-editor-pdf-editor-e7d80-ay-page-navigation-controls/test-finished-1.png |
| AUTO-EVD-028 | test-finished-1.png | test-results/features-editor-pdf-editor-f7bc2-splay-toolbar-controls-area/test-finished-1.png |
| AUTO-EVD-029 | test-finished-1.png | test-results/features-editor-pdf-editor-f8059-remain-stable-after-refresh/test-finished-1.png |
| AUTO-EVD-030 | test-finished-1.png | test-results/features-editor-responsive-1387b-der-core-sections-on-tablet/test-finished-1.png |
| AUTO-EVD-031 | test-finished-1.png | test-results/features-editor-responsive-2919d-er-core-sections-on-desktop/test-finished-1.png |
| AUTO-EVD-032 | test-finished-1.png | test-results/features-editor-responsive-d71fb-der-core-sections-on-mobile/test-finished-1.png |
| AUTO-EVD-033 | test-finished-1.png | test-results/features-image-converter-i-6fdb0-r-route-from-top-navigation/test-finished-1.png |
| AUTO-EVD-034 | test-finished-1.png | test-results/features-image-converter-i-97c84-ol-and-convert-after-upload/test-finished-1.png |
| AUTO-EVD-035 | test-finished-1.png | test-results/features-image-converter-i-c6c14-ol-and-convert-after-upload/test-finished-1.png |
| AUTO-EVD-036 | test-finished-1.png | test-results/features-image-converter-i-cbe8b-ol-and-convert-after-upload/test-finished-1.png |
| AUTO-EVD-037 | test-finished-1.png | test-results/features-more-more-tab-Mor-313c6--validate-rotate-image-flow/test-finished-1.png |
| AUTO-EVD-038 | test-finished-1.png | test-results/features-more-more-tab-Mor-44ec0-idate-color-picker-controls/test-finished-1.png |
| AUTO-EVD-039 | test-finished-1.png | test-results/features-more-more-tab-Mor-48e04-ld-validate-flip-image-flow/test-finished-1.png |
| AUTO-EVD-040 | test-finished-1.png | test-results/features-more-more-tab-Mor-68adf-date-image-to-text-OCR-flow/test-finished-1.png |
| AUTO-EVD-041 | test-finished-1.png | test-results/features-more-more-tab-Mor-ceb4f-alidate-meme-generator-flow/test-finished-1.png |
| AUTO-EVD-042 | test-finished-1.png | test-results/features-more-more-tab-Mor-f96f9-l-route-from-top-navigation/test-finished-1.png |
| AUTO-EVD-043 | test-finished-1.png | test-results/features-resize-bulk-resiz-3a884-enable-process-and-download/test-finished-1.png |
| AUTO-EVD-044 | test-finished-1.png | test-results/features-resize-bulk-resiz-d178c-d-process-button-by-default/test-finished-1.png |
| AUTO-EVD-045 | test-finished-1.png | test-results/features-resize-image-enla-b76f3-splay-enlarge-download-flow/test-finished-1.png |
| AUTO-EVD-046 | test-finished-1.png | test-results/features-resize-image-enla-e0ba5-age-enlarger-page-correctly/test-finished-1.png |
| AUTO-EVD-047 | test-finished-1.png | test-results/features-resize-resize-ima-985fb-ze-image-page-with-controls/test-finished-1.png |
| AUTO-EVD-048 | test-finished-1.png | test-results/features-resize-resize-ima-a6218-pose-resize-download-action/test-finished-1.png |
| AUTO-EVD-049 | test-finished-1.png | test-results/homepage-Homepage-should-d-146f6-ain-heading-or-hero-section/test-finished-1.png |
| AUTO-EVD-050 | test-finished-1.png | test-results/homepage-Homepage-should-display-page-title/test-finished-1.png                  |
| AUTO-EVD-051 | test-finished-1.png | test-results/homepage-Homepage-should-display-visible-main-sections/test-finished-1.png       |
| AUTO-EVD-052 | test-finished-1.png | test-results/homepage-Homepage-should-load-homepage-successfully/test-finished-1.png          |
| AUTO-EVD-053 | test-finished-1.png | test-results/homepage-Homepage-should-not-show-blank-page/test-finished-1.png                 |
| AUTO-EVD-054 | test-finished-1.png | test-results/navigation-Navigation-shou-8b3c5-owser-back-after-navigation/test-finished-1.png |
| AUTO-EVD-055 | test-finished-1.png | test-results/navigation-Navigation-should-display-logo-or-site-branding/test-finished-1.png   |
| AUTO-EVD-056 | test-finished-1.png | test-results/navigation-Navigation-should-display-navigation-area/test-finished-1.png         |
| AUTO-EVD-057 | test-finished-1.png | test-results/navigation-Navigation-should-navigate-to-PDF-Editor-page/test-finished-1.png     |
| AUTO-EVD-058 | test-finished-1.png | test-results/navigation-Navigation-should-remain-stable-after-refresh/test-finished-1.png     |

Additional report images are also available under playwright-report/data/\*.png and can be used in appendix pages.

### 6. Defects Found (Automated Testing)

Based on the latest available automation execution:

- Source: test-results/.last-run.json
- Run status: passed
- Failed tests: none
- Defects reproduced by automation in this latest run: none

Defect log table for assignment format:

| Defect ID | Related Test Case ID | Feature | Description                                           | Severity | Priority | Status                                     | Evidence Path               |
| --------- | -------------------- | ------- | ----------------------------------------------------- | -------- | -------- | ------------------------------------------ | --------------------------- |
| N/A       | N/A                  | N/A     | No failures were produced in the latest executed run. | N/A      | N/A      | Closed (No active defects from latest run) | test-results/.last-run.json |

### 7. Script Files Inventory (Playwright)

- tests/homepage.spec.js
- tests/navigation.spec.js
- tests/features/compress/compress-gif.spec.js
- tests/features/compress/gif-compressor.spec.js
- tests/features/compress/png-compressor.spec.js
- tests/features/crop/crop-tab.spec.js
- tests/features/document-converter/image-to-pdf.spec.js
- tests/features/document-converter/pdf-to-word.spec.js
- tests/features/document-converter/word-to-pdf.spec.js
- tests/features/editor/pdf-editor-controls.spec.js
- tests/features/editor/pdf-editor-load.spec.js
- tests/features/editor/pdf-editor-stability.spec.js
- tests/features/editor/pdf-editor-toolbar.spec.js
- tests/features/editor/pdf-editor-upload.spec.js
- tests/features/editor/responsive.spec.js
- tests/features/image-converter/image-converter-tab.spec.js
- tests/features/more/more-tab.spec.js
- tests/features/resize/bulk-resize.spec.js
- tests/features/resize/image-enlarger.spec.js
- tests/features/resize/resize-image.spec.js

### 8. Recommended Appendix References

- HTML execution report: playwright-report/index.html
- Execution status summary: test-results/.last-run.json
- Test execution screenshots: all test-results/\*\*/test-finished-1.png files listed above
