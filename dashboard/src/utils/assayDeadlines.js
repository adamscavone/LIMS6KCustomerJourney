// Assay deadline calculation utilities

// Standard turnaround times for different assay types (in business days)
export const ASSAY_TURNAROUND_TIMES = {
  // Microbial assays - culture-based methods
  salmonella: { days: 3, hours: 23, minutes: 59, method: 'culture' },
  stec: { days: 3, hours: 23, minutes: 59, method: 'culture' },
  totalYeastMold: { days: 5, hours: 23, minutes: 59, method: 'culture' },
  aspergillus: { days: 5, hours: 23, minutes: 59, method: 'culture' },
  
  // Microbial assays - rapid methods
  totalAerobicBacteria: { days: 2, hours: 23, minutes: 59, method: 'petrifilm' },
  totalColiforms: { days: 2, hours: 23, minutes: 59, method: 'petrifilm' },
  btgn: { days: 2, hours: 23, minutes: 59, method: 'petrifilm' },
  ecoli: { days: 2, hours: 23, minutes: 59, method: 'petrifilm' },
  
  // Chemistry assays
  cannabinoids: { days: 2, hours: 17, minutes: 0, method: 'HPLC' },
  terpenes: { days: 3, hours: 17, minutes: 0, method: 'GCMS' },
  pesticides: { days: 3, hours: 17, minutes: 0, method: 'LCMS' },
  mycotoxins: { days: 3, hours: 17, minutes: 0, method: 'LCMS' },
  heavyMetals: { days: 2, hours: 17, minutes: 0, method: 'ICPMS' },
  elementalAnalysis: { days: 2, hours: 17, minutes: 0, method: 'ICPMS' },
  residualSolvents: { days: 3, hours: 17, minutes: 0, method: 'GCMS' },
  
  // Physical/Other tests
  moistureContent: { days: 1, hours: 17, minutes: 0, method: 'physical' },
  waterActivity: { days: 1, hours: 17, minutes: 0, method: 'physical' },
  foreignMatter: { days: 1, hours: 17, minutes: 0, method: 'visual' },
  
  // Plant pathogen PCR
  plantPathogens: { days: 2, hours: 17, minutes: 0, method: 'PCR' },
  plantSex: { days: 2, hours: 17, minutes: 0, method: 'PCR' }
};

// Rush turnaround adjustments (subtract days)
export const RUSH_ADJUSTMENTS = {
  culture: -1,  // Culture methods can only be rushed by 1 day
  petrifilm: -1,
  HPLC: -1,
  GCMS: -1,
  LCMS: -1,
  ICPMS: -1,
  physical: 0,  // Physical tests already at minimum
  visual: 0,
  PCR: -1
};

// Test category default assay selections
export const TEST_CATEGORY_DEFAULTS = {
  'Dispensary Plant Material': {
    // Microbial
    salmonella: true,
    stec: true,
    totalAerobicBacteria: true,
    totalColiforms: true,
    totalYeastMold: true,
    btgn: true,
    // Chemistry
    cannabinoids: true,
    pesticides: true,
    mycotoxins: true,
    heavyMetals: true,
    // Others
    moistureContent: true,
    waterActivity: true,
    foreignMatter: true
  },
  'Dispensary Plant Material - STEC/Sal': {
    salmonella: true,
    stec: true,
    cannabinoids: true
  },
  'Non-Solvent Product (Not Previously Tested)': {
    totalYeastMold: true,
    cannabinoids: true,
    pesticides: true,
    mycotoxins: true,
    heavyMetals: true
  },
  'Processed Product (Previously Tested)': {
    cannabinoids: true,
    totalYeastMold: false,
    pesticides: false
  },
  'Voluntary Testing - Terpenes (Plant Material)': {
    terpenes: true,
    cannabinoids: false
  },
  'Research/Development': {
    // All assays available but none selected by default
  }
};

// Calculate business days ahead
export function addBusinessDays(startDate, daysToAdd) {
  const date = new Date(startDate);
  let daysAdded = 0;
  
  while (daysAdded < daysToAdd) {
    date.setDate(date.getDate() + 1);
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      daysAdded++;
    }
  }
  
  return date;
}

// Calculate deadline for a specific assay
export function calculateAssayDeadline(receivedDate, assayKey, isRush = false) {
  const turnaround = ASSAY_TURNAROUND_TIMES[assayKey];
  if (!turnaround) return null;
  
  let days = turnaround.days;
  
  // Apply rush adjustment if applicable
  if (isRush && RUSH_ADJUSTMENTS[turnaround.method] < 0) {
    days = Math.max(1, days + RUSH_ADJUSTMENTS[turnaround.method]);
  }
  
  const deadline = addBusinessDays(receivedDate, days);
  deadline.setHours(turnaround.hours, turnaround.minutes, 0, 0);
  
  return deadline.toISOString();
}

// Get all deadlines for selected assays
export function getAllAssayDeadlines(receivedDate, selectedAssays, isRush = false) {
  const deadlines = {};
  let earliestDeadline = null;
  let latestDeadline = null;
  
  Object.entries(selectedAssays).forEach(([assayKey, isSelected]) => {
    if (isSelected) {
      const deadline = calculateAssayDeadline(receivedDate, assayKey, isRush);
      if (deadline) {
        deadlines[assayKey] = deadline;
        
        if (!earliestDeadline || deadline < earliestDeadline) {
          earliestDeadline = deadline;
        }
        if (!latestDeadline || deadline > latestDeadline) {
          latestDeadline = deadline;
        }
      }
    }
  });
  
  return {
    deadlines,
    earliestDeadline,
    latestDeadline,
    hasVariability: Object.keys(deadlines).length > 1 && earliestDeadline !== latestDeadline
  };
}

// Get grouped deadlines for display
export function getGroupedDeadlines(receivedDate, selectedAssays, isRush = false) {
  const result = getAllAssayDeadlines(receivedDate, selectedAssays, isRush);
  const grouped = {};
  
  // Group assays by their deadline
  Object.entries(result.deadlines).forEach(([assayKey, deadline]) => {
    if (!grouped[deadline]) {
      grouped[deadline] = [];
    }
    grouped[deadline].push({
      key: assayKey,
      name: getAssayDisplayName(assayKey),
      method: ASSAY_TURNAROUND_TIMES[assayKey].method
    });
  });
  
  // Sort by deadline
  const sortedGroups = Object.entries(grouped)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([deadline, assays]) => ({
      deadline,
      assays,
      isMicrobial: assays.some(a => ['culture', 'petrifilm'].includes(a.method)),
      isChemistry: assays.some(a => ['HPLC', 'GCMS', 'LCMS', 'ICPMS'].includes(a.method))
    }));
  
  return {
    groups: sortedGroups,
    earliestDeadline: result.earliestDeadline,
    latestDeadline: result.latestDeadline,
    hasVariability: result.hasVariability
  };
}

// Display names for assays
export function getAssayDisplayName(assayKey) {
  const names = {
    salmonella: 'Salmonella',
    stec: 'STEC',
    totalYeastMold: 'Total Yeast & Mold',
    aspergillus: 'Aspergillus',
    totalAerobicBacteria: 'Total Aerobic',
    totalColiforms: 'Total Coliforms',
    btgn: 'BTGN',
    ecoli: 'E. coli',
    cannabinoids: 'Cannabinoids',
    terpenes: 'Terpenes',
    pesticides: 'Pesticides',
    mycotoxins: 'Mycotoxins',
    heavyMetals: 'Heavy Metals',
    elementalAnalysis: 'Elemental Analysis',
    residualSolvents: 'Residual Solvents',
    moistureContent: 'Moisture Content',
    waterActivity: 'Water Activity',
    foreignMatter: 'Foreign Matter',
    plantPathogens: 'Plant Pathogens',
    plantSex: 'Plant Sex'
  };
  return names[assayKey] || assayKey;
}

// Get suggested micro deadline (latest of all selected micro assays)
export function getSuggestedMicroDeadline(receivedDate, selectedAssays, isRush = false) {
  const microAssays = ['salmonella', 'stec', 'totalYeastMold', 'aspergillus', 
                       'totalAerobicBacteria', 'totalColiforms', 'btgn', 'ecoli'];
  
  const microSelection = {};
  microAssays.forEach(key => {
    if (selectedAssays[key]) {
      microSelection[key] = true;
    }
  });
  
  const result = getAllAssayDeadlines(receivedDate, microSelection, isRush);
  return result.latestDeadline;
}

// Get suggested chemistry deadline (latest of all selected chemistry assays)
export function getSuggestedChemistryDeadline(receivedDate, selectedAssays, isRush = false) {
  const chemAssays = ['cannabinoids', 'terpenes', 'pesticides', 'mycotoxins', 
                      'heavyMetals', 'elementalAnalysis', 'residualSolvents'];
  
  const chemSelection = {};
  chemAssays.forEach(key => {
    if (selectedAssays[key]) {
      chemSelection[key] = true;
    }
  });
  
  const result = getAllAssayDeadlines(receivedDate, chemSelection, isRush);
  return result.latestDeadline;
}

// Initialize default assays based on test category
export function getDefaultAssays(testCategory) {
  return TEST_CATEGORY_DEFAULTS[testCategory] || {};
}