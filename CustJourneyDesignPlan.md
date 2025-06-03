# LIMS6000 Customer Journey Design Plan

## Project Overview

**Objective**: Build functional prototypes for enterprise Laboratory Information Management System (LIMS) to replace existing LIMS5000 system.

**Primary Focus**: Welcome Dashboard for senior chemists with responsibility for multiple assay areas.

**Purpose**: Generate functional mockups for developers to understand user behaviors, required actions, and implement core workflow innovations.

**Last Updated**: June 2, 2025

## Technical Stack Decisions

- **Frontend**: React with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design with invisible table structures
- **Icons**: Lucide React for professional iconography
- **Backend**: Node.js (future implementation)
- **Development Environment**: Visual Studio Code
- **Version Control**: GitHub with automated deployment
- **Deployment**: Azure Static Web Apps for rapid iteration and real-time testing
- **Database**: Mock data tables representing Azure SQL structure (current), Azure SQL (future)
- **State Management**: React useState/useEffect (current), Redux Toolkit (future consideration)

## Core Design Philosophy

### Universal Principles Established

**1. Customer-First Organizational Hierarchy (Core Business Principle)**
- **Primary Organization:** Customer → Customer Order → Individual Samples
- **Multi-Order Management:** System must accommodate multiple concurrent orders per customer
- **Due Date Priority:** Reporting due date is the only external deadline and highest priority
- **Operational Context:** All laboratory discussions naturally follow customer-first hierarchy
- **Technical Requirement:** Default to Order View, with customer grouping in specialized containers
- **Communication Pattern:** Laboratory staff and customer service teams communicate primarily by customer, then by order

**2. Sample Checkout System (Central Innovation)**
- **Principle**: Every sample must have clear ownership at every workflow stage
- **Implementation**: Users with qualifying DoCs can "check out" samples for specific work phases
- **Business Logic**: Prevents samples from "falling through the cracks" and ensures accountability
- **Technical Requirement**: Backend must track user assignments and qualification validation

**3. Conditional Workflow Logic (DPM Early Start)**
- **Principle**: Chemistry tests are only assigned after ALL prerequisites are met
- **Prerequisites**: Complete microbial testing + primary review + secondary review
- **Business Logic**: Eliminates waste by preventing unnecessary chemistry prep for failed samples
- **Technical Requirement**: Automated workflow triggers based on completion states
- **Early Warning Function**: Provides chemistry users advance notice of potential upcoming workload
- **Customer Aggregation**: DPM samples grouped by customer for operational clarity
- **Due Date Priority Sorting**: DPM customers sorted by Early Start due date urgency (overdue first)

**4. Real-Time Deadline Management**
- **Principle**: Display deadlines that matter to actual laboratory workflow, not administrative systems
- **Implementation**: Separate prep due, analysis due, and reporting due dates
- **Business Logic**: Enables proper resource planning and priority management
- **External Priority**: Reporting due dates are customer-facing commitments and highest priority
- **Technical Requirement**: Dynamic date calculations based on workflow stage and turnaround commitments
- **Smart Due Date Logic**: "All Due:" when all samples have same date, "Earliest:" when dates differ

**5. Phase-Based Workflow Organization (Critical UX Innovation)**
- **Principle**: Pipeline views reflect actual workflow phases requiring different types of actions
- **Implementation**: Subdivided pipeline containers based on action requirements
- **Business Logic**: Enables analysts to focus on appropriate work type at right time
- **Phases**: Prep Needed → Ready for Batch → Analytical Batches → Data Ready → Review
- **Air Gap Recognition**: Acknowledges instrument-LIMS disconnection with dedicated export phase

### Anti-Patterns Strictly Avoided
- **No nested/cascading UI** (current LIMS5000 problem)
- **No excessive hierarchical embedding** moving content down and right
- **No Telerik controls** or outdated UI frameworks
- **No misleading administrative dates** instead of operational deadlines
- **No fragmented information** requiring multiple system lookups
- **No unclear sample ownership** during workflow progression
- **No customer-order disconnection** that breaks natural communication patterns
- **No content shifting** in tabular interfaces - fixed column positions required
- **No vague action labels** - specific, actionable terminology only

### Preferred Design Patterns
- **Invisible table architecture** using CSS Grid with fixed column positioning
- **Phase-based information grouping** reflecting actual workflow requirements
- **Expandable containers** using chevron arrows for hierarchical data
- **Color-coded urgency** (red: overdue, orange: today, gray: future)
- **Granular status tracking** with clear workflow progression
- **Modern typography** (never Times New Roman)
- **Real-time updates** with automatic refresh capabilities
- **Customer-first grouping** for operational alignment
- **Action-oriented labeling** (PREP REQUIRED, BATCH ASSIGNMENT, EXPORT NEEDED)

## User Context: Senior Chemist (Dr. Sarah Chen)

### Primary Responsibilities
- **Cannabinoids assays** (primary qualification)
- **Terpenes assays** (primary qualification)
- **Pesticides/Mycotoxins assays** (combined assay, primary qualification)
- **Primary and secondary review** responsibilities across all qualified assays
- **Quality control oversight** through control chart monitoring
- **Customer workload management** for capacity planning and communication
- **Multi-order coordination** for customers with multiple concurrent orders
- **Analytical batch management** including prep batch organization and instrument coordination
- **Air gap data management** for export/import cycles between instruments and LIMS

### Key Operational Patterns
- **Morning Planning**: Reviews overnight results and plans daily priorities by customer and order
- **Workflow Monitoring**: Tracks samples across 2-3 day time horizons with customer context
- **Evening Preparation**: Loads instruments for overnight analysis runs
- **Priority Management**: Handles rush samples and deadline-driven work with reporting priority
- **Quality Decisions**: Makes replication and out-of-spec determinations
- **Cross-Assay Coordination**: Manages samples requiring multiple parallel tests
- **Customer Communication**: Provides status updates organized by customer and order
- **Batch Organization**: Plans prep batches and analytical batch compositions
- **Data Export Management**: Handles instrument-to-LIMS data transfer processes

### Workflow Dependencies and Edge Cases
- **Parallel Processing**: Most samples require multiple assays simultaneously
- **DPM Early Start**: Conditional chemistry based on microbial completion with early warning needs
- **Rush Sample Management**: Priority samples with compressed timelines
- **Replication Requirements**: Especially critical for cannabinoids out-of-spec results
- **Cross-Assay Dependencies**: Emerging workflow complexity requiring coordination
- **Multi-Order Customers**: Frequent customers with overlapping orders and varying due dates
- **Instrument Air Gaps**: Manual data export/import cycles with no automated connectivity
- **Overnight Run Management**: Planning for continuous instrument operation
- **Batch Failure Recovery**: Managing failed analytical runs and sample reprocessing

## Information Architecture - Welcome Dashboard

### Layout Structure (4-Column Responsive Grid)

**Column 1 (Left): Daily Management**
- **Today's Overview**: Key metrics and priority alerts including potential DPM sample count
- **DPM Early Start Pipeline**: Customer-grouped conditional chemistry samples with due date priority sorting

**Columns 2-3 (Center): Primary Work Areas**
- **Cannabinoids Pipeline**: Phase-based workflow containers with analytical batch hierarchies
- **Terpenes Pipeline**: Phase-based workflow containers with analytical batch hierarchies
- **Pesticides/Mycotoxins Pipeline**: Phase-based workflow containers with analytical batch hierarchies

**Column 4 (Right): Review and QC**
- **Primary Review Batches**: Groups ready for initial review
- **Secondary Review Batches**: Groups awaiting secondary review
- **QC Monitoring**: Control chart access and status indicators

### Dual-View Functionality (Core UX Innovation)

**Order View (Default)**
- **Organization**: Groups samples by customer order ID following natural operational hierarchy
- **Expansion**: Click to reveal individual samples within each order
- **Priority Logic**: Orders sorted by earliest due date and highest priority sample
- **Use Case**: Ideal for understanding customer-level workload and delivery commitments
- **Customer Context**: Maintains customer-first communication patterns

**Sample View**
- **Organization**: Flat list of individual samples regardless of order grouping
- **Sorting**: Priority-based (overdue → today → future, then rush → standard)
- **Use Case**: Ideal for detailed sample-level workflow management
- **Technical Focus**: When granular sample status is more important than customer context

### DPM Early Start Pipeline (Customer-Grouped Early Warning with Due Date Priority)

**Customer-Level Display:**
- **Primary Organization**: Grouped by customer name with aggregate sample counts
- **Due Date Priority Sorting**: Overdue customers first, then by earliest ES Due date
- **Early Warning Function**: Shows potential upcoming chemistry workload per customer
- **ES Due Dates**: "Early Start Due" - when DPM microbial decisions are expected
- **Expandable Detail**: Click customer to see constituent orders and sample breakdown
- **Priority Indicators**: Customer-level priority flags (rush vs standard) based on highest priority sample

**Information Hierarchy:**
1. **Customer Name**: Primary identification for operational discussion
2. **Sample Count**: Total potential samples that could require chemistry if microbial passes
3. **ES Due**: When microbial results and decisions are expected
4. **Expandable Orders**: Constituent orders within customer (second level)
5. **Sample Details**: Individual sample microbial progress (third level, available on demand)

**Business Logic:**
- Aggregates all samples pending DPM Early Start decision by customer
- Sorts customers by due date urgency (overdue, today, tomorrow, future)
- Calculates earliest ES Due date across all samples for that customer
- Inherits highest priority level from constituent samples
- Provides "early warning" of potential chemistry workload 2-3 days in advance

### Phase-Based Pipeline Organization (Revolutionary UX Design)

**Workflow Phase Structure:**
Each pipeline container is subdivided into workflow phases that reflect actual laboratory operations and action requirements:

#### **🔴 Phase 1: Prep Needed**
- **Samples**: Ready for prep (extraction, weighing, controls)
- **Action Type**: PREP REQUIRED - immediate human intervention
- **Business Logic**: Shows samples requiring physical preparation work
- **Mental Model**: "What do I need to prep right now?"

#### **🟠 Phase 2: Ready for Batch**
- **Samples**: Prepped but not assigned to analytical batch
- **Action Type**: BATCH ASSIGNMENT - needs instrument queuing
- **Business Logic**: Shows samples ready for analytical batch commitment
- **Mental Model**: "What's ready to be added to the next instrument run?"

#### **🔵 Phase 3: Analytical Batches**
- **Hierarchical Display**: Analytical batch → Prep batches → Individual samples
- **Status Indicators**: RUNNING (active) or QUEUED (waiting)
- **Time Tracking**: Start times, estimated completion
- **Expandable Structure**: Three-level drill-down for batch management
- **Business Logic**: Shows instrument status and batch organization
- **Mental Model**: "What's running on instruments right now?"

#### **🟡 Phase 4: Individual Prep**
- **Samples**: Being prepped individually (not in batches)
- **Action Type**: ACTIVE - monitoring individual work
- **Business Logic**: Shows samples in individual preparation
- **Mental Model**: "What individual samples am I working on?"

#### **🟣 Phase 5: Data Ready**
- **Samples**: Analysis complete, needs export from instrument
- **Action Type**: EXPORT NEEDED - time to close air gap
- **Business Logic**: Acknowledges instrument-LIMS air gap reality
- **Mental Model**: "What data do I need to export and import to LIMS?"

### Invisible Table Architecture (Technical Implementation)

**CSS Grid Structure:**
All sample and order rows use 12-column CSS Grid for consistent alignment:

**Sample View Grid Layout:**
- **Columns 1-6**: Sample name & client info (flexible)
- **Column 7**: Priority chip (fixed, can be empty)
- **Columns 8-9**: Due date info (fixed position)
- **Columns 10-11**: Status chip (fixed width)
- **Column 12**: Actions (fixed narrow)

**Order View Grid Layout:**
- **Column 1**: Expand/collapse button
- **Columns 2-5**: Order ID & client info
- **Column 6**: Priority chip (fixed position)
- **Columns 7-8**: Due date info (always aligned)
- **Columns 9-11**: Order icon & spacing
- **Column 12**: Actions (consistent position)

**Key Benefits:**
- Eliminates content shifting when priority chips appear/disappear
- Maintains professional table-like feel without visible borders
- Ensures due date information always appears in same position
- Provides scannable, columnar information architecture

## Core Business Logic Rules

### Customer-First Organization Rules

**Customer Hierarchy Requirements:**
- All operational displays default to customer-first organization
- Multiple orders per customer must be clearly distinguished
- Customer-level aggregation required for workload planning
- Reporting due dates take absolute priority over all internal deadlines

**Multi-Order Management:**
- System must track multiple concurrent orders per customer
- Orders may have different pickup dates and reporting deadlines
- Customer-level priority determined by highest priority constituent order
- Cross-order customer communication must be supported

### Sample Checkout System Rules

**Qualification Requirements:**
- Users must have active Demonstration of Capability (DoC) for the specific assay
- System validates DoC status before allowing checkout
- Expired or inactive DoCs prevent checkout with clear error messaging

**Checkout Logic:**
- Only samples in appropriate status can be checked out (Ready for Prep → Prep checkout)
- User can only check out samples they are qualified to process
- Checked out samples show assignee name and checkout timestamp
- System prevents checkout conflicts (sample can't be checked out by multiple users)

**Accountability Tracking:**
- All checkout actions logged with user ID, timestamp, and sample ID
- Checkout duration tracked for performance analytics
- Automatic alerts for samples checked out beyond reasonable timeframes

### DPM Early Start Logic Rules

**Microbial Prerequisites (ALL must pass):**
1. Bile-Tolerant Gram Negative Bacteria
2. Total Yeast & Mold
3. Total Aerobic Bacteria
4. STEC (Shiga toxin-producing E. coli)
5. Salmonella
6. Total Coliforms

**Review Prerequisites:**
- Microbial primary review marked "Complete"
- Microbial secondary review marked "Complete"

**Automatic Chemistry Assignment:**
- System automatically adds required chemistry tests when all prerequisites met
- Samples appear in chemistry pipelines as "Ready for Prep"
- Business rule prevents manual chemistry assignment before prerequisites

**Early Warning Display:**
- Customer-level aggregation for workload forecasting
- Due date priority sorting (overdue, today, tomorrow, future)
- ES Due dates for planning resource allocation
- Priority inheritance from highest priority constituent sample

### Priority and Deadline Logic

**Due Date Hierarchy:**
1. **Reporting Due**: When final results must be delivered to customer (highest priority, external commitment)
2. **Analysis Due**: When instrumental analysis must be completed
3. **Prep Due**: When sample preparation must be completed

**Priority Escalation:**
- **Rush Priority**: Customer-requested expedited processing (displayed with red chip)
- **Standard Priority**: Normal processing (no chip displayed - implied default)
- **Overdue Status**: Any sample past its current stage deadline
- **Today Priority**: Samples due for current stage today

**Visual Indicators:**
- Red: Overdue samples (highest priority)
- Orange: Due today (second priority)
- Yellow: Due tomorrow (third priority)
- Gray: Future due dates (standard priority)
- Rush chips: Only displayed when priority = rush (no standard chips)

**Smart Due Date Logic:**
- **"All Due:"** displayed when all samples in order have identical due dates
- **"Earliest:"** displayed when samples in order have different due dates
- Provides accurate context for order-level deadline management

### Phase-Based Workflow Rules

**Phase Transition Logic:**
- Samples automatically move between phases based on status changes
- Phase membership determines which container section displays the sample
- Action labels reflect specific work type required for each phase

**Analytical Batch Management:**
- Prep batches can be committed to analytical batches
- Analytical batches can contain multiple prep batches
- Individual samples within prep batches maintain customer context
- Batch status (RUNNING, QUEUED) reflects instrument state

**Air Gap Management:**
- "Data Ready" phase acknowledges instrument-LIMS disconnection
- Manual export/import process required for data transfer
- Time tracking for data export cycles

## Technical Implementation Requirements

### Frontend Architecture

**Component Structure:**
```
App.js (Main Container)
├── Header (Welcome, Date, Refresh)
├── TodaysOverview (Metrics Component + DPM Total)
├── DPMEarlyStartCustomers (Customer-Grouped Pipeline Component with Due Date Sorting)
├── PipelineContainer (Phase-Based Workflow)
│   ├── PipelineHeader (Title, Count, View Toggle)
│   ├── PrepNeeded (Phase 1: Prep Required)
│   ├── ReadyForBatch (Phase 2: Batch Assignment)
│   ├── AnalyticalBatches (Phase 3: Hierarchical Batch View)
│   ├── IndividualPrep (Phase 4: Individual Work)
│   └── DataReady (Phase 5: Export Needed)
├── PrimaryReviewBatches (Review Component)
├── SecondaryReviewBatches (Review Component)
└── QCMonitoring (Control Chart Access)
```

**State Management Requirements:**
- `viewMode`: Tracks Order/Sample view toggle per pipeline
- `expandedOrders`: Tracks which orders are expanded in Order view
- `expandedBatches`: Tracks which review batches and analytical batches are expanded
- `expandedDPMCustomers`: Tracks which DMP customers are expanded
- `currentTime`: Real-time clock for "Last Updated" display
- `mockSamples`: Sample data organized by assay type
- `mockAnalyticalBatches`: Analytical batch data with hierarchical structure
- `totalDPMSamples`: Calculated aggregate of potential samples across all customers

**CSS Grid Implementation:**
- All sample/order rows use 12-column grid structure
- Fixed column positions prevent content shifting
- Responsive breakpoints maintain alignment
- Invisible table architecture for professional appearance

**Real-Time Features:**
- Automatic time updates every minute
- System date integration for dynamic "today" calculations
- Future: WebSocket integration for live data updates

### Backend Requirements (Future Implementation)

**Database Schema Considerations:**
```sql
-- Sample checkout tracking
SampleCheckouts (
    CheckoutID, SampleID, UserID, CheckoutType, 
    CheckoutTimestamp, CompletionTimestamp, Status
)

-- DoC qualification validation
UserQualifications (
    UserID, AssayType, DoC_Status, ExpirationDate, 
    CertificationLevel, LastUpdated
)

-- DPM Early Start prerequisites
MicrobialResults (
    SampleID, TestType, Result, Status, 
    PrimaryReviewComplete, SecondaryReviewComplete
)

-- Real deadline tracking
SampleDeadlines (
    SampleID, PrepDue, AnalysisDue, ReportingDue,
    Priority, RushStatus, LastUpdated
)

-- Customer-order relationship tracking
CustomerOrders (
    CustomerID, OrderID, CustomerName, PickupDate,
    ReportingDue, Priority, Status
)

-- DPM customer aggregation with due date priority
DPMCustomerView (
    CustomerID, CustomerName, TotalSamples, 
    EarliestESDue, HighestPriority, OrderCount,
    SortPriority -- for due date urgency sorting
)

-- Analytical batch management
AnalyticalBatches (
    BatchID, AssayType, Status, StartTime, 
    EstimatedCompletion, InstrumentID
)

-- Prep batch tracking
PrepBatches (
    PrepBatchID, AnalyticalBatchID, PrepAnalyst,
    SampleCount, PrepDate, Status
)

-- Prep batch sample membership
PrepBatchSamples (
    PrepBatchID, SampleID, Position, Status
)
```

**API Endpoints Required:**
- `GET /api/samples/pipeline/{assayType}` - Phase-based pipeline data
- `POST /api/samples/{sampleID}/checkout` - Check out sample for work
- `PUT /api/samples/{sampleID}/complete` - Mark current stage complete
- `GET /api/users/{userID}/qualifications` - User DoC validation
- `GET /api/batches/review/{reviewType}` - Review batch queues
- `GET /api/dmp/customers` - DPM Early Start customers with due date sorting
- `GET /api/customers/{customerID}/orders` - Customer order breakdown
- `GET /api/analytical-batches/{assayType}` - Analytical batch hierarchies
- `POST /api/prep-batches/commit` - Commit prep batches to analytical batch
- `GET /api/instruments/{instrumentID}/status` - Instrument status (future)

### Performance and Scalability

**Frontend Optimization:**
- Memoized components for large sample lists
- Virtual scrolling for 100+ samples per pipeline
- Debounced search and filter operations
- Optimistic UI updates for checkout operations
- Efficient customer-level aggregation calculations
- CSS Grid performance for invisible table structures

**Backend Optimization:**
- Indexed database queries on SampleID, UserID, AssayType, CustomerID
- Cached DoC qualification lookups
- Real-time notifications via WebSocket for status changes
- Batch operations for bulk sample updates
- Pre-calculated customer aggregations for DPM Early Start
- Optimized due date urgency calculations

## Terminology Standardization

### Established Abbreviations
- **ES**: "Early Start" (as in "ES Due")
- **DPM**: "DPM Early Start" (existing)
- **DoC**: "Demonstration of Capability"

### Naming Conventions
- **ES Due**: Early Start Due date (when DPM microbial results are expected)
- **Reporting Due**: External customer deadline (highest priority)
- **Customer-First View**: Organizational approach prioritizing customer → order → sample hierarchy
- **Early Warning**: DPM function providing advance notice of potential chemistry workload
- **Invisible Table**: CSS Grid-based layout providing table-like structure without visible borders
- **Phase-Based Workflow**: Pipeline organization reflecting actual work phases and action requirements

### Action-Oriented Labels
- **PREP REQUIRED**: Samples needing physical preparation
- **BATCH ASSIGNMENT**: Samples ready for analytical batch commitment
- **RUNNING**: Analytical batches currently on instruments
- **QUEUED**: Analytical batches waiting for instrument time
- **EXPORT NEEDED**: Data ready for manual export from instruments
- **REVIEW NEEDED**: Batches awaiting quality control review

## Multi-Audience System Context

### Current Focus: Senior Chemists
- **Primary User**: Dr. Sarah Chen persona
- **Dashboard**: Welcome Dashboard with phase-based pipeline visibility and customer context
- **Permissions**: Can check out samples, perform reviews, access QC data, manage analytical batches
- **Customer Awareness**: Can provide customer-level status updates
- **Batch Management**: Can organize prep batches and commit to analytical batches

### Future User Types (Phase 2+)

**Prep Team Members:**
- **Focus**: Sample preparation workflows with customer context
- **Dashboard**: Prep-focused view with checkout capabilities
- **Permissions**: Can check out samples for prep, mark prep complete, organize prep batches
- **Customer Interface**: Basic customer-order visibility for communication

**Sample Management Staff:**
- **Focus**: Sample login, customer communication, logistics
- **Dashboard**: Customer-order management and status view
- **Permissions**: Can view status, modify due dates, add customer notes
- **Customer Relationship**: Primary customer communication responsibility

**Laboratory Managers:**
- **Focus**: Resource allocation, performance metrics, compliance, batch planning
- **Dashboard**: Management reporting and analytics view with customer metrics
- **Permissions**: Can view all data, generate reports, modify assignments, plan analytical schedules
- **Customer Oversight**: Customer satisfaction and delivery performance monitoring

**Quality Assurance Staff:**
- **Focus**: Control charts, deviation investigations, compliance auditing
- **Dashboard**: QC-focused view with detailed analytics
- **Permissions**: Can access all QC data, initiate investigations, approve deviations
- **Customer Impact**: Quality incident communication and resolution

## Critical Design Decisions Log

### Decision 1: Default to Order View with Customer-First Hierarchy
**Rationale**: Order View provides better customer-focused context for daily planning and aligns with natural laboratory communication patterns
**Impact**: Reduces cognitive load when managing multiple samples per customer, supports operational discussions
**Implementation**: Set `viewMode` initial state to 'order', prioritize customer context in all displays

### Decision 2: Customer-Grouped DPM Early Start with Due Date Priority
**Rationale**: Chemistry users need "early warning" of potential workload by customer, sorted by urgency
**Impact**: Simplifies decision-making, improves workload forecasting, supports customer communication
**Implementation**: Aggregate DPM samples by customer with due date priority sorting (overdue first)

### Decision 3: ES Due Terminology
**Rationale**: "Early Start Due" is more concise than "DPM Early Start results due" while maintaining clarity
**Impact**: Reduces UI clutter, establishes consistent terminology across system
**Implementation**: Use "ES Due" in all DPM-related displays

### Decision 4: Phase-Based Pipeline Subdivision
**Rationale**: Analysts manage samples in different workflow phases requiring different action types
**Impact**: Transforms pipeline from sample list to workflow management tool
**Implementation**: Five distinct phases with action-oriented labels and hierarchical analytical batch view

### Decision 5: Invisible Table Structure with CSS Grid
**Rationale**: Prevents content shifting while maintaining professional table-like appearance
**Impact**: Consistent alignment regardless of content variations, improved scannability
**Implementation**: 12-column CSS Grid with fixed column positioning

### Decision 6: Priority Chip Streamlining
**Rationale**: "Standard" priority is implied default, only "Rush" needs visual indication
**Impact**: Cleaner interface with better space utilization, reduces visual noise
**Implementation**: Only display priority chips for rush samples, position inline with names

### Decision 7: Smart Due Date Logic for Orders
**Rationale**: Different terminology needed when order samples have same vs. different due dates
**Impact**: Provides accurate context for order-level deadline management
**Implementation**: "All Due:" vs. "Earliest:" based on due date analysis

### Decision 8: Analytical Batch Hierarchical Structure
**Rationale**: Reflects real laboratory batch organization and instrument management
**Impact**: Provides visibility into complex multi-batch analytical runs
**Implementation**: Three-level hierarchy: Analytical Batch → Prep Batches → Individual Samples

### Decision 9: Air Gap Recognition with Data Ready Phase
**Rationale**: Acknowledges instrument-LIMS disconnection reality in laboratory operations
**Impact**: Provides specific action guidance for data export/import cycles
**Implementation**: Dedicated "Data Ready" phase with "EXPORT NEEDED" action label

### Decision 10: Real-Time Date/Time Display
**Rationale**: Laboratory work is time-sensitive, users need current temporal context
**Impact**: Improves decision-making accuracy, reduces confusion about deadlines
**Implementation**: JavaScript Date() with automatic updates

## Testing and Validation Framework

### User Acceptance Testing Criteria

**Workflow Efficiency Tests:**
- Time to identify highest priority samples by customer < 30 seconds
- Sample checkout process < 15 seconds
- Customer-to-sample navigation < 10 seconds
- DPM potential workload assessment < 15 seconds
- Phase-based workflow navigation < 20 seconds
- Analytical batch drill-down < 10 seconds

**Information Clarity Tests:**
- Users can distinguish workflow phases immediately
- Users can identify sample ownership/responsibility < 5 seconds
- Users can understand DPM Early Start potential by customer without training
- Users can provide customer status updates within 1 minute
- Users can assess analytical batch status at a glance
- Due date information remains consistently positioned

**Customer-First Organization Tests:**
- Users naturally navigate customer → order → sample hierarchy
- Multi-order customers are clearly distinguished
- Customer-level priority assessment is immediate
- External vs internal deadlines are clearly differentiated
- Customer context preserved through all workflow phases

**Error Prevention Tests:**
- System prevents checkout of unqualified samples
- System prevents chemistry assignment before DPM prerequisites
- System prevents double-checkout conflicts
- System prevents customer-order relationship confusion
- Interface prevents content shifting in tabular views

### Performance Benchmarks

**Load Time Requirements:**
- Initial dashboard load < 3 seconds
- Pipeline data refresh < 1 second
- Phase-based rendering < 2 seconds
- Checkout operations < 2 seconds
- Customer aggregation calculations < 1 second
- Analytical batch expansion < 1 second

**Responsiveness Requirements:**
- Works effectively on tablets (iPad resolution)
- Maintains functionality on smaller desktop screens (1366x768)
- Touch-friendly interface elements (minimum 44px touch targets)
- Customer expansion/collapse is smooth and immediate
- CSS Grid maintains alignment across screen sizes

## Real-World Order Structures and Receiving Operations

### Dynamic Order Management
**Business Reality**: Orders are dynamic entities that change after receipt based on customer requests and operational needs.

**Key Characteristics**:
- Customers frequently request changes after samples are received
- Test assignments may be modified after testing begins
- Additional analyses may be added mid-workflow
- Priority levels can be elevated based on customer needs
- Order consolidation/splitting occurs regularly

**System Requirements**:
- Flexible order modification workflows
- Audit trail for all order changes
- Customer communication logging
- Impact analysis for mid-stream changes
- Resource reallocation capabilities

### Receiving Operations and Metrc Integration

**Metrc API Integration**:
The system captures extensive data during receiving operations from Metrc (cannabis track-and-trace system):
- Transfer manifest details
- Package identifiers and chain of custody
- Source harvest information
- Original quantities and weights
- Strain/variety information
- License holder details

**Laboratory-Added Information**:
Beyond Metrc data, laboratory personnel add critical testing parameters:

1. **Test Selection**:
   - Terpenes analysis (not tracked in Metrc)
   - Target cannabinoid concentrations (ranges)
   - Specific pathogen panels required

2. **Product Classification**:
   - **Inhaled Flag**: Critical for compliance limits
     - Vape cartridges, flower, pre-rolls marked as "inhaled"
     - Edibles, topicals, tinctures marked as "non-inhaled"
     - Affects action limits for residual solvents and other hazards
   - **Solvent Flag**: Indicates extraction method used
   - **Product Category**: Beyond Metrc's basic categories

3. **Serving Information** (for edibles):
   - Serving size and units
   - Servings per container
   - Critical for per-serving potency calculations

### Excel Import Template Structure

The LIMS5000 import template captures comprehensive order information:

**Metrc-Sourced Fields**:
- METRC Manifest Number
- Client License
- Source Harvest
- Source Package
- Metrc Category
- Item Strain
- Shipped Qty
- Gross Wgt
- Original Qty

**Laboratory-Added Fields**:
- Received On
- Needed By
- CC Order Number
- CC ID #
- Bundle/Additional
- Research/Development
- Re-test
- Package
- Rush Tests
- Item (laboratory description)
- Potency Category
- Inhaled? (Y/N flag)
- Solvent? (Y/N flag)
- Serving Size
- Serving Size Units
- Servings per Container
- Notes

**Target Specifications**:
- Potency Target Units
- THC Potency Target Low
- THC Potency Target High
- CBD Potency Target Low
- CBD Potency Target High

### Information Flow and Feedback Systems

**Feedforward Principles**:
- Data entered at receiving propagates throughout workflow
- Metrc data auto-populates where applicable
- Target specifications guide analytical decisions
- Product flags determine compliance calculations
- Historical data informs default selections

**Feedback Loops**:
- Analytical results inform future target ranges
- QC failures trigger automatic retesting protocols
- Customer preferences learned and suggested
- Turnaround time actuals update scheduling algorithms
- Resource utilization feeds capacity planning

## Accessibility and Visual Design Standards

### Color Accessibility for Colorblind Users

**Design Decision**: Following user feedback, the dashboard implements colorblind-friendly color schemes with enhanced contrast and visual redundancy.

**Color Palette Changes**:
- **Success/Completed States**: Changed from green to blue (blue-600/700/800)
  - Rationale: Blue provides better distinction for red-green colorblindness
  - Implementation: `bg-blue-100 text-blue-800 border border-blue-300`
  
- **Warning/In-Progress States**: Changed from yellow to orange (orange-600/700/800)
  - Rationale: Orange provides higher contrast than yellow
  - Implementation: `bg-orange-100 text-orange-800 border border-orange-300`
  
- **Error/Urgent States**: Enhanced red with darker shades (red-700/800)
  - Rationale: Darker reds provide better contrast
  - Implementation: `bg-red-100 text-red-800 border border-red-300`

**Visual Redundancy Patterns**:
- All status badges include borders for additional visual definition
- Colored dots include contrasting borders (e.g., `border-2 border-orange-800`)
- Status indicators combine color with icons where possible
- Priority indicators use both color and text labels

**Contrast Guidelines**:
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- All interactive elements meet WCAG AA standards
- Background/foreground combinations tested for all colorblind types

**Implementation Examples**:
```jsx
// Status badges with borders
<span className="bg-blue-100 text-blue-800 border border-blue-300">
  Analyzed
</span>

// Colored indicators with borders
<div className="w-3 h-3 bg-orange-600 rounded-full border-2 border-orange-800"></div>

// Combined icon and color for status
<CheckCircle className="w-4 h-4 text-blue-700" /> // Pass
<XCircle className="w-4 h-4 text-red-700" />      // Fail
<Clock className="w-4 h-4 text-orange-700" />     // Pending
```

**Testing Requirements**:
- All color combinations tested with colorblind simulation tools
- User acceptance testing with colorblind users
- Regular accessibility audits using automated tools
- Manual verification of visual redundancy patterns

## Future Enhancement Roadmap

### Phase 2: Enhanced Batch Management (Months 2-3)
**Features**: Full batch planning interface, prep batch composition tools, analytical scheduling
**Technical Requirements**: Advanced batch algorithms, instrument integration planning

### Phase 3: Instrument Integration Framework (Months 4-5)
**Features**: Air gap closure automation, file monitoring systems, data parsing engines
**Technical Requirements**: File system monitoring, automated data processing pipelines

### Phase 4: Advanced Analytics and Reporting (Months 6+)
**Features**: Predictive batch planning, performance analytics, customer delivery metrics
**Technical Requirements**: Machine learning algorithms, advanced reporting engines

### Phase 5: Mobile and Field Extensions (Months 9+)
**Features**: Mobile prep interfaces, field sample collection, remote monitoring
**Technical Requirements**: Mobile frameworks, offline capability, data synchronization

### Phase 6: Customer Portal Integration (Months 12+)
**Features**: Customer self-service portals, automated notifications, real-time status sharing
**Technical Requirements**: External API development, customer authentication systems

---

*This design plan serves as the definitive reference for LIMS6000 development. All design decisions, business logic, and technical requirements are documented here for current and future development teams. The customer-first organizational hierarchy and phase-based workflow organization are fundamental to the system and must be preserved throughout all development phases.*