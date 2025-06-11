import React, { useState, useEffect, Fragment } from 'react';
import { 
  Truck, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ChevronDown, 
  ChevronRight,
  MapPin,
  Calendar,
  Search,
  Filter,
  RefreshCw,
  Building2,
  Hash,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Zap,
  X,
  Info
} from 'lucide-react';

const ReceivingDashboard = () => {
  const [selectedState, setSelectedState] = useState('ohio');
  const [manifests, setManifests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedManifest, setSelectedManifest] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedReceiving, setExpandedReceiving] = useState({});
  const [manifestData, setManifestData] = useState({});
  const [expandedSamples, setExpandedSamples] = useState({});
  
  // Format date to MM/DD/YY HH:MM a.m./p.m.
  const formatDueDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12 || 12;
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  };

  // Convert date to datetime-local format (YYYY-MM-DDTHH:MM)
  const toDateTimeLocal = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Convert datetime-local to ISO string
  const fromDateTimeLocal = (dateTimeLocalStr) => {
    if (!dateTimeLocalStr) return '';
    return new Date(dateTimeLocalStr).toISOString();
  };

  // Calculate due date based on received date and target day/time
  const calculateDueDate = (receivedDate, targetDay, time) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = receivedDate.getDay();
    const targetDayIndex = days.indexOf(targetDay);
    let daysToAdd = targetDayIndex - currentDay;
    
    if (daysToAdd <= 0) {
      daysToAdd += 7; // Move to next week
    }
    
    const targetDate = new Date(receivedDate);
    targetDate.setDate(targetDate.getDate() + daysToAdd);
    
    // Set the time
    const [hour, minute] = time.split(':');
    targetDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
    
    return targetDate.toISOString();
  };

  // Get chemistry due date (assuming same as micro for most test categories)
  const getChemistryDue = (testCategory, receivedDate) => {
    // For now, using same logic as micro - you can customize this based on specific requirements
    const microData = getMicroDueData(testCategory, receivedDate);
    if (!microData) return null;
    return calculateDueDate(receivedDate, microData.day, microData.time);
  };

  // Get all micro due dates for different assay types
  const getMicroDueDates = (testCategory, receivedDate, selectedAssays = {}) => {
    // Expanded data structure with individual assay timelines
    const microAssayMap = {
      'Ohio': {
        'Research/Development': {
          'Friday': {
            'btgn': { day: 'Saturday', time: '23:59' },
            'ecoli': { day: 'Saturday', time: '23:59' },
            'salmonella': { day: 'Monday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Saturday', time: '23:59' },
            'totalColiforms': { day: 'Saturday', time: '23:59' },
            'totalYeastMold': { day: 'Tuesday', time: '23:59' }
          },
          'Monday': {
            'btgn': { day: 'Tuesday', time: '23:59' },
            'ecoli': { day: 'Tuesday', time: '23:59' },
            'salmonella': { day: 'Wednesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Tuesday', time: '23:59' },
            'totalColiforms': { day: 'Tuesday', time: '23:59' },
            'totalYeastMold': { day: 'Thursday', time: '23:59' }
          },
          'Tuesday': {
            'btgn': { day: 'Wednesday', time: '23:59' },
            'ecoli': { day: 'Wednesday', time: '23:59' },
            'salmonella': { day: 'Thursday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Wednesday', time: '23:59' },
            'totalColiforms': { day: 'Wednesday', time: '23:59' },
            'totalYeastMold': { day: 'Friday', time: '23:59' }
          },
          'Wednesday': {
            'btgn': { day: 'Thursday', time: '23:59' },
            'ecoli': { day: 'Thursday', time: '23:59' },
            'salmonella': { day: 'Friday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Thursday', time: '23:59' },
            'totalColiforms': { day: 'Thursday', time: '23:59' },
            'totalYeastMold': { day: 'Saturday', time: '23:59' }
          },
          'Thursday': {
            'btgn': { day: 'Friday', time: '23:59' },
            'ecoli': { day: 'Friday', time: '23:59' },
            'salmonella': { day: 'Saturday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Friday', time: '23:59' },
            'totalColiforms': { day: 'Friday', time: '23:59' },
            'totalYeastMold': { day: 'Monday', time: '23:59' }
          },
          'Saturday': {
            'btgn': { day: 'Monday', time: '23:59' },
            'ecoli': { day: 'Monday', time: '23:59' },
            'salmonella': { day: 'Tuesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Monday', time: '23:59' },
            'totalColiforms': { day: 'Monday', time: '23:59' },
            'totalYeastMold': { day: 'Wednesday', time: '23:59' }
          },
          'Sunday': {
            'btgn': { day: 'Monday', time: '23:59' },
            'ecoli': { day: 'Monday', time: '23:59' },
            'salmonella': { day: 'Tuesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Monday', time: '23:59' },
            'totalColiforms': { day: 'Monday', time: '23:59' },
            'totalYeastMold': { day: 'Wednesday', time: '23:59' }
          }
        },
        // Add other test categories as needed
        'Dispensary Plant Material': {
          'Friday': {
            'btgn': { day: 'Saturday', time: '23:59' },
            'ecoli': { day: 'Saturday', time: '23:59' },
            'salmonella': { day: 'Monday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Saturday', time: '23:59' },
            'totalColiforms': { day: 'Saturday', time: '23:59' },
            'totalYeastMold': { day: 'Tuesday', time: '23:59' }
          },
          'Monday': {
            'btgn': { day: 'Tuesday', time: '23:59' },
            'ecoli': { day: 'Tuesday', time: '23:59' },
            'salmonella': { day: 'Wednesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Tuesday', time: '23:59' },
            'totalColiforms': { day: 'Tuesday', time: '23:59' },
            'totalYeastMold': { day: 'Thursday', time: '23:59' }
          },
          'Tuesday': {
            'btgn': { day: 'Wednesday', time: '23:59' },
            'ecoli': { day: 'Wednesday', time: '23:59' },
            'salmonella': { day: 'Thursday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Wednesday', time: '23:59' },
            'totalColiforms': { day: 'Wednesday', time: '23:59' },
            'totalYeastMold': { day: 'Friday', time: '23:59' }
          },
          'Wednesday': {
            'btgn': { day: 'Thursday', time: '23:59' },
            'ecoli': { day: 'Thursday', time: '23:59' },
            'salmonella': { day: 'Friday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Thursday', time: '23:59' },
            'totalColiforms': { day: 'Thursday', time: '23:59' },
            'totalYeastMold': { day: 'Saturday', time: '23:59' }
          },
          'Thursday': {
            'btgn': { day: 'Friday', time: '23:59' },
            'ecoli': { day: 'Friday', time: '23:59' },
            'salmonella': { day: 'Saturday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Friday', time: '23:59' },
            'totalColiforms': { day: 'Friday', time: '23:59' },
            'totalYeastMold': { day: 'Monday', time: '23:59' }
          },
          'Saturday': {
            'btgn': { day: 'Monday', time: '23:59' },
            'ecoli': { day: 'Monday', time: '23:59' },
            'salmonella': { day: 'Tuesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Monday', time: '23:59' },
            'totalColiforms': { day: 'Monday', time: '23:59' },
            'totalYeastMold': { day: 'Wednesday', time: '23:59' }
          },
          'Sunday': {
            'btgn': { day: 'Monday', time: '23:59' },
            'ecoli': { day: 'Monday', time: '23:59' },
            'salmonella': { day: 'Tuesday', time: '23:59' },
            'totalAerobicBacteria': { day: 'Monday', time: '23:59' },
            'totalColiforms': { day: 'Monday', time: '23:59' },
            'totalYeastMold': { day: 'Wednesday', time: '23:59' }
          }
        }
      },
      'Michigan': {
        // Similar structure for Michigan
        'Raw Plant Material': {
          'Friday': {
            'totalYeastMold': { day: 'Tuesday', time: '8:00' },
            'aspergillus': { day: 'Monday', time: '8:00' },
            'ecoli': { day: 'Monday', time: '8:00' },
            'salmonella': { day: 'Monday', time: '8:00' },
            'totalColiforms': { day: 'Monday', time: '8:00' }
          }
          // Add other days as needed
        }
      }
    };
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const receivedDayName = days[receivedDate.getDay()];
    const stateKey = selectedState === 'ohio' ? 'Ohio' : 'Michigan';
    
    const categoryMap = microAssayMap[stateKey]?.[testCategory]?.[receivedDayName];
    if (!categoryMap) return null;
    
    // Get all relevant assays that are selected
    const relevantAssays = {
      'btgn': selectedAssays.btgn,
      'ecoli': selectedAssays.stec, // Note: mapping STEC checkbox to ecoli
      'salmonella': selectedAssays.salmonella,
      'totalAerobicBacteria': selectedAssays.totalAerobicBacteria,
      'totalColiforms': selectedAssays.totalColiforms,
      'totalYeastMold': selectedAssays.totalYeastMold,
      'aspergillus': selectedAssays.aspergillus // Michigan only
    };
    
    // Calculate due dates for all selected assays
    const dueDates = {};
    let latestDate = null;
    let hasMultipleTimelines = false;
    const uniqueDates = new Set();
    
    Object.entries(relevantAssays).forEach(([assay, isSelected]) => {
      if (isSelected && categoryMap[assay]) {
        const dueDate = calculateDueDate(receivedDate, categoryMap[assay].day, categoryMap[assay].time);
        dueDates[assay] = dueDate;
        uniqueDates.add(dueDate);
        
        if (!latestDate || new Date(dueDate) > new Date(latestDate)) {
          latestDate = dueDate;
        }
      }
    });
    
    hasMultipleTimelines = uniqueDates.size > 1;
    
    return {
      latestDate,
      dueDates,
      hasMultipleTimelines
    };
  };
  
  // Simplified function to get the micro due date (returns latest date)
  const getMicroDue = (testCategory, receivedDate, selectedAssays = {}) => {
    const result = getMicroDueDates(testCategory, receivedDate, selectedAssays);
    return result?.latestDate || null;
  };
  
  // Keep the old structure for backwards compatibility
  const getMicroDueData = (testCategory, receivedDate) => {
    const microNeededByMap = {
      'Ohio': {
        'Research/Development': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Thursday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Friday', time: '23:59' },
          'Wednesday': { day: 'Saturday', time: '23:59' },
          'Saturday': { day: 'Wednesday', time: '23:59' },
          'Sunday': { day: 'Wednesday', time: '23:59' }
        },
        'Dispensary Plant Material': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' },
          'Saturday': { day: 'Wednesday', time: '23:59' },
          'Sunday': { day: 'Wednesday', time: '23:59' }
        },
        'Non-Solvent Product (Not Previously Tested)': {
          'Friday': { day: 'Wednesday', time: '23:59' },
          'Monday': { day: 'Thursday', time: '23:59' },
          'Thursday': { day: 'Tuesday', time: '23:59' },
          'Tuesday': { day: 'Friday', time: '23:59' },
          'Wednesday': { day: 'Monday', time: '23:59' }
        },
        'Processed Product (Previously Tested)': {
          'Friday': { day: 'Wednesday', time: '23:59' },
          'Monday': { day: 'Thursday', time: '23:59' },
          'Thursday': { day: 'Tuesday', time: '23:59' },
          'Tuesday': { day: 'Friday', time: '23:59' },
          'Wednesday': { day: 'Monday', time: '23:59' }
        },
        'Processor Plant Material': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' }
        },
        'Solvent Based Marijuana Ingredient': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' }
        },
        'Solvent Based Product (Not Previously Tested)': {
          'Friday': { day: 'Wednesday', time: '23:59' },
          'Monday': { day: 'Thursday', time: '23:59' },
          'Thursday': { day: 'Tuesday', time: '23:59' },
          'Tuesday': { day: 'Friday', time: '23:59' },
          'Wednesday': { day: 'Monday', time: '23:59' }
        },
        'Voluntary Testing - Terpenes (Plant Material)': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' }
        },
        'Voluntary Testing - Terpenes (Processed Products)': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' }
        },
        'Dispensary Plant Material - STEC/Sal': {
          'Friday': { day: 'Tuesday', time: '23:59' },
          'Monday': { day: 'Wednesday', time: '23:59' },
          'Thursday': { day: 'Monday', time: '23:59' },
          'Tuesday': { day: 'Thursday', time: '23:59' },
          'Wednesday': { day: 'Friday', time: '23:59' }
        }
      },
      'Michigan': {
        'Raw Plant Material': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Research/Development': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Wednesday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '12:00' },
          'Sunday': { day: 'Wednesday', time: '12:00' },
          'Thursday': { day: 'Monday', time: '8:00' },
          'Tuesday': { day: 'Thursday', time: '8:00' },
          'Wednesday': { day: 'Friday', time: '12:00' }
        },
        'Additional Tests': {
          'Friday': { day: 'Tuesday', time: '19:00' },
          'Monday': { day: 'Wednesday', time: '19:00' },
          'Saturday': { day: 'Tuesday', time: '19:00' },
          'Sunday': { day: 'Tuesday', time: '19:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Thursday', time: '19:00' },
          'Wednesday': { day: 'Friday', time: '19:00' }
        },
        'Infused Beverages': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Infused Edible': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Infused Non-Edible': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Inhalable Compound Concentrate': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Inhalable Compound Concentrate (each)': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        },
        'Inhalable Concentrate': {
          'Friday': { day: 'Tuesday', time: '19:00' },
          'Monday': { day: 'Wednesday', time: '19:00' },
          'Saturday': { day: 'Wednesday', time: '19:00' },
          'Sunday': { day: 'Wednesday', time: '19:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Thursday', time: '19:00' },
          'Wednesday': { day: 'Friday', time: '19:00' }
        },
        'Non-Solvent Concentrate': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '11:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '11:00' }
        },
        'Vape Concentrate': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '12:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '12:00' }
        },
        'Tinctures': {
          'Friday': { day: 'Tuesday', time: '8:00' },
          'Monday': { day: 'Thursday', time: '8:00' },
          'Saturday': { day: 'Wednesday', time: '8:00' },
          'Sunday': { day: 'Wednesday', time: '8:00' },
          'Thursday': { day: 'Monday', time: '19:00' },
          'Tuesday': { day: 'Friday', time: '12:00' },
          'Wednesday': { day: 'Saturday', time: '19:00' }
        }
      }
    };
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const receivedDayName = days[receivedDate.getDay()];
    const stateKey = selectedState === 'ohio' ? 'Ohio' : 'Michigan';
    
    const categoryMap = microNeededByMap[stateKey];
    if (!categoryMap || !categoryMap[testCategory] || !categoryMap[testCategory][receivedDayName]) {
      return null;
    }
    
    return categoryMap[testCategory][receivedDayName];
  };

  // Mock data for demonstration
  useEffect(() => {
    loadMockData();
  }, [selectedState]);

  const loadMockData = () => {
    // Mock driver data
    const mockDrivers = [
      {
        id: 'D001',
        name: 'Mike Johnson',
        vehicle: 'Van #3',
        currentLocation: 'En route from Columbus',
        eta: new Date(Date.now() + 45 * 60000), // 45 mins from now
        manifestCount: 3,
        status: 'in_transit'
      },
      {
        id: 'D002',
        name: 'Sarah Williams',
        vehicle: 'Van #1',
        currentLocation: 'Cleveland pickup',
        eta: new Date(Date.now() + 120 * 60000), // 2 hours from now
        manifestCount: 5,
        status: 'at_pickup'
      },
      {
        id: 'D003',
        name: 'Tom Chen',
        vehicle: 'Van #2',
        currentLocation: 'Returning to lab',
        eta: new Date(Date.now() + 15 * 60000), // 15 mins from now
        manifestCount: 2,
        status: 'returning'
      }
    ];

    // Mock manifest data with Ohio/Michigan specific test categories
    const mockManifests = selectedState === 'ohio' ? [
      {
        manifestId: '0000112233',
        customerFacilityLicense: 'BRD-00000001-01',
        customerFacility: 'Green Valley Dispensary',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 8,
        createdDate: new Date('2025-01-08'),
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'rush',
        samples: [
          {
            metrcTag: '1A4060300003F2000000001',
            sourcePackage: '1A4060300002A1000000123',
            sourceHarvest: 'Harvest-2025-001 (01/02/2025)',
            itemName: 'BULK001: Blue Dream Flower',
            strain: 'Blue Dream',
            grossWeight: 15.5,
            itemCategory: 'Bulk Flower/Buds',
            testCategory: 'Dispensary Plant Material',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000002',
            sourcePackage: '1A4060300002A1000000124',
            sourceHarvest: 'Harvest-2025-001 (01/02/2025)',
            itemName: 'BULK002: OG Kush Flower',
            strain: 'OG Kush',
            grossWeight: 12.3,
            itemCategory: 'Bulk Flower/Buds',
            testCategory: 'Dispensary Plant Material',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          }
        ]
      },
      {
        manifestId: '0000112244',
        customerFacilityLicense: 'CUL-00000123-01',
        customerFacility: 'Wellness Center Ohio',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 12,
        createdDate: new Date('2025-01-08'),
        driverId: 'D002',
        status: 'scheduled',
        eta: new Date(Date.now() + 120 * 60000),
        priority: 'normal',
        samples: [
          {
            metrcTag: '1A4060300003F2000000003',
            sourcePackage: '1A4060300002A1000000125',
            sourceHarvest: 'N/A',
            itemName: 'CONC001: Lemon Haze Shatter',
            strain: 'Lemon Haze',
            grossWeight: 8.2,
            itemCategory: 'Bulk Concentrate',
            testCategory: 'Solvent Based Product (Not Previously Tested)',
            sampleNeededBy: new Date(Date.now() + 36 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000004',
            sourcePackage: '1A4060300002A1000000126',
            sourceHarvest: 'N/A',
            itemName: 'CONC002: OG Kush Wax',
            strain: 'OG Kush',
            grossWeight: 6.5,
            itemCategory: 'Bulk Concentrate',
            testCategory: 'Solvent Based Product (Not Previously Tested)',
            sampleNeededBy: new Date(Date.now() + 36 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000005',
            sourcePackage: '1A4060300002A1000000127',
            sourceHarvest: 'N/A',
            itemName: 'TERPS001: Blue Dream Flower - Terpene Analysis',
            strain: 'Blue Dream',
            grossWeight: 5.0,
            itemCategory: 'Bulk Flower/Buds',
            testCategory: 'Voluntary Testing - Terpenes (Plant Material)',
            sampleNeededBy: new Date(Date.now() + 48 * 60 * 60000)
          }
        ]
      },
      {
        manifestId: '0000112255',
        customerFacilityLicense: 'PRO-00000456-01',
        customerFacility: 'Buckeye Edibles',
        recipientFacilityLicense: 'LAB-00000042-01',
        packageCount: 6,
        createdDate: new Date('2025-01-07'),
        driverId: 'D003',
        status: 'in_transit',
        eta: new Date(Date.now() + 15 * 60000),
        priority: 'normal',
        samples: [
          {
            metrcTag: '1A4060300003F2000000006',
            sourcePackage: '1A4060300002A1000000128',
            sourceHarvest: 'N/A',
            itemName: 'EDIBLE001: Chocolate Bars 100mg',
            strain: 'Hybrid Blend',
            grossWeight: 25.0,
            itemCategory: 'Bulk Edible',
            testCategory: 'Non-Solvent Product (Not Previously Tested)',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000007',
            sourcePackage: '1A4060300002A1000000129',
            sourceHarvest: 'N/A',
            itemName: 'EDIBLE002: Gummy Bears 10mg',
            strain: 'N/A',
            grossWeight: 30.0,
            itemCategory: 'Bulk Edible',
            testCategory: 'Processed Product (Previously Tested)',
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          }
        ]
      }
    ] : [
      // Michigan manifests with DPM early start samples
      {
        manifestId: '0000223344',
        customerFacilityLicense: 'AU-C-000001',
        customerFacility: 'Motor City Cannabis',
        recipientFacilityLicense: 'SC-000042',
        packageCount: 10,
        createdDate: new Date('2025-01-08'),
        driverId: 'D001',
        status: 'in_transit',
        eta: new Date(Date.now() + 45 * 60000),
        priority: 'normal',
        hasDPMEarlyStart: true,
        samples: [
          {
            metrcTag: '1A4060300003F2000000011',
            sourcePackage: '1A4060300002A1000000211',
            sourceHarvest: 'MI-Harvest-2025-001 (01/03/2025)',
            itemName: 'FLOWER001: Purple Haze',
            strain: 'Purple Haze',
            grossWeight: 14.2,
            itemCategory: 'Buds',
            testCategory: 'Raw Plant Material',
            requiresDPMEarlyStart: true,
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000012',
            sourcePackage: '1A4060300002A1000000212',
            sourceHarvest: 'MI-Harvest-2025-001 (01/03/2025)',
            itemName: 'FLOWER002: Northern Lights',
            strain: 'Northern Lights',
            grossWeight: 16.8,
            itemCategory: 'Buds',
            testCategory: 'Raw Plant Material',
            requiresDPMEarlyStart: true,
            sampleNeededBy: new Date(Date.now() + 24 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000013',
            sourcePackage: '1A4060300002A1000000213',
            sourceHarvest: 'N/A',
            itemName: 'VAPE001: Distillate Cartridge 0.5g',
            strain: 'Sour Diesel',
            grossWeight: 2.5,
            itemCategory: 'Vape Cart',
            testCategory: 'Inhalable Compound Concentrate (each)',
            sampleNeededBy: new Date(Date.now() + 36 * 60 * 60000)
          },
          {
            metrcTag: '1A4060300003F2000000014',
            sourcePackage: '1A4060300002A1000000214',
            sourceHarvest: 'N/A',
            itemName: 'TINC001: THC Tincture 30ml',
            strain: 'N/A',
            grossWeight: 35.0,
            itemCategory: 'Infused Liquid',
            testCategory: 'Tinctures',
            sampleNeededBy: new Date(Date.now() + 36 * 60 * 60000)
          }
        ]
      }
    ];

    setDrivers(mockDrivers);
    setManifests(mockManifests);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // In production, this would fetch from METRC API
    await new Promise(resolve => setTimeout(resolve, 1000));
    loadMockData();
    setLastRefresh(new Date());
    setRefreshing(false);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'at_pickup': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'returning': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'scheduled': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'rush') {
      return <Zap className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const formatLocalTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatFullDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })}`;
  };

  const expandAllSamples = () => {
    const newExpandedSamples = {};
    manifests.forEach(manifest => {
      if (expandedReceiving[manifest.manifestId]) {
        manifest.samples.forEach((_, idx) => {
          const key = `${manifest.manifestId}-${idx}`;
          newExpandedSamples[key] = true;
        });
      }
    });
    setExpandedSamples(newExpandedSamples);
  };

  // Generate mock source package tag
  const generateMockSourcePackage = () => {
    const prefix = '1A40603000002A1';
    const random = Math.floor(Math.random() * 1000000).toString().padStart(9, '0');
    return prefix + random;
  };

  // Get item category based on item name
  const getItemCategory = (itemName) => {
    // Map item names to Metrc item categories
    const categoryMap = {
      // Flower products
      'Sundae Driver': 'Buds',
      'Wedding Cake': 'Buds',
      'Gelato': 'Buds',
      'Purple Punch': 'Buds',
      'Blue Dream': 'Buds',
      'Sour Diesel': 'Buds',
      'OG Kush': 'Buds',
      'Gorilla Glue': 'Buds',
      'Green Crack': 'Buds',
      
      // Pre-rolls
      'Pre-Roll': 'Pre-Roll',
      
      // Edibles
      'Chocolate Bar': 'Edibles',
      'Gummies': 'Edibles',
      'Cookies': 'Edibles',
      
      // Concentrates
      'Wax': 'Concentrate',
      'Shatter': 'Concentrate',
      'Oil': 'Concentrate',
      'Resin': 'Concentrate',
      
      // Vapes
      'Vape Cartridge': 'Vape Cartridge',
      'Vape Pen': 'Vape Cartridge',
      
      // Tinctures
      'THC Tincture': 'Tincture',
      'CBD Tincture': 'Tincture',
      
      // Other categories
      'Topical': 'Topical',
      'Capsules': 'Capsules',
      'Shake': 'Shake/Trim'
    };
    
    // Check for category keywords in item name
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (itemName.toLowerCase().includes(keyword.toLowerCase())) {
        return category;
      }
    }
    
    // Default to Buds if no match
    return 'Buds';
  };

  const handleReceiveClick = (manifest) => {
    setExpandedReceiving(prev => ({
      ...prev,
      [manifest.manifestId]: !prev[manifest.manifestId]
    }));
    
    // Initialize manifest data if not already done
    if (!manifestData[manifest.manifestId]) {
      const initialData = {
        ccOrderId: '',
        notes: '',
        samples: {}
      };
      
      manifest.samples.forEach((sample, index) => {
        initialData.samples[index] = {
          ...sample,
          ccId: '',
          testCategory: sample.testCategory || 'Dispensary Plant Material',
          assays: {
            cannabinoids: false,
            terpenes: false,
            pesticides: false,
            mycotoxins: false,
            heavyMetals: false,
            elementalAnalysis: false,
            totalNitrogen: false,
            totalSulfur: false,
            salmonella: false,
            stec: false,
            totalAerobicBacteria: false,
            totalColiforms: false,
            totalYeastMold: false,
            btgn: false,
            plantPathogens: false,
            plantSex: false,
            foreignMatter: false,
            moistureContent: false,
            waterActivity: false,
            residualSolvents: false
          },
          retest: false,
          shippedQty: sample.grossWeight || '',
          shippedQtyUnit: 'g',
          srcPkgWgt: '',
          srcPkgWgtUnit: 'g',
          grossWt: sample.grossWeight || '',
          grossWtUnit: 'g',
          uom: 'mg/g',
          potencyTargets: [
            { analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }
          ],
          dpmEarlyStart: sample.requiresDPMEarlyStart || false,
          rush: false
        };
        
        // Calculate initial micro due date based on test category defaults
        const testCat = sample.testCategory || 'Dispensary Plant Material';
        // Default assays based on test category - for DPM, assume all microbial tests are needed
        if (testCat.includes('Dispensary Plant Material')) {
          initialData.samples[index].assays = {
            ...initialData.samples[index].assays,
            salmonella: true,
            stec: true,
            totalAerobicBacteria: true,
            totalColiforms: true,
            totalYeastMold: true,
            btgn: true
          };
        }
        
        // Calculate micro due with selected assays
        const microDueResult = getMicroDueDates(testCat, manifest.createdDate, initialData.samples[index].assays);
        initialData.samples[index].microDue = microDueResult?.latestDate || '';
        initialData.samples[index].microDueDetails = microDueResult;
        initialData.samples[index].chemistryDue = getChemistryDue(testCat, manifest.createdDate) || '';
      });
      
      setManifestData(prev => ({
        ...prev,
        [manifest.manifestId]: initialData
      }));
    }
  };
  
  const handleManifestDataChange = (manifestId, field, value) => {
    setManifestData(prev => ({
      ...prev,
      [manifestId]: {
        ...prev[manifestId],
        [field]: value
      }
    }));
  };
  
  const handleSampleDataChange = (manifestId, sampleIndex, field, value) => {
    setManifestData(prev => ({
      ...prev,
      [manifestId]: {
        ...prev[manifestId],
        samples: {
          ...prev[manifestId].samples,
          [sampleIndex]: {
            ...prev[manifestId].samples[sampleIndex],
            [field]: value
          }
        }
      }
    }));
  };
  
  const handleTestCategoryChange = (manifestId, sampleIndex, value) => {
    setManifestData(prev => ({
      ...prev,
      [manifestId]: {
        ...prev[manifestId],
        samples: {
          ...prev[manifestId].samples,
          [sampleIndex]: {
            ...prev[manifestId].samples[sampleIndex],
            testCategory: value
          }
        }
      }
    }));
  };
  
  const handleAssayChange = (manifestId, sampleIndex, assay, value) => {
    setManifestData(prev => {
      const updatedManifest = { ...prev[manifestId] };
      const updatedSample = { ...updatedManifest.samples[sampleIndex] };
      const updatedAssays = { ...updatedSample.assays, [assay]: value };
      updatedSample.assays = updatedAssays;
      
      // Recalculate micro due date based on selected assays
      const manifest = manifests.find(m => m.manifestId === manifestId);
      if (manifest) {
        const microDueResult = getMicroDueDates(
          updatedSample.testCategory || 'Dispensary Plant Material',
          manifest.createdDate,
          updatedAssays
        );
        
        updatedSample.microDue = microDueResult?.latestDate || '';
        updatedSample.microDueDetails = microDueResult;
      }
      
      updatedManifest.samples = {
        ...updatedManifest.samples,
        [sampleIndex]: updatedSample
      };
      
      return {
        ...prev,
        [manifestId]: updatedManifest
      };
    });
  };
  
  const handleReceiveManifest = (manifestId) => {
    const data = manifestData[manifestId];
    console.log('Receiving manifest:', manifestId, data);
    // In production, this would submit to API
    // Then close the expansion
    setExpandedReceiving(prev => ({
      ...prev,
      [manifestId]: false
    }));
  };
  
  const toggleSampleExpansion = (manifestId, sampleIndex) => {
    const key = `${manifestId}-${sampleIndex}`;
    setExpandedSamples(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full px-2 py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Metrc Receiving</h1>
            <div className="flex items-center space-x-3">
              {/* State Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedState('ohio')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedState === 'ohio' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Ohio Lab
                </button>
                <button
                  onClick={() => setSelectedState('michigan')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedState === 'michigan' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Michigan Lab
                </button>
              </div>
              
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              {/* Last updated */}
              <span className="text-xs text-gray-500">
                {lastRefresh.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>



        {/* Manifests List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {manifests.map(manifest => (
              <div key={manifest.manifestId} className="p-4">
                <div 
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => handleReceiveClick(manifest)}
                      className="flex items-center hover:bg-gray-100 rounded p-1"
                    >
                      {expandedReceiving[manifest.manifestId] ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {manifest.customerFacility}
                        </h3>
                        {manifestData[manifest.manifestId]?.ccOrderId && (
                          <>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-700 font-medium">CC Order ID: {manifestData[manifest.manifestId].ccOrderId}</span>
                          </>
                        )}
                        {getPriorityIcon(manifest.priority)}
                        {manifest.hasDPMEarlyStart && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            DPM Early Start
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>Manifest #{manifest.manifestId}</span>
                        <span>•</span>
                        <span>{manifest.packageCount} samples</span>
                        <span>•</span>
                        <span>ETA: {formatLocalTime(manifest.eta)}</span>
                        <span>•</span>
                        <span>{formatFullDate(manifest.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* Inline Receiving Interface */}
                {expandedReceiving[manifest.manifestId] && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    {/* Order Information */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">CC Order ID:</label>
                          <input
                            type="text"
                            value={manifestData[manifest.manifestId]?.ccOrderId || ''}
                            onChange={(e) => handleManifestDataChange(manifest.manifestId, 'ccOrderId', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Confident Cannabis Order ID"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">Notes:</label>
                          <input
                            type="text"
                            value={manifestData[manifest.manifestId]?.notes || ''}
                            onChange={(e) => handleManifestDataChange(manifest.manifestId, 'notes', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter any notes about this manifest"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              // Apply rush to all samples
                              const updatedData = { ...manifestData[manifest.manifestId] };
                              Object.keys(updatedData.samples || {}).forEach(idx => {
                                updatedData.samples[idx].rush = true;
                              });
                              setManifestData(prev => ({
                                ...prev,
                                [manifest.manifestId]: updatedData
                              }));
                            }}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex items-center"
                          >
                            <Zap className="w-4 h-4 mr-1" />
                            Rush All
                          </button>
                          <button
                            onClick={() => {
                              // Apply DPM Early Start to all DPM samples
                              const updatedData = { ...manifestData[manifest.manifestId] };
                              Object.keys(updatedData.samples || {}).forEach(idx => {
                                if (updatedData.samples[idx].testCategory?.includes('Dispensary Plant Material')) {
                                  updatedData.samples[idx].dpmEarlyStart = true;
                                }
                              });
                              setManifestData(prev => ({
                                ...prev,
                                [manifest.manifestId]: updatedData
                              }));
                            }}
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                          >
                            DPM Early Start All
                          </button>
                        </div>
                        <button
                          onClick={expandAllSamples}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                          Expand All Samples
                        </button>
                      </div>
                    </div>
                    
                    {/* Sample Table */}
                    <div className="overflow-x-auto relative">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                            <th className="py-2 px-2 text-left"></th>
                            <th className="py-2 px-2 text-left">#</th>
                            <th className="py-2 px-2 text-left">METRC Tag</th>
                            <th className="py-2 px-2 text-left">Source Package</th>
                            <th className="py-2 px-2 text-left">Strain</th>
                            <th className="py-2 px-2 text-left">Item Name</th>
                            <th className="py-2 px-2 text-left">Item Category</th>
                            <th className="py-2 px-2 text-left">Test Category</th>
                            <th className="py-2 px-2 text-left">
                              <span title="This is a tooltip.">Micro Due</span>
                            </th>
                            <th className="py-2 px-2 text-left">Chemistry Due</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {manifest.samples.map((sample, idx) => {
                            const sampleData = manifestData[manifest.manifestId]?.samples[idx] || {};
                            const sampleKey = `${manifest.manifestId}-${idx}`;
                            const isExpanded = expandedSamples[sampleKey];
                            
                            return (
                              <React.Fragment key={idx}>
                                <tr className="hover:bg-gray-50 text-sm">
                                  <td className="py-2 px-2">
                                    <button
                                      onClick={() => toggleSampleExpansion(manifest.manifestId, idx)}
                                      className="hover:bg-gray-200 rounded p-1"
                                    >
                                      {isExpanded ? 
                                        <ChevronDown className="w-4 h-4" /> : 
                                        <ChevronRight className="w-4 h-4" />
                                      }
                                    </button>
                                  </td>
                                  <td className="py-2 px-2 text-gray-600">{idx + 1}</td>
                                  <td className="py-2 px-2 font-mono text-xs">{sample.metrcTag}</td>
                                  <td className="py-2 px-2 font-mono text-xs">{sample.sourcePackage || generateMockSourcePackage()}</td>
                                  <td className="py-2 px-2 text-xs">{sample.strain || 'N/A'}</td>
                                  <td className="py-2 px-2">{sample.itemName}</td>
                                  <td className="py-2 px-2 text-xs">{sample.itemCategory || getItemCategory(sample.itemName)}</td>
                                  <td className="py-2 px-2">
                                    <select
                                      value={sampleData.testCategory || 'Dispensary Plant Material'}
                                      onChange={(e) => {
                                        handleTestCategoryChange(manifest.manifestId, idx, e.target.value);
                                        // Update due dates when test category changes
                                        const sampleAssays = manifestData[manifest.manifestId]?.samples[idx]?.assays || {};
                                        const microDueResult = getMicroDueDates(e.target.value, manifest.createdDate, sampleAssays);
                                        const newChemDue = getChemistryDue(e.target.value, manifest.createdDate);
                                        
                                        setManifestData(prev => {
                                          const updated = { ...prev };
                                          if (updated[manifest.manifestId]?.samples[idx]) {
                                            updated[manifest.manifestId].samples[idx].microDue = microDueResult?.latestDate || '';
                                            updated[manifest.manifestId].samples[idx].microDueDetails = microDueResult;
                                            updated[manifest.manifestId].samples[idx].chemistryDue = newChemDue || '';
                                          }
                                          return updated;
                                        });
                                      }}
                                      className="text-xs px-2 py-1 border border-gray-300 rounded w-full max-w-[220px]"
                                    >
                                      {selectedState === 'ohio' ? (
                                        <>
                                          <option value="Dispensary Plant Material">Dispensary Plant Material</option>
                                          <option value="Dispensary Plant Material - STEC/Sal">Dispensary Plant Material - STEC/Sal</option>
                                          <option value="Non-Solvent Marijuana Ingredient">Non-Solvent Marijuana Ingredient</option>
                                          <option value="Non-Solvent Product (Not Previously Tested)">Non-Solvent Product (Not Previously Tested)</option>
                                          <option value="Processed Product (Previously Tested)">Processed Product (Previously Tested)</option>
                                          <option value="Processor Plant Material">Processor Plant Material</option>
                                          <option value="R&D Testing - Salmonella and STEC Contamination">R&D Testing - Salmonella and STEC Contamination</option>
                                          <option value="Research/Development">Research/Development</option>
                                          <option value="Solvent Based Marijuana Ingredient">Solvent Based Marijuana Ingredient</option>
                                          <option value="Solvent Based Product (Not Previously Tested)">Solvent Based Product (Not Previously Tested)</option>
                                          <option value="Voluntary Testing - Terpenes (Plant Material)">Voluntary Testing - Terpenes (Plant Material)</option>
                                          <option value="Voluntary Testing - Terpenes (Processed Products)">Voluntary Testing - Terpenes (Processed Products)</option>
                                          <option value="Miscellaneous R&D Testing">Miscellaneous R&D Testing</option>
                                        </>
                                      ) : (
                                        <>
                                          <option value="Additional">Additional</option>
                                          <option value="Flower">Flower</option>
                                          <option value="Infused">Infused</option>
                                          <option value="R&D Testing">R&D Testing</option>
                                          <option value="R&D Testing (Infused Products)">R&D Testing (Infused Products)</option>
                                          <option value="R&D Testing (Infused Beverages)">R&D Testing (Infused Beverages)</option>
                                          <option value="Misc Genetics R&D Testing">Misc Genetics R&D Testing</option>
                                        </>
                                      )}
                                    </select>
                                  </td>
                                  <td className="py-2 px-2">
                                    <input
                                      type="datetime-local"
                                      value={toDateTimeLocal(sampleData.microDue) || ''}
                                      onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'microDue', fromDateTimeLocal(e.target.value))}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    />
                                  </td>
                                  <td className="py-2 px-2">
                                    <input
                                      type="datetime-local"
                                      value={toDateTimeLocal(sampleData.chemistryDue) || ''}
                                      onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'chemistryDue', fromDateTimeLocal(e.target.value))}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                    />
                                  </td>
                                </tr>
                            
                                {/* Expanded Section */}
                                {isExpanded && (
                                  <tr>
                                    <td colSpan="10" className="p-4 bg-gray-50">
                                {/* Assays Header with Options */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center">
                                    <h4 className="text-sm font-medium text-gray-700">Assays</h4>
                                    <div className="relative group ml-1">
                                      <Info className="w-3 h-3 text-gray-400 cursor-help" />
                                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 w-64">
                                          DPM Early Start allows microbial testing to begin immediately for Dispensary Plant Material samples
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={sampleData.retest || false}
                                        onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'retest', e.target.checked)}
                                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      />
                                      <span className="text-sm">Retest</span>
                                    </label>
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={sampleData.dpmEarlyStart || false}
                                        onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'dpmEarlyStart', e.target.checked)}
                                        className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                      />
                                      <span className="text-sm">DPM Early Start</span>
                                    </label>
                                  </div>
                                </div>
                                
                                {/* Assay Groups */}
                                <div className="grid grid-cols-3 gap-3">
                                  {/* Chemistry Assays */}
                                  <div className="border border-gray-200 rounded-lg p-3">
                                    <h5 className="text-xs font-medium text-gray-600 mb-3">Chemistry</h5>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.cannabinoids || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'cannabinoids', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Cannabinoids</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.pesticides || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'pesticides', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Pesticides</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.terpenes || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'terpenes', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Terpenes</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.mycotoxins || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'mycotoxins', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Mycotoxins</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.heavyMetals || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'heavyMetals', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Heavy Metals</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.totalNitrogen || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'totalNitrogen', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Total Nitrogen</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.elementalAnalysis || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'elementalAnalysis', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Elemental</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.totalSulfur || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'totalSulfur', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Total Sulfur</span>
                                      </label>
                                      <label className="flex items-center min-h-[24px]">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.residualSolvents || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'residualSolvents', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                                        />
                                        <span className="text-sm whitespace-nowrap">Residual Solvents</span>
                                      </label>
                                    </div>
                                  </div>
                                  
                                  {/* Microbial Assays */}
                                  <div className="border border-gray-200 rounded-lg p-3">
                                    <h5 className="text-xs font-medium text-gray-600 mb-2">Microbial</h5>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.salmonella || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'salmonella', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">Salmonella</span>
                                        </label>
                                        <label className="flex items-center mt-1">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.stec || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'stec', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">STEC</span>
                                        </label>
                                      </div>
                                      <div>
                                        <label className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.totalAerobicBacteria || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'totalAerobicBacteria', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">Total Aerobic</span>
                                        </label>
                                        <label className="flex items-center mt-1">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.totalColiforms || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'totalColiforms', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">Total Coliforms</span>
                                        </label>
                                      </div>
                                      <div>
                                        <label className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.totalYeastMold || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'totalYeastMold', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">Total Yeast & Mold</span>
                                        </label>
                                        <label className="flex items-center mt-1">
                                          <input
                                            type="checkbox"
                                            checked={sampleData.assays?.btgn || false}
                                            onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'btgn', e.target.checked)}
                                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="text-sm">BTGN</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Other Assays */}
                                  <div className="border border-gray-200 rounded-lg p-3">
                                    <h5 className="text-xs font-medium text-gray-600 mb-2">Other</h5>
                                    <div className="space-y-1">
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.plantPathogens || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'plantPathogens', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">Plant Pathogens</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.plantSex || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'plantSex', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">Plant Sex</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.foreignMatter || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'foreignMatter', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">Foreign Matter</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.moistureContent || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'moistureContent', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">Moisture Content</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={sampleData.assays?.waterActivity || false}
                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, 'waterActivity', e.target.checked)}
                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm">Water Activity</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Potency Targets and Sample Weights side-by-side */}
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                  {/* Potency Targets Container */}
                                  <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-sm font-medium text-gray-700">Potency Targets</h4>
                                      {/* Units of Measure on same row */}
                                      <div className="flex items-center space-x-2">
                                        <label className="text-xs text-gray-500">Default Units:</label>
                                        <label className="inline-flex items-center">
                                          <input
                                            type="radio"
                                            value="mg/g"
                                            checked={sampleData.uom === 'mg/g'}
                                            onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'uom', e.target.value)}
                                            className="form-radio h-3 w-3 text-blue-600"
                                          />
                                          <span className="ml-1 text-xs">mg/g</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                          <input
                                            type="radio"
                                            value="%"
                                            checked={sampleData.uom === '%'}
                                            onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'uom', e.target.value)}
                                            className="form-radio h-3 w-3 text-blue-600"
                                          />
                                          <span className="ml-1 text-xs">%</span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      {(sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }]).map((target, targetIdx) => (
                                        <div key={targetIdx} className="flex items-center space-x-2">
                                          <select
                                            value={target.analyte || ''}
                                            onChange={(e) => {
                                              const newTargets = [...(sampleData.potencyTargets || [])];
                                              newTargets[targetIdx] = { ...newTargets[targetIdx], analyte: e.target.value };
                                              handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                            }}
                                            className="text-xs px-2 py-1 border border-gray-300 rounded"
                                          >
                                            <option value="">Select Analyte...</option>
                                            <option value="Total THC">Total THC</option>
                                            <option value="CBD">CBD</option>
                                            <option value="CBC">CBC</option>
                                            <option value="CBDa">CBDa</option>
                                            <option value="CBDV">CBDV</option>
                                            <option value="CBG">CBG</option>
                                            <option value="CBGa">CBGa</option>
                                            <option value="CBN">CBN</option>
                                            <option value="delta8-THC">delta8-THC</option>
                                            <option value="delta9-THC">delta9-THC</option>
                                            <option value="THCa">THCa</option>
                                            <option value="THCV">THCV</option>
                                            <option value="THCVa">THCVa</option>
                                          </select>
                                          <input
                                            type="text"
                                            value={target.target || ''}
                                            onChange={(e) => {
                                              const newTargets = [...(sampleData.potencyTargets || [])];
                                              newTargets[targetIdx] = { ...newTargets[targetIdx], target: e.target.value };
                                              handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                            }}
                                            className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                            placeholder="Target"
                                          />
                                          <span className="text-xs text-gray-500">OR</span>
                                          <input
                                            type="text"
                                            value={target.rangeLow || ''}
                                            onChange={(e) => {
                                              const newTargets = [...(sampleData.potencyTargets || [])];
                                              newTargets[targetIdx] = { ...newTargets[targetIdx], rangeLow: e.target.value };
                                              handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                            }}
                                            className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                            placeholder="Low"
                                          />
                                          <span className="text-xs">-</span>
                                          <input
                                            type="text"
                                            value={target.rangeHigh || ''}
                                            onChange={(e) => {
                                              const newTargets = [...(sampleData.potencyTargets || [])];
                                              newTargets[targetIdx] = { ...newTargets[targetIdx], rangeHigh: e.target.value };
                                              handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                            }}
                                            className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                            placeholder="High"
                                          />
                                          {targetIdx === (sampleData.potencyTargets || []).length - 1 && (
                                            <button
                                              onClick={() => {
                                                const newTargets = [...(sampleData.potencyTargets || []), { analyte: '', target: '', rangeLow: '', rangeHigh: '' }];
                                                handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                              }}
                                              className="text-blue-600 hover:text-blue-700 text-xs"
                                            >
                                              + Add
                                            </button>
                                          )}
                                          {targetIdx > 0 && (
                                            <button
                                              onClick={() => {
                                                const newTargets = [...(sampleData.potencyTargets || [])];
                                                newTargets.splice(targetIdx, 1);
                                                handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                              }}
                                              className="text-red-600 hover:text-red-700 text-xs"
                                            >
                                              ×
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Sample Weights/Qtys Container */}
                                  <div className="border border-gray-200 rounded-lg p-3">
                                    <h5 className="text-sm font-medium text-gray-700 mb-2">Sample Weights/Qtys.</h5>
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <label className="text-xs text-gray-500 w-20">Shipped:</label>
                                        <input
                                          type="number"
                                          value={sampleData.shippedQty || ''}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'shippedQty', e.target.value)}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                        <select
                                          value={sampleData.shippedQtyUnit || 'g'}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'shippedQtyUnit', e.target.value)}
                                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                                        >
                                          <option value="g">g</option>
                                          <option value="mg">mg</option>
                                          <option value="kg">kg</option>
                                          <option value="oz">oz</option>
                                          <option value="lb">lb</option>
                                          <option value="each">each</option>
                                        </select>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <label className="text-xs text-gray-500 w-20">Source Pkg:</label>
                                        <input
                                          type="number"
                                          value={sampleData.srcPkgWgt || ''}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'srcPkgWgt', e.target.value)}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                        <select
                                          value={sampleData.srcPkgWgtUnit || 'g'}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'srcPkgWgtUnit', e.target.value)}
                                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                                        >
                                          <option value="g">g</option>
                                          <option value="mg">mg</option>
                                          <option value="kg">kg</option>
                                          <option value="oz">oz</option>
                                          <option value="lb">lb</option>
                                        </select>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <label className="text-xs text-gray-500 w-20">Gross Wt:</label>
                                        <input
                                          type="number"
                                          value={sampleData.grossWt || ''}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'grossWt', e.target.value)}
                                          className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                                        />
                                        <select
                                          value={sampleData.grossWtUnit || 'g'}
                                          onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'grossWtUnit', e.target.value)}
                                          className="px-2 py-1 border border-gray-300 rounded text-xs"
                                        >
                                          <option value="g">g</option>
                                          <option value="mg">mg</option>
                                          <option value="kg">kg</option>
                                          <option value="oz">oz</option>
                                          <option value="lb">lb</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Generate Confident Cannabis Order
                      </button>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Refresh Manifest
                      </button>
                      <button
                        onClick={() => handleReceiveManifest(manifest.manifestId)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Receive Manifest
                      </button>
                      <button
                        onClick={() => setExpandedReceiving(prev => ({...prev, [manifest.manifestId]: false}))}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};


export default ReceivingDashboard;