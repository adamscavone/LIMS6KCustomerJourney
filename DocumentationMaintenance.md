# LIMS6000 Documentation Maintenance Instructions

**File Purpose**: Standardized process for maintaining project documentation as design and development evolve.

**Target Audience**: Project leads, product managers, and senior developers responsible for documentation accuracy.

**Last Updated**: June 2, 2025

## Overview

This document provides step-by-step instructions for maintaining accurate, comprehensive documentation throughout the LIMS6000 development lifecycle. As features are added, modified, or removed, all relevant documentation must be updated to reflect current system state. Special attention must be paid to customer-first organizational principles, workflow innovations, and phase-based pipeline management that are fundamental to the system architecture.

## Primary Documentation Files

### Core Documents (Always Update These)

**1. CustJourneyDesignPlan.md**
- **Purpose**: Technical requirements, design decisions, business logic rules
- **Update Triggers**: New features, UI changes, workflow modifications, technical architecture changes, customer-first organizational changes, workflow phase modifications, analytical batch management changes
- **Responsibility**: Lead developer or product manager
- **Critical Sections**: Customer-first organizational hierarchy, DPM Early Start logic, sample checkout system, phase-based workflow organization, invisible table architecture, analytical batch management

**2. ProjectOverview.md** 
- **Purpose**: Executive summary, project status, implementation roadmap
- **Update Triggers**: Milestone completions, status changes, timeline modifications, stakeholder updates, customer communication feature changes, workflow innovation implementations
- **Responsibility**: Project lead or product manager
- **Critical Sections**: Main features descriptions, customer-first design principles, success metrics, workflow innovations

**3. WorkflowInnovations.md** *(NEW - Created June 2, 2025)*
- **Purpose**: Comprehensive record of workflow innovations and critical design decisions
- **Update Triggers**: Major UX innovations, workflow redesigns, technical architecture decisions, phase-based workflow changes
- **Responsibility**: Product manager or UX lead
- **Critical Sections**: Phase-based pipeline management, hierarchical analytical batch management, invisible table architecture, customer communication integration

### Supporting Documents (Update as Relevant)

**4. User Personas (docs/README.md)**
- **Purpose**: Detailed user profiles and workflow descriptions
- **Update Triggers**: New user research, workflow discoveries, persona refinements, customer communication responsibility changes, phase-based workflow updates
- **Responsibility**: UX researcher or product manager
- **Critical Sections**: Customer communication scenarios, multi-order management workflows, phase-based work management, analytical batch coordination

**5. Technical Architecture Documents**
- **Purpose**: System architecture, database schema, API specifications
- **Update Triggers**: Infrastructure changes, new integrations, performance optimizations, customer-order relationship modeling, analytical batch data structures
- **Responsibility**: Lead developer or technical architect

## Documentation Update Process

### Step 1: Identify Update Triggers

**When to Update Documentation:**
- ✅ New feature implementation completed
- ✅ Existing feature modified or removed
- ✅ User interface changes made
- ✅ Business logic rules changed
- ✅ Technical architecture decisions made
- ✅ User feedback incorporated into design
- ✅ Project milestones reached
- ✅ Timeline or scope changes
- ✅ New stakeholder requirements identified
- ✅ **Customer-first organizational principles modified**
- ✅ **Customer communication workflows changed**
- ✅ **Multi-order management features updated**
- ✅ **DPM Early Start logic or display modified**
- ✅ **Workflow phase organization changed**
- ✅ **Analytical batch management features updated**
- ✅ **Invisible table architecture modifications**
- ✅ **Priority system changes (Rush/Standard logic)**
- ✅ **Due date logic modifications**

### Step 2: Determine Documentation Scope

**For Workflow Innovation Changes:**
1. **WorkflowInnovations.md**: Update with new UX patterns, design decisions, implementation details
2. **CustJourneyDesignPlan.md**: Update technical requirements, business logic, workflow phases
3. **ProjectOverview.md**: Update feature descriptions, user benefits, success metrics
4. **User Personas**: Update workflow descriptions and success scenarios

**For Feature Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, business logic, UI specifications, customer-first principles
2. **ProjectOverview.md**: Update feature descriptions, status, testing criteria, customer communication capabilities
3. **WorkflowInnovations.md**: Document any new UX patterns or workflow innovations
4. **Additional docs**: Update any specialized documents (API specs, user guides, etc.)

**For Customer-First Organizational Changes:**
1. **All Core Documents**: Update to reflect customer → order → sample hierarchy
2. **User Personas**: Update customer communication scenarios and responsibilities
3. **Technical Requirements**: Update database schema and API endpoints for customer-order relationships
4. **WorkflowInnovations.md**: Document organizational design decisions and impact

**For Phase-Based Workflow Changes:**
1. **WorkflowInnovations.md**: Update phase definitions, business logic, user impact
2. **CustJourneyDesignPlan.md**: Update pipeline organization, technical implementation
3. **User Personas**: Update daily workflow scenarios and phase-based work management
4. **ProjectOverview.md**: Update feature descriptions and user benefits

**For Process Changes:**
1. **ProjectOverview.md**: Update development process, deployment procedures, testing protocols
2. **CustJourneyDesignPlan.md**: Update workflow logic if process changes affect user experience

**For Technical Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, architecture decisions, customer data modeling
2. **Technical Architecture docs**: Update system diagrams, API specifications, database schema
3. **WorkflowInnovations.md**: Document any technical innovations or patterns

### Step 3: Content Update Guidelines

**Universal Principles for All Documentation:**

**Accuracy Requirements:**
- All information must reflect current system state
- Remove or mark deprecated information clearly
- Update version numbers and "Last Updated" dates
- Verify all technical details against actual implementation
- **Ensure customer-first principles are consistently applied throughout**
- **Verify workflow phase descriptions match implemented behavior**
- **Confirm analytical batch hierarchies are accurately documented**

**Clarity Standards:**
- Use present tense for current features ("The system displays..." not "The system will display...")
- Include specific examples with actual data/screenshots when possible
- Define all technical terms and acronyms (including "ES" for "Early Start")
- Maintain consistent terminology throughout all documents
- **Maintain consistent customer-first language and organizational hierarchy**
- **Use consistent phase-based workflow terminology**
- **Apply consistent action-oriented labeling standards**

**Completeness Checklist:**
- Document the "why" behind design decisions, not just the "what"
- Include business justification for major features
- Specify technical requirements for developers
- Provide testing criteria for quality assurance
- Include future considerations and known limitations
- **Document customer communication implications of feature changes**
- **Include multi-order management considerations**
- **Explain workflow phase business logic and user benefits**
- **Document analytical batch management processes**
- **Include invisible table architecture technical details**

### Step 4: Cross-Reference Validation

**Ensure Consistency Across Documents:**
1. **Feature descriptions** match across CustJourneyDesignPlan.md, ProjectOverview.md, and WorkflowInnovations.md
2. **Technical requirements** align with actual implementation
3. **Timeline information** is synchronized across all documents
4. **Stakeholder information** is current and accurate
5. **Links and references** to external resources are functional
6. **Customer-first organizational principles** are consistently described
7. **DPM Early Start terminology** (ES Due, customer aggregation) is standardized
8. **Workflow phase definitions** are consistent across all documents
9. **Analytical batch hierarchy descriptions** match implemented structure
10. **Priority system logic** (rush-only, no standard chips) is consistently documented

**Validation Checklist:**
- [ ] All feature names consistent across documents
- [ ] Technical specifications match implemented code
- [ ] User workflow descriptions align with current UI
- [ ] Timeline and milestone information synchronized
- [ ] Stakeholder contact information current
- [ ] External links functional and relevant
- [ ] **Customer-first hierarchy consistently described**
- [ ] **DPM Early Start features accurately documented**
- [ ] **Multi-order customer scenarios included**
- [ ] **Workflow phase organization correctly documented**
- [ ] **Analytical batch management features accurately described**
- [ ] **Invisible table architecture technical details correct**
- [ ] **Priority system logic consistently explained**

## Specific Update Procedures

### For New Workflow Innovations

**1. WorkflowInnovations.md Updates:**
```markdown
## [New Innovation Name]

**Problem Identified:** [What user problem this solves]

**Innovation:** [Description of the solution]

**Implementation:** [Technical and UX details]

**Impact:** [User benefits and business value]

**Future Considerations:** [Potential enhancements or related innovations]
```

**2. CustJourneyDesignPlan.md Updates:**
```markdown
## [Add to appropriate section]
### [Innovation Name] (Core UX Innovation)
**Principle**: [Core design principle with customer impact]
**Implementation**: [Technical approach with customer-first considerations]
**Business Logic**: [Rules and workflows including customer communication aspects]
**Technical Requirements**: [Developer specifications including customer-order relationships]
**Customer Communication Impact**: [How this affects customer status updates and communication]
```

**3. ProjectOverview.md Updates:**
```markdown
## [Add to "What We Built" section]
**[Innovation Name]**: [User-facing description with customer context]
- [Key capability 1]
- [Key capability 2]
- [User benefit]
- [Customer communication benefit]
```

### For New Features

**1. CustJourneyDesignPlan.md Updates:**
```markdown
## [Add to appropriate section]
### [Feature Name]
**Purpose**: [Business justification with customer impact]
**Implementation**: [Technical approach with customer-first considerations]
**Business Logic**: [Rules and workflows including customer communication aspects]
**Technical Requirements**: [Developer specifications including customer-order relationships]
**Customer Communication Impact**: [How this affects customer status updates and communication]
**Workflow Phase Integration**: [How this fits into phase-based pipeline organization]
```

**2. ProjectOverview.md Updates:**
```markdown
## [Add to "What We Built" section]
**[Feature Name]**: [User-facing description with customer context]
- [Key capability 1]
- [Key capability 2]
- [User benefit]
- [Customer communication benefit]
- [Workflow phase integration]
```

**3. Testing Criteria:**
- Add new acceptance criteria to testing sections
- Update success metrics if applicable
- Include new user workflows in validation framework
- **Add customer communication scenarios for testing**
- **Include workflow phase navigation testing**

### For Customer-First Organizational Changes

**1. Update All Core Documents:**
- Search for references to sample-first or order-first organization
- Replace with customer-first hierarchy descriptions
- Update navigation flows to reflect customer → order → sample pattern
- Add customer communication context to workflow descriptions
- Update workflow phase descriptions to maintain customer context

**2. Technical Requirements Updates:**
```markdown
### Customer-First Database Schema Requirements
- CustomerOrders table with customer grouping
- Customer-level aggregation views for DPM Early Start
- API endpoints supporting customer-first data retrieval
- Workflow phase tables maintaining customer context
```

### For Workflow Phase Changes

**1. Update Phase Definitions:**
```markdown
### Phase-Based Workflow Organization
#### [Phase Name] ([Color Code])
- **Purpose**: [What this phase represents]
- **Work Type**: [Type of action required]
- **Action Label**: [Specific UI label]
- **Mental Model**: [How users think about this phase]
- **Business Logic**: [Rules for phase membership]
- **Customer Context**: [How customer information is preserved]
```

**2. Update User Workflows:**
- Modify user persona workflow descriptions
- Update testing scenarios for phase navigation
- Adjust success metrics for phase-based organization
- Include customer communication scenarios for each phase

### For Modified Features

**1. Find and Update All References:**
- Search all documents for feature name
- Update all descriptions to reflect new functionality
- Modify technical requirements as needed
- Update testing criteria
- **Check for customer communication implications**
- **Verify workflow phase integration still accurate**

**2. Preserve Design Decision History:**
```markdown
### Decision Log: [Feature Name] Modification
**Previous Approach**: [What it was before]
**New Approach**: [What it is now]
**Rationale**: [Why the change was made including customer-first considerations]
**Impact**: [What this affects including customer communication workflows]
**Date**: [When change was implemented]
**Workflow Phase Impact**: [How this affects phase-based organization]
```

### For Removed Features

**1. Mark as Deprecated:**
```markdown
~~**[Feature Name]**: [Description]~~ 
*DEPRECATED: Removed in [Version/Date]. Replaced by [New Feature/Approach]. Customer communication impact: [Description]. Workflow phase impact: [Description]*
```

**2. Update Dependencies:**
- Remove feature from testing criteria
- Update user workflows that referenced the feature
- Modify technical requirements
- Update success metrics if applicable
- **Update customer communication scenarios that used the feature**
- **Adjust workflow phase descriptions if affected**

## Quality Assurance for Documentation

### Pre-Commit Checklist

**Before committing documentation updates:**
- [ ] "Last Updated" date changed to current date
- [ ] All new content reviewed for accuracy
- [ ] Cross-references validated
- [ ] Spelling and grammar checked
- [ ] Formatting consistent with document standards
- [ ] Links tested and functional
- [ ] **Customer-first principles consistently applied**
- [ ] **Customer communication scenarios validated**
- [ ] **DPM Early Start terminology standardized**
- [ ] **Workflow phase descriptions accurate**
- [ ] **Analytical batch management features correctly documented**
- [ ] **Invisible table architecture details accurate**

### Review Process

**Documentation Review Requirements:**
1. **Technical Review**: Lead developer validates technical accuracy including customer-order data modeling and workflow phase implementation
2. **Product Review**: Product manager validates business logic and requirements including customer communication workflows and phase-based organization
3. **UX Review**: UX lead validates workflow innovations and user experience descriptions
4. **Stakeholder Review**: Key stakeholders review user-facing changes including customer service implications
5. **Customer Communication Review**: Validate that customer communication scenarios are accurate and complete
6. **Workflow Innovation Review**: Ensure workflow innovations are accurately documented and technically feasible
7. **Final Check**: Project lead performs comprehensive review before merge

**Review Timeline:**
- Simple updates: 24-hour review cycle
- Major changes: 48-72 hour review cycle
- Architecture changes: 1-week review cycle with full team input
- **Customer-first organizational changes: 72-hour review cycle with customer service input**
- **Workflow innovation changes: 72-hour review cycle with UX and technical validation**

## Repository Organization

### File Naming Conventions

**Core Documentation:**
- `CustJourneyDesignPlan.md` (technical requirements and design decisions)
- `ProjectOverview.md` (executive summary and project status)
- `WorkflowInnovations.md` (workflow innovations and critical design decisions)
- `DocumentationMaintenance.md` (this file)

**Supporting Documentation:**
- `docs/README.md` (user personas and research)
- `docs/TechnicalArchitecture.md` (system architecture and API specs)
- `docs/CustomerCommunicationGuides/` (customer communication procedures)
- `docs/WorkflowPhaseGuides/` (phase-based workflow documentation)
- `docs/AnalyticalBatchManagement/` (batch management procedures)
- `docs/UserGuides/` (end-user documentation)
- `docs/DeveloperGuides/` (technical implementation guides)

### Version Control Best Practices

**Commit Message Format:**
```
docs: [type] - [brief description]

Examples:
docs: feature - Add DPM Early Start customer aggregation documentation
docs: innovation - Document phase-based pipeline management workflow
docs: update - Modify customer-first organizational hierarchy requirements
docs: fix - Correct customer communication workflow descriptions
docs: customer - Update multi-order management procedures
docs: workflow - Add analytical batch hierarchy documentation
```

**Branch Strategy:**
- Create feature branches for major documentation updates
- Use pull requests for review process
- Maintain documentation alongside code in same repositories
- **Create workflow-focused branches for major workflow innovation changes**
- **Create customer-focused branches for major customer communication workflow changes**

## Automation and Tools

### Automated Checks

**GitHub Actions (Future Implementation):**
- Spell check on all markdown files
- Link validation for external references
- Format consistency checking
- "Last Updated" date validation
- **Customer-first terminology consistency checking**
- **Workflow phase terminology standardization**

**Documentation Standards:**
- Use markdown linting tools
- Maintain consistent heading hierarchy
- Follow accessibility guidelines for documentation
- **Consistent customer-first language patterns**
- **Standardized workflow phase terminology**
- **Consistent analytical batch management descriptions**

### Useful Tools

**Documentation Writing:**
- **VS Code**: Markdown preview and editing
- **Grammarly**: Grammar and style checking
- **Hemingway Editor**: Readability improvement
- **Draw.io**: Diagram creation for technical documentation including customer-order relationship diagrams and workflow phase flows

**Collaboration:**
- **GitHub Issues**: Track documentation tasks including customer communication updates and workflow innovation documentation
- **GitHub Projects**: Organize documentation roadmap
- **Slack/Teams**: Real-time collaboration and questions

## Troubleshooting Common Issues

### Missing Customer-First Context

**When customer organizational information is incomplete:**
1. **Identify the gap**: What specific customer-first information is missing?
2. **Find the source**: Who has the missing customer communication requirements?
3. **Document placeholder**: Add "[TBD - Customer Communication Team: Name]" for missing details
4. **Set follow-up**: Create issue or task to complete customer-first information
5. **Update timeline**: Include completion date for missing customer communication workflows

### Missing Workflow Innovation Documentation

**When workflow innovations are not properly documented:**
1. **Identify the innovation**: What specific UX pattern or workflow change occurred?
2. **Document in WorkflowInnovations.md**: Add comprehensive innovation description
3. **Update related documents**: Ensure technical requirements and user benefits are documented
4. **Validate implementation**: Confirm documentation matches actual implementation
5. **Plan future enhancements**: Document potential related innovations

### Conflicting Information

**When documents contradict each other:**
1. **Identify the conflict**: Document specific contradictions including customer-first vs other organizational approaches
2. **Determine source of truth**: Which document/source is most current and aligns with customer-first principles?
3. **Update all references**: Ensure consistency across all documents
4. **Add clarification**: Include note about previous confusion
5. **Review process**: Strengthen review procedures to prevent future conflicts

### Outdated Customer Communication Information

**When customer communication information becomes obsolete:**
1. **Audit entire document**: Check all sections for outdated customer communication content
2. **Mark deprecated items**: Use strikethrough and replacement information
3. **Update references**: Modify any sections that reference outdated customer workflows
4. **Validate current state**: Confirm all customer communication information reflects actual implementation
5. **Test scenarios**: Validate customer communication scenarios with actual customer service team

### Outdated Workflow Phase Information

**When workflow phase descriptions become inaccurate:**
1. **Review phase definitions**: Ensure all phase descriptions match current implementation
2. **Update phase relationships**: Verify workflow progression logic is correctly documented
3. **Validate action labels**: Confirm action-oriented labels match current UI
4. **Test phase navigation**: Verify phase-based workflow scenarios are accurate
5. **Update user workflows**: Ensure user persona workflows reflect current phase organization

## Success Metrics

### Documentation Quality Indicators

**Quantitative Metrics:**
- Documentation updated within 48 hours of feature implementation
- Zero conflicting information across core documents
- 100% of external links functional
- "Last Updated" dates accurate within 1 week
- **Customer-first principles consistently applied across all documents**
- **Workflow phase descriptions consistently accurate**

**Qualitative Metrics:**
- New team members can understand system from documentation alone
- Stakeholders reference documentation for project status
- Developers use documentation for implementation guidance
- Documentation questions decrease over time
- **Customer service team can use documentation for status inquiries**
- **Customer communication workflows are clear and actionable**
- **Workflow innovation implementations match documented designs**

### Regular Maintenance Schedule

**Weekly Review:**
- Check "Last Updated" dates across all documents
- Validate external links
- Review and update project status information
- **Verify customer-first terminology consistency**
- **Confirm workflow phase descriptions remain accurate**

**Monthly Audit:**
- Comprehensive review of all documentation
- Cross-reference validation
- Stakeholder feedback collection
- Process improvement identification
- **Customer communication workflow validation with customer service team**
- **Workflow innovation assessment for documentation accuracy**

**Quarterly Assessment:**
- Documentation effectiveness evaluation
- Process refinement
- Tool evaluation and updates
- Training needs assessment
- **Customer-first organizational principle review**
- **Customer communication scenario effectiveness assessment**
- **Workflow innovation impact evaluation**

## Customer-First Documentation Standards

### Mandatory Customer Context Elements

**All workflow descriptions must include:**
- Customer identification and grouping
- Order-level organization within customer
- Customer communication touchpoints
- Multi-order customer considerations
- External vs internal deadline distinctions
- Workflow phase impact on customer communication

**Customer Communication Scenarios:**
- Daily status inquiry responses
- Proactive communication capabilities
- Multi-order management workflows
- Quality issue customer impact assessment
- Phase-based communication approaches

### Workflow Innovation Documentation Standards

**All workflow innovations must include:**
- Problem identification and user impact
- Innovation description and implementation details
- Technical requirements and architecture considerations
- User benefits and business value assessment
- Future enhancement possibilities
- Customer communication implications

### Terminology Standards

**Standardized Terms:**
- **Customer-First Hierarchy**: Customer → Customer Order → Individual Samples
- **ES Due**: Early Start Due (DPM microbial decision expected date)
- **Reporting Due**: External customer deadline (highest priority)
- **Multi-Order Customer**: Customer with multiple concurrent orders
- **Phase-Based Workflow**: Organization by action type and work requirements
- **Analytical Batch Hierarchy**: Analytical Batch → Prep Batches → Individual Samples
- **Invisible Table**: CSS Grid-based layout with consistent column positioning
- **Action-Oriented Labels**: UI labels specifying required work type

---

**Remember**: Good documentation is a living resource that evolves with the project. Regular maintenance ensures it remains valuable for all stakeholders throughout the development lifecycle. The customer-first organizational hierarchy and workflow innovation documentation are fundamental to LIMS6000 and must be consistently maintained across all documentation.