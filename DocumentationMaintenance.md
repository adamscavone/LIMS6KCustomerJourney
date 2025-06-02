# LIMS6000 Documentation Maintenance Instructions

**File Purpose**: Standardized process for maintaining project documentation as design and development evolve.

**Target Audience**: Project leads, product managers, and senior developers responsible for documentation accuracy.

**Last Updated**: June 2, 2025

## Overview

This document provides step-by-step instructions for maintaining accurate, comprehensive documentation throughout the LIMS6000 development lifecycle. As features are added, modified, or removed, all relevant documentation must be updated to reflect current system state.

## Primary Documentation Files

### Core Documents (Always Update These)

**1. CustJourneyDesignPlan.md**
- **Purpose**: Technical requirements, design decisions, business logic rules
- **Update Triggers**: New features, UI changes, workflow modifications, technical architecture changes
- **Responsibility**: Lead developer or product manager

**2. ProjectOverview.md** 
- **Purpose**: Executive summary, project status, implementation roadmap
- **Update Triggers**: Milestone completions, status changes, timeline modifications, stakeholder updates
- **Responsibility**: Project lead or product manager

### Supporting Documents (Update as Relevant)

**3. User Personas (docs/README.md)**
- **Purpose**: Detailed user profiles and workflow descriptions
- **Update Triggers**: New user research, workflow discoveries, persona refinements
- **Responsibility**: UX researcher or product manager

**4. Technical Architecture Documents**
- **Purpose**: System architecture, database schema, API specifications
- **Update Triggers**: Infrastructure changes, new integrations, performance optimizations
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

### Step 2: Determine Documentation Scope

**For Feature Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, business logic, UI specifications
2. **ProjectOverview.md**: Update feature descriptions, status, testing criteria
3. **Additional docs**: Update any specialized documents (API specs, user guides, etc.)

**For Process Changes:**
1. **ProjectOverview.md**: Update development process, deployment procedures, testing protocols
2. **CustJourneyDesignPlan.md**: Update workflow logic if process changes affect user experience

**For Technical Changes:**
1. **CustJourneyDesignPlan.md**: Update technical requirements, architecture decisions
2. **Technical Architecture docs**: Update system diagrams, API specifications, database schema

### Step 3: Content Update Guidelines

**Universal Principles for All Documentation:**

**Accuracy Requirements:**
- All information must reflect current system state
- Remove or mark deprecated information clearly
- Update version numbers and "Last Updated" dates
- Verify all technical details against actual implementation

**Clarity Standards:**
- Use present tense for current features ("The system displays..." not "The system will display...")
- Include specific examples with actual data/screenshots when possible
- Define all technical terms and acronyms
- Maintain consistent terminology throughout all documents

**Completeness Checklist:**
- Document the "why" behind design decisions, not just the "what"
- Include business justification for major features
- Specify technical requirements for developers
- Provide testing criteria for quality assurance
- Include future considerations and known limitations

### Step 4: Cross-Reference Validation

**Ensure Consistency Across Documents:**
1. **Feature descriptions** match across CustJourneyDesignPlan.md and ProjectOverview.md
2. **Technical requirements** align with actual implementation
3. **Timeline information** is synchronized across all documents
4. **Stakeholder information** is current and accurate
5. **Links and references** to external resources are functional

**Validation Checklist:**
- [ ] All feature names consistent across documents
- [ ] Technical specifications match implemented code
- [ ] User workflow descriptions align with current UI
- [ ] Timeline and milestone information synchronized
- [ ] Stakeholder contact information current
- [ ] External links functional and relevant

## Specific Update Procedures

### For New Features

**1. CustJourneyDesignPlan.md Updates:**
```markdown
## [Add to appropriate section]
### [Feature Name]
**Purpose**: [Business justification]
**Implementation**: [Technical approach]
**Business Logic**: [Rules and workflows]
**Technical Requirements**: [Developer specifications]
```

**2. ProjectOverview.md Updates:**
```markdown
## [Add to "What We Built" section]
**[Feature Name]**: [User-facing description]
- [Key capability 1]
- [Key capability 2]
- [User benefit]
```

**3. Testing Criteria:**
- Add new acceptance criteria to testing sections
- Update success metrics if applicable
- Include new user workflows in validation framework

### For Modified Features

**1. Find and Update All References:**
- Search both documents for feature name
- Update all descriptions to reflect new functionality
- Modify technical requirements as needed
- Update testing criteria

**2. Preserve Design Decision History:**
```markdown
### Decision Log: [Feature Name] Modification
**Previous Approach**: [What it was before]
**New Approach**: [What it is now]
**Rationale**: [Why the change was made]
**Impact**: [What this affects]
**Date**: [When change was implemented]
```

### For Removed Features

**1. Mark as Deprecated:**
```markdown
~~**[Feature Name]**: [Description]~~ 
*DEPRECATED: Removed in [Version/Date]. Replaced by [New Feature/Approach]*
```

**2. Update Dependencies:**
- Remove feature from testing criteria
- Update user workflows that referenced the feature
- Modify technical requirements
- Update success metrics if applicable

## Quality Assurance for Documentation

### Pre-Commit Checklist

**Before committing documentation updates:**
- [ ] "Last Updated" date changed to current date
- [ ] All new content reviewed for accuracy
- [ ] Cross-references validated
- [ ] Spelling and grammar checked
- [ ] Formatting consistent with document standards
- [ ] Links tested and functional

### Review Process

**Documentation Review Requirements:**
1. **Technical Review**: Lead developer validates technical accuracy
2. **Product Review**: Product manager validates business logic and requirements
3. **Stakeholder Review**: Key stakeholders review user-facing changes
4. **Final Check**: Project lead performs comprehensive review before merge

**Review Timeline:**
- Simple updates: 24-hour review cycle
- Major changes: 48-72 hour review cycle
- Architecture changes: 1-week review cycle with full team input

## Repository Organization

### File Naming Conventions

**Core Documentation:**
- `CustJourneyDesignPlan.md` (technical requirements and design decisions)
- `ProjectOverview.md` (executive summary and project status)
- `DocumentationMaintenance.md` (this file)

**Supporting Documentation:**
- `docs/README.md` (user personas and research)
- `docs/TechnicalArchitecture.md` (system architecture and API specs)
- `docs/UserGuides/` (end-user documentation)
- `docs/DeveloperGuides/` (technical implementation guides)

### Version Control Best Practices

**Commit Message Format:**
```
docs: [type] - [brief description]

Examples:
docs: feature - Add DPM Early Start pipeline documentation
docs: update - Modify sample checkout system requirements
docs: fix - Correct timeline information in project overview
```

**Branch Strategy:**
- Create feature branches for major documentation updates
- Use pull requests for review process
- Maintain documentation alongside code in same repositories

## Automation and Tools

### Automated Checks

**GitHub Actions (Future Implementation):**
- Spell check on all markdown files
- Link validation for external references
- Format consistency checking
- "Last Updated" date validation

**Documentation Standards:**
- Use markdown linting tools
- Maintain consistent heading hierarchy
- Follow accessibility guidelines for documentation

### Useful Tools

**Documentation Writing:**
- **VS Code**: Markdown preview and editing
- **Grammarly**: Grammar and style checking
- **Hemingway Editor**: Readability improvement
- **Draw.io**: Diagram creation for technical documentation

**Collaboration:**
- **GitHub Issues**: Track documentation tasks
- **GitHub Projects**: Organize documentation roadmap
- **Slack/Teams**: Real-time collaboration and questions

## Troubleshooting Common Issues

### Missing Information

**When information is incomplete:**
1. **Identify the gap**: What specific information is missing?
2. **Find the source**: Who has the missing information?
3. **Document placeholder**: Add "[TBD - Contact: Name]" for missing details
4. **Set follow-up**: Create issue or task to complete information
5. **Update timeline**: Include completion date for missing information

### Conflicting Information

**When documents contradict each other:**
1. **Identify the conflict**: Document specific contradictions
2. **Determine source of truth**: Which document/source is most current?
3. **Update all references**: Ensure consistency across all documents
4. **Add clarification**: Include note about previous confusion
5. **Review process**: Strengthen review procedures to prevent future conflicts

### Outdated Information

**When information becomes obsolete:**
1. **Audit entire document**: Check all sections for outdated content
2. **Mark deprecated items**: Use strikethrough and replacement information
3. **Update references**: Modify any sections that reference outdated information
4. **Validate current state**: Confirm all information reflects actual implementation

## Success Metrics

### Documentation Quality Indicators

**Quantitative Metrics:**
- Documentation updated within 48 hours of feature implementation
- Zero conflicting information across core documents
- 100% of external links functional
- "Last Updated" dates accurate within 1 week

**Qualitative Metrics:**
- New team members can understand system from documentation alone
- Stakeholders reference documentation for project status
- Developers use documentation for implementation guidance
- Documentation questions decrease over time

### Regular Maintenance Schedule

**Weekly Review:**
- Check "Last Updated" dates across all documents
- Validate external links
- Review and update project status information

**Monthly Audit:**
- Comprehensive review of all documentation
- Cross-reference validation
- Stakeholder feedback collection
- Process improvement identification

**Quarterly Assessment:**
- Documentation effectiveness evaluation
- Process refinement
- Tool evaluation and updates
- Training needs assessment

---

**Remember**: Good documentation is a living resource that evolves with the project. Regular maintenance ensures it remains valuable for all stakeholders throughout the development lifecycle.