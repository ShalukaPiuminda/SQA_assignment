#!/usr/bin/env node

/**
 * Playwright Test Runner - Node.js Script
 *
 * This script provides programmatic control over running tests and generating reports.
 * Can be used in CI/CD pipelines, custom automation, or direct execution.
 *
 * Usage:
 *   node run-tests.js all
 *   node run-tests.js editor
 *   node run-tests.js report-all
 *   node run-tests.js report-feature compress
 *   node run-tests.js json
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const TEST_DIR = "tests/features";

// ANSI color codes for console output
const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

// Feature configurations
const features = {
  editor: {
    path: "tests/features/editor",
    name: "PDF Editor",
    description:
      "PDF Editor tests (load, controls, upload, toolbar, stability, responsive)",
  },
  compress: {
    path: "tests/features/compress",
    name: "Compress",
    description: "Compression tests (Image, GIF, PNG)",
  },
  crop: {
    path: "tests/features/crop",
    name: "Crop",
    description: "Crop tests (JPG, PNG, WebP)",
  },
  "document-converter": {
    path: "tests/features/document-converter",
    name: "Document Converter",
    description: "Document conversion tests (Image↔PDF↔Word)",
  },
  resize: {
    path: "tests/features/resize",
    name: "Resize",
    description: "Resize tests (Single, Bulk, Enlarger)",
  },
  "image-converter": {
    path: "tests/features/image-converter",
    name: "Image Converter",
    description: "Format conversion tests (JPG, PNG, WebP)",
  },
  more: {
    path: "tests/features/more",
    name: "More Tools",
    description:
      "Additional tools tests (Rotate, Flip, Meme, Color Picker, OCR)",
  },
};

/**
 * Print colored output
 */
function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Print section header
 */
function header(title) {
  console.log("");
  log("========================================================", "cyan");
  log(title, "cyan");
  log("========================================================", "cyan");
  console.log("");
}

/**
 * Execute command and handle errors
 */
function execute(command, options = {}) {
  try {
    log(`Running: ${command}`, "gray");
    execSync(command, {
      stdio: "inherit",
      shell: true,
      ...options,
    });
    return true;
  } catch (error) {
    log(`Error executing command: ${command}`, "red");
    return false;
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  header("Running ALL TESTS");
  return execute(`npx playwright test ${TEST_DIR} --reporter=list`);
}

/**
 * Run specific feature tests
 */
function runFeatureTests(feature) {
  const config = features[feature];
  if (!config) {
    log(`Unknown feature: ${feature}`, "red");
    log(`Available features: ${Object.keys(features).join(", ")}`, "yellow");
    return false;
  }

  header(`Running ${config.name} Tests`);
  log(`Description: ${config.description}`, "gray");
  console.log("");
  return execute(`npx playwright test ${config.path} --reporter=list`);
}

/**
 * Generate full HTML report
 */
function generateFullReport() {
  header("Generating FULL HTML Report");
  const success = execute(`npx playwright test ${TEST_DIR} --reporter=html`);

  if (success) {
    log("✓ Report generated successfully!", "green");
    log("Open: playwright-report/index.html", "yellow");

    // Try to open in browser
    if (process.platform === "win32") {
      try {
        execSync("start playwright-report\\index.html", { stdio: "ignore" });
      } catch (e) {
        // Ignore error if browser open fails
      }
    } else if (process.platform === "darwin") {
      try {
        execSync("open playwright-report/index.html", { stdio: "ignore" });
      } catch (e) {
        // Ignore error if browser open fails
      }
    }
  }
  return success;
}

/**
 * Generate feature-specific report
 */
function generateFeatureReport(feature) {
  const config = features[feature];
  if (!config) {
    log(`Unknown feature: ${feature}`, "red");
    log(`Available features: ${Object.keys(features).join(", ")}`, "yellow");
    return false;
  }

  header(`Generating ${config.name} Report`);
  const reportDir = `playwright-report-${feature}`;
  const success = execute(
    `npx playwright test ${config.path} --reporter=html=${reportDir}`,
  );

  if (success) {
    log(`✓ Report generated successfully!`, "green");
    log(`Open: ${reportDir}/index.html`, "yellow");

    // Try to open in browser
    if (process.platform === "win32") {
      try {
        execSync(`start ${reportDir}\\index.html`, { stdio: "ignore" });
      } catch (e) {
        // Ignore error if browser open fails
      }
    } else if (process.platform === "darwin") {
      try {
        execSync(`open ${reportDir}/index.html`, { stdio: "ignore" });
      } catch (e) {
        // Ignore error if browser open fails
      }
    }
  }
  return success;
}

/**
 * Generate JSON report
 */
function generateJsonReport() {
  header("Generating JSON Report");
  return execute(
    `npx playwright test ${TEST_DIR} --reporter=json > test-results.json`,
    { shell: true },
  );
}

/**
 * Generate JUnit report (for CI/CD)
 */
function generateJunitReport() {
  header("Generating JUnit Report");
  return execute(
    `npx playwright test ${TEST_DIR} --reporter=junit --reporter-junit-output-file=junit-report.xml`,
  );
}

/**
 * Show help menu
 */
function showHelp() {
  console.log("");
  log("========================================================", "yellow");
  log("PLAYWRIGHT TEST RUNNER - NODE.JS SCRIPT", "yellow");
  log("========================================================", "yellow");
  console.log("");

  log("FEATURE-WISE TEST COMMANDS:", "cyan");
  log("========================================================", "cyan");
  Object.entries(features).forEach(([key, config]) => {
    log(`  node run-tests.js ${key.padEnd(20)} - ${config.name}`, "gray");
  });

  console.log("");
  log("ALL TESTS:", "cyan");
  log("========================================================", "cyan");
  log("  node run-tests.js all                 - Run ALL tests", "gray");

  console.log("");
  log("REPORT GENERATION:", "cyan");
  log("========================================================", "cyan");
  log("  node run-tests.js report-all          - Full HTML report", "gray");
  log(
    "  node run-tests.js report-feature [feature] - Feature HTML report",
    "gray",
  );
  log("  node run-tests.js json                - Generate JSON report", "gray");
  log(
    "  node run-tests.js junit               - Generate JUnit report (CI/CD)",
    "gray",
  );

  console.log("");
  log("QUICK START:", "cyan");
  log("========================================================", "cyan");
  log("  node run-tests.js all", "gray");
  log("  node run-tests.js compress", "gray");
  log("  node run-tests.js report-all", "gray");
  log("  node run-tests.js report-feature editor", "gray");

  console.log("");
  log("========================================================", "yellow");
  console.log("");
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);
  const action = args[0]?.toLowerCase();
  const param = args[1]?.toLowerCase();

  if (!action || action === "help") {
    showHelp();
    return;
  }

  let success = false;

  switch (action) {
    case "all":
      success = runAllTests();
      break;

    case "report-all":
      success = generateFullReport();
      break;

    case "report-feature":
      if (!param) {
        log("Usage: node run-tests.js report-feature [feature-name]", "yellow");
        log(
          `Available features: ${Object.keys(features).join(", ")}`,
          "yellow",
        );
        return;
      }
      success = generateFeatureReport(param);
      break;

    case "json":
      success = generateJsonReport();
      break;

    case "junit":
      success = generateJunitReport();
      break;

    case "features":
      // List available features
      header("Available Features");
      Object.entries(features).forEach(([key, config]) => {
        log(`${key}: ${config.name}`, "green");
        log(`  ${config.description}`, "gray");
      });
      return;

    default:
      if (features[action]) {
        success = runFeatureTests(action);
      } else {
        log(`Unknown action: ${action}`, "red");
        showHelp();
        return;
      }
  }

  // Print final status
  console.log("");
  if (success) {
    log("✓ Tests completed successfully!", "green");
    process.exit(0);
  } else {
    log("✗ Tests failed or encountered an error", "red");
    process.exit(1);
  }
}

// Run main function
main();
