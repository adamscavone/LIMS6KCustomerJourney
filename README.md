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

## Ideal User Journey for LIMS6000

### **Morning Workflow: Daily Planning & Prioritization**

Sarah logs in and immediately sees a **customer-first dashboard** that shows:
- **Intelligent Due Date Hierarchy:** Clear visual distinction between "prep due," "analysis due," and "reporting due" with reporting due as highest priority
- **Customer-Organized Workload Overview:** All samples awaiting her review, organized by customer and order, filtered by her specific DoCs, with realistic time estimates
- **Batch Status Pipeline:** Visual workflow showing samples moving through prep → analysis → primary review → secondary review with customer context
- **Priority Alerts:** Rush samples clearly flagged with actual analytical deadlines (not misleading system dates)
- **DPM Early Warning:** Customer-level aggregation showing potential upcoming chemistry workload 2-3 days in advance
- **Multi-Order Visibility:** Clear distinction between multiple orders from the same customer

### **Primary Review Workflow: Comprehensive Batch Analysis**

When Sarah clicks into a batch for primary review:
- **Integrated Batch Record:** All sample prep data, QC results, and instrument parameters in one unified view (no more Excel hunting)
- **Smart Quality Control Dashboard:** Automated QC evaluation with clear pass/fail indicators and deviation flagging
- **Traceability Tools:** One-click access to equipment records, calibration data, and analyst qualifications for the entire batch
- **Exception Management:** Streamlined interface for documenting deviations with pre-populated templates and approval workflows
- **Customer Context Preservation:** Maintain visibility of customer and order information throughout review process

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

### **DPM Early Start Management**

For managing conditional chemistry samples:
- **Customer-Level Early Warning:** Aggregated view showing potential upcoming chemistry workload by customer
- **ES Due Tracking:** "Early Start Due" dates showing when microbial decisions are expected
- **Resource Planning:** Advance notice of potential chemistry work 2-3 days ahead for proper staffing
- **Customer Communication:** Ability to inform customers about potential timeline impacts based on microbial results

## Key Design Principles for LIMS6000

### **Customer-First Information Architecture:**
- **Operational Hierarchy:** Customer → Customer Order → Individual Samples reflects natural laboratory communication patterns
- **Multi-Order Support:** System accommodates customers with multiple concurrent orders clearly
- **External Deadline Priority:** Reporting due dates are customer-facing commitments and take absolute priority
- **Communication Context:** All workflow information maintains customer and order context for status updates

### **Information Architecture:**
- **Single Source of Truth:** All analytical data, QC records, and sample prep information unified in one system
- **Context-Aware Navigation:** Information presented based on user's DoCs and current workflow stage
- **Intelligent Filtering:** Smart defaults that show relevant information without overwhelming detail
- **Customer Grouping:** Natural organization by customer relationships for operational alignment

### **Workflow Optimization:**
- **Realistic Time Management:** Due dates that reflect actual analytical requirements, with reporting deadlines prioritized
- **Progressive Disclosure:** Essential information prominent, detailed data accessible with minimal clicks
- **Error Prevention:** Built-in validation and confirmation steps for critical decisions
- **Early Warning Systems:** Advance notice of upcoming workload for proper resource planning

### **Quality Control Integration:**
- **Automated Compliance Checking:** System automatically validates QC requirements and flags deviations
- **Audit Trail Transparency:** Complete traceability of all analytical decisions and data modifications
- **Collaborative Review Tools:** Seamless handoff between primary and secondary reviewers
- **Customer Impact Assessment:** Understanding how quality issues affect customer deliverables

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

## Customer Communication Scenarios

### Daily Status Inquiries
Sarah should be able to quickly respond to customer service requests like:
- "Where are all of Mountain Peak Cannabis samples?" → One-click customer view showing all orders and progress
- "When will Order ORD-2024-1157 be complete?" → Immediate visibility of bottlenecks and realistic completion estimates
- "Why is the Green Valley order taking longer?" → Quick access to any quality control issues or confirmation requirements

### Proactive Communication
The system should enable Sarah to proactively communicate:
- **Early Warnings:** "Pacific Northwest Cannabis has 8 samples in DPM Early Start that could need chemistry by Friday"
- **Quality Issues:** "Desert Bloom samples may require confirmation - will impact Tuesday delivery"
- **Capacity Planning:** "We can accommodate Northern Lights' rush request without affecting other customers"

### Multi-Order Management
For customers with multiple concurrent orders:
- Clear distinction between Order A (due Monday) and Order B (due Thursday) from same customer
- Ability to provide order-specific status updates
- Understanding of cross-order resource allocation and priority management

This customer profile emphasizes that Sarah is not just processing samples - she's maintaining the scientific integrity of the entire analytical operation while managing complex time pressures, regulatory requirements, and customer communication responsibilities. LIMS6000 must support her as both an individual contributor and a critical quality assurance checkpoint in the laboratory's compliance framework, with clear customer context throughout all workflows.