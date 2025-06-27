First, let's rename the first label under "Reporting" topnav dropdown to "Reporting1" (currently, first is "Reporting" but not consistent with Reporting2, Reporting3, and Reporting4). Let's focus on getting Reporting1 crafted into a user interface that will delight the reporting team, and then we can expand once we've nailed down the fundamental concepts.

As the reporting team lead, the buttons at the top of this module are critical to my life and my job, and I count on them to get things done. Let's walk through them, and then you can make them pseudo-functional by mocking them up to behave as they do in existing LIMS. We will tackle them one at a time, starting with the simplest of all (the OG button), "Generate Reports." I will address other buttons in my following messages, and there is a great deal of overlap. Generate Reports button is a great place to start.

"Generate Reports" - This was our original button, and the only option we had when we went "live" with LIMS5000 several years ago. Clicking it did - and does - cause the system to generate one PDF and one CSV for all assays that I select within a single sample. I usually select all, but occassionally, circumstances either make it helpful for me to choose or require me to choose only one "Reportable Assay" at a time. If I choose "Microbial" in the example below, only the rows with "Microbial" results (total viable aerobic, BTGN, Total Coliforms, E. coli, Salmonella spp., and Total Yeast and Mold, in this instance) will be included in the CSV, and all other analyte rows for non-selected "Reportable Assays" will be omitted. I know that clicking the "Generate Reports" button worked when I see that it has automatically downloaded a PDF and a CSV to my browser's default downloads folder. I end up reviewing the "draft" certificate of analysis PDF in my Downloads folder, which is ok but leads to some confusion (and risk of mistake) that I would eliminate because, if I spot an error on a "draft" CoA generated from Generate Reports button (or an error in a CSV output, or errors in both, as occassionally happens if, for example, there is a typo in a test result that was manually entered that propagates to PDF and CSV). I would like to see the current "draft" of the PDF CoA on screen, native in LIMS, and that should be required as acceptance criteria for LIMS6000, since we have discussed it for years. It would also be nice to see the draft CSV, if possible, and nicely formatted and displayed as a table (i.e. without the actual commas, which are difficult for me as a viewer; much prefer converting to a table when displaying in the user interface). So, two preview panes, one for CSV and one for PDF CoA.

As I was saying, when I click "Generate Reports" LIMS5000 does the following (and LIMS6000 will need to do same or accomplish same function, while resolving known issues, preferably):

(1) the system generates a PDF Certificate of Analysis, (2) the system generates a CSV file that includes - by employment of the "Sudoku" selection process described elsewhere in this document - the following headers/parameters: 

ReportDate,MetrcTag,AnalyteFormattedForTestCategory,NumericalResult,PassFailFlag,Note 

2025-06-27,1A4070300002711000010043,THCA (mg/g) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,THC (mg/g) Processed Product (Previously Tested),746,True,Csv Upload
2025-06-27,1A4070300002711000010043,Delta-8 THC (mg/g) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,THCV (mg/g) Processed Product (Previously Tested),3.92,True,Csv Upload
2025-06-27,1A4070300002711000010043,CBDA (mg/g) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,CBD (mg/g) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,CBN (mg/g) Processed Product (Previously Tested),2.80,True,Csv Upload
2025-06-27,1A4070300002711000010043,Total CBD (mg/g) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,Total THC (mg/g) Processed Product (Previously Tested),746,True,Csv Upload
2025-06-27,1A4070300002711000010043,Foreign Matter (%) Processed Product (Previously Tested),0.00,True,Csv Upload
2025-06-27,1A4070300002711000010043,Total Viable Aerobic Bacteria (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
2025-06-27,1A4070300002711000010043,Bile-Tolerant Gram-Negative Bacteria (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
2025-06-27,1A4070300002711000010043,Total Coliforms (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
2025-06-27,1A4070300002711000010043,E.coli (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
2025-06-27,1A4070300002711000010043,Salmonella (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
2025-06-27,1A4070300002711000010043,Total Yeast and Mold (CFU/g) Processed Product (Previously Tested),0,True,MICROPP25062001
---
Another known issue is that our existing LIMS5000 system generates CSV output regardless of whether or not the sample I am actually reporting is a Metrc sample or a non-Metrc sample. Metrc samples are all required to have results sent to Metrc, either via .csv upload, or we can go into their user portal and enter results using their user interface, or we can transmit via API that we'll discuss in our discussion of "Send to Metrc" buttons.

---
We have an "air gap" issue with the possibility of CSV reporting that would be nice to close. We rarely report Metrc samples via CSV upload - the vast majority of our reporting uses the "Send to Metrc" button(s) and the Metrc API - but, when we do upload a CSV manually via the metrc website, LIMS does not actually have a record of that. One possibility is checking with developers to see if we can "GET" that information from the Metrc API, but based on a fairly extensive familiarity with Metrc's API overall, I am going to note I do not recall seeing any such function in the documentation and it seems like a longshot. An alternative I have considered is a date/time stamp for when I click Generate Reports, editable and with an audit trail so that any changes I or any other user makes in LIMS6000 can be audited and cross-referenced against the date/time stamp(s) in Metrc (which are visible to us and our regulators) and verified (or investigated further if any discrepancy is found). Perhaps I, as the user, would be required to click a button to submit as completed with date/time information manually entered (again, assuming we cannot auto-populate this using Metrc API; if that becomes a viable option, we should use that, as Metrc is the "gold standard" of information for us).

---
"Sudoku" selection principles of LIMS5000 system is here - and please note that we intend to use this in LIMS6000, but only because of momentum/inertia/familiarity; we would like to either adopt a better system, or somehow improve this syste; unclear how to do that at this juncture but we have some ideas - if you have any ideas, please ask me about them before implementing:

# Sudoku Tables in LIMS5000: How They Work

## Core Concept
Sudoku Tables are **decision-making data tables** that aggregate multiple characteristics of a sample to determine what rules, action limits, or other parameters should apply to that specific test sample.

## Weighted Scoring System

The system uses a **heavily weighted scoring mechanism**:

### TestCategory - "The 100-Point Hammer"
- **Weight: 100 points**
- TestCategory gets overwhelming priority in decision-making
- The system first checks if a sample has a TestCategory
- If the TestCategory provides sufficient information to make the decision, it essentially overrides all other factors
- This acts as a "hammer" that can definitively determine the outcome

### All Other Characteristics - 1 Point Each
The following sample characteristics each contribute **1 point**:
- **ItemType** (binary: Plant/Non-Plant or null)
- **ItemCategory** (Metrc Item Category options - varies by state)
- **PotencyCategory** (lab-defined choice for Michigan infused products)
- **Inhalation** (binary: INHALED/NON-INHALED or null)
- **Solvent** (binary: Solvent/Non-Solvent or null)
- **LicenseCategory** (binary: Medical/Adult or null)

## Decision Logic

1. **Primary Check**: Does the sample have a TestCategory that provides the needed information?
   - If YES → TestCategory's 100-point weight typically determines the outcome
   - If NO → Move to secondary scoring

2. **Secondary Scoring**: Add up points from all applicable characteristics
   - The row/rule with the **highest total point score "wins"**
   - That winning configuration determines what applies to the sample (e.g., specific action limits)

## Practical Example

If you have:
- TestCategory: "Processed Product (Previously Tested)" (100 points)
- ItemType: "Non-Plant" (1 point)  
- ItemCategory: "Bulk Concentrate" (1 point)
- Solvent: "Solvent" (1 point)

The TestCategory's 100 points would almost certainly override any other combination of 1-point characteristics, making it the determining factor for which rules apply to this sample.

## Key Takeaway

This weighted approach ensures that **regulatory TestCategory requirements take precedence** while still allowing for nuanced decision-making based on multiple sample characteristics when TestCategory alone isn't sufficient.

---

Fully Annotated - Sudoku Table that is used by LIMS5000 for the purpose of formatting CSV outputs for Metrc results.

Cas,Analyte,Assays,ReportFileFormat,ReportPercent,ItemType,ItemCategory,TestCategory,PotencyCategory,Inhalation,Solvent,LicenseCategory,LicenseType,Retest,State,
,,,"AS Notes - Ohio:
""Float"" value; no units in the Sudoku tables, which probably does not make sense. 

AS Proposal:
Retain as-is. Inquiry submitted to developers to determine how/when units of measure are identified with the UpperLimit; will report back.","AS Notes - Ohio:
Milligrams per serving limit (marijuana-infused products).

AS Proposal:
Retain. Currently unused; preserve option.","AS Notes - Ohio:
Milligrams per container limit (marijuana-infused projdcts).

As Proposal:
Retain. Currently unused; preserve option.","AS Notes - Ohio:
Global question for all Sudoku tables: 

AS Proposal:

For LIMS6000, retain ""Plant/Non-Plant"" due to no cost to retain the field/existing values.

Map our LIMS6000 SampleType table so that every SampleType has a Plant/Non-Plant designation.

LIMS5000 assigns ""Non-Plant"" for kief. The label is inaccurate (kief is plant material), but functionally relevant because LIMS5000 - by design - assigns Metrc ItemCategory ""Kief"" to ""Non-Plant"" sample type.

This was done primarily for Ohio but no harm was done to Michigan and some benefit in terms of flexibility and efficiency was gained, and Sudoku functions for kief continue to work with this setup.","AS Notes - Ohio:
Differentiates microbial action limits within ""ItemType = Non-Plant"" in the absence of TestCategory. 

AS Proposal:
Retain globally for LIMS6000 Sudoku tables/Settings with option to include/not include in user interfaces for Action Limit management.

If we ever need it, it will be available and waiting in data tables.","AS Notes - Ohio:
Does a lot of heavy lifting across all Sudoku tables due to information density of TestCategory for Metrc compliance samples.

AS Proposal:
Retain for globally for Sudoku tables/Settings with option to include/not include in user interfaces for Action Limit management.

If we ever need it, it will be available and waiting in data tables.

It is not required to be used, but when present, it is a one-stop shop for meeting regulatory criteria.","AS Notes - Ohio:
Not currently active in Ohio.

AS Proposal:
Retain globally for Sudoku tables/Settings with option to include/not include in user interfaces for Action Limit management. 

If we ever need it, it will be available and waiting in data tables.","AS Notes - Ohio:

Not currently active in Ohio.

AS Proposal:
Retain globally for Sudoku tables/Settings with option to include/not include in user interfaces for Action Limit management. If we ever need it, it will be available and waiting in data tables.","AS Notes - Ohio:

Solvent/nonsolvent distinction, while nominally related to solvents, actually drives the Ohio microbial limits, which are taken from Ohio rules reference to AHPA Cannabis Monograph, Table 9, and the table's distinction between ""Solvent"" and ""Non-Solvent"" concentrates for microbial ""limit"" purposes.

AS Proposal:
Retain.","AS Notes - Ohio:

Medical/Adult Use distinction.

Not active in Ohio for any Sudoku purpose.

AS Proposal:
Retain in case we need it.","AS Notes - Ohio:

Sudoku selector based on license ""type"" - cultivator, processor, testing lab.

Currently unused in any LIMS decisionmaking/business logic.

AS Proposal:

Marginal utility but potentially useful someday for something. Omit from user interface but retain the table; re-activate in user interfaces if we ever implement business logic that relies on this field for Sudoku operations.","AS Notes - Ohio:

Determined conclusively via testing 4/7/2025 that this field is vestigial by submitting two samples to Ohio QA for Microbials retest, under theory that if this field is active in the code for Sudoku purposes, the ""Retest"" sample would not get any action limits.

CoAs for both samples included correct action limits, which the ""Retest"" sample would not have done if this field were used by the code to determine Action Limits.


Unclear why this field is in the ""Action Limits"" Sudoku table. Remove, unless we have a reason to keep.

Note that this field does play a role in Ohio Metrc CSV/API formatting for results for samples submitted under ""Retest"" protocol of Ohio, which is correct (Metrc formatting for Ohio retests requires a ""Re-test"" reference in the text string).

AS Proposal:
Deprecate this field from all Sudoku tables.","Descriptive, non-operative Sudoku field. 

Not exposed via any aspect of LIMS, and therefore simply limited to lab into which user is logged in."
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Abamectin (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
71751-41-2,Abamectin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
67-64-1,Acetone,RSA,"[!date!],[!metrcid!],Acetone (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
67-64-1,Acetone,RSA,"[!date!],[!metrcid!],Acetone (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
67-64-1,Acetone,RSA,"[!date!],[!metrcid!],Acetone (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
67-64-1,Acetone,RSA,"[!date!],[!metrcid!],Acetone (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
67-64-1,Acetone,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Aflatoxin B1 (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
1162-65-8,Aflatoxin B1,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Aflatoxin B2 (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7220-81-7,Aflatoxin B2,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Aflatoxin G1 (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
1165-39-5,Aflatoxin G1,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Aflatoxin G2 (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7241-98-7,Aflatoxin G2,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Aldicarb (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
116-06-3,Aldicarb,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
23089-26-1,alpha-Bisabolol,TERPS,"[!date!],[!metrcid!],Alpha-Bisabolol (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
23089-26-1,alpha-Bisabolol,TERPS,"[!date!],[!metrcid!],Alpha-Bisabolol (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
23089-26-1,alpha-Bisabolol,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
6753-98-6,alpha-Humulene,TERPS,"[!date!],[!metrcid!],Alpha-Humulene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
6753-98-6,alpha-Humulene,TERPS,"[!date!],[!metrcid!],Alpha-Humulene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
6753-98-6,alpha-Humulene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
80-56-8,alpha-Pinene,TERPS,"[!date!],[!metrcid!],Alpha-Pinene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
80-56-8,alpha-Pinene,TERPS,"[!date!],[!metrcid!],Alpha-Pinene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
80-56-8,alpha-Pinene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
99-86-5,alpha-Terpinene,TERPS,"[!date!],[!metrcid!],Alpha-Terpinene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
99-86-5,alpha-Terpinene,TERPS,"[!date!],[!metrcid!],Alpha-Terpinene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
99-86-5,alpha-Terpinene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Arsenic (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7440-38-2,Arsenic,HM,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
71-43-2,Benzene,RSA,"[!date!],[!metrcid!],Benzene (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
71-43-2,Benzene,RSA,"[!date!],[!metrcid!],Benzene (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
71-43-2,Benzene,RSA,"[!date!],[!metrcid!],Benzene (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
71-43-2,Benzene,RSA,"[!date!],[!metrcid!],Benzene (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
71-43-2,Benzene,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
87-44-5+546-28-1,beta-caryophyllene/beta-cedrene,TERPS,"[!date!],[!metrcid!],Beta-Caryophyllene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
87-44-5+546-28-1,beta-caryophyllene/beta-cedrene,TERPS,"[!date!],[!metrcid!],Beta-Caryophyllene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
87-44-5+546-28-1,beta-caryophyllene/beta-cedrene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
123-35-3,beta-Myrcene,TERPS,"[!date!],[!metrcid!],Beta-Myrcene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
123-35-3,beta-Myrcene,TERPS,"[!date!],[!metrcid!],Beta-Myrcene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
123-35-3,beta-Myrcene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
18172-67-3+3387-41-5,beta-Pinene/Sabinene,TERPS,"[!date!],[!metrcid!],Beta-Pinene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
18172-67-3+3387-41-5,beta-Pinene/Sabinene,TERPS,"[!date!],[!metrcid!],Beta-Pinene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
18172-67-3+3387-41-5,beta-Pinene/Sabinene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Bifenazate (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
149877-41-8,Bifenazate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Bile-Tolerant Gram-Negative Bacteria (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
BTGN,Bile-Tolerant Gram-Negative Bacteria,MICRO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Cadmium (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7440-43-9,Cadmium,HM,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1139-30-6,Caryophyllene Oxide,TERPS,"[!date!],[!metrcid!],Caryophyllene Oxide (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
1139-30-6,Caryophyllene Oxide,TERPS,"[!date!],[!metrcid!],Caryophyllene Oxide (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
1139-30-6,Caryophyllene Oxide,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],CBD (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
13956-29-1,CBD,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],CBDA (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
1244-58-2,CBDa,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],CBN (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
521-35-7,CBN,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Cyfluthrin (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
68359-37-5,Cyfluthrin,"CRGC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Daminozide (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
1596-84-5,Daminozide,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Delta-8 THC (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
5957-75-5,delta8-THC,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],THC (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
1972-08-3,delta9-THC,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
5989-27-5,delta-Limonene,TERPS,"[!date!],[!metrcid!],Limonene (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
5989-27-5,delta-Limonene,TERPS,"[!date!],[!metrcid!],Limonene (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
5989-27-5,delta-Limonene,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Diazinon (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
333-41-5,Diazinon,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],DDVP (Dichlorvos) (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
62-73-7,Dichlorvos,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Dimethoate (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
60-51-5,Dimethoate,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],STEC (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],STEC (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],E.coli (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],E.coli (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],STEC Contamination (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,R&D Testing - Salmonella and STEC Contamination,,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],STEC (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],E.coli (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],E.coli (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],STEC (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],E.coli (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
STEC,E. Coli,"MICRO, STECSAL","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
64-17-5,Ethanol,RSA,"[!date!],[!metrcid!],Ethanol (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
64-17-5,Ethanol,RSA,"[!date!],[!metrcid!],Ethanol (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
64-17-5,Ethanol,RSA,"[!date!],[!metrcid!],Ethanol (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
64-17-5,Ethanol,RSA,"[!date!],[!metrcid!],Ethanol (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
64-17-5,Ethanol,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Etoxazole (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
153233-91-1,Etoxazole,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
470-82-6,Eucalyptol,TERPS,"[!date!],[!metrcid!],Eucalyptol (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
470-82-6,Eucalyptol,TERPS,"[!date!],[!metrcid!],Eucalyptol (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
470-82-6,Eucalyptol,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Flonicamid (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
158062-67-0,Flonicamid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Fludioxonil (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
131341-86-1,Fludioxonil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
142-82-5,Heptane,RSA,"[!date!],[!metrcid!],Heptanes (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
142-82-5,Heptane,RSA,"[!date!],[!metrcid!],Heptanes (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
142-82-5,Heptane,RSA,"[!date!],[!metrcid!],Heptanes (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
142-82-5,Heptane,RSA,"[!date!],[!metrcid!],Heptanes (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
142-82-5,Heptane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
110-54-3,Hexane,RSA,"[!date!],[!metrcid!],Hexane (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
110-54-3,Hexane,RSA,"[!date!],[!metrcid!],Hexane (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
110-54-3,Hexane,RSA,"[!date!],[!metrcid!],Hexane (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
110-54-3,Hexane,RSA,"[!date!],[!metrcid!],Hexane (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
110-54-3,Hexane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Imidacloprid (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
138261-41-3,Imidacloprid,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
75-28-5,Isobutane,RSA,"[!date!],[!metrcid!],Isobutane (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
75-28-5,Isobutane,RSA,"[!date!],[!metrcid!],Isobutane (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
75-28-5,Isobutane,RSA,"[!date!],[!metrcid!],Isobutane (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
75-28-5,Isobutane,RSA,"[!date!],[!metrcid!],Isobutane (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
75-28-5,Isobutane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
67-63-0,Isopropyl Alcohol,RSA,"[!date!],[!metrcid!],Isopropyl Alcohol (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
67-63-0,Isopropyl Alcohol,RSA,"[!date!],[!metrcid!],Isopropyl Alcohol (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
67-63-0,Isopropyl Alcohol,RSA,"[!date!],[!metrcid!],Isopropyl Alcohol (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
67-63-0,Isopropyl Alcohol,RSA,"[!date!],[!metrcid!],Isopropyl Alcohol (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
67-63-0,Isopropyl Alcohol,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Lead (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7439-92-1,Lead,HM,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
78-70-6,Linalool,TERPS,"[!date!],[!metrcid!],Linalool (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
78-70-6,Linalool,TERPS,"[!date!],[!metrcid!],Linalool (mg/g) Processed Products,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Processed Products),,,,,,NON-RETEST,OH,
78-70-6,Linalool,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Mercury (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
7439-97-6,Mercury,HM,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Moisture Content (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Moisture Content (%) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Moisture Content (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Moisture Content (%) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Moisture Content (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
MOICON,Moisture Content,MC,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Myclobutanil (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
88671-89-0,Myclobutanil,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
106-97-8,N-butane,RSA,"[!date!],[!metrcid!],N-butane (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
106-97-8,N-butane,RSA,"[!date!],[!metrcid!],N-butane (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
106-97-8,N-butane,RSA,"[!date!],[!metrcid!],N-butane (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
106-97-8,N-butane,RSA,"[!date!],[!metrcid!],N-butane (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
106-97-8,N-butane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
7212-44-4,Nerolidol,TERPS,"[!date!],[!metrcid!],Nerolidol (%) Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
7212-44-4,Nerolidol,TERPS,"[!date!],[!metrcid!],Nerolidol (mg/g) Processed Product,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Voluntary Testing - Terpenes (Plant Material),,,,,,NON-RETEST,OH,
7212-44-4,Nerolidol,TERPS,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Ochratoxin A (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
303-47-9,Ochratoxin A ,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Paclobutrazol (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
76738-62-0,Paclobutrazol,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
109-66-0,Pentane,RSA,"[!date!],[!metrcid!],Pentane (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
109-66-0,Pentane,RSA,"[!date!],[!metrcid!],Pentane (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
109-66-0,Pentane,RSA,"[!date!],[!metrcid!],Pentane (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
109-66-0,Pentane,RSA,"[!date!],[!metrcid!],Pentane (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
109-66-0,Pentane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Piperonyl Butoxide (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
51-03-6,Piperonyl Butoxide,PEST,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
74-98-6,Propane,RSA,"[!date!],[!metrcid!],Propane (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
74-98-6,Propane,RSA,"[!date!],[!metrcid!],Propane (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
74-98-6,Propane,RSA,"[!date!],[!metrcid!],Propane (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
74-98-6,Propane,RSA,"[!date!],[!metrcid!],Propane (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
74-98-6,Propane,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Pyrethrins (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
121-21-1,Pyrethrin 1,PEST,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella Contamination (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,R&D Testing - Salmonella and STEC Contamination,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Salmonella (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
SALM,Salmonella,"MICRO, STECSAL","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spinosad (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
168316-95-8,Spinosad,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Spirotetramat (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
203313-25-1,Spirotetramat,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],THCA (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
23978-85-0,THCa,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],THCV (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
28172-17-0,THCV,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Thiamethoxam (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
153719-23-4,Thiamethoxam,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Total Viable Aerobic Bacteria (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
TABAC,Total Aerobic Bacteria,MICRO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Total Aflatoxins (ppb) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
TOTAFLA,Total Aflatoxins,MYCO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,,,Processor Plant Material,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Total CBD (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
TOTCBD,Total CBD,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Total Coliforms (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
TOTCOLI,Total Coliforms,MICRO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Foreign Matter (%) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TFMI,Total Foreign Matter,FM,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (%) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (%) Dispensary Plant Material,0,TRUE,NOT TESTED",1,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (%) Processor Plant Material,[!value!],[!passfail!],[!notes!]",1,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (%) R&D Testing (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (%) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",1,Plant,,,,,,,,RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Total THC (mg/g) Retest (Processed Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,,,,RETEST,OH,
TOTTHC,Total THC,POT,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
1330-20-7,Total Xylenes,RSA,"[!date!],[!metrcid!],Xylenes (ppm) Processed Product (Additional),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
1330-20-7,Total Xylenes,RSA,"[!date!],[!metrcid!],Xylenes (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
1330-20-7,Total Xylenes,RSA,"[!date!],[!metrcid!],Xylenes (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
1330-20-7,Total Xylenes,RSA,"[!date!],[!metrcid!],Xylenes (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
1330-20-7,Total Xylenes,RSA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Processed Product (Previously Tested),[!value!],[!passfail!],[!notes!]",0,,,Processed Product (Previously Tested),,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Retest (Non-Solvent Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,NON-SOLVENT,,,RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Retest (Plant Material),[!value!],[!passfail!],[!notes!]",0,Plant,,,,,,,,RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Total Yeast and Mold (CFU/g) Retest (Solvent Based Product),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,,,,SOLVENT,,,RETEST,OH,
TYAM,Total Yeast & Mold,MICRO,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Non-Solvent Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,,,Non-Solvent Marijuana Ingredient,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Non-Solvent Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Non-Solvent Product (Not Previously Tested),,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Processor Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Processor Plant Material,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) R&D Testing,[!value!],[!passfail!],[!notes!]",0,Plant,,Research/Development,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Solvent Based Marijuana Ingredient,[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Marijuana Ingredient,,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Solvent Based Product (Not Previously Tested),[!value!],[!passfail!],[!notes!]",0,Non-Plant,,Solvent Based Product (Not Previously Tested),,,,,,NON-RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Trifloxystrobin (ppm) Retest,[!value!],[!passfail!],[!notes!]",0,,,,,,,,,RETEST,OH,
141517-21-7,Trifloxystrobin,"CRLC, CRLC1, PEST","[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
WATACT,Water Activity,WA,"[!date!],[!metrcid!],Water Activity (Aw) Dispensary Plant Material,[!value!],[!passfail!],[!notes!]",0,Plant,,Dispensary Plant Material,,,,,,NON-RETEST,OH,
WATACT,Water Activity,WA,"[!date!],[!metrcid!],Water Activity (Aw) Dispensary Plant Material,0,TRUE,NOT TESTED",0,Plant,,Dispensary Plant Material - STEC/Sal,,,,,,NON-RETEST,OH,
WATACT,Water Activity,WA,"[!date!],[!metrcid!],Water Activity (Aw) R&D Testing,[!value!],[!passfail!],[!notes!]",0,,,Research/Development,,,,,,NON-RETEST,OH,
WATACT,Water Activity,WA,"[!date!],[!metrcid!],Hemp Derived Ingredient R&D Testing,0,TRUE,CoA Contains Results and Limits for All Assays Performed",0,Non-Plant,Hemp-Derived Ingredient- External Source,,,,,,,NON-RETEST,OH,
