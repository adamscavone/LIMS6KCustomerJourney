# LIMS Senior Chemist Dashboard Prototype

React-based functional prototype for the LIMS6000 Senior Chemist Dashboard with comprehensive workflow management.

## Quick Start

```bash
cd dashboard
npm install
npm start
```

Navigate to http://localhost:3000 to view the dashboard.

## Key Features

### Multi-Page Application
- **Main Dashboard** (`/`): Overview of all pipelines with review batches and sample tracking
- **Prep Batch Management** (`/prep-batch/:assayType`): Create and manage preparation batches
- **Analysis Batch View** (`/analysis-batch/:assayType/:batchId`): Queue batches for instruments and upload results

### Pipeline-Specific View Modes
- **Order View**: Date-based grouping with workflow status subdivisions
- **Sample View**: Phase-based workflow showing individual sample progression
- Independent toggle per pipeline (not global)

### Workflow Status Organization (Due Today)
Orders grouped by critical status (most behind first):
1. Available for Prep
2. In Preparation
3. Prep Complete (Awaiting Batch)
4. On Instrument
5. Awaiting Instrument Data
6. Primary Review Pending
7. Secondary Review Pending
8. Ready to Report

### Realistic Laboratory Workflow
- **73 mock samples** across three pipelines showing various states
- **Multi-sample orders** (1-5 samples per order)
- **Automatic sample checkout** when added to batches
- **Single analyst per batch** requirement enforced
- **Partial batch completion** via "Return Samples" feature
- **Windows-native multi-select** (Ctrl+Click, Shift+Click)

## Important System Design

### Air Gap Between LIMS and Instruments
The system explicitly handles the disconnect between LIMS and analytical instruments:

1. **Analysis Batch Creation**: Combines prep batches for instrument runs
2. **Instrument Selection**: Choose from available instruments with status tracking
3. **Queue Management**: Shows position and estimated start times
4. **Manual Result Upload**: Scientists upload exported instrument files (CSV, TXT, XML)
5. **Review Workflow**: Send uploaded results to review process

This design acknowledges that instruments operate independently and require manual data transfer.

### Business Rules Enforced
- All samples in a batch must be prepared by the same analyst
- Samples automatically checked out when added to batch
- Pipeline-specific SOPs (e.g., SOP-CANNABINOIDS-PREP-v3.2)
- Business day calculations exclude weekends
- Status progression must follow defined workflow

### Accessibility Features
- Colorblind-friendly palette (blue for success, orange for warnings)
- All status indicators use color AND icons/borders
- Higher contrast colors (700/800 shades)
- Clear visual hierarchy and grouping

## Technical Stack
- React 18 with hooks
- React Router v6 for navigation
- Tailwind CSS (via CDN)
- lucide-react for icons
- No external state management (appropriate for prototype)

## Mock Data
Comprehensive dataset includes:
- Overdue samples requiring immediate attention
- Rush priority orders mixed with standard
- Various workflow states from receipt to reporting
- Realistic order groupings and timing
- Consistent status-to-UI mapping