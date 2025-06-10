# Test Category Management in LIMS6000

## Overview

"TestCategories" is the LIMS6000 label for what Metrc refers to as "Required Lab Test Batches" - a brief set of labels that are required to be entered by the customer (cultivator or processor) in the process of creating a "Sample Package" on a Metrc transfer manifest. Every sample must have at least one "Required Lab Test Batch" designated.

## Key Concepts

### Test Category Definition
- Test Categories are the Required Lab Test Batch values from Metrc
- Every cannabis sample submitted for testing must have at least one Test Category
- Samples can now have multiple Test Categories (rule changed from original one-only restriction)
- Test Categories determine which analytes must be reported to Metrc

### Mutual Exclusivity Rules
- Most Test Categories are mutually exclusive (but not all)
- "Compliance" Test Categories (those with pass/fail outcomes) are mutually exclusive
- Non-compliance Test Categories (e.g., Voluntary Terpenes, R&D Testing) are NOT mutually exclusive
- The system must allow authorized users to set mutual exclusivity rules at the laboratory level

### State-Specific Test Categories

#### Ohio Test Categories:
- Dispensary Plant Material
- Dispensary Plant Material - STEC/Sal
- Non-Solvent Marijuana Ingredient
- Non-Solvent Product (Not Previously Tested)
- Processed Product (Previously Tested)
- Processor Plant Material
- R&D Testing - Salmonella and STEC Contamination
- Research/Development
- Solvent Based Marijuana Ingredient
- Solvent Based Product (Not Previously Tested)
- Voluntary Testing - Terpenes (Plant Material)
- Voluntary Testing - Terpenes (Processed Products)
- Miscellaneous R&D Testing

#### Michigan Test Categories:
- Additional
- Flower
- Infused
- R&D Testing
- R&D Testing (Infused Products)
- R&D Testing (Infused Beverages)
- Misc Genetics R&D Testing

## Business Rules

### 1. Test Category Assignment
- Test Categories are properties of a state, not individual labs
- Test Categories are established and managed by state regulators
- Rules apply to all labs within a state

### 2. Analyte Reporting Requirements
- Test Category determines which analytes must be reported to Metrc
- All analytes associated with a Test Category must have values submitted
- For retests: only the previously failed analyte needs to be actually tested
- Other required analytes can be reported as "Not Tested" in notes with pass flag = TRUE

### 3. Test Category Changes
- Users can change Test Categories at any time before Metrc reporting
- All changes must be recorded for audit purposes:
  - Date/time of change
  - Identity of logged-in user
  - Previous and new values

### 4. Non-Metrc Samples
- LIMS6000 must NOT require Test Categories for non-Metrc samples
- Environmental swabs, water samples, soil samples, etc. should not need Test Categories
- Test Categories apply ONLY to cannabis samples requiring Metrc reporting

### 5. DPM Early Start
- Special functionality for Dispensary Plant Material samples
- Allows microbial testing to begin immediately
- Must be tracked and displayed in the UI

## API Integration

### Retrieving Test Categories
- Ohio: `https://api-oh.metrc.com/Documentation#LabTests.get_labtests_v2_types.GET`
- Michigan: `https://api-mi.metrc.com/Documentation#LabTests.get_labtests_v2_types.GET`

### JSON Structure Analysis
Example from API response:
```json
{
    "Id": 702,
    "Name": "Abamectin (ppm) Non-Solvent Marijuana Ingredient",
    "RequiresTestResult": true,
    "InformationalOnly": false,
    "ResearchAndDevelopment": false,
    "AlwaysPasses": false,
    "MaxAllowedFailureCount": 2,
    "LabTestResultMode": "PassWithinMinMax",
    "LabTestResultMinimum": 0.0000,
    "LabTestResultMaximum": 0.0479,
    "LabTestResultExpirationDays": null,
    "DependencyMode": "RequiresAll"
}
```

Parsing rules:
- Analyte name: Before the parentheses
- Unit of measure: Inside parentheses
- Test Category: After parentheses

### Automated Updates
1. Check for new Test Categories when receiving manifests
2. Automatically create entries for new Test Categories
3. Parse and store action limits (min/max values)
4. Daily automatic checks for changes to action limits
5. Notify all users via alarm bell when limits change
6. Display banner for 2 weeks after changes

## Confident Cannabis Integration

Test Categories must be mapped to CC Test Packages:
- Users select from existing CC Test Package names (not numeric IDs)
- Option to create new CC Test Package if needed
- Integration with CC API: `GET /v0/labs/testpackages`

Example CC Test Package:
```json
{
    "compliance": true,
    "description": "Medical Marijuana Flower being sold to a Dispensary",
    "id": 39139,
    "minimum_quantity": 6,
    "name": "Dispensary Plant Material + Terps",
    "price": 665,
    "test_types": [
        {
            "abbreviation": "CAN",
            "id": 1,
            "name": "Cannabinoids"
        },
        {
            "abbreviation": "TER",
            "id": 2,
            "name": "Terpenes"
        }
        // ... more test types
    ]
}
```

## UI Requirements

### Test Category Management Interface
1. Display all Test Category data and rules
2. Show mutual exclusivity settings with tooltips explaining the rules
3. Allow manual addition of Test Categories
4. Show audit trail of changes
5. Display action limits with automatic update notifications

### Sample Receiving Interface
1. Test Category dropdown with state-specific options
2. CC ID field at sample level (separate from manifest-level CC Order ID)
3. DPM Early Start checkbox with tooltip explanation
4. Multiple potency targets capability
5. Assays checkboxes based on selected Test Category

## Status Flow in Metrc
- Testing in Progress → Passed/Failed (based on results)
- Status change occurs automatically when all required analytes are reported
- Pass/Fail determined by comparing results to LabTestResultMinimum/Maximum values