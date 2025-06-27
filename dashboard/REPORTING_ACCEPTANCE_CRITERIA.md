# Reporting Module Acceptance Criteria for Production Build

## Summary of Changes Implemented

### 1. Default View
- **Removed** separate "Order View" and "Sample View" toggle buttons
- **Default** to single unified sample list view
- **Sort** samples by due date/time (earliest first) for hierarchy

### 2. Order Number Visualization
- **Added** Order Number column after Sample ID
- **Format**: Order number displayed prominently (e.g., "25NCTL00341")
- **Sub-text**: Manifest number shown below in smaller text

### 3. Column Headers
- **Changed** "Manifest" column header to "Order"
- **Order**: Sample ID | Order | Product | Client | Tests | Status | Due Date/Time | Actions

### 4. Cannabinoid Ordering
- **Primary cannabinoids** listed first in this exact order:
  1. Total THC
  2. Total CBD  
  3. Total Cannabinoids
- **Remaining cannabinoids** listed alphabetically below
- **All other analytes** sorted alphabetically by default

### 5. Action Buttons
- **View button**: Takes user to raw data table (SampleResultsDetail page)
- **Report button**: Opens COA PDF preview modal (replaces direct navigation)
- **Aligned** all action buttons consistently in fixed-width column
- **Button styles**: Consistent padding, hover states, and icon sizing

### 6. Checkbox and Selection
- **Preserved** multi-select checkboxes for bulk operations
- **Generate Reports** button in header for selected samples
- **Metrc submission** confirmation after report generation

### 7. Recently Reported Queue
- **Time range dropdown**: 7 days, 14 days, 30 days, 90 days, 6 months, 1 year, Year to Date
- **Download COA** button for recently reported samples

### 8. Ohio-specific Features
- **Total Cannabinoids tooltip**: "For data integrity monitoring only - not reported on COA per Ohio regulations"

### 9. Sample Status Specificity
- **Replaced** generic "Testing in Progress" with specific statuses:
  - In Prep (Assigned to: Lab Tech X)
  - Awaiting Analysis (Assigned to: Analyst Y)
  - On Instrument (Assigned to: Unassigned)
  - Data Review (Assigned to: QA Tech Z)

### 10. Potency Targets
- **Visual alerts** for out-of-specification results
- **Target ranges** displayed in Cannabinoids tab
- **10% tolerance** for single target values
- **Highlight** off-spec results in red background

### 11. Notes System
- **Manifest-level notes** displayed at top of sample detail
- **Assay-specific notes** shown within each test panel

### 12. Replicate Display
- **Vertical table** with analytes as rows
- **Individual replicate** columns
- **Average/reported result** with tooltip explaining calculation

## Key Technical Implementation Notes

1. **Mock Data Structure**:
   - Order numbers follow format: YYNCTLxxxxx (e.g., 25NCTL00341)
   - Sample IDs increment from base number (e.g., 1001, 1002, 1003)
   - All cannabinoid names fully spelled out with parenthetical abbreviations where appropriate

2. **State Management**:
   - Selected samples tracked in Set for performance
   - Report preview and Metrc submission modals share selected sample context
   - Progress status and assignee tracked at test level

3. **UI Consistency**:
   - All buttons use consistent padding: px-3 py-1.5
   - Hover states add background color (bg-blue-50, bg-green-50, etc.)
   - Icons consistently sized at w-4 h-4

4. **CSV Export Format**:
   - Maintains Metrc Sudoku format
   - Cannabinoids ordered per specification
   - Single row per analyte per sample

## Production Deployment Checklist

- [ ] Replace mock data with API integration
- [ ] Implement actual COA PDF generation
- [ ] Connect Metrc submission to real API
- [ ] Add user authentication context for submission tracking
- [ ] Implement actual file download functionality
- [ ] Add error handling for failed API calls
- [ ] Add loading states for data fetching
- [ ] Implement data refresh mechanism
- [ ] Add audit logging for submissions
- [ ] Test with real Ohio regulatory requirements