# Test Command Reference Guide

This guide documents all available commands to run Playwright tests feature-wise, all tests, and generate reports for the PixelsSuite test suite.

## Quick Start

### Windows (Using Batch Script)

```bash
# Run help menu
run-tests.bat help

# Run all tests
run-tests.bat all

# Run specific feature
run-tests.bat compress

# Generate full report
run-tests.bat report-all
```

### Linux/Mac (Using Shell Script)

```bash
# Make script executable (first time only)
chmod +x run-tests.sh

# Run help menu
./run-tests.sh help

# Run all tests
./run-tests.sh all

# Run specific feature
./run-tests.sh compress

# Generate full report
./run-tests.sh report-all
```

---

## Feature-Wise Test Commands

### Editor Tests (PDF Editor Functionality)

```bash
# Windows
run-tests.bat editor

# Linux/Mac
./run-tests.sh editor

# Direct npx command
npx playwright test tests/features/editor --reporter=list
```

**Includes:** PDF upload, editor controls, toolbar, stability, responsive design
**Sample Files Used:** JUnit.pdf

### Compress Tests (Image Compression)

```bash
# Windows
run-tests.bat compress

# Linux/Mac
./run-tests.sh compress

# Direct npx command
npx playwright test tests/features/compress --reporter=list
```

**Includes:**

- Compress Image (quality slider)
- GIF Compressor (optimization levels, colors, lossy)
- PNG Compressor (lossless re-encoding)

**Sample Files Used:** sample.gif, tiny.png

### Crop Tests (Image Cropping)

```bash
# Windows
run-tests.bat crop

# Linux/Mac
./run-tests.sh crop

# Direct npx command
npx playwright test tests/features/crop --reporter=list
```

**Includes:** Crop to JPG, PNG, WebP formats
**Sample Files Used:** car.webp

### Document Converter Tests

```bash
# Windows
run-tests.bat document

# Linux/Mac
./run-tests.sh document

# Direct npx command
npx playwright test tests/features/document-converter --reporter=list
```

**Includes:**

- Image to PDF
- PDF to Word
- Word to PDF

**Sample Files Used:** JUnit.pdf, sample.docx

### Resize Tests

```bash
# Windows
run-tests.bat resize

# Linux/Mac
./run-tests.sh resize

# Direct npx command
npx playwright test tests/features/resize --reporter=list
```

**Includes:**

- Single Image Resize
- Bulk Resize
- Image Enlarger

**Sample Files Used:** tiny.png, tiny-2.png

### Image Converter Tests

```bash
# Windows
run-tests.bat image-converter

# Linux/Mac
./run-tests.sh image-converter

# Direct npx command
npx playwright test tests/features/image-converter --reporter=list
```

**Includes:** Convert to JPG, PNG, WebP
**Sample Files Used:** car.jpg

### More Tools Tests

```bash
# Windows
run-tests.bat more

# Linux/Mac
./run-tests.sh more

# Direct npx command
npx playwright test tests/features/more --reporter=list
```

**Includes:**

- Rotate Image (angle, flip)
- Flip Image (horizontal, vertical)
- Meme Generator (text, font, colors)
- Color Picker (hex, RGB, HSV, CMYK)
- Image to Text / OCR (multi-language)

**Sample Files Used:** car.jpg

---

## Run All Tests

### Full Test Suite

```bash
# Windows
run-tests.bat all

# Linux/Mac
./run-tests.sh all

# Direct npx command
npx playwright test tests/features --reporter=list
```

### With Different Reporters

#### HTML Report (Visual Report)

```bash
npx playwright test tests/features --reporter=html
# Report opens in browser automatically
# Manual path: playwright-report/index.html
```

#### JSON Report (Machine Readable)

```bash
npx playwright test tests/features --reporter=json > test-results.json
```

#### JUnit Report (CI/CD Integration)

```bash
npx playwright test tests/features --reporter=junit --reporter-junit-output-file=junit-report.xml
```

#### List Report (Console Output - Default)

```bash
npx playwright test tests/features --reporter=list
```

---

## Report Generation

### Generate Full HTML Report

```bash
# Windows
run-tests.bat report-all

# Linux/Mac
./run-tests.sh report-all

# Direct npx command
npx playwright test tests/features --reporter=html
# Open: playwright-report/index.html
```

### Generate Feature-Specific Reports

```bash
# Windows - Editor report
run-tests.bat report-feature editor

# Windows - Compress report
run-tests.bat report-feature compress

# Linux/Mac - Editor report
./run-tests.sh report-feature editor

# Linux/Mac - Compress report
./run-tests.sh report-feature compress

# Direct npx command - Editor report
npx playwright test tests/features/editor --reporter=html=playwright-report-editor
# Open: playwright-report-editor/index.html
```

### All Available Feature-Specific Reports

- `run-tests.bat report-feature editor`
- `run-tests.bat report-feature compress`
- `run-tests.bat report-feature crop`
- `run-tests.bat report-feature document-converter`
- `run-tests.bat report-feature resize`
- `run-tests.bat report-feature image-converter`
- `run-tests.bat report-feature more`

---

## Advanced Test Commands

### Run Tests with Specific Browser

```bash
# Chromium (default)
npx playwright test tests/features --project=chromium --reporter=list

# Firefox
npx playwright test tests/features --project=firefox --reporter=list

# WebKit
npx playwright test tests/features --project=webkit --reporter=list

# All browsers
npx playwright test tests/features --reporter=list
```

### Run Tests with Debugging

```bash
# Debug mode (opens inspector)
npx playwright test tests/features --debug

# Headed mode (shows browser)
npx playwright test tests/features --headed

# Verbose mode
npx playwright test tests/features --verbose
```

### Run Specific Test File

```bash
npx playwright test tests/features/compress/compress-gif.spec.js --reporter=list
```

### Run Tests Matching Pattern

```bash
# Run tests with "compress" in the name
npx playwright test -g "compress" --reporter=list

# Run tests with "navigation" in the name
npx playwright test -g "navigation" --reporter=list
```

### Parallel Execution

```bash
# Run with 4 workers (default)
npx playwright test tests/features --reporter=list

# Run with 1 worker (serial)
npx playwright test tests/features --workers=1 --reporter=list

# Run with 8 workers
npx playwright test tests/features --workers=8 --reporter=list
```

### Update Snapshots

```bash
# Update all visual/snapshot comparisons
npx playwright test tests/features --update-snapshots
```

---

## Test Structure Overview

```
tests/features/
├── editor/                          (6 test files)
│   ├── pdf-editor-load.spec.js
│   ├── pdf-editor-controls.spec.js
│   ├── pdf-editor-upload.spec.js
│   ├── pdf-editor-toolbar.spec.js
│   ├── pdf-editor-stability.spec.js
│   └── pdf-editor-responsive.spec.js
│
├── compress/                        (3 test files)
│   ├── compress-image.spec.js
│   ├── gif-compressor.spec.js
│   └── png-compressor.spec.js
│
├── crop/                            (1 test file)
│   └── crop-tab.spec.js
│
├── document-converter/              (3 test files)
│   ├── image-to-pdf.spec.js
│   ├── pdf-to-word.spec.js
│   └── word-to-pdf.spec.js
│
├── resize/                          (3 test files)
│   ├── resize-image.spec.js
│   ├── bulk-resize.spec.js
│   └── image-enlarger.spec.js
│
├── image-converter/                 (1 test file)
│   └── image-converter-tab.spec.js
│
└── more/                            (1 test file)
    └── more-tab.spec.js
```

**Total: 18 test files, 48+ test cases**

---

## Sample Files Reference

| Feature            | Sample File            | Location      |
| ------------------ | ---------------------- | ------------- |
| PDF Editor         | JUnit.pdf              | sample_files/ |
| Document Converter | JUnit.pdf, sample.docx | sample_files/ |
| Compress (Image)   | sample.gif             | sample_files/ |
| Compress (PNG)     | tiny.png               | sample_files/ |
| Crop               | car.webp               | sample_files/ |
| Image Converter    | car.jpg                | sample_files/ |
| Resize             | tiny.png, tiny-2.png   | sample_files/ |
| More Tools         | car.jpg                | sample_files/ |

---

## CI/CD Integration Examples

### GitHub Actions

```yaml
- name: Run All Tests
  run: npx playwright test tests/features --reporter=junit --reporter-junit-output-file=junit-report.xml

- name: Run Feature Tests
  run: npx playwright test tests/features/compress --reporter=junit
```

### Jenkins

```groovy
stage('Test') {
    steps {
        sh 'npm install'
        sh 'npx playwright test tests/features --reporter=junit --reporter-junit-output-file=junit-report.xml'
    }
    post {
        always {
            junit 'junit-report.xml'
        }
    }
}
```

### Azure Pipelines

```yaml
- script: npx playwright test tests/features --reporter=junit --reporter-junit-output-file=junit-report.xml
  displayName: "Run Playwright Tests"

- task: PublishTestResults@2
  inputs:
    testResultsFormat: "JUnit"
    testResultsFiles: "junit-report.xml"
```

---

## Troubleshooting

### Tests Won't Run

1. Ensure dependencies are installed:

   ```bash
   npm install
   ```

2. Check Node.js version:

   ```bash
   node --version
   # Should be 14.0 or higher
   ```

3. Update Playwright:
   ```bash
   npx playwright install
   ```

### Script Permission Denied (Linux/Mac)

```bash
chmod +x run-tests.sh
```

### Tests Timing Out

```bash
# Increase timeout (in seconds)
npx playwright test tests/features --reporter=list --timeout=60000
```

### View Test Results

```bash
# Open HTML report
npx playwright show-report

# Or open the file directly
open playwright-report/index.html  (Mac)
start playwright-report/index.html (Windows)
```

---

## Performance Tips

### Run Tests Faster

```bash
# Run only on Chromium (faster)
npx playwright test tests/features --project=chromium --reporter=list

# Increase parallel workers
npx playwright test tests/features --workers=8 --reporter=list

# Skip headed mode
npx playwright test tests/features --reporter=list
```

### Run Tests Safely

```bash
# Serial execution (no parallel)
npx playwright test tests/features --workers=1 --reporter=list

# Debug individual test
npx playwright test tests/features/compress/compress-image.spec.js --debug
```

---

## Summary of All Commands

| Action         | Windows                               | Linux/Mac                              | Direct NPX                                                              |
| -------------- | ------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| Run All        | `run-tests.bat all`                   | `./run-tests.sh all`                   | `npx playwright test tests/features --reporter=list`                    |
| Run Editor     | `run-tests.bat editor`                | `./run-tests.sh editor`                | `npx playwright test tests/features/editor`                             |
| Run Compress   | `run-tests.bat compress`              | `./run-tests.sh compress`              | `npx playwright test tests/features/compress`                           |
| Report All     | `run-tests.bat report-all`            | `./run-tests.sh report-all`            | `npx playwright test tests/features --reporter=html`                    |
| Feature Report | `run-tests.bat report-feature editor` | `./run-tests.sh report-feature editor` | `npx playwright test tests/features/editor --reporter=html=report-name` |
| Help           | `run-tests.bat help`                  | `./run-tests.sh help`                  | N/A                                                                     |

---

**Last Updated:** April 2026  
**Test Framework:** Playwright Test  
**Total Features:** 7  
**Total Test Files:** 18  
**Total Test Cases:** 48+
