# LIMS6000 Documentation Maintenance Instructions

**File Purpose**: Standardized process for maintaining project documentation as design and development evolve.

**Target Audience**: Project leads, product managers, and senior developers responsible for documentation accuracy.

**Last Updated**: June 2, 2025

## Overview

This document provides step-by-step instructions for maintaining accurate, comprehensive documentation throughout the LIMS6000 development lifecycle. As features are added, modified, or removed, all relevant documentation must be updated to reflect current system state. Special attention must be paid to customer-first organizational principles and workflow innovations that are fundamental to the system architecture.

## Primary Documentation Files

### Core Documents (Always Update These)

**1. CustJourneyDesignPlan.md**
- **Purpose**: Technical requirements, design decisions, business logic rules
- **Update Triggers**: New features, UI changes, workflow modifications, technical architecture changes, customer-first organizational changes
- **Responsibility**: Lead developer or product manager
- **Critical Sections**: Customer-first organizational hierarchy, DPM Early Start logic, sample checkout system

**2. ProjectOverview.md** 
- **Purpose**: Executive summary, project status, implementation roadmap
- **Update Triggers**: Milestone completions, status changes, timeline modifications, stakeholder updates, customer communication feature changes
- **Responsibility**: Project lead or product manager
- **Critical Sections**: Main features descriptions, customer-first design principles, success metrics

### Supporting Documents (Update as Relevant)

**3. User Personas (docs/README.md)**
- **Purpose**: Detailed user profiles and workflow descriptions
- **Update Triggers**: New user research, workflow discoveries, persona refinements, customer communication responsibility changes
- **Responsibility**: UX researcher or product manager
- **Critical Sections**: Customer communication scenarios, multi-order management workflows

**4. Technical Architecture Documents**
- **Purpose**: System architecture, database schema, API specifications
- **Update Triggers**: Infrastructure changes, new integrations, performance optimizations, customer-order relationship modeling
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

### Step 2: Determine Documentation Scope

**For Feature Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, business logic, UI specifications, customer-first principles
2. **ProjectOverview.md**: Update feature descriptions, status, testing criteria, customer communication capabilities
3. **Additional docs**: Update any specialized documents (API specs, user guides, etc.)

**For Customer-First Organizational Changes:**
1. **All Core Documents**: Update to reflect customer → order → sample hierarchy
2. **User Personas**: Update customer communication scenarios and responsibilities
3. **Technical Requirements**: Update database schema and API endpoints for customer-order relationships

**For Process Changes:**
1. **ProjectOverview.md**: Update development process, deployment procedures, testing protocols
2. **CustJourneyDesignPlan.md**: Update workflow logic if process changes affect user experience

**For Technical Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, architecture decisions, customer data modeling
2. **Technical Architecture docs**: Update system diagrams, API specifications, database schema

### Step 3: Content Update Guidelines

**Universal Principles for All Documentation:**

**Accuracy Requirements:**
- All information must reflect current system state
- Remove or mark deprecated information clearly
- Update version numbers and "Last Updated" dates
- Verify all technical details against actual implementation
- **Ensure customer-first principles are consistently applied throughout**

**Clarity Standards:**
- Use present tense for current features ("The system displays..." not "The system will display...")
- Include specific examples with actual data/screenshots when possible
- Define all technical terms and acronyms (including "ES" for "Early Start")
- Maintain consistent terminology throughout all documents
- **Maintain consistent customer-first language and organizational hierarchy**

**Completeness Checklist:**
- Document the "why" behind design decisions, not just the "what"
- Include business justification for major features
- Specify technical requirements for developers
- Provide testing criteria for quality assurance
- Include future considerations and known limitations
- **Document customer communication implications of feature changes**
- **Include multi-order management considerations**

### Step 4: Cross-Reference Validation

**Ensure Consistency Across Documents:**
1. **Feature descriptions** match across CustJourneyDesignPlan.md and ProjectOverview.md
2. **Technical requirements** align with actual implementation
3. **Timeline information** is synchronized across all documents
4. **Stakeholder information** is current and accurate
5. **Links and references** to external resources are functional
6. **Customer-first organizational principles** are consistently described
7. **DPM Early Start terminology** (ES Due, customer aggregation) is standardized

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

## Specific Update Procedures

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
```

**2. ProjectOverview.md Updates:**
```markdown
## [Add to "What We Built" section]
**[Feature Name]**: [User-facing description with customer context]
- [Key capability 1]
- [Key capability 2]
- [User benefit]
- [Customer communication benefit]
```

**3. Testing Criteria:**
- Add new acceptance criteria to testing sections
- Update success metrics if applicable
- Include new user workflows in validation framework
- **Add customer communication scenarios for testing**

### For Customer-First Organizational Changes

**1. Update All Core Documents:**
- Search for references to sample-first or order-first organization
- Replace with customer-first hierarchy descriptions
- Update navigation flows to reflect customer → order → sample pattern
- Add customer communication context to workflow descriptions

**2. Technical Requirements Updates:**
```markdown
### Customer-First Database Schema Requirements
- CustomerOrders table with customer grouping
- Customer-level aggregation views for DPM Early Start
- API endpoints supporting customer-first data retrieval
```

### For Modified Features

**1. Find and Update All References:**
- Search both documents for feature name
- Update all descriptions to reflect new functionality
- Modify technical requirements as needed
- Update testing criteria
- **Check for customer communication implications**

**2. Preserve Design Decision History:**
```markdown
### Decision Log: [Feature Name] Modification
**Previous Approach**: [What it was before]
**New Approach**: [What it is now]
**Rationale**: [Why the change was made including customer-first considerations]
**Impact**: [What this affects including customer communication workflows]
**Date**: [When change was implemented]
```

### For Removed Features

**1. Mark as Deprecated:**
```markdown
~~**[Feature Name]**: [Description]~~ 
*DEPRECATED: Removed in [Version/Date]. Replaced by [New Feature/Approach]. Customer communication impact: [Description]*
```

**2. Update Dependencies:**
- Remove feature from testing criteria
- Update user workflows that referenced the feature
- Modify technical requirements
- Update success metrics if applicable
- **Update customer communication scenarios that used the feature**

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

### Review Process

**Documentation Review Requirements:**
1. **Technical Review**: Lead developer validates technical accuracy including customer-order data modeling
2. **Product Review**: Product manager validates business logic and requirements including customer communication workflows
3. **Stakeholder Review**: Key stakeholders review user-facing changes including customer service implications
4. **Customer Communication Review**: Validate that customer communication scenarios are accurate and complete
5. **Final Check**: Project lead performs comprehensive review before merge

**Review Timeline:**
- Simple updates: 24-hour review cycle
- Major changes: 48-72 hour review cycle
- Architecture changes: 1-week review cycle with full team input
- **Customer-first organizational changes: 72-hour review cycle with customer service input**

## Repository Organization

### File Naming Conventions

**Core Documentation:**
- `CustJourneyDesignPlan.md` (technical requirements and design decisions)
- `ProjectOverview.md` (executive summary and project status)
- `DocumentationMaintenance.md` (this file)

**Supporting Documentation:**
- `docs/README.md` (user personas and research)
- `docs/TechnicalArchitecture.md` (system architecture and API specs)
- `docs/CustomerCommunicationGuides/` (customer communication procedures)
- `docs/UserGuides/` (end-user documentation)
- `docs/DeveloperGuides/` (technical implementation guides)

### Version Control Best Practices

**Commit Message Format:**
```
docs: [type] - [brief description]

Examples:
docs: feature - Add DPM Early Start customer aggregation documentation
docs: update - Modify customer-first organizational hierarchy requirements
docs: fix - Correct customer communication workflow descriptions
docs: customer - Update multi-order management procedures
```

**Branch Strategy:**
- Create feature branches for major documentation updates
- Use pull requests for review process
- Maintain documentation alongside code in same repositories
- **Create customer-focused branches for major customer communication workflow changes**

## Automation and Tools

### Automated Checks

**GitHub Actions (Future Implementation):**
- Spell check on all markdown files
- Link validation for external references
- Format consistency checking
- "Last Updated" date validation
- **Customer-first terminology consistency checking**

**Documentation Standards:**
- Use markdown linting tools
- Maintain consistent heading hierarchy
- Follow accessibility guidelines for documentation
- **Consistent customer-first language patterns**

### Useful Tools

**Documentation Writing:**
- **VS Code**: Markdown preview and editing
- **Grammarly**: Grammar and style checking
- **Hemingway Editor**: Readability improvement
- **Draw.io**: Diagram creation for technical documentation including customer-order relationship diagrams

**Collaboration:**
- **GitHub Issues**: Track documentation tasks including customer communication updates
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

## Success Metrics

### Documentation Quality Indicators

**Quantitative Metrics:**
- Documentation updated within 48 hours of feature implementation
- Zero conflicting information across core documents
- 100% of external links functional
- "Last Updated" dates accurate within 1 week
- **Customer-first principles consistently applied across all documents**

**Qualitative Metrics:**
- New team members can understand system from documentation alone
- Stakeholders reference documentation for project status
- Developers use documentation for implementation guidance
- Documentation questions decrease over time
- **Customer service team can use documentation for status inquiries**
- **Customer communication workflows are clear and actionable**

### Regular Maintenance Schedule

**Weekly Review:**
- Check "Last Updated" dates across all documents
- Validate external links
- Review and update project status information
- **Verify customer-first terminology consistency**

**Monthly Audit:**
- Comprehensive review of all documentation
- Cross-reference validation
- Stakeholder feedback collection
- Process improvement identification
- **Customer communication workflow validation with customer service team**

**Quarterly Assessment:**
- Documentation effectiveness evaluation
- Process refinement
- Tool evaluation and updates
- Training needs assessment
- **Customer-first organizational principle review**
- **Customer communication scenario effectiveness assessment**

## Customer-First Documentation Standards

### Mandatory Customer Context Elements

**All workflow descriptions must include:**
- Customer identification and grouping
- Order-level organization within customer
- Customer communication touchpoints
- Multi-order customer considerations
- External vs internal deadline distinctions

**Customer Communication Scenarios:**
- Daily status inquiry responses
- Proactive communication capabilities
- Multi-order management workflows
- Quality issue customer impact assessment

### Terminology Standards

**Standardized Terms:**
- **Customer-First Hierarchy**: Customer → Customer Order → Individual Samples
- **ES Due**: Early Start Due (DPM microbial decision expected date)
- **Reporting Due**: External customer deadline (highest priority)
- **Multi-Order Customer**: Customer with multiple concurrent orders

---

**Remember**: Good documentation is a living resource that evolves with the project. Regular maintenance ensures it remains valuable for all stakeholders throughout the development lifecycle. The customer-first organizational hierarchy is fundamental to LIMS6000 and must be consistently maintained across all documentation.