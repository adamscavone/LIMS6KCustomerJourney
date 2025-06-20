# Michigan-Specific Features in LIMS6000

## Overview
This document details the Michigan-specific features implemented in LIMS6000, with particular focus on the whitelisting capability for single-analyte retests - a critical cost-saving feature for cannabis testing laboratories operating in Michigan.

## Single-Analyte Retest Whitelisting

### Background
Traditional cannabis testing requires that when any analyte in an assay panel fails, the entire panel must be retested. For example, if one pesticide out of 60+ fails, all pesticides must be retested. This creates significant cost and time burdens for customers.

### Michigan's Progressive Approach
The Michigan Cannabis Regulatory Agency (CRA) has approved a whitelisting system that allows laboratories to retest only specific failed analytes, provided they meet certain criteria and maintain proper quality controls.

### Business Value

#### Cost Savings
- **Traditional Full Panel Retest**: $300-500 per assay
- **Single-Analyte Retest**: $50-100 per analyte
- **Savings**: Up to 90% reduction in retest costs

#### Time Savings
- **Full Panel**: 3-5 business days
- **Single-Analyte**: 1-2 business days
- **Customer Impact**: Faster product release to market

#### Resource Efficiency
- **Instrument Time**: 10-20 minutes vs 2-4 hours
- **Reagent Usage**: Minimal vs full panel consumption
- **Sample Amount**: Preserves limited customer material

### Implementation in LIMS6000

#### Whitelist Management
```javascript
// Example whitelist configuration
const michiganWhitelist = {
  pesticides: [
    { analyte: "Abamectin", cas: "71751-41-2", method: "LCMS" },
    { analyte: "Acephate", cas: "30560-19-1", method: "LCMS" },
    { analyte: "Aldicarb", cas: "116-06-3", method: "LCMS" },
    // ... additional approved analytes
  ],
  heavyMetals: [
    { analyte: "Arsenic", cas: "7440-38-2", method: "ICPMS" },
    { analyte: "Cadmium", cas: "7440-43-9", method: "ICPMS" },
    { analyte: "Lead", cas: "7439-92-1", method: "ICPMS" },
    { analyte: "Mercury", cas: "7439-97-6", method: "ICPMS" }
  ],
  mycotoxins: [
    { analyte: "Aflatoxin B1", cas: "1162-65-8", method: "LCMS" },
    { analyte: "Aflatoxin B2", cas: "7220-81-7", method: "LCMS" },
    { analyte: "Ochratoxin A", cas: "303-47-9", method: "LCMS" }
  ]
};
```

#### Workflow Design

##### 1. Initial Test Failure
- System identifies failed analyte(s)
- Checks whitelist eligibility
- Presents retest options to analyst

##### 2. Retest Selection Interface
```
Failed Analytes Requiring Retest:
┌─────────────────────────────────────────────────────┐
│ ☑ Abamectin (15.2 ppb) - Exceeds limit of 10 ppb   │
│ ☐ Full Pesticides Panel Retest ($450)              │
│ ☑ Single-Analyte Retest - Abamectin Only ($75)     │
└─────────────────────────────────────────────────────┘
```

##### 3. Sample Creation
- Creates new sample with suffix (e.g., "SAM-12345-R1")
- Links to original sample for traceability
- Inherits customer and order information
- Sets special sample type: "Single-Analyte Retest"

##### 4. Quality Control Requirements
- Requires full QC suite for single-analyte run:
  - Opening CCV (Calibration Verification)
  - Method Blank
  - LCS (Laboratory Control Sample) with target analyte
  - Sample
  - Closing CCV
- Maintains same acceptance criteria as full panel

##### 5. Reporting
- Certificate of Analysis shows:
  - Original test results (all analytes)
  - Retest results (specific analyte only)
  - Clear indication of single-analyte retest
  - Maintains regulatory compliance

### Technical Implementation Details

#### Database Schema
```sql
-- Whitelist configuration table
CREATE TABLE michigan_whitelist (
    id INT PRIMARY KEY,
    assay_type VARCHAR(50),
    analyte_name VARCHAR(100),
    cas_number VARCHAR(20),
    method VARCHAR(20),
    active BOOLEAN,
    effective_date DATE,
    notes TEXT
);

-- Retest tracking
CREATE TABLE retest_samples (
    id INT PRIMARY KEY,
    original_sample_id INT,
    retest_type VARCHAR(50), -- 'single_analyte' or 'full_panel'
    analyte_list TEXT, -- JSON array of analytes being retested
    created_date DATETIME,
    created_by VARCHAR(50)
);
```

#### API Endpoints
```javascript
// Check whitelist eligibility
GET /api/michigan/whitelist/:assayType/:analyteName

// Create single-analyte retest
POST /api/samples/retest/single-analyte
{
  "originalSampleId": 12345,
  "analytes": ["Abamectin"],
  "reason": "Initial fail - exceeds limit"
}

// Get retest options for failed sample
GET /api/samples/:id/retest-options
```

#### User Interface Components

##### Retest Decision Modal
- Shows failed analytes with values and limits
- Calculates cost comparison (full vs single)
- Estimates turnaround time for each option
- Provides recommendation based on whitelist

##### Bench Sheet Modifications
- Special handling for single-analyte samples
- Reduced extraction volume requirements
- Clear labeling to prevent confusion

##### Review Queue Enhancements
- Links original and retest results
- Side-by-side comparison view
- Automated pass/fail for retested analyte

### Quality Assurance Considerations

#### Method Validation
- Single-analyte methods validated separately
- Demonstrates equivalence to full panel results
- LOQ/LOD verification for isolated analytes
- Recovery studies at multiple concentration levels

#### Audit Trail Requirements
- Complete traceability from original to retest
- Justification for single-analyte selection
- QC acceptance documentation
- Reviewer approval tracking

#### Regulatory Reporting
- Metrc API modifications for retest samples
- Special item category for single-analyte retests
- Maintains chain of custody documentation

### Standard Operating Procedures

#### SOP-165: Michigan Single-Analyte Retesting
1. **Eligibility Determination**
   - Verify analyte is on approved whitelist
   - Confirm customer approval for single-analyte retest
   - Document decision in LIMS

2. **Sample Preparation**
   - Use minimum sample amount (preserve customer material)
   - Follow validated single-analyte extraction procedure
   - Maintain same sample prep analyst for consistency

3. **Analytical Requirements**
   - Full calibration curve not required (single-point acceptable)
   - Bracketing CCVs mandatory
   - LCS must contain target analyte at relevant concentration

4. **Data Review**
   - Primary review focuses on failed analyte only
   - Secondary review verifies linkage to original sample
   - QA approval required before result release

5. **Reporting**
   - Update original CoA with retest results
   - Clear notation of single-analyte retest
   - Both results shown with test dates

### Customer Communication

#### Benefits Messaging
- "Save up to 90% on retest costs with Michigan's single-analyte retest program"
- "Get your products to market 3 days faster with targeted retesting"
- "Preserve your valuable sample material with minimal retest requirements"

#### Transparency Requirements
- Explain whitelist limitations upfront
- Provide cost comparison before proceeding
- Show estimated turnaround times
- Maintain original fail results on reports

### Future Enhancements

#### Planned Features
1. **Automated Whitelist Updates**
   - API integration with Michigan CRA
   - Real-time eligibility checking
   - Regulatory change notifications

2. **Predictive Analytics**
   - Historical fail rate analysis by analyte
   - Cost savings reports for customers
   - Trend identification for process improvement

3. **Mobile App Integration**
   - Push notifications for retest decisions
   - Mobile approval workflow
   - Real-time status updates

4. **Customer Portal**
   - Self-service retest selection
   - Cost calculator tool
   - Historical savings dashboard

### Compliance and Validation

#### ISO 17025 Requirements
- Method validation files maintained in LIMS
- Measurement uncertainty calculated for single-analyte
- Proficiency testing participation documented
- Internal QC trending for single-analyte methods

#### Michigan CRA Compliance
- Whitelist updates tracked with effective dates
- Regulatory correspondence archived
- Audit-ready documentation package
- Annual method review process

### Training Requirements

#### Analyst Training
- Single-analyte method validation understanding
- Proper QC implementation
- Customer communication skills
- Regulatory requirement awareness

#### Customer Service Training
- Cost savings calculation
- Benefit explanation scripts
- Limitation communication
- Order entry procedures

### Success Metrics

#### Key Performance Indicators
- **Adoption Rate**: % of eligible retests using single-analyte
- **Cost Savings**: Total customer savings per month
- **Turnaround Time**: Average days saved vs full panel
- **Quality Metrics**: Pass rate for single-analyte retests
- **Customer Satisfaction**: NPS scores for retest process

#### Monthly Reporting
- Number of single-analyte retests performed
- Breakdown by assay type and analyte
- Customer savings summary
- QC pass rates
- Regulatory compliance status

## Conclusion

The Michigan whitelisting feature for single-analyte retests represents a significant competitive advantage for laboratories operating in Michigan. By implementing this feature comprehensively in LIMS6000, we provide:

1. **Substantial cost savings** for customers
2. **Faster turnaround times** for failed samples
3. **Resource optimization** for the laboratory
4. **Full regulatory compliance** with Michigan CRA requirements
5. **Complete traceability** and quality assurance

This feature alone can justify the investment in LIMS6000 for Michigan-based cannabis testing laboratories, providing immediate ROI through increased customer satisfaction and operational efficiency.