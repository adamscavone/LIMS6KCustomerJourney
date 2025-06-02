# Customer Profile: Laboratory Chemistry Analyst

## User Persona: Dr. Sarah Chen, Senior Chemistry Analyst

**Background:**
Sarah is a 32-year-old analytical chemist with 8 years of experience in cannabis testing laboratories. She holds a B.S. in Chemistry and has specialized certifications in chromatography and mass spectrometry. She's detail-oriented, scientifically rigorous, and deeply frustrated by systems that create unnecessary complexity in her analytical workflow. She frequently communicates with customer service teams about order status and sample progress.

**Core Responsibilities:**
- Conducting primary and secondary reviews of analytical batches
- Managing multiple assays simultaneously (cannabinoids, pesticides, terpenes, heavy metals)
- Ensuring QC compliance and data integrity
- Meeting strict turnaround time requirements with reporting deadlines as highest priority
- Maintaining Demonstrations of Capability (DoCs) across multiple assays
- **Customer workload management** for capacity planning and communication
- **Multi-order coordination** for customers with multiple concurrent orders
- **Customer status communication** providing updates organized by customer and order context
- **Analytical batch planning** organizing prep batches and instrument run schedules
- **Air gap data management** handling manual export/import cycles between instruments and LIMS
- **Phase-based workflow coordination** managing different types of work across samples in various processing stages

## Pain Points with Current System (LIMS5000)

**Critical Frustrations:**
1. **Fragmented Information Architecture:** Critical sample prep data lives in Excel workbooks outside LIMS, making comprehensive batch review nearly impossible
2. **Misleading Time Management:** "NeededBy" dates don't reflect her actual analytical deadlines - she has to mentally calculate backwards from reporting deadlines
3. **Poor Batch Traceability:** Cannot easily trace sample results within batches or investigate quality control failures across related samples
4. **Rush Sample Chaos:** The rush flagging system is broken, causing all samples to show the same misleading due date
5. **Confirmation Workflow Blindness:** No clear visual distinction between initial analysis and confirmation runs, leading to workflow confusion
6. **Customer Context Lost:** Cannot easily see customer-level workload or provide coherent status updates organized by customer and order
7. **No Early Warning System:** Cannot predict upcoming chemistry workload from DPM Early Start samples, making resource planning difficult
8. **Multi-Order Confusion:** Customers with multiple orders are difficult to track and communicate about effectively
9. **Mixed Workflow Phases:** All samples jumbled together regardless of what type of work is needed, causing confusion about required actions
10. **No Analytical Batch Visibility:** Cannot see instrument run organization or track complex multi-batch analytical processes
11. **Air Gap Confusion:** No clear guidance for when and how to export data from instruments to LIMS
12. **Content Shifting:** Information moves around in tabular displays making it difficult to scan efficiently

## Ideal User Journey for LIMS6000

### **Morning Workflow: Daily Planning & Phase Assessment**

Sarah logs in and immediately sees a **phase-based customer-first dashboard** that shows:
- **Intelligent Due Date Hierarchy:** Clear visual distinction between "prep due," "analysis due," and "reporting due" with reporting due as highest priority
- **Customer-Organized Workload Overview:** All samples awaiting her attention, organized by customer and order, filtered by her specific DoCs, with realistic time estimates
- **Phase-Based Pipeline Organization:** Samples grouped by workflow phase (Prep Needed, Ready for Batch, Analytical Batches, Data Ready) with clear action guidance
- **Priority Alerts:** Rush samples clearly flagged with actual analytical deadlines (not misleading system dates)
- **DPM Early Warning:** Customer-level aggregation showing potential upcoming chemistry workload 2-3 days in advance, sorted by due date urgency
- **Multi-Order Visibility:** Clear distinction between multiple orders from the same customer
- **Analytical Batch Status:** Real-time visibility into instrument runs and their hierarchical organization

### **Phase-Based Work Management: Action-Oriented Workflow**

Sarah can focus on appropriate work types through distinct workflow phases:

#### **🔴 Prep Needed Phase**
When Sarah needs to prepare samples:
- **Clear Action Guidance:** "PREP REQUIRED" tells her exactly what work is needed
- **Customer Context:** Maintains visibility of customer and order information
- **Priority Sorting:** Overdue and rush samples prominently displayed
- **Batch Planning:** Can organize samples into prep batches for efficient work

#### **🟠 Ready for Batch Phase**
When organizing analytical batches:
- **Batch Assignment Interface:** Easy tools for committing prep batches to analytical batches
- **Instrument Planning:** Schedule analytical batches based on instrument availability
- **Customer Impact Assessment:** Understand how batch decisions affect customer deliveries
- **Resource Optimization:** Balance workload across available instruments

#### **🔵 Analytical Batches Phase**
When monitoring instrument runs:
- **Hierarchical Visibility:** Analytical Batch → Prep Batches → Individual Samples
- **Real-Time Status:** "RUNNING" with pulse animation for active instruments, "QUEUED" for pending batches
- **Time Tracking:** Start times and estimated completion for planning
- **Expandable Detail:** Drill down to see which samples are in which prep batches
- **Customer Context:** Maintain customer information at all levels of hierarchy

#### **🟣 Data Ready Phase**
When handling air gap data management:
- **Export Guidance:** "EXPORT NEEDED" clearly indicates manual data export required
- **Batch Organization:** See which analytical batches have completed and need data export
- **Import Tracking:** Monitor data import progress and resolve issues
- **Quality Check:** Verify data integrity during transfer process

### **Primary Review Workflow: Comprehensive Batch Analysis**

When Sarah clicks into a batch for primary review:
- **Integrated Batch Record:** All sample prep data, QC results, and instrument parameters in one unified view (no more Excel hunting)
- **Smart Quality Control Dashboard:** Automated QC evaluation with clear pass/fail indicators and deviation flagging
- **Traceability Tools:** One-click access to equipment records, calibration data, and analyst qualifications for the entire batch
- **Exception Management:** Streamlined interface for documenting deviations with pre-populated templates and approval workflows
- **Customer Context Preservation:** Maintain visibility of customer and order information throughout review process
- **Cross-Batch Analysis:** Ability to investigate issues across related analytical and prep batches

### **Secondary Review Workflow: Cross-Verification**

For secondary review of colleagues' work:
- **Comparative Analysis View:** Side-by-side comparison of QC data, calculations, and reviewer notes
- **Deviation Investigation Tools:** Easy access to batch-level quality controls to investigate potential systematic errors
- **Collaborative Annotation:** Ability to add notes and questions that integrate with the primary reviewer's workflow
- **Escalation Pathways:** Clear workflows for declining approval with structured feedback loops
- **Customer Impact Assessment:** Understanding how quality issues affect customer deliverables

### **Confirmation Analysis Management**

When handling confirmation requests:
- **Confirmation Tracking Dashboard:** Clear visual distinction between initial and confirmatory analyses
- **Replicate Management:** Intuitive interface for managing different replicate requirements (duplicate, triplicate, etc.)
- **Timeline Coordination:** Realistic deadline calculation that accounts for confirmation complexity
- **Customer Communication Integration:** Automated notifications to customer service team about confirmation status and impact on delivery

### **Multi-Assay Coordination with Customer Context**

Throughout her day, Sarah needs seamless coordination across her DoC-qualified assays:
- **Cross-Assay Sample Tracking:** Unified view of sample progress across all assays (cannabinoids, pesticides, etc.) organized by customer and order
- **Bottleneck Identification:** Visual indicators of workflow bottlenecks across all assays she's qualified for
- **Intelligent Task Routing:** System suggestions for optimal task sequencing based on customer deadlines and equipment availability
- **Capacity Planning:** Real-time workload distribution across qualified analysts with customer-level visibility
- **Customer Status Updates:** Quick generation of customer-specific progress reports
- **Phase Coordination:** Understanding how samples in different phases across different assays affect overall customer delivery

### **DPM Early Start Management with Due Date Priority**

For managing conditional chemistry samples:
- **Customer-Level Early Warning:** Aggregated view showing potential upcoming chemistry workload by customer
- **Due Date Priority Sorting:** Overdue customers first, then by earliest ES Due date
- **ES Due Tracking:** "Early Start Due" dates showing when microbial decisions are expected
- **Resource Planning:** Advance notice of potential chemistry work 2-3 days ahead for proper staffing
- **Customer Communication:** Ability to inform customers about potential timeline impacts based on microbial results
- **Priority Management:** Focus on most urgent microbial decisions first

## Key Design Principles for LIMS6000

### **Customer-First Information Architecture:**
- **Operational Hierarchy:** Customer → Customer Order → Individual Samples reflects natural laboratory communication patterns
- **Multi-Order Support:** System accommodates customers with multiple concurrent orders clearly
- **External Deadline Priority:** Reporting due dates are customer-facing commitments and take absolute priority
- **Communication Context:** All workflow information maintains customer and order context for status updates
- **Context Preservation:** Customer information visible throughout all workflow phases

### **Phase-Based Workflow Organization:**
- **Action-Oriented Phases:** Work organized by type of action required (Prep, Batch Assignment, Monitoring, Export)
- **Clear Guidance:** Specific action labels tell users exactly what work is needed
- **Hierarchical Detail:** Expandable structures provide drill-down capability while maintaining overview
- **Status Progression:** Natural workflow progression through phases
- **Air Gap Recognition:** Dedicated phase for manual data export/import processes

### **Information Architecture:**
- **Single Source of Truth:** All analytical data, QC records, and sample prep information unified in one system
- **Context-Aware Navigation:** Information presented based on user's DoCs and current workflow stage
- **Intelligent Filtering:** Smart defaults that show relevant information without overwhelming detail
- **Customer Grouping:** Natural organization by customer relationships for operational alignment
- **Invisible Table Structure:** Professional layout with consistent column positioning

### **Workflow Optimization:**
- **Realistic Time Management:** Due dates that reflect actual analytical requirements, with reporting deadlines prioritized
- **Progressive Disclosure:** Essential information prominent, detailed data accessible with minimal clicks
- **Error Prevention:** Built-in validation and confirmation steps for critical decisions
- **Early Warning Systems:** Advance notice of upcoming workload for proper resource planning
- **Batch Management:** Tools for organizing prep batches and analytical batch planning

### **Quality Control Integration:**
- **Automated Compliance Checking:** System automatically validates QC requirements and flags deviations
- **Audit Trail Transparency:** Complete traceability of all analytical decisions and data modifications
- **Collaborative Review Tools:** Seamless handoff between primary and secondary reviewers
- **Customer Impact Assessment:** Understanding how quality issues affect customer deliverables
- **Cross-Batch Analysis:** Ability to investigate issues across related batches

## Success Metrics

Sarah's ideal day with LIMS6000:
- **Reduced Context Switching:** 80% reduction in time spent hunting for sample prep data across multiple systems
- **Improved Decision Speed:** 50% faster batch review completion through integrated QC dashboards
- **Enhanced Quality Assurance:** Zero missed QC failures due to improved batch-level visibility
- **Stress Reduction:** Confidence in deadline management through realistic, role-specific due dates with reporting priority
- **Proactive Problem Solving:** Early identification of systematic issues through improved traceability tools
- **Customer Communication Efficiency:** 75% faster generation of customer status updates
- **Early Warning Effectiveness:** 90% accurate prediction of chemistry workload 2-3 days in advance
- **Multi-Order Management:** Clear tracking of customers with multiple concurrent orders without confusion
- **Phase-Based Navigation:** Immediate understanding of required work type for any sample
- **Analytical Batch Efficiency:** 60% improvement in batch planning and instrument utilization
- **Air Gap Management:** Clear, efficient data export/import processes with minimal confusion

## Customer Communication Scenarios

### Daily Status Inquiries
Sarah should be able to quickly respond to customer service requests like:
- "Where are all of Mountain Peak Cannabis samples?" → One-click customer view showing all orders and progress across all workflow phases
- "When will Order ORD-2024-1157 be complete?" → Immediate visibility of bottlenecks and realistic completion estimates based on current workflow phase
- "Why is the Green Valley order taking longer?" → Quick access to any quality control issues, confirmation requirements, or analytical batch delays

### Proactive Communication
The system should enable Sarah to proactively communicate:
- **Early Warnings:** "Pacific Northwest Cannabis has 8 samples in DPM Early Start that could need chemistry by Friday"
- **Quality Issues:** "Desert Bloom samples may require confirmation - will impact Tuesday delivery"
- **Capacity Planning:** "We can accommodate Northern Lights' rush request without affecting other customers"
- **Batch Updates:** "Cannabinoids analytical batch running overnight, results available tomorrow morning"
- **Data Management:** "Exporting terpenes data from instrument, final results by end of day"

### Multi-Order Management
For customers with multiple concurrent orders:
- Clear distinction between Order A (due Monday) and Order B (due Thursday) from same customer
- Ability to provide order-specific status updates
- Understanding of cross-order resource allocation and priority management
- Phase-based status updates for different orders in different workflow stages

### Phase-Based Communication
Sarah can provide specific, actionable updates based on workflow phases:
- **Prep Phase:** "Your samples are in prep queue, preparation starting this afternoon"
- **Batch Ready:** "Your samples are prepped and queued for tonight's analytical batch"
- **Running:** "Your samples are currently running on the instrument, results expected by 8 AM"
- **Data Ready:** "Analysis complete, exporting data and preparing results for review"
- **Review:** "Data imported, beginning quality control review process"

This customer profile emphasizes that Sarah is not just processing samples - she's maintaining the scientific integrity of the entire analytical operation while managing complex time pressures, regulatory requirements, and customer communication responsibilities across multiple workflow phases. LIMS6000 must support her as both an individual contributor and a critical quality assurance checkpoint in the laboratory's compliance framework, with clear customer context and phase-based workflow guidance throughout all processes.