# NewBatch - Ohio - Sample Receiving - Manifest Import - autocreate multiple Cannabinoids replicates (flower, processed products)

- **ID**: 1102
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2021-12-06T17:42:58.04Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Ohio only:  Upon importing a manifest, create number of replicates based on Potency Target information that is contained in the manifest:  (1) If there is no potency target, the sample is "blind".  We test in duplicate.  LIMS will autocreate Replicates 1 and 2 for the sample. (2) If there is a potency target (or range), autocreate 1 replicate.  The above is correct for "Plant" and "Non-Plant" (and will also be true for "kief").  Note, Michigan will create only one replicate for each sample on a manifest.

# NewBatch - Implement Preliminary Proposed PrepBatch schema

- **ID**: 1207
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-01-21T13:46:20.43Z
- **Last Updated**: 2022-02-08T20:33:58.613Z

## Description

Develop a preliminary schema to support the New Batching feature.

# NewBatch - Generate Prep Bench Sheet from Template

- **ID**: 1208
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-01-21T13:48:04.94Z
- **Last Updated**: 2024-04-18T15:39:03.127Z

## Description

From a stored spreadsheet template, generate a prep benchsheet of a particular type.

# NewBatch - Create Nav Menu Sandbox based on QA Environment

- **ID**: 1209
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2022-01-21T13:51:01.157Z
- **Last Updated**: 2022-01-27T20:07:41.97Z

## Description

Set up the environment variable in QA web app to specify QA. Create a section of the Nav Menu that is only visible when the app is running on QA or Development.

# NewBatch - [SUPERSEDED] - Identify LabAssets

- **ID**: 1210
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2022-01-21T13:52:13.793Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Various fields on a Benchsheet will be for recording the identify of various lab assets that are used in the sample preparation.   For example, a particular prep might use a 20 ml pipette and a consumable solvent such as benzene.    Lab assets will have a particular asset type, such as 20 ml pipette, or Benzene, and an identifier for the specific item that was used, such as a serial number on the 20 ml pipette or an NCTL number assigned to a particular jug of Benzene. The Lims will have a table of LabAssetTypes and LabAssets.   The former will have entries such as 20 ml pipette and the latter will be the associated identification numbers of the candidate assets, such as the ID numbers for the  particular 20 ml pipettes that the lab technician can use in his prep activity.And so what we need is an inventory of lab assets whose usage we want to track in the various prep and analysis batches.  The table should be something likeAssetType                 Asset#20 ml pipette           NCTL0123 20 ml pipette           NCTL0143 20 ml pipette           NCTL0178 20 ml pipette           NCTL0222 20 ml pipette           NCTL0003 Lab Scale                  NCTL0001 Lab Scale                  NCTL0007 '''                               '''You can consider the AssetType to be a kind of "role" and the Asset to be an asset assigned to that role.   If you want to have additional fields for tracking MFG serial numbers and other info not assigned by NCTL, that's fine, too.  I already have a boolean field called IsConsumable, and a datetime field called Expiration.I don't consider the actual instruments in the lab assets.  There is already an Instrument Type table that we use.   And there is also an Instrument table that is not being used.   That table will be used to identify the specific instrument of a particular instrument type that was used in data acquisition. Instruments are LabAssets for purposes of quality control/data quality, and must be verified during each analysis batch review for conformance with requirements (acceptable calibration "on file" in LIMS, within preventative maintenance requirements as documented in LabAssets table).    Additionally, the "Method Files" that control instrument operational parameters during each run are LabAssets (digital lab assets).     To become an "available" method file in the LabAssets list, the method file (proprietary to the instrument manufacturer) should first be saved via LIMS/placed in file storage, so that we have a copy available and an auditable record.

# NewBatch - UI for Create Prep Batch

- **ID**: 1211
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2022-01-21T13:53:58.093Z
- **Last Updated**: 2022-08-29T13:04:24.013Z

## Description

_No description_

# NewBatch - Sample to PrepBatchSop mapping

- **ID**: 1212
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2022-01-21T13:56:04.81Z
- **Last Updated**: 2022-08-29T13:04:12.877Z

## Description

Provide a schema and logic to be able to map incoming samples to their appropriate prep batch SOPs.

# NewBatch - Identify user roles

- **ID**: 1220
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2022-01-25T15:55:27.573Z
- **Last Updated**: 2022-02-02T13:50:54.177Z

## Description

_No description_

# NewBatch - Prep Batch Schema spike.

- **ID**: 1243
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-02-08T20:29:41.183Z
- **Last Updated**: 2022-02-08T20:33:29.06Z

## Description

Design preliminary schema for generating a Prep Batch Bench Sheet.

# NewBatch Spike - Classes for reading and writing to named cells and ranges.

- **ID**: 1244
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-02-08T20:36:21.067Z
- **Last Updated**: 2022-04-01T15:36:31.287Z

## Description

Design, code, and unit test classes for reading and writing to named cells and ranges on a spreadsheet.

# NewBatch - Resurrect Prep Batch classes and Mapping

- **ID**: 1345
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-03-22T16:38:40.8Z
- **Last Updated**: 2024-04-18T15:38:55.7Z

## Description

Model schema was created for New Batch work, but had to be rolled back due to migration issues.     This work item is for resurrecting the model classes and mapping them for a migration. Accomplished for Prep Batches

# NewBatch - Create UI for Management of Quality Controls

- **ID**: 1481
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-07-19T13:24:58.42Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Continuing Calibration Verifications - acceptance criteria based on percent recovery, and will vary by assay; these have expiration dates. Continuing Calibration Blanks - acceptance criteria default of "less than instrument LLOQ"; these have expiration dates. Internal Standard - acceptance criteria based on peak area (warning if greater than +/- 3 standard deviations; presumptively reject if +/- 4 standard deviations).        Internal standards have CAS numbers and are "real" chemicals.        For example, Ohio terpenes use n-Nonane (CAS 111-84-2) and n-Dodecane (CAS 112-40-3). Duplicates - sometimes, but not always, have acceptance criteria; when no acceptance criteria, duplicates are generally placed on control charts.  Draft User Interface - edit using attached Excel Macro-Enabled Workbook  (Filename: Mockup - Quality Control Management User Interface.xlsm)

# NewBatch - Prep Batch Issuance rules

- **ID**: 1483
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-07-19T13:43:21.06Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Create and implement the rules for issuing and reissuing bench sheets from a given batch.   And for importing or re-importing bench sheets to a given batch.  This is related to the Batch States story, but it is a subject of its own.    An example of a rule:   The reissuing of a bench sheet renders all previous issues obsolete.   Lims will only accept importing of the latest issue of a bench sheet.

# NewBatch - PrepBatch States and State Rules

- **ID**: 1484
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-07-19T13:43:44.697Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Prep Batch states are related to workflow and also for validation.  Examples of a batch state might be: In Process Ready for Analysis Closed Locked  Rules: A "Closed" prep batch can be re-opened until the prep batch is committed to an analysis batch. A "Locked" prep batch cannot be re-opened.

# NewBatch - Establish "BatchItem" Naming Conventions

- **ID**: 1485
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-07-19T14:28:40.943Z
- **Last Updated**: 2024-10-15T18:44:43.2Z

## Description

A Batch Sample BatchItem is a sample an item (such as a customer sample or a quality control item) that inhabits a particular slot in a batch (prep or analysis).   Create terse naming conventions for BatchItems that are nonetheless readable/parsable by both humans and computers.  The naming conventions will be displayed in the UI and set in the instrument files. For Customer Samples, the naming convention will include references to the:Manifest Sample Customer Sample - To relate the batch sample to the actual Customer Sample. Also includes Replicate number of the Customer Sample.  AssayRequest - To identify the request that drives the need to batch a Manifest Sample.  Examples are  Manifest requested a test Analyst requested a confirmation test   For Quality Control Items, the naming conventions will be set in the user interface for Quality Control Items.

# NewBatch - Prep Batch bench sheet importing rules. 

- **ID**: 1490
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-07-19T14:54:40.303Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

_No description_

# NewBatch - Terpenes - Primary Review - Prep Batch Results Tab

- **ID**: 1496
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2022-07-26T13:26:31.29Z
- **Last Updated**: 2024-07-16T15:43:06.22Z

## Description

Start with Terpenes.  Within UI for Analytical Batch, subdivided "Batch Results" by Prep Batch.     Developer:Call ResultsService:  Task<PrepBatchBatchResultsVm> GetPrepBatchResultsVm(int prepBatchId) Prep Batch Tab in Primary Data Review (and also Secondary)   Quality Controls  Reagent Blank with Internal Standard (RBIS) - control sample taken through entire prep process; includes internal standard for full replication of the prep process, including addition of internal standard as part of extraction/dilution.  Duplicate (DUP) -   "Status" - RBIS - PASS if all values are below Instrument LLOQ; FAIL if any analyte is detected in a concentration greater than Instrument LLOQ.    Note that, as you can see in the screenshot under "Acceptance Criteria," the spreadsheet uses "LCB < LLOQ".  LCB is synonymous with RBIS.  RBIS is the correct label.  Note 2 - RBIS does not have a sample weight; the quality control is a direct comparison of micrograms per mL of the RBIS (as determined by the instrument software) against the instrument LLOQ (in our data), also denominated in micrograms per mL.  "Status" - DUP - PASS/FAIL/"<10xLLOQ" (1) PASS/FAIL based only on analytes that exceed a lab-defined threshold for duplicate analysis, which is currently 10x LLOQ.  For all values displayed as mg/g: If the instrument concentration is zero, return "ND". If the instrument concentration is greater than zero but less than instrument LLOQ, return <dynamicLLOQ (i.e., the "reportable"/CoA LLOQ). If the instrument concentration is equal to or greater than instrument LLOQ, calculate the concentration using normal business rules for analyte concentrations for terpenes.     Customer/Test Samples  "Status" - test samples/customer samples: If data is missing, return a short dash ("-"). If the calculated/reportable concentration is greater than ULOQ, return ">ULOQ". If the calculated/reportable concentration is less than dLLOQ, return <[calculated/dynamic LLOQ for the sample] If the calculated/reportable concentration is equal to or greater than dLLOQ and less than or equal to ULOQ, return the calculated value for concentration.

# NewBatch - PrepBatch SampleType expansion

- **ID**: 1547
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2022-08-25T12:59:39.23Z
- **Last Updated**: 2022-08-26T14:00:24.247Z

## Description

For all PrepBatch view models, SampleType should show the following:1) For Manifest Samples and Dups, SampleType = ManifestSampleType 2) For All other Control Samples, SampleType = SopControlSample.Description.

# NewBatch - Change PrepBatch roles.

- **ID**: 1549
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-08-25T13:01:57.333Z
- **Last Updated**: 2023-02-23T15:09:44.34Z

## Description

In the NewBatch data refresh script, replace the prep batch roles with one role to cover the prep batch creation.

# NewBatch - Analytical Batch Viewmodels

- **ID**: 1550
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-08-25T13:08:19.897Z
- **Last Updated**: 2023-02-23T15:09:23.373Z

## Description

Tasks  Prep to Analytical Batch Mapping Schema DashboardVm Graph  Individual AnBatch Vm graph.

# NewBatch - Procedure List

- **ID**: 1551
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-08-25T14:29:22.17Z
- **Last Updated**: 2023-02-23T15:09:31.75Z

## Description

Add Procedure List capability to PrepBatch and Analytical Batch  Upgrade schema. Populate Data, Add to viewmodels.

# NewBatch - PrepBatch BenchSheet UI 

- **ID**: 1557
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2022-08-29T13:04:52.227Z
- **Last Updated**: 2024-04-18T15:38:41.65Z

## Description

AS NOTE 8/4/2023 - Would like to test this ASAP with our analytical balances, which are connected to tablets via USB cable.  Overall Make entire Bench Sheet scrollable.  Make UI form adjust for vertical space. Validation    Batch Object Section Obey ReadOnly qualifier for each object and make UI field ReadOnly.   Procedure Section Add ItemNumber (string) and TabOffset (int zero based) to SopProcedureItem model and BenchSheetProcedureVm Output list of items Make scrollable if exceeds maximum height.     Test Setup Section On field entry, adjust css to not expand the row height  Obey ReadOnly qualifier for each object and make UI field ReadOnly. Allow for creation of a DUP (duplicate control by selecting a Lab Sample Number. Add top border row to Bench Sheet  Correct header separator from grey to black Set Column width from configuration value in SopField table  Analyst Notes:  Allow data entry into the notes section

# NewBatch - PrepBatch - Allow Reassignment of Sample Type

- **ID**: 1559
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2022-08-29T13:42:01.76Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Allow correction of Sample Type to allow assignment to a different prep SOP.  Raises the possibility that a sample of a Sample Type will be batched for one assay and "mismatched" to that assay.   A possible solution is to advise user(s) in relevant screen(s)/UIs that, after initial batching, the Sample Type changed to a sample type that is ostensibly incompatible with the SOP used for the preparation and/or analysis, assuming that there is a mismatch between the two.   This would give the user the information necessary to look at whether the mismatch is a critical mismatch that precludes reporting and necessitates reprep/reanalysis, or, alternatively, whether the mismatch is non-critical.

# NewBatch - Deep Dive Prep Batch Config Data

- **ID**: 1561
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2022-08-30T17:44:20.58Z
- **Last Updated**: 2022-10-10T13:44:17.43Z

## Description

Lims needs to track the lab assets that appear as user selected Batch Objects on the benchsheets (e.g. MeOH:).  At the moment, the purpose of tracking those assets is to populate the pull-down controls on the benchsheets with the eligible candidates for a particular batch object.   For example, if MeOH solvent is used on a Potency prep, the analyst will need to specify which lot number (or NCTL Id) was used.The Lab Assets are broken up into three categories which are   Purchased Reagents - Reagents purchased from vendors under a particular PO#.  Prepared Reagents - Reagents prepared in the lab using Purchased Reagents or other Prepared Reagents Durable Assets - Small equipment such as pipettes, scales, etc, not including the instruments used to collect the actual measurements, such as LCMS or ICP Spectrometers.Lims will maintain a LabAssetType table which can be thought of as a Part Number table with entries like "1ml -Pipette", or "Isopropanol ACS grade", or "Pesticide Spike Solution".And Lims will maintain a LabAssetTable that will list the actual instances of the LabAssetTypes by NCTL Control number of Lot Number or whatever is appropriate.In the case of Purchased and Prepared Reagents, LIMs will track the expiration date of each lot and whether it has been completely consumed or not.   In the case of Prepared Reagents, each lot can have its own expiration date, or Lims will use the expiration dates of the component Purchased Reagents, whichever is sooner.Asset Names should be complete enough so that someone administering these tables in Lims will know which asset type is being referred to.    For example "Pipette" does not have enough detail whereas, "Heavy Metal Spike Solution" is better.   Since all the assets being tracked are ultimately called for in the various SOPs, the best name for an asset is one that makes it easy to identify which item in the SOP the asset is referring to.  Attached is a spreadsheet put together by me (Dudley) by studying the SOPs and examples of the latest Benchsheets from the various assays.  I also studied the spreadsheet Britney maintains for purchasing reagents.  My spreadhseet needs to reviewed by someone with more qualifications than me so the information is as accurate as possible.Also, the Prepared Reagents sheet needs to be completed by someone who knows how to assign the lot numbers or control numbers of the Purchased Reagents that went into each of the particular lots of Prepared Reagents.

# Redo script to populate NewBatch configuration into Lims from the xImport tables.

- **ID**: 1573
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-09-07T13:22:01.55Z
- **Last Updated**: 2022-09-21T17:54:26.55Z

## Description

SOPs LabAssets BatchObjects Procedures

# NewBatch - Table Column Validation Schema and Config data

- **ID**: 1591
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-09-21T11:36:06.22Z
- **Last Updated**: 2023-02-23T15:09:09.307Z

## Description

Schema for TableColumnSopFields used for validation View Models for same. Config data for same  Script queries for import of config data. Closed as Obsolete

# NewBatch - Analysis

- **ID**: 1668
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2022-10-27T13:45:50.443Z
- **Last Updated**: 2023-02-23T15:08:02.547Z

## Description

Closed as obsolete

# NewBatch - Analytical Batch UI

- **ID**: 1724
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2023-01-16T14:11:09.263Z
- **Last Updated**: 2023-02-23T20:52:31.017Z

## Description

Create Dashboard PB Ready to Assign In Process Analytic Batch w/o results Analytic Batch w results  Create In Process  Create Benchsheet  











Seq № 
Prep Batch ID 
Sample Type 
Number of Samples 
Prepared By 
Prep Date 
Comments 


1 
PR68378 
Flower 
12 
Josh Bonnell 
8/16/2022 
NA 


2 
PR68379 
Flower 
41 
Josh Bonnell 
8/16/2022 
NA 


3 
PR68380 
Flower 
15 
Josh Bonnell 
8/16/2022 
NA 


4 
PR220817 
Flower 
6 
Zach Melvin 
8/17/2022 
NA

# NewBatch - Collect All Bench Sheets (Prep and Analytical)

- **ID**: 1759
- **State**: Closed
- **Assigned To**: Unassigned
- **Created**: 2023-02-21T14:36:47.557Z
- **Last Updated**: 2024-02-06T18:26:05.217Z

## Description

See attachments - one full day of bench sheets and analytical workbooks - one zip each for Ohio and Michigan.

# NewBatch - Instrument File Parser Parses HPLC file in Unit Test

- **ID**: 1767
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2023-02-23T15:11:45.007Z
- **Last Updated**: 2023-03-06T14:24:00.807Z

## Description

Unit test for FileParserService should demonstrate complete parsing for File, Sample, and Analyte Level fields for a LabSolutions HPLC file.  Parsing occurs using a list of FileParserFields that describe where to find each piece of information. The result is a hierarchy File Level Info  |- Sample Level Info (one or more)      |- Analyte Level Info (one or more) Which contain: File Level Info Application Name Application Version Application Output Date Application Output FilePath Instrument Name Instrument File GenereatedOn Instrument File GeneratedBy Instrument File ModifiedOn Instrument File ModifiedBy ImportedOn  Sample Level Info Sample Name Rack Vial Detector Name Detector Id Operator Name Analyst Name AcquiredOn  Analyte Level Info Peak Id Nr Instrument AnalyteName Measured Result Detector Channel Group Result Peak Retention Time Peak Start Time Peak End Time Peak Area Peak Height Mass

# NewBatch - FileParser Fields

- **ID**: 1768
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2023-02-23T16:02:29.267Z
- **Last Updated**: 2023-02-28T19:24:25.6Z

## Description

Create Schema to store file parser fields for Instrument Types.  |- Instrument Type      | - File Parser        | - File Parser Fields  File Parser should be retrievable by InstrumentName and Version

# NewBatch - Add DateTime Type to SopField Model

- **ID**: 1769
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-02-23T18:10:42.317Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

- Add Need a TableColumnDateTimeSopField type to SopField Model - for @Dudley Chapman

# NewBatch - Instrument File Parsing

- **ID**: 1774
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2023-03-01T14:06:12.65Z
- **Last Updated**: 2023-04-27T13:41:43.873Z

## Description

_No description_

# NewBatch - Analysis of Sample Results

- **ID**: 1796
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2023-03-01T14:19:26.183Z
- **Last Updated**: 2024-09-03T16:21:08.16Z

## Description

_No description_

# NewBatch - Mich/Ohio - UI - allow user to select individual analytes / less-than-all of the default analytes for any AssayRequest

- **ID**: 1855
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-04-18T14:13:33.14Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

 What to do about computed analytes?  Allow users to de-select some or all analytes for any AssayRequest, regardless of TestCategory or any other factor.  Manifest Editor and Metrc Receiving UIs - Add button "Select Analytes" After user clicks button, analytes for all selected assays will be displayed. Organize analytes by assay - group together under separate bold headers, i.e. Terpenes followed by reportable terpene analytes (i.e., in Ohio, LIMS has "Total Terpenes" but this is not allowed to be reported and is for lab use only; this would be considered a non-reportable terpene analyte). Multiselect checkboxes default to all analytes selected.   "Prep Pending" UI - (note, any analyte exclusions after prep will be addressed in a separate story) Add a column to the sample list on the far right side of the table with a "Analytes" or "Select Analytes" button for every sample/row (button can be either of those - if shorter necessary for reasonable column width, "Analytes" is fine). On this screen, only display the analytes for the assay selected. Only display reportable analytes.   Other UIs - will be addressed in a separate story for "Exclusion" of analytes post-analysis.   For all UIs Default to selecting all analytes, and let the user de-select the "All" button (which will de-select all analytes) and then let the user select individual analytes, or allow the user to keep the "All" but turn it from a checkbox into a square-inside-a-square (exactly how Excel behaves):  Excel behavior when "All" selected (left screenshot) vs. when fewer-than-All are selected (right screenshot):   Processing of Instrument Files:  On the arrival of an instrument data file, only selected analytes for the sample will be processed. De-selected analytes for the given sample will not be processed and no data from the instrument file will be recorded or analyzed in the LIMS database.(However, the entire data file will be continue to be stored intact with all its results).  Treatment of Computed Analytes Generally - subject to note below - when a user de-selects a "computed" reportable analyte - for example, Spinosad (which is a computed analyte calculated by summing the measured concentrations of Spinosyn A and Spinosyn D), the analyte list will only display Spinosad. When the user de-selects a computed reportable analyte, the component analytes will be omitted from import. Do not apply the "component analyte de-selection logic" when the components are Reportable on their own, for example, Total THC is a computed analyte comprised of two measured analytes, delta-9-THC and THCA.  If Total THC is de-selected, the component analytes will remain selected unless/until the user deselcts the individual component analytes.       Definitions  Replicates - When a data file for a sample is imported and analyzed, a ReplicateResult is produced in the database for each analyte in the file.    These are the ReplicateResults that are accessible in the Batch Results screen for each analyte, within each replicate.   Reportable Results - Replicates are evaluated to produce an Average, Stddev, Rsd, and other statistics.   This information is recorded in the SamplePanelAnalyte table.   The values in this table are what gets reported to the CoA and the Metrc CSV.  Computed Analytes - Computed analytes are analytes that are not directly measured by the instrument.   They are the sum of directly measured analytes from the same instrument data file.  For example, Total Cannabinoids is a computed analyte.  It's constituents are all the cannabinoids measured by the instrument for a given sample.  Another example is Neroldilol, which is computed by summing the replicate results for two directly measured isomers of Neroldilol.   Excluding an analyte after LIMS has received instrument file data is not a part of this story; that situation will be addressed in a separate story.

# NewBatch - Review Waterfalls - Primary and Secondary Review

- **ID**: 1920
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-08-03T17:56:37.72Z
- **Last Updated**: 2025-03-14T01:05:14.083Z

## Description

Primary review will occur at the end of the analysis batch process, seamlessly and without user moving to a new screen. Analysis batches for which primary review is complete will move to a Secondary Review queue. Secondary review queue will be divided by corresponding batch workflow (e.g. Cannabinoids Flower analysis batches will be in Secondary Review Cannabinoids Flower queue). When conducting secondary review, user will "check out" the analytical batch. User who checks out secondary review must complete secondary review, or discard all changes and make secondary review available for another user; no "partial" secondary review.  The system will display the identity of the user who has checked a batch out for secondary review. The system will display the identity of the user who completed the secondary review. The system will have "available" / "in process" / "completed" secondary review tabs. For performance reasons, we will use a "Past 7 / 15 / 30 / All days" (etc.) system.  The system will time and date stamp primary review and secondary review. The system will display dates of primary and secondary review. (Not necessary to display time of review, but document for audit trail purposes.)  The user interface will display LabAssets used for any aspect of the analysis, from preparation through analysis. The system will automatically check that LabAssets used at any point between preparation and instrument analysis are "current" (for example, hardware such as instruments and pipettes have acceptable calibration dates and are in conformance on preventative maintenance schedules; analytical balances and any instrument used has a current satisfactory/within-specification calibration on file; solvents/reagents used in the analysis were from lots that were not expired at the time they were used). For instrument-based tests that require chromatograms (specified below), user must document whether any manual integrations were conducted, and, if manual integrations did occur, primary reviewer and secondary reviewer must both confirm that "all manual integrations are consistent with principles of proper integration". Cannabinoids Flower/PP ChemRes by LCMS1 ChemRes by LCMS2 Pesticides Mycotoxins Residual Solvents Heavy Metals [?]  System will display the "Method File" used by the instrument for the analysis. Method files are digital LabAssets. To become an "available" method file, the method file (proprietary to the instrument manufacturer) should first be saved via LIMS/placed in file storage, so that we have a copy available and an auditable record.

# NewBatch - rename "Batch Workflow" to "Assay"

- **ID**: 1923
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-08-06T09:34:05.877Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Change nomenclature in user interface(s) from "Batch Workflow" to "Assay".

# NewBatch - Extraction volumes in mL instead of L

- **ID**: 1924
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-08-06T09:47:57.343Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

Eliminate the use of liters for analyses and instead use mL. This begins at the prep batch stage and carries through analyses.

# NewBatch - Micro - Batch Results - create fields for entry of "Incubation Start" / "Incubation End"

- **ID**: 1930
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-08-14T17:56:13.953Z
- **Last Updated**: 2024-10-15T18:34:53.05Z

## Description

For microbial assays that require incubation, incubation start/end dates/times are critical parameters.  Developer: Create fields for entry of "Incubation Start" / "Incubation End" dates and times.

# NewBatch - Lab Assets - Prepared Reagents

- **ID**: 1934
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2023-08-17T14:55:17.747Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Create table structure for Prepared Reagents.  --- For a "Standard" to be listed as a "Prepared Reagent" that will be displayed for users to select for use in any step in the course of analysis within LIMS, it must have a preparation record that documents compliance with the relevant rules for preparation.  This will require a lab user to enter the relevant information in the Standard Preparation Log Book User Interface before the "Standard" to be shown as an available standard.  Note, other "Prepared Reagents" will be   Create a user interface for Standard Preparation Log Books. When a user wants to add a PreparedReagent to the system, the user will be required to provide the required information, and the requisite information that comes from the PurchasedReagents table will be required to be in the system (solicited at PurchasedReagents UI). See attached file "Standard Preparation Logs - AS Notes [etc].xlsx" for fields required to be displayed to user, most of which are solicited and some of which will display information already in the system from the PurchasedReagents Table.

# NewBatch - Customizable Batch Naming - Create UI

- **ID**: 1939
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2023-08-29T13:25:23.623Z
- **Last Updated**: 2024-10-15T18:44:32.17Z

## Description

_No description_

# NewBatch - Perfect Prep-Analysis Workflow

- **ID**: 1949
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2023-09-05T16:31:25.26Z
- **Last Updated**: 2024-04-18T15:39:19.287Z

## Description

Prep Batch Dashboard Expand ellipsis-sized Sample Type  Prep Batch - Assign Samples to Prep Batch In Dashboard Card, allow easy return to Dashboard Create easy assignment of Prep Batch status  between "In Process" and "Ready for Analytical Batch" Expand ellipsis-sized for all grid columns  Prep Batch Benchsheet  Add button to toggle prep batch status between "In Process" and "Ready for Analytical Batch"  Analytical Batch Dashboard  Expand ellipsis-sized Sample Type  Analytical Batch - Assign Prep Batches to Analytical Batch Remake to behave like Prep Batch Assign Sample to Prep Batch

# NewBatch - Nav Menu

- **ID**: 1987
- **State**: Closed
- **Assigned To**: Gary Mandela
- **Created**: 2023-11-06T16:08:11.447Z
- **Last Updated**: 2024-04-18T15:39:25.777Z

## Description

Create new NavMenu using:

# NewBatch - QC - Terpenes - Parse Instrument Files for Peak Area for n-Dodecane (Internal Standard)

- **ID**: 2011
- **State**: Closed
- **Assigned To**: Unassigned
- **Created**: 2023-12-20T20:02:24.65Z
- **Last Updated**: 2024-04-18T18:02:14.553Z

## Description

For every Terpenes instrument file imported into LIMS, parse the value in: Row containing analyte name: "n-Dodecane" Column header: "Area"   In the screenshot below, the value is 2668367.  Instrument files are attached.  Note, this information is already included in the instrument files that we are currently using.  The n-Dodecane values will be used for quality control / quality assurance purposes.  Analysis of n-Dodecane for quality assurance will be described/specified in a separate story.

# NewBatch - User Admin - Create "DoC" field

- **ID**: 2014
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2023-12-21T16:09:54.05Z
- **Last Updated**: 2024-04-18T15:37:58.93Z

## Description

Create "Demonstration of Capability" ("DoC") field for User management.  For an assay to be valid, it must have been completed by an individual holding a currently-valid/unexpired DoC.  DoC is authorized by any Admin and any Quality Manager.  These are Roles.  A single employee - for example, almost all analysts - will have multiple DoCs "on file".  Each DoC has a beginning date, renewal dates, and expiration dates.  Developer: Adam will provide a list of DoCs. - SEE ATTACHED / same table copied and pasted below. Updates will be made in the Edit User interface. Each DoC will have its own row that contains a DoCType,EffectiveDate, ExpirationDate and an expiration date. Data will be ordered by DoCType, EffectiveDate and ExpirationDate reverse order.  UI will be a tab with User | Training (similar to our current Client Edit screen.  For xDocType  Add delete to "NewBatch Delete Configuration Data.sql" be sure to Reseed the Id (IdentityKey) to 1 Add insert to "DudleysLoadBatchSopStuff.sql"  List of DoCs (for Development purposes only) 


Demonstration
  of Capability 


Preparation of Cannabis Plant Material
  Samples for Cannabinoid Content Analysis 


Preparation of Cannabis Processed
  Products Samples for Cannabinoid Content Analysis 


Preparation of Cannabis Samples for
  Chemical Residue LC1 Analysis 


Preparation of Cannabis Samples for
  Chemical Residue LC2 Analysis 


Preparation of Cannabis Samples for Heavy
  Metals Analysis 


Preparation of Cannabis Samples for
  Microbial Analysis 


Preparation of Cannabis Samples for
  Mycotoxins Analysis 


Preparation of Cannabis Samples for
  Residual Solvents Analysis 


Preparation of Cannabis Samples for
  Terpene Analysis 


Preparation of Cannabis Samples for
  Vitamin E Acetate Analysis 


Analysis of Cannabis Samples for
  Cannabinoids by HPLC-PDA  


Analysis of Cannabis Samples for
  Cannabinoids by HPLC-UV  


Analysis of Cannabis Samples for Chemical
  Residue by LC1  


Analysis of Cannabis Samples for Chemical
  Residue by LC2  


Analysis of Cannabis Samples for Heavy
  Metal Content 


Analysis of Cannabis Samples for
  Microbial Content 


Analysis of Cannabis Samples for
  Mycotoxin Content 


Analysis of Cannabis Samples for Residual
  Solvent Content 


Analysis of Cannabis Samples for Terpene
  Content 


Analysis of Cannabis Samples for Vitamin
  E Acetate Content 


 Foreign Matter/Visual Inspection  


 Water Activity  


 Moisture Content

# NewBatch - Clients - create "Discount" field

- **ID**: 2021
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2023-12-22T18:39:30.28Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Developer notes: In the Edit Client screen, create a "Discount" tab. In the "Discount" tab, list all Bundles/Assays (as reflected in the Pricing Table) Bundle/Assay in the first column and the % discount Bundle/Assay Base Price (PriceTable) Discount % (display as integer) 99. Discounted Price (as Integer) 9,999. Discounted Price (Calculated) Round to 2 decimal  The % discount and $ price for the client category will be mutually exclusive - if one is populated, the other column within that row empty or both columns are empty. Need Effective Date for discounts     Table: ClientPricing  Columns: ClientId PricingId Value int >= 0 IsPercent Retest bool  R&D bool  Constraints: ?  ClientId, PricingId  Percent  format 999.99 e.g. 20.00 for 20% Dollar  x9.99  Developer:

# NewBatch Admin + Sales Team access only -> TestCategory Price Sheet

- **ID**: 2022
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2023-12-22T18:40:12.35Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Create a user interface that lists every TestCategory and allows the user to enter/update the price for the lab.  Restrict access to only members of the Sales Team (and superadmins).    Developer Notes Need "Name" "Price" "Min Size" "Tests" (use our slugs for "Tests") "Name" = "Assay/Bundle" Need "Effective Date" for new TestCategories and for price changes   Nav Menu: Admin -> Menu  Table: Pricing Columns: TestCategoryId int?  PanelId int Constraint: Required and unique  Price decimal (7,2) MinSampleSize double (in grams) SortOrder int   This model inherits from EffectiveDate base model   UI: Test column is found relationally and displays Panel Slugs Min Size value display as string with the (g)

# NewBatch - Create Method Reporting Limits distinct from LOQ

- **ID**: 2024
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-01-02T21:05:54.087Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Add Method Reporting Limits to Sudoku tables for InstrumentAnalyteLOQs. Method Reporting Limits

# NewBatch - Allow Logged-In User to Toggle Between Labs

- **ID**: 2042
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-02-02T15:17:18.727Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Main Header UI Show a badge of OH or MI as the default lab If user have access to multiple labs, allow the badge to be clickable to display dropdown of lab choices. When loading the application, use the designated default lab.  Manage User UI In user screen, allow user to select default lab, if they have access to multiple labs.  Database AspNetUsers.LabId Remove from schema UserLab Add table - Inherit from Base Model Id int AspNetUserId int LabId int   UserDetailService On lab switch, refresh the user and lab details  FindColumnInDbdeclare @DbName varchar(max) = 'NCLimsFeatureLocal'declare @ColumnName varchar(max) = '%UserId%'SELECT Table_Schema, Table_Name, Column_Name FROM INFORMATION_SCHEMA.COLUMNSWHERE TABLE_CATALOG = @DbNameAND COLUMN_NAME LIKE @ColumnNameORDER BY Table_Schema, TABLE_NAME

# NewBatch - PowerBI - troubleshooting

- **ID**: 2043
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-02-02T15:29:45.043Z
- **Last Updated**: 2024-02-06T14:34:20.07Z

## Description

# NewBatch - Audit Interface - Log Important Data Points Related to Sample History

- **ID**: 2044
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-06T18:41:29.16Z
- **Last Updated**: 2024-10-15T18:27:55.617Z

## Description

From #2092  "Discussion" tab - shows the history of comments.  This does not necessarily need to be a tab; this UI could also display "Comments" only, with the history of comments below + paragraph/freeform user input above for additional time-stamped comments.

# NewBatch - Receiving

- **ID**: 2051
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-27T15:41:50.46Z
- **Last Updated**: 2025-03-14T00:58:27.633Z

## Description

_No description_

# NewBatch - Sample Prep

- **ID**: 2052
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-27T15:42:00.797Z
- **Last Updated**: 2024-10-11T17:01:44.207Z

## Description

_No description_

# NewBatch - Lab Assets

- **ID**: 2053
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-27T15:42:54.093Z
- **Last Updated**: 2024-09-03T16:06:22.86Z

## Description

Navigation Structure:  Main Navigation: AdminAsset TypesPurchased Reagent Prepared Reagent Durable Asset Digital Asset - "Lab Documents"      UI Design: Left Panel: See #2151 organizational structure.   Right Panel: Upon clicking an asset type from the left panel, the right panel should display detailed fields relevant to the selected asset type. Provide input fields for entering and editing details specific to the selected asset type.   Bottom Section: A grid displaying all lab assets, allowing for inline editing. The grid should support CRUD operations (Create, Read, Update, Delete) for the assets.    Fields Specific to Asset Types: Durable Asset: OutOfService: Boolean field indicating if the asset is out of service.   Prepared Reagent: Consumed: Boolean field indicating if the reagent is consumed. ExpiresOn: Date field indicating the expiration date of the reagent.

# NewBatch - Batch Analysis

- **ID**: 2054
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-27T15:45:21.053Z
- **Last Updated**: 2025-03-14T01:39:44.55Z

## Description

_No description_

# NewBatch - "Import Manifest from File" - make new page

- **ID**: 2056
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-02-27T16:09:01.187Z
- **Last Updated**: 2024-04-18T15:39:31.317Z

## Description

In "NewBatch" - make "Import Manifest from File" work the same way it does in LIMS 1.0

# NewBatch - "Import Manifest from Metrc" - make it work as it does on LIMS 1.0

- **ID**: 2057
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-02-27T16:13:02.713Z
- **Last Updated**: 2024-04-18T15:38:22.283Z

## Description

_No description_

# NewBatch - Reporting

- **ID**: 2058
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-27T16:14:31.89Z
- **Last Updated**: 2024-10-11T17:00:57.953Z

## Description

_No description_

# NewBatch -"Current Manifests" - make it work as it does on LIMS 1.0

- **ID**: 2060
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-02-28T14:37:30.747Z
- **Last Updated**: 2024-04-18T15:38:13.06Z

## Description

_No description_

# NewBatch - Terpenes - Primary Review - ISReview Tab

- **ID**: 2061
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-02-29T17:08:45.76Z
- **Last Updated**: 2024-09-17T14:31:05.37Z

## Description

Screenshot of tab at the end of the story - scroll down.   Quality Assurance - Terpenes - Internal Standard (Ohio and Michigan)  SOP: Relative Standard Deviation (RSD) of dodecane (internal standard - surrogate analyte) "should be" < 10% for each analytical batch. (See, e.g. Ohio Terpenes SOP-123 section 14.2.4 - same rule applies in Michigan).  User Interface: IS Data Review tab will mimick the structure of the screenshot below. "Sample Name" - this will be LabSampleNr or the quality control identifier (if a QC item). "Sample Type" - this header nomenclature is misleading; it should be changed to "ISTD?" to avoid confusion.  The column is intended to indicate whether the TestItem (test sample or QC) is intended to have internal standard present, so that any TestItem which is not supposed to have internal standard/n-Dodecane present will be excluded from QC analysis. This column should be check boxes, and default to all boxes checked, allowing user to de-select any individual TestItem for which n-Dodecane is not intended to be present. "IS Peak Area n-Dodecane" - obtain this value for every TestItem from the n-Dodecane row of the instrument file, under the column header "Area". "Include in Stats?" - make this a checkbox. If de-selected, exclude the value from all evaluation and summary statistics.  If n-Dodecane Peak Area in the instrument file = 0 then "Exclude from Stats?" is Yes; else, No. When "Exclude from Stats?" = Yes, the value for n-Dodecane Peak Area for that TestItem will be excluded from the Internal Standard control chart at the top of the Internal Standard tab.    Evaluation: Calculate mean IS Peak Area for all TestItems for which "ISTD?" is checked and for which "Include in Stats?" is checked (i.e., both must be true; if either is false, do not include the value).  This is calculated for the batch by taking the sum of all concentrations of n-Dodecane divided by total number of values.  Disregard null values for purposes of calculation. "ISTD?" checked = TestItem was intended to be prepared in a manner that includes the internal standard. "Include in Stats?" = an exclusion option for lab to exclude a known incorrect value (for examle, a TestItem that subsequent investigation determines was contaminated with an accidental introduction of an analyte of interest) from the stats to avoid distorting control limits.  Calculate standard deviation for the population of all included/non-excluded TestItems. Calculate Relative Standard Deviation (RSD) as a percentage. RSD (%) = (100*standard deviation)/average of all included values  For all included/non-excluded TestItems, determine for each whether the TestItem is within acceptable limits, within warning limits (±2 standard deviations of mean/average of all TestItems), within confidence limits (±3 SD), or outside tolerance limits (±4 SD). TestItem is "within acceptable limits" if TestItem value for n-Dodecane Peak Area - average Peak Area is less than or equal to Average Peak Area ± 2*standard deviation of the population. What is Average Peak Area + 2*standard deviation? What is Peak Area for this TestItem? Is Peak Area for this TestItem greater than Average Peak Area + 2 SD or less than Average Peak Area - 2 SD? If both are false, the TestItem is "within acceptable limits". If either is true, evaluation proceeds to determine how far outside of acceptable limits the TestItem is and apply visual indicators based on distance from average Peak Area.   TestItem is "within warning limits" if greater than ±2*SD from the average of the entire population and less than 3*SD of the population (i.e. TestItem Peak Area value - Average Peak Area TestItem is "within control limits" if greater than ±3*SD of the population Average Peak Area and less than ±4*SD of the population Average Peak Area. TestItem is "outside Reporting Limits" if greater than ±4*SD of the population Average Peak Area (i.e., Average Peak Area for all included TestItems ± 4*SD .  If TestItem Peak Area is outside of this range, it is outside of Reporting limits).    Elements: "GC Run ID" = Batch Number. "Review Date" - will be automatically populated with date that the batch is first opened for review; static after that but user permitted to change. Reviewed By - automatically as the user logged in; may be changed until the Reviewer approves the data, at which point "Reviewed By" will be locked.

# Not priority - NewBatch - QC - Terpenes - ISTD chart - Scatterplot - QualityControl

- **ID**: 2062
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-02-29T18:39:35.763Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Create a chart for each Terpenes batch (Ohio and Michigan) for Internal Standard values of all TestItems in the batch.  Chart type is scatterplot.  The x-axis will be the TestItem "name" (LabSampleNr or QC identifier), and the data points will be arranged from earliest acquisition date/time to the latest - the "Analyzed" date/time from the instrument file.  The y-axis will be "Internal Standard Peak Area (counts)" - the unit of "counts" is an arbitrary name for the measure of the response observed in the chromatographic peak in the instrument software.  Y-axis will be formatted with scientific notation.  Threshold lines will be based on the summary statistics and warning/confidence/reporting limits identified in #2061 :  Mean (average) peak area (solid blue) LWL / UWL - lower and upper warning limits = mean ± 2*SD LCL / UCL - lower and upper confidence limits = mean ± 3*SD LRL / URL - lower and upper reporting limits = mean ± 4*SD

# NewBatch - Terpenes - Primary Data Review - SBIS Tab

- **ID**: 2063
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-02-29T19:06:46.197Z
- **Last Updated**: 2024-09-03T16:32:18.25Z

## Description

Solvent Blank with Internal Standard (SBIS)  Terpenes SOP-123 (Ohio; equivalent in Michigan) requires Solvent Blank (with) Internal Standard (SBIS). Every analyte for the assay is measured, but not the internal standard (i.e., internal standard of n-Dodecane is not considered as part of this QC).  QC evaluation:  The measured values of every analyte (including ISTD) must be less than Instrument LLOQ. If Measured Value for analyte  - Instrument LLOQ (in the system) > 0 then FAIL; else, PASS. For any analyte row where Measured Value (Conc.) (μg/mL) - Instrument LLOQ (μg/mL) ≥ 0 then the "failed" analyte row must be highlighted for the user and Overall Status becomes "FAIL" There must be an "Accept SBIS" / "Reject SBIS" function (two buttons), which will "complete" this particular aspect of batch QC, which will be required to complete "overall" QC for the batch. The user must be allowed to "accept" the "failed" QC by entering a reason and confirming that the user is accepting the results despite the fail.    Quality Check: LIMS will check to see that an SBIS was run before the first customer test sample ("opening" SBIS). LIMS will check to see that an SBIS was run after the last customer test sample ("closing" SBIS). Exception Handling: If either opening or closing SBIS is missing (or both), populate the missing SBIS values for the "μg/mL" and "Status" columns with - (and same for Filename(s)). Status will be "MISSING SBIS."       User Interface - see screenshot from Excel (below text): The "Overall Status" will be "PASS" unless any analyte has a result greater than LLOQ, in which case the header "Overal Status" will display as "FAIL". The user interface will display the instrument filename of each SBIS as a header. Leftmost column will have Analyte, and the Analyte rows in the column will be ordered identically to the order of the analytes in the rows in the instrument file. Next column will be Instrument LLOQ (units of μg/mL - if this is already in database as "ppm" no problem but display μg/mL in the user interface, due to the fact that μg/mL and ppm are substantially equivalent). Next will be the results for the beginning (first) SBIS and the results for the "closing" (end-of-run) SBIS. Within each, two columns: the measured concentration for each analyte in μg/mL, and "Status" of PASS/FAIL (fail if greater than zero).

# NewBatch - Terpenes - Primary Data Review - ICV Tab

- **ID**: 2066
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-03-01T16:45:13.05Z
- **Last Updated**: 2024-08-29T18:23:06.54Z

## Description

@Safi Ullah - assigned to you because there are some "Tasks" under this main story assigned to you - see "Related Work"  Independent Calibration Verification (ICV) Terpenes requires "Opening" and "Closing" "indepedent calibration verifications" (ICVs) ("bracketing" the test samples).  This is a quality control that gives some assurance that the instrument began and completed the analytical batch with sufficient capability to accurately quantify analytes of interest.  Neat solution; no sample weight; direct comparison of expected µg/mL value vs. instrument-measured µg/mL value for every analyte measured in the assay.  Evaluation of ICVs Overall Status is evaluated for each ICV: PASS if all ICV concentrations are within the acceptable range as determined by "Tolerance."   Out-of-Specification ("OOS") if any analyte is outside of the Tolerance range.   Missing Data if any analyte does not have a measurement.    User Interface: "ICV Conc. (µg/mL)" - default values from Sudoku table of quality controls (copy attached; for related work item, see #2067) - from the ICV_Nom_Conc column. Default values for nominal concentrations will be editable by the user. Changes must be auditable (when changes are made, must be able to audit to identify user, date, time that the change was made).   "Tolerance" / "Min" "Max" - default values from Sudoku table of quality controls, ICVToleranceLow ("Min") and ICVToleranceHigh ("Max") columns. Default values for min/max tolerance values will be populated from Sudoku table of quality controls; display with units of measure populated from Sudoku table of quality controls "UoM" column (these will be % for terpenes). Tolerance values will be editable by the user. Changes must be auditable (when changes are made, must be able to audit to identify user, date, time that the change was made).    Evaluation - "Status" Pass/Fail Display the measured values from the instrument files for the ICVs. The value in the Conc. column from the instrument file - without any regard to extraction volume/dilution factor/sample weight - is the relevant value.  Simply parse the "Conc." value for each analyte and display in the µg/mL column for each ICV. The center column will populate with the "UoM" value will be hard coded to % and will refer to "percent recovery" - the % of the measured value compared against the "nominal concentration." Integers only; no need for decimal places. Information for user - see "Mean" and "RSD" in headers. "Mean" is the average of the % recovery values for all analytes in the ICV. "RSD" (relative standard deviation) is 100*(Standard Deviation of all values / Mean) (unit of measure is %).   Every analyte is assessed for each ICV. Analyte "Status" set to Pass if: 100*[Concentration (Measured)/Concentration (Nominal)] ≥ ICVToleranceLow and ≤ ICVToleranceHigh.  Analyte "Status" set to Fail if: 100*[Concentration (Measured)/Concentration (Nominal)] < ICVToleranceLow or > ICVToleranceHigh.

# NewBatch - QC - All Assays - Quality Control Management

- **ID**: 2067
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-03-01T17:09:19.19Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

QC for all assays to be driven by data table. See attachments for Excel version of data table. -- Continuing Calibration Verifications - acceptance criteria based on percent recovery, and will vary by assay; these have expiration dates. Continuing Calibration Blanks - acceptance criteria default of "less than instrument LLOQ"; these have expiration dates. Internal Standard - acceptance criteria based on peak area (warning if greater than +/- 3 standard deviations; presumptively reject if +/- 4 standard deviations).        Internal standards have CAS numbers and are "real" chemicals.        For example, Ohio terpenes use n-Nonane (CAS 111-84-2) and n-Dodecane (CAS 112-40-3). Duplicates - sometimes, but not always, have acceptance criteria; when no acceptance criteria, duplicates are generally placed on control charts.  Draft User Interface - edit using attached Excel Macro-Enabled Workbook  (Filename: Mockup - Quality Control Management User Interface.xlsm)

# NewBatch - Receiving - AssayRequest - default multi-replicate assays

- **ID**: 2069
- **State**: New
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-03-06T14:52:04.94Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

_No description_

# NewBatch - Allow User to Change TestCategory at any point

- **ID**: 2070
- **State**: Resolved
- **Assigned To**: Adam Scavone
- **Created**: 2024-03-06T15:01:32.533Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

For Feature branchAllow user to change TestCategory at any point both ins Manifest Editor and Metrc Editor Discover how TestCategory dependency impact the Lims.    e.g. #2075 - sample received as Processor Plant Material, testing/batching begun and completed for Pesticides (but not mycotoxins), then customer requested change to Dispensary Plant Material, which required Mycotoxins in addition to Pesticides.  Developer Notes:  Need to be able to change TestCategory for every assay, regardless of analysis status (Not Batched, Prepped, Analyzed and Marked Complete). User will be prompted to give a reason.   Requires the ability to "Cancel" individual assays after the sample is prepared and/or completely analyzed.  Requires the ability to change "TestCategory" for individual assays that are not subject to cancellation.  Some assays will need to have their TestCategories changed, while other assays will need to be completely removed.  For a sample that has already been analyzed and marked complete - allow cancellation via Manifest Editor user interface (not absolutely required for Metrc Receving, but if keeping Manifest Editor and Metrc Receiving consistent would be helpful in terms of development, not a problem).  For each assay that is cancelled, persist the sample in its Prep Batch and Analysis Batch.  In "Sample Queue" - make sure "cancelled" assays are (a) not shown in the "Tests" field (x'd out in screenshot) and (b) not shown in the "Panel" dropdown (also x'd out, below):    In Sample Results, display the corrected TestCategory (not illustrated).  In Sample Results, suppress from user interface the cancelled assays, for example:    In Batch Results for cancelled assays, if no results are present, make the sample disappear from the user interface entirely.  For samples that are "Prep Complete" but not batched for analysis in cancelled assays, make the sample unavailble for committing to an analysis batch for the assay - omit from the relevant screen.  ConstituentAnalytes - delete or inactivate all rows. ComputedAnalytes - delete or inactivate all rows.

# NewBatch - Cannot display Prep Bench Sheet

- **ID**: 2073
- **State**: Closed
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-03-08T18:29:14.687Z
- **Last Updated**: 2024-04-18T15:38:49.803Z

## Description

_No description_

# NewBatch - Cannot save prep batch twice

- **ID**: 2074
- **State**: Closed
- **Assigned To**: Dudley Chapman
- **Created**: 2024-03-08T19:42:12.877Z
- **Last Updated**: 2024-04-18T15:39:13.68Z

## Description

_No description_

# NewBatch - Terpenes - Primary Review - RawResults Tab

- **ID**: 2076
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-03-14T14:35:51.16Z
- **Last Updated**: 2024-07-15T19:25:02.483Z

## Description

Create the Component that displays RawResults as shown in the RawResults tab of the attached Excel workbook.   However, instead of one column per analyte, there should be two columns per analyte.  One for MeasuredResults and one for Concentration.  The unit strings for each type of column are in the RawResultsVm.  Dev Notes: Use a Telerik Grid Control. For now just put a button somewhere that will display your component with real data.  Generate Test Data Go to the Tests Project NCLims.NewBatchTests Bring up AnalysisTestServiceTests.cs Comment out the last two lines that refer to generating reports and writing files. Run the unit test.  It will run for a minute or so.   Access the Results Go to the unit test for ResultsService.RawResults.  It is in NCLims.NewBatchTests in a ResultsServiceTests.cs.  Note that the one unit test called RawResultsTest() gets the results from sample 120191, which is the one whose data was generated by the AnalysisTestServiceTest.cs mentioned above.  You can borrow those two queries in RawResultsTests() to get the analyticalBatchId for that sample.

# NewBatch - Receiving and Reporting - NeededBy/Rush - assay-based NeededBy dates

- **ID**: 2078
- **State**: Resolved
- **Assigned To**: Neha Verma
- **Created**: 2024-03-15T19:14:39.84Z
- **Last Updated**: 2025-03-14T18:05:08.11Z

## Description

Manifest Editor and Metrc Receiving:       Add a column to the right of "Panels" "Tests" with column header "Test Due" and make the "Test Due" a fillable column that allows user to specify both date and time that the individual assay is due. Remove "Sample Needed By" field.  Keep the "Rush" fire icon, but change the system's behavior when Rush is selected. Rushes will be assay-specific, not sample-specific. Current behavior Change defaults of Rush functionality. Stop current LIMS behavior that sets the due date for Rush equal to the date the sample is received.  We will no longer use this approach. Adam to provide lab-specific tables of Rush turnaround times, Sudoku by ItemCategory/TestCategory and Test (Assay).      Sample Queue:  Allow samples that have tests with unequal due dates/times to be displayed in Sample Queue repeatedly. Example: sample 555999 has Cannabinoids Flower due on 4/15/2024 at Noon and Heavy Metals, Terpenes, Chemical Residue, and Mycotoxins due on 4/16/2024 by 5 p.m. In Sample Queue, row will appear for sample 555999 for "Cannabinoids Flower" (slug CANF) with "Needed By" date/time of 4/15/2024 at Noon. In Sample Queue, another row will appear for sample 555999 for "HM, TERPS, CRA, MYCO" with "Needed By" date/time of 4/16/2024 at 5 p.m.     Within AssayRequest use NeededBy, Rush and ReasonId in ManifiestEditor. The ReasonId is From Manifest. Provide a visual label (<Missing Request>), if the AssayRequest in null (only for current development) Mark all other, Rush and Needed by to [Obsolete, true] all models and Vm so the compiler will prompt where changes are necessary to retrieve from AssayRequest     Dev: Global Finddeclare @DbName varchar(max) = 'NCLimsFeature'declare @ColumnName varchar(max) = '%NeededBy%'SELECT Table_Schema, Table_Name, Column_NameFROM INFORMATION_SCHEMA.COLUMNSWHERE TABLE_CATALOG = @DbNameAND COLUMN_NAME LIKE @ColumnNameORDER BY Table_Schema, TABLE_NAME

# NewBatch - (cosmetic) Manifest Editor/Metrc Receiving - change the word "Panels" to "Assays"

- **ID**: 2079
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-03-15T19:39:51.94Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

Change "Panels" (see screenshot below) to "Assays"

# [Story Incomplete] NewBatch - Post-analysis exclusion of individual analytes

- **ID**: 2083
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-03-21T13:16:46.643Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

After data is in LIMS, users sometimes need to exclude individual analytes (for example, after a failing QC for an individual analyte).  We need to allow user to exclude individual analytes from: Individual samples Individual Prep Batches Individual Analysis Batches   Exclusion of Individual Analytes after Analysis - General Rules User must always supply a reason for the exclusion of the individual analyte(s). Reason for single-analyte exclusion can be entered in Primary Review. Exclusion must be made visible/obvious in Primary/Secondary Review UIs - italics for excluded analytes.

# NewBatch - Terpenes - Primary Data Review - Internal Standard Scatterplot

- **ID**: 2086
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-04-12T14:47:15.777Z
- **Last Updated**: 2024-07-15T19:27:45.087Z

## Description

Scatterplot for Terpenes Internal Standard Internal Standard (n-Dodecane)  X-axis is comprised of all TestItems for the batch, ordered by date and time for "Analyzed" in the Terpenes raw instrument data files:    Y-axis is "Internal Standard Peak Area" in unit "(counts)"    Developer Notes: The Internal Standard Peak Area "count" value is obtained as described in #2011. Scatterplot graph is dependent on values from LIMS, and does not require interaction with user. Scatterplot will be displayed on a tab that is displayed in both Primary Data Review and Secondary Data Review. If possible, let the user see the values by hovering over any line. Boundaries are Upper/Lower Warning Limit (UWL/LWL) + Upper/Lower Control Limit (UCL/LCL) + Upper/Lower Reporting Limit (URL/LRL) - all values defined as explained in #2011.

# REMOVED / SUPERSEDED by #2088 - NewBatch - Terpenes - Primary Data Review - Control Charts

- **ID**: 2087
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-04-12T15:36:31.593Z
- **Last Updated**: 2024-09-03T18:58:21.103Z

## Description

Terpene Control Chart (.xlsm) is attached.

# NewBatch - Terpenes - Primary Data Review - Control Charts - Data and Data Structure - Internal Standard Control Chart

- **ID**: 2088
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-04-12T15:49:41.907Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Data to be captured - see also #2061 Analysis batch number / data source: native to/assigned by LIMS Instrument / data source: parsed from instrument file Analyst / data source: analyst that is entered as the "analyst" when the Analytical Batch is first saved by the system (at whatever point-in-time that is; definitely specified somewhere). ISES Lot / data source: user selects from available lots of Internal Standard Extraction Solution for terpenes in the LabAssets table.  ISWS Lot / data source: same as ISES, but for Internal Standard Working Solution instead of Internal Standard Extraction Solution. ISDS Lot / data source: same as ISES, but for Internal Standard Dilution Solution instead of Internal Standard Extraction Solution. Mean ISTD Peak Area for the analytical batch for both n-Nonane and n-Dodecane, which is derived as explained in #2061  User Interface - Internal Standard Control Chart Data View (table) Table will have the following columns (comma-separated): Batch ID, Analyst, ISWS Lot, Instrument ID, Analysis Date, AllValues, InclValues, Mean, StDev, LWL, UWL, LCL, UCL, LTL, UTL, AllValues, InclValuesRSD, Mean_RSD, StDev_RSD, UWL_RSD, UCL_RSD, UTL_RSD "Rosetta Stone" for these column headers, including explanations of data sources/computations (as applicable), are attached to this story - see file: "Terpenes - ISTD Control Chart - Column Headers.xlsx"     User Interface - Internal Standard Control Chart Scatterplot (chart) Chart type is scatterplot X-axis will be populated with most-recent 25 analytical batches, determined from the date the batches were created as logged by LIMS. Assumes batch creation date/time are logged.  If they are not, begin logging them.  Y-axis is Mean ISTD Peak Area per Batch (count)

# REMOVED - SUPERSEDED - NewBatch - Lab Assets - Chemical Receipt Log - Data and User Interface

- **ID**: 2089
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-04-12T15:55:21.453Z
- **Last Updated**: 2024-09-03T15:44:48.453Z

## Description

SUPERSEDED BY #2155. - AS 9/3/2024  On side navbar, create a navigation button to "Chemical Inventory".  When user clicks, go to this user interface, which will basically be a table with some limited functionality, described here.  Build this organically by reconstructing our receiving tables from existing Chemical Receipt Log.  Use all column headers that are in the attached Excel file.  When displaying the table, make it not editable, but provide the user a way to select individual rows for editing (i.e., checkbox + a button that allows editing of checked boxes, or, allow user to edit single row at a time).  When displaying the table, allow user to click a button to add a new chemical to the Chemical Receipt Log.   LIMS assigns new NCTL Tracking ID, which is formatted as YYYY##### - i.e. 202400001 - year full value followed by five-digit internal tracking, starting each new year with 00001).  User required to enter values for remaining fields.  Here are the remaining fields, comma-separated:  Purchase Order Number, Name of Chemical, Manufacturer, Size/Quantity, Storage Location, Lot Number, SDS Present? (Y/N/NA), Date Received, Received By, Expiration Date, Received on Time? (Y/N), Packing Slip Received? (Y/N), Shipment Correct & Complete? (Y/N), Error Resolution Prompt? (Y/N/NA), Invoicing Correct? (Y/N), Comments  Disposition - "Archive" chemicals Automatically archive any expired chemicals/reagents/preparations as "Expired" on Expiration Date (i.e., the last available date will be the day before expiration).  Give users an "Archive" system comprised of an "Archive" button and a multi-select for all of the rows in the table, so that multiple chemicals may be selected and archived at a single time.   System will require user to choose from "Expired" / "Discarded" / "Depleted" / "Quarantined" to complete the "archive" function; record this as "Disposition".  For purposes of recordkeeping in the table, "In Use" will be the assigned disposition for non-archived chemical items. Give user a way to see the Archive - a button that takes user to a "Chemical Receipt Archive" page/tab.   Archive will include an additional column, "Disposition," which will display the Expired/Discarded/Depleted/Quarantined reason the user gave for "Archiving" the chemical.      For chemicals with expiration dates 30 days or fewer from current date, in the user interface, display with a high degree of visual emphasis (including color, offset, anything else that makes sense). ' Allow users to change expiration dates: If a user changes a previously-saved Expiration Date for any chemical, require user to give a reason. Save the reason in the database. Create records for every expiration date that users attribute to a sample, so that we can deliver an audit trail any time in the future.   Make chemicals available by assay and assay "phase" of the assay (i.e., terpenes prep, terpenes instrumental analysis, potency prep, potency instrumental analysis).  Give users a way to make a chemical available for one or more assays in multiselect table format that has columns for "Prep" and "Instrumental Analysis" for each chemical (i.e., columns will be Chemical / Prep / Instrumental Analysis" and the table will have checkboxes that allow the user to select whether a chemical is available for Prep, Instrumental Analysis, or both for a particular assay.

# NewBatch - front page - drastically improve NavBar load time

- **ID**: 2090
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-04-16T12:45:26.977Z
- **Last Updated**: 2024-10-15T18:28:34.033Z

## Description

Load time for navigation bar on https://lims5000-feature.azurewebsites.net/ is currently ~6 seconds.  Need it under 1 second.

# NewBatch - Terpenes - Primary Data Review - "Overview" Tab

- **ID**: 2092
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-04-16T15:38:17.7Z
- **Last Updated**: 2025-03-14T01:23:42.427Z

## Description

Tuning File and Method File must be Digital Assets (LabAssets) in file storage. Tuning File and Method File in this user interface must give user a means of accessing the relevant file (e.g., download to browser). GC System - dropdown of all available instruments; user required to select (Required Field). "Last GC PM" / "GC PM Due Date" / "Calibration" - we need a user interface for Instrument Management - full story for Instrument Management user interface is here ( #2105 ), and for purposes of this story, relevant data to be gathered via Instrument Management user interface and subsequently displayed in "Overview" tab are as follows (copied from the full story): Names of instruments Last Preventative Maintenance (PM) Next Preventative Maintenance Due Calibrations Tuning Files Method Files Analytical Column Serial Numbers Date of Analytical Column Installation Analytical Column Preventative Maintenance Due Date   Analytical Column Serial Number, Analytical Column Installed, Analytical Column PM Due Date - this should also populate from the data entered via the Instrument Management user interface [From where will this user interface pull this information? A table?]  "Quality Controls & Analysis" Blanks - Display "Pass" if all analytes < iLLOQ, "Fail" if any analyte > iLLOQ. System Suitability Check: Pass if [ ], "Deviation(s)" if any criteria does not Pass. Internal Standard: Pass/Fail Independent Calibration Verification - Pass/Fail Analysis Start: Date/Time Stamp from first TestItem in analytical batch (parsed from instrument file). Analysis End: Date/Time Stamp from last TestItem in analytical batch (parsed from instrument file).   "Discussion" tab - shows the history of comments.  This does not necessarily need to be a tab; this UI could also display "Comments" only, with the history of comments below + paragraph/freeform user input above for additional time-stamped comments.

# NewBatch - Terpenes - Primary Data Review - SSC Tab

- **ID**: 2093
- **State**: Closed
- **Assigned To**: Safi Ullah
- **Created**: 2024-04-16T16:56:23.21Z
- **Last Updated**: 2024-08-29T18:31:58.82Z

## Description

System Suitability Check (SSC) - synonymous with Method Reporting Limit (MRL) check. One per batch. The SSC prepartion is a prepared standard that contains the analytes of interest (terpenes) that were prepared in a manner such that the lab expects to find the SSC nominal Concentration - see "B" on screenshot below, column "SSC Conc. (µg/mL)" when the solution is run through the instrument. This is a "neat" solution - no sample weight - simply a comparison of the µg/mL measured in the SSC (see "A" in screenshot below) vs the expected / nominal concentration (see "B" in the screenshot below).  SSC Results - Concentrations - Data Source Data comes from Concentrations in the filenames containing SSC.  Filename will be one TestItem that contains all analytes, the first TestItem in each analytical run.  (No penalty if not first item; might require explanation.)  Evaluation of SSC results Evaluation based on "Tolerance" of actual recovery from SSC TestItem vs. Nominal Concentration.  This quality control is completed using a "neat" solution of prepared calibration standards (for this assay, the concentration levels of known standard that were prepared for the second set of data points that make the calibration curve - a low, but not exceedingly low, level of concentration).  PASS if the concentration measured for the SSC is within the % tolerance. OUT OF SPECIFICATION ("OOS") if the concentration measured for the SSC is outside +/- the % Tolerance.  Tolerance is uniform for every analyte, and applies at the batch level, not the analyte level.  Please note that the Analysis Workbook displays the tolerance on every row; this is an artifact of Excel; please do not replicate in LIMS.  In the screenshot below, you will note that Tolerance is set to 100%.  This very wide range is indeed correct for this assay, and indicates that, for example, alpha-pinene, with a nominal concentration of 2.5 µg/mL, would result in "PASS" for a recovery anywhere from 0% recovery (i.e., 0 µg/mL) to ≤ 200% recovery of nominal concentration (i.e., ≤ 5.0 µg/mL).  Overall Status "MISSING DATA" if any measurement for any analyte is missing. PASS if all analytes result in "PASS" OOS if any analyte is Out of Specification.  Misc. Display for the user the Mean % Recovery as calculated based on all analytes in the SSC and the RSD (%) as calculated based on all analytes in the SSC (see column F rows 10 and 11).

# NewBatch - Terpenes - Primary Data Review - "PrepData" Tab eg PR92971 and PR92972 (AN92973)

- **ID**: 2096
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-04-18T15:14:46.58Z
- **Last Updated**: 2024-09-03T16:50:37.897Z

## Description

  ----     Load the BenchSheet for the the Prep Batch  (1) Move "Status" indicator to the ROW for "Status" for every sample/test item. (2) Delete the columns that are marked in red (status columns and the headers that are empty above them). (3) Align the mg/g results under their corresponding columns - columns should be continuous/stacked, with headers and information above and analyte-level results on the table below - see blue lines/arrows in screenshot. (4) "Batch Comments" - this field needs to allow user to enter comments. (5) Delete "Prep Batch ID" / "Analytical Batch Status" row - see second screenshot below. (6) Merge cells for first two "columns" - these have two columns below, but the headers are not related to the columns below and should be only a single column - see third screenshot below - consolidate the two columns and fill them with same color instead of the two different gray tones.

# NewBatch - Directly Parse Heavy Metals Instrument FIles

- **ID**: 2102
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-05-15T13:52:52.04Z
- **Last Updated**: 2024-10-28T14:57:06.35Z

## Description

Parse incoming Agilent files:    Parse incoming Shimadzu files:

# NewBatch - LabAssets - UI - Instrument Management

- **ID**: 2105
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-05-31T14:55:52.193Z
- **Last Updated**: 2025-02-05T16:29:29.03Z

## Description

The goal of this story is to create a UI for managing Instruments, InstrumentPeripherals, InstrumentTypeLabDocuments (and versions), and InstrumentLabDocuments (and versions).    A previous story established the schema for InstrumentTypeLabDocuments (2258).   And a previous story established the schema for InstrumentPeripherals (2255).  See the Related Work section for their links.  The UI should provide for: Listing InstrumentTypes. Attaching LabDocuments  to InstrumenTypes. Adding Instruments to InstrumentTypes Attaching LabDocuments to Instruments. Editing the date of the last preventive maintenance for an Instrument. Editing the date of the next preventive maintenance for an Instrument Taking an Instrument out of service. Adding an InstrumentPeripheral to an Instrument. Requires a new Add/Edit InstrumentPeripheral dialog.  Editing InstrumentPeripherals on an Instrument. Requires a new Add/Edit InstrumentPeripheral dialog.   New properties should be added to the Instrument model:LastPM : DateTime?  - Date of last preventive maintenance. NextPm: DateTime? - Date of next preventive maintenance. OutOfService: Bool - True if instrument has been taken out of service (defaults to false).  A crude mockup of the Instrument Management UIThe UI is a three level grid hierarchy of InstrumentType, Instrument, and InstrumentPeripherals.  The new Add/Edit Instrument Peripheral Dialog should be very similar to the LabAsssets dialogs.  It should show the two level hierarchy of LabAssetType and LabAssets for DurableLabAssets with the filter box at the top for Category.  The user should select the LabAsset for the InstrumentPeripheral.The dialog should solicit or allow editing of the PeripheralType, which is a dropdown of the available DBEnums rows for NBInstrumentPeripheralTypeSlug enum.    See Wiki article https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/139/Instruments-Documents-and-Peripherals-(Proposed)    Back End work.I recommend adding the methods to produce view models to LabAssetService along with an Upsert method that takes in the modified view models.

# REMOVED - Duplicative of 2144 and 2155 - NewBatch - CRUD - Chemical Receipt Log

- **ID**: 2106
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-05-31T17:55:55.19Z
- **Last Updated**: 2024-09-03T18:22:12.62Z

## Description

Keep it simple.  CRUD UI displays existing items that have been received via Chemical Receipt Log and allows user to [+Add] / [Save] new items to Chemical Receipt Log, making them available as LabAssets for their respective analytical use(s).  Navigation Bar > Chemical Receiving Lands on "Chemical Receipt Log" page that displays all existing Chemical Receiving inventory. The page must include "Add Item" button > triggers the "Receive Chemical" / add new item form (see below for details). The page must include "Dispose of Item" button > removes an item from available inventory, so that the item's details will remain archived but the item will not be availble in forms/dropdowns for use in analysis (see below for details).  "Dispose Of Item(s)" Button  For every item selected, give user a row with the item and "Disposition" values of: Available Depleted Expired Mfctr. Recall Other  "Save" button - causes update to disposal status in table.   Add new item to Chemical Receipt Log Allow user to add new item via form.   Make a nice button with a +Add. Default "Disposal" value, to be automatically generated in the table but not displayed during Chemical Receiving, will be "Available". Button will give the user a form to complete, soliciting all of the required information for Chemical Receipt. Use multiselect checkboxes to assign items to particular assays and their corresponding instruments (not included in screenshot below).

# REMOVED - NewBatch - Duplicative

- **ID**: 2107
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-06-03T14:50:26.47Z
- **Last Updated**: 2024-09-03T19:02:33.78Z

## Description

# [REMOVED - DUPLICATIVE] - NewBatch - CRUD - Standards Preparation Log

- **ID**: 2108
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-06-03T14:50:34.27Z
- **Last Updated**: 2024-09-03T14:52:44.877Z

## Description

_No description_

# NewBatch - Primary Review - Data Validation - Identical "Injection Volume" for all samples in an analytical batch

- **ID**: 2110
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-06-05T16:20:16.11Z
- **Last Updated**: 2024-10-15T18:37:22.603Z

## Description

Assays with Injection Volume - data validation / QC / User Warning - generally speaking, all "Injection Volume" values in instrument files for an analytical batch should be identical.  On rare occasions, they may differ.  Any sample(s) with an "Injection Volume" that differs from the very first "Injection Volume" for an item in the batch should be flagged; user can "Accept" to resolve the error only after entering a brief reason for accepting the Injection Volume despite the discrepancy.  Developer Notes: Data Acquisition for LIMS - Parse the "Injection Volume" from Instrument File for every TestItem coming into the system. Data Validation in LIMS - For an analysis batch, compare the "Injection Volume" value for every subsequent TestItem in the batch against the "Injection Volume" from the first TestItem.

# NewBatch - Sample Weight & Extraction Volume - STOP PARSING from Instrument Files

- **ID**: 2112
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-06-18T13:56:34.357Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Eliminate parsing of Sample Weight and Extraction Volume from the Instrument Files.  Instead, use Sample Weight, Extraction Volume, and Dilution Factor (as applicable) from the Bench Sheet that the user completed in the system.

# [Review Tasks] NewBatch - Lab Assets - Global - User Interface

- **ID**: 2114
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-03T10:52:13.44Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

  Navigation Structure:  Main Navigation: AdminAsset TypesPurchased Reagent Prepared Reagent Durable Asset Digital Asset - "Lab Documents"      UI Design: Left Panel: See #2151 organizational structure.   Right Panel: Upon clicking an asset type from the left panel, the right panel should display detailed fields relevant to the selected asset type. Provide input fields for entering and editing details specific to the selected asset type.   Bottom Section: A grid displaying all lab assets, allowing for inline editing. The grid should support CRUD operations (Create, Read, Update, Delete) for the assets.    Fields Specific to Asset Types: Durable Asset: OutOfService: Boolean field indicating if the asset is out of service.   Prepared Reagent: Consumed: Boolean field indicating if the reagent is consumed. ExpiresOn: Date field indicating the expiration date of the reagent.

# NewBatch - Terpenes - Primary Review - ISReview/ISPlot - Combine ISReview and ISPlot to a single Tab

- **ID**: 2115
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-08T14:38:06.253Z
- **Last Updated**: 2024-09-03T15:24:01.61Z

## Description

For user efficiency, combine the IS Review and ISPlot into a single tab name Internal Standards.   Create a new component container that combine the two already developed components  Change the Include in Stats? to Included in Stats?  Add a Checkbox to the above column.   Note: There is no need to persist the data to the database; QCReview always includes all samples.   Stack current ISPlot component and then IS Review component Please move"Summary" box from right side to front-and-center, below the data plot and above the data table.  IS Review component Make sample list scrollable. Make legends fixed in place.  IS Plot component Update the graph as checkbox in the IS Review component changes

# NewBatch - Terpenes - Primary Review - Changes to Analytical Batch Selector

- **ID**: 2120
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-12T16:00:37.33Z
- **Last Updated**: 2024-09-03T15:28:18.737Z

## Description

Changes to this selector: Put a label before the selector.   Label will be, in bold, "Analysis Batch:"  Shorten the width of the selector.  Width should be reasonably proportional to the batch name of the Analytical Batch. Format is not absolutely determined yet, but the text will be something like 20240712TERPS-1234 (and may be slightly longer or slightly shorter).  Remove the black rectangle around the selector. Use a combination of color contrast + the universal "dropdown icon" (downward arrow) to draw the user's attention to the dropdown.   Put the selector on the same row as "Analysis Batch" and add a colon after Analysis Batch to read "Analysis Batch:"

# NewBatch - Global - Top-Level Page Headers - Include assay name in page headers

- **ID**: 2121
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-12T17:39:41.557Z
- **Last Updated**: 2024-11-14T16:04:21.28Z

## Description

CONSOLIDATED INTO #2190 - ignore the red box with "Terpenes" in the screenshot below, agreed instead/alternatively to go with breadcrumb trail in the top stripe as the functional equivalent. For all screens in Primary Review, please add the assay name after "Primary Review."    Formatting: insert a dash, followed by a whitespace, followed by assay name:

# NewBatch - Primary Review - Data table - add Sequence column to data to allow arrangement of tabs in Primary Review user interface

- **ID**: 2127
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-07-15T17:45:34.64Z
- **Last Updated**: 2024-10-15T18:36:30.87Z

## Description

For data table that drives the Primary Review tabs, add a "Sequence" column that will allow data-driven ordering of tabs that appear at top of "Primary Review" screens.  General order of tabs (generally, across all chemistry assays): Raw Data Blanks of all kinds Internal Standards System Suitability Checks ICV Prep Batches

# NewBatch - Terpenes - Primary Data Review - Delete "SSCData" tab

- **ID**: 2133
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-16T15:25:29.913Z
- **Last Updated**: 2024-08-29T18:04:36.387Z

## Description

_No description_

# DEPRECATED/REMOVED as duplicative - See Feature - Lab Assets - NewBatch - Lab Assets - Global - Data

- **ID**: 2134
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-07-16T15:51:30.553Z
- **Last Updated**: 2024-09-03T18:16:32.143Z

## Description

 Navigation Structure:  Main Navigation: AdminAsset TypesPurchased Reagent Prepared Reagent Durable Asset Digital Asset - "Lab Documents"      UI Design: Left Panel: See #2151 organizational structure.   Right Panel: Upon clicking an asset type from the left panel, the right panel should display detailed fields relevant to the selected asset type. Provide input fields for entering and editing details specific to the selected asset type.   Bottom Section: A grid displaying all lab assets, allowing for inline editing. The grid should support CRUD operations (Create, Read, Update, Delete) for the assets.    Fields Specific to Asset Types: Durable Asset: OutOfService: Boolean field indicating if the asset is out of service.   Prepared Reagent: Consumed: Boolean field indicating if the reagent is consumed. ExpiresOn: Date field indicating the expiration date of the reagent.

# NewBatch - Terpenes - Primary Data Review - Rename "GC" tab to "Overview"

- **ID**: 2135
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-16T18:05:34.593Z
- **Last Updated**: 2024-08-29T18:04:52.403Z

## Description

Rename GC to Overview Remove SSC Data tab

# NewBatch - Defining Unique Lab Users in Database

- **ID**: 2140
- **State**: New
- **Assigned To**: Gary Mandela
- **Created**: 2024-07-25T13:59:04.987Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Reconcile all duplicate full names as duplicate users. Must consider a user may be associated to multiple labs. Create db constraint for uniqueness upon up-sert of the data.  Also correct issues with Metrc Ids as it relates to user.  Multi-lab users will need separate Metrc API keys for Michigan and Ohio.  @Gary.Mandela - check to see if this was done (note added 2/5/2025)

# NewBatch - Heavy Metals - Instrument File Parsing

- **ID**: 2142
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-07-26T18:22:40.34Z
- **Last Updated**: 2024-10-17T13:37:56.633Z

## Description

Parse heavy metals instrument files in two new formats: Shimadzu Agilent  Requires ShimICPMS and AgilentICPMS folders for sweeper?  See attachments for example raw instrument files.    Parsing Agilent Files - CSVs  A - Acquisition Date/Time B - TestItem (including sample numbers and quality controls, e.g. standard, ICV, BLANK RINSE, bracketing CCVs/CCBs) C - Analyte names are in the top row and are their respective periodic table names (i.e., As - arsenic Cd - cadmium Hg - mercury Pb - lead).  There are numbers before the chemical compound periodic table abbreviations, and "[ Helium ]" after; we do not need to parse the numbers in front or the "[ Helium ]" at the end. D - Conc. [ ppb ] - Concentration, as measured on the instrument, in parts per billion, in the same column as the Analyte name in the first header row.  This value is the mean of 3 injections. E - Conc. [ RSD ] - Relative Standard Deviation, in %, of the three measurements/injections for the analyte for the sample (used for quality control purposes).  This is the column immediately to the right of the "Conc. [ ppb ]" column for each analyte.     Parsing Shimadzu Heavy Metals (ICPMS) Instrument Files - TXT  ​A - ​TestItem (test sample, quality control, etc.) B - Analyte (As - arsenic, Cd - cadmium, Hg - mercury, Pb - lead; Michigan includes Ni - nickel, Cu - copper, Cr - chromium). C - Concentration - Column AF - header is "Conc.[Ave.]" - this is the mean of the three injections measured in Columns L, M, and N (column headers "Conc.[1]", "Conc.[2]", "Conc.[3]"). D - RSD (%) for the three injections of the sample - Column AH (34th position in the .txt tab-delimited instrument file)

# NewBatch - Lab Assets - Durable Lab Assets - Data

- **ID**: 2143
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-31T14:01:01.01Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Update - September 18 2024 - updated Durable Lab Assets spreadsheet attached to this story - see screenshot below for correct attachment.    Original Story: Create schema for Durable Lab Assets and import data from the lab's spreadsheet data.

# NewBatch - Lab Assets - Purchased Reagents - Data

- **ID**: 2144
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-07-31T15:14:28.35Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Updated 9/18/2024 - data cleanup only / no changes to data structure  -- Create schema and import purchased reagent lab assets.  Format as a table - exactly like Durable Assets - include "+ Add Purchased Reagent" and show "Purchased Reagents" label at the top of the screen. Organize by Category etc. - same as Durable Assets.  The fields will be different.    Columns for "+ Add Purchased Reagent" Item Name > LabAssetName Systematically Assign NCTL ID - format YYYYXXXXX with YYYY four digit year and XXXXX numerical value starting at 00001 resetting every new year on January 1. This field will not be editable.  Item Category > PRCategory See related #2155 If "Standard" is selected, solicit Nominal Concentration + Corrected Purity.  Item Subcategory > PRSubcategory Manufacturer Manufacturer's Lot # > change "LotNumber" to "MfctrLotNr" Manufacturer's Part Number > change "PartNumberNr" to "MfctrPartNr" > see Excel spreadsheet column F Assay(s) > allow user to select assay(s) for which the item will be available for use. "All" will be an available option.  Items per Case > ItemsPerCase Integer field Number of Cases > NumberOfCases Integer field Storage Location > we will need to be able to create Storage Locations and StorageLocations should be a data table Storage Condition > StorageCondition > we will need to be able to create Storage Conditions and StorageConditions should be a data table

# NewBatch - Lab Assets - Lab Documents - Data

- **ID**: 2147
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-08-14T13:32:05.97Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

_No description_

# NewBatch - Lab Assets - UI - Account for Schema Change

- **ID**: 2151
- **State**: Closed
- **Assigned To**: Unassigned
- **Created**: 2024-08-19T14:44:58.713Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

The schema of LabAssetTypes has been changed.  There is no longer a Name column.  A LabAssetType is uniquely defined by the contents of the columns Category, SubCategory, SubSubCategory.   There not a hierarchy.    The Category column will always have content, but the other two columns are nullable in the DB.  Any unique combination of those three fields represents a single lab asset type.   Like before, a lab asset type has children in the Lab Asset table.   The UI for Durable Assets, Purchased Assets, and Prepared Assets should be change to show a single table with the three columns of Category, SubCategory, and SubSubCategory.   A row in that table should be expandable to show the Lab Assets that belong to that Lab Asset Type.One filter text box should be available to filter on the Category field.  --   Can we add new Lab Asset Types via a UI?

# NewBatch - Admin > Users - fix various UI issues

- **ID**: 2153
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-08-19T17:09:53.837Z
- **Last Updated**: 2024-09-30T14:14:04.313Z

## Description

To see current version functionality, log into Staging > Admin > Users and click the various buttons below.  LIMStaging ---   The buttons that are not displaying on the far right side are:  "Edit" (pencil) + "Change Username" (wrench) + "Reset Password" (dots).    Please eliminate "Change Username" in the new UI - only two buttons - "Edit" and "Reset Password."    User should see "Edit" and "Reset Password" when hovering cursor over the button.

# NewBatch - LabAssets - Purchased Reagents - UI - Standards - Allow user to enter Nominal Concentration and Corrected Purity

- **ID**: 2155
- **State**: New
- **Assigned To**: Dudley Chapman
- **Created**: 2024-08-20T18:55:36.157Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Among the PurchasedReagent Lab Assets are Reference Standards that contain a mixture of compounds whose concentrations are known and certified by the vendor.   These standards are run along with the client's samples for quality control purposes.   Each lot of the Standard is accompanied by a Certificate of Analysis from the vendor that shows the results of their quality control analysis of the standard.  The CoA lists the Nominal Concentration and the Corrected Purity. The UI for PurchasedReagents should allow for adding a list of compounds and their expected concentrations to a LabAssetType.   This list should act as a template for each PurchasedReagentLabAsset of that type to solicit Nominal Concentrations and Corrected Purity.  Add two properties to the LabAssetType model.ReferenceStandard : bool with default to false. ConcentrationUoM : String? with max length 250  Modify the Purchased Reagent UI to add the features highlighted in yellow ( see below) .  The Show Only Reference Standard should filter the LabAssetTypes to show only those whose ReferenceStandard is true.   The Add Reference Column in the table should provide an Add icon for only those whose ReferenceStandard is true.   Add a new Entity Models to the schema as follows:class ReferenceStandardCompound : BaseModel {     public int LabAssetTypeId { get; set; }     public LabAssetType LabAssetType { get; set; }     public int AnalyteId {get; set;}     public Analyte Analyte {get; set;}      public double NominalConcentration {get; set;}     public ICollection<ReferenceStandardConcentration> ReferenceStandardConcentrations { get; set; } } The entity should have a unique index over LabAssetTypeId and AnalyteId. Add the navigation to the collection to the LabAssetType.  class ReferenceStandardConcentration : BaseModel {    public int PurchasedReagentLabAssetId { get; set; }    public PurchasedReagentLabAsset { get; set; }     public int AnalyteId {get; set;}    public Analyte Analyte {get; set;}     public double ChromatographicPurity { get; set; }    public double MeasuredConcentration { get; set; } } The entity should have a unique index over PurchasedReagentLabAssetId and AnalyteId. Add navigation for the new collection to PurchasedReagentLabAsset.  Before starting on the UI, I recommend adding the two new columns to the xImport.PurchaseReagents2 table and solicit from Adam which of those reagents are Reference Standards and what are their units of measure.Modifify the big two sql scripts for deleting NewBatch data and Importing it from xImport.   - I will do this for Terpenes DMC     The Add Reference Compounds icon should bring up a dialog that allows the user to build a compound list for that LabAsset (a list of ReferenceStandardCompounds).   As shown below, the list on the left should show all the the names and CAS numbers of the analytes in the Analyte table.   The Name is first with the CAS number in parentheses following the Name.  The list should be filterable and sortable.   (There are only a few hundred analytes, so bring them all into a view model list.)The Add --> button should move an item over to the list on the right and remove it from the list on the left.   And the Remove button should do the opposite.  (Note: removing from the list on the left does happens only to prevent a duplicate item added to the list on the right.  It does not imply that the compound should be removed from the Analyte table on Submit.)      In other words, the only thing that is being edited is the list on the right that ends up being persisted in the ReferenceStandardCompound table.  The Nominal Concentration is a required field.   The table header units (e.g. mg/mL) comes from the LabAssetType.ConcentrationUoM property.    Their should be a save button that does an Upsert where new rows (by analyteId) are inserted, existing rows are updated, and missing rows cause a hard delete for that row in the table.  The third level on the Purchased Assets grid represent rows in the ReferenceStandardConcentration table are attached to a particular PurchasedReagentLabAsset.   They are generated off of the ReferencStandardCompound rows associated with the corresponding LabAssetType.   The display lists the Compounds (read only), and solicits the ChromatographicPurity and NominalConcentrations.    The units displayed in the Nominal Conc header come from the LabAssetType.ConcentrationUoM property.

# NewBatch - Global - Data Tables - UIs - Freeze rows up top, allow scroll below - sticky headers

- **ID**: 2156
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-08-22T13:40:29.87Z
- **Last Updated**: 2024-11-21T16:08:47.31Z

## Description

For data tables, freeze rows up top and allow vertical scroll within the data rows.  Use sticky headers.  Raw Data tab - freeze top row of data table: DONE/GOOD   Internal Standards tab - freeze top row of data table:  DONE/GOOD   SBIS tab - freeze top rows of data table, including headers:    ICV tab - freeze top rows as follows:    SSC tab - freeze top rows as follows:     Prep Batch tabs - freeze rows as follows:

# NewBatch - Lab Assets - Lab Documents - UI

- **ID**: 2158
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-08-26T17:59:47.313Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

LabDocuments are a way of attaching documents to the following objects in the system: LabAssetType LabAsset Instrument Sop  And Misc where the document is not attached to anything.LabDocument class attaches to the object to supply a document name.  Each LabDocument has zero or more LabDocumentVersions.   A LabDocumentVersion has an Effective Date.  The actual document itself is stored and retrieved through a FileStorage that has a foreign key to LabDocumentVersion.At the moment we have no UI for Instruments or  [Editor's Note - see below for link to Story with specifications for Instrument Management User Interface] SOPs, so for the first pass, add an Attachments button to rows in the screens that have LabAssetTypes and LabAssets,   The button should bring up a dialog that lists the LabsDocuments for that object on the left and its document versions on the right.   The document versions should have an upload and download button to handle the actual document.  Story - User Interface - Instrument Management #2105 https://dev.azure.com/LIMS5000ORG/LIMS5000/_workitems/edit/2105

# NewBatch - Terpenes - Primary Review - "SSC" tab - change order of rows - Analyte / Mean+RSD

- **ID**: 2162
- **State**: New
- **Assigned To**: Gary Mandela
- **Created**: 2024-08-29T18:33:03.213Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Change order of rows so that "Analyte" row is below the "RSD" row.  "Mean" row will remain immediately above "RSD" row.  Order from top-to-bottom will be Mean, RSD, Analyte.

# NewBatch - Global - Data Tables - UIs - Highlight "Fail" values in all tables

- **ID**: 2163
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-08-29T18:36:24.487Z
- **Last Updated**: 2024-09-23T17:04:54.857Z

## Description

Make styling visually identify "Fail" values in all tables so that they stand out for the user/draw the user's eye.

# NewBatch - Metrc Receiving - Check for Repro - Manifests pre-selected for "Rush All"

- **ID**: 2164
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-04T13:30:26.423Z
- **Last Updated**: 2024-09-17T15:25:15.66Z

## Description

Copied from Repro Steps when changed from Bug to TaskCheck Receiving > Metrc > [individual manifests] for spontaneous* systematic selection of "Rush All" icon based on no triggers; related issue is that, although "Rush All" is selected, none of the tests below are selected.  * "Spontaneous" because there exists no systematic logic in Metrc Receiving whatsoever that triggers LIMS to apply Rush selection to any samples.

# NewBatch - Metrc Receiving - Not Working - Error Message

- **ID**: 2165
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-04T13:34:03.017Z
- **Last Updated**: 2024-09-18T18:40:36.92Z

## Description

_No description_

# NewBatch - Prep Batches - "Save" Prep Batch > Crash/Reload

- **ID**: 2166
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-04T13:58:24.093Z
- **Last Updated**: 2024-09-05T12:50:49.71Z

## Description

_No description_

# NewBatch - Analysis Pending - Upload Instrument Files Button

- **ID**: 2167
- **State**: New
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-09-04T14:02:32.957Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Allow user to upload instrument files directly via an Upload Instrument Files button. Put the button in the Analysis Pending user interface in the vicinity of / on the same row as the analytical batch for which files are to be uploaded.

# NewBatch - Prep Batch - Fix Code Regression

- **ID**: 2171
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-09-05T14:16:51.6Z
- **Last Updated**: 2024-10-17T13:20:36.15Z

## Description

Correct Pending Changes behavior for Ready for Analysis Switch  When adding a new batch, make ready for dropping samples  Change Disabling queues for Save, Cancel and Prep Benchsheet buttons  Sample Panel Display Align Heading and Data Center Drag/Drop control Prep Batch Panel Display Center Drag/Drop control Batch # heading should not wrap to new line Add scrolling to Sample List within a Prep Batch Change Ready For Analytical to Ready for Analysis-Pending PrepBatchAssignSamples.razor PrepBatchBenchSheetCopy.razor  Remove expansion column padding from Sample List Add Weight Details corresponding with its Heading Better sizing of column within grid Size Prep Batch Add button (+) to same height as adjacent Save Cancel buttons    Completed the above.

# NewBatch - Primary Review - "Upload Files" button - move to row for Analytical Batch

- **ID**: 2172
- **State**: Removed
- **Assigned To**: Unassigned
- **Created**: 2024-09-06T18:17:30.63Z
- **Last Updated**: 2025-02-05T17:13:01.1Z

## Description

Use "Upload" or an upload icon in the Primary Review > Raw Data tab

# NewBatch - Analytical Batch - Fix Code Regression

- **ID**: 2173
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-09-09T14:02:13.467Z
- **Last Updated**: 2024-10-17T13:20:25.377Z

## Description

Add scrolling to Samples assigned to Analytical Batch

# NewBatch - Update Filer for NewBatch

- **ID**: 2174
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-09-09T14:05:56.733Z
- **Last Updated**: 2024-10-15T18:26:05.323Z

## Description

Lims 2.0 already accepts one of more instrument files for uploading via the UI.  The controller that receives the files is already in place.  Files are accepted and the full analysis is run on the data.   In the new scheme the data file contains the instrument name, so there is no need for separate Filer folders for instrument files.   A new version of filer adapted from the existing legacy filer with the following featuresFiler will no longer poll for files in the instrument folder.  Instead a "watch" will be placed on the folder so filer can respond the moment a file appears in the folder.  Filer will upload each file in the folder and delete them on each successful upload. Any files that incur errors for any reason will be moved to the Problem Files folder along with a file listing the problem or problems.

# NewBatch - Prep Batch - Replicate Letter Designation

- **ID**: 2175
- **State**: New
- **Assigned To**: Dudley Chapman
- **Created**: 2024-09-09T16:38:36.7Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

_No description_

# NewBatch - Primary Review - Fix Additional Columns for Horizontal Scroll

- **ID**: 2176
- **State**: Closed
- **Assigned To**: Safi Ullah
- **Created**: 2024-09-09T16:55:32.033Z
- **Last Updated**: 2024-10-03T18:29:55.443Z

## Description

Primary Review > Raw Data tab  Currently, the first two columns ("Data File Name" and "Sample Name") are "fixed" and do not scroll out of the screen during horizontal scroll. Please change this so that all of the columns in the following screenshot are "fixed" / do not scroll during horizontal scroll:

# NewBatch - Primary Review - "QC Review" Tab

- **ID**: 2177
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-09-09T17:21:52.503Z
- **Last Updated**: 2024-10-15T18:27:34.257Z

## Description

“Warnings,
Exceptions, and Deviations:” – new row for every deviation, including LCB deviations
by analyte. User must review and accept each analyte
subject to a “warning.” Warning – high-contrast
background/text e.g. red background/white text. One row for every analyte that
fails a QC Acceptance Criteria.   Example:

# NewBatch - Miscellaneous

- **ID**: 2185
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-09-16T15:16:33.91Z
- **Last Updated**: 2024-09-16T15:16:34.727Z

## Description

_No description_

# NewBatch - Analysis Pending - allow user to see contents of included Prep Batches

- **ID**: 2187
- **State**: Active
- **Assigned To**: Gary Mandela
- **Created**: 2024-09-16T16:29:36.413Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Columns to include, in order: Rush Indicator Sample ID Client Name Metrc (last 4 digits) or NA if not applicable Test Item Type Weight (g) EV (mL) [Extraction Volume] DF [Dilution Factor] Ext Sol'n [Extraction Solution]

# NewBatch - apply Story 2121 (Page Headers) across all assays

- **ID**: 2190
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-17T14:54:29.287Z
- **Last Updated**: 2024-12-09T16:55:05.863Z

## Description

AppBar contains the PageBreadCrumb that is consistent within all pages. This will reflect the Menu Hierarchy (i.e. Primary Review Pending => Microbials => Total Yeast and Mold.  For all pages used with the app, remove any heading description describing the page.  If the description section of the page contains buttons or links, implement them at a bar across the first html element on the page. (i.e. Plus Icon button, action buttons, etc.) The example is in the Asset Types => Durable Asset.

# NewBatch - Data Mapping - Assign Sop Fields to LabAssets

- **ID**: 2191
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-17T15:01:44.267Z
- **Last Updated**: 2024-11-08T15:17:33.987Z

## Description

Referring to the asset spreedsheet exports, assign the BatchSopFields to their proper lab assets.   This is done by filling in the Category, SubCategory, and SubSubCategory fields in the attached spreadsheet.

# NewBatch - LabAssets - Standards Prep Log -Data

- **ID**: 2192
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-09-18T13:46:41.067Z
- **Last Updated**: 2025-02-05T18:32:30.217Z

## Description

The reagents that go into Prepared Reagent Lab Assets are Purchased Reagent Lab Assets.   Many of the Prepared Reagent Lab Assets are Reference Standards.  Aliquots from the reference standards end up being inserted into batches to be measured and analyzed along with the customer's samples.     The purpose of the reference standards is to introduce Control samples that have accurately known concentrations of the same compounds that will be measured in the customer's samples.  That allows the QC analysis of each batch to be validated or rejected based on the Control sample results.The preparation process for these Prepared Reagents involve using Durable Assets that can affect the accuracy of the compound concentrations.  So they need to be tracked in the same way that Lab Assets are tracked in Preparation Batches and Analytical Batches. A third type of BatchSop and Batch have been added to the schema.   They are ReagentPrepLogBatchSop and ReagentPrepLogBatch.   Like all BatchSops, ReagentPrepLogBatchSop has a list of SopFields.  They will specify which Purchased Reagents and Durable Assets will be solicited during the preparation of a particular PreparedReagent. A ReagentPrepLogBatchSop can be assigned to a LabAssetType for a PreparedReagentLabAsset.   When an admin adds a new lot of PreparedReagentLabAsset to a LabAssetType, he will be required to fill out a form that solicits the PurchasedReagents and Durable Lab Asset that were involved in the preparation.That UI will be driven by the SopFields in the assigned Sop.    The purpose of this story is to analyze the Sop document attached to this story to determine which SopFields should be associated with the ReagentPropLogBatchSop for the prepared reagents used in Terpenes.   The result should be two new xImport tables with one for ReagentPrepBatchSop and the other for the associated SopFields.   Start with an Excel workbook that has a tab for each of those tables.    The SopField tab should have the same columns as found in xImport.xPrepSopField.Then populate the excel tabs with data that comes from analyzing the attached Sop document.Create two new xImport tables to contain the data in the spreadsheets, and import the data.   Then modify the big "Delete" script and the bit "Import" script to delete or import the xImport data into the Lims tables.  Consult the Wiki page on BatchSop and BatchObjects, and the subpages associated with that page.

# NewBatch - Reporting - NavBar "Due Today" / "Due Tomorrow" tabs to operate as filters

- **ID**: 2203
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-11T17:11:57.88Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

"Samples Due Today" and "Samples Due Tomorrow" will simply operate as filters that only process and display samples with assays having NeededBy dates that are as indicated.  The deletion of "Samples" from these titles aligns with the fact that Assays have "NeededBy" dates, whereas "samples" do not.    "Turnaround Time Tracker" > RENAME > "All Current Samples" - Make this tab operate as a filter that displays all samples received within the last 30 days, whether reported or not.  Product Manager Notes We need to define how we will handle samples with multiple "needed by" dates, e.g. "Rush" for cannabinoids + everything else on a non-rush. The "rush" assays must be displayed on the date on which they are due. After those Needed By dates have passed, the Rush date will be disregarded and the latest date for any remaining assay(s) is the "Due Today" date. Example: a Dispensary Plant Material sample has a "rush" on Cannabinoids that makes Cannabinoids due on January 4th by 7 p.m., and all other test results are due on January 5th by 7 p.m. On January 4th, the "Due Today" tab will show the sample ID + the only test (cannabinoids) due on the date the assay is due. On January 5th, the "Due Today" tab will show the sample + all tests due to be reported for the sample and all tests/assays whose "rush" due dates have passed, i.e., with the already-reported Cannabinoids test greyed out if it was reported by the system or displayed as unreported if the test was not reported by the system (often, the system won't know a result on a Rush was reported because it will be verbal - reporting team checks the numbers, calls client, discusses over phone, reports the CoA at the time all remaining information is due).

# NewBatch - Reporting - Simplify Navigation / Remove Tab for "Pre-Reporting Review Queue"

- **ID**: 2204
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T14:23:31.81Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

Remove Tabs for "Pre-Reporting Review Queue"

# NewBatch - Generate Reports / Send to CC / Metrc - Adapt to NewBatch Schema, tables, representation

- **ID**: 2205
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T14:47:27.16Z
- **Last Updated**: 2025-03-14T01:10:20.057Z

## Description

Clone code from existing and adapt to NewBatch schema. CoA, Send to CC, Send to Metrc, Metrc CSV  (Data is in different tables for NewBatch.) (Flags slightly different.)

# NewBatch - Sample Results - "Analysis Batch" information must move to AssayRequest level / remove from "Sample" level

- **ID**: 2206
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T14:58:14.87Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

Developer Notes: Remove "Analysis Batch" column at the sample level. Add "Analysis Batch" column at the Replicate/Aliquot level. Show excluded Replicates but display grayed out.   Hierarchy:  Sample > Analyte (rollup of all replicates) > AssayRequest > Replicate(s)

# NewBatch - Sample Results - create "Preview Reports" button - generate CoA and CSV but do not set "Last Reported to Metrc" information

- **ID**: 2207
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T15:22:28.993Z
- **Last Updated**: 2024-10-17T13:25:20.49Z

## Description

Same as "Generate Reports" but does not set the "Last Reported to Metrc" flag.

# NewBatch - Primary Review - allow user to select Bypass Secondary Review

- **ID**: 2208
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T15:34:16.76Z
- **Last Updated**: 2024-10-15T18:24:30.543Z

## Description

Allow user to select Bypass Secondary Review. Record in audit trail history. Require user to enter reason for bypassing secondary review.

# NewBatch - Secondary Review - add tab to Navigation for Secondary Review

- **ID**: 2209
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T15:37:11.383Z
- **Last Updated**: 2024-10-15T16:12:23.073Z

## Description

Add tab to Navigation for Secondary Review

# NewBatch - Instrument Files - Handle "Prep Batch Orphan" Replicates

- **ID**: 2214
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-14T16:29:12.127Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Decide what happens when an instrument file shows up with a replicate that is not a part of any Prep Batch.  Implication: analytical batch number might need to be in the replicate, or give the primary reviewer the opportunity to correct the defect.

# NewBatch - Batch Analysis - Establish logic for determining opening/closing of analytical batches based on instrument files and system rules

- **ID**: 2215
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-14T16:48:42.56Z
- **Last Updated**: 2024-10-15T15:59:24.103Z

## Description

Create rules for determining when an analytical batch "opens" and "closes" based on instrument name + opening and closing TestItems (generally, QCs).

# NewBatch - Batch Analysis - Handle Replicates Remaining after Aborted Analytical/Instrument Run

- **ID**: 2216
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T16:56:32.35Z
- **Last Updated**: 2024-10-17T13:26:00.337Z

## Description

Prerequisite: determine how expectations will be set for contents of an analytical batch.  Alert primary/secondary reviewers to analytical batch replicates "orphaned" by an early-aborted analytical batch (i.e. closed without those samples being run).  This situation will be highlighted in the "Overview" tab.

# NewBatch - Login - Add Login Screen to Base URL

- **ID**: 2217
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-14T19:18:06.08Z
- **Last Updated**: 2024-10-15T18:23:47.807Z

## Description

https://lims5000-feature.azurewebsites.net/  Base URL should allow user to log in. As of the time this story is being created, using the base URL above leads to a crash/reload error.  Login is only permitted through https://lims5000-feature.azurewebsites.net/Identity/Account/Login

# NewBatch - Change/Audit Logging

- **ID**: 2218
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:05:45.813Z
- **Last Updated**: 2024-10-15T14:05:46.39Z

## Description

_No description_

# NewBatch - Logging/Audit - Implement Service

- **ID**: 2219
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:11:19.14Z
- **Last Updated**: 2025-03-14T00:55:51.18Z

## Description

Implement service. Logging: Was/Is - value changes Bench sheet sample weight Bench sheet extraction volume BS dilution factor BS prep person  State changes - Batch complete/Incomplete, batch moves from open to closed Event - File received, report sent, quality control overrides

# NewBatch - Logging/Audit - Identify all logging/audit points

- **ID**: 2220
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:12:24.357Z
- **Last Updated**: 2025-03-14T01:10:40.97Z

## Description

_No description_

# NewBatch - Logging/Audit - Create a means for creating Queries and Reports

- **ID**: 2221
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:15:17.727Z
- **Last Updated**: 2025-03-14T01:10:24.73Z

## Description

_No description_

# NewBatch - Export Bench Sheets

- **ID**: 2222
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:21:56.187Z
- **Last Updated**: 2024-10-15T14:21:56.697Z

## Description

_No description_

# [Pending Benchsheet Strategy]  NewBatch - Bench Sheets - Export Terpenes Bench Sheet

- **ID**: 2223
- **State**: Removed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-15T14:22:27.27Z
- **Last Updated**: 2025-02-05T16:31:52.21Z

## Description

A change in strategy for Bench Sheets.   The lab accumulates necessary prep batch information on an Excel sheet called a Bench Sheet.   NewBatch LIMS currently emulates that with a UI.    However, we are changing strategy.  The change in strategy is to export an Excel bench sheet from LIMS and then import it back in after it is completed.   This Lims generated Excel benchsheet is to replace the NewBatch LIMS User Interface Bench Sheet (e.g. Prep-Pending > Terpenes).  Glossary Legacy Benchsheet  (LBS) - The Excel benchsheet currently used by the lab that is not associated with the LIMs. UI Benchsheet (UIBS)- The NBLims UI that simulates the Legacy Benchsheet.  This will be replaced by the Exported Benchsheet. Exported Benchsheet (XBS) - The new functionality where an Excel benchsheet will be exported, used, then imported back to NBLims.  This will replace the UI Benchsheet functionality in NBLims.   Template Bench Sheet A template Excel benchsheet for each assay should be stored in LIMs file storage.  It should be associated with a particular BatchSop for that assay.  It should have an effective date so it can be revised.  The template should be specially created for this purpose having been derived from the LBS.   It can be modified to facilitate it's use as a template where needed.BenchSheet Generation and Export On the UI for a particular Prep Batch the user will "check out" an XBS that Lims will  generate from the template.  There is an existing PrepBatchBenchSheetService and PrepBatchBenchSheetVm that is used for the UIBS that can be used to generate the XBS.  The lab analyst will then fill out the XBS and import it back into the Lims.  Lims will validate the contents and reject it with validation messages if there are any problems.  Or it will accept it and update the contents of the underlying tables and mark the sheet as "checked in".  Benchsheet Security I recommend that when a sheet is checked-out, a GUID is generated in the PrepBatch that is also placed somewhere in the XBS's associated workbook to stamp it as the officially checked out version.   That will ensure that only that sheet can be checked back in.   Developer Notes:  The image below is the benchsheet from an LBS.   The generated XBS should look like this.      There are four horizontal sections in the BS, which are the Top Section, the Procedure Section, the Sample section and the Notes.The UIBS is dynamically constructed from information in the view model that describes the position and formatting of the fields in the Top Section and the columns in the Sample Table.   The fields and columns will be different for each type of assay (e.g. Terpenes vs Cannabinoids).In the new strategy, the BS Excel template will already have fields in the right cells so the positioning info in the current schema can be replaced by information that facilitates "binding" the database VM properties to the generated XBS, and also used for parsing during Import.Many of the fields are dropdown fields which refer to UserRoles and Labassets in the DB.   The VM contains all the eligible choices in the form of Selectors for those fields.   In the new XBS strategy, a separate List sheet in the generated XBS workbook that contains the various lists of choices.   The XBS sheet's drop down boxes should use those lists for the eligible choices.  The LBS does the same thing, so here is an example of the LBS List sheet.  Again, all the items that should go on the lists are available in the selectors in the PrepBatchBenchSheetVm graph.Attached to this story is an actual LBS workbook which you can download and operate, and examine the code

# NewBatch - QA and Control Charts

- **ID**: 2225
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:36:02.777Z
- **Last Updated**: 2025-03-14T00:54:13.22Z

## Description

_No description_

# NewBatch - Data and Control Charts - Terpenes

- **ID**: 2226
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:36:39.437Z
- **Last Updated**: 2024-10-17T13:25:13.977Z

## Description

See attachment for Terpenes control chart.

# NewBatch - Adapt Filer

- **ID**: 2227
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:43:36.17Z
- **Last Updated**: 2024-10-17T13:25:13.977Z

## Description

Adapt filer to NewBatch

# NewBatch - Instrument File Importing

- **ID**: 2228
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:47:05.49Z
- **Last Updated**: 2025-03-14T00:52:37.86Z

## Description

_No description_

# NewBatch - Individual Analytes and Whitelisting

- **ID**: 2229
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:50:01.13Z
- **Last Updated**: 2024-10-15T14:50:01.45Z

## Description

_No description_

# NewBatch - Archive Strategy for Legacy LIMS

- **ID**: 2230
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T14:56:29.753Z
- **Last Updated**: 2024-10-15T14:56:30.12Z

## Description

_No description_

#  NewBatch - Harvest Six Months of Legacy Data

- **ID**: 2231
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T15:04:25.14Z
- **Last Updated**: 2024-10-29T18:51:05.78Z

## Description

  Work out a scheme to harvest legacy data files to generate a 6 months "look back" of data in NewBatch as if all the sample and control files were run through the instrument under New Batch (NB).  Developer Notes:Legacy tables and File Storage contain all the information needed to do the conversion for Samples, but not for Controls.   So the conversion scheme should harvest existing data.   And it should provide a strategy for running the lab's control samples through Filer complete with modified sample names, acquisition date/times, and instrument names.  Statistics on the last 6 months of legacy Terpenes data for Ohio.Manifests - 1574 Batches - 935 Samples - 10774   select count(distinct(m.Id))from manifest mjoin sample s on s.ManifestId = m.Idjoin samplepanel sp on sp.SampleId = s.Idjoin panel p on sp.PanelId = p.Idjoin labbatchsamplepanel lbsp on lbsp.samplepanelId = sp.Idjoin labbatch lb on lbsp.LabBatchId = lb.Idjoin lab l on p.labid = l.Idwhere p.slug = 'TERPS'and l.slug = 'NCTL'and m.ReceivedOn > '4/15/2024' Main Data HarvestingThe existing Terpenes data generator can be adapted to harvest legacy files in file storage for as far back as we want.  Harvesting Mapping Table The harvesting process will create a few new tables that provide mapping information for things like legacy batches to NB batches, acquisition times of legacy files and more.  This is to facilitate automating the next phase which is automatically doctoring info in the legacy control files so they can be run through Filer.  It should be able to contain the acquisition time of the first and last sample in the prep and analytical batches so the acquisition time of the controls samples can be edited by the routine described below.  C# Unit Test to Prepare Controls for importing. A C# unit test will be written to take all the control files and edit them as follows:Sample names modified to map to the right NB Prep Batch or Analytical Batch Acquired date/times will be modified so that the control files will appear to have been run in the right sequence with the harvested files. The instrument name will be inserted.  C# Unit Test for Analysis Another unit test C# app will fire off the analysis for all the harvested files.  The bridge between the old world and the new is the AssayRequest.  AssayRequests will be stamped with a special GUID that identifies that it was created during the harvesting process.   This will allow another script to delete everything that was created during harvesting so as to roll back during development of all this.  (I already use this strategy in the Terpenes Data generator Unit Test).  Assumptions The legacy filenames should provide enough information to identify what kind of control it is and what legacy batches it pertained to. Filer has been adapted to accommodate the changes in import strategy in NB. The file importing code needs to be modified to use the "One Open Batch" strategy for associating incoming instrument file data with the appropriate batch. LabAssetTypes and LabAssets are well populated and mapped to fields in the Batches.

# NewBatch - LabAssets - Standards Prep Log - User Interface

- **ID**: 2233
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-15T15:32:41.833Z
- **Last Updated**: 2025-04-03T13:47:57.487Z

## Description

Create UI for Standards Prep Log that will capture/populate the data needed as described in #2192.  The background for this story can be found in that story.  The Prepared Reagent Lab Assets UI will be extended to solicit the information required for the Standards Prep Log.  It will be invoked by the Add Reagent Button: There are two cases for when the Add Reagent button is pressed.1) If there is no ReagentPrepLogBatchSop associated with the LabAssetType, then the UI does what it does now.2) There is a ReagentPrepLogBatchSop associated with the  the LabAssetType the UI brings up a dialog that will solicit a lot more information.     This is a crude mockup of the dialog, made from an existing PrepBenchSheet.  When the Add Reagent button is pressed, a new ReagentPrepLogBatch should be created from the ReagentPrepLogSop that is associated with the LabAssetType.    The new batch will be associated with the newly added Lab Asset.The top two rows of the UI contain the name and number of the Sop that created the batch.  It should also have a field that solicits the NCTLId that will be assigned to this new LabAsset.   The Expires date is generated by adding the ReagentPrepLogBatchSop.ExpiryDays to the current Date.   But the field is editable in case they want to change it.  The next sections are the BatchObjects section, the Procedure section, and the Notes which are the batch comments property.The UI example I used is from a PrepBatch, so the batch objects that are shown are not the ones that will appear in this UI.  Same with the Procedure section.

# NewBatch - User Management / Permissions / Roles / Claims

- **ID**: 2234
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T15:46:02.677Z
- **Last Updated**: 2024-10-15T15:46:17.413Z

## Description

_No description_

# NewBatch - Global UX/UI

- **ID**: 2235
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T18:22:49.307Z
- **Last Updated**: 2024-10-15T18:28:28.273Z

## Description

_No description_

# NewBatch - Microbial

- **ID**: 2237
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T18:33:34.35Z
- **Last Updated**: 2024-10-15T18:33:34.653Z

## Description

_No description_

# NewBatch - Metrc Package Adjustments

- **ID**: 2238
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-15T18:45:03.603Z
- **Last Updated**: 2024-10-17T19:05:32.207Z

## Description

_No description_

# NewBatch - Admin - Roles and Claims - Create Table of Demonstrations of Capability for Prep and Instrumental Analysis for Every Assay

- **ID**: 2241
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-17T19:07:01.267Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

For the results of a test of a customer sample to be valid, the test generally must be conducted by someone who has a valid, effective "Demonstration of Capability" (DoC) on file in company records for the assay, or some portion of the assay (i.e., a DoC for "sample preparation" for the assay).  Only individuals with a valid Demonstration of Capability will be available as "Batch Objects" on the LIMS-generated Excel Bench Sheets (XBSs) (see #2223)  LIMS must always have a list of qualified personnel for (1) [Assay] Prep and (2) [Assay] Instrumental Analysis, with Effective Date and next Expiration Date.  If an individual's DoC expires, and the individual later re-qualifies by again successfully completing a DoC for the assay, the system must remember multiple Effective Dates and Expiration dates.  Prep is generally completed by "prep team" members, but, for example, senior chemists are all always qualified for both Prep and Instrumental Analysis.

# NewBatch - Receiving - Metrc Receiving and Manifest Importer - Apply "NCTL Sample Type" values at Receiving

- **ID**: 2242
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2024-10-18T17:39:35.773Z
- **Last Updated**: 2024-11-08T15:42:19.837Z

## Description

Update data table for sample that currently includes "Item Category" to also include "NCTL Sample Type" values. "NCTL Sample Type" value will be those on the list in this Wiki - https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/85/Batching-v.2 (copy attached to this story's Attachments as of 10/18/2024)  Add a column when parsing from an Excel file for NCTLSampleType Data Validation - user required to select Sample Type for every sample on a Manifest; if the user tries to save with a missing Sample Type, give user error message identifying which sample(s) missing Sample Type on the manifest.

# NewBatch - UI - Lab Assets Refine Purchased Reagents

- **ID**: 2244
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-21T14:56:39.32Z
- **Last Updated**: 2024-11-21T20:21:21.347Z

## Description

The schema has been changed for LabAssetTypes so the UI needs to be changed..   This purpose of this story is to finalize the UI for Purchased Reagents.  Purchased Reagents are a type of LabAsset.   The UI should present a table of LabAssetTypes for Purchased Reagents.  The columns in the table should be Category, SubCategory, and SubSubCategory. Each LabAssetType can have zero or more LabAssets.   Each row in the table should allow an expansion to show the LabAssets associated with their LabAssetType.   The UI will allow the user to sort and filter on the LabAssetType Category column.  The UI will allow the user to expand the LabAssets that are associated with their LabAssetType. The UI will not allow the user to Add, Edit, or Delete LabAssetTypes. The UI will allow the user to Edit a LabAsset. The UI will allow the user to Add a LabAsset to a particular LabAssetType. The UI will allow the user to Add Attachments to a LabAsset or LabAssetType  Attachments already have a Component as developed by Utkarsh.  It can be used as is.      The example above shows eight LabAssetTypes which in this page are Purchased Reagents Types. The fourth one is expanded to show its associated LabAssets (Purchased Reagents).   Attributes for the columns are shown below.    Expires On should only allow unique datetimes within a given LabAssetType.    This is no longer a requirement.  (DMC).  Developer Notes: Examine the code for the existing Purchased Reagent Lab Asset page.   The LabAssetService and its view models should be useable as is. All the drop down columns in the view model have corresponding Selectors which contain the items to populate the DropDowns.   None of the DropDowns are not freeform editable.  Either null or the bound items. Since the number of items is not large, the strategy followed by the service is to give view models of all the LabAssetTypes and LabAssets in the DB that pertain to Purchased Reagents.   That allows grid filtering and ordering to take place on the view models without going back to the DB. Use a Telerik Grid for the tables.   Make Category sortable, but use the Category Filter box for LabAssetType filtering.  Don't show Lab Assets for rows where Active = false unless Show Inactive checkbox is true. Description of the LabAsset schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/124/Lab-Assets Description of the LabDocument schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/125/Lab-Documents

# NewBatch UI - Lab Assets Refine Durable Assets

- **ID**: 2245
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-23T15:21:22.647Z
- **Last Updated**: 2024-11-22T14:51:04.997Z

## Description

The schema has been changed for LabAssetTypes so the UI needs to be changed..   This purpose of this story is to finalize the UI for Durable Assets.  Durable Assets are a type of LabAsset.   The UI should present a table of LabAssetTypes for Durable Assets.  The columns in the table should be Category, SubCategory, and SubSubCategory. Each LabAssetType can have zero or more LabAssets.   Each row in the table should allow an expansion to show the LabAssets associated with their LabAssetType.   The UI will allow the user to sort and filter on the LatAssetType Category column.  The UI will allow the user to expand the LabAssets that are associated with their LabAssetType. The UI will not allow the user to Add, Edit, or Delete LabAssetTypes. The UI will allow the user to Edit a LabAsset. The UI will allow the user to Add a LabAsset to a particular LabAssetType. The UI will allow the user to Add Attachments to a LabAsset or LabAssetType  Attachments already have a Component as developed by Utkarsh.  It can be used as is.       The example above shows eight LabAssetTypes which in this page are Durable Assets Types. The fourth one is expanded to show its associated LabAssets (Durable Assets).   Attributes for the columns are shown below.    Expires On should only allow unique datetimes within a given LabAssetType.     This is no longer true.  Ignore this.    Developer Notes: Examine the code for the existing Durable Assets Lab Asset page.   The LabAssetService and its view models should be useable as is. All the drop down columns in the view model have corresponding Selectors which contain the items to populate the DropDowns.   None of the DropDowns are not freeform editable.  Either null or the bound items. Since the number of items is not large, the strategy followed by the service is to give view models of all the LabAssetTypes and LabAssets in the DB that pertain to Purchased Reagents.   That allows grid filtering and ordering to take place on the view models without going back to the DB. Use a Telerik Grid for the tables.   Make Category sortable, but use the Category Filter box for LabAssetType filtering.  Don't show Lab Assets for rows where Active = false unless Show Inactive checkbox is true. Description of the LabAsset schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/124/Lab-Assets Description of the LabDocument schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/125/Lab-Documents

# NewBatch  - LabDocuments - Add optional DocumentType to the LabDocument

- **ID**: 2246
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-24T14:29:13.037Z
- **Last Updated**: 2025-01-02T18:59:09.78Z

## Description

Need to Add Folder Types    Background LabDocuments can be associated with LabAssetTypes, LabAssets, SOPs, and Instruments.   Queries in other areas of Lims need to be able to obtain the latest version of a LabDocument of a particular "type".    Currently there is no property in the LabDocument table to distinguish one type of document from another for use in a query.For example, there is a need to show the latest calibration document for a particular instrument being used in a Batch.   There are BatchObjects that can refer to LabDocuments but they have no way of retrieving the latest document from a particular folder.      Schema Changes Populate the DBEnum table with values that have the Enum column of "LabDocumentTypeSlug".   For now the entries should be Calibration, Method, Tuning, Sop, and null.   Do this by adding rows to the xDBEnum table in the xImport database on Azure.  Running the big delete and repopulate script should bring those values into the Lims DBEnum table.  Add a DocumentType string field to the LabDocument base model that accepts the choice made by the user.    Add an index to LabDocument subclasses that ensures that the DocumentType property is unique for their foreign key unless it is null.   For example, the index should allow either nulls or only unique non-null values for a given InstrumentId foreign key.  Also, add an index to LabDocumentVersion to ensure that EffectiveOn is unique for a particular LabDocumentId.  Update the LabDocumentVm and any changes to the LabDocumentService.  UI Changes  The LabDocument dialog should be modified on the left side to allow the user to assign a DocumentType (display label should be Folder Type)  via a dropdown when adding a Folder.  The dropdown choices will be populated from a DBEnumSelector whose key is LabDocumentTypeSlug.  The resulting list of Folder Types should have the DocumentType string appended to the LabDocumentName in parentheses as shown in the crude example below.   No parentheses if the DocumentType is null.

# NewBatch UI - LabAssets Refine Prepared Reagents

- **ID**: 2247
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-10-28T16:29:52.207Z
- **Last Updated**: 2025-01-02T19:00:08.753Z

## Description

The schema has been changed for LabAssetTypes so the UI needs to be changed.   The purpose of this story is to finalize the UI for Prepared Reagents.  Prepared Reagents are a type of LabAsset.   The UI should present a table of LabAssetTypes for Prepared Reagents.  The columns in the table should be Category, SubCategory, and SubSubCategory. Each LabAssetType can have zero or more LabAssets.   Each row in the table should allow an expansion to show the LabAssets associated with their LabAssetType.   The UI will allow the user to sort and filter on the LabAssetType Category column.  The UI will allow the user to expand the LabAssets that are associated with their LabAssetType. The UI will not allow the user to Add, Edit, or Delete LabAssetTypes. The UI will allow the user to Edit a LabAsset. The UI will allow the user to Add a LabAsset to a particular LabAssetType. The UI will allow the user to Add Attachments to a LabAsset or LabAssetType Attachments already have a Component as developed by Utkarsh.  It can be used as is.    The example above shows eight LabAssetTypes which in this page are Purchased Reagents Types. The fourth one is expanded to show its associated LabAssets (Purchased Reagents).   Attributes for the columns are shown below.    Expires On should only allow unique datetimes within a given LabAssetType.      Developer Notes: Examine the code for the existing Purchased Reagent Lab Asset page.   The LabAssetService and its view models should be useable as is. All the drop down columns in the view model have corresponding Selectors which contain the items to populate the DropDowns.   None of the DropDowns are not freeform editable.  Either null or the bound items. Since the number of items is not large, the strategy followed by the service is to give view models of all the LabAssetTypes and LabAssets in the DB that pertain to Purchased Reagents.   That allows grid filtering and ordering to take place on the view models without going back to the DB. Use a Telerik Grid for the tables.   Make Category sortable, but use the Category Filter box for LabAssetType filtering.  Don't show Lab Assets for rows where Active = false unless Show Inactive checkbox is true. The Add Asset dialog will need to create a Standards Preparation Batch and solicit the LabAsset Values used to prepare the Prepared Reagent. Description of the LabAsset schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/124/Lab-Assets Description of the LabDocument schema can be found in https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/125/Lab-Documents

# NewBatch - Manifest Import Adds AssayRequest

- **ID**: 2251
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-05T18:42:37.013Z
- **Last Updated**: 2025-01-16T15:09:37.357Z

## Description

In NewBatch, Manifest Importing should no longer add SamplePanelAnalytes to Sample Panel.   Instead, Manifest Import should create the Manifest -> Sample -> SamplePanel rows as usual, then add an AssayRequest to the SamplePanel.  Set the NeededBy and Rush in the AssayRequest according to the current rules used in legacy Lims. AssayRequest will require a Reason, which should be the row in the Reason table with Name = "From Manifest". (The Reason table is conditioned with LabId).During the import a lab supplied value is now required which goes in Sample.ManifestSampleTypeId.   There is a already a table called ManifestSampleType that is populated from xImport.   For now, use a default value based in ItemType.   For ItemType of Plant, use the id of the row in the ManifestSampleType whose slug is "FLOWER".   For  ItemType of Processed Product, use the id of the row whose slug is "CONC".   The queries should be Lab specific because both the ItemType and ManifestSampleType tables are qualified by LabId.  The AssayRequest.NeededBy should be set according to the existing NeededBy Rules.  The AssayRequest.Rush should be set according to the same method as legacy system.For background on the old schema vs the new schema, see the Wiki pages called NewBatch Pages/NewBatch Architecture/Assay Requests and https://dev.azure.com/LIMS5000ORG/LIMS5000/_wiki/wikis/LIMS5000.wiki/135/Manifest-Graph

# NewBatch - Manifest - Default SampleType on Import

- **ID**: 2253
- **State**: Resolved
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-06T15:10:13.033Z
- **Last Updated**: 2025-03-14T01:13:55.66Z

## Description

soduku URL on the UI: /SudokuTables  Manifest importing now requires the receiving person to supply a Sample Type.  The Sample Type does not come from Metrc because it is something invented by the lab.   The Sample Type drives what SOP is used by the system to create PrepBatches.    The Sample Type is already in the schema as Sample.ManifestSampleType.  A table of ManifestSampleTypes already exists and is already populated by values in the xImport table via the big import sql script.This story is a request to add a new Sudoku type table that chooses a default ManifestSampleType based on the same criteria that drives the other Sodoku tables.   The new class should be DefaultManifestSampleType which should inherit from DynamicRowModel.  The properties added by the subclass should be the ManifestSampleTypeId, ManifestSampleType, Lab, and LabId.  public class DefaultManifestSampleType : DynamicRowModel {     public int ManifestSampleTypeId { get; set; }     public ManifestSampleType { get; set;}     public int LabId { get; set; }     public Lab Lab { get; set; } }  Add the new entity model in NCLims.Models.NewBatch.   Add the fluent mapping configuration for the new model in NCLIms.Data.NewBatchMap.  Add the DBSet to the NewBatch section in NCLims.Data.NCLimsContext.   You will find the example of the existing Sudoku table in NCLims.Data.EntityMap since those tables are also used in the Legacy system.  Services that need information from Sudoku tables use the NCLims.Business/NewBatch/SudokuService.   Study how that is used and use it the same way in the Manifest importing.     I moved this to another story so Utkarsh can work  this into his Manifest Importing code.   - DMC  Create an table in the xImport database in Azure called xDefaultManifestSampleType.   Populate it with the contents of the spreadsheet attached to this story.Modify the scripts for deleting and repopulating NewBatch data in your DB to accommodate the new table in the schema.  Use the "reference" feature in CodeLens to see which entities refer to the new table, so you can get the order of dependencies right in the delete and repopulate scripts.  Otherwise you will get a foreign key violation from one or the other script.  Add a capability to export and import the new Sudoku table in the Sudoku Admin area of the Lims UI (NavBar > Admin > Sudoku Tables).  A mockup of the export/import format is shown below.   The Name column is there for readability, but the Slug column should be used as a "key" during import.   The mockup below is not the actual contents of the table.   Adam will need to supply that.  See the wiki documentation on SudokuService and Tables.  I just realized that the Sudoku tables require an analyte Id.  This new Sudoku table is not a "per analyte" table.  It returns a single ManifestSampleType given only the sample information.  One problem is that the DynamicRows base class requires a non-nullable analyteId.   I recommend that the import script that moves the info from the xImport table into the new Sudoku table grab the first primary key in the Analyte table for each row it is importing.  The usage of this particular table will be in Manifest Import well before a PrebBatchSample is assigned to the sample.  That means the service method to get the Sudoku row for a given sample will need to be a bit different than the others.  It also means the main Sudoku query should be modified to handle the case where there is no list of analyteIds.The method SodukoService.DynamicRowsQuery<T> should be modified to deal with a null list of AnalyteIds.  For example, the predicate  && analyteIds.Contains(d.AnalyteId)could be modified to not care about analytes:&& (analyteIds is null || analyteIds.Contains(d.AnalyteId))The new added method for calling on the info in this table will not have any analyteIds, but it will have all the Sample Information at hand.   So it should be something like:  public async Task<List<T>> FetchDynamicRows<T>(     IQueryable<T> drows,     int itemTypeId,     int itemCategoryId,     int? testCategoryId,     int clientLicenseTypeId,     int licenseCategoryId,     int? potencyCategoryId,     bool inhaled,     bool solvent,     bool reTest,     IEnumerable<int> analyteIds,  // can be null where not applicable.     DateTime effectiveDate,) where T : IDynamicRowModel {    var rows = DynamicRowsQuery(        drows,        sampleInfo.ItemTypeId,        sampleInfo.ItemCategoryId,        sampleInfo.TestCategoryId,        sampleInfo.ClientLicenseTypeId,        sampleInfo.ClientLicenseCategoryId,        sampleInfo.PotencyCategoryId,        sampleInfo.Inhaled,        sampleInfo.Solvent,        sampleInfo.Retest,        analyteIds,        effectiveDate    ).ToList();    rows = FilterEffectiveDate(rows, effectiveDate);    rows = ChooseHighestRankingDynamicRows(rows, suppressThrowOnMultipleLimits);    return rows;}The caller of this method is now free to provide a null for the analyteIds parameter.

# NewBatch - Spike - Alternatives to Telerik Spreadsheet for Bench Sheets

- **ID**: 2254
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-07T18:32:02.25Z
- **Last Updated**: 2025-02-26T16:06:34.39Z

## Description

Telerik now makes Spreadsheet control that seems to be full featured.   This spike story is to evaluate the use of the Telerik control for use in Lims for a direct display and data entry for Benchsheets.    Telerik ruled out 11/14/2024 per discussion w/ @Utkarsh Choudhary @Gary.Mandela @Dudley Chapman; spike extended to evaluate alternatives (e.g. DevExpress).  At present, the fields and tables on a benchsheet are driven by BatchObjectVms.   What is the best strategy for binding specific cells to batchobjectvms given that batchobjects can be modified to include spreadsheet cell addressing or named cells instead of how they position fields in the Blazor only benchsheet code.  The alternative to using this control is exporting and importing benchsheets in the form of an Excel workbook.   Attached is an example Excel benchsheet that is currently used by the lab.  Questions about the use of the Telerik spreadsheet.  I think if we can answer these questions then it is probably a good way to offer this part of the UI. Can we use an Excel file as a starting template?   For example, when a analyst creates a Terpene's batch we would clone a preconfigured Terpenes excel sheet for use in that batch, then allow data entry? Will the spreadsheet control look just like the template it was cloned from?  (see attached benchsheet). Can we bind a cell to a viewmodel property for text, datetime, double, int?  (either by named cells, named ranges, or cell addresses)? Can we solicit cell values via a dropdown in the cell?  Via date picker? Can we populate the dropdown choices? Can we validate a cell's value on Submit?

# NewBatch - LabAssets - Instrument Peripherals

- **ID**: 2255
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-08T15:25:40.197Z
- **Last Updated**: 2025-02-05T16:29:20.307Z

## Description

Instruments contain certain components that are critical to the accuracy of the results they produce.   The components may be replaced by new ones due to their wearing out or a change in the SOP that describes the methods for analysis.  Lims needs to keep track of which components were configured in an instrument at the time it was used to carry out an analytical batch.  Lims will track the inventory of these components as Durable Assets.  Instruments will have a list of InstrumentPeripherals whose model class should look like this: public class InstrumentPeripheral : BaseModel{    [Required]    [StringLength(250)]    public string PeripheralType { get; set; }    [Required]    public int InstrumentId { get; set; }    public Instrument Instrument { get; set; }    public int DurableLabAssetId { get; set; }    public DurableLabAsset DurableLabAsset { get; set; }} The Instrument model should be modified to add the ICollection<InstrumentPeripheral>.  InstrumentPeripheralBatchObject  A new BatchObject subclass should be created: public class InstrumentPeripheralBatchObject : BatchObject{   public int InstrumentBatchObjectId { get; set; }   public InstrumentBatchObject { get; set; }   [Required]   [StringLength(250)]   public string InstrumentPeripheralType { get; set; }   public int DurableAssetId { get; set; }   public DurableAsset DurableAsset { get; set; }} InstrumentBatchObject should be modified accordingly by adding an ICollection<InstrumentPeripheralBatchObject> InstrumentPeripheralBatchObjects { get; set; } = [];Fluent Mapping and Context should be modified and migration created for all the changes.  No unique indexing is required.  See Wiki page, https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/139/Instruments-Documents-and-Peripherals-(Proposed)

# NewBatch - Batch Objects Special Processing

- **ID**: 2256
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-08T15:29:16.033Z
- **Last Updated**: 2025-02-05T18:46:52.447Z

## Description

Most BatchObjects save the information that the user supplies right in the object itself.   However, some BatchObjects require special processing during VM creation and then again before SaveChanges.   For example, a BatchObject can bind to a particular property in the Batch itself.    An important use case is capturing the Instrument used in a batch as a BatchObject where the user's choice needs to be persisted in a property in the Analytical Batch.There are two static methods in the abstract BatchService class that do special processing on certain BatchObjects.    They either harvest data from other places into the batch object or they update data in other places with the contents of the batch object.Code needs to be added to the BatchService.PopulateStandardBatchObjects static method to memorialize the Instrument Peripheral information from the Instrument (if the instrumentId is non-null) into the InstrumentPeripheralBatchObjects.  See Wiki document https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/139/Instruments-Documents-and-Peripherals-(Proposed)  and https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/131/SopFields-and-BatchObjects

# NewBatch - LabAssets - SopFields to Lab Asset Type Mapping

- **ID**: 2257
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-08T15:48:33.057Z
- **Last Updated**: 2025-01-03T16:15:39.95Z

## Description

Purpose This story is to create the Admin UI to manage the mapping of LatAssetTypeSopFields to LabAssetTypes.  Below is a crude mockup of a proposed UI (see Excel screenshot below). Background BatchObjects are used to capture important information about a batch, such as dates, users, instruments, and lab assets that are used in preparing the samples for a batch.   Since the type of assets used in a batch varies with the type of assay, the UI for capturing that information is data driven.    The table that specifies which BatchObjects to create and display for a batch is the SopField table.  It is a table of field specifiers. Some of BatchObjects capture which lab assets were used in a batch.   The SopFields that create the BatchObjects have foreign keys to the LabAssetType table.  This allows the BatchObject fields to populate the dropdown controls with the eligible lab asset choices for that particular LabAssetType.  The five leftmost columns in the left table display SopField information.  They show the SOP, internal field name, and the field's label in the actual batch benchsheet UI.    The right three fields show the three category fields that the SopField is mapped to.  Currently, they are all mapped to an Unassigned LabAssetType.  The right hand table shows the available LabAssetTypes.   The idea is to select a row in the left table, a row in the right table, click the Assign button, which will map the SopField to the LabAssetType.   Naturally, on Submit, the foreign key in the SopField will take on the primary key of the LabAssetType.  Since there can be a lot of information to scroll through, liberal use of column filters and sorting should be available to the user.  The data in the left hand table in the mockup was extracted with the following query:Select bsop.disc, bsop.Name as SopName, bsop.Sop, bsop.Version, sopf.Name as ObjectName, sopf.DisplayName, lat.Category, lat.SubCategory, lat.SubSubCategoryfrom SopField sopfjoin BatchSop bsop on sopf.BatchSopId = bsop.Idjoin Lab l on bsop.LabId = l.Idleft join LabAssetType lat on sopf.LabAssetTypeId = lat.Idwhere sopf.disc = 'asset'and l.slug = 'NCTL'order by bsop.disc, bsop.Name, bsop.Sop, bsop.Version, sopf.NameIn C#, the Linq query can query right from ctx.LatAssetSopField instead of using the 'disc' discriminator.  The right hand table in the mockup was extracted by this query:select lat.AssetType, lat.Category, lat.SubCategory, lat.SubSubCategoryfrom labassettype latjoin lab l on lat.LabId = l.Idwhere l.slug = 'NCTL'I recommend creating the VMs, VM fetch methods, and update methods in the LabAssetService.   I don't see the need for any schema changes to accomplish this story.   For background informating see Wiki pages https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/128/Anatomy-of-a-Batch and https://dev.azure.com/LIMS5000Org/LIMS5000/_wiki/wikis/LIMS5000.wiki/131/SopFields-and-BatchObjects

# NewBatch - Add InstrumentType LabDocument

- **ID**: 2258
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-08T16:18:02.427Z
- **Last Updated**: 2024-11-22T20:38:53.773Z

## Description

The LabDocument schema already has an InstrumentLabDocument that can hold things like calibration files or method files.      Add a new LabDocument subclass called InstrumentTypeLabDocument whose foreign key points to the InstrumentType table.  Add the subclass configuration to NewBatchEntityMaps and NCLimsContext DBset.  Add the new subclass to LabDocumentVm and any additions to the LabDocumentService.  See the wiki page for background on the LabDocument schema.

# NewBatch - Global Styling of Telerik Grid

- **ID**: 2259
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-11-08T19:31:09.427Z
- **Last Updated**: 2025-01-02T19:21:55.02Z

## Description

Receiving -> Current Manifests  Less padding and make pretty.

# NewBatch - LabAssets - SopFields Data Import

- **ID**: 2276
- **State**: Active
- **Assigned To**: Dudley Chapman
- **Created**: 2024-12-16T18:42:57.827Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

The xImport DB has tables for all LabAssets and SopFields.   The LabAssets seem to import into the Lims DB ok, but not many of the SopFields are imported.Fix the SopFields or the Import script so all the SopFields are imported.   The most important are all the Terpenes SopFields because we are concentrating on that assay first.

# NewBatch - SopFields Mapping and Data Export

- **ID**: 2277
- **State**: Active
- **Assigned To**: Dudley Chapman
- **Created**: 2024-12-17T15:07:49.303Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Once story #2257  and #2276  are complete, @Adam Scavone can use the UI to map the BatchObjects to the proper LabAssets. When that is done, the task in this story is to export those mapping results to the proper xSopField tables in the xImport DB, so the mapping can be preserved and reimported on a data refresh.

# NewBatch - Manifest Import uses DefaultSampleType Service

- **ID**: 2278
- **State**: Resolved
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2024-12-17T15:29:00.393Z
- **Last Updated**: 2025-06-04T06:00:17.553Z

## Description

A new Sudoku table and service was created in #2253.   Incorporate this new way of setting the DefaultManifestSampleType when creating the new AssayRequest.      A new SudokuService method has been added for the case where the sample information is already known rather then the one that requires a PrepBatchSampleId.   It also allows for the case where there is no list of analyteIds.  The method signature should be something like public async Task<List<T>> FetchDynamicRows<T>(     IQueryable<T> drows,      int itemTypeId,      int itemCategoryId,      int? testCategoryId,      int clientLicenseTypeId,      int licenseCategoryId,      int? potencyCategoryId,      bool inhaled,      bool solvent,      bool reTest,      IEnumerable<int> analyteIds,  // can be null where not applicable.      DateTime effectiveDate) where T : IDynamicRowModel  {  Supply a null for the analyteIds parameter.  Usage in Manifest Import: var query = ctx.DefaultManifestSampleType.AsNoTracking()    where(dmst => dmst.LabId == labId);var defaultManifestSampleType = await sodokuService.FetchDynamicRows(    query,    ....   // The sample info parameters.    null, // for the analyteIds    effectiveDate // The manifest ReceivedOn date.    ).SingleAsync();Hopefully, you should always get one row back from the method call.

# [Ignore] - [No, really, ignore this] - NewBatch - UIs - make Received, NeededBy, Completed, Reported dates/times visible to users

- **ID**: 2280
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2024-12-20T18:54:43.61Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Add "Received" column in Prep - Pending user interface. Populate with the date/time stamp for the sample in format MM/DD/YYYY HH:MM

# NewBatch - Restore Sudoku Table Menu Item in Admin

- **ID**: 2283
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2024-12-31T15:44:36.72Z
- **Last Updated**: 2025-02-10T20:26:54.61Z

## Description

The legacy system has a menu item for getting to the Sudoku tables export/import feature.   The menu item is missing in the NewBatch system.   It seems all the code for the feature is there just fine as one can access it manually with https://lims5000-feature.azurewebsites.net/SudokuTables.The legacy system has the menu item right under the Admin level.Developer Notes:In NewBatch, the nav menu is DB driven by entries in the NavMenuItem table.  Those values are brought in from xImport.xNavMenuItems table via the big load script.

# NewBatch - Spike - Bench Sheet - Evaluate current approach

- **ID**: 2285
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-01-02T18:17:37.277Z
- **Last Updated**: 2025-02-05T16:31:04.1Z

## Description

_No description_

# NewBatch and Legacy - Sudoku Import/Export should validate Lab Slug

- **ID**: 2288
- **State**: Resolved
- **Assigned To**: Adam Scavone
- **Created**: 2025-01-09T14:52:40.983Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

This story covers both the legacy Sudoku tables and the newly added one for DefaultManifestSampleType in the NewBatch system.Currently the Import and Export of Sudoku tables in the Admin section writes and reads the Lab Slug in the resulting spreadsheet.   The problem is that the Admin who is using the feature is logged in to a particular lab.   He is expecting to be working on Sudoku records for that particular lab.    There is no case where he should be able to put in the Slug for a different lab in the spreadsheet.The remedy for this is to add validation to the import code to ensure that every row in the spreadsheet has the Slug string for the lab the user is logged into.   It should put out the usual validation message if there is a problem and not allow the spreadsheet to be imported.

# NewBatch - Asset type grids columns to be made dense

- **ID**: 2301
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-01-30T17:47:50.893Z
- **Last Updated**: 2025-02-05T16:27:16.267Z

## Description

_No description_

# NewBatch - Merge Sudoku files in from Main

- **ID**: 2306
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-02-05T19:03:14.05Z
- **Last Updated**: 2025-03-14T16:22:24.2Z

## Description

I (Dudley) attempted to merge Main to Feature, (which is something we should be doing every week. )  Recently, a lot of good work was done in the Exporting and and Importing of Sudoku tables in Main, along with adding DefaultManifestSampleType as a Sudoku table in Feature.   I had trouble merging the Sudoku related stuff because of so much work in both branches.   The task for this story is to merge any Sudoku stuff in Main to Feature and make sure there is no regression for Import/Export for the legacy tables and the new table.    The most troublesome file for me was the SudokuFileParser where most of the heavy lifting takes place.  Conclusion: Take Feature version for Sudoku.

# NewBatch - SampleQueue UI/Neededby Column Changes

- **ID**: 2350
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T09:26:43.367Z
- **Last Updated**: 2025-03-31T14:44:56.19Z

## Description

Needed by column is obsolete in Sample class.   ProjectToSampleQueueVms  and ProjectToPagedFilteredSampleQueueVms functions in SampleQueueVm

# NewBatch - Analysis/Prep Batch UI/ NeededBy Column changes

- **ID**: 2351
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T09:30:00.277Z
- **Last Updated**: 2025-03-31T14:51:26.23Z

## Description

NeededBy column is obsolete from LabBatchSampleView2 view.  ProjectToPagedBatchSampleVmForAnalysis, ProjectToPagedBatchSampleVmForPrep and ProjectToPagedBatchSampleVmForNotBatched functions in BatchSamplePanelAnalysisVm

# NewBatch - ManifestEditor UI/NeededBy Column Changes

- **ID**: 2352
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T13:17:38.043Z
- **Last Updated**: 2025-03-31T14:44:27.92Z

## Description

   Function with 0 references in SampleVM  Also, Map Function that points to UpsertManifest in ManifestEditor

# NewBatch - Manifests UI/ NeededBy Column Changes

- **ID**: 2353
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T13:35:08.833Z
- **Last Updated**: 2025-03-31T14:44:09.313Z

## Description

ProjectToManifestVm function in ManifestVm  that point to RefreshManifests in Manifests.razor

# NewBatch - PotencyTargetAnalyzerService - Retrofit New service into NewBatch

- **ID**: 2354
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T13:44:41.96Z
- **Last Updated**: 2025-03-31T14:43:47.093Z

## Description

Ensure that the PotencyTargetAnalysisService is adapted to NewBatch schema and logic. It should have identical behavior.Note:  Given that we don't have any Cannabinoid assays running in NewBatch yet, it is hard to test this work.  We will have to test it when we populate the DB with configuration for other assays.

# NewBatch - Sudoku export doesn't import after merge.

- **ID**: 2356
- **State**: New
- **Assigned To**: Safi Ullah
- **Created**: 2025-03-11T18:18:59.94Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

After the big merge of Main into Feature, it appears that Sudoku export has some problems as revealed when trying to import the resulting spreadsheet.   I only tested AnalyteLimits but others might have problem.

# NewBatch - BulkDataExport UI/ NeededBy Column Changes

- **ID**: 2357
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T18:39:33.94Z
- **Last Updated**: 2025-03-31T14:56:55.033Z

## Description

CreateWorkBookForClientBulkSampleData and CreateWorkBookForBulkSampleData functions in exportservice  This appears to be Bulk Data Export's filters for "NeededBy" date, which makes a soon-to-be-incorrect assumption of a single "Needed By" date. Proposed resolution: if we are continuing to collect/generate a "Manifest Needed By" date, use the "Manifest Needed By" date, and, in the user interface, change the name/label of the button to "Order Due Date".

# NewBatch - NeededBy with no references

- **ID**: 2358
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T18:45:07.977Z
- **Last Updated**: 2025-03-31T14:50:42.517Z

## Description

ManifestVmV1      pointing to UpsertManifestV1 and UpsertSampleV1 with 0 references  ReceivingService - UpsertSamplePanelsV1  pointing to UpsertSampleV1 with 0 references   SampleVM     UpsertSamplePanelsForMoistureContent in ManifestService with 0 refrences

# NewBatch - AliquotsAndResults UI/ NeededBy Column Changes

- **ID**: 2359
- **State**: Closed
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-11T19:03:53.85Z
- **Last Updated**: 2025-03-31T14:45:23.567Z

## Description

ProjectToOrderHeaderInfoVms function in SampleHeaderInfoVm   Proposed Resolution: since this UI operates at the assay/analyte level anyway, we should replace the existing sample-level NeededBy date in this UI for the assay/analyte-level NeededBy date (i.e., the "new" "assayNeededBy" date or whatever it is called)

# NewBatch - NeededBy Schema and Logic

- **ID**: 2361
- **State**: Resolved
- **Assigned To**: Adam Scavone
- **Created**: 2025-03-12T19:38:45.88Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

This story is the culmination of a lot of discussion between Gary, Me, and Adam.   All the outstanding NeededBy stories should consider this as the foundation for change in the schema, logic, and VMs.   This should also satisfy the UI stories related to NeededBy.     Schema Changes: All  NeededBy and Rush properties in Entity Models should be deprecated by Obsolete(false) for now except the ones in AssayRequest.    The only NeededBy and Rush properties that will be saved to the DB will be in AssayRequest. The Reason and ReasonId properties in AssayRequest should be removed. The Reason Model should also be removed. A non-nullable boolean property should be added to the AssayRequest called FromManifest. No constraint on AssayRequest.FromManifest.  (In other words there can be more than one AssayRequest with FromManifest = true per SamplePanel.) No constraint on AssayRequest.Reason string property except for max stringlength. A nullable (not required) string property of maxlength=150 called Reason should be added to the AssayRequest. Modify the Big Delete sql script to no longer delete the Reason table. Modify the  Big Data Import script to remove the section that imports into the Reason table.  Logic Changes: Viewmodels and their queries that reference AssayRequest.NeededBy and AssayRequest.Rush should remain the same. Viewmodels and their queries for displaying Sample NeededBy and Sample Rush should use the AssayRequests and logic to harvest those values (see below). ViewModels and their queries for displaying Manifest NeededBy and Manifest Rush should also use the AssayRequests and logic to harvest those values (see below). Manifest Importing should be changed so it sets the AssayRequest.Manifest = true instead of assigning the now deprecated Reason.  The unit test in NCLims.NewBatchTests.ResultsServiceTest should be modified to imitate the logic in the comment above, meaning setting the AssayRequest.FromManifest = true instead of assigning a Reason. The unit test needs to apply the neededby date by using the same logic as Manifest  Logic for Sample.NeededBy and Sample.Rush  // The sample's needed by is the max needed by from all the FromManifest AssayRequests in the // Sample's SamplePanels. sampleNeededBys = sample.SamplePanels       .SelectMany(sp => sp.AssayRequests)       .Where(ar => ar.FromManifest)       .Select(ar => ar.NeededBy)       .ToList()  sampleVm.NeededBy = (sampleNeededBys.Any()) : sampleNeedeBys.Max() : null;  // The sample's Rush is true if any of the Sample's Samplepanel's FromManifest AssayRequests have // Rush = true. sampleRushes =  sample.SamplePanels      .SelectMany(sp => sp.AssayRequests)       .Where(ar => ar.FromManifest)       .Select(ar -> ar.Rush)       .ToList()   sampleVm.Rush = sampleRushes.Any();   Logic for Manifest.NeededBy and Manifest.Rush  // The manifest's needed by is the max needed by from all the FromManifest AssayRequests in the// Manifest's Sample's SamplePanels. manifestNeededBys = manifest.Samples        .SelectMany(s => s.SamplePanels)         .SelectMany(sp => sp.AssayRequests)        .Where(ar => ar.FromManifest)       .Select(ar => ar.NeededBy)       .ToList()   // The Manifest's Rush is true if any of the Manifest's Sample's Samplepanel's FromManifest // AssayRequests have Rush = true. manifestVm.Rush = manifestNeededBys.Any();

# NewBatch - Custom Build API call/response demo/testing environment

- **ID**: 2362
- **State**: Resolved
- **Assigned To**: Utkarsh Choudhary
- **Created**: 2025-03-14T16:47:11.47Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Build custom environment for documenting and testing API endpoint calls/responses.

# NewBatch - API Endpoint for Certificate of Analysis Template Management

- **ID**: 2363
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-03-17T15:33:29.05Z
- **Last Updated**: 2025-05-13T14:32:01.357Z

## Description

Create API endpoint for "CoA Templates" (PDFs). Create file storage system for multiple CoA Template PDFs.  Each lab can and will have multiple CoA templates, and should have the flexibility to upload multiple CoA templates that will give the lab flexibility.   MOTIVATING ISSUE: For tests not w/in ISO 17025 Scope of Accreditation, best practice is to exclude logo of ISO 17025 accrediting body from PDF/CoA.  Developer Notes Create one or more API endpoints that give each lab the ability to upload PDF templates for Certificates of Analysis. Store one or more PDF Certificate of Analysis templates. Assign each PDF CoA template an identifier and expose the identifier via API so that future user interfaces (to be developed as needed) can call on different PDF Certificates of Analysis that are available within any Lab (LabId). For example, in the future, we may want to be add a "Select CoA Template for This Order" feature that will allow the Reporting team to print results on the PDF CoA template of their choice, as needed, up to and including at the time of reporting.  Create flag "defaultCoaTemplate" or similar that will allow only one CoA PDF template at a time to be the "default" template for the lab (LabId). Seems like this would imply a flag, with some kind of data validation/logic to ensure it can only set as "1"/active for one CoA PDF template per lab at a time.  Create flag "archivedCoaTemplate" to support "soft delete" / archive / deprecation of CoA templates in the future.

# NewBatch - User Interface - PDF CoA Template Management

- **ID**: 2364
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-03-17T15:45:10.247Z
- **Last Updated**: 2025-04-25T19:02:33.697Z

## Description

Give users an interface that allows them to manage Certificate of Analysis templates that are available within the particular Lab (LabId).  Each lab can and will have multiple CoA templates, and should have the flexibility to upload multiple CoA templates that will give the lab flexibility.   MOTIVATING ISSUE: For tests not w/in ISO 17025 Scope of Accreditation, best practice is to exclude logo of ISO 17025 accrediting body from PDF/CoA.   Users must be able to: View all available CoA PDF Templates associated with the LabId. Set a "Default" CoA PDF Template associated with the LabId - could do this via a Sudoku-style user interface, or perhaps use existing CoA Formatting UI. "Archive" a default CoA PDF Template - "soft delete" to remove from the list of available Certificate of Analysis templates that will be displayed for user.

# NewBatch - API Endpoint for Prep Batch Creation

- **ID**: 2365
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-03-17T19:00:00.093Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Create API endpoints for each assay that exposes the fields relevant to the Prep Batch, including all batch objects, sample weights, dilution factors, extraction volumes that are logged on bench sheets.  Bench Sheets - Prep Batch Objects GET benchSheets/prepBatchObjects  **Ohio Heavy Metals** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) Prep Analyst Name Prep Batch Commencement Date Prep Batch Completion Date Microwave ID Repeater Pipette Serial Number 5-mL Pipette Serial Number 1-mL Pipette Serial Number 200-µL Pipette Serial Number ICPMS Spike Solution Heavy Metals Control Matrix / LCS SOP Number / Prep Procedure subsection Analytical Balance ID Sample Type (Matrix) HNO3 Lot (Nitric Acid) HCl Lot (Hydrochloric Acid) Prep Batch Notes  **Ohio Cannabinoids PP** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection Weighed By Extracted By Diluted By Weighed Date Extracted Date Diluted Date Acetonitrile Lot Isopropyl Alcohol (Isopropanol) Methanol (MeOH) Water Bath ID Sonicator ID Balance ID Repeater ID Prep Batch Notes  **Ohio Pesticides** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection [See Ohio Pesticides Bench Sheets for examples, go to Lists > columns E (SampleDesc aka SampleType) and F (PrepMethod - Procedure A, B, C, D - these will correspond to subsections of Ohio Pesticides sample prep SOP and this is a mapping of Sample Type x Prep Procedure)] Prep Analyst Name Prep Date Sample Type (Matrix) ACN Lot ACN Lot Expiration Date Hexanes Lot Hexanes Lot Expiration Date 1-mL Pipette Pump ID Waterbath ID Pesticides Spike Solution Pesticides Spike Solution Expiration Date Mycotoxins Spike Solution Mycotoxins Spike Solution Expiration Date Balance ID Control Matrix ID  **Ohio Terpenes** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection Prep Analyst Name Sample Prep Date Sample Type (Matrix) Bottletop Dispenser ID Bottletop Dispenser Calibration Expiration Date Pipette #1 ID Pipette #2 ID Analytical Balance ID ISES (Internal Standard Extraction Solution) Lot ISES (Internal Standard Extraction Solution) Lot Expiration Date ISWS (Internal Standard Working Solution) Lot ISWS (Internal Standard Working Solution) Lot Expiration Date ISDS (Internal Standard Dilution Solution) Lot ISDS (Internal Standard Dilution Solution) Lot Expiration Date Methanol (MeOH) Lot Methanol (MeOH) Manufacturer Methanol (MeOH) Expiration Date SOP Number / Prep Procedure subsection  **Ohio Residual Solvents Analysis (RSA)** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection Prep Analyst Name Sample Prep Date Sample Type (Matrix) Bottletop Dispenser ID Bottletop Dispenser Calibration Expiration Date Pipette #1 ID Pipette #2 ID Analytical Balance ID ISES (Internal Standard Extraction Solution) Lot ISES (Internal Standard Extraction Solution) Lot Expiration Date ISWS (Internal Standard Working Solution) Lot ISWS (Internal Standard Working Solution) Lot Expiration Date ISDS (Internal Standard Dilution Solution) Lot ISDS (Internal Standard Dilution Solution) Lot Expiration Date DMAc Lot DMAc Manufacturer DMAc Lot Expiration Date MCT Oil Lot MCT Oil Manufacturer MCT Oil Lot Expiration Date SOP Number / Prep Procedure subsection CS2B Lot CSG Lot  **Ohio Cannabinoids Flower** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection Sample Prep Date Sample Type (Matrix) Bottletop Dispenser ID Bottletop Dispenser Calibration Expiration Date (Calibration Due Date) Repeater ID Repeater Calibration Expiration Date (Calibration Due Date) Analytical Balance ID Analytical Balance ID Calibration Expiration Date (Calibration Due Date) Methanol (MeOH) Lot Methanol (MeOH) Manufacturer Methanol (MeOH) Expiration Date Laboratory Control Sample Lot  **Ohio Moisture Content** Prep Batch ID Prep Batch Status (Not Started, In Process, Ready for Analysis, Sent to Analysis) SOP Number / Prep Procedure subsection Sample Prep Date Sample Type (Matrix) Oven ID Oven Start Date/Time Oven End Date/Time Oven Start Temp Oven End Temp Initial Analyst Final Analyst  **Ohio Total Yeast and Mold by 3M PetriFilm** 3M PetriFilm - Rapid Yeast and Mold (RYM) Lot TYM Culture Stock Id TYM Culture Stock Strain TYM Culture Stock ATCC Number TYM Culture Stock Expiration Date TYM Culture Stock Spike Volume Negative Control Positive Control Sterile Flower (LCS) Lot Number Incubator Id Incubation Date/Time (Start) Incubation Date/Time (End) Incubation Temperature (Start) Incubation Temperature (End) Negative Control Positive Control  **Ohio Multiplex Microbial - TEMPO/GENE-UP (SOP-149)** Buffered Peptone Water (BPW) Lot Internal Amplification Control Lot TYM Culture Stock Id TYM Culture Stock Strain TYM Culture Stock ATCC Number TYM Culture Stock Expiration Date TYM Culture Stock Spike Volume Sterile Flower (LCS) Lot Number Incubator Id Incubation Date/Time (Start) Incubation Date/Time (End) Incubation Temperature (Start) Incubation Temperature (End) Negative Control - Laboratory Matrix Blank Lot Positive Control - Salmonella - Frozen Stock Id Positive Control - STEC - Frozen Stock Id Positive Control - C. albicans - Frozen Stock Id Positive Control - E. coli - Frozen Stock Id GENE-UP Pro STEC/Salmonella PCR Reagent Kit GENE-UP Lysis Kit TEMPO AC Test Kit TEMPO CC Test Kit TEMPO EB Test Kit TEMPO YM Test Kit Incubation Time Incubation Temperature     **Ohio STEC/E. Coli**   **Ohio Total Aerobic**   **Ohio Bile-Tolerant Gram-Negative (BTGN) Bacteria**   **Michigan Total Yeast and Mold (TYM)** Prep Batch Id Prep Start Date Prep Analyst Buffered Peptone Water (BPW) Lot Bottletop Dispenser Id Vortex Mixer Id TYM Culture Stock Id TYM Culture Stock Strain TYM Culture Stock ATCC Number TYM Culture Stock Expiration Date TYM Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Number Negative Control Positive Control  **Michigan Total Coliform Count (TC)** Prep Batch Id Prep Start Date Prep Analyst Buffered Peptone Water (BPW) Lot Bottletop Dispenser Id Vortex Mixer Id TC Culture Stock Id TC Culture Stock Strain TC Culture Stock ATCC Number TC Culture Stock Expiration Date TC Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Number Incubation Date/Time (Start) Incubation Date/Time (End) Incubation Temperature (Start) Incubation Temperature (End) Negative Control Positive Control  **Michigan STEC** Prep Batch Id Prep Start Date Prep Analyst Buffered Peptone Water (BPW) Lot Bottletop Dispenser Id Vortex Mixer Id STEC Culture Stock Id STEC Culture Stock Strain STEC Culture Stock ATCC Number STEC Culture Stock Expiration Date STEC Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Number Thermo-Shaker Id [Durable Asset]  **Michigan Salmonella** Prep Batch Id Prep Start Date Prep Analyst Buffered Peptone Water (BPW) Lot Bottletop Dispenser Id Vortex Mixer Id Salmonella Culture Stock Id Salmonella Culture Stock Strain Salmonella Culture Stock ATCC Number Salmonella Culture Stock Expiration Date Salmonella Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Number Thermo-Shaker Id [Durable Asset] Negative Control Positive Control  **Michigan Aspergillus (Medicinal Genomics)** Prep Batch Id Prep Start Date Prep Analyst Tryptic Soy Broth (TSB) Lot Bottletop Dispenser Id Vortex Mixer Id Salmonella Culture Stock Id Salmonella Culture Stock Strain Salmonella Culture Stock ATCC Number Salmonella Culture Stock Expiration Date Salmonella Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Negative Control Positive Control  **Michigan Aspergillus (BioRad)** Prep Batch Id Prep Start Date Prep Analyst Buffered Peptone Water (BPW) + Chloramphenicol Lot Bottletop Dispenser Id Vortex Mixer Id Salmonella Culture Stock Id Salmonella Culture Stock Strain Salmonella Culture Stock ATCC Number Salmonella Culture Stock Expiration Date Salmonella Culture Stock Spike Volume Pipette Id Analytical Balance Id Sterile Flower (LCS) Lot Number Incubation Date/Time (Start) Incubation Date/Time (End) Incubation Temperature (Start) Incubation Temperature (End) Negative Control Positive Control

# NewBatch - API Endpoint - Third Party User Management

- **ID**: 2367
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-03-20T10:10:15.767Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

_No description_

# NewBatch - Sop Management Service

- **ID**: 2368
- **State**: Active
- **Assigned To**: Dudley Chapman
- **Created**: 2025-03-20T14:28:33.71Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Create a service that will produce the CRUD dtos for the Sop Management API.

# NewBatch - LIMS6000 - Assay Management User Interface

- **ID**: 2370
- **State**: Active
- **Assigned To**: David Kohn
- **Created**: 2025-03-21T15:47:21.327Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

   To create an assay, we need to: - Name the assay. - Assign the assay an SOP number that will appear on CoA. - User must be able to select template CoA PDF (e.g., for samples for which we are not accredited, use a PDF template that does not have PJLA logo). - Determine if CoA for the assay will always have one sample on it (standard compliance CoAs, for example), or more than one sample (e.g. plant sex/plant virus testing, where samples are numerous and results are roughly binary (or indeterminate). Any limits on what samples can be selected and added to a single CoA? What guardrails are non-negotiable in terms of system limitations on what samples can be added to a single CoA? Prohibit results for a sample that have been previously reported from being added to another CoA - yes/no? What else would we need or want to control in terms of what sample(s) should / should not be grouped together on a single CoA? - Determine if the Certificate of Analysis will say "Pass/Fail" or "Tested/Not Tested" or, if it will vary, the basis/bases on which the logic to decide "Pass/Fail" vs. "Tested/Not Tested" will operate. - Generate example raw data files or otherwise specify how data will be obtained (e.g., user data entry; third-party API or instrument-connected API).  - Make a list of all measured analytes with CAS Number / LLOQ / ULOQ / MRL / MDL for each. - Determine if the assay is pass/fail. - Determine if the assay has a screening step, and, if so, the "pass/fail" criteria for the screening step that determine whether a quantitative analysis is required. - Determine whether any analytes are "computed" analytes, e.g. "analytes" that are not actually molecules that exist in the real world, but which exist in the abstract due to custom, regulation, or other reasons - e.g. "Total THC" (defined by law as the sum of the measured concentration of delta-9-THC + 0.877*measured concentration of THCA); "Spinosad" (Spinosyn A + Spinosyn D; EPA definitions adopting the naming convention and "pseudomolecule" approach of original manufacturer). - Make a list of all action limits applicable to the analytes in the assay, if any. - Determine whether we expect any co-elutions. - Determine whether we expect any updates to CoA Template footnote/disclaimer. - Make a list of all "prep" batch quality controls (e.g. laboratory control sample) with corresponding acceptance criteria. Positive controls, negative controls, spikes, duplicates, internal standards, ICVs, CCVs, LCBs, FM, etc.). - Make a list of all "analysis" batch quality controls (e.g. initial calibration verifications) with corresponding acceptance criteria and any automated/systematic implications. Must include, when applicable, a definition of the bracketing frequency for each type of quality control that is required by the SOP for the assay. System will need to solicit this information from the user at the time of assay creation. - Determine JSON formatting for transmission of "Generate Order on Confident Cannabis" "Laboratory Menu" item selection (Confident Cannabis > Settings > Laboratory > Menu to see and manage the "Laboratory Menu" in Confident Cannabis). - Determine formatting for transmission of analyte results to Confident Cannabis, if applicable. - Determine formatting for transmission of analyte results to Metrc, if applicable. - Determine whether the assay will allow for, require, or prohibit use of a moisture correction factor. - Determine "standard" and "RUSH" turnaround times (TAT). - Determine minimum sample weight for the assay. - Determine if there are "per serving" or "per container" or similar issues. - Determine if more than one replicate is permitted, required, or prohibited on first analysis (e.g. "Blind Duplicate" rule requiring cannabinoids analysis to consist of two replicates if the sample is from a customer SKU not identified in lab records/history as having been tested). - Determine default dilution, sample weight, extraction volume for bench sheet user interface/data entry/data capture at point-of-preparation. - Assess "lab assay" vs. "reportable assay" one-to-one, one-to-many, and one-to-many issues with respect to Certificate of Analysis. 	-	The two questions to ask, always, are: 		- "Is this one or multiple tests from the sales/customer service point of view?" and  		- "Is this one or multiple assays from the lab/analysts' point of view?" 			-	One-to-One:		For example, Heavy Metals. Heavy metals are simply reported on the heavy metals page of the CoA, and in a "Heavy Metals" summary box on the front page. 			-	One Assay-to-Multiple CoA pages:	For example, Michigan Vitamin E Acetate and MCT Oil are analyzed in a single assay but reported on separate CoA pages and with different summary boxes on the front page; same situation with Ohio mycotoxins and pesticides, which are analyzed as a single assay but reported on separate Certificate of Analysis pages and in different Certificate of Analysis summary boxes. In both cases, the "reportable assays" each gets a separate summary box and individual page for the analyte(s) on CoAs. 			-	Multiple Assays-to-One CoA page:	Michigan "Chemical Residue Analysis" in which LIMS publishes the CoA page for "Chemical Residues" by pulling together results from two separate LIMS assays/batch workflows, specifically Chem Res by LC1/Chem Res by LC2. Will the testing that we conduct that the sales team refers to as "Nutrient Testing" but which really consists of three separate preparations and measurements ("Total Sulfur" + "Elemental Analysis" + "Nitrogen"). The two questions to ask, always, are, "Is this one or multiple tests from the sales/customer service point of view?" and "Is this one or multiple assays from the lab/analysts' point of view?" - Flexibility to accommodate things like TEMPO/Gene-Up Barcodes? Miscellaneous/open fields in data tables that we could rename?

# NewBatch - API Endpoints - POST Analyte Names, CAS, iLLOQ, iULOQ, MRL, MDL, CC Compound Category, CC Compound name.

- **ID**: 2374
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-04-03T09:23:15.35Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Story #2375 is a prerequisite to this story - must be completed prior!  ---  Once Story #2375 is completed -   Provide API endpoint that allows a credentialed user to POST the following to the correct data table(s).  Analyte,CAS,iLLOQ,iULOQ,MRL,MDL,CC compound Category, CC compound Name  + PARSER TO IMPORT EXCEL OR CSV WITH THIS INFORMATION / THESE HEADERS

# NewBatch - Add Method Reporting Limit (MRL) and Method Detection Limit (MDL) fields to data tables

- **ID**: 2375
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-04-03T10:19:45.83Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

We need to add fields for Method Reporting Limit (MRL) and Method Detection Limit (MDL).  These are at the analyte level, due to the fact that different analytes within a single assay can (and often do) have different reporting and detection limits.

# NewBatch - API Endpoint - POST Standards Prep Log Data

- **ID**: 2376
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-04-03T10:34:36.807Z
- **Last Updated**: 2025-05-12T14:02:06.167Z

## Description

Developer Notes Create API endpoint(s) via which the lab can POST all of the data captured in the Standards Prep Log, when the user completes the prep log and clicks a button (e.g. Save or Submit). Also needs to GET available purchased reagents from which stock standards are prepared.  GET available purchased reagents that are combined to make prepared standards/reagents. POST created stock standards and other controls.

# NewBatch - API endpoints for Clients

- **ID**: 2379
- **State**: Resolved
- **Assigned To**: Safi Ullah
- **Created**: 2025-04-03T18:31:17.637Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

we want to create new user interface for Clients module in the new app and this story is to create the API backend endpoints to support the frontend app to consume.

# NewBatch - Add "Nutrients" Reportable Assay and Component "Lab Assays"

- **ID**: 2380
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-04-03T18:50:12.19Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

Reportable Assay Type:					Many-to-OneReportable Assay Name:					"Nutrients" Labs:									1001, 1003 State:									Ohio, Michigan Lab Assay #1 (LA1) Name:				Elemental Analysis Lab Assay #1 (LA1) SOP:					SOP-XXX Lab Assay #2 (LA2) Name:				Total Nitrogen Lab Assay #2 (LA2) SOP:					SOP-136 Lab Assay #3 (LA3) Name:				Total Sulfur Lab Assay #3 (LA3) SOP:					SOP-139 Analyte CoA Formatting:					[If different from Analyte Name] Compliance Test (Pass/Fail):			No Action Limits:							N/A CoA Output:								Quantitative values (float) w/ standard rounding/sigfigs/decimals by lab/state. CoA Summary Box:						Tested/Not Tested Screening Step:							No Co-Elutions (if yes, provide details):	[None] Co-Elution CoA Disclaimer Required:		[None] Confident Cannabis API Category:		Nutrients Confident Cannabis API Analytes:		Sulfur,Nitrogen,Magnesium,Phosphorous,Potassium,Calcium,Manganese,Iron,Nickel,Copper,Zinc,Molybdenum,Boron Metrc API:								N/A Standard Turnaround Times:				[N] [calendar/business] days from ReceivedOn date, [including/excluding] ReceivedOn date. Rush Turnaround Times:					[N] [calendar/business] days from ReceivedOn date, [including/excluding] ReceivedOn date. Minimum Sample Weight:					[TBD] Minimum Sample Volume:					[TBD]

# NewBatch - Clients FE with API integration

- **ID**: 2391
- **State**: New
- **Assigned To**: Safi Ullah
- **Created**: 2025-04-15T13:51:54.543Z
- **Last Updated**: 2025-05-08T13:38:51.1Z

## Description

_No description_

# NewBatch - One Prep Batch to Many Analytical Batch functionality

- **ID**: 2392
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2025-04-15T14:27:15.863Z
- **Last Updated**: 2025-05-06T13:40:02.717Z

## Description

We need to be able to send samples from a single prep batch to multiple analytical batches.  There will be samples that are in the (single) prep batch that are in one or the other of the analytical batches, but not both.

# NewBatch - Quality Controls and Preparations

- **ID**: 406
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2021-02-17T20:02:47.35Z
- **Last Updated**: 2024-10-15T16:01:28.397Z

## Description

Requirements: User interface with a list of all quality control item types available. Prepopulate with existing quality control item types. Group by assay.   User interface will allow users to create new quality control types. Allow users to establish acceptance criteria (high/low limits) for quality controls. Percent Recovery: the control has a known and expected value, and the percent recovery is the percentage of the known and expected value generated by the analysis. Percent recovery can be less than or greater than 100%. If a control is known to have a concentration of 1 µg/mL, and the result from the instrument says that the control sample has a concentration of 1.5 µg/mL, then the "recovery" is 150% of the known value.    Allow users to create separate classes of acceptance criteria for quality controls within a single assay. For example, Ohio terpenes are divided into two groups for QC purposes - referred to in SOP as "QC Type 1" and "QC Type 2" - with different acceptance criteria for each group; types based on frequency:QC Type 1 representing those analytes that are observed at >5xLLOQ in at least 10% of test samples, based on an evaluation of 392 samples analyzed between 5/2/2022 and 5/10/2022, and  QC Type 2 representing analytes observed at >5xLLOQ in less than 10% of test samples.

# NewBatch - Quality Controls and Preparations

- **ID**: 406
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2021-02-17T20:02:47.35Z
- **Last Updated**: 2024-10-15T16:01:28.397Z

## Description

Requirements: User interface with a list of all quality control item types available. Prepopulate with existing quality control item types. Group by assay.   User interface will allow users to create new quality control types. Allow users to establish acceptance criteria (high/low limits) for quality controls. Percent Recovery: the control has a known and expected value, and the percent recovery is the percentage of the known and expected value generated by the analysis. Percent recovery can be less than or greater than 100%. If a control is known to have a concentration of 1 µg/mL, and the result from the instrument says that the control sample has a concentration of 1.5 µg/mL, then the "recovery" is 150% of the known value.    Allow users to create separate classes of acceptance criteria for quality controls within a single assay. For example, Ohio terpenes are divided into two groups for QC purposes - referred to in SOP as "QC Type 1" and "QC Type 2" - with different acceptance criteria for each group; types based on frequency:QC Type 1 representing those analytes that are observed at >5xLLOQ in at least 10% of test samples, based on an evaluation of 392 samples analyzed between 5/2/2022 and 5/10/2022, and  QC Type 2 representing analytes observed at >5xLLOQ in less than 10% of test samples.

# NewBatch - Cannabinoids/Terps for Plant Material - display moisture content and adjusted sample weight in Primary Review

- **ID**: 522
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2021-04-01T14:28:51.807Z
- **Last Updated**: 2024-10-17T13:24:49.14Z

## Description

Abstraction of this story is "Enable/Disable Moisture Correction" by assay, for example, moisture correction might be permitted in one assay but not another (e.g., compliance testing could forbid moisture correction while a non-compliance test, for example, terpenes, could allow it).  This would be a part of assay control.

# NewBatch - METRC API - Update METRC with package adjustments

- **ID**: 613
- **State**: New
- **Assigned To**: Unassigned
- **Created**: 2021-04-20T18:52:48.093Z
- **Last Updated**: 2024-10-17T13:25:29.46Z

## Description

We need to update METRC daily with every deduction of every sample aliquot taken throughout the day, with the ability to (1) run reports more than once per day, if necessary, and (2) run reports across multiple days, if we miss a day or two.  CSVs must abide by METRC's CSV structure rules - file attached, note METRC uploads are case-sensitive for the sample ID ("package label"), Unit of Measure, and Employee License Number.  CSV example is attached to this work item."Adjustment Reason" for all = Contaminant Testing"Grams" always capitalizedEmployee License Number: MMCPE00472The following are all of the items that are, by definition, "Each" quantities in METRC and therefore in LIMS.  In the METRC CSV, deductions for these items should be entered as "0" in the numeric field and then the actual number of grams for the aliquot(s) in the Number 5 Adjustment Notes field as a string, to account for the fact that sample weight was actually used in analysis but cannot be adjusted downward due to Metrc system limitation that prevents deductions of less than a full unit of "each."Format for "Each"es:ABCDEF012345235223641246436,0,Each,Contaminant Testing,-0.xxx g used in testing,2021-05-10,MMCPE00472


Capsule for Oral Administration


Edible for Oral Administration


Bulk Edible


Lotion/Cream for Topical Administration


Metered Oil or Solid for Vaporization


Oil for Oral Administration


Recalled Concentrate


Seeds


Tier I Plant Material for Vaporization


Tinctures for Oral Administration


Transdermal Patches
Also - if we do not have items above e.g. "Recalled Concentrate" or "Tier I Plant Material for Vaporization" already in our database, no need to include at this juncture.Add PackageAdjustmentReported bool to RawData table and SamplePanel table.

# NewBatch Results - "Send for Reprep" / "Re-Analyze" buttons that creates new replicates, available for batching

- **ID**: 970
- **State**: New
- **Assigned To**: Adam Scavone
- **Created**: 2021-10-25T17:22:18.663Z
- **Last Updated**: 2024-10-15T16:12:24.223Z

## Description

(1) Add "Re-prep" and "Re-analyze" buttons at the sample level to Primary Review and Secondary Review screens. (2) When user clicks "Re-prep" or "Re-analyze" button, dialog box appears:        a. User selects number of replicates to be reprepped/reanalyzed.          i. Default of 2 replicates for all assays, with value exposed so that user can change the number.        b. Expose "Dilution" for each replicate so that the user can prepare identical or different dilutions.          i.         c. Dialog box will have "Confirm Re-prep" /  "Confirm Re-analysis" button. (3) Once user clicks "Confirm," the AssayRequest is made at the appropriate level (Re-Prep - causes sample to be "Not Batched" // Re-Analyze - makes available a previously-prepared customer test sample for inclusion in an analytical batch.  Adam add Reprep button on Sample Level

