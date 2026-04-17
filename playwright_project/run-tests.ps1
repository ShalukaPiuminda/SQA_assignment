# ========================================================
# Playwright Test Runner - PowerShell Script
# ========================================================
# Usage: ./run-tests.ps1 [action] [feature]
# Examples:
#   ./run-tests.ps1 all
#   ./run-tests.ps1 editor
#   ./run-tests.ps1 report-all
#   ./run-tests.ps1 report-feature compress
# ========================================================

param(
    [string]$Action = "",
    [string]$Feature = ""
)

# Get current directory
$ScriptPath = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
Set-Location $ScriptPath

# ========================================================
# Run All Tests
# ========================================================
function Invoke-AllTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running ALL TESTS..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features --reporter=list
}

# ========================================================
# Run Editor Tests
# ========================================================
function Invoke-EditorTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running EDITOR Tests..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/editor --reporter=list
}

# ========================================================
# Run Compress Tests
# ========================================================
function Invoke-CompressTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running COMPRESS Tests (Image, GIF, PNG)..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/compress --reporter=list
}

# ========================================================
# Run Crop Tests
# ========================================================
function Invoke-CropTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running CROP Tests (JPG, PNG, WebP)..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/crop --reporter=list
}

# ========================================================
# Run Document Converter Tests
# ========================================================
function Invoke-DocumentTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running DOCUMENT CONVERTER Tests..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/document-converter --reporter=list
}

# ========================================================
# Run Resize Tests
# ========================================================
function Invoke-ResizeTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running RESIZE Tests..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/resize --reporter=list
}

# ========================================================
# Run Image Converter Tests
# ========================================================
function Invoke-ImageConverterTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running IMAGE CONVERTER Tests (JPG, PNG, WebP)..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/image-converter --reporter=list
}

# ========================================================
# Run More Tools Tests
# ========================================================
function Invoke-MoreTests {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Running MORE TOOLS Tests (Rotate, Flip, Meme, etc)..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/more --reporter=list
}

# ========================================================
# Generate Full Report
# ========================================================
function Invoke-FullReport {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Generating FULL HTML Report..." -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features --reporter=html
    Write-Host ""
    Write-Host "Report generated! Opening in browser..." -ForegroundColor Green
    Start-Process "playwright-report\index.html"
}

# ========================================================
# Generate Feature Report
# ========================================================
function Invoke-FeatureReport {
    param([string]$Feature)
    
    if ([string]::IsNullOrEmpty($Feature)) {
        Write-Host ""
        Write-Host "Usage: ./run-tests.ps1 report-feature [feature-name]" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Available features:" -ForegroundColor Yellow
        Write-Host "  - editor" -ForegroundColor Gray
        Write-Host "  - compress" -ForegroundColor Gray
        Write-Host "  - crop" -ForegroundColor Gray
        Write-Host "  - document-converter" -ForegroundColor Gray
        Write-Host "  - resize" -ForegroundColor Gray
        Write-Host "  - image-converter" -ForegroundColor Gray
        Write-Host "  - more" -ForegroundColor Gray
        Write-Host ""
        return
    }
    
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "Generating HTML Report for: $Feature" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host ""
    npx playwright test tests/features/$Feature --reporter=html=playwright-report-$Feature
    Write-Host ""
    Write-Host "Report generated! Opening in browser..." -ForegroundColor Green
    Start-Process "playwright-report-$Feature\index.html"
}

# ========================================================
# Show Help Menu
# ========================================================
function Show-Menu {
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host "PLAYWRIGHT TEST RUNNER - COMMAND REFERENCE" -ForegroundColor Yellow
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "FEATURE-WISE TEST COMMANDS:" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "  ./run-tests.ps1 editor              - Run Editor tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 compress            - Run Compress tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 crop                - Run Crop tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 document            - Run Document Converter tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 resize              - Run Resize tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 image-converter     - Run Image Converter tests" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 more                - Run More Tools tests" -ForegroundColor White
    Write-Host ""
    
    Write-Host "ALL TESTS:" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "  ./run-tests.ps1 all                 - Run ALL feature tests" -ForegroundColor White
    Write-Host ""
    
    Write-Host "REPORT GENERATION:" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "  ./run-tests.ps1 report-all          - Generate full HTML report" -ForegroundColor White
    Write-Host "  ./run-tests.ps1 report-feature [feature] - Generate report for specific feature" -ForegroundColor White
    Write-Host ""
    
    Write-Host "QUICK START:" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "  ./run-tests.ps1 help                - Show this help menu" -ForegroundColor White
    Write-Host ""
    
    Write-Host "EXAMPLES:" -ForegroundColor Cyan
    Write-Host "========================================================" -ForegroundColor Cyan
    Write-Host "  ./run-tests.ps1 all" -ForegroundColor Gray
    Write-Host "  ./run-tests.ps1 compress" -ForegroundColor Gray
    Write-Host "  ./run-tests.ps1 report-all" -ForegroundColor Gray
    Write-Host "  ./run-tests.ps1 report-feature editor" -ForegroundColor Gray
    Write-Host ""
    Write-Host "========================================================" -ForegroundColor Yellow
    Write-Host ""
}

# ========================================================
# Main Logic
# ========================================================
switch ($Action.ToLower()) {
    "all" { Invoke-AllTests }
    "editor" { Invoke-EditorTests }
    "compress" { Invoke-CompressTests }
    "crop" { Invoke-CropTests }
    "document" { Invoke-DocumentTests }
    "resize" { Invoke-ResizeTests }
    "image-converter" { Invoke-ImageConverterTests }
    "more" { Invoke-MoreTests }
    "report-all" { Invoke-FullReport }
    "report-feature" { Invoke-FeatureReport $Feature }
    "help" { Show-Menu }
    "" { Show-Menu }
    default {
        Write-Host "Unknown action: $Action" -ForegroundColor Red
        Show-Menu
    }
}
