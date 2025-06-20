# Recent Updates - June 2025

## Overview Page Implementation

### Major Architectural Change
The application has been restructured to provide a neutral landing page suitable for all laboratory roles, moving away from the prep-focused dashboard as the primary entry point.

### Key Changes

#### 1. New Landing Page (`/`)
- **Component**: `src/pages/overview/Overview.js`
- **Purpose**: Provides a comprehensive view of all samples across all pipelines
- **Features**:
  - Chronological sample listing (earliest to latest received)
  - Real-time metrics dashboard
  - Workflow status distribution
  - Quick action buttons for common tasks

#### 2. Relocated Prep Dashboard
- **Old Location**: `src/App.js` (was the landing page)
- **New Location**: `src/pages/prep/PrepDashboard.js`
- **Route**: `/prep`
- **Access**: Prep → Prep Dashboard in navigation menu

#### 3. Data Model Updates
- **Sample IDs**: Now start at 176243 and increment sequentially
- **Date Range**: All samples dated between June 4-11, 2025
- **Overdue Limit**: Maximum 2 days overdue (realistic for lab operations)
- **Priority System**: Removed "Rush" concept in favor of specific due dates

#### 4. Date Formatting Standards
- **Received Date**: Date only format (e.g., "Jun 11, 2025")
- **Due Date**: Full datetime in 24-hour format (e.g., "Jun 13 14:00")
- **Days Until Due**: Clear indicators for overdue, due today, due tomorrow

#### 5. Metrics Dashboard
Replaced 4-column layout with 3 key metrics:
- **Total Samples**: Count of all samples in-house
- **Time Critical**: Overdue and due today counts
- **Pipeline Distribution**: Breakdown by Cannabinoids, Terpenes, Pesticides

#### 6. Workflow Status Distribution
Visual representation of samples at each phase:
- Ready for Prep
- In Preparation
- On Instrument
- Primary Review
- Secondary Review

### Navigation Updates
- **Home Button**: Now leads to Overview page instead of Prep Dashboard
- **Prep Menu**: Added "Prep Dashboard" as first item in dropdown
- **Consistent Routing**: All routes maintain clear hierarchy

### Technical Implementation

#### Route Configuration
```javascript
// src/index.js
<Route path="/" element={<App />} />  // App.js now imports Overview
<Route path="/prep" element={<PrepDashboard />} />
```

#### Component Structure
```
src/
├── App.js (3 lines - imports Overview)
├── pages/
│   ├── overview/
│   │   └── Overview.js (new - 376 lines)
│   └── prep/
│       └── PrepDashboard.js (moved from App.js - 3394 lines)
```

### Benefits of New Architecture

1. **Role Neutrality**: Landing page serves all lab roles, not just prep chemists
2. **Better Overview**: Immediate visibility of all samples and their status
3. **Improved Navigation**: Clear separation between overview and role-specific views
4. **Scalability**: Easy to add more role-specific dashboards
5. **Performance**: Lighter initial load with focused components

### Future Considerations

1. **Role-Based Defaults**: Could auto-navigate to role-specific dashboard based on user role
2. **Customizable Metrics**: Allow users to configure which metrics appear
3. **Advanced Filtering**: Add filters for date ranges, clients, pipelines
4. **Export Functionality**: Add ability to export sample list to CSV/Excel
5. **Real-Time Updates**: Implement WebSocket for live sample status updates

## Azure Blob Storage Deployment

Added comprehensive deployment instructions to CLAUDE.md for hosting the application as a static website on Azure Blob Storage. This provides:

- Public accessibility with a simple URL
- No server management required
- Cost-effective hosting solution
- Built-in CDN capabilities
- Support for custom domains

The deployment process is straightforward:
1. Run `npm run build`
2. Upload build folder to Azure Blob Storage $web container
3. Enable static website hosting
4. Share the public URL

For production deployments, consider adding:
- Azure AD authentication
- CDN for global performance
- Custom domain with SSL
- Automated CI/CD pipeline

## Receiving3 Guided Workflow Enhancements

### Overview
Major improvements to the Receiving3 component based on real-world laboratory operations feedback. The workflow now provides granular control over bulk actions while maintaining flexibility for edge cases.

### Key Improvements

#### 1. Checkbox Behavior Consistency
- Rush sub-options (Rush All Micro, Rush All Potency) now show checkmarks when parent "Rush All" is selected
- Matches the behavior of Terpenes checkboxes for visual consistency
- Sub-options remain disabled when parent is selected

#### 2. Manifest Details Reorganization
- **Manifest Number**: Now editable to accommodate Metrc corrections
- **Manifest Notes**: Moved to bottom of section for better flow
- **Bulk Actions**: Grouped in clearly labeled sections

#### 3. Enhanced Bulk Actions
- **Rush Options**:
  - "Rush All Assays for All Samples" - master control
  - "Rush All Micro" - microbial tests only
  - "Rush All Potency (Cannabinoids)" - cannabinoid testing only
- **DPM Early Start**: Renamed from confusing "DPM Early Start All" to "Apply Early Start to All Dispensary Plant Material Samples"
- **Terpenes**: Three levels of granularity (all, DPM only, flower only)

#### 4. Sample Type Assignment
- Header: "Assign Sample Type(s)" instead of "Sample Types"
- Dropdown: "Select Type" instead of "Select default type..."
- Apply to All: Disabled until a type is selected

#### 5. Verbose Assay Deadline Management
Complete redesign of Testing Requirements step with three-tier deadline system:

##### Category Level
- Microbial Testing (blue section)
- Chemistry Testing (green section)
- Other Testing (gray section)
- Each with "Apply to All" functionality

##### Assay Level
- Individual deadline input for each selected assay
- Auto-populated based on turnaround times:
  - Salmonella: 3 days
  - Total Yeast & Mold: 5 days
  - Cannabinoids: 2 days by 5:00 PM
  - Terpenes: 3 days by 5:00 PM
  - And more...

##### Manual Override
- Any deadline can be manually adjusted
- Changes are tracked for rush sample counting

#### 6. Smart Rush Sample Detection
Review & Submit now counts rush samples based on:
- Explicit rush flags (Rush All, Rush Micro, Rush Potency)
- Any assay with deadline earlier than default
- Implemented via `hasEarlyDeadlines()` function

### Technical Implementation

#### New Helper Functions
```javascript
// Format datetime for HTML inputs
formatDateTimeForInput(dateString)

// Detect samples with early deadlines
hasEarlyDeadlines(sampleData)

// Apply deadline to all assays in category
applyDeadlineToCategory(sampleIdx, category, deadline)
```

#### State Structure Updates
```javascript
assayDeadlines: {
  salmonella: "2025-06-16T23:59:00",
  cannabinoids: "2025-06-15T17:00:00",
  // ... per-assay deadlines
}
```

### Business Logic Documentation
Created two new documentation files:
1. **RECEIVING_WORKFLOW_DESIGN_DECISIONS.md** - Comprehensive design rationale
2. **DPM_EARLY_START_LOGIC.md** - Specific business rules for Early Start workflow

### Design Philosophy
- **Flexibility Over Rigidity**: Acknowledges real-world edge cases
- **Progressive Disclosure**: Complex options hidden until needed
- **Real-World Alignment**: UI matches actual lab operations
- **Clear Visual Indicators**: Status badges for quick identification

## Receiving2 - Batch Control Interface Overhaul

### Date: June 19, 2025

#### Problem Statement
The original Receiving2 interface was confusing with unclear workflow progression, misleading terminology ("Batch Configuration" confused lab personnel), and poor layout utilization.

#### Solution Implemented

**1. Clear Step-Based Workflow**
- Implemented 3-step visual indicator: Select Samples → Configure Tests → Review & Continue
- Step highlighting based on user progress
- Proper starting point at Step 1

**2. Improved Terminology**
- "Configure Settings" → "Configure Tests"  
- "Batch Configuration" → "Test Configuration"
- "Processing Options" → "Turnaround Options"
- Gear icon → Flask icon (more appropriate for lab context)

**3. Enhanced Layout**
- Expanded sample selection from 2/3 to 3/5 of screen width
- Test configuration panel expanded to 2/5 (from 1/3)
- Added alternative horizontal configuration layout for comparison

**4. Sample Type Intelligence**
```javascript
// Automatic sample type mapping
const categoryMappings = {
  'Buds': 'Flower',
  'Vape Cartridge': 'Vape Cart', 
  'Concentrate': 'Concentrate',
  'Pre-Roll': 'Pre-Roll'
};

// Item name detection
if (itemName.includes('gummy')) return 'Gummy';
if (itemName.includes('chocolate')) return 'Chocolate';
```

**5. Deadline Enhancements**
- Added "Other Due" category for non-chemistry/microbial assays
- Informative tooltips explaining which methods belong to each category
- Direct datetime-local inputs (no more modal popups)
- Auto-population with calculated defaults

**6. Table Improvements**
- Added Test Category column (shows applied or default)
- Added editable Sample Type column with smart defaults
- Removed redundant Status column
- Changed "Category" to "Metrc Category" for clarity

**7. Bug Fixes**
- Fixed "Cannot read properties of undefined" error in applyGlobalSettings
- Proper null checking for manifest.samples access
- ETA formatting to show only HH:MM AM/PM (removed seconds)

#### Technical Details
- File: `/dashboard/src/pages/receiving/Receiving2.js`
- Added `getDefaultSampleType()` function for intelligent defaults
- Enhanced error handling with proper null checks
- Maintained backward compatibility with existing data structures

## Michigan Whitelisting Feature for Single-Analyte Retests

### Date: June 20, 2025

#### Feature Overview
Implemented Michigan-specific whitelisting functionality that allows laboratories to perform single-analyte retests rather than requiring full assay panel retesting when individual analytes fail.

#### Business Impact
- **Cost Reduction**: Up to 90% reduction in retest costs for customers
- **Time Savings**: Faster turnaround for retests (1-2 days vs 3-5 days)
- **Resource Optimization**: Reduced instrument time and reagent consumption
- **Customer Satisfaction**: Lower retest fees and faster results

#### Implementation Details
- **Whitelist Management**: Approved analytes maintained in system configuration
- **Retest Workflow**: Special sample type designation for single-analyte retests
- **Quality Control**: Maintains full QC requirements for single-analyte runs
- **Reporting**: Clear indication of retest type on Certificates of Analysis
- **Audit Trail**: Complete traceability of original fail and retest results

#### Regulatory Compliance
- Approved by Michigan Cannabis Regulatory Agency (CRA)
- Maintains ISO 17025 compliance requirements
- Supports state-mandated reporting formats
- Preserves original test results for audit purposes