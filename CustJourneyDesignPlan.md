# LIMS Senior Chemist Dashboard - Design Specification

## Project Overview

**Objective**: Build functional prototypes for enterprise Laboratory Information Management System (LIMS) to replace existing LIMS5000 system.

**Initial Focus**: Landing page for senior chemists with responsibility for multiple assay areas.

**Purpose**: Generate functional mockups for developers to understand user behaviors and required actions.

## Technical Stack Decisions

- **Frontend**: React
- **Backend**: Node.js 
- **Development Environment**: Visual Studio Code
- **Version Control**: GitHub
- **Deployment**: Azure Static Site (for rapid iteration and real-time testing)
- **Database**: Mock data tables representing Azure SQL structure
- **Component Library**: TBD (flexible, no preference established)

## User Context: Senior Chemist

**Primary Responsibilities**: 
- Terpenes assays
- Cannabinoids assays  
- Pesticides/Mycotoxins assays (single combined assay)

**Key Operational Patterns**:
- Monitors samples across a few days' time horizon
- Focuses on due dates and turnaround time management
- Loads instruments at end of day for overnight runs
- Reviews overnight acquisition results and data
- Makes decisions on out-of-spec results requiring replication
- Oversees QC through control charts

**Workflow Dependencies**:
- Most samples get multiple assays running in parallel
- Special case: DPM Early Start samples require microbial completion before chemistry tests are "selected" and made available
- Cross-assay dependencies exist but are edge cases

## Core Design Principles Established

### Anti-Patterns to Avoid
- **No nested/cascading UI** (current LIMS5000 problem)
- **No excessive hierarchical embedding** moving content down and right
- **No Telerik controls**

### Preferred Patterns
- **Spindown arrows** for hierarchical data
- **Clean, flat information architecture**
- **Fresh, modern UI appearance**
- **Minimize user clicks**
- **Font selection**: Never Times New Roman, prefer modern UI fonts

## Information Architecture - Senior Chemist Landing Page

### Primary Work Queue: "Sample Pipeline"
**Organization**:
- Separate tabs/sections for each assay (Terpenes, Cannabinoids, Pesticides/Mycotoxins)
- Sort hierarchy within each section:
  1. Due date (overdue → today → future)
  2. Client/Customer
  3. Order number
- Status indicators: ready for prep, in progress, pending other assays

### Navigation Hub: "Primary Review Batches" 
- Grouped by assay type
- Completion status and ready-for-review indicators
- **Navigation**: Full-screen dedicated workflow (minimize clicks)

### Monitoring Dashboard
- Control charts (existing React components - live/recent data)
- Drill-down capability by analyte, analyst, prep team member
- QC status indicators and badges

## Key Workflow Understanding

### Sample Lifecycle
1. **Field Collection** → **Laboratory Receipt** → **Sample Login**
2. **Sample Management** (analyte whitelisting/modifications)
3. **Prep Team** → **Analyst Queue** → **Instrument Loading**
4. **Overnight Runs** → **Data Acquisition** → **Results Review**
5. **Out-of-spec Handling** → **Replication Decisions**

### Critical Time Dependencies
- Samples have required due dates
- Overdue samples need immediate attention
- Next business day visibility essential
- Customer-requested additional analyses extend turnaround times

### Special Cases
- **DPM Early Start**: Conditional test selection after microbial completion
- **Replication Requirements**: Particularly for cannabinoids out-of-spec results
- **Cross-assay Dependencies**: Emerging workflow complexity

## Information Density Considerations
- Will vary by screen/function
- Some interfaces require compact data presentation
- Balance between breathing room and information completeness
- Landing page primarily for monitoring/reviewing (not action-heavy)

## Multi-Audience System Context
- Senior chemists (current focus)
- Prep team members (different landing pages planned)
- Sample management staff
- Various other job functions with different system views
- Same underlying system, different contextual presentations

## Next Steps

1. **Visual Design Phase**
   - Component library selection
   - Typography and color scheme decisions
   - Spacing and layout principles
   - Interactive element design (buttons, badges, indicators)

2. **Data Structure Planning**
   - Define mock data tables structure
   - Sample data relationships
   - Status indicators and flags
   - Control chart data feeds

3. **Prototype Development**
   - Landing page implementation
   - Navigation patterns
   - Primary Review batch workflows
   - Control chart integration

4. **Iteration Framework**
   - Rapid deployment pipeline setup
   - Testing and feedback cycles
   - Developer handoff preparation

## Open Questions for Next Phase
- Component library selection
- Specific visual design preferences
- Mock data structure details
- Primary Review batch interface design
- Control chart integration specifics

---

*This specification captures our conversation through initial information architecture. Design decisions and technical implementation details to be added as we progress through the visual design and development phases.*
