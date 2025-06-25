# Non-Metrc Samples Guide

## Overview
The Non-Metrc Samples system handles laboratory orders for samples that don't come through the state's Metrc cannabis tracking system. This includes environmental testing, R&D samples, and various non-cannabis materials that require laboratory analysis.

## Key Concepts

### Customer-Selected vs. North Coast Collected
A fundamental distinction in our sampling process:

- **North Coast Collected**: Samples collected by our trained, certified sampling technicians following strict SOPs for representative sampling
- **Customer-Selected/Submitted**: Samples selected and submitted by the customer themselves

This distinction is critical because:
1. Compliance sampling (for state requirements) MUST be collected by trained technicians
2. Customer-selected samples may not be representative of the parent batch
3. Different chain of custody requirements apply

### Non-Metrc Orders vs. Chain of Custody
While the system maintains chain of custody documentation, we refer to these as "Non-Metrc Orders" to distinguish them from Metrc-tracked cannabis samples.

## User Guide

### Creating a New Non-Metrc Order

#### Step 1: Client Information
1. Start typing the client name to search existing clients
2. Select from dropdown or enter new client information
3. New clients can be saved for future use

Available test clients:
- Environmental Solutions Inc. (Columbus, OH)
- Green Valley Cultivators (Cleveland, OH)
- Buckeye Botanicals (Cincinnati, OH)
- Ohio Organic Farms (Dayton, OH)
- Environmental Testing Labs (Toledo, OH)

#### Step 2: Sample Collection
1. **Customer-Selected Checkbox**: Check this if samples were NOT collected by North Coast
   - When checked, Sampler fields auto-fill with "N/A"
   - Relinquishment signature becomes the primary signature
2. **Collection Date**: When samples were collected
3. **Collection Start Time**: Time collection began
4. **Sampler Name**: Search for certified technicians (if North Coast collected)
   - Cannot add new samplers from this screen
   - Shows certification level

Available test samplers:
- Michael Chen (Senior Technician)
- Sarah Johnson (Lead Sampler)
- David Martinez (Sampling Technician)
- Emily Williams (Senior Technician)
- James Thompson (Sampling Technician)
- Maria Rodriguez (Lead Sampler)

#### Step 3: Sample Details
For each sample, specify:

1. **Sample ID**: Unique identifier (e.g., "ENV-001", "WATER-2025-001")
2. **Sample Type**: Organized with Environmental samples first:
   - Environmental: Water, Soil, Plant Tissue, Environmental Swab
   - Cannabis: Flower, Concentrates, etc.
   - Edibles: Gummies, Chocolates, etc.
   - Topicals: Lotions, Balms, etc.
   - Other: Raw materials, finished products
3. **Description**: What the sample is and where it came from
4. **Collection Location**: Specific location details
5. **Container Type**: How the sample is packaged
6. **Preservation Method**: Temperature requirements, etc.

#### Step 4: Testing Requirements
Select required tests organized by category:

**Microbial Testing**
- Standard microbial panel
- Microbial to sequencing
- Environmental source tracking
- Settle plates
- Water counts

**Chemistry Testing**
- Heavy metals
- Minerals (soil/water)
- Residual solvents
- Pesticides
- Mycotoxins
- Terpenes
- Potency

**Other Testing**
- Plant tissue panels
- Early detection (powdery mildew, russet mites)
- Plant virus testing (12 pathogens)
- Stability testing
- Physical tests (moisture, density, foreign matter)

#### Step 5: Individual Analyte Selection
When testing assays with multiple analytes:
1. The "Select Individual Analytes" checkbox appears
2. Check to enable selection of specific analytes
3. Yellow boxes appear under relevant assays
4. Select only the analytes needed

This is particularly useful for:
- Retesting specific failed analytes
- Targeted environmental monitoring
- Research projects requiring specific analytes

#### Step 6: Chain of Custody Transfer
Document the sample handoff:
- **Relinquished By**: Person releasing samples
- **Received By**: Laboratory personnel receiving samples
- Include dates and times for both

### Common Workflows

#### Environmental Water Testing
1. Client: Environmental Testing Labs
2. Customer-selected: Yes (client collected their own samples)
3. Sample Type: Water
4. Tests: Heavy metals, microbial water counts
5. Individual analytes: Select specific metals of concern

#### Plant Pathogen Screening
1. Client: Green Valley Cultivators
2. Customer-selected: No (North Coast technician collected)
3. Sample Type: Plant Tissue
4. Tests: Plant virus testing
5. Individual analytes: Select specific pathogens (e.g., Hop Latent Viroid only)

#### Soil Nutrient Analysis
1. Client: Ohio Organic Farms
2. Customer-selected: Yes
3. Sample Type: Soil
4. Tests: Minerals testing (soil/water)
5. Description: Include depth and location details

## Technical Notes

### Turnaround Times
Each assay has predefined turnaround times:
- Microbial: 3-7 business days (culture vs. PCR methods)
- Chemistry: 2-3 business days
- Plant pathogens: 5 business days
- Stability testing: 30 business days

### Data Validation
- Required fields marked with red asterisk
- Email validation on client email field
- Numeric validation on container counts
- At least one test must be selected per sample

### Integration Points
- No direct Metrc integration (by design)
- Future: Integration with client portal
- Future: Barcode generation for sample tracking
- Future: Direct upload to LIMS database

## Best Practices

1. **Sample IDs**: Use consistent naming conventions
   - ENV-YYYY-### for environmental
   - WATER-YYYY-### for water samples
   - RD-YYYY-### for R&D samples

2. **Descriptions**: Be specific about:
   - Exact collection location
   - Time of day (if relevant)
   - Environmental conditions
   - Any unusual circumstances

3. **Customer-Selected Samples**: Always document:
   - Who selected the samples
   - Selection methodology (if known)
   - Any potential bias in selection

4. **Chain of Custody**: Complete all fields even if not required
   - Maintains legal defensibility
   - Supports quality system requirements
   - Critical for any regulatory testing

## Troubleshooting

**Client not appearing in search?**
- Type at least 2 characters
- Check spelling
- Use "Save as new client" if needed

**Sampler not appearing?**
- Only trained technicians appear
- Contact lab management to add new samplers
- Use customer-selected if applicable

**Can't select individual analytes?**
- Only appears for assays with multiple analytes
- Must select the assay first
- Look for "Select Individual Analytes" checkbox

**Form won't submit?**
- Check all required fields (red asterisks)
- Ensure at least one test is selected
- Verify email format if provided