# LIMS6000 Customer Journey Design Plan

## Project Overview

**Objective**: Build functional prototypes for enterprise Laboratory Information Management System (LIMS) to replace existing LIMS5000 system.

**Primary Focus**: Welcome Dashboard for senior chemists with responsibility for multiple assay areas.

**Purpose**: Generate functional mockups for developers to understand user behaviors, required actions, and implement core workflow innovations.

**Last Updated**: June 2, 2025

## Technical Stack Decisions

- **Frontend**: React with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design
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

**4. Real-Time Deadline Management**
- **Principle**: Display deadlines that matter to actual laboratory workflow, not administrative systems
- **Implementation**: Separate prep due, analysis due, and reporting due dates
- **Business Logic**: Enables proper resource planning and priority management
- **External Priority**: Reporting due dates are customer-facing commitments and highest priority
- **Technical Requirement**: Dynamic date calculations based on workflow stage and turnaround commitments

### Anti-Patterns Strictly Avoided
- **No nested/cascading UI** (current LIMS5000 problem)
- **No excessive hierarchical embedding** moving content down and right
- **No Telerik controls** or outdated UI frameworks
- **No misleading administrative dates** instead of operational deadlines
- **No fragmented information** requiring multiple system lookups
- **No unclear sample ownership** during workflow progression
- **No customer-order disconnection** that breaks natural communication patterns

### Preferred Design Patterns
- **Flat information architecture** with minimal click depths
- **Expandable containers** using chevron arrows for hierarchical data
- **Color-coded urgency** (red: overdue, orange: today, gray: future)
- **Granular status tracking** with clear workflow progression
- **Modern typography** (never Times New Roman)
- **Real-time updates** with automatic refresh capabilities
- **Customer-first grouping** for operational alignment

## User Context: Senior Chemist (Dr. Sarah Chen)

### Primary Responsibilities
- **Cannabinoids assays** (primary qualification)
- **Terpenes assays** (primary qualification)
- **Pesticides/Mycotoxins assays** (combined assay, primary qualification)
- **Primary and secondary review** responsibilities across all qualified assays
- **Quality control oversight** through control chart monitoring
- **Customer workload management** for capacity planning and communication
- **Multi-order coordination** for customers with multiple concurrent orders

### Key Operational Patterns
- **Morning Planning**: Reviews overnight results and plans daily priorities by customer and order
- **Workflow Monitoring**: Tracks samples across 2-3 day time horizons with customer context
- **Evening Preparation**: Loads instruments for overnight analysis runs
- **Priority Management**: Handles rush samples and deadline-driven work with reporting priority
- **Quality Decisions**: Makes replication and out-of-spec determinations
- **Cross-Assay Coordination**: Manages samples requiring multiple parallel tests
- **Customer Communication**: Provides status updates organized by customer and order

### Workflow Dependencies and Edge Cases
- **Parallel Processing**: Most samples require multiple assays simultaneously
- **DPM Early Start**: Conditional chemistry based on microbial completion with early warning needs
- **Rush Sample Management**: Priority samples with compressed timelines
- **Replication Requirements**: Especially critical for cannabinoids out-of-spec results
- **Cross-Assay Dependencies**: Emerging workflow complexity requiring coordination
- **Multi-Order Customers**: Frequent customers with overlapping orders and varying due dates

## Information Architecture - Welcome Dashboard

### Layout Structure (4-Column Responsive Grid)

**Column 1 (Left): Daily Management**
- **Today's Overview**: Key metrics and priority alerts including potential DPM sample count
- **DPM Early Start Pipeline**: Customer-grouped conditional chemistry samples with early warning focus

**Columns 2-3 (Center): Primary Work Areas**
- **Cannabinoids Pipeline**: Dedicated container with dual-view functionality
- **Terpenes Pipeline**: Dedicated container with dual-view functionality  
- **Pesticides/Mycotoxins Pipeline**: Dedicated container with dual-view functionality

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

### DPM Early Start Pipeline (Customer-Grouped Early Warning)

**Customer-Level Display:**
- **Primary Organization**: Grouped by customer name with aggregate sample counts
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
- Calculates earliest ES Due date across all samples for that customer
- Inherits highest priority level from constituent samples
- Provides "early warning" of potential chemistry workload 2-3 days in advance

### Status Progression System (Granular Tracking)

**Sample Lifecycle States:**
1. **Ready for Prep**: Available for prep team checkout
2. **Prep**: Checked out by qualified prep team member (shows assignee)
3. **Prepped**: Prep complete, available for analyst checkout
4. **Analysis**: Checked out by qualified analyst (shows assignee)
5. **Analyzed**: Analysis complete, ready for review queue
6. **Primary Review**: In primary reviewer's queue
7. **Secondary Review**: In secondary reviewer's queue
8. **Complete**: All review stages finished

**DPM Early Start Specific States:**
1. **Micro In Progress**: Microbial testing underway
2. **Micro Primary Review**: Microbial results awaiting primary review
3. **Micro Secondary Review**: Microbial results awaiting secondary review
4. **Chemistry Added**: Prerequisites met, chemistry tests automatically assigned

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
- ES Due dates for planning resource allocation
- Priority inheritance from highest priority constituent sample

### Priority and Deadline Logic

**Due Date Hierarchy:**
1. **Reporting Due**: When final results must be delivered to customer (highest priority, external commitment)
2. **Analysis Due**: When instrumental analysis must be completed  
3. **Prep Due**: When sample preparation must be completed

**Priority Escalation:**
- **Rush Priority**: Customer-requested expedited processing
- **Overdue Status**: Any sample past its current stage deadline
- **Today Priority**: Samples due for current stage today
- **Standard Processing**: Samples with future deadlines

**Visual Indicators:**
- Red: Overdue samples (highest priority)
- Orange: Due today (second priority)
- Yellow: Due tomorrow (third priority)
- Gray: Future due dates (standard priority)

## Technical Implementation Requirements

### Frontend Architecture

**Component Structure:**
```
App.js (Main Container)
├── Header (Welcome, Date, Refresh)
├── TodaysOverview (Metrics Component + DPM Total)
├── DPMEarlyStartCustomers (Customer-Grouped Pipeline Component)
├── PipelineContainer (Reusable)
│   ├── PipelineHeader (Title, Count, View Toggle)
│   ├── OrderView (Expandable Groups)
│   └── SampleView (Flat List)
├── PrimaryReviewBatches (Review Component)
├── SecondaryReviewBatches (Review Component)
└── QCMonitoring (Control Chart Access)
```

**State Management Requirements:**
- `viewMode`: Tracks Order/Sample view toggle per pipeline
- `expandedOrders`: Tracks which orders are expanded in Order view
- `expandedBatches`: Tracks which review batches are expanded
- `expandedDPMCustomers`: Tracks which DPM customers are expanded
- `currentTime`: Real-time clock for "Last Updated" display
- `mockData`: Sample and batch data (future: API integration)
- `totalDPMSamples`: Calculated aggregate of potential samples across all customers

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

-- DPM customer aggregation
DPMCustomerView (
    CustomerID, CustomerName, TotalSamples, 
    EarliestESDue, HighestPriority, OrderCount
)
```

**API Endpoints Required:**
- `GET /api/samples/pipeline/{assayType}` - Pipeline data for specific assay
- `POST /api/samples/{sampleID}/checkout` - Check out sample for work
- `PUT /api/samples/{sampleID}/complete` - Mark current stage complete
- `GET /api/users/{userID}/qualifications` - User DoC validation
- `GET /api/batches/review/{reviewType}` - Review batch queues
- `GET /api/dpm/customers` - DPM Early Start customers with aggregation
- `GET /api/customers/{customerID}/orders` - Customer order breakdown

### Performance and Scalability

**Frontend Optimization:**
- Memoized components for large sample lists
- Virtual scrolling for 100+ samples per pipeline
- Debounced search and filter operations
- Optimistic UI updates for checkout operations
- Efficient customer-level aggregation calculations

**Backend Optimization:**
- Indexed database queries on SampleID, UserID, AssayType, CustomerID
- Cached DoC qualification lookups
- Real-time notifications via WebSocket for status changes
- Batch operations for bulk sample updates
- Pre-calculated customer aggregations for DPM Early Start

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

## Multi-Audience System Context

### Current Focus: Senior Chemists
- **Primary User**: Dr. Sarah Chen persona
- **Dashboard**: Welcome Dashboard with full pipeline visibility and customer context
- **Permissions**: Can check out samples, perform reviews, access QC data
- **Customer Awareness**: Can provide customer-level status updates

### Future User Types (Phase 2+)

**Prep Team Members:**
- **Focus**: Sample preparation workflows with customer context
- **Dashboard**: Prep-focused view with checkout capabilities
- **Permissions**: Can check out samples for prep, mark prep complete
- **Customer Interface**: Basic customer-order visibility for communication

**Sample Management Staff:**
- **Focus**: Sample login, customer communication, logistics
- **Dashboard**: Customer-order management and status view
- **Permissions**: Can view status, modify due dates, add customer notes
- **Customer Relationship**: Primary customer communication responsibility

**Laboratory Managers:**
- **Focus**: Resource allocation, performance metrics, compliance
- **Dashboard**: Management reporting and analytics view with customer metrics
- **Permissions**: Can view all data, generate reports, modify assignments
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

### Decision 2: Customer-Grouped DPM Early Start
**Rationale**: Chemistry users need "early warning" of potential workload by customer, not detailed microbial progress
**Impact**: Simplifies decision-making, improves workload forecasting, supports customer communication
**Implementation**: Aggregate DPM samples by customer with expandable detail

### Decision 3: ES Due Terminology
**Rationale**: "Early Start Due" is more concise than "DPM Early Start results due" while maintaining clarity
**Impact**: Reduces UI clutter, establishes consistent terminology across system
**Implementation**: Use "ES Due" in all DPM-related displays

### Decision 4: Individual Pipeline Containers vs. Tabbed Interface
**Rationale**: Separate containers allow simultaneous visibility of all assay types while maintaining customer context
**Impact**: Eliminates need to switch tabs, improves cross-assay coordination
**Implementation**: 4-column grid with dedicated containers

### Decision 5: Real-Time Date/Time Display
**Rationale**: Laboratory work is time-sensitive, users need current temporal context
**Impact**: Improves decision-making accuracy, reduces confusion about deadlines
**Implementation**: JavaScript Date() with automatic updates

### Decision 6: Granular Status Progression with Customer Context
**Rationale**: LIMS5000's vague "In Progress" status causes workflow confusion
**Impact**: Clear accountability and workflow visibility within customer framework
**Implementation**: Specific status values with checkout tracking

### Decision 7: Reporting Due Date Priority
**Rationale**: External customer commitments must take absolute priority over internal operational deadlines
**Impact**: Aligns system priorities with business priorities, improves customer satisfaction
**Implementation**: Visual hierarchy and sorting algorithms prioritize reporting deadlines

## Testing and Validation Framework

### User Acceptance Testing Criteria

**Workflow Efficiency Tests:**
- Time to identify highest priority samples by customer < 30 seconds
- Sample checkout process < 15 seconds
- Customer-to-sample navigation < 10 seconds
- DPM potential workload assessment < 15 seconds

**Information Clarity Tests:**
- Users can distinguish overdue vs. today vs. future samples immediately
- Users can identify sample ownership/responsibility < 5 seconds
- Users can understand DPM Early Start potential by customer without training
- Users can provide customer status updates within 1 minute

**Customer-First Organization Tests:**
- Users naturally navigate customer → order → sample hierarchy
- Multi-order customers are clearly distinguished
- Customer-level priority assessment is immediate
- External vs internal deadlines are clearly differentiated

**Error Prevention Tests:**
- System prevents checkout of unqualified samples
- System prevents chemistry assignment before DPM prerequisites
- System prevents double-checkout conflicts
- System prevents customer-order relationship confusion

### Performance Benchmarks

**Load Time Requirements:**
- Initial dashboard load < 3 seconds
- Pipeline data refresh < 1 second
- Checkout operations < 2 seconds
- Customer aggregation calculations < 1 second

**Responsiveness Requirements:**
- Works effectively on tablets (iPad resolution)
- Maintains functionality on smaller desktop screens (1366x768)
- Touch-friendly interface elements (minimum 44px touch targets)
- Customer expansion/collapse is smooth and immediate

## Future Enhancement Roadmap

### Phase 2: Batch Review Interface (Months 2-3)
**Features**: Full-screen batch review, QC integration, deviation workflows, customer context preservation
**Technical Requirements**: Advanced data visualization, Excel integration replacement

### Phase 3: Control Charts Integration (Months 4-5)
**Features**: Real-time statistical monitoring, automated alerts, trend analysis, customer impact assessment
**Technical Requirements**: Statistical calculation engines, charting libraries

### Phase 4: Multi-User Role Expansion (Months 6+)
**Features**: Role-based dashboards, permission systems, workflow delegation, customer communication tools
**Technical Requirements**: Authentication/authorization, role-based data filtering

### Phase 5: Customer Communication Integration (Months 9+)
**Features**: Customer portal integration, automated status updates, customer-specific reporting
**Technical Requirements**: External API integration, customer notification systems

### Phase 6: Mobile and Advanced Analytics (Months 12+)
**Features**: Mobile app, predictive analytics, machine learning insights, customer behavior analysis
**Technical Requirements**: Mobile frameworks, data science infrastructure

---

*This design plan serves as the definitive reference for LIMS6000 development. All design decisions, business logic, and technical requirements are documented here for current and future development teams. The customer-first organizational hierarchy is fundamental to the system and must be preserved throughout all development phases.*