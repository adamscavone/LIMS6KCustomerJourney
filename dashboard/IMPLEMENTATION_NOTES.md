# Implementation Notes and Key Decisions

## Recent Changes and Decisions

### 1. Pipeline-Specific View Modes (Fixed)
- **Issue**: View mode was toggling globally across all pipelines
- **Solution**: Changed from single `viewMode` to `viewModes` object with pipeline-specific states
- **Impact**: Each pipeline now maintains its own Order/Sample view preference

### 2. Status Column Removal in Order View
- **Issue**: Redundant status information when orders are grouped under status headers
- **Decision**: Removed status column entirely from Order view (both main and expanded views)
- **Rationale**: Status is already conveyed through hierarchical grouping

### 3. Mock Data Consistency
- **Issue**: Sample statuses didn't match their UI grouping headers (e.g., "prep" status under "Available for Prep")
- **Solution**: 
  - Standardized on `in_prep` status (not `prep`)
  - Fixed samples with inconsistent statuses
  - Updated status mapping functions
- **Lesson**: Always ensure mock data logically matches UI organization

### 4. Workflow Status Grouping (Due Today)
- **Implementation**: Orders in "Due Today" are subdivided by workflow status
- **Order**: Reversed to show most critical first (Available for Prep → Ready to Report)
- **Visual**: Each status group has distinct color coding and count display

### 5. Checkbox Selection Fix
- **Issue**: Checkboxes in "Pending Analysis" weren't responding to direct clicks
- **Solution**: Added proper `onChange` handler calling `handlePrepBatchSelection`
- **Note**: Maintained `onClick` stopPropagation to prevent row selection

### 6. Analysis Batch Workflow
- **Challenge**: "Air gap" between LIMS and instruments
- **Solution**: Created dedicated Analysis Batch View with:
  - Instrument selection and queuing
  - Manual file upload for results
  - Clear workflow states (created → queued → results uploaded)
- **Navigation**: Automatic navigation after batch creation

## Component Structure

### App.js (~2600 lines)
- Main dashboard with all pipeline views
- Comprehensive mock data (73 samples)
- Pipeline-specific view mode management
- Business day calculations
- Status grouping logic

### PrepBatchManagement.js
- Two-column layout: Available Samples | In Prep + Pending Analysis
- Windows-native multi-select (Ctrl+Click, Shift+Click)
- Automatic sample checkout
- Return samples functionality
- Create analysis batch from prep batches

### AnalysisBatchView.js
- Handles the instrument integration workflow
- Instrument selection with availability status
- File upload for results
- Send to review functionality

## Key Business Logic

### Sample Checkout
- **No explicit checkout button** - happens automatically when adding to batch
- Creates audit trail
- Prevents double-booking

### Batch Integrity
- **Single analyst requirement** - all samples in batch by same person
- **Equipment tracking** - serial numbers and calibration dates
- **SOP compliance** - pipeline-specific SOPs

### Partial Completion
- **Return Samples** feature for interrupted batches
- Maintains data integrity
- Clear distinction between prepared and unprepared samples

## UI/UX Principles

### Information Hierarchy
1. Most critical information first (overdue, behind schedule)
2. Progressive disclosure (expandable sections)
3. No redundant information display

### Accessibility
- Color + Icon/Border for all status indicators
- Colorblind-friendly palette
- High contrast (700/800 color shades)

### Consistency
- Same date groupings across all views
- Consistent status progression
- Predictable interaction patterns

## Future Considerations

### State Management
- Current: Local React state (useState)
- Future: Consider Redux/Context API for production
- Rationale: Prototype scope doesn't warrant complexity

### API Integration
- Current: All mock data
- Future: RESTful API with proper authentication
- Consider: WebSocket for real-time updates

### Testing
- Current: No tests
- Future: Jest + React Testing Library
- Focus: Business logic and user workflows

### Performance
- Current: All data loaded at once
- Future: Pagination, lazy loading
- Consider: Virtual scrolling for large datasets

## Lessons Learned

1. **Mock data must match UI logic** - Inconsistencies cause confusion
2. **Explicit is better than implicit** - Clear workflow states and transitions
3. **Air gaps require special handling** - Design around system limitations
4. **Multi-select patterns matter** - Use OS-native conventions
5. **Status redundancy hurts usability** - Show information once, clearly

## Development Tips

### Adding New Features
1. Check CLAUDE.md for architecture guidelines
2. Maintain mock data consistency
3. Follow established UI patterns
4. Consider accessibility from the start

### Debugging
- Check browser console for React errors
- Use React Developer Tools
- Verify route parameters in URL
- Check mock data structure matches expectations

### Common Issues
- **ESLint errors**: Usually undefined variables or unused imports
- **Routing issues**: Ensure all routes defined in index.js
- **State updates**: Remember React state updates are asynchronous
- **Mock data**: Keep dates relative (use helper functions)