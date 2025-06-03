# LIMS Edge Cases Documentation

## Overview

This document outlines edge cases that can occur in the LIMS workflow and how the system handles them. These scenarios represent real-world situations that deviate from the standard operating procedures.

## Preparation Batch Edge Cases

### 1. Emergency Interruption During Batch Preparation

**Scenario**: An analyst has begun preparing a batch but must leave due to an emergency.

**Example**: 
- Analyst checks out 20 samples by adding them to a new prep batch
- After preparing 10 samples, analyst receives emergency call and must leave
- 10 samples are prepared, 10 are not

**System Handling**:
1. Analyst clicks "Return Samples" button on the open batch
2. System prompts for which samples to return (checkbox list)
3. Unprepared samples are returned to "Available Samples" pool
4. Prepared samples remain in the batch
5. Batch can be marked "Ready for Analysis" with only the completed samples
6. Returned samples become available for other analysts to check out

**Audit Trail**:
- Original checkout recorded with timestamp and analyst
- Return action recorded with reason selection
- New checkout by different analyst creates separate batch

### 2. Equipment Failure During Preparation

**Scenario**: Critical equipment fails during batch preparation.

**Example**:
- Analyst preparing batch of 15 samples
- After 8 samples, analytical balance fails
- Cannot continue with current equipment

**System Handling**:
1. Two options available:
   - Option A: Return unprepared samples, mark batch ready with completed samples
   - Option B: Put batch on hold, resume when equipment fixed/replaced
2. If Option B chosen:
   - Batch remains "Open - On Hold" with reason noted
   - New equipment serial numbers added when preparation resumes
   - Extended preparation time documented

### 3. SOP Version Change Mid-Batch

**Scenario**: New SOP version released while batch is in preparation.

**Example**:
- Batch started under SOP-CANN-PREP-v3.2
- Mid-preparation, v3.3 is released as mandatory

**System Handling**:
1. System flags batch with SOP version warning
2. Options:
   - Complete current samples under old SOP (if permitted)
   - Restart preparation under new SOP
3. If mixed SOP versions used:
   - Each sample tagged with SOP version used
   - Special notation in batch record
   - QA review required

### 4. Cross-Contamination Discovery

**Scenario**: Potential contamination discovered during preparation.

**Example**:
- Analyst notices spillage that may have affected multiple samples
- Uncertainty about which samples were compromised

**System Handling**:
1. "Flag for Investigation" option on batch
2. Batch locked from further processing
3. QA notification triggered
4. Options after investigation:
   - Clear specific samples, return others
   - Discard entire batch
   - Mark samples for retest

### 5. Analyst Availability Changes

**Scenario**: Original analyst cannot complete batch, another must take over.

**Example**:
- Analyst A starts batch on Friday
- Calls in sick Monday
- Analyst B must complete preparation

**System Handling**:
1. Supervisor override to reassign batch
2. Both analysts recorded in batch record
3. Clear notation of handoff point
4. Each analyst signs off on their portion

### 6. Rush Sample Addition to Completed Batch

**Scenario**: Customer emergency requires adding sample to ready batch.

**Example**:
- Batch marked "Ready for Analysis"
- Customer calls with critical rush sample
- Same preparation method required

**System Handling**:
1. Supervisor approval required
2. Batch temporarily unlocked
3. Rush sample added with special flag
4. Notation added explaining exception
5. Re-locked after addition

### 7. Sample Integrity Concerns

**Scenario**: Sample container damaged or sample amount insufficient.

**Example**:
- During prep, discover sample container cracked
- Or insufficient sample quantity for all requested tests

**System Handling**:
1. "Sample Exception" button in batch view
2. Options:
   - Remove sample from batch
   - Proceed with limited testing
   - Request additional sample
3. Customer notification triggered if needed
4. Sample marked with exception status

### 8. Concurrent Batch Modification Attempt

**Scenario**: Two analysts try to modify same batch simultaneously.

**Example**:
- Analyst A adding samples to Batch-001
- Analyst B tries to mark same batch ready

**System Handling**:
1. Pessimistic locking - first user locks batch
2. Second user sees "Batch locked by [Analyst A]" message
3. Real-time updates when lock released
4. Override available with supervisor credentials

### 9. Batch Size Limit Exceeded

**Scenario**: Attempt to add samples exceeding SOP batch size limit.

**Example**:
- SOP specifies maximum 20 samples per batch
- Analyst attempts to add 21st sample

**System Handling**:
1. Warning at 80% capacity (16 samples)
2. Hard stop at 100% capacity
3. Override available with:
   - Supervisor approval
   - Documented reason
   - QA notification

### 10. Time-Sensitive Sample Expiration

**Scenario**: Samples approaching stability expiration during prep.

**Example**:
- Samples have 48-hour stability window
- Preparation delayed due to equipment issues

**System Handling**:
1. System tracks sample stability timers
2. Visual warnings as expiration approaches
3. Auto-flag samples exceeding stability window
4. Requires disposition decision:
   - Proceed with notation
   - Fail samples
   - Request new samples

## Best Practices for Edge Case Management

1. **Documentation**: Always document the reason for any deviation
2. **Communication**: Notify relevant parties (QA, supervisor, customer) as appropriate
3. **Traceability**: Ensure all actions are captured in audit trail
4. **Training**: Staff should be trained on edge case procedures
5. **Review**: Regular review of edge cases to identify process improvements

## System Design Principles

- **Fail-Safe**: Default to most conservative action
- **Transparency**: All exceptions clearly visible
- **Reversibility**: Most actions can be undone with proper authority
- **Compliance**: Maintain regulatory compliance even in edge cases