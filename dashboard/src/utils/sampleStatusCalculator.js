// Sample Status Calculator Utility
// Provides consistent status calculation and actionable follow-up information

// Department and location mapping for different test types
const TEST_DEPARTMENTS = {
  'Cannabinoids': {
    department: 'Chemistry Lab',
    location: 'Room 204',
    manager: 'Dr. Martinez'
  },
  'Microbial': {
    department: 'Microbiology Lab',
    location: 'Room 105',
    manager: 'Dr. Thompson'
  },
  'Pesticides': {
    department: 'Chemistry Lab',
    location: 'Room 204',
    manager: 'Dr. Martinez'
  },
  'Heavy Metals': {
    department: 'ICP-MS Lab',
    location: 'Room 301',
    manager: 'Dr. Chen'
  },
  'Residual Solvents': {
    department: 'GC Lab',
    location: 'Room 206',
    manager: 'Dr. Williams'
  },
  'Mycotoxins': {
    department: 'LC-MS Lab',
    location: 'Room 302',
    manager: 'Dr. Patel'
  },
  'Water Activity': {
    department: 'Physical Testing Lab',
    location: 'Room 108',
    manager: 'Dr. Johnson'
  },
  'Moisture': {
    department: 'Physical Testing Lab',
    location: 'Room 108',
    manager: 'Dr. Johnson'
  },
  'Foreign Matter': {
    department: 'Physical Testing Lab',
    location: 'Room 108',
    manager: 'Dr. Johnson'
  }
};

// Progress status details
const PROGRESS_STATUSES = {
  'in_prep': {
    label: 'In Prep',
    department: 'Sample Prep',
    location: 'Room 102',
    defaultAssignee: 'Prep Team'
  },
  'awaiting_analysis': {
    label: 'Awaiting Analysis',
    department: 'Queue Management',
    location: 'Lab Office',
    defaultAssignee: 'Lab Scheduler'
  },
  'on_instrument': {
    label: 'On Instrument',
    department: null, // Varies by test
    location: null,
    defaultAssignee: 'Instrument Operator'
  },
  'data_review': {
    label: 'Data Review',
    department: 'QA Department',
    location: 'Room 401',
    defaultAssignee: 'QA Team'
  }
};

/**
 * Calculate comprehensive sample status with follow-up information
 * @param {Object} sample - Sample object with tests array
 * @returns {Object} Status information with actionable follow-up details
 */
export function calculateSampleStatus(sample) {
  if (!sample || !sample.tests) {
    return {
      status: 'unknown',
      readyCount: 0,
      totalCount: 0,
      blockers: [],
      timeline: {
        dueDate: null,
        hoursRemaining: null,
        isOverdue: false,
        isAtRisk: false
      }
    };
  }

  // Count test statuses
  const testStatuses = sample.tests.reduce((acc, test) => {
    acc[test.status] = (acc[test.status] || 0) + 1;
    return acc;
  }, {});

  const totalTests = sample.tests.length;
  const completedTests = testStatuses.completed || 0;
  const inProgressTests = testStatuses.in_progress || 0;
  const pendingTests = testStatuses.pending || 0;

  // Determine overall status
  let overallStatus;
  if (pendingTests > 0 || inProgressTests > 0) {
    overallStatus = inProgressTests > 0 ? 'in_progress' : 'pending';
  } else if (completedTests === totalTests) {
    // Check if any tests failed
    const hasFailedTests = sample.tests.some(test => 
      test.status === 'completed' && test.result === 'fail'
    );
    overallStatus = hasFailedTests ? 'failed' : 'ready_to_report';
  } else {
    overallStatus = 'pending';
  }

  // Calculate timeline information
  const now = new Date();
  const dueDate = sample.dueDate ? new Date(sample.dueDate) : null;
  const hoursRemaining = dueDate ? (dueDate - now) / (1000 * 60 * 60) : null;
  const isOverdue = dueDate && now > dueDate;
  const isAtRisk = dueDate && hoursRemaining !== null && hoursRemaining < 24 && !isOverdue;

  // Build blocker information for incomplete tests
  const blockers = sample.tests
    .filter(test => test.status !== 'completed')
    .map(test => {
      const testDept = TEST_DEPARTMENTS[test.assay] || {};
      const progressDetails = sample.progressStatus || {};
      
      // Determine department and location based on test status
      let department = testDept.department;
      let location = testDept.location;
      let contactPerson = test.assignee || progressDetails.assignee || 'Unassigned';
      
      if (test.status === 'in_progress' && progressDetails.status) {
        const statusInfo = PROGRESS_STATUSES[progressDetails.status];
        if (statusInfo) {
          department = statusInfo.department || department;
          location = statusInfo.location || location;
          if (contactPerson === 'Unassigned') {
            contactPerson = statusInfo.defaultAssignee;
          }
        }
      }

      // For unassigned tests, suggest the department manager
      if (contactPerson === 'Unassigned' && testDept.manager) {
        contactPerson = `${testDept.manager} (Manager)`;
      }

      return {
        testName: test.name,
        testCode: test.code,
        assay: test.assay,
        status: test.status,
        statusLabel: progressDetails.label || test.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        assignee: contactPerson,
        department: department || 'Unknown',
        location: location || 'Check with Lab Manager',
        isUrgent: isOverdue || (isAtRisk && test.status === 'pending')
      };
    });

  // Sort blockers by urgency
  blockers.sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    if (a.status === 'in_progress' && b.status === 'pending') return -1;
    if (a.status === 'pending' && b.status === 'in_progress') return 1;
    return 0;
  });

  return {
    status: overallStatus,
    readyCount: completedTests,
    totalCount: totalTests,
    blockers,
    timeline: {
      dueDate: dueDate ? dueDate.toISOString() : null,
      hoursRemaining: hoursRemaining !== null ? Math.floor(hoursRemaining) : null,
      isOverdue,
      isAtRisk
    },
    summary: generateStatusSummary(overallStatus, completedTests, totalTests, blockers)
  };
}

/**
 * Generate a human-readable status summary
 */
function generateStatusSummary(status, readyCount, totalCount, blockers) {
  if (status === 'ready_to_report') {
    return 'All tests completed - Ready to report';
  }
  
  if (status === 'failed') {
    return 'Testing complete - Failed results require review';
  }
  
  const pendingCount = totalCount - readyCount;
  const primaryBlocker = blockers[0];
  
  if (primaryBlocker && primaryBlocker.department) {
    return `${readyCount}/${totalCount} complete - Check ${primaryBlocker.department}`;
  }
  
  return `${readyCount}/${totalCount} tests complete`;
}

/**
 * Get status color class for UI display
 */
export function getStatusColorClass(status, timeline) {
  if (timeline.isOverdue) return 'text-red-600 bg-red-50';
  if (timeline.isAtRisk) return 'text-orange-600 bg-orange-50';
  
  switch (status) {
    case 'ready_to_report':
      return 'text-green-600 bg-green-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
    case 'in_progress':
      return 'text-yellow-600 bg-yellow-50';
    case 'pending':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

/**
 * Get priority level for sorting
 */
export function getStatusPriority(statusInfo) {
  if (statusInfo.timeline.isOverdue) return 1;
  if (statusInfo.timeline.isAtRisk) return 2;
  if (statusInfo.status === 'failed') return 3;
  if (statusInfo.status === 'in_progress') return 4;
  if (statusInfo.status === 'ready_to_report') return 5;
  return 6;
}