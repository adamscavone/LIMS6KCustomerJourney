# Bench Sheet Creation Guide

## Overview
The Bench Sheet is a critical component of the LIMS workflow that captures all sample preparation data, including weights, dilution factors, extraction volumes, and equipment used. This guide covers the implementation details and business rules.

## Key Features

### 1. Auto-Population from Prep Batch
- Bench sheet automatically loads samples from the associated prep batch
- Always includes LCB (Laboratory Control Blank) and LCS (Laboratory Control Sample) as the first two rows
- Prep batch samples follow the QC samples
- All sample data (LIMS ID, client, name) is pre-populated

### 2. Product Type Management
- Comprehensive dropdown with 50+ cannabis product types including:
  - Flower products (e.g., "Flower", "Kief")
  - Concentrates (e.g., "Badder", "Budder", "Crumble", "Diamonds", "Distillate")
  - Edibles (e.g., "Brownies", "Cookies", "Gummies", "Chocolate")
  - Topicals (e.g., "Balm", "Lotion", "Massage Oil")
  - Tinctures and oils
  - Vape products
- Product type is REQUIRED for all actual samples
- QC samples (LCB/LCS) have product type set to "N/A"

### 3. Data Validation Rules

#### Required Fields
- Sample Matrix (dropdown selection)
- Sample Weight (except for LCB which can be N/A)
- Extraction Volume (all samples)
- Dilution Factor (can be N/A)
- Product Type (for non-QC samples)
- Balance ID (equipment)
- At least one reagent selection
- Comments field (can be N/A)

#### Validation Constraints
- **No Negative Values**: Sample weights and extraction volumes cannot be negative
- **No Null Values**: All fields must contain a value (use N/A when not applicable)
- **Equipment Requirements**: 
  - Balance is always required
  - Waterbath, Sonicator, and Repeater can be set to "N/A - Not Used"

### 4. Responsive Layout

#### Mobile/Tablet (< 1024px)
- Equipment and Reagents sections appear at TOP
- Main content (Batch Info, Sample Table, Comments) follows below
- Full-width layout for better mobile experience

#### Desktop (≥ 1024px)
- Main content on LEFT (2/3 width)
- Equipment and Reagents sidebar on RIGHT (1/3 width)
- Optimized for side-by-side viewing

### 5. Matrix-Specific Defaults
When a sample matrix is selected, extraction volumes auto-update:
- Plant Material: 40.0 mL
- Concentrate: 50.0 mL
- Edible: 20.0 mL
- Topical: 25.0 mL
- Tincture: 10.0 mL
- Vape Cartridge: 5.0 mL

### 6. Reagent Management
- Dynamic reagent addition (can add multiple)
- Expiration date checking with visual warnings
- NCTL ID and Lot number tracking
- Auto-populated reagent details from mock database

### 7. "Fill Empty with N/A" Feature
- Quick-fill button to populate empty optional fields
- Applies to:
  - Sample weight (LCB only)
  - Dilution factor
  - Comments
  - Optional equipment fields
- Ensures no null values in submitted data

## Business Rules

1. **Single Analyst Continuity**: The analyst from the prep batch is auto-populated for all roles (weighed by, extracted by, etc.)

2. **Prep Batch Integration**: 
   - Bench sheet ID matches prep batch ID
   - Cannot create bench sheet without valid prep batch
   - All samples from prep batch must appear on bench sheet

3. **QC Sample Requirements**:
   - LCB and LCS must always be first two entries
   - LCB weight can be N/A (no sample weight for blanks)
   - Both have fixed extraction volumes and product type N/A

4. **Data Integrity**:
   - Draft saving supported for work in progress
   - Validation prevents submission of incomplete sheets
   - All fields must have values before finalization

## Navigation Flow

1. Access from Prep Batch Management → "Bench Sheet" button
2. Auto-loads prep batch data
3. User fills in weights, volumes, and selects equipment
4. Save as draft (optional) or finalize
5. On finalization, returns to Prep Batch Management

## Technical Implementation

- React component with hooks (useState, useEffect)
- Real-time validation on input
- Mock data for development/testing
- Responsive grid using Tailwind CSS
- Form validation before submission
- Auto-calculation of defaults based on matrix type

## Future Enhancements

1. Barcode scanning for sample weights
2. Integration with balance for automatic weight capture
3. Historical reagent usage tracking
4. Automatic dilution calculations
5. Export to PDF/Excel formats
6. Integration with analytical batch creation