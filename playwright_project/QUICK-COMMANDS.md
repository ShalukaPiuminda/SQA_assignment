# Quick Command Reference Card

## Batch Script (Windows) - `run-tests.bat`

```bash
# Run all tests
run-tests.bat all

# Run specific feature
run-tests.bat editor       # PDF Editor tests
run-tests.bat compress     # Compress Image, GIF, PNG
run-tests.bat crop         # Crop JPG, PNG, WebP
run-tests.bat document     # Image↔PDF↔Word conversions
run-tests.bat resize       # Resize, Bulk Resize, Enlarger
run-tests.bat image-converter  # Convert to JPG, PNG, WebP
run-tests.bat more         # Rotate, Flip, Meme, Color Picker, OCR

# Generate reports
run-tests.bat report-all                    # Full HTML report
run-tests.bat report-feature compress       # Feature-specific report
run-tests.bat report-feature editor         # Editor report
run-tests.bat report-feature crop           # Crop report
run-tests.bat report-feature document       # Document converter report
run-tests.bat report-feature resize         # Resize report
run-tests.bat report-feature image-converter # Image converter report
run-tests.bat report-feature more           # More tools report

# Help
run-tests.bat help
```

## Shell Script (Linux/Mac) - `run-tests.sh`

```bash
chmod +x run-tests.sh  # Make executable (first time only)

# Run all tests
./run-tests.sh all

# Run specific feature
./run-tests.sh editor
./run-tests.sh compress
./run-tests.sh crop
./run-tests.sh document
./run-tests.sh resize
./run-tests.sh image-converter
./run-tests.sh more

# Generate reports
./run-tests.sh report-all
./run-tests.sh report-feature compress
./run-tests.sh report-feature editor

# Help
./run-tests.sh help
```

## Direct NPX Commands

```bash
# Run all tests with list reporter
npx playwright test tests/features --reporter=list

# Run all with HTML report
npx playwright test tests/features --reporter=html
# Opens in browser automatically, or open: playwright-report/index.html

# Run specific feature
npx playwright test tests/features/editor --reporter=list
npx playwright test tests/features/compress --reporter=list
npx playwright test tests/features/crop --reporter=list
npx playwright test tests/features/document-converter --reporter=list
npx playwright test tests/features/resize --reporter=list
npx playwright test tests/features/image-converter --reporter=list
npx playwright test tests/features/more --reporter=list

# Feature HTML report
npx playwright test tests/features/editor --reporter=html=playwright-report-editor
npx playwright test tests/features/compress --reporter=html=playwright-report-compress

# With different browsers
npx playwright test tests/features --project=chromium --reporter=list
npx playwright test tests/features --project=firefox --reporter=list

# Headed mode (see browser)
npx playwright test tests/features --headed --reporter=list

# Debug mode
npx playwright test tests/features --debug

# Run single file
npx playwright test tests/features/compress/compress-image.spec.js --reporter=list

# Run tests matching pattern
npx playwright test -g "compress" --reporter=list

# JSON report (CI/CD)
npx playwright test tests/features --reporter=json > test-results.json

# JUnit report (CI/CD)
npx playwright test tests/features --reporter=junit --reporter-junit-output-file=junit-report.xml
```

## Test Features Overview

| Feature                | Tests                     | Sample Files           |
| ---------------------- | ------------------------- | ---------------------- |
| **Editor**             | 6 files                   | JUnit.pdf              |
| **Compress**           | 3 files (Image, GIF, PNG) | sample.gif, tiny.png   |
| **Crop**               | 1 file (JPG, PNG, WebP)   | car.webp               |
| **Document Converter** | 3 files                   | JUnit.pdf, sample.docx |
| **Resize**             | 3 files                   | tiny.png               |
| **Image Converter**    | 1 file (JPG, PNG, WebP)   | car.jpg                |
| **More Tools**         | 1 file (5 tools)          | car.jpg                |

**Total: 18 test files | 48+ test cases**

## Quick Start

1. **Run All Tests:**

   ```bash
   # Windows
   run-tests.bat all

   # Linux/Mac
   ./run-tests.sh all
   ```

2. **Generate Report:**

   ```bash
   # Windows
   run-tests.bat report-all

   # Linux/Mac
   ./run-tests.sh report-all
   ```

3. **Test Specific Feature:**

   ```bash
   # Windows
   run-tests.bat compress

   # Linux/Mac
   ./run-tests.sh compress
   ```

## Report Locations

- **Full HTML Report:** `playwright-report/index.html`
- **Feature Reports:** `playwright-report-{feature}/index.html`
  - `playwright-report-editor/index.html`
  - `playwright-report-compress/index.html`
  - `playwright-report-crop/index.html`
  - `playwright-report-document-converter/index.html`
  - `playwright-report-resize/index.html`
  - `playwright-report-image-converter/index.html`
  - `playwright-report-more/index.html`
- **JSON Report:** `test-results.json`
- **JUnit Report:** `junit-report.xml` (in CI/CD)

## Performance Tips

```bash
# Faster: Only Chromium, 8 workers
npx playwright test tests/features --project=chromium --workers=8 --reporter=list

# Safe: Serial execution (no parallel)
npx playwright test tests/features --workers=1 --reporter=list

# Debug: Single test with browser visible
npx playwright test tests/features/compress/compress-image.spec.js --debug --headed
```

## Troubleshooting

```bash
# Make shell script executable
chmod +x run-tests.sh

# Install dependencies
npm install

# Update Playwright browsers
npx playwright install

# View HTML report
npx playwright show-report

# Increase timeout (milliseconds)
npx playwright test tests/features --timeout=60000
```

---

**Full Documentation:** See `TEST-COMMANDS.md`
