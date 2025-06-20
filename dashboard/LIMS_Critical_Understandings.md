# LIMS Critical Understandings
*Extracted from SOPs and quality_controls.md for LIMS6000 development*

## Data Integrity Rules

### No Null Values Policy
All data fields in LIMS records must contain a value. This critical rule ensures:
- Complete audit trails for regulatory compliance
- No ambiguity between "not entered" and "not applicable"
- Consistent data export and reporting
- Prevention of calculation errors from null values

**Implementation Requirements:**
1. All optional fields must default to "N/A" when not applicable
2. User interfaces must provide "Fill Empty with N/A" functionality
3. Validation must reject records with null/empty fields
4. Database constraints must enforce NOT NULL with "N/A" defaults

This applies to:
- Bench sheets (sample weights, dilution factors, comments, product types)
- Analytical batch records
- Review checklists
- Equipment logs
- Reagent tracking

**Bench Sheet Specific Requirements:**
1. Sample weights cannot be negative (validation enforced)
2. Extraction volumes cannot be negative (validation enforced)
3. Product type required for all non-QC samples
4. LCB (Laboratory Control Blank) samples may have N/A for weight
5. All comment fields must be filled (use N/A if no comment needed)

## Core Laboratory Workflow Principles

### 1. Batch Object Traceability
Every analytical process requires comprehensive tracking of "batch objects":
- **Instruments**: HPLC, GCMS, LCMS, ICPMS with specific software versions (e.g., LabSolutions)
- **Durable Equipment**: Calibrated pipettes, balances, dispensers, sonicators
- **Chemicals/Reagents**: Both purchased and prepared solutions with expiration tracking
- **Calibration Standards**: Reference materials with concentration data and prep logs
- **Personnel Qualifications**: Demonstrations of Competency (DOCs) tied to permissions

### 2. Quality Control Architecture

#### Universal QC Types
- **Blanks/Negative Controls**: Expected to yield "Not Detected"
- **Calibration Verifications (CCV)**: Must meet recovery criteria with bracketing requirements
- **System Suitability Checks (SSC)**: Opening QCs to verify instrument readiness
- **Laboratory Control Samples (LCS)**: Known concentration samples for accuracy verification
- **Laboratory Control Blanks (LCB)**: Clean matrices to detect contamination

#### QC Acceptance Criteria
- Recovery percentages defined per analyte and assay
- Bracketing requirements (e.g., CCV every 10 samples)
- Pass/fail evaluation must be automated and visible
- All QC data must be traceable to specific batches

### 3. Assay Management Requirements

#### Common Assay Elements
- **Analytes**: CAS numbers, iLLOQ, iULOQ, MRL values
- **Matrix-specific handling**: Different limits for plant vs. non-plant materials
- **QC requirements**: Prep and analytical controls specific to each assay
- **Calibration ranges**: Multi-point curves with defined acceptance criteria

#### Special Cases
- **Terpenes**: Class I vs Class II with different acceptance criteria
- **Microbial**: Multiple sub-assays (not monolithic) with varying incubation times
- **Pesticides**: Two-step screening/quantitation workflow capability
- **Confirmation testing**: For out-of-specification results

### 4. Time and Turnaround Management

#### Critical Date Types
- **Received Date**: When sample arrives at lab
- **Goal Date**: Internal target (one business day before reporting due)
- **Reporting Due Date**: Customer-facing deadline
- **Prep Due**: When sample prep must be completed
- **Analysis Due**: When instrumental analysis must be completed

#### Rush Sample Handling
- Rush designation at assay level (not sample level)
- Different assays may have different rush dates
- Rush queues promoted at all critical interfaces

### 5. Data Integration Requirements

#### Instrument Integration
- ASCII export functionality from analytical software
- Handling of 12+ hour analytical runs
- Air gap acknowledgment between LIMS and instruments
- Result upload with automatic QC evaluation

#### External System Integration
- **Metrc API**: Flexible mapping for changing requirements
- **Confident Cannabis**: Sample ID tracking but not dependency
- **QuickBooks**: .iif file generation for invoicing

### 6. Regulatory Compliance Features

#### ISO 17025 Requirements
- Complete audit trail with user/date/time/action
- Document version control for SOPs and CoAs
- Report amendment process with original preservation
- Measurement uncertainty tracking

#### State-Specific Requirements
- **Ohio**: DPM testing categories, specific Metrc bundles
- **Michigan**: Different test categories and reporting formats, whitelisting for single-analyte retests
- **Matrix handling**: Kief as both concentrate and processed product

### Michigan Whitelisting for Single-Analyte Retests
- **Purpose**: Allows laboratories to retest only specific failed analytes rather than entire assay panels
- **Business Value**: Significant cost and time savings for both laboratory and customers
- **Implementation**: Whitelist of analytes approved for single-analyte retest capability
- **Quality Control**: Maintains data integrity while providing operational flexibility
- **Regulatory Compliance**: Approved workflow for Michigan state cannabis testing

### 7. Sample and Batch Naming Conventions

#### Requirements for LIMS6000
- Meaningful batch identifiers (not just sequential numbers)
- Incorporation of date, assay type, analyst initials
- Avoid disclosure of sample pace/volume
- Support for barcode integration

### 8. User Interface Principles

#### Workflow-Driven Navigation
- Context-specific action buttons per workflow state
- Clear visual hierarchy with minimal redundancy
- Collapsible sections for data density
- Pipeline-specific view modes (Order vs Sample)
- Responsive layouts optimized for various screen sizes (15" laptops to desktops)

#### Error Prevention
- Single analyst per prep batch enforcement
- Automatic sample checkout on batch assignment
- Primary and secondary review requirements
- Multifactor authentication for critical actions

### 9. API-Centric Architecture Benefits

#### Sustainability
- Self-service assay addition/modification
- Direct code repository access for transparency
- Minimal developer dependency for routine changes
- Clear API contracts for data GET/POST operations

#### Flexibility
- Custom UI development by power users
- Integration with Excel tools during transition
- Control charts and advanced analytics capability
- Snapshots and custom reports without developer assistance

### 10. Critical Operational Safeguards

#### Data Integrity
- Prevent premature "set to complete" actions
- Automatic inventory adjustments for consumed samples
- Late error discovery handling procedures
- Batch transfer rules (prep vs analysis batches)

#### Volume and Unit Standardization
- Extraction volumes in mL (not L)
- Consistent date format throughout system
- 24-character Metrc package format requirement
- Business day calculations excluding weekends

## Implementation Priorities

1. **Batch object tracking** - Foundation for all QC and traceability
2. **Quality control framework** - Pass/fail evaluation and reporting
3. **Assay management module** - Self-service configuration
4. **API endpoints** - Enable custom development and integration
5. **Audit functionality** - Compliance and investigation support

## Key Terminology Alignment

- Use "in_prep" (not "prep") for consistency
- "Primary Review Pending" and "Secondary Review Pending" as distinct states
- "Test Items" encompass both customer samples and QC samples
- "Batch objects" include all equipment, standards, and personnel involved
- "ReportableResultValue" instead of "AverageResult"

## Sample Receiving Workflow

### Interface Design Principles
1. **Streamlined Entry**: No search bars or filters - focus on manifest processing
2. **Progressive Disclosure**: Click spindown arrow to expand receiving interface
3. **Batch Operations**: Manifest-level "Rush All" and "DPM Early Start All" buttons
4. **Visual Hierarchy**: CC Order ID at same level as Manifest Number

### Assay Organization (Ohio)
- **Chemistry Panel**: 
  - Row 1: Cannabinoids | Pesticides | Heavy Metals | Total Nitrogen
  - Row 2: Terpenes | Mycotoxins | Elemental Analysis | Total Sulfur
  - Standalone: Residual Solvents
- **Microbial Panel**:
  - Column 1: Salmonella (top), STEC (bottom)
  - Column 2: Total Aerobic (top), Total Coliforms (bottom)
  - Column 3: Total Yeast & Mold (top), BTGN (bottom)
- **Other Tests**: Plant Pathogens, Plant Sex, Foreign Matter, Moisture Content, Water Activity

### Potency Target Management
1. **Default Analyte**: Total THC (highest priority)
2. **Cannabinoid Priority Order**: Total THC → CBD → all others alphabetically
3. **Unit Selection**: Default Units (mg/g or %) on same row as header
4. **Side-by-Side Layout**: Potency Targets and Sample Weights/Qtys as equal containers

### Sample Weight/Quantity Handling
- **Unit Options**: g, mg, kg, oz, lb, each
- **"Each" Support**: For individual items (still requires gross weight)
- **Compact Display**: Abbreviated labels (Shipped, Source Pkg, Gross Wt)
- **Validation**: No negative values allowed

### Test Category Integration
- **Ohio Categories**: Full compliance list with tooltips explaining Metrc requirements
- **DPM Early Start**: Special handling for Dispensary Plant Material microbial testing
- **Category-Specific Defaults**: Auto-select assays based on test category

This document should guide LIMS6000 development to ensure all critical laboratory operations are properly supported while maintaining flexibility for future requirements.