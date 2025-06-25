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

This is a React 18 application for a Laboratory Information Management System (LIMS) built for multiple lab roles managing cannabis testing workflows. The system features a neutral overview landing page and role-specific dashboards.

### Key Architectural Decisions

1. **Component Architecture**: 
   - Landing page in `src/App.js` (imports Overview component)
   - Overview page in `src/pages/overview/Overview.js`: Neutral landing page with all samples
   - Prep dashboard in `src/pages/prep/PrepDashboard.js` (formerly App.js, ~2600 lines)
   - Modular components for specific workflows:
     - `PrepBatchManagement.js`: Sample preparation batch management
     - `AnalysisBatchView.js`: Instrument analysis and result upload
     - `ReviewQueue.js`: Comprehensive analytical batch review interface
     - `BenchSheet.js`: Bench sheet creation for prep batches
     - `ReceivingDashboard.js`: Metrc manifest intake
     - `SamplingDashboard.js`: Driver route management
   - React Router v6 for navigation between views

2. **Mock Data Pattern**: Extensive mock data simulating real laboratory workflows:
   - Sample IDs starting at 176243 and incrementing
   - ~16 samples across three pipelines with various statuses
   - Status progression: `ready_for_prep` → `in_prep` → `prepped` → `analysis` → `analyzed` → `primary_review` → `secondary_review` → `ready_to_report`
   - Realistic order groupings (1-5 samples per order)
   - Time-based organization with dates between June 4-11, 2025
   - Maximum 2 days overdue to reflect realistic lab operations
   - No rush priority flags - focus on specific due dates

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
  - `/` - Overview page (all samples across all pipelines)
  - `/prep` - Prep dashboard (pipeline-specific views)
  - `/sampling` - Sampling dashboard for driver management
  - `/receiving` - Metrc Receiving for manifest intake
  - `/prep-batch/:assayType` - Prep batch management
  - `/analysis-batch/:assayType/:batchId` - Analysis batch view
  - `/analysis-batch/:assayType` - Upload results for instruments
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

### Recent Design Decisions (December 2024 - June 2025)

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

11. **Metrc Receiving Dashboard** (January 2025):
    - **Title Change**: Renamed from "Sample Receiving Dashboard" to "Metrc Receiving"
    - **Decluttered Interface**: 
      - Removed driver ETA containers entirely
      - Removed "Inbound Manifests" section header
      - Consolidated header with compact layout
      - Single caret toggle behavior (no alternating view states)
    - **Enhanced Table Structure**:
      - Added "Source Package" column with mock Metrc package tags
      - Added "Item Category" column with proper Metrc categories (Buds, Pre-Roll, Edibles, etc.)
      - Fixed column consistency issues between expanded/collapsed states
      - Corrected data mapping (categories no longer display weight values)
    - **Simplified Tooltips**: Replaced complex z-indexed tooltips with native HTML title attributes
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
    - **Smart Micro Due Dates**: 
      - Calculates individual due dates for each microbial assay (PCR vs culture-based methods have different turnaround times)
      - Shows latest (most conservative) due date in the field
      - Automatically recalculates when test category or selected assays change
      - Default assays are pre-selected based on test category (e.g., all micro tests for DPM)
    - **Due Date Pickers**: Both Micro Due and Chemistry Due use native datetime-local inputs for easy date/time selection
    - **De-containerized Sample Table**: Clean table format with headers, no individual containers per sample
    - **Chemistry Assay Alignment**: Fixed checkbox layout with consistent spacing and no text wrapping
    - **Receiving3 Guided Workflow Enhancements** (June 2025):
      - **Granular Rush Options**: "Rush All Assays", "Rush All Micro", "Rush All Potency" with proper checkbox inheritance
      - **Clear DPM Early Start**: Renamed to "Apply Early Start to All Dispensary Plant Material Samples" with explanation
      - **Flexible Test Categories**: Acknowledges air-gapped changes from Metrc with editable manifest number
      - **Terpenes Bulk Actions**: Apply to all samples, DPM only, or flower samples only
      - **Verbose Deadline Management**: Three-tier system (category → assay → manual override) with auto-population
      - **Smart Rush Counting**: Includes any sample with deadlines earlier than default, not just flagged samples
      - **Real-time Deadline Cascading**: Deadlines populate immediately at assay level based on turnaround times

12. **Sampling Dashboard Driver Display Redesign**:
    - **Compact Table View**: Replaced individual driver containers with scalable table format
    - **Active Drivers Only**: Shows only drivers with assigned stops
    - **Expandable Route Details**: "View Route" button reveals detailed timeline
    - **Summary Statistics**: Shows active drivers, total stops, unassigned stops, avg stops/driver
    - **Handles Scale**: Designed for 9+ drivers and 14+ stops without UI overflow

# Project-Specific Guidelines

1. **Mock Data Consistency**: Ensure mock data statuses match their UI grouping headers
2. **Status Terminology**: Use `in_prep` (not `prep`) for consistency
3. **No Redundancy**: Avoid showing same information multiple times (e.g., status in grouped views)
4. **Business Logic**: Enforce single analyst per batch, automatic checkout, partial completion
5. **Navigation Flow**: Dashboard → Prep Batch → Analysis Batch → Review (clear path)
6. **Air Gap**: Acknowledge and handle the disconnect between LIMS and instruments
7. **Data Integrity**: Never allow null values in data records - all empty fields must be filled with "N/A"
8. **User Convenience**: Provide "Fill Empty with N/A" buttons where appropriate to expedite data entry
9. **Receiving Tab Behavior**: After manifest submission, UI must remain on "Pending Receipt" tab (NOT switch to "Active Manifests"). This is intentional for workflow efficiency - see RECEIVING_WORKFLOW_DESIGN_DECISIONS.md

13. **Laboratory Overview Implementation** (June 2025):
    - **New Landing Page**: Neutral overview showing all samples across all pipelines
    - **Sample Organization**: Chronological listing from earliest to latest received
    - **Enhanced Metrics**:
      - Total samples in-house
      - Time-critical samples (overdue and due today)
      - Pipeline distribution (Cannabinoids, Terpenes, Pesticides)
      - Workflow status distribution across all phases
    - **Date Formatting**:
      - Received date: Shows only date (e.g., "Jun 11, 2025")
      - Due date: Shows "Month Day HH:MM" in 24-hour format (e.g., "Jun 13 14:00")
    - **Focus on Deadlines**: Removed "Rush" priority concept in favor of specific due dates
    - **Navigation Changes**:
      - Home button leads to overview page
      - Original pipeline-specific dashboard moved to Prep → Prep Dashboard

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

## Deployment to Azure Blob Storage

### Prerequisites
- Azure account with an active subscription
- Azure Storage account created
- Node.js and npm installed locally

### Build Process
```bash
# Install dependencies
npm install

# Create production build
npm run build
```

This creates an optimized production build in the `build/` directory.

### Azure Blob Storage Setup

1. **Create Storage Account** (if not already created):
   - Go to Azure Portal → Storage accounts → Create
   - Choose resource group, storage account name, and region
   - Use Standard performance and LRS redundancy for cost efficiency

2. **Enable Static Website Hosting**:
   ```
   Storage Account → Settings → Static website
   - Enable static website hosting
   - Index document name: index.html
   - Error document path: index.html (for React Router support)
   - Save
   ```

3. **Upload Build Files**:
   - Option 1: Azure Portal
     - Navigate to Storage Account → Containers → $web
     - Upload all contents from `build/` directory
   
   - Option 2: Azure CLI
     ```bash
     az storage blob upload-batch \
       --account-name <storage-account-name> \
       --source ./build \
       --destination '$web'
     ```

4. **Configure CORS** (if needed for API calls):
   ```
   Storage Account → Settings → CORS
   - Add allowed origins: *
   - Allowed methods: GET, POST, PUT, DELETE, OPTIONS
   - Allowed headers: *
   - Exposed headers: *
   - Max age: 3600
   ```

5. **Access the Site**:
   - Primary endpoint shown in Static website settings
   - Format: `https://<storage-account-name>.z13.web.core.windows.net/`

### Custom Domain (Optional)
1. Storage Account → Settings → Custom domain
2. Add CNAME record pointing to blob endpoint
3. Enable HTTPS with CDN for SSL support

### Continuous Deployment (Optional)
Use GitHub Actions for automated deployment:

```yaml
name: Deploy to Azure Blob Storage

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install and Build
      run: |
        npm install
        npm run build
        
    - name: Azure Login
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
        
    - name: Upload to blob storage
      uses: azure/CLI@v1
      with:
        inlineScript: |
          az storage blob upload-batch \
            --overwrite true \
            --account-name ${{ secrets.STORAGE_ACCOUNT_NAME }} \
            --source ./build \
            --destination '$web'
```

### Important Notes
- The site will be publicly accessible to anyone with the link
- No authentication is built into the static site
- For production use, consider adding Azure AD authentication
- Monitor storage costs (typically minimal for static sites)
- Enable CDN for better global performance

## Michigan Whitelisting for Single-Analyte Retests

### Overview
Michigan regulations allow customers who fail a specific analyte test to request a retest for ONLY that failed analyte. This is called "whitelisting" - we explicitly whitelist only the analytes that need retesting to avoid accidentally failing the customer on analytes they didn't request testing for.

### Key Requirements
1. **Michigan Only**: This feature is ONLY for Michigan operations. Ohio requires ALL analytes in an assay to be retested and reported.
2. **Retest Samples**: Only applies to samples marked as "Retest" in the test category
3. **Single Analyte Selection**: When a retest is requested, ONLY the failed analyte(s) should be tested
4. **Risk Mitigation**: Prevents accidental failure on non-requested analytes (e.g., testing lead only but accidentally failing for cadmium)

### Implementation Details

#### UI Elements (Receiving4.js)
1. **Retest Toggle**: Added a "Retest" checkbox that appears when:
   - State is set to Michigan (future implementation will detect this)
   - Enables whitelisting mode for that sample

2. **Analyte-Specific Selection**: When retest is enabled:
   - Assay checkboxes expand to show individual analytes
   - User can select specific analytes within each assay
   - Visual indicator (yellow background) shows whitelisted samples

3. **Whitelisting Indicators**:
   - Yellow "RETEST" badge on sample rows
   - Yellow background on whitelisted analyte checkboxes
   - Warning icon with tooltip explaining the whitelist

4. **Validation**:
   - Prevents selecting entire assays when in retest mode
   - Requires at least one analyte to be selected
   - Shows clear messaging about which analytes will be tested

#### Data Structure
```javascript
sampleData = {
  // ... existing fields
  isRetest: boolean,
  whitelistedAnalytes: {
    cannabinoids: ['THC', 'CBD'],  // Only test these specific cannabinoids
    heavyMetals: ['lead'],          // Only test for lead
    pesticides: [],                 // Empty = no pesticides testing
    // etc.
  }
}
```

#### Business Logic
1. When `isRetest` is true:
   - Assay selection UI changes to analyte-level selection
   - Only whitelisted analytes are sent to instruments
   - Review queue shows which analytes were tested
   - Reports only include tested analytes

2. Downstream Impact:
   - Prep batches group retest samples separately
   - Analysis batches clearly mark whitelisted samples
   - Instruments receive specific analyte lists
   - Review queue validates only tested analytes

### Example Workflow
1. Customer fails heavy metals test for lead contamination
2. Customer requests retest for lead only
3. Lab receives new sample, marks as "Retest"
4. Lab selects only "Lead" from heavy metals analytes
5. Sample proceeds through workflow testing ONLY for lead
6. Report shows only lead results, avoiding risk of failing for other metals

## Non-Metrc Samples System

### Overview
The Non-Metrc Samples system (`/non-metrc-samples`) handles orders for samples that don't come through the Metrc tracking system. This includes environmental samples, R&D samples, and customer-submitted samples that bypass state cannabis tracking requirements.

### Key Features

#### 1. **Customer-Selected/Submitted Samples**
- Checkbox to indicate when samples were selected by the customer (not collected by trained North Coast technicians)
- When checked:
  - Sampler Name field becomes disabled and auto-fills with "N/A"
  - Sampler Signature field becomes disabled and auto-fills with "N/A"
  - Relinquishment signature serves as the only required signature
- This distinction is critical for compliance and quality assurance

#### 2. **Autocomplete Functionality**
- **Client Search**: Start typing to search from 5 mock Ohio-based clients
  - Environmental Solutions Inc. (Columbus)
  - Green Valley Cultivators (Cleveland)
  - Buckeye Botanicals (Cincinnati)
  - Ohio Organic Farms (Dayton)
  - Environmental Testing Labs (Toledo)
- **Sampler Search**: Start typing to search from 6 trained technicians
  - No ability to add new samplers (requires training certification)
  - Shows name and certification level
- **Save New Client**: Option appears when entering unmatched client name

#### 3. **Sample Type Organization**
- Environmental samples listed first (most frequently used):
  - Water
  - Soil
  - Plant Tissue
  - Environmental Swab
- Followed by Cannabis, Edibles, Topicals, and Other categories

#### 4. **Individual Analyte Selection (Whitelisting)**
- "Select Individual Analytes" checkbox appears when assays with multiple analytes are selected
- Progressive disclosure - only shows when relevant
- Allows selection of specific analytes within:
  - **Microbial**: Total Yeast & Mold, BTGN, E. coli/STEC, Salmonella spp., etc.
  - **Plant Pathogens**: Hop Latent Viroid, various viruses, fungi, mites
  - **Chemistry**: Heavy metals, pesticides, mycotoxins, potency, terpenes
- Yellow highlighting indicates whitelisted analytes

#### 5. **Comprehensive Testing Options**
- **Microbial**: Standard testing, sequencing, environmental, settle plates, water counts
- **Chemistry**: Heavy metals, minerals, solvents, pesticides, mycotoxins, terpenes, potency
- **Other**: Plant tissue panels, early detection (powdery mildew, russet mites), plant virus testing, stability testing, moisture/water activity, density, foreign matter

### Implementation Details

#### Mock Data
```javascript
// Mock Clients (Ohio-based)
const mockClients = [
  { id: 1, name: 'Environmental Solutions Inc.', city: 'Columbus', state: 'OH' },
  { id: 2, name: 'Green Valley Cultivators', city: 'Cleveland', state: 'OH' },
  // ... etc
];

// Mock Samplers (Trained technicians only)
const mockSamplers = [
  { id: 1, name: 'Michael Chen', certificationLevel: 'Senior Technician' },
  { id: 2, name: 'Sarah Johnson', certificationLevel: 'Lead Sampler' },
  // ... etc
];
```

#### State Management
- Form data includes:
  - Client information with autocomplete
  - Collection date/time (labeled as "Collection Start Time")
  - Customer-selected boolean flag
  - Sampler information (disabled when customer-selected)
  - Chain of custody transfer details
  - Multiple samples with individual test requirements

#### Business Rules
1. **Customer Selection Impact**: When customerSelected = true, sampler fields become "N/A"
2. **Required Fields**: All fields marked with red asterisk are required
3. **Deadline Calculation**: Each assay has predefined turnaround times in business days
4. **Sample IDs**: User-defined, typically follow pattern like "CB104-001"
5. **COC Number**: Auto-generated as `COC-YYYY-####`

### User Workflow
1. Client information auto-populates from search or can be entered new
2. Select whether samples are customer-selected (affects sampler requirements)
3. Enter collection date and start time
4. Add one or more samples with:
   - Sample ID and type
   - Description and collection location
   - Container type and preservation method
   - Testing requirements
   - Optional individual analyte selection
5. Complete chain of custody transfer information
6. Submit to create Non-Metrc Order

### Developer Notes
- Component located at `/src/pages/receiving/NonMetrcSamples.js`
- Uses React hooks for state management
- No backend integration - all data is mock/demo
- Autocomplete uses filter-as-you-type pattern
- Form validation uses HTML5 required attributes
- Responsive design with Tailwind CSS grid system