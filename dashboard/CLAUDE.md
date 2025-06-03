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
   - Main dashboard remains in `src/App.js` for overview and pipeline management
   - New page components in `src/pages/` for specific workflows
   - `src/pages/prep-batch/PrepBatchManagement.js`: Handles preparation batch creation and management

2. **Routing**: 
   - React Router v6 implemented for navigation between dashboard and workflow pages
   - Routes defined in `src/index.js`
   - Current routes:
     - `/`: Main dashboard
     - `/prep-batch/:assayType`: Preparation batch management for specific assay types

3. **Mock Data Pattern**: All sample data, batch information, and pipeline statuses are hardcoded within the components. Look for these data structures when understanding the domain:
   - `mockSamples`: Cannabis sample testing data
   - `mockPrimaryBatches`: Batch-level groupings
   - `mockQCBatches`: Quality control batch data
   - Pipeline-specific arrays for Cannabinoids, Terpenes, and Pesticides
   - `availableSamples` and `activePrepBatches` in PrepBatchManagement

4. **State Management**: 
   - Uses React hooks (useState) for all state management
   - Pipeline-specific view modes (`viewModes` object) for independent Order/Sample view toggling
   - No external state management library is used

5. **Styling**: Tailwind CSS is loaded via CDN in `public/index.html`. All styling uses Tailwind utility classes inline.

6. **Icons**: Uses lucide-react for all UI icons (ChevronDown, Clock, AlertCircle, etc.)

### Domain Context

This dashboard manages laboratory testing workflows for cannabis samples with three main pipelines:
- **Cannabinoids**: THC/CBD potency testing
- **Terpenes**: Terpene profile analysis  
- **Pesticides**: Pesticide contamination testing

Each sample moves through phases: Sample Receipt → Sample Prep → Analysis → Data Review → Reporting

#### Preparation Batch Management

The preparation batch workflow is critical for maintaining data integrity and traceability:

1. **Batch Creation Requirements**:
   - Samples must be prepared together under the same Standard Operating Procedure (SOP)
   - Same analyst must perform all preparations in a batch
   - All equipment used must be tracked with serial numbers and calibration dates
   - Preparations should occur at approximately the same time

2. **Equipment Tracking**:
   - Analytical balances
   - Bottle-top dispensers
   - Autopipettes
   - Calibrated syringes
   - Vortex mixers
   - Each device requires serial number and calibration due date

3. **Exceptions**:
   - Rush samples can be added to existing analytical batches if fully prepped
   - This allows expedited analysis without waiting for a full batch

4. **Navigation**:
   - Users can navigate from any pipeline's "Awaiting Prep" samples to the Prep Batch Management page
   - The "Manage Prep Batches" button appears in each pipeline header

### Development Notes

- React Router v6 implemented for navigation between pages
- No API integration - all data is mocked
- No authentication/authorization
- Responsive design using Tailwind's grid system
- Real-time clock updates every second
- Expandable/collapsible UI sections throughout
- Pipeline-specific view mode toggles (Order/Sample view)

### UI Design Patterns

1. **Dual View Modes**: 
   - **Order View**: Groups samples by customer order with date-based sections (Due Today, Due Tomorrow, Due [Weekday])
   - **Sample View**: Shows individual samples organized by workflow phase

2. **Order View Date Groupings**:
   - "Due Today" includes any overdue items with "OVERDUE" visual indicator
   - "Due Tomorrow" shows next business day's orders
   - "Due [Weekday]" dynamically shows business day after tomorrow (skips weekends)
   - Orders are expandable to show constituent samples
   - No redundant "TODAY" indicator in Due Today section
   - Each order shows "Received On" date for context

3. **Sample View Phase Groupings**:
   - Awaiting Prep → Checked Out for Prep → Ready for Analysis → On Instrument
   - Status chips removed in Sample View for cleaner interface
   - Phase names use active voice to indicate required actions

4. **Key UI Decisions**:
   - Multi-sample orders are the norm (realistic lab workflow)
   - Removed all redundant status labels ("PREP REQUIRED", "BATCH ASSIGNMENT", etc.)
   - Removed QC Monitoring section from sidebar
   - Removed vertical lines in nested instrument batch displays
   - Air gap between LIMS and instruments acknowledged in "Awaiting Instrument Results" phase
   - Dynamic date calculations use business days (excludes weekends)
   - Mock data uses relative dates (today, yesterday, etc.) for realistic testing
   - Review Batches given equal visual prominence as Pipeline sections (not relegated to sidebar)

5. **Data Display Principles**:
   - Orders show: Order ID, Client, Sample count, Received date, Priority (if rush)
   - Samples show: Sample name, Client, Received date, Goal date, Reporting due date
   - Overdue items always appear in "Due Today" section with red "OVERDUE" indicator
   - Consistent date groupings across all pipelines for predictable UI
   - Expandable orders in Order View show sample details without page navigation
   - Three critical dates tracked: Received date, Goal date (internal), Reporting due date (customer-facing)
   - Goal date calculated as one business day before reporting due date

6. **Accessibility Design**:
   - Colorblind-friendly palette: Blue for success (not green), Orange for warnings (not yellow)
   - All colored elements include borders for visual redundancy
   - Higher contrast colors used throughout (700/800 shades instead of 600)
   - Status indicators combine both color and icons where possible

7. **Layout Architecture**:
   - Left column (3 units): Today's Overview + DPM Early Start
   - Main area (9 units): Review Batches (Primary & Secondary) + Pipeline sections
   - Review Batches displayed in 2-column grid at top of main area for prominence
   - Equal visual treatment for review work and pipeline work (acknowledges overnight data review workflow)