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

1. **Single Component Architecture**: The entire dashboard is implemented in `src/App.js` (1374 lines). This monolithic approach was chosen for rapid prototyping but should be refactored into smaller components for production use.

2. **Mock Data Pattern**: All sample data, batch information, and pipeline statuses are hardcoded within the component. Look for these data structures when understanding the domain:
   - `mockSamples`: Cannabis sample testing data
   - `mockPrimaryBatches`: Batch-level groupings
   - `mockQCBatches`: Quality control batch data
   - Pipeline-specific arrays for Cannabinoids, Terpenes, and Pesticides

3. **State Management**: Uses React hooks (useState) for all state management. No external state management library is used.

4. **Styling**: Tailwind CSS is loaded via CDN in `public/index.html`. All styling uses Tailwind utility classes inline.

5. **Icons**: Uses lucide-react for all UI icons (ChevronDown, Clock, AlertCircle, etc.)

### Domain Context

This dashboard manages laboratory testing workflows for cannabis samples with three main pipelines:
- **Cannabinoids**: THC/CBD potency testing
- **Terpenes**: Terpene profile analysis  
- **Pesticides**: Pesticide contamination testing

Each sample moves through phases: Sample Receipt → Sample Prep → Analysis → Data Review → Reporting

### Development Notes

- No routing implemented - single page application
- No API integration - all data is mocked
- No authentication/authorization
- Responsive design using Tailwind's grid system
- Real-time clock updates every second
- Expandable/collapsible UI sections throughout

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

5. **Data Display Principles**:
   - Orders show: Order ID, Client, Sample count, Received date, Priority (if rush)
   - Overdue items always appear in "Due Today" section with red "OVERDUE" indicator
   - Consistent date groupings across all pipelines for predictable UI
   - Expandable orders in Order View show sample details without page navigation