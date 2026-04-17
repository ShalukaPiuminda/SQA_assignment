@echo off
REM ========================================================
REM Playwright Test Runner - Windows Batch Script
REM ========================================================
REM This script provides commands to run tests feature-wise,
REM all tests, and generate reports
REM ========================================================

setlocal enabledelayedexpansion

REM Get the action from command line argument
set ACTION=%1

if "%ACTION%"=="" (
    call :show_menu
    goto :eof
)

if /i "%ACTION%"=="all" goto run_all_tests
if /i "%ACTION%"=="editor" goto run_editor
if /i "%ACTION%"=="compress" goto run_compress
if /i "%ACTION%"=="crop" goto run_crop
if /i "%ACTION%"=="document" goto run_document
if /i "%ACTION%"=="resize" goto run_resize
if /i "%ACTION%"=="image-converter" goto run_image_converter
if /i "%ACTION%"=="more" goto run_more
if /i "%ACTION%"=="report-all" goto report_all
if /i "%ACTION%"=="report-feature" goto report_feature
if /i "%ACTION%"=="help" goto show_menu
else (
    echo Unknown action: %ACTION%
    call :show_menu
    goto :eof
)

REM ========================================================
REM RUN ALL TESTS WITH LIST REPORTER
REM ========================================================
:run_all_tests
echo.
echo ========================================================
echo Running ALL TESTS...
echo ========================================================
echo.
npx playwright test tests/features --reporter=list
goto :eof

REM ========================================================
REM RUN EDITOR TESTS
REM ========================================================
:run_editor
echo.
echo ========================================================
echo Running EDITOR Tests...
echo ========================================================
echo.
npx playwright test tests/features/editor --reporter=list
goto :eof

REM ========================================================
REM RUN COMPRESS TESTS
REM ========================================================
:run_compress
echo.
echo ========================================================
echo Running COMPRESS Tests (Image, GIF, PNG)...
echo ========================================================
echo.
npx playwright test tests/features/compress --reporter=list
goto :eof

REM ========================================================
REM RUN CROP TESTS
REM ========================================================
:run_crop
echo.
echo ========================================================
echo Running CROP Tests (JPG, PNG, WebP)...
echo ========================================================
echo.
npx playwright test tests/features/crop --reporter=list
goto :eof

REM ========================================================
REM RUN DOCUMENT CONVERTER TESTS
REM ========================================================
:run_document
echo.
echo ========================================================
echo Running DOCUMENT CONVERTER Tests...
echo ========================================================
echo.
npx playwright test tests/features/document-converter --reporter=list
goto :eof

REM ========================================================
REM RUN RESIZE TESTS
REM ========================================================
:run_resize
echo.
echo ========================================================
echo Running RESIZE Tests...
echo ========================================================
echo.
npx playwright test tests/features/resize --reporter=list
goto :eof

REM ========================================================
REM RUN IMAGE CONVERTER TESTS
REM ========================================================
:run_image_converter
echo.
echo ========================================================
echo Running IMAGE CONVERTER Tests (JPG, PNG, WebP)...
echo ========================================================
echo.
npx playwright test tests/features/image-converter --reporter=list
goto :eof

REM ========================================================
REM RUN MORE TOOLS TESTS
REM ========================================================
:run_more
echo.
echo ========================================================
echo Running MORE TOOLS Tests (Rotate, Flip, Meme, etc)...
echo ========================================================
echo.
npx playwright test tests/features/more --reporter=list
goto :eof

REM ========================================================
REM GENERATE FULL HTML REPORT
REM ========================================================
:report_all
echo.
echo ========================================================
echo Generating FULL HTML Report...
echo ========================================================
echo.
npx playwright test tests/features --reporter=html
echo.
echo Report generated! Opening in browser...
start playwright-report\index.html
goto :eof

REM ========================================================
REM GENERATE FEATURE-WISE HTML REPORTS
REM ========================================================
:report_feature
set FEATURE=%2
if "%FEATURE%"=="" (
    echo.
    echo Usage: run-tests.bat report-feature [feature-name]
    echo.
    echo Available features:
    echo   - editor
    echo   - compress
    echo   - crop
    echo   - document-converter
    echo   - resize
    echo   - image-converter
    echo   - more
    echo.
    goto :eof
)

echo.
echo ========================================================
echo Generating HTML Report for: %FEATURE%
echo ========================================================
echo.
npx playwright test tests/features/%FEATURE% --reporter=html=playwright-report-%FEATURE%
echo.
echo Report generated! Opening in browser...
start playwright-report-%FEATURE%\index.html
goto :eof

REM ========================================================
REM SHOW HELP MENU
REM ========================================================
:show_menu
echo.
echo ========================================================
echo PLAYWRIGHT TEST RUNNER - COMMAND REFERENCE
echo ========================================================
echo.
echo FEATURE-WISE TEST COMMANDS:
echo ========================================================
echo   run-tests.bat editor              - Run Editor tests
echo   run-tests.bat compress            - Run Compress tests
echo   run-tests.bat crop                - Run Crop tests
echo   run-tests.bat document            - Run Document Converter tests
echo   run-tests.bat resize              - Run Resize tests
echo   run-tests.bat image-converter     - Run Image Converter tests
echo   run-tests.bat more                - Run More Tools tests
echo.
echo ALL TESTS:
echo ========================================================
echo   run-tests.bat all                 - Run ALL feature tests
echo.
echo REPORT GENERATION:
echo ========================================================
echo   run-tests.bat report-all          - Generate full HTML report
echo   run-tests.bat report-feature [feature] - Generate report for specific feature
echo.
echo QUICK START:
echo ========================================================
echo   run-tests.bat help                - Show this help menu
echo.
echo EXAMPLES:
echo ========================================================
echo   run-tests.bat all
echo   run-tests.bat compress
echo   run-tests.bat report-all
echo   run-tests.bat report-feature editor
echo.
echo ========================================================
echo.
goto :eof
