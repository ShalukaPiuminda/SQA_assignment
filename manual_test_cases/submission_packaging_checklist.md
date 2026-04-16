# SQA Submission Packaging Checklist (IT4100)

## 1) Required deliverables

- Final report PDF (max 3 pages for main report, extra evidence in appendix)
- Test cases document PDF (manual + automated details)
- Single ZIP containing both PDFs

## 2) Exact file naming format

Replace `<Leader_ITNumber>` with your actual leader IT number.

- `<Leader_ITNumber>_SQA_final_report_2026.pdf`
- `<Leader_ITNumber>_SQA_test_cases_document_2026.pdf`
- ZIP: `<Leader_ITNumber>_SQA_assignment_submission.zip`

## 3) What to include inside the report PDF

- Introduction (system overview, scope, objectives, test plan, methodologies, tools)
- Manual Testing Overview (summary + defects)
- Automated Testing Overview (tool selection reasoning + defects)
- Defect list with Severity and Priority
- Conclusion (summary, tool comparison, challenges, improvements)
- References
- Appendix (screenshots and extra evidence)

## 4) What to include inside test cases document PDF

- Manual test cases:
  - Test case ID
  - Scenario
  - Steps
  - Expected result
  - Actual result
  - Status (Pass/Fail)
  - Execution screenshots
- Automated testing:
  - Script references
  - Execution outputs/screenshots
  - Defects found

## 5) Defect management minimum columns

- Defect ID
- Related Test Case ID
- Summary
- Steps to reproduce
- Expected vs Actual
- Severity
- Priority
- Status
- Evidence

Use: `manual_test_cases/defect_management_log.csv`

## 6) Pre-submission validation

- Transliteration feature is excluded from tested scope
- At least one member uses Playwright (mandatory)
- Other 3 members use different automation tools
- Two PDFs are correctly named
- ZIP is correctly named
- All screenshots are included in appendix/evidence sections

## 7) PowerShell commands to package

Run inside folder containing the two final PDFs:

```powershell
$leader = "IT12345678"
Rename-Item ".\final_report.pdf" "${leader}_SQA_final_report_2026.pdf"
Rename-Item ".\test_cases_document.pdf" "${leader}_SQA_test_cases_document_2026.pdf"
Compress-Archive -Path "${leader}_SQA_final_report_2026.pdf","${leader}_SQA_test_cases_document_2026.pdf" -DestinationPath "${leader}_SQA_assignment_submission.zip" -Force
```

Adjust source filenames (`final_report.pdf`, `test_cases_document.pdf`) to your actual names before renaming.
