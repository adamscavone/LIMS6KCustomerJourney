# Loose Notes

This file contains random thoughts and ideas that need to be addressed in the future but are not of immediate concern.

## Plant Pathogen Testing Analytes

**Note**: "Russet Mites" and "Powdery Mildew" are both analytes offered under Plant Pathogen Testing. They do not receive their own higher-level labels, but rather are subsumed under Plant Pathogen Testing and listed as single analytes.

## Outsourced Assays

**Issue**: Some assays like "Microbial - Sequencing" cannot be performed in-house due to lack of capacity or skill. For any test, we can almost always outsource the test to another licensed testing laboratory.

**Requirements for Outsourced Assays**:
1. Need to track turnaround times and NeededBy dates for outsourced tests
2. Must be able to enter results for these samples when received from external lab
3. Need to disclose the identity of the lab that actually performed the testing
4. Should create supporting tables, logic/methods/services under the rubric of "Outsourced Assays"

**Affected Assays**:
- Microbial - Sequencing (currently removed from UI but will need to be re-added as an outsourceable option)
- Genetic Sequencing (currently in "Other" column)
- Any specialized tests beyond current in-house capabilities

**Development Tasks**:
- Create database table for tracking outsourced tests
- Add fields for external lab information
- Implement workflow for marking tests as outsourced
- Add UI elements to indicate outsourced status
- Create reporting mechanisms to show external lab attribution