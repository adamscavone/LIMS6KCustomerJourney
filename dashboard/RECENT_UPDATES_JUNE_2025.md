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

## Receiving-v2: Compliance vs Non-Compliance Testing Architecture

### Date: June 25, 2025

#### Major Conceptual Shift
Restructured the receiving system to properly categorize samples by **Compliance vs Non-Compliance** testing rather than the previous **Metrc vs Non-Metrc** distinction. This change reflects the true operational difference in how samples are processed through the laboratory.

#### Key Understanding
The original categorization by source (Metrc/Non-Metrc) was incorrect because:
- Many Metrc samples undergo non-compliance testing (R&D, genetic sequencing, pathogen testing)
- Many non-Metrc samples follow compliance workflows with pass/fail criteria
- The meaningful distinction is whether testing results in regulatory pass/fail determination

#### New Architecture

##### 1. Navigation Structure
Added new "Receiving-v2" dropdown with three options:
- **Compliance Testing**: All samples requiring pass/fail determination
- **Non-Compliance Testing**: Research, development, and informational testing
- **Import Manifest**: Bulk import functionality for Excel/CSV files

##### 2. Compliance Testing Page (`/receiving-v2/compliance`)
Handles samples that require regulatory compliance determination:
- **Metrc Compliance Samples**:
  - State-required testing (DPM, PPPT, etc.)
  - R&D samples that follow compliance workflows
- **Non-Metrc Compliance Samples**:
  - Environmental samples (EPA standards)
  - Food safety testing (FDA/USDA standards)
  - Water quality testing

##### 3. Non-Compliance Testing Page (`/receiving-v2/non-compliance`)
Manages research and informational testing without pass/fail:
- **Metrc R&D Samples**:
  - Early gender identification
  - Genetic sequencing
  - Plant pathogen testing
  - Nutrient analysis
- **Non-Metrc R&D Samples**:
  - Soil nutrient panels
  - Genetic profiling
  - Custom research projects

##### 4. Import Manifest Page (`/receiving-v2/import`)
Provides bulk import capability with:
- Drag-and-drop file upload interface
- Template downloads for proper formatting
- Expected file format documentation
- Placeholder message: "You will be able to upload Excel versions of manifests here"

#### Technical Implementation

##### File Structure
```
src/pages/receiving-v2/
├── ComplianceReceiving.js (293 lines)
├── NonComplianceReceiving.js (244 lines)
└── ImportManifest.js (226 lines)
```

##### Routing Updates
```javascript
// src/index.js
<Route path="/receiving-v2/compliance" element={<ComplianceReceiving />} />
<Route path="/receiving-v2/non-compliance" element={<NonComplianceReceiving />} />
<Route path="/receiving-v2/import" element={<ImportManifest />} />
```

##### Navigation Updates
```javascript
// src/components/navigation/TopNavigation.js
{
  id: 'receiving-v2',
  label: 'Receiving-v2',
  icon: Package,
  items: [
    { label: 'Compliance Testing', path: '/receiving-v2/compliance' },
    { label: 'Non-Compliance Testing', path: '/receiving-v2/non-compliance' },
    { label: 'Import Manifest', path: '/receiving-v2/import' }
  ]
}
```

#### Key Design Decisions

1. **Preservation of Existing System**: All original receiving pages remain intact as they've been handed off to developers

2. **Clear Visual Distinction**:
   - Compliance pages use blue color scheme
   - Non-compliance pages use purple color scheme
   - Import page maintains neutral gray scheme

3. **Information Architecture**:
   - Each page includes educational info boxes explaining the category
   - Collapsible sections for better organization
   - Icons to visually distinguish test types

4. **Chain of Custody Integration**:
   - Non-Metrc samples use comprehensive Chain of Custody forms
   - Tracks sample collection, transfer, and testing requirements
   - Supports 20+ test types from microbial to plant virus testing

#### Future Considerations

1. **Unified Sample Entry**: Consider merging the four receiving steps into a single streamlined flow

2. **Smart Routing**: Automatically route samples to compliance/non-compliance based on test selection

3. **API Integration**: Connect Import Manifest to existing file parser service

4. **Mobile Optimization**: Enhance Chain of Custody entry for field collection

5. **Workflow Intelligence**: Auto-suggest compliance vs non-compliance based on client history

#### Developer Handoff Notes

This Receiving-v2 system represents a conceptual restructuring that better aligns with laboratory operations. The existing receiving system (Receiving1-4, NonMetrcReceiving1-4) has already been delivered to developers and should not be modified. The new system provides:

1. **Clearer mental model** for lab personnel
2. **Reduced errors** in test category selection
3. **Better alignment** with regulatory requirements
4. **Scalability** for new test types and regulations

The implementation maintains all existing functionality while providing a more intuitive categorization that reflects how samples actually flow through the laboratory.

## Receiving System Restructure - Metrc-Centric Approach

### Date: June 25, 2025 (Revised)

#### Revised Approach
After review, the receiving system has been restructured to maintain the Metrc/Non-Metrc distinction as the primary categorization, recognizing that 90% of samples come through Metrc API integration.

#### Key Changes

##### 1. Removed Receiving-v2 System
- Deleted all Receiving-v2 components and routes
- Removed the compliance/non-compliance categorization approach
- Simplified navigation back to two main options

##### 2. Enhanced Metrc Receiving
Added new "Other" assays to Receiving4.js to handle all Metrc samples including R&D:
- **Genetic Sequencing**: For strain identification and genetic analysis
- **Homogenate Testing**: For testing blended/homogenized samples
- **Stability Testing**: For shelf-life and degradation studies
- **Package Testing**: For container/packaging compatibility
- **Density**: For product density measurements

These additions allow the Metrc Receiving interface to handle ANY samples logged into Metrc, including:
- Compliance testing (DPM, PPPT, etc.)
- R&D testing (plant pathogens, genetics, etc.)
- Customer-requested specialty testing

##### 3. New Non-Metrc Samples Interface
Created a dedicated interface for the 10% of samples that don't come through Metrc:

**Features:**
- **Manual Entry Tab**: For individual sample creation with chain of custody
- **Bulk Upload Tab**: For Excel/CSV import of multiple samples
- **Placeholder Messages**: Clear indication that features are under development
- **Template Downloads**: Future capability for downloading import templates
- **Chain of Custody Preview**: Shows the comprehensive data collection planned

**Navigation:**
- Simplified to "Metrc Receiving" and "Non-Metrc Samples" in dropdown
- Removed complex multi-step workflows for Non-Metrc samples

#### Benefits of Revised Approach

1. **Operational Efficiency**: 90% of samples handled through familiar Metrc interface
2. **Flexibility**: Metrc interface can now handle all testing types via expanded assay list
3. **Simplicity**: Clear binary choice - samples either come from Metrc or they don't
4. **Future-Ready**: Non-Metrc interface ready for enhancement without disrupting main workflow

#### Technical Implementation

```javascript
// Added to Receiving4.js assay lists
{ key: 'geneticSequencing', name: 'Genetic Sequencing', type: 'other' },
{ key: 'homogenateTesting', name: 'Homogenate Testing', type: 'other' },
{ key: 'stabilityTesting', name: 'Stability Testing', type: 'other' },
{ key: 'packageTesting', name: 'Package Testing', type: 'other' },
{ key: 'density', name: 'Density', type: 'other' }
```

```javascript
// New route for Non-Metrc samples
<Route path="/non-metrc-samples" element={<NonMetrcSamples />} />
```

#### Developer Notes

The previous Receiving-v2 system has been completely removed. The current implementation focuses on:
1. Enhancing the existing Metrc Receiving to handle all Metrc samples
2. Providing a placeholder for future Non-Metrc sample handling
3. Maintaining backward compatibility with existing receiving workflows

This approach better aligns with actual laboratory operations where Metrc integration is the primary sample source.

## Non-Metrc Samples Enhancement

### Date: June 25, 2025 (Updated)

#### Overview
Enhanced the Non-Metrc Samples interface with professional features for handling samples outside the Metrc system, including environmental testing, R&D samples, and customer-submitted materials.

#### Key Enhancements

##### 1. Customer-Selected/Submitted Samples
- Added checkbox to indicate when samples were selected by the customer (not collected by North Coast technicians)
- When checked:
  - Sampler Name field auto-fills with "N/A" and becomes disabled
  - Sampler Signature field auto-fills with "N/A" and becomes disabled  
  - Relinquishment signature serves as the only required signature
- Critical distinction for compliance and quality assurance
- Yellow warning box explains the importance of this designation

##### 2. Professional Autocomplete Features
- **Client Autocomplete**: 
  - Search from 5 mock Ohio-based clients
  - "Save as new client" option for unmatched entries
  - Shows city and state in dropdown
- **Sampler Autocomplete**:
  - Search from 6 trained technicians
  - Shows certification level (Senior Technician, Lead Sampler, etc.)
  - No ability to add new samplers (requires training certification)
  - Disabled when customer-selected is checked

##### 3. Mock Data Implementation
```javascript
// Ohio-based test clients
const mockClients = [
  'Environmental Solutions Inc.' (Columbus),
  'Green Valley Cultivators' (Cleveland),
  'Buckeye Botanicals' (Cincinnati),
  'Ohio Organic Farms' (Dayton),
  'Environmental Testing Labs' (Toledo)
];

// Trained sampling technicians
const mockSamplers = [
  'Michael Chen' (Senior Technician),
  'Sarah Johnson' (Lead Sampler),
  'David Martinez' (Sampling Technician),
  'Emily Williams' (Senior Technician),
  'James Thompson' (Sampling Technician),
  'Maria Rodriguez' (Lead Sampler)
];
```

##### 4. UI/UX Improvements
- **Sample Type Reorganization**: Environmental samples moved to top of dropdown (most frequently used)
- **Collection Start Time**: Renamed from "Collection Time" for clarity
- **Non-Metrc Order**: Changed from "Chain of Custody" throughout:
  - Page subtitle: "Create orders for samples not in Metrc system"
  - Form header: "New Non-Metrc Order"
  - Submit button: "Create Non-Metrc Order"
  - Table header: "Recent Non-Metrc Orders"

##### 5. Individual Analyte Selection Enhancement
- **Progressive Disclosure**: "Select Individual Analytes" checkbox only appears when relevant
- **Comprehensive Analyte Lists**:
  - Microbial: Ohio-specific analytes including Aspergillus species
  - Plant Pathogens: 12 viruses, fungi, and mites from provided CSV
  - Chemistry: Full panels for heavy metals, pesticides, mycotoxins, etc.
- **Smart Detection**: `hasAssaysWithAnalytes()` function determines when to show checkbox
- **Visual Indicators**: Yellow highlighting for whitelisted analytes

##### 6. Technical Implementation
- Component maintains all previous functionality
- Added state variables for sampler search
- Customer-selected logic integrated throughout form
- Proper field validation and required field handling
- Responsive design maintained

#### Business Value
1. **Compliance**: Clear documentation of sampling methodology
2. **Efficiency**: Autocomplete reduces data entry time
3. **Quality**: Distinction between customer vs. professional sampling
4. **Flexibility**: Handles diverse sample types beyond cannabis
5. **Accuracy**: Individual analyte selection prevents over-testing

#### Developer Notes
- All changes backward compatible
- Mock data can be easily replaced with API calls
- Form validation uses HTML5 patterns
- State management via React hooks
- No external dependencies added