# LIMS Laboratory Information Management System

React-based application for cannabis testing laboratory workflow management, serving multiple roles including lab technicians, chemists, reviewers, and management.

## Quick Start

```bash
cd dashboard
npm install
npm start
```

Navigate to http://localhost:3000 to view the dashboard.

## Key Features

### Multi-Page Application
- **Overview** (`/`): Laboratory-wide view of all samples across all pipelines, sorted chronologically
- **Prep Dashboard** (`/prep`): Pipeline-specific dashboard for sample preparation workflows
- **Sampling** (`/sampling`): Driver route management for sample collection
- **Receiving** (`/receiving`): Metrc manifest intake and sample registration
- **Prep Batch Management** (`/prep-batch/:assayType`): Create and manage preparation batches
- **Analysis Batch View** (`/analysis-batch/:assayType/:batchId`): Queue batches for instruments and upload results
- **Review Queue** (`/review-queue/:assayType`): Comprehensive review interface for primary, secondary, and completed reviews
- **Bench Sheet** (`/bench-sheet/:prepBatchId`): Sample preparation data capture with auto-population from prep batches

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
- **Mock samples** with IDs starting at 176243
- **Date range**: June 4-11, 2025 (maximum 2 days overdue)
- **Multi-sample orders** (1-5 samples per order)
- **Automatic sample checkout** when added to batches
- **Single analyst per batch** requirement enforced
- **Partial batch completion** via "Return Samples" feature
- **Windows-native multi-select** (Ctrl+Click, Shift+Click)
- **Focus on specific due dates** rather than rush priorities

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
- No null values allowed - all fields must contain data or "N/A"
- Negative values prevented for weights and volumes
- Product type required for all non-QC samples

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
- Overdue samples requiring immediate attention (max 2 days)
- Various workflow states from receipt to reporting
- Realistic order groupings and timing
- Date range: June 4-11, 2025
- Sample IDs starting at 176243
- Consistent status-to-UI mapping

## Deployment

### Local Development
```bash
npm install
npm start
```

### Production Build
```bash
npm run build
```

### Azure Blob Storage Deployment
1. Create Azure Storage account
2. Enable static website hosting
3. Upload contents of `build/` folder to `$web` container
4. Access via: `https://<storage-account>.z13.web.core.windows.net/`

See CLAUDE.md for detailed deployment instructions including CORS configuration, custom domains, and CI/CD setup.

## Documentation

### Architecture & Design
- [CLAUDE.md](CLAUDE.md) - Comprehensive project guide and development instructions
- [Project Overview](../ProjectOverview.md) - High-level system overview
- [Customer Journey Design Plan](../CustJourneyDesignPlan.md) - Design decisions and user flows
- [Workflow Innovations](../WorkflowInnovations.md) - Key workflow improvements

### Implementation Details
- [Recent Updates](RECENT_UPDATES_JUNE_2025.md) - Latest changes and improvements
- [Navigation Implementation Summary](NAVIGATION_IMPLEMENTATION_SUMMARY.md) - Navigation patterns and structure
- [Test Category Management](TEST_CATEGORY_MANAGEMENT.md) - Test category configuration
- [Receiving Workflow Design Decisions](RECEIVING_WORKFLOW_DESIGN_DECISIONS.md) - Detailed rationale for Receiving3 implementation
- [DPM Early Start Logic](DPM_EARLY_START_LOGIC.md) - Business logic for DPM Early Start workflow
- [Michigan Features](MICHIGAN_FEATURES.md) - Michigan-specific features including single-analyte retest whitelisting

### Deployment Guides
- [Azure Deployment Guide](AZURE_DEPLOYMENT_GUIDE.md) - Step-by-step Azure deployment
- [Deployment Options](DEPLOYMENT_OPTIONS.md) - Various deployment platforms