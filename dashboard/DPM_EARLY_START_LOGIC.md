# DPM Early Start Business Logic

## Overview
DPM Early Start is a workflow optimization for Dispensary Plant Material (DPM) samples that allows chemistry testing to begin while microbial testing is still in progress.

## Purpose
- Metrc does not provide native indicators to differentiate between regular DPM samples and "Early Start" DPM samples
- This flag compensates for the lack of systematic handling in Metrc's API
- Enables more efficient lab throughput by parallelizing testing workflows

## Business Rules

### 1. Sample Visibility
- When a sample has the DPM Early Start flag:
  - The sample ID/LabSampleNr is ONLY shown in "Not Batched" workflows for non-microbial assays
  - The sample remains hidden from microbial batching workflows until microbial testing is complete

### 2. Workflow Restrictions
- Early Start samples can proceed with:
  - Cannabinoids testing
  - Pesticides testing
  - Mycotoxins testing
  - Heavy metals testing
  - Any other chemistry-based assays
  
- Early Start samples CANNOT proceed with final reporting until:
  - ALL microbial assays have data/reportable values
  - Microbial assays have been "set to complete"
  - Both Primary Review and Secondary Review are completed for microbial results

### 3. Implementation in Receiving Workflow
- The bulk action is now labeled: "Apply Early Start to All Dispensary Plant Material Samples"
- This clearly indicates:
  - The action only applies to samples with Test Category = "Dispensary Plant Material"
  - It's a pre-population/pre-check of the Early Start flag
  - Users understand this enables chemistry testing while micro is pending

### 4. Visual Indicators
- Samples with Early Start enabled show "EARLY" badge in purple
- This helps lab staff quickly identify which samples have parallel workflows enabled

## Rationale
This approach balances efficiency with compliance:
- Chemistry testing can begin immediately (faster turnaround)
- Microbial testing proceeds normally (no shortcuts on safety)
- Final reporting is blocked until all testing is complete (ensures compliance)
- Clear visual indicators prevent confusion about sample status