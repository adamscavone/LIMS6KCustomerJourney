# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Create production build
npm build

# Run tests (no tests currently exist)
npm test
```

## Architecture Overview

This is a React 18 dashboard prototype for a Laboratory Information Management System (LIMS) built for senior chemists managing cannabis testing workflows.

### Key Architectural Decisions

1. **Component Architecture**: 
   - Main dashboard in `src/App.js` (expanded to ~2600 lines with comprehensive mock data)
   - Modular components for specific workflows:
     - `PrepBatchManagement.js`: Sample preparation batch management
     - `AnalysisBatchView.js`: Instrument analysis and result upload
     - `ReviewQueue.js`: Comprehensive analytical batch review interface
     - `BenchSheet.js`: Bench sheet creation for prep batches
   - React Router v6 for navigation between views

2. **Mock Data Pattern**: Extensive mock data simulating real laboratory workflows:
   - `mockSamples`: ~73 total samples across three pipelines with various statuses
   - Status progression: `ready_for_prep` → `in_prep` → `prepped` → `analysis` → `analyzed` → `primary_review` → `secondary_review` → `ready_to_report`
   - Realistic order groupings (1-5 samples per order)
   - Time-based organization (overdue, due today, due tomorrow, future)

3. **State Management**: 
   - React hooks (useState, useEffect) for local state
   - Pipeline-specific view modes (Order View vs Sample View)
   - No external state management library (appropriate for prototype)

4. **Styling**: 
   - Tailwind CSS via CDN for rapid prototyping
   - Consistent colorblind-friendly palette:
     - Blue (not green) for success states
     - Orange (not yellow) for warnings
     - Higher contrast (700/800 shades)
   - All status indicators use both color AND icons/borders

5. **Icons**: lucide-react for consistent iconography throughout

### Domain Context

This dashboard manages laboratory testing workflows for cannabis samples with three main pipelines:
- **Cannabinoids**: THC/CBD potency testing
- **Terpenes**: Terpene profile analysis  
- **Pesticides**: Pesticide contamination testing

Each sample moves through phases: Sample Receipt → Sample Prep → Analysis → Data Review → Reporting

#### Quality Control & Batch Objects

The LIMS tracks critical "batch objects" for quality control and traceability:
- **Instruments**: Equipment used for analysis (HPLC, LCMS, ICPMS)
- **Durable Equipment**: Calibrated pipettes, balances, dispensers
- **Chemicals/Reagents**: Purchased and prepared solutions
- **Calibration Standards**: Reference materials with concentration data
- **Quality Controls**: Blanks, spikes, duplicates, calibration verifications
  - All QCs have pass/fail criteria based on recovery percentages
  - System tracks bracketing requirements for CCVs
  - Negative controls (blanks) expected to yield "Not Detected"
  - Positive controls validate method performance

### Development Notes

- **Routing**: React Router v6 implemented with routes:
  - `/` - Main dashboard
  - `/receiving` - Sample Receiving Dashboard for manifest intake
  - `/prep-batch/:assayType` - Prep batch management
  - `/analysis-batch/:assayType/:batchId` - Analysis batch view
  - `/analysis-batch/:assayType` - Upload results for instruments
  - `/secondary-review/:assayType` - Secondary review queue
  - `/review-queue/:assayType` - Comprehensive review queue (primary, secondary, completed)
  - `/bench-sheet/:prepBatchId` - Bench sheet creation and editing
- **Navigation**: Seamless flow from dashboard → prep → analysis → review
- **Mock Data**: Comprehensive dataset with ~73 samples showing all workflow states
- **No Authentication**: Prototype assumes logged-in user ("Dr. Sarah Chen")
- **Responsive Design**: Tailwind grid system, optimized for desktop
- **Real-time Updates**: Clock updates, immediate UI feedback on actions
- **Multi-select**: Windows-native patterns (Ctrl+Click, Shift+Click)

### Workflow Implementation

1. **Prep Batch Management**:
   - Automatic sample checkout (no explicit checkout button)
   - Single analyst per batch requirement enforced
   - "Return Samples" for partial batch completion
   - "Mark Ready" moves batch to Pending Analysis
   - Multi-select prep batches for analysis batch creation

2. **Analysis Batch Creation**:
   - Combines multiple prep batches into analysis batch
   - Navigates to dedicated analysis view
   - Handles the "air gap" between LIMS and instruments

3. **Instrument Integration**:
   - Instrument selection from available options
   - Queue position and time estimates
   - File upload for results (CSV, TXT, XML)
   - Send to review when complete

### UI Design Patterns

1. **Dual View Modes** (Pipeline-Specific): 
   - **Order View**: Groups samples by customer order with date-based sections
   - **Sample View**: Shows individual samples organized by workflow phase
   - View mode toggles independently per pipeline (not global)

2. **Order View Organization**:
   - **Due Today Section**: 
     - Includes all overdue items (shown first)
     - Groups orders by workflow status (most critical first)
     - Status headers: "Available for Prep", "In Preparation", etc.
     - No redundant status columns at order level
   - **Due Tomorrow**: Next business day's orders
   - **Due [Weekday]**: Business day after tomorrow
   - Orders expandable to show samples (no status shown)

3. **Sample View Phase Groupings**:
   - Awaiting Prep → Checked Out for Prep → Ready for Analysis → On Instrument
   - Status chips removed for cleaner interface
   - Active voice phase names indicate required actions

4. **Workflow Status Grouping** (NEW):
   - Reversed order to show most critically behind items first:
     1. Available for Prep (most critical)
     2. In Preparation
     3. Prep Complete (Awaiting Batch)
     4. On Instrument
     5. Awaiting Instrument Data
     6. Primary Review Pending
     7. Secondary Review Pending
     8. Ready to Report (least critical)

5. **Key UI Decisions**:
   - Multi-sample orders reflect real lab workflows
   - No redundant status indicators
   - Air gap between LIMS and instruments explicitly handled
   - Business day calculations throughout
   - Review Batches given equal prominence (not sidebar)
   - Logical consistency enforced between headers and data

6. **Data Display Principles**:
   - Orders show: Order ID, Client, Sample count, Received date, Priority (if rush)
   - Samples show: Sample name, Client, Received date, Goal date, Reporting due date
   - Overdue items always appear in "Due Today" section with red "OVERDUE" indicator
   - Consistent date groupings across all pipelines for predictable UI
   - Expandable orders in Order View show sample details without page navigation
   - Three critical dates tracked: Received date, Goal date (internal), Reporting due date (customer-facing)
   - Goal date calculated as one business day before reporting due date

7. **Accessibility Design**:
   - Colorblind-friendly palette: Blue for success (not green), Orange for warnings (not yellow)
   - All colored elements include borders for visual redundancy
   - Higher contrast colors used throughout (700/800 shades instead of 600)
   - Status indicators combine both color and icons where possible
   - Multi-select uses standard OS patterns (Ctrl/Shift+Click)

8. **Layout Architecture**:
   - **Dashboard**: 
     - Left column (3 units): Today's Overview + DPM Early Start
     - Main area (9 units): Review Batches + Pipeline sections
   - **Prep Batch Management**:
     - Left column (5 units): Available samples with multi-select
     - Right column (7 units): In Prep + Pending Analysis sections
   - **Analysis Batch View**:
     - Left column (8 units): Batch details + results upload
     - Right column (4 units): Instrument selection + summary
   - **Bench Sheet**:
     - Mobile/Tablet: Equipment and Reagents at top, followed by main content
     - Desktop: Main content (2/3) with Equipment and Reagents sidebar (1/3)
     - Responsive grid using Tailwind's lg: breakpoint modifiers

### Important Business Rules

1. **Single Analyst per Batch**: All samples in a batch must be prepared by the same analyst
2. **Automatic Checkout**: Samples checked out when added to batch (no explicit step)
3. **Partial Completion**: "Return Samples" allows incomplete batch handling
4. **Pipeline-Specific SOPs**: Each assay type has its own SOP (e.g., SOP-CANNABINOIDS-PREP-v3.2)
5. **Status Progression**: Samples must follow defined workflow (cannot skip steps)
6. **Business Days**: All date calculations exclude weekends
7. **Air Gap Handling**: Explicit workflow for instrument integration and result upload
8. **No Null Values Rule**: All data fields in bench sheets, analytical batches, and review records must contain a value - empty/inapplicable fields must be filled with "N/A" rather than left null. This ensures data integrity and compliance.

### Recent Design Decisions (December 2024 - January 2025)

1. **Collapsible Interface**: 
   - All sections start collapsed by default for cleaner initial view
   - Date sections (Due Today, Due Tomorrow) are independently collapsible
   - Workflow status sections have individual expand/collapse controls
   - Clicking anywhere on the header toggles expansion

2. **Contextual Navigation**:
   - Removed global "Sample Prep" button from pipeline header
   - Navigation buttons appear contextually within workflow status sections:
     - "Sample Prep" button only in "Available for Prep" section
     - "Upload Results" button in "On Instrument" section
     - "Review Queue" button in "Secondary Review Pending" section
   - Each workflow state guides users to the appropriate next action

3. **Confirmation Testing Workflow**:
   - Samples requiring confirmation (OOS/OOE results) use `needs_confirmation` status
   - No separate section for confirmations - they appear in "Available for Prep"
   - Inline "CONF" indicator shows when a sample needs confirmation testing
   - Tooltip shows reason for confirmation (e.g., "Initial result: 23.5% THC (expected: 18-20%)")
   - These samples require extra scrutiny and have extended turnaround times

4. **Mixed-Status Order Handling**:
   - Orders with samples in different statuses appear in multiple workflow sections
   - Each section shows only the relevant samples from that order
   - Prevents users from missing samples that need attention
   - Orders are fully expandable to show all samples regardless of status

5. **Status Terminology Updates**:
   - Changed "Ready to Report" to "Secondary Review Complete" for clarity
   - Emphasizes that secondary review is the final quality checkpoint
   - Better reflects actual laboratory workflow terminology

6. **Primary Review Workflow**:
   - Added "Primary Review Pending" as a workflow status in Order View
   - Appears after "Awaiting Instrument Data" and before "Secondary Review Pending"
   - Includes context-specific "Primary Review" navigation button
   - Unlike prep batches (which require single analyst continuity), analysis batches can be transferred between analysts
   - Primary reviewer is typically the analyst who started the analysis batch, but handoffs are allowed
   - This reflects reality of 12+ hour instrument runs and shift changes

7. **Visual Hierarchy**:
   - Removed colored indicator circles from date group headers
   - Minimal indentation (ml-4) for content within sections
   - Spindown indicators are small (w-3 h-3) and left-aligned
   - Clean, professional appearance focused on data density

8. **Eye Icon Removal**:
   - Removed all eye icons as their purpose was unclear
   - Simplified interface by removing non-essential UI elements
   - Future: Consider adding explicit "View Details" text if needed

9. **Bench Sheet Improvements** (January 2025):
   - **Responsive Layout**: Equipment and Reagents sections moved to top on mobile/tablet screens
   - **Product Type Column**: Added comprehensive dropdown with 50+ cannabis product types
   - **Auto-population**: Bench sheet automatically populates with prep batch samples
   - **Validation Enhancements**: 
     - Prevents negative values for weights and extraction volumes
     - Requires all fields to be filled (no null values allowed)
     - Product type required for actual samples (not QC samples)
   - **Layout Optimization**: Removed redundant "Prep Batch Info" section from sidebar
   - **Mobile-First Design**: Optimized for 15-inch laptops and smaller screens

10. **Review Queue Implementation**:
    - **Comprehensive Interface**: Single queue for primary, secondary, and completed reviews
    - **Automated QC Validation**: Pass/fail evaluation visible for all quality checks
    - **Manual Verification**: Checklist for visual verification and documentation
    - **Role-Based Views**: Different interface elements for primary vs secondary reviewers
    - **Fill Empty with N/A**: Quick-fill buttons for optional comment fields
    - **Digital Lab Assets**: Tracking of method files and calibration files

11. **Sample Receiving Dashboard** (January 2025):
    - **Streamlined Interface**: Removed search bar and client filter for cleaner workflow
    - **Functional Spindown**: Clicking arrow next to client name expands receiving interface
    - **CC Order ID Placement**: Displayed at same hierarchy level as Manifest Number
    - **Expand All Samples**: Button to expand all sample details at once
    - **Ohio Assay Organization**:
      - Chemistry: Cannabinoids/Terpenes, Pesticides/Mycotoxins, Heavy Metals/Elemental Analysis, Total Nitrogen/Total Sulfur, Residual Solvents
      - Microbial: Salmonella/STEC, Total Aerobic/Total Coliforms, Total Yeast & Mold/BTGN
      - Other: Plant Pathogens, Plant Sex, Foreign Matter, Moisture Content, Water Activity
    - **Potency Target Entry**: 
      - Default analyte set to "Total THC" (top priority)
      - Comprehensive cannabinoid list: Total THC, CBD, CBC, CBDa, CBDV, CBG, CBGa, CBN, delta8-THC, delta9-THC, THCa, THCV, THCVa
      - Default Units (mg/g or %) positioned on same row as Potency Targets header
    - **Sample Weights/Qtys**: Side-by-side container with Potency Targets, includes "each" option for unit samples
    - **Manifest-Level Actions**: "Rush All" and "DPM Early Start All" buttons for batch operations

# Project-Specific Guidelines

1. **Mock Data Consistency**: Ensure mock data statuses match their UI grouping headers
2. **Status Terminology**: Use `in_prep` (not `prep`) for consistency
3. **No Redundancy**: Avoid showing same information multiple times (e.g., status in grouped views)
4. **Business Logic**: Enforce single analyst per batch, automatic checkout, partial completion
5. **Navigation Flow**: Dashboard → Prep Batch → Analysis Batch → Review (clear path)
6. **Air Gap**: Acknowledge and handle the disconnect between LIMS and instruments
7. **Data Integrity**: Never allow null values in data records - all empty fields must be filled with "N/A"
8. **User Convenience**: Provide "Fill Empty with N/A" buttons where appropriate to expedite data entry

### Test Categories and Compliance

**Test Categories** are Ohio Division of Cannabis Control compliance designations that determine which assays/analytes must be reported to Metrc:

- **DPM (Dispensary Plant Material)**: Lab required test batch requiring:
  - Cannabinoids quantification (11 cannabinoids)
  - Microbial testing (total yeast/mold, BTGN, etc.)
  - Pesticide screening
  - Mycotoxin screening
  
- **TERPS**: Customer-requested terpene profiling (not required by state)

- **PPPT (Processed Product Previously Tested)**: Different compliance requirements for previously tested products

- **PPM**: Pesticides/Mycotoxins specific testing

- **NSPNPT (Non-Solvent Product Not Previously Tested)**: Requires different analyte panel than standard DPM

- **R&D VIR**: Research & Development viral testing (HLV, Fusarium, Pythium)

These test categories encode the specific analytes and reporting requirements, similar to foreign keys in a database.