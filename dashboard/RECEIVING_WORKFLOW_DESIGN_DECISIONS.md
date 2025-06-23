# Receiving Workflow Design Decisions

## Overview
This document captures key design decisions made during the implementation of the Receiving3 guided workflow component, based on discussions about real-world laboratory operations and user needs.

## Key Design Principles

### 1. Flexibility Over Rigidity
- **Test Category Changes**: While test categories are generally rigid (set in Metrc), they can be changed through approved tickets. The system allows manual updates to reflect these "air-gapped" decisions.
- **Manifest Number Editing**: Made editable to accommodate corrections and updates from Metrc.

### 2. Granular Control with Bulk Actions
The workflow provides multiple levels of control:
- **Manifest-level**: Bulk actions that apply to all samples
- **Category-level**: Actions that apply to specific test categories or sample types
- **Sample-level**: Individual sample customization
- **Assay-level**: Fine-grained deadline control per test

## Major Features Implemented

### June 2025 Updates - Receiving2 Overhaul

#### UI/UX Improvements
- **Step-Based Workflow**: Clear 3-step process (Select Samples → Configure Tests → Review & Continue)
- **Improved Layout**: Wider sample selection area (3/5 of screen) with better space utilization
- **Dual Configuration Views**: 
  - Vertical panel (blue) for traditional scrolling
  - Horizontal panel (green) for compact, column-based layout
- **Removed Confusion**: 
  - Eliminated "Batch Configuration" terminology (confusing for lab personnel)
  - Replaced with "Test Configuration" throughout
  - Changed "Processing Options" to "Turnaround Options"

#### Sample Type Intelligence
- **Automatic Defaults**: System intelligently sets sample types based on:
  - Metrc Category mappings (Buds → Flower, Vape Cartridge → Vape Cart, etc.)
  - Item name analysis (detects "gummy", "chocolate", "pre-roll" in names)
- **Inline Editing**: Sample types editable directly in the table
- **Bulk Override**: Option to apply a single sample type to all selected samples

#### Deadline Management Enhancements  
- **Three Deadline Categories**: Chemistry, Microbial, and Other (new)
- **Informative Tooltips**: Each deadline field shows which assay methods belong to that category
- **Direct Editing**: All deadlines are immediately editable datetime inputs
- **Auto-population**: Deadlines calculate and pre-fill based on selected assays and rush status

#### Technical Improvements
- **Error Handling**: Fixed undefined property errors in bulk operations
- **Default Values**: Test category now shows current selection by default instead of blank
- **Time Formatting**: ETAs display as "HH:MM AM/PM" without seconds

### 1. Enhanced Bulk Actions (Step 2: Manifest Details)

#### Rush Order Options
- **"Rush All Assays for All Samples"**: Master control that rushes everything
- **"Rush All Micro"**: Rushes only microbial assays
- **"Rush All Potency (Cannabinoids)"**: Rushes only cannabinoid testing

Design Decision: Sub-options are disabled when master "Rush All" is selected, with checkboxes showing as checked to indicate inheritance.

#### DPM Early Start
- **Original Name**: "DPM Early Start All" was confusing
- **New Name**: "Apply Early Start to All Dispensary Plant Material Samples"
- **Purpose**: Compensates for lack of native Metrc indicators for Early Start samples
- **Business Logic**: 
  - Only applies to samples with Test Category = "Dispensary Plant Material"
  - Enables chemistry testing while microbial tests are in progress
  - Sample IDs only appear in non-microbial workflows until micro testing is complete

#### Terpenes Testing
Three levels of granularity:
- Apply to all samples
- Apply to all DPM samples only
- Apply to all flower samples only (Buds/Flower item categories)

### 2. Sample Type Assignment (Step 3)
- **Header Change**: From "Sample Types" to "Assign Sample Type(s)" for clarity
- **Dropdown Text**: Changed from "Select default type..." to "Select Type"
- **Apply to All**: Button is disabled until a type is selected, preventing accidental blank applications

### 3. Verbose Assay Deadline Management (Step 4: Testing Requirements)

#### Three-Tier Deadline System
1. **Category Level**: Bulk deadline setting for Microbial, Chemistry, or Other testing
2. **Assay Level**: Individual deadline per test type
3. **Manual Override**: Any deadline can be manually adjusted

#### Auto-Population Logic
- Deadlines are automatically calculated based on:
  - Manifest received date
  - Assay-specific turnaround times
  - Rush flags (reduces turnaround by 1 day where possible)
  - Business day calculations (excludes weekends)

#### Visual Organization
- **Blue section**: Microbial Testing
- **Green section**: Chemistry Testing  
- **Gray section**: Other Testing
- Each section has its own "Apply to All" functionality

### 4. Smart Rush Sample Counting (Step 5: Review & Submit)
"Rush Samples" count includes samples with:
- Rush All flag
- Rush Micro flag
- Rush Potency flag
- Any assay deadline earlier than its default (detected via `hasEarlyDeadlines` function)

## Technical Implementation Details

### Turnaround Time Data Structure
```javascript
// Example from assayDeadlines.js
salmonella: { days: 3, hours: 23, minutes: 59, method: 'culture' },
cannabinoids: { days: 2, hours: 17, minutes: 0, method: 'HPLC' },
```

### State Management
- All sample data stored in `formData.samples` object
- Each sample tracks:
  - `assays`: Selected tests
  - `assayDeadlines`: Individual test deadlines
  - `isRush`, `isRushMicro`, `isRushPotency`: Rush flags
  - `dpmEarlyStart`: Early start flag
  - `microDue`, `chemistryDue`: Category-level deadlines

### Deadline Cascade Logic
1. When manifest is selected → Default assays populated with calculated deadlines
2. When assay is checked → Deadline calculated based on turnaround time and rush status
3. When category deadline is applied → All selected assays in that category updated
4. When rush flag changes → Affected deadlines recalculated

## User Experience Decisions

### 1. Progressive Disclosure
- Complex options hidden until needed
- Deadlines only shown for selected assays
- Visual indicators (RUSH-M, RUSH-P, EARLY, TERP) provide at-a-glance status

### 2. Error Prevention
- Disabled states prevent invalid actions
- Auto-calculation reduces manual entry errors
- Clear labeling prevents confusion about bulk action scope

### 3. Real-World Alignment
- Terminology matches lab operations ("Apply Early Start to All Dispensary Plant Material Samples")
- Deadline granularity matches actual workflow needs
- Rush options reflect common scenarios (rush all, rush micro only, rush potency only)

### 4. Tab Navigation Behavior (Critical Design Decision)
**IMPORTANT**: After submitting a manifest, the user interface intentionally remains on the "Pending Receipt" tab rather than switching to "Active Manifests". This is a deliberate UX decision that must be preserved in the enterprise implementation.

**Rationale**:
- Lab technicians often process multiple manifests in succession
- Switching tabs after each submission disrupts workflow and requires extra clicks
- Users can see the submitted count increment in the "Active Manifests" tab indicator
- This behavior supports efficient batch processing of incoming manifests
- Reduces cognitive load and navigation overhead during high-volume receiving periods

**Implementation Note**: The `handleReceiveManifest` function in Receiving4.js specifically does NOT call `handleTabChange('active')` after moving the manifest to the received list. This is intentional and should not be "fixed" as a bug.

## Future Considerations

### 1. API Integration
- Replace mock manifest data with Metrc API calls
- Persist deadline overrides and custom settings
- Sync test category changes with Metrc

### 2. Validation Rules
- Enforce minimum turnaround times
- Validate deadline conflicts
- Check for impossible rush scenarios

### 3. Reporting
- Track which samples had manually adjusted deadlines
- Report on rush request patterns
- Monitor Early Start sample progression

## Rationale for Design Choices

### Why Verbose Deadline Table?
Real labs need to manage deadlines at the assay level because:
- Different tests have different turnaround times
- Customers may rush specific tests but not others
- Regulatory requirements vary by test type
- Resource constraints may affect specific assays

### Why Multiple Rush Options?
Common scenarios in cannabis testing:
- Customer needs potency results quickly for product release
- Microbial results needed urgently for contamination concerns
- Full rush for time-sensitive deliveries

### Why Editable Manifest Number?
- Metrc sometimes issues corrections
- Manual entry errors need fixing
- System should reflect source of truth

## Code Architecture Notes

### Component Structure
- Single-file component for prototype speed
- Clear separation of concerns via helper functions
- Consistent naming conventions for handlers

### State Updates
- Immutable updates preserve React rendering
- Batch updates where possible for performance
- Careful null checking for optional fields

### Date Handling
- ISO 8601 format for storage
- Native datetime-local inputs for editing
- Business day calculations exclude weekends
- Time zones handled consistently

This documentation should be updated as the system evolves from prototype to production.