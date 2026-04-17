#!/bin/bash
# ========================================================
# Playwright Test Runner - Unix/Linux/Mac Shell Script
# ========================================================
# This script provides commands to run tests feature-wise,
# all tests, and generate reports
# ========================================================

ACTION="${1:-}"

case "$ACTION" in
  all)
    run_all_tests
    ;;
  editor)
    run_editor
    ;;
  compress)
    run_compress
    ;;
  crop)
    run_crop
    ;;
  document)
    run_document
    ;;
  resize)
    run_resize
    ;;
  image-converter)
    run_image_converter
    ;;
  more)
    run_more
    ;;
  report-all)
    report_all
    ;;
  report-feature)
    report_feature "$2"
    ;;
  help|"")
    show_menu
    ;;
  *)
    echo "Unknown action: $ACTION"
    show_menu
    ;;
esac

# ========================================================
# RUN ALL TESTS WITH LIST REPORTER
# ========================================================
run_all_tests() {
  echo ""
  echo "========================================================"
  echo "Running ALL TESTS..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features --reporter=list
}

# ========================================================
# RUN EDITOR TESTS
# ========================================================
run_editor() {
  echo ""
  echo "========================================================"
  echo "Running EDITOR Tests..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/editor --reporter=list
}

# ========================================================
# RUN COMPRESS TESTS
# ========================================================
run_compress() {
  echo ""
  echo "========================================================"
  echo "Running COMPRESS Tests (Image, GIF, PNG)..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/compress --reporter=list
}

# ========================================================
# RUN CROP TESTS
# ========================================================
run_crop() {
  echo ""
  echo "========================================================"
  echo "Running CROP Tests (JPG, PNG, WebP)..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/crop --reporter=list
}

# ========================================================
# RUN DOCUMENT CONVERTER TESTS
# ========================================================
run_document() {
  echo ""
  echo "========================================================"
  echo "Running DOCUMENT CONVERTER Tests..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/document-converter --reporter=list
}

# ========================================================
# RUN RESIZE TESTS
# ========================================================
run_resize() {
  echo ""
  echo "========================================================"
  echo "Running RESIZE Tests..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/resize --reporter=list
}

# ========================================================
# RUN IMAGE CONVERTER TESTS
# ========================================================
run_image_converter() {
  echo ""
  echo "========================================================"
  echo "Running IMAGE CONVERTER Tests (JPG, PNG, WebP)..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/image-converter --reporter=list
}

# ========================================================
# RUN MORE TOOLS TESTS
# ========================================================
run_more() {
  echo ""
  echo "========================================================"
  echo "Running MORE TOOLS Tests (Rotate, Flip, Meme, etc)..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features/more --reporter=list
}

# ========================================================
# GENERATE FULL HTML REPORT
# ========================================================
report_all() {
  echo ""
  echo "========================================================"
  echo "Generating FULL HTML Report..."
  echo "========================================================"
  echo ""
  npx playwright test tests/features --reporter=html
  echo ""
  echo "Report generated!"
  echo "Open: playwright-report/index.html"
  
  # Try to open in browser (macOS, Linux)
  if command -v xdg-open &> /dev/null; then
    xdg-open playwright-report/index.html
  elif command -v open &> /dev/null; then
    open playwright-report/index.html
  fi
}

# ========================================================
# GENERATE FEATURE-WISE HTML REPORTS
# ========================================================
report_feature() {
  FEATURE="${1:-}"
  
  if [ -z "$FEATURE" ]; then
    echo ""
    echo "Usage: ./run-tests.sh report-feature [feature-name]"
    echo ""
    echo "Available features:"
    echo "  - editor"
    echo "  - compress"
    echo "  - crop"
    echo "  - document-converter"
    echo "  - resize"
    echo "  - image-converter"
    echo "  - more"
    echo ""
    return
  fi
  
  echo ""
  echo "========================================================"
  echo "Generating HTML Report for: $FEATURE"
  echo "========================================================"
  echo ""
  npx playwright test tests/features/"$FEATURE" --reporter=html=playwright-report-"$FEATURE"
  echo ""
  echo "Report generated!"
  echo "Open: playwright-report-$FEATURE/index.html"
  
  # Try to open in browser
  if command -v xdg-open &> /dev/null; then
    xdg-open playwright-report-"$FEATURE"/index.html
  elif command -v open &> /dev/null; then
    open playwright-report-"$FEATURE"/index.html
  fi
}

# ========================================================
# SHOW HELP MENU
# ========================================================
show_menu() {
  echo ""
  echo "========================================================"
  echo "PLAYWRIGHT TEST RUNNER - COMMAND REFERENCE"
  echo "========================================================"
  echo ""
  echo "FEATURE-WISE TEST COMMANDS:"
  echo "========================================================"
  echo "  ./run-tests.sh editor              - Run Editor tests"
  echo "  ./run-tests.sh compress            - Run Compress tests"
  echo "  ./run-tests.sh crop                - Run Crop tests"
  echo "  ./run-tests.sh document            - Run Document Converter tests"
  echo "  ./run-tests.sh resize              - Run Resize tests"
  echo "  ./run-tests.sh image-converter     - Run Image Converter tests"
  echo "  ./run-tests.sh more                - Run More Tools tests"
  echo ""
  echo "ALL TESTS:"
  echo "========================================================"
  echo "  ./run-tests.sh all                 - Run ALL feature tests"
  echo ""
  echo "REPORT GENERATION:"
  echo "========================================================"
  echo "  ./run-tests.sh report-all          - Generate full HTML report"
  echo "  ./run-tests.sh report-feature [feature] - Generate report for specific feature"
  echo ""
  echo "QUICK START:"
  echo "========================================================"
  echo "  ./run-tests.sh help                - Show this help menu"
  echo ""
  echo "EXAMPLES:"
  echo "========================================================"
  echo "  ./run-tests.sh all"
  echo "  ./run-tests.sh compress"
  echo "  ./run-tests.sh report-all"
  echo "  ./run-tests.sh report-feature editor"
  echo ""
  echo "FIRST RUN:"
  echo "========================================================"
  echo "  chmod +x run-tests.sh              - Make script executable (Linux/Mac)"
  echo ""
  echo "========================================================"
  echo ""
}
