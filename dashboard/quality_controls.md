**From: A. Scavone**

**Re: LIMS6000 Sustainability Strategy**

**Date: March 21, 2025**

**Note:**

The following has been written for two audiences – one human, the other robot. We need to be able to feed this into various AI/LLM systems for various purposes, and thus sections of writing that may appear extraneous, repetitive, or otherwise odd to the human reader. I apologize in advance.

**Known LIMS Issues and How Each is (or is not) Being Addressed in LIMS6000:**

1. LIMS5000 lacks robust, easily-accessible tools to enable traceability of critical factors within and across batches – currently overcome by our array of Excel VBA-enabled workbooks that patch over this critical flaw/original sin in LIMS development.
    1. Severity Level: 10
    2. Frequency/Persistence: 10
    3. Detail: Vastly insufficient infrastructure to support QA/QC activities throughout assay workflows held together only by an exoskeleton of Excel workbooks that require at least one full-time employee to maintain, and which exist almost exclusively to address “operational gaps” – things that need to get done that LIMS simply does not do.
        1. LIMS5000 does not parse and track “batch objects” – the universe of items and systems used in the analytical process (from the balances and equipment used for sampling in the field at the time of sample procurement, to software used in the testing process (e.g. LabSolutions version used by the lab to process data), to calibrated pipettes, bottle-top dispensers, analytical balances, and other equipment, to qualifications of personnel, i.e., system does not (but should) track users’ Demonstrations of Competency, translate them into roles/claims/permissions in LIMS, and authorize, prohibit, or provide limited access based on context.
            1. LIMS6000 has a “first draft”of data tables already built for instruments, durable equipment (e.g. pipettes, test weights, sonicators, etc.), purchased and prepared chemicals and reagents, and calibration standards (including data tables to support digital versions of standard prep logs).
                1. These are not set in stone and can and will almost certainly be modified. We need to review these proposed schema and either adopt it, propose changes and discuss with developers, or abandon it.

Adam to circulate proposed data table schema for:

Instrument management.

Durable lab equipment management.

Purchased chemicals/reagent management.

Calibration standard/stock management.

- - 1. LIMS5000 does not recognize, record, display, evaluate (pass/fail), or otherwise handle quality control matters that are nearly universally included in analytical testing, including chemistry (e.g. calibration verifications, blanks, standards, etc.) and microbial assays (e.g. negative and positive controls for various microbes).
            1.  LIMS6000 roadmap includes data tables for quality controls.
                1.  We should discuss this whole concept and refresh the roadmap.
                2.  LIMS6000 will include a table that will effectively operate as a taxonomy of quality controls, so that we can accommodate new and functionally identical-but-differently-named quality controls when adding new assays (and “adding back” existing assays).

For example, at the most abstract level, “blanks” / “negative controls” have the common property that they are generally expected and required, absent reasonable, documented exigent circumstances, to yield measures of “Not Detected” for quality control purposes.

“Add an Assay” component of LIMS6000 will give users the option to select multiple QC typologies, and add those QC typologies to a batch (e.g., bracketing CCV with bracketing requirements; also accommodating opening QCs such as SSC and any closing/shutdown QC).

1. “Needed By” / Rush / TAT have several problems.
    1. “Microbial” is treated as a single assay, instead of a collection of assays, each with its own source of data and each of potentially differing durations.
        1. Severity Level: 10
        2. Frequency/Persistence: 10
        3. LIMS6000 will address this by creating separate assays under a “microbial” heading, so that samples that need “one-or-more-but-not-all” customer test samples that today come in under “micro” as a monolithic assay will instead only appear in workflows for required assays currently subsumed by the “microbial” label.
    2. “Rush” flag still operates as compromised circa April 2021, with “NeededBy” date for the assay set to the same date the sample is received.
        1. Severity Level: 10
        2. Frequency/Persistence: 10
        3. LIMS6000 addresses this problem in a two-step process, first by moving “NeededBy” from the sample level to the assay level, to accommodate situations in which a customer needs one but not all assays rushed, or where one rush date (potency, for example) is earlier than another rush date (micro, for example), and second, by “promoting” Rush queues at critical user interfaces, e.g. lab technicians, primary and secondary review queues, reporting.
2. LIMS5000 insufficiently robust against user error and customer change requests. Far too many events require developer intervention to fix.
    1. User errors and customer order change requests post-receiving – especially for changes of TestCategory, but also addition/removal of tests after an order has been submitted – often require extensive developer assistance to untangle.
        1. Severity Level: 10
        2. Frequency/Persistence: 1
        3. \[LIMS6000 will address this problem by \[TBD\].
    2. Outside events require developer assistance to manage.
        1. Changes forced by Metrc require developer assistance to manage.
            1. Severity Level: 3
            2. Frequency/Persistence: 1
            3. METRC API changes require developer assistance to update to avoid losing connections.
                1. LIMS6000’s API-centric approach directly ‘addresses the sustainability challenge posed by Metrc operating updates (e.g. upcoming April 1, 2025 deadline to move to Metrc API v2 from Metrc API v1) by giving us (the lab) control of user interfaces that mediate between Metrc and our databases; if Metrc merely shifts things, we can re-connect APIs with little cost, and will only incur developer cost if/when Metrc introduces novel functions (none so far in ~5 years).
            4. When a state regulator creates a new “Test Category” – e.g. “R&D Testing – STEC/Salmonella” in Ohio, announced without warning, with new Metrc reporting requirements (including text formatting requirements for results submission under the new TestCategory).
                1. LIMS6000 will handle TestCategory changes via direct updates to the TestCategory table, which identifies all Metrc “bundles” of tests, e.g. Raw Plant Material (Michigan), Dispensary Plant Material (Ohio), which define’s Metrc’s expectation of the required analyte values to be sent back to cause their system to change the sample from “SubmittedForTesting” to a final outcome of “PassedTesting” / “FailedTesting” as applicable.
    3. Changes to Certificates of Analysis require developer assistance when simple textual changes to the footnote/disclaimer are required.
        1. Severity Level: 3
        2. Frequency/Persistence: 1
        3. LIMS6000 will have a restricted-access user interface that allows self-service upload of CoA templates, with version history and access to current and deprecated CoA templates (by lab).
3. Insufficiently Specific Sample Type (Matrix) Designation.
    1. Severity Level: 6
    2. Frequency/Persistence: 10
    3. With LIMS5000, we compromised long ago by choosing to rely on Metrc “Item Category” to categorize matrices for testing, instead of developing and applying (at receiving) our own nomenclature and schema, which gives us much tighter control over matrix designation when receiving samples into inventory and categorizing them for testing purposes.
        1. This compromise in LIMS5000 avoided imposing a requirement on our users, but this was likely a Pyrrhic victory insofar as it missed an opportunity to provide greater resolution, insight, clarity, and even automation post-receiving.
    4. LIMS6000 addresses this problem by requiring a North Coast user to select a “Sample Type” (matrix) from a pre-populated list at the time of receiving.
4. LIMS5000 was not built to support barcodes.
    1. Severity: 3
    2. Frequency/Persistence: 10
    3. LIMS6000 can be built to support barcodes. We need to identify our “wish list” of uses and build data tables to support those uses.
    4. Define how barcode information will be used for:
        1. Customer test samples.
        2. Quality controls.
        3. Inventory.
        4. Bench sheet data capture (i.e. scan solvent bar code at start of prep).
        5. What else?
    5. Who is scanning what barcodes upon which actions? What information will be transmitted to LIMS, and what downstream effects is that intended to have in LIMS? These are questions for North Coast team to answer.
    6. The data flows kicked off by barcodes can be (and often are) complex, but the barcode scanner operates simply as an auxiliary keyboard, and we can scan anything we want any time (although round/curved jars have been a problem – likely cured by a high-end barcode scanner in the $400-500 range).
5. LIMS5000 does not have a good way to handle the persistent problem of kief, which is simultaneously a “Concentrate”/“plant material” and a “processed product”/non-plant material – e.g. Ohio, where “kief” is a “processed product” for cannabinoids quantification and “plant material” for purposes of microbial action limits.
    1. Severity: 5
    2. Frequency/Persistence: 8
    3. LIMS6000’s requirement of entering a Sample Type resolves this issue by allowing samples of SampleType “Kief” to receive “Kief” treatment, and eliminating the reliance on “Non-Plant” / “Plant” as the driver of action limits (possibly hardcoded to work correctly at the moment in production LIMS).
6. LIMS5000 requires developer assistance to modify an assay in any way.
    1. Severity: 5
    2. Frequency/Persistence: 5
    3. LIMS6000 will allow us to add/modify analytes for the entire system, including management of analytes within assays.
        - 1. LIMS6000 roadmap fundamentally assumes that there will be an “Assay Management” module that includes:
                1. Assay’s analytes with their CAS numbers, iLLOQs, iULOQs, and MRLs.

Also possibly a good place to address subtypes e.g. Ohio “Terpenes Class I” / “Terpenes Class II” with different acceptance criteria depending on the analyte’s “terpenes class.”

We should deal with this particular issue in the abstract, as there may be other reasons in the future to divide analytes within an assay into different classes.

- - - - 1. Assay-level QC requirements:

Prep controls and traceability (e.g., LCS acceptable, LCB clean or no analyte reported, prep tech had valid DOC at time of prep, etc.)

Analytical controls (% recovery, calibration blanks, internal standard, etc.) including bracketing/frequency requirements of various controls within an analytical batch/instrument run.

1. No means of toggling between labs without logging out and logging back in with a “dummy” email address.
    1. Severity Level: 3
    2. Frequency/Persistence: 10
    3. LIMS5000 architecture limits one user to one email address and one lab, which has necessitated a jerry-rigged system in which every NCTL user with job responsibilities or a need for data access in both labs must maintain two accounts, one of which uses a dummy email address field such as “ascavone**M**@nctl.com” – a fake email address with “M” for “Michigan” appended to it, to solve the problem of being one person with a need to access both labs.
    4. LIMS6000 roadmap addresses this by providing a “toggle” that persists at the top of the screen across all user interfaces that allows the user to switch between labs to which the user .
        1. Adam to work with developers to better define necessary data tables to support one-to-many relationship between Users and Labs.
2. LIMS5000 has no native bench sheet creation or management, and therefore critical sample prep data are recorded and maintained in Excel workbooks outside of LIMS.
    1. Severity Level: 10
    2. Frequency/Persistence: 10
    3. Effectively prevents a user from tracing a sample’s results within a batch (and subject to analytical batch-level and bracketing-level quality controls), reviewing the results and the context in which the result was determined to be reportable (or not reportable, in the case of, for example, identified laboratory error), which prevents coherent investigations of potential causes of error (e.g. no means of sorting data in a manner that, in the course of an investigation, should lead to, for example, a bad pipette causing every sample prepared with that pipette to be over-diluted, thereby erroneously and incorrectly reducing the reported concentration of all analytes included in the assay.
    4. Insufficiently timely downward adjustment of on-hand marijuana inventory in Metrc after the marijuana was used/destroyed in the process of testing was an “observation” by the Ohio Division of Cannabis Control on our last annual inspection, consumes significant labor despite extensive measures to automate as much as possible given current constraints, and is a priority issue.
        1. Severity Level: 9
        2. Frequency/Persistence: 10
        3. LIMS6000 addresses this issue by providing API endpoints that can recognize and log a deduction of any sample that comes from inventory that requires reporting via Metrc, and which has some portion of the sample destroyed in the process of and by the nature of testing.
            1. Primary concern is timely adjustments of sample packages in LIMS inventory.
3. LIMS5000 requires developer assistance for insight into what the system actually does and/or what the system did in a particular instance.
    1. Severity Level: 5
    2. Frequency/Persistence: 5
    3. Limited and unstructured documentation of the system and its calculations impedes North Coast’s insights, and requires a developer to walk through existing code to verify LIMS behaviors and outcomes (“Why does the Certificate of Analysis say X instead of Y for this sample?”).
        1. LIMS6000 addresses this by providing direct access to code repositories in DevOps, allowing us to monitor and manage existing code, and add to the code base as necessary over time.
            1. LIMS6000 structure is being developed to minimize the need to hire outside developers, and to minimize the learning curve for those developers when we do need to hire.
                1. API-centric structure allows us to minimize developer time to organizing and building tables/schema for new concepts/features/functions with no analog in what we are doing as of today.
                2. We need to go through the code repository with developers ahead of time and take notes on where calculation modules reside.
        2. Only documentation is LIMS QA Testing Guide (most recent revision as of January 30 2025), which itself has not undergone QA and/or been fully tested, step-by-step, against LIMS QA/Staging.
            1. Severity: 7
            2. Frequency/Persistence: 10
            3. LIMS6000 can address this any way we want.
                1. LIMS-embedded documentation in HTML or other web-native format rather than PDFs that exist solely in Teams.
                2. For existing code, in the absence of developers, our direct access to Azure DevOps Repository, where all code for the system (including code in development and code in production), we can view, understand, and summarize the code any way we want. We can also copy and paste code into AI/LLM systems for assistance understanding what the code is doing.
        3. Documentation regarding updates are fragmented, generally not communicated, scattered throughout Windows environment – lab-wide emails, individual emails, assay-based Teams channels, individual Teams messages – all with varying degrees of visibility, depending on which users are checking what and where.
            1. Severity: 9
            2. Frequency/Persistence: 5
            3. LIMS6000 has vague notion of “provide audit functionality” on roadmap but we do not have an explicit, agreed-upon list of events within LIMS that should be recorded to a database. Lab needs to create a list of critical search/sort/filter variables/fields to enable audit functions (generally speaking - logged in user, date/time, authentication methods, action taken, values and/or states changed).
                1. Changes to calculations and indeed all software changes are accessible and auditable within Azure DevOps / Source Control.

LIMS6000 addresses direct control over audit function for source code by providing North Coast IT department direct access to repositories and change/changeset history.

This is, as with LIMS software QA, necessarily outside of the limits of the software itself, and reflects something that needs to be embedded into North Coast Quality System.

LIMS6000 also provides us the opportunity to create our own data processing extensions that will appear “native” in LIMS, giving us complete visibility into, and control over, computations and “business logic” operating within LIMS.

1. LIMS5000 does not adequately support microbial testing operations.
    1. LIMS6000 addresses this by forcing us to consider each “microbial” assay on its own terms, and to add each “microbial” assay, and to go through the process of ensuring that, for reporting purposes, the “Microbial” page correctly lists all microbial analytes and their respective results, which will likely come from multiple assays.
    2. LIMS6000 will provide data tables for recording batch incubation start/end times and temperatures for assays that require incubation.
    3. LIMS6000’s resolution of faulty/misleading “RUSH” “NeededBy” dates will remove some chaos that the LIMS itself is currently injecting into the universe.
    4. LIMS6000 will be capable of supporting “confirmation queues” for microbial “fails.”
2. LIMS5000 has all-around clunky user interfaces.
    1. LIMS6000’s API-centric approach exposes data (via GET functions that pull data from LIMS) and data fields (via POST functions that allow clients to send data to LIMS)
3. LIMS5000 forces us into many absurd “workarounds.”
    1. LIMS5000 requires Michigan “QFQN” rigamarole for pesticides analysis.
        1. LIMS6000 Assay Management will allow a lab to create an assay as a two-step screening/quantitation assay, and any sample subject to that assay will have the screening/quantitation logic applied to the processing and reporting of its results.
    2. LIMS5000 for Ohio and Michigan have “dummy” workflows – nutrient testing (three separate assays - elemental analysis/total nitrogen/total sulfur), virus testing, plant sex testing that do not actually let users process data or report sample results on Certificates of Analysis or otherwise.
        1. LIMS6000 addresses this by putting the challenge of adding an assay on us as the lab, with responsibility for managing LIMS.
            1. Performs a forcing function for both the lab and the development team to build the API-centric system in a manner that the lab can either objectively use, or objectively not use.
            2. Forces the lab to think through critical elements of each assay.
            3. Forces the lab to think through critical elements of _all_ assays.
                1. What is the nature of an assay?
                2. How can we structure our data tables such that we can add assays on a self-service basis?
            4. Take conclusions from understanding of commonalities across all assays and use those to build “Add an Assay” feature.
                1. In the process, identify “lesser” changes – changes that do not constitute a new assay – for “Manage an Assay” LIMS6000 feature purposes.
4. LIMS5000 has no QuickBooks integration.
    1. LIMS6000 requires the same thing that LIMS5000 does to get this working: for us to create mocked-up Quickbooks “.iif” files.
        1. David Kohn has taken on primary responsibility for this project.
            1. Met with Dan Morrison on 3/19/2025.
            2. Next step is to see if we can create an invoice for Rope-A-Dope in QuickBooks sandbox “company” profile, and successfully import it into QuickBooks.
5. LIMS5000 has no way to deprecate assays. For example, Michigan “Chem Res by GCMS” and “Chem Res by LCMS” have persisted for years since last run.
    1. LIMS6000 will have an “Assay Management” user interface that will allow administrators to deprecate/archive existing assays.
        1. Deprecation/archiving will remove the assays from all user interfaces.
        2. Existing data will persist in tables in “cold storage” unless/until needed.
            1. Reasonably easy to get the data out.
6. LIMS5000 batch and sample names lack meaningful information and tacitly disclose sample pace (although sample pace arguably discernible from Confident Cannabis sample IDs regardless of our internal sample ID designation).
    1. For LIMS6000, we need to develop and document our final decisions regarding how we want this system to format and automatically batch names and sample names.
        1. Do we want a system-wide batch naming structure?
        2. Lab-specific?
        3. Assay-specific?
        4. Some combination thereof?
        5. Incorporate dates and what else into batch name?
        6. Anything to incorporate into Sample ID?
        7. Other?
7. LIMS5000 uses extraction volumes in L instead of mL, when our actual operations are conducted in units of mL or smaller.
    1. LIMS6000 addresses this by using mL as the default unit of extraction volume measure instead of L.
8. LIMS5000 has no Method Reporting Limit (MRL) functionality.
    1. LIMS6000 will address this by adding an MRL parameter to the system’s table of analytes, alongside iLLOQ and iULOQ.
    2. LIMS6000 will support API POST endpoints, which will allow us to transmit rows of data to the data tables that we structure and maintain.
        1. This give us the ability to control and document (for traceability purposes) the exact nature of the data that we sent into the system via our API, thereby providing transparency at the level of the code the system is running to generate or otherwise obtain data that ends up in LIMS and reported to third parties (e.g. customers, Metrc/state regulators, Confident Cannabis, etc.).
9. LIMS5000 causes us to maintain a bunch of other custom-developed third-party programs, e.g. Ohio and Michigan “Snapshots” programs, Ohio’s Metrc Package Adjustment program (run daily by Danny; covered elsewhere in this document).
    1. Severity: 8
    2. Frequency/Persistence: 10
    3. LIMS6000’s API-centric nature, with clear, well-labeled, functional API endpoints for authorized users to GET and POST relevant data under clear contracts gives us the ability to control data process and output formatting (e.g. the ability to build LIMS-native snapshots)
10. Safety features, for example, Ryan’s long-pending request to prevent system from allowing a user to click “set to complete.”
    1. LIMS6000 will address this by fully incorporating a primary and secondary review, which, combined with multifactor authentication for logged-in users, will prevent release to sample queue.
    2. We need to define in writing what will happen when an edge case: a sample or batch makes it through secondary review and then subsequently needs to be prevented from being reported (e.g., a late discovery of lab error).
11. Lack of control charts.
    1. LIMS6000’s central premise is that data, including analyte data at the sample and quality control level, will be available in a neutral format to anyone to whom we have granted API access, allowing for pulling and graphing the data behind every “test item” (a term intended to encompass every customer sample/replicate and every quality control item included in a relevant batch).
    2. First test case of this is Potency Target Review Queue, discussed below.
12. LIMS does not support operational needs for Potency Target Review.
    1. Indeed, LIMS attempts to support potency target review, but may aggravate the situation.
    2. This is the LIMS6000 proof-of-concept case for building the new system with a focus on API endpoints, maximizing our ability to customize the ways we interact with the data while minimizing development costs by exposing the data. This is nearly complete; expecting to pass final software QC during first week of April.
        1. This will roll out in existing LIMS, and, assuming it proves useful and gets adopted, will survive the transition to LIMS6000.
13. Critical functions have opaque names in user interfaces, e.g. “Sudoku Tables” for export and re-import of settings changes for critical functions.
    1. Severity: 6
    2. Frequency/Persistence: 10
    3. Ease of changing: 10
    4. Highlights a serious issue – nomenclature – Sudoku tables, “AverageResult” / “AveragePc” are two top-tier offenders. “AverageResult” / “AveragePc” highlight the fact that the system presumes averaging (determining the mean of a number of replicates).
        1. LIMS6000 addresses “AverageResult” (reportable result _without_ units of measure – value only) / “AveragePc” (reportable result without units of measure, value only, scaled to % for cannabinoids and terpenes reporting) – variable naming conventions adopted in 2020 in the first week of development, by developers, based on the specification for Ohio that all non-excluded replicates would be “averaged” – have asked for this nomenclature to be changed to “ReportableResultValue” and “ReportableResultPc”.
        2. LIMS6000 will change “Sudoku” naming convention and likely move the critical database management functions (e.g. tracking of LOQs, analyte limits, etc.) into more natural/organic “fits” for user interfaces rather than segregating them into a separate, standalone user interface.
14. No means of systemically amending certificates of analysis and controlling versions thereof.
    - 1. Severity Level: \[CAROL\]
      2. Frequency/Persistence: \[CAROL\]
      3. Fields repeat throughout documents, and can require extensive manual updating of draft Certificates of Analysis (CoAs) when CoAs need to be updated, as happens from time to time, for example, LIMS and our Quality System agree that the Confident Cannabis Order and Sample ID number (formatted as \[CCOrder\].\[CCSampleId\] e.g. 0314NCTL1234.1001) constitute the report identity (i.e., alphanumeric identifier/serial number) for ISO 17025 traceability purposes. Amended reports, per ISO 17025 requirements and North Coast SOPs, require amendments of reports to reflect the fact they have been amended and
      4. For LIMS6000, we need to define how we want to systematically update reports.
            1. Consider creating a report amendment process from scratch, as much as possible within LIMS (particularly with regard to version control of
                1. **We should use this as an opportunity to abandon reliance on Confident Cannabis ID as a report identifier over the long term** to reduce risk of dependency on Confident Cannabis/prepare in case Confident Cannabis disappears as a vendor.
                2. Process should preserve original report and a true/correct copy of every subsequent report.

Presumably in some kind of “cold” file storage, with a record locator that pulls the PDF any time anyone needs it.

1. Every sample requires Metrc – formatted 24-character entry to satisfy data validation requirement in LIMS that the Metrc Package # field is included.
    1. Severity Level: Unclear if there is any actual problem.
    2. Frequency/Persistence: 10
    3. Would be nice to auto-generate and potentially include more information in the 24-character pseudo-Metrc package tag.
    4. Requirement for exactly 24 characters ensures consistency of data format (24-character string) and can augment searchability.

**Definitions:**

“Us” or “we” or “the lab” or “North Coast” in this document refers to the end users (including administrators) of the laboratory information management system (LIMS) of North Coast Testing Laboratories, LLC and North Coast Testing Laboratories of Michigan, LLC, the subject of this overview. We are an analytical testing laboratory with two locations (Ohio and Michigan), testing for two separate state regulatory programs, with two entirely separate and distinct obligations for compliance purposes, but with shared personnel, information, systems, and other structures (with relevant divisions and safeguards) on the back end.

“LIMS5000” or “the existing system” or “LIMS v1” or “v1” or “version 1” in this document refer to the current deployment of the in-house developed LIMS software that was put into production use on April 6, 2021.

“LIMS6000” or “LIMS v2” or “v2” or “version 2” is “version 2” of the original in-house built LIMS – a rebuild/replacement of LIMS5000 intended to cure a long list of known shortcomings of LIMS5000. LIMS6000 is “API-centric” – view models on the back end powering comprehensive API endpoints on the front end that allow power users of the LIMS to propose, specify, and prototype new components/function

“Test Items” are all “things” run through the testing process, including customer test samples and quality controls.

“Ryan” refers to Ryan Randolph, Director of Science for North Coast Testing Laboratories, LLC and North Coast Testing Laboratories of Michigan, LLC.

“HMD” refers to Dave “Heavy Metal Dave” Arnold, Scientific Director of North Coast Testing Laboratories of Michigan, LLC.

“Me” or “myself” or “I” refers to the author of this memo, Adam Scavone, Compliance Director, North Coast Testing Laboratories, LLC and North Coast Testing Laboratories of Michigan, LLC, also the product manager for LIMS5000 and LIMS6000 and liaison between the lab and the development team.

“The development team” or “the developers” are a group of five developers – two senior software engineers, Dudley Chapman and Gary Mandela, and three freelancers: Neha Verma, Utkarsh Choudhary (Lord of the APIs), and Safi Ullah (front-end developer with backend knowledge).

“Sample prep technician” is an individual whose responsibilities generally include preparing samples for analysis. In chemistry, they generally extract customer test samples by dissolving them in a solvent, usually in a 50 mL centrifuge vial, with an amount of that taken and put into a smaller vial for analysis via instrument (HPLC for cannabinoids, LCMS for chemical residues/pesticides/plant growth regulators and similar compounds, ICPMS for heavy metals, LCMS for Vitamin E Acetate and certain medium-chain triglycerides.

“Sara” is Sara Kindall, a senior chemist.

“Pearson” is Pearson Ihmels, who has experience “hands on” as a sample prep technician in the lab, who now focuses full time on developing Excel VBA workbooks and code that supplements and supports LIMS, providing an exoskeleton that provide functions that are critical for LIMS operation but which LIMS5000 does not offer and cannot cost-effectively be retrofitted to offer. Much of Pearson’s Excel work will be replaced by LIMS6000, and his work will pivot to making user interfaces using the APIs that we establish.