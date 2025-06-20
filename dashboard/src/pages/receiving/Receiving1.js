import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Info,
  Users,
  FlaskConical,
  BarChart3,
  TrendingUp,
  Activity,
  Timer,
  FileText
} from 'lucide-react';
import { 
  calculateAssayDeadline, 
  getAllAssayDeadlines, 
  getGroupedDeadlines,
  getSuggestedMicroDeadline,
  getSuggestedChemistryDeadline,
  getDefaultAssays,
  getAssayDisplayName,
  TEST_CATEGORY_DEFAULTS
} from '../../utils/assayDeadlines';
import { 
  ANALYTE_DEFINITIONS,
  getAnalytesForAssay,
  hasIndividualAnalytes
} from '../../utils/analyteDefinitions';

const Receiving1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse URL parameters to determine active tab
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab') || 'pending';
  
  const [selectedState, setSelectedState] = useState('ohio');
  const [currentState] = useState('Michigan'); // For demo purposes
  const [manifests, setManifests] = useState([]);
  const [receivedManifests, setReceivedManifests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedManifest, setSelectedManifest] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [expandedReceiving, setExpandedReceiving] = useState({});
  const [expandedActiveManifests, setExpandedActiveManifests] = useState({});
  const [manifestData, setManifestData] = useState({});
  const [expandedSamples, setExpandedSamples] = useState({});
  const [dashboardStats, setDashboardStats] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  
  // Update active tab when URL changes
  useEffect(() => {
    const newTab = searchParams.get('tab') || 'pending';
    setActiveTab(newTab);
  }, [location.search]);
  
  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'pending') {
      navigate('/receiving1');
    } else {
      navigate(`/receiving1?tab=${tab}`);
    }
  };
  
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

  // Generate mock source package tag
  const generateMockSourcePackage = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let tag = '';
    for (let i = 0; i < 3; i++) {
      tag += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 9; i++) {
      tag += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return tag;
  };

  // Get item category based on item name
  const getItemCategory = (itemName) => {
    const nameLower = itemName.toLowerCase();
    if (nameLower.includes('flower') || nameLower.includes('bud')) return 'Buds';
    if (nameLower.includes('pre-roll') || nameLower.includes('preroll')) return 'Pre-Roll';
    if (nameLower.includes('vape') || nameLower.includes('cart')) return 'Vape Cartridge';
    if (nameLower.includes('concentrate') || nameLower.includes('rosin') || nameLower.includes('resin')) return 'Concentrate';
    if (nameLower.includes('gummy') || nameLower.includes('chocolate') || nameLower.includes('edible')) return 'Edibles';
    if (nameLower.includes('shake') || nameLower.includes('trim')) return 'Shake';
    return 'Other';
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

  // Get all assay deadlines (both micro and chemistry) and return the earliest
  const getAllAssayDeadlines = (testCategory, receivedDate, selectedAssays = {}, customDeadlines = {}) => {
    const deadlines = [];
    
    // Get microbial assay deadlines
    const microResult = getMicroDueDates(testCategory, receivedDate, selectedAssays);
    if (microResult?.dueDates) {
      Object.entries(microResult.dueDates).forEach(([assay, dueDate]) => {
        // Use custom deadline if provided, otherwise use calculated
        const finalDueDate = customDeadlines[assay] || dueDate;
        deadlines.push({
          assay: assay,
          type: 'microbial',
          dueDate: finalDueDate,
          displayName: getAssayDisplayName(assay),
          isCustom: !!customDeadlines[assay]
        });
      });
    }
    
    // Get chemistry deadlines for selected chemistry assays
    const chemDue = getChemistryDue(testCategory, receivedDate);
    if (chemDue) {
      // Check which chemistry assays are selected
      const chemistryAssays = ['cannabinoids', 'terpenes', 'pesticides', 'mycotoxins', 
                               'heavyMetals', 'elementalAnalysis', 'totalNitrogen', 
                               'totalSulfur', 'residualSolvents'];
      
      chemistryAssays.forEach(assay => {
        if (selectedAssays[assay]) {
          // Use custom deadline if provided, otherwise use calculated
          const finalDueDate = customDeadlines[assay] || chemDue;
          deadlines.push({
            assay: assay,
            type: 'chemistry',
            dueDate: finalDueDate,
            displayName: getAssayDisplayName(assay),
            isCustom: !!customDeadlines[assay]
          });
        }
      });
    }
    
    // Sort by due date (earliest first)
    deadlines.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    return {
      deadlines: deadlines,
      earliestDeadline: deadlines[0]?.dueDate || null,
      earliestAssay: deadlines[0]?.displayName || null
    };
  };

  // Get display name for assay
  const getAssayDisplayName = (assay) => {
    const displayNames = {
      // Microbial
      'salmonella': 'Salmonella',
      'stec': 'STEC',
      'ecoli': 'E. coli',
      'totalAerobicBacteria': 'Total Aerobic',
      'totalColiforms': 'Total Coliforms',
      'totalYeastMold': 'Total Yeast & Mold',
      'btgn': 'BTGN',
      'aspergillus': 'Aspergillus',
      // Chemistry
      'cannabinoids': 'Cannabinoids',
      'terpenes': 'Terpenes',
      'pesticides': 'Pesticides',
      'mycotoxins': 'Mycotoxins',
      'heavyMetals': 'Heavy Metals',
      'elementalAnalysis': 'Elemental Analysis',
      'totalNitrogen': 'Total Nitrogen',
      'totalSulfur': 'Total Sulfur',
      'residualSolvents': 'Residual Solvents'
    };
    return displayNames[assay] || assay;
  };

  // Get specific assay deadline
  const getAssayDeadline = (assay, sampleData, manifest) => {
    if (!sampleData?.allDeadlines) return null;
    
    const deadline = sampleData.allDeadlines.find(d => d.assay === assay);
    if (!deadline) return null;
    
    return {
      date: deadline.dueDate,
      isEarliest: sampleData.earliestAssayName === deadline.displayName
    };
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

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate dashboard statistics
  useEffect(() => {
    if (manifests.length > 0) {
      calculateDashboardStats();
    }
  }, [manifests, manifestData]);

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
            testCategory: 'Solvent Based Product (Not Previously Tested)',  // Requires all assays including residual solvents
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
            testCategory: 'Solvent Based Product (Not Previously Tested)',  // Requires all assays including residual solvents
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
            testCategory: 'Non-Solvent Product (Not Previously Tested)',  // Requires standard assays but no residual solvents
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
            testCategory: 'Processed Product (Previously Tested)',  // Only requires cannabinoids, foreign matter, and micro
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


  const calculateDashboardStats = () => {
    const stats = {
      totalManifests: manifests.length,
      totalSamples: 0,
      totalClients: new Set(),
      testCategoryBreakdown: {},
      priorityBreakdown: { rush: 0, normal: 0 },
      statusBreakdown: { in_transit: 0, scheduled: 0, at_pickup: 0, returning: 0 },
      upcomingArrivals: [],
      dpmEarlyStartCount: 0,
      retestCount: 0,
      avgSamplesPerManifest: 0,
      clientVolumes: {},
      timelineData: [],
      assayFrequency: {},
      receivedToday: 0,
      pendingReceipt: 0
    };

    manifests.forEach(manifest => {
      stats.totalSamples += manifest.samples.length;
      stats.totalClients.add(manifest.customerFacility);
      stats.priorityBreakdown[manifest.priority]++;
      stats.statusBreakdown[manifest.status]++;
      
      // Count client volumes
      if (!stats.clientVolumes[manifest.customerFacility]) {
        stats.clientVolumes[manifest.customerFacility] = { samples: 0, manifests: 0 };
      }
      stats.clientVolumes[manifest.customerFacility].samples += manifest.samples.length;
      stats.clientVolumes[manifest.customerFacility].manifests++;
      
      // Track upcoming arrivals
      if (manifest.eta) {
        const etaTime = new Date(manifest.eta);
        const minutesUntil = Math.floor((etaTime - currentTime) / 60000);
        if (minutesUntil > 0 && minutesUntil < 180) { // Next 3 hours
          stats.upcomingArrivals.push({
            manifestId: manifest.manifestId,
            client: manifest.customerFacility,
            eta: etaTime,
            minutesUntil: minutesUntil,
            sampleCount: manifest.samples.length
          });
        }
      }
      
      // Check if received today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (manifest.createdDate >= today) {
        stats.receivedToday++;
      }
      
      // Check if pending receipt
      if (!manifestData[manifest.manifestId]?.ccOrderId) {
        stats.pendingReceipt++;
      }
      
      manifest.samples.forEach(sample => {
        // Test category breakdown
        const category = sample.testCategory || 'Unknown';
        stats.testCategoryBreakdown[category] = (stats.testCategoryBreakdown[category] || 0) + 1;
        
        // Count DPM early start
        if (sample.requiresDPMEarlyStart || manifestData[manifest.manifestId]?.samples[manifest.samples.indexOf(sample)]?.dpmEarlyStart) {
          stats.dpmEarlyStartCount++;
        }
        
        // Count retests
        if (manifestData[manifest.manifestId]?.samples[manifest.samples.indexOf(sample)]?.retest) {
          stats.retestCount++;
        }
        
        // Track assay frequency
        const sampleData = manifestData[manifest.manifestId]?.samples[manifest.samples.indexOf(sample)];
        if (sampleData?.assays) {
          Object.entries(sampleData.assays).forEach(([assay, selected]) => {
            if (selected) {
              stats.assayFrequency[assay] = (stats.assayFrequency[assay] || 0) + 1;
            }
          });
        }
      });
    });
    
    stats.totalClients = stats.totalClients.size;
    stats.avgSamplesPerManifest = stats.totalManifests > 0 ? (stats.totalSamples / stats.totalManifests).toFixed(1) : 0;
    stats.upcomingArrivals.sort((a, b) => a.minutesUntil - b.minutesUntil);
    
    // Sort client volumes by sample count
    stats.topClients = Object.entries(stats.clientVolumes)
      .sort((a, b) => b[1].samples - a[1].samples)
      .slice(0, 5);
    
    setDashboardStats(stats);
  };

  const getTimelinePosition = (eta) => {
    const now = currentTime;
    const etaTime = new Date(eta);
    const totalMinutes = 180; // 3 hour window
    const minutesUntil = Math.floor((etaTime - now) / 60000);
    
    if (minutesUntil < 0) return 0;
    if (minutesUntil > totalMinutes) return 100;
    
    return (minutesUntil / totalMinutes) * 100;
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
          assayDeadlines: {
            cannabinoids: '',
            terpenes: '',
            pesticides: '',
            mycotoxins: '',
            heavyMetals: '',
            elementalAnalysis: '',
            totalNitrogen: '',
            totalSulfur: '',
            residualSolvents: '',
            salmonella: '',
            stec: '',
            totalAerobicBacteria: '',
            totalColiforms: '',
            totalYeastMold: '',
            btgn: '',
            plantPathogens: '',
            plantSex: '',
            foreignMatter: '',
            moistureContent: '',
            waterActivity: ''
          },
          retest: false,
          isRetest: false,
          whitelistedAnalytes: {},
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
          isRush: false
        };
        
        // Calculate initial micro due date based on test category defaults
        const testCat = sample.testCategory || 'Dispensary Plant Material';
        // Set default assays based on test category
        const requiredAssays = getRequiredAssays(testCat);
        initialData.samples[index].assays = {
          ...initialData.samples[index].assays,
          ...requiredAssays
        };
        
        // Calculate all deadlines with selected assays
        const allDeadlines = getAllAssayDeadlines(testCat, manifest.createdDate, initialData.samples[index].assays, initialData.samples[index].assayDeadlines);
        initialData.samples[index].earliestDeadline = allDeadlines.earliestDeadline || '';
        initialData.samples[index].earliestAssayName = allDeadlines.earliestAssay || '';
        initialData.samples[index].allDeadlines = allDeadlines.deadlines || [];
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
    const manifest = manifests.find(m => m.manifestId === manifestId);
    
    setManifestData(prev => {
      const updated = { ...prev };
      const sampleData = updated[manifestId]?.samples?.[sampleIndex];
      if (!sampleData) return prev;
      
      // Handle retest toggle
      if (field === 'isRetest') {
        if (value) {
          // Initialize whitelisted analytes for selected assays
          sampleData.whitelistedAnalytes = {};
          Object.entries(sampleData.assays || {}).forEach(([assayKey, isSelected]) => {
            if (isSelected && sampleData.assayDeadlines?.[assayKey]) {
              sampleData.whitelistedAnalytes[assayKey] = [];
            }
          });
        } else {
          // Clear whitelisted analytes when disabling retest
          sampleData.whitelistedAnalytes = {};
        }
        sampleData[field] = value;
      }
      // Handle individual analyte selection for retests
      else if (field.startsWith('analyte_')) {
        const [, assayKey, analyteKey] = field.split('_');
        if (!sampleData.whitelistedAnalytes[assayKey]) {
          sampleData.whitelistedAnalytes[assayKey] = [];
        }
        
        if (value) {
          // Add analyte to whitelist
          if (!sampleData.whitelistedAnalytes[assayKey].includes(analyteKey)) {
            sampleData.whitelistedAnalytes[assayKey].push(analyteKey);
          }
        } else {
          // Remove analyte from whitelist
          sampleData.whitelistedAnalytes[assayKey] = sampleData.whitelistedAnalytes[assayKey].filter(a => a !== analyteKey);
        }
      }
      // Regular field update
      else {
        sampleData[field] = value;
      }
      
      return updated;
    });
  };
  
  const getRequiredAssays = (testCategory) => {
    const assayMap = {
      'Dispensary Plant Material': {
        cannabinoids: true,
        foreignMatter: true,
        heavyMetals: true,
        salmonella: true,
        stec: true,
        totalAerobicBacteria: true,
        btgn: true,
        totalColiforms: true,
        totalYeastMold: true,
        moistureContent: true,
        mycotoxins: true,
        pesticides: true,
        waterActivity: true,
        terpenes: true
      },
      'Dispensary Plant Material - STEC/Sal': {
        salmonella: true,
        stec: true
      },
      'Non-Solvent Marijuana Ingredient': {
        cannabinoids: true,
        heavyMetals: true,
        mycotoxins: true,
        pesticides: true
      },
      'Non-Solvent Product (Not Previously Tested)': {
        cannabinoids: true,
        foreignMatter: true,
        heavyMetals: true,
        salmonella: true,
        stec: true,
        totalAerobicBacteria: true,
        btgn: true,
        totalColiforms: true,
        totalYeastMold: true,
        mycotoxins: true,
        pesticides: true
      },
      'Processed Product (Previously Tested)': {
        cannabinoids: true,
        foreignMatter: true,
        salmonella: true,
        stec: true,
        totalAerobicBacteria: true,
        btgn: true,
        totalColiforms: true,
        totalYeastMold: true
      },
      'Processor Plant Material': {
        cannabinoids: true,
        foreignMatter: true,
        moistureContent: true,
        pesticides: true
      },
      'Solvent Based Marijuana Ingredient': {
        cannabinoids: true,
        heavyMetals: true,
        mycotoxins: true,
        pesticides: true,
        residualSolvents: true
      },
      'Solvent Based Product (Not Previously Tested)': {
        cannabinoids: true,
        foreignMatter: true,
        heavyMetals: true,
        salmonella: true,
        stec: true,
        totalAerobicBacteria: true,
        btgn: true,
        totalColiforms: true,
        totalYeastMold: true,
        mycotoxins: true,
        pesticides: true,
        residualSolvents: true
      },
      'Voluntary Testing - Terpenes (Plant Material)': {
        terpenes: true
      },
      'Voluntary Testing - Terpenes (Processed Products)': {
        terpenes: true
      }
    };
    
    return assayMap[testCategory] || {};
  };
  
  const handleTestCategoryChange = (manifestId, sampleIndex, value) => {
    const defaultAssays = getDefaultAssays(value);
    const manifest = manifests.find(m => m.manifestId === manifestId);
    
    setManifestData(prev => {
      const updated = { ...prev };
      if (!updated[manifestId]) {
        updated[manifestId] = { samples: {} };
      }
      if (!updated[manifestId].samples[sampleIndex]) {
        updated[manifestId].samples[sampleIndex] = {};
      }
      
      const sample = updated[manifestId].samples[sampleIndex];
      sample.testCategory = value;
      sample.assays = { ...defaultAssays };
      
      // Calculate default deadlines
      if (manifest) {
        const microDeadline = getSuggestedMicroDeadline(manifest.createdDate, defaultAssays, sample.isRush);
        const chemDeadline = getSuggestedChemistryDeadline(manifest.createdDate, defaultAssays, sample.isRush);
        const groupedDeadlines = getGroupedDeadlines(manifest.createdDate, defaultAssays, sample.isRush);
        
        sample.microDue = microDeadline || '';
        sample.chemistryDue = chemDeadline || '';
        sample.groupedDeadlines = groupedDeadlines;
        sample.earliestDeadline = groupedDeadlines.earliestDeadline || '';
        sample.latestDeadline = groupedDeadlines.latestDeadline || '';
      }
      
      return updated;
    });
  };
  
  const handleAssayChange = (manifestId, sampleIndex, assay, value) => {
    const manifest = manifests.find(m => m.manifestId === manifestId);
    
    setManifestData(prev => {
      const updated = { ...prev };
      const sample = updated[manifestId]?.samples[sampleIndex];
      if (!sample) return prev;
      
      // Update assay selection
      sample.assays = { ...sample.assays, [assay]: value };
      
      // Recalculate deadlines
      if (manifest) {
        const microDeadline = getSuggestedMicroDeadline(manifest.createdDate, sample.assays, sample.isRush);
        const chemDeadline = getSuggestedChemistryDeadline(manifest.createdDate, sample.assays, sample.isRush);
        const groupedDeadlines = getGroupedDeadlines(manifest.createdDate, sample.assays, sample.isRush);
        
        sample.microDue = microDeadline || '';
        sample.chemistryDue = chemDeadline || '';
        sample.groupedDeadlines = groupedDeadlines;
        sample.earliestDeadline = groupedDeadlines.earliestDeadline || '';
        sample.latestDeadline = groupedDeadlines.latestDeadline || '';
      }
      
      return updated;
    });
  };

  // Handle individual assay deadline changes
  const handleAssayDeadlineChange = (manifestId, sampleIndex, assay, deadline) => {
    setManifestData(prev => {
      const updatedManifest = { ...prev[manifestId] };
      const updatedSample = { ...updatedManifest.samples[sampleIndex] };
      const updatedDeadlines = { ...updatedSample.assayDeadlines, [assay]: deadline };
      updatedSample.assayDeadlines = updatedDeadlines;
      
      // Recalculate all deadlines with custom deadline
      const manifest = manifests.find(m => m.manifestId === manifestId);
      if (manifest) {
        const allDeadlines = getAllAssayDeadlines(
          updatedSample.testCategory || 'Dispensary Plant Material',
          manifest.createdDate,
          updatedSample.assays,
          updatedDeadlines
        );
        
        updatedSample.earliestDeadline = allDeadlines.earliestDeadline || '';
        updatedSample.earliestAssayName = allDeadlines.earliestAssay || '';
        updatedSample.allDeadlines = allDeadlines.deadlines || [];
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
    
    // Find the manifest to receive
    const manifestToReceive = manifests.find(m => m.manifestId === manifestId);
    if (manifestToReceive) {
      // Add received timestamp and move to received manifests
      const receivedManifest = {
        ...manifestToReceive,
        receivedAt: new Date(),
        receivedBy: 'Dr. Sarah Chen', // In production, this would be the current user
        status: 'active',
        manifestData: data
      };
      
      // Add to received manifests
      setReceivedManifests(prev => [...prev, receivedManifest]);
      
      // Remove from pending manifests
      setManifests(prev => prev.filter(m => m.manifestId !== manifestId));
      
      // Close the expansion
      setExpandedReceiving(prev => ({
        ...prev,
        [manifestId]: false
      }));
      
      // Switch to active tab to show the received manifest
      handleTabChange('active');
    }
  };

  // Generate Confident Cannabis Order ID and Sample IDs
  const generateCCOrder = (manifestId) => {
    const now = new Date();
    const yearMonth = now.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit' }).replace('/', '');
    const orderNum = Math.floor(Math.random() * (1943 - 1073 + 1)) + 1073;
    const sampleStart = Math.floor(Math.random() * (5819 - 3413 + 1)) + 3413;
    
    const ccOrderId = `${yearMonth}NCTL${orderNum}.${sampleStart}`;
    
    setManifestData(prev => {
      const updated = { ...prev };
      if (!updated[manifestId]) {
        updated[manifestId] = {
          ccOrderId: '',
          notes: '',
          samples: {}
        };
      }
      
      updated[manifestId].ccOrderId = ccOrderId;
      
      // Generate CC IDs for each sample
      const manifest = manifests.find(m => m.manifestId === manifestId);
      if (manifest) {
        manifest.samples.forEach((sample, idx) => {
          if (!updated[manifestId].samples[idx]) {
            updated[manifestId].samples[idx] = {};
          }
          updated[manifestId].samples[idx].ccId = `${ccOrderId}-${idx + 1}`;
        });
      }
      
      return updated;
    });
  };
  
  const toggleSampleExpansion = (manifestId, sampleIndex) => {
    const key = `${manifestId}-${sampleIndex}`;
    setExpandedSamples(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleEditActiveManifest = (manifestId) => {
    setExpandedActiveManifests(prev => ({
      ...prev,
      [manifestId]: !prev[manifestId]
    }));
  };
  
  const handleUpdateActiveManifest = (manifestId) => {
    // Update the manifest data in receivedManifests
    const data = manifestData[manifestId];
    console.log('Updating active manifest:', manifestId, data);
    
    setReceivedManifests(prev => prev.map(manifest => 
      manifest.manifestId === manifestId 
        ? { ...manifest, manifestData: data, lastUpdated: new Date() }
        : manifest
    ));
    
    // Close the edit interface
    setExpandedActiveManifests(prev => ({
      ...prev,
      [manifestId]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full px-2 py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
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
                  Ohio
                </button>
                <button
                  onClick={() => setSelectedState('michigan')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedState === 'michigan' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Michigan
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
          
          {/* Sub-navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => handleTabChange('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pending'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pending Receipt
              </button>
              <button
                onClick={() => handleTabChange('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Manifests
              </button>
              <button
                onClick={() => handleTabChange('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Manifest History
              </button>
            </nav>
          </div>
        </div>

        {/* Summary Statistics */}
        {dashboardStats && (
            <div className="grid grid-cols-6 gap-3">
              {/* Total Manifests */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalManifests}</span>
                </div>
                <p className="text-xs text-gray-600">Total Manifests</p>
                <p className="text-xs text-blue-600 font-medium">{dashboardStats.pendingReceipt} pending receipt</p>
              </div>
              
              {/* Total Samples */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalSamples}</span>
                </div>
                <p className="text-xs text-gray-600">Total Samples</p>
                <p className="text-xs text-gray-500">~{dashboardStats.avgSamplesPerManifest} per manifest</p>
              </div>
              
              {/* Active Clients */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-900">{dashboardStats.totalClients}</span>
                </div>
                <p className="text-xs text-gray-600">Active Clients</p>
                <p className="text-xs text-gray-500">{dashboardStats.receivedToday} received today</p>
              </div>
              
              {/* Rush Orders */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="text-2xl font-bold text-red-600">{dashboardStats.priorityBreakdown.rush}</span>
                </div>
                <p className="text-xs text-gray-600">Rush Orders</p>
                <p className="text-xs text-gray-500">{dashboardStats.dpmEarlyStartCount} DPM early start</p>
              </div>
              
              {/* In Transit */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-600">{dashboardStats.statusBreakdown.in_transit}</span>
                </div>
                <p className="text-xs text-gray-600">In Transit</p>
                <p className="text-xs text-gray-500">{dashboardStats.statusBreakdown.scheduled} scheduled</p>
              </div>
              
              {/* Retests */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <RefreshCw className="w-4 h-4 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{dashboardStats.retestCount}</span>
                </div>
                <p className="text-xs text-gray-600">Retests</p>
                <p className="text-xs text-gray-500">Across all manifests</p>
              </div>
            </div>
          )}
        </div>



        {/* Arrival Timeline, Test Categories, and DPM Early Start */}
        {dashboardStats && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* Arrival Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Timer className="w-4 h-4 mr-2" />
                Arrival Timeline
              </h3>
              {dashboardStats.upcomingArrivals.length > 0 ? (
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {dashboardStats.upcomingArrivals.slice(0, 6).map((arrival, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-700 truncate max-w-[140px]" title={arrival.client}>
                        {arrival.client}
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatLocalTime(arrival.eta)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No upcoming arrivals</p>
              )}
            </div>
            
            {/* Test Category Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <FlaskConical className="w-4 h-4 mr-2" />
                Test Categories
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {Object.entries(dashboardStats.testCategoryBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 6)
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 truncate max-w-[140px]" title={category}>
                        {category.replace('Dispensary Plant Material', 'DPM')
                          .replace('Non-Solvent Product (Not Previously Tested)', 'NSPNPT')
                          .replace('Solvent Based Product (Not Previously Tested)', 'SBPNPT')
                          .replace('Voluntary Testing - Terpenes', 'Terpenes')}
                      </span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
            {/* DPM Early Start Samples */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-purple-600" />
                DPM Early Start
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {(() => {
                  const dpmSamples = [];
                  manifests.forEach(manifest => {
                    manifest.samples.forEach((sample, idx) => {
                      const sampleData = manifestData[manifest.manifestId]?.samples[idx];
                      if (sample.requiresDPMEarlyStart || sampleData?.dpmEarlyStart) {
                        dpmSamples.push({
                          manifestId: manifest.manifestId,
                          client: manifest.customerFacility,
                          sampleName: sample.itemName,
                          strain: sample.strain,
                          metrcTag: sample.metrcTag,
                          status: manifest.status,
                          eta: manifest.eta
                        });
                      }
                    });
                  });
                  
                  if (dpmSamples.length === 0) {
                    return <p className="text-xs text-gray-500">No DPM Early Start samples currently</p>;
                  }
                  
                  return dpmSamples.slice(0, 4).map((dpm, idx) => (
                    <div key={idx} className="border-l-4 border-purple-500 pl-2 py-1 bg-purple-50 rounded-r">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate" title={dpm.client}>
                            {dpm.client}
                          </p>
                          <p className="text-xs text-gray-600 truncate" title={dpm.sampleName}>
                            {dpm.strain} • {dpm.sampleName.substring(0, 20)}...
                          </p>
                        </div>
                        <div className="text-right ml-2">
                          {dpm.status === 'in_transit' && (
                            <p className="text-xs font-medium text-purple-600">
                              {(() => {
                                const minutesUntil = Math.floor((new Date(dpm.eta) - currentTime) / 60000);
                                if (minutesUntil < 0) return 'Now';
                                if (minutesUntil < 60) return `${minutesUntil}m`;
                                return `${Math.floor(minutesUntil / 60)}h`;
                              })()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
        

        {/* Tab Content */}
        {activeTab === 'pending' && (
          <>
            {/* Manifests Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-medium text-gray-900">Pending Manifests</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manifest #</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Samples</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Categories</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manifests.map(manifest => {
                  const categoryCounts = {};
                  manifest.samples.forEach(sample => {
                    const cat = sample.testCategory || 'Unknown';
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                  });
                  
                  return (
                    <React.Fragment key={manifest.manifestId}>
                      <tr className={expandedReceiving[manifest.manifestId] ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                          {manifest.manifestId}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {manifest.customerFacility}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border inline-flex items-center ${
                            getStatusColor(manifest.status)
                          }`}>
                            {manifest.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-900">{manifest.packageCount}</span>
                            {manifest.priority === 'rush' && <Zap className="w-3 h-3 text-red-600" />}
                            {manifest.hasDPMEarlyStart && (
                              <span className="text-purple-600 text-xs font-bold">DPM</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatLocalTime(manifest.eta)}</div>
                          {manifest.status === 'in_transit' && (
                            <div className="text-xs text-blue-600">
                              {(() => {
                                const minutesUntil = Math.floor((new Date(manifest.eta) - currentTime) / 60000);
                                if (minutesUntil < 0) return 'Overdue';
                                if (minutesUntil < 60) return `${minutesUntil}m`;
                                return `${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m`;
                              })()}
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {Object.entries(categoryCounts).slice(0, 2).map(([cat, count]) => (
                              <span key={cat} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                                {cat.replace('Dispensary Plant Material', 'DPM').substring(0, 15)}{cat.length > 15 ? '...' : ''} ({count})
                              </span>
                            ))}
                            {Object.keys(categoryCounts).length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-200 text-gray-600">
                                +{Object.keys(categoryCounts).length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {manifest.customerFacilityLicense}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReceiveClick(manifest);
                            }}
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            {expandedReceiving[manifest.manifestId] ? 'Close' : 'Receive'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Receiving Interface Row */}
                      {expandedReceiving[manifest.manifestId] && (
                        <tr>
                          <td colSpan="9" className="px-3 py-4 bg-gray-50">
                            <div className="border border-gray-200 rounded-lg p-4 bg-white mx-auto" style={{ maxWidth: '75%' }}>
                    {/* Sample Table */}
                    <div className="overflow-x-auto relative">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                            <th className="py-2 px-2 text-left"></th>
                            <th className="py-2 px-2 text-left">#</th>
                            <th className="py-2 px-2 text-left">CC ID</th>
                            <th className="py-2 px-2 text-left">METRC Tag</th>
                            <th className="py-2 px-2 text-left">Strain</th>
                            <th className="py-2 px-2 text-left">Source Package</th>
                            <th className="py-2 px-2 text-left">Item Name</th>
                            <th className="py-2 px-2 text-left">Item Category</th>
                            <th className="py-2 px-2 text-left">Test Category</th>
                            <th className="py-2 px-2 text-left">
                              <span title="Earliest deadline among all selected assays">Goal Due</span>
                            </th>
                            <th className="py-2 px-2 text-left">Final Reporting Due</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {manifest.samples.map((sample, idx) => {
                            const sampleData = manifestData[manifest.manifestId]?.samples[idx] || {};
                            const sampleKey = `${manifest.manifestId}-${idx}`;
                            const isExpanded = expandedSamples[sampleKey];
                            
                            return (
                              <React.Fragment key={idx}>
                                <tr className={`hover:bg-gray-50 text-sm ${sampleData.isRetest ? 'bg-yellow-50' : ''}`}>
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
                                  <td className="py-2 px-2">
                                    <div className="flex items-center space-x-1">
                                      <span className="text-gray-600">{idx + 1}</span>
                                      {sampleData.isRush && <Zap className="w-3 h-3 text-red-600" title="Rush - Due earlier than standard turnaround" />}
                                      {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">DPM</span>}
                                      {sampleData.retest && <RefreshCw className="w-3 h-3 text-orange-600" />}
                                      {sampleData.isRetest && <span className="px-1.5 py-0.5 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">RETEST</span>}
                                    </div>
                                  </td>
                                  <td className="py-2 px-2">
                                    <input
                                      type="text"
                                      value={sampleData.ccId || ''}
                                      onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'ccId', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                      placeholder="CC ID"
                                    />
                                  </td>
                                  <td className="py-2 px-2 font-mono text-xs" title={sample.metrcTag}>
                                    ...{sample.metrcTag.slice(-5)}
                                  </td>
                                  <td className="py-2 px-2 text-xs" title={sample.strain || 'N/A'}>
                                    {(sample.strain || 'N/A').substring(0, 15)}{(sample.strain || '').length > 15 ? '...' : ''}
                                  </td>
                                  <td className="py-2 px-2 font-mono text-xs" title={sample.sourcePackage || generateMockSourcePackage()}>
                                    ...{(sample.sourcePackage || generateMockSourcePackage()).slice(-5)}
                                  </td>
                                  <td className="py-2 px-2" title={sample.itemName}>
                                    <span className="text-sm">{sample.itemName.substring(0, 30)}{sample.itemName.length > 30 ? '...' : ''}</span>
                                  </td>
                                  <td className="py-2 px-2 text-xs">{sample.itemCategory || getItemCategory(sample.itemName)}</td>
                                  <td className="py-2 px-2">
                                    <select
                                      value={sampleData.testCategory || 'Dispensary Plant Material'}
                                      onChange={(e) => {
                                        handleTestCategoryChange(manifest.manifestId, idx, e.target.value);
                                        // Update due dates when test category changes
                                        const sampleAssays = manifestData[manifest.manifestId]?.samples[idx]?.assays || {};
                                        const sampleDeadlines = manifestData[manifest.manifestId]?.samples[idx]?.assayDeadlines || {};
                                        const allDeadlines = getAllAssayDeadlines(e.target.value, manifest.createdDate, sampleAssays, sampleDeadlines);
                                        
                                        setManifestData(prev => {
                                          const updated = { ...prev };
                                          if (updated[manifest.manifestId]?.samples[idx]) {
                                            updated[manifest.manifestId].samples[idx].earliestDeadline = allDeadlines.earliestDeadline || '';
                                            updated[manifest.manifestId].samples[idx].earliestAssayName = allDeadlines.earliestAssay || '';
                                            updated[manifest.manifestId].samples[idx].allDeadlines = allDeadlines.deadlines || [];
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
                                    <div className="relative group">
                                      <div className="flex items-center space-x-1">
                                        <input
                                          type="datetime-local"
                                          value={toDateTimeLocal(sampleData.earliestDeadline) || ''}
                                          onChange={(e) => {
                                            handleSampleDataChange(manifest.manifestId, idx, 'earliestDeadline', fromDateTimeLocal(e.target.value));
                                            handleSampleDataChange(manifest.manifestId, idx, 'microDue', fromDateTimeLocal(e.target.value));
                                          }}
                                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                          title={`Earliest: ${sampleData.groupedDeadlines?.groups?.[0]?.assays.map(a => a.name).join(', ') || 'No assays selected'}`}
                                        />
                                        {sampleData.groupedDeadlines?.hasVariability && (
                                          <AlertCircle className="w-3 h-3 text-orange-500 flex-shrink-0" title="Assays have different deadlines" />
                                        )}
                                      </div>
                                      {/* Hover tooltip showing grouped deadlines */}
                                      {sampleData.groupedDeadlines?.groups?.length > 0 && (
                                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 pointer-events-none">
                                          <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 min-w-[250px] shadow-lg">
                                            <div className="font-medium mb-2">Assay Deadline Groups:</div>
                                            {sampleData.groupedDeadlines.groups.map((group, i) => (
                                              <div key={i} className="mb-2 pb-2 border-b border-gray-700 last:border-0">
                                                <div className="flex justify-between items-center mb-1">
                                                  <span className={`font-medium ${i === 0 ? 'text-yellow-300' : 'text-gray-300'}`}>
                                                    {new Date(group.deadline).toLocaleString('en-US', { 
                                                      month: 'short', 
                                                      day: 'numeric', 
                                                      hour: '2-digit', 
                                                      minute: '2-digit' 
                                                    })}
                                                  </span>
                                                  {group.isMicrobial && <span className="text-xs bg-purple-600 px-1 rounded">Micro</span>}
                                                  {group.isChemistry && <span className="text-xs bg-blue-600 px-1 rounded">Chem</span>}
                                                </div>
                                                <div className="text-gray-400 text-xs">
                                                  {group.assays.map(a => a.name).join(', ')}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-2 px-2">
                                    <input
                                      type="datetime-local"
                                      value={toDateTimeLocal(sampleData.reportingDue || sampleData.earliestDeadline || '') || ''}
                                      onChange={(e) => {
                                        handleSampleDataChange(manifest.manifestId, idx, 'reportingDue', fromDateTimeLocal(e.target.value));
                                      }}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                      placeholder="Reporting deadline"
                                    />
                                  </td>
                                </tr>
                            
                                {/* Expanded Section */}
                                {isExpanded && (
                                  <tr>
                                    <td colSpan="11" className="p-4 bg-gray-50">
                                      {/* Assign Sample Type and Additional Options in same row */}
                                      <div className="flex gap-6 mb-4">
                                        {/* Assign Sample Type */}
                                        <div className="flex-1">
                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Assign Sample Type <span className="text-red-500">*</span>
                                          </label>
                                          <select
                                            value={sampleData.nctlSampleType || ''}
                                            onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'nctlSampleType', e.target.value)}
                                            className={`w-full max-w-xs px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                              !sampleData.nctlSampleType ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            required
                                          >
                                            <option value="">Select Sample Type...</option>
                                            <option value="Flower">Flower</option>
                                            <option value="Shake/Trim">Shake/Trim</option>
                                            <option value="Concentrate">Concentrate</option>
                                            <option value="Rosin">Rosin</option>
                                            <option value="Resin">Resin</option>
                                            <option value="Vape Cart">Vape Cart</option>
                                            <option value="Gummy">Gummy</option>
                                            <option value="Brownie">Brownie</option>
                                            <option value="Tincture">Tincture</option>
                                          </select>
                                        </div>
                                        
                                        {/* Additional Options */}
                                        <div className="flex-1">
                                          <div className="flex items-center mb-1">
                                            <h4 className="text-sm font-medium text-gray-700">Additional Options</h4>
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
                                            {currentState === 'Michigan' && (
                                              <label className="flex items-center">
                                                <input
                                                  type="checkbox"
                                                  checked={sampleData.isRetest || false}
                                                  onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'isRetest', e.target.checked)}
                                                  className="mr-2 h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                                />
                                                <span className="text-sm">Michigan Retest</span>
                                                {sampleData.isRetest && (
                                                  <Info className="w-3 h-3 text-yellow-600 ml-2" title="Single-analyte testing only" />
                                                )}
                                              </label>
                                            )}
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
                                            <label className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={sampleData.isRush || false}
                                                onChange={(e) => {
                                                  handleSampleDataChange(manifest.manifestId, idx, 'isRush', e.target.checked);
                                                  // Recalculate deadlines
                                                  handleAssayChange(manifest.manifestId, idx, 'dummy', false);
                                                }}
                                                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                              />
                                              <span className="text-sm flex items-center">
                                                Rush <Zap className="w-3 h-3 text-red-600 ml-1" />
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Individual Assay Details Table */}
                                      <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Individual Assay Deadlines</h4>
                                        <div className="overflow-x-auto">
                                          <table className="min-w-full border border-gray-200">
                                            <thead className="bg-gray-50">
                                              <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                <th className="py-2 px-3 text-left border-b">Assay</th>
                                                <th className="py-2 px-3 text-left border-b">Category</th>
                                                <th className="py-2 px-3 text-left border-b">Goal Due</th>
                                                <th className="py-2 px-3 text-left border-b">Final Reporting Due</th>
                                              </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                              {/* Render all possible assays */}
                                              {[
                                                { key: 'salmonella', name: 'Salmonella', type: 'microbial' },
                                                { key: 'stec', name: 'STEC', type: 'microbial' },
                                                { key: 'totalAerobicBacteria', name: 'Total Aerobic', type: 'microbial' },
                                                { key: 'totalColiforms', name: 'Total Coliforms', type: 'microbial' },
                                                { key: 'totalYeastMold', name: 'Total Yeast & Mold', type: 'microbial' },
                                                { key: 'btgn', name: 'BTGN', type: 'microbial' },
                                                { key: 'cannabinoids', name: 'Cannabinoids', type: 'chemistry' },
                                                { key: 'terpenes', name: 'Terpenes', type: 'chemistry' },
                                                { key: 'pesticides', name: 'Pesticides', type: 'chemistry' },
                                                { key: 'mycotoxins', name: 'Mycotoxins', type: 'chemistry' },
                                                { key: 'heavyMetals', name: 'Heavy Metals', type: 'chemistry' },
                                                { key: 'elementalAnalysis', name: 'Elemental Analysis', type: 'chemistry' },
                                                { key: 'totalNitrogen', name: 'Total Nitrogen', type: 'chemistry' },
                                                { key: 'totalSulfur', name: 'Total Sulfur', type: 'chemistry' },
                                                { key: 'residualSolvents', name: 'Residual Solvents', type: 'chemistry' },
                                                { key: 'foreignMatter', name: 'Foreign Matter', type: 'other' },
                                                { key: 'moistureContent', name: 'Moisture Content', type: 'other' },
                                                { key: 'waterActivity', name: 'Water Activity', type: 'other' },
                                                { key: 'plantPathogens', name: 'Plant Pathogens', type: 'other' },
                                                { key: 'plantSex', name: 'Plant Sex', type: 'other' }
                                              ].map(assay => {
                                                const isSelected = sampleData.assays?.[assay.key] || false;
                                                // Calculate default deadline for this assay
                                                const calculatedDeadline = isSelected && manifest 
                                                  ? calculateAssayDeadline(manifest.createdDate, assay.key, sampleData.isRush)
                                                  : null;
                                                const customDeadline = sampleData.assayDeadlines?.[assay.key];
                                                const goalDeadline = customDeadline || calculatedDeadline || '';
                                                // Calculate reporting deadline as 1 business day after goal deadline
                                                const calculateReportingDeadline = (goalDate) => {
                                                  if (!goalDate) return '';
                                                  const goal = new Date(goalDate);
                                                  const reporting = new Date(goal);
                                                  reporting.setDate(reporting.getDate() + 1);
                                                  // Skip weekends
                                                  if (reporting.getDay() === 6) reporting.setDate(reporting.getDate() + 2);
                                                  if (reporting.getDay() === 0) reporting.setDate(reporting.getDate() + 1);
                                                  return reporting.toISOString();
                                                };
                                                const defaultReportingDeadline = calculateReportingDeadline(goalDeadline);
                                                const reportingDeadline = sampleData.assayReportingDeadlines?.[assay.key] || defaultReportingDeadline;
                                                
                                                return (
                                                  <tr key={assay.key} className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                                    <td className="py-2 px-3 text-sm">
                                                      <label className="flex items-center">
                                                        <input
                                                          type="checkbox"
                                                          checked={isSelected}
                                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, assay.key, e.target.checked)}
                                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                        />
                                                        <span className={isSelected ? 'font-medium' : ''}>{assay.name}</span>
                                                      </label>
                                                    </td>
                                                    <td className="py-2 px-3 text-sm">
                                                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                        assay.type === 'microbial' ? 'bg-purple-100 text-purple-800' : 
                                                        assay.type === 'chemistry' ? 'bg-blue-100 text-blue-800' : 
                                                        'bg-gray-100 text-gray-800'
                                                      }`}>
                                                        {assay.type === 'microbial' ? 'Micro' : 
                                                         assay.type === 'chemistry' ? 'Chemistry' : 
                                                         'Other'}
                                                      </span>
                                                    </td>
                                                    <td className="py-2 px-3">
                                                      <div className="relative">
                                                        <input
                                                          type="datetime-local"
                                                          value={toDateTimeLocal(goalDeadline) || ''}
                                                          onChange={(e) => handleAssayDeadlineChange(manifest.manifestId, idx, assay.key, fromDateTimeLocal(e.target.value))}
                                                          disabled={!isSelected}
                                                          className={`w-full px-2 py-1 border rounded text-xs ${
                                                            isSelected 
                                                              ? customDeadline ? 'border-orange-300 bg-orange-50' : 'border-gray-300 bg-white'
                                                              : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                                          }`}
                                                          title={customDeadline ? 'Custom deadline' : 'Calculated deadline'}
                                                        />
                                                        {isSelected && customDeadline && (
                                                          <button
                                                            onClick={() => handleAssayDeadlineChange(manifest.manifestId, idx, assay.key, null)}
                                                            className="absolute right-1 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800"
                                                            title="Reset to default"
                                                          >
                                                            <X className="w-3 h-3" />
                                                          </button>
                                                        )}
                                                      </div>
                                                    </td>
                                                    <td className="py-2 px-3">
                                                      <input
                                                        type="datetime-local"
                                                        value={toDateTimeLocal(reportingDeadline) || ''}
                                                        onChange={(e) => {
                                                          // Handle reporting deadline change
                                                          setManifestData(prev => {
                                                            const updated = { ...prev };
                                                            if (!updated[manifest.manifestId].samples[idx].assayReportingDeadlines) {
                                                              updated[manifest.manifestId].samples[idx].assayReportingDeadlines = {};
                                                            }
                                                            updated[manifest.manifestId].samples[idx].assayReportingDeadlines[assay.key] = fromDateTimeLocal(e.target.value);
                                                            return updated;
                                                          });
                                                        }}
                                                        disabled={!isSelected}
                                                        className={`w-full px-2 py-1 border rounded text-xs ${
                                                          isSelected 
                                                            ? 'border-gray-300 bg-white' 
                                                            : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                                        }`}
                                                      />
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>

                                      {/* Michigan Retest Analyte Selection */}
                                      {currentState === 'Michigan' && sampleData.isRetest && (
                                        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                                            <FlaskConical className="w-4 h-4 text-yellow-600 mr-2" />
                                            Select Specific Analytes for Retest
                                            <span className="ml-2 text-xs text-yellow-700 font-normal">
                                              Only selected analytes will be tested
                                            </span>
                                          </h4>
                                          <div className="space-y-4">
                                            {Object.entries(sampleData.assays || {}).filter(([_, isSelected]) => isSelected).map(([assayKey]) => {
                                              const analytes = getAnalytesForAssay(assayKey);
                                              const whitelisted = sampleData.whitelistedAnalytes?.[assayKey] || [];
                                              
                                              if (analytes.length === 0) return null;
                                              
                                              return (
                                                <div key={assayKey} className="border border-gray-200 rounded-lg p-3 bg-white">
                                                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                                                    {getAssayDisplayName(assayKey)}
                                                    {whitelisted.length > 0 && (
                                                      <span className="ml-2 text-xs text-yellow-600">
                                                        ({whitelisted.length} selected)
                                                      </span>
                                                    )}
                                                  </h5>
                                                  <div className="grid grid-cols-4 gap-2">
                                                    {analytes.map(analyte => (
                                                      <label 
                                                        key={analyte.key} 
                                                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                                                          whitelisted.includes(analyte.key) ? 'bg-yellow-100 border border-yellow-300' : 'hover:bg-gray-50 border border-gray-200'
                                                        }`}
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          checked={whitelisted.includes(analyte.key)}
                                                          onChange={(e) => handleSampleDataChange(
                                                            manifest.manifestId, 
                                                            idx, 
                                                            `analyte_${assayKey}_${analyte.key}`, 
                                                            e.target.checked
                                                          )}
                                                          className="h-3 w-3 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                                        />
                                                        <span className="text-xs" title={analyte.fullName}>
                                                          {analyte.name}
                                                        </span>
                                                      </label>
                                                    ))}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}

                                      {/* Deadline Summary */}
                                      {sampleData.groupedDeadlines?.hasVariability && (
                                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                            <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                                            Assay Deadline Summary
                                          </h4>
                                          <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Microbial Due:</span>
                                              <span className="font-medium">{sampleData.microDue ? formatDueDate(sampleData.microDue) : 'Not set'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Chemistry Due:</span>
                                              <span className="font-medium">{sampleData.chemistryDue ? formatDueDate(sampleData.chemistryDue) : 'Not set'}</span>
                                            </div>
                                            <div className="mt-2 text-gray-500">
                                              Note: Different assays within each category may have varying deadlines. See individual assay table below for details.
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      
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
                    
                    {/* Notes and Manifest Actions */}
                    <div className="mt-4">
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Notes:</label>
                        <input
                          type="text"
                          value={manifestData[manifest.manifestId]?.notes || ''}
                          onChange={(e) => handleManifestDataChange(manifest.manifestId, 'notes', e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter any notes about this manifest"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => generateCCOrder(manifest.manifestId)}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                          Generate Order on Confident Cannabis
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
                        <button
                          onClick={() => {
                            // Apply Rush to all samples
                            const updatedData = { ...manifestData[manifest.manifestId] };
                            Object.keys(updatedData.samples || {}).forEach(idx => {
                              updatedData.samples[idx].isRush = true;
                              // Recalculate deadlines for each sample
                              const testCategory = updatedData.samples[idx].testCategory || 'Dispensary Plant Material';
                              const assays = updatedData.samples[idx].assays || {};
                              const allDeadlines = getAllAssayDeadlines(
                                testCategory,
                                manifest.createdDate,
                                assays,
                                updatedData.samples[idx].assayDeadlines || {},
                                true // isRush
                              );
                              updatedData.samples[idx].earliestDeadline = allDeadlines.earliestDeadline || '';
                              updatedData.samples[idx].earliestAssayName = allDeadlines.earliestAssay || '';
                              updatedData.samples[idx].allDeadlines = allDeadlines.deadlines || [];
                            });
                            setManifestData(prev => ({
                              ...prev,
                              [manifest.manifestId]: updatedData
                            }));
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex items-center"
                        >
                          Rush All <Zap className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        Refresh Manifest
                      </button>
                      <button
                        onClick={() => handleReceiveManifest(manifest.manifestId)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Active Manifests Tab */}
        {activeTab === 'active' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {receivedManifests.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Manifests</h3>
                <p className="text-gray-500">Manifests will appear here after they are received</p>
              </div>
            ) : (
              <>
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-sm font-medium text-gray-900">Active Manifests ({receivedManifests.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manifest #</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Samples</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received By</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Progress</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC Order</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {receivedManifests.map(manifest => {
                        const ccOrderId = manifest.manifestData?.ccOrderId || 'Not Generated';
                        const samplesInTesting = manifest.samples.filter(s => s.status !== 'complete').length;
                        const totalSamples = manifest.samples.length;
                        const progressPercent = ((totalSamples - samplesInTesting) / totalSamples) * 100;
                        
                        return (
                          <Fragment key={manifest.manifestId}>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {manifest.manifestId}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {manifest.customerFacility}
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {totalSamples}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                {manifest.receivedAt.toLocaleString()}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                {manifest.receivedBy}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-gray-600">
                                    {samplesInTesting}/{totalSamples} active
                                  </span>
                                </div>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm">
                                <span className={`font-mono ${ccOrderId === 'Not Generated' ? 'text-gray-400' : 'text-gray-900'}`}>
                                  {ccOrderId}
                                </span>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm">
                                <button
                                  className="text-blue-600 hover:text-blue-900 font-medium"
                                  onClick={() => handleEditActiveManifest(manifest.manifestId)}
                                >
                                  {expandedActiveManifests[manifest.manifestId] ? 'Close' : 'Edit'}
                                </button>
                              </td>
                            </tr>
                            {expandedActiveManifests[manifest.manifestId] && (
                              <tr>
                                <td colSpan="8" className="px-3 py-4 bg-gray-50">
                                  <div className="max-w-7xl mx-auto">
                                    <div className="mb-4 flex justify-between items-center">
                                      <h3 className="text-lg font-medium text-gray-900">
                                        Edit Manifest {manifest.manifestId}
                                      </h3>
                                      <button
                                        onClick={() => handleUpdateActiveManifest(manifest.manifestId)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                                      >
                                        Save Changes
                                      </button>
                                    </div>
                                    {/* Sample Table */}
                                    <div className="overflow-x-auto relative">
                                      <table className="min-w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                          <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                            <th className="py-2 px-2 text-left"></th>
                                            <th className="py-2 px-2 text-left">#</th>
                                            <th className="py-2 px-2 text-left">CC ID</th>
                                            <th className="py-2 px-2 text-left">METRC Tag</th>
                                            <th className="py-2 px-2 text-left">Strain</th>
                                            <th className="py-2 px-2 text-left">Source Package</th>
                                            <th className="py-2 px-2 text-left">Item Name</th>
                                            <th className="py-2 px-2 text-left">Item Category</th>
                                            <th className="py-2 px-2 text-left">Test Category</th>
                                            <th className="py-2 px-2 text-left">
                                              <span title="Earliest deadline among all selected assays">Goal Due</span>
                                            </th>
                                            <th className="py-2 px-2 text-left">Final Reporting Due</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                          {manifest.samples.map((sample, idx) => {
                                            const sampleData = manifestData[manifest.manifestId]?.samples?.[idx] || {};
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
                                                  <td className="py-2 px-2">
                                                    <div className="flex items-center space-x-1">
                                                      <span className="text-gray-600">{idx + 1}</span>
                                                      {sampleData.isRush && <Zap className="w-3 h-3 text-red-600" title="Rush - Due earlier than standard turnaround" />}
                                                      {sampleData.dpmEarlyStart && <span className="text-purple-600 text-xs font-bold">DPM</span>}
                                                      {sampleData.retest && <RefreshCw className="w-3 h-3 text-orange-600" />}
                                                    </div>
                                                  </td>
                                                  <td className="py-2 px-2">
                                                    <input
                                                      type="text"
                                                      value={sampleData.ccId || ''}
                                                      onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'ccId', e.target.value)}
                                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                      placeholder="CC ID"
                                                    />
                                                  </td>
                                                  <td className="py-2 px-2 font-mono text-xs" title={sample.metrcTag}>
                                                    ...{sample.metrcTag.slice(-5)}
                                                  </td>
                                                  <td className="py-2 px-2 text-xs" title={sample.strain || 'N/A'}>
                                                    {(sample.strain || 'N/A').substring(0, 15)}{(sample.strain || '').length > 15 ? '...' : ''}
                                                  </td>
                                                  <td className="py-2 px-2 font-mono text-xs" title={sample.sourcePackage || generateMockSourcePackage()}>
                                                    ...{(sample.sourcePackage || generateMockSourcePackage()).slice(-5)}
                                                  </td>
                                                  <td className="py-2 px-2" title={sample.itemName}>
                                                    <span className="text-sm">{sample.itemName.substring(0, 30)}{sample.itemName.length > 30 ? '...' : ''}</span>
                                                  </td>
                                                  <td className="py-2 px-2 text-xs">{sample.itemCategory || getItemCategory(sample.itemName)}</td>
                                                  <td className="py-2 px-2">
                                                    <select
                                                      value={sampleData.testCategory || 'Dispensary Plant Material'}
                                                      onChange={(e) => {
                                                        handleTestCategoryChange(manifest.manifestId, idx, e.target.value);
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
                                                    <div className="relative group">
                                                      <div className="flex items-center space-x-1">
                                                        <input
                                                          type="datetime-local"
                                                          value={toDateTimeLocal(sampleData.earliestDeadline) || ''}
                                                          onChange={(e) => {
                                                            handleSampleDataChange(manifest.manifestId, idx, 'earliestDeadline', fromDateTimeLocal(e.target.value));
                                                            handleSampleDataChange(manifest.manifestId, idx, 'microDue', fromDateTimeLocal(e.target.value));
                                                          }}
                                                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                          title={`Earliest: ${sampleData.groupedDeadlines?.groups?.[0]?.assays.map(a => a.name).join(', ') || 'No assays selected'}`}
                                                        />
                                                        {sampleData.groupedDeadlines?.hasVariability && (
                                                          <AlertCircle className="w-3 h-3 text-orange-500 flex-shrink-0" title="Assays have different deadlines" />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </td>
                                                  <td className="py-2 px-2">
                                                    <input
                                                      type="datetime-local"
                                                      value={toDateTimeLocal(sampleData.reportingDue || sampleData.earliestDeadline || '') || ''}
                                                      onChange={(e) => {
                                                        handleSampleDataChange(manifest.manifestId, idx, 'reportingDue', fromDateTimeLocal(e.target.value));
                                                      }}
                                                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                      placeholder="Reporting deadline"
                                                    />
                                                  </td>
                                                </tr>
                                            
                                                {/* Expanded Section */}
                                                {isExpanded && (
                                                  <tr>
                                                    <td colSpan="11" className="p-4 bg-gray-50">
                                                      {/* Assign Sample Type and Additional Options in same row */}
                                                      <div className="flex gap-6 mb-4">
                                                        {/* Assign Sample Type */}
                                                        <div className="flex-1">
                                                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Assign Sample Type <span className="text-red-500">*</span>
                                                          </label>
                                                          <select
                                                            value={sampleData.nctlSampleType || ''}
                                                            onChange={(e) => handleSampleDataChange(manifest.manifestId, idx, 'nctlSampleType', e.target.value)}
                                                            className={`w-full max-w-xs px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                                              !sampleData.nctlSampleType ? 'border-red-300' : 'border-gray-300'
                                                            }`}
                                                            required
                                                          >
                                                            <option value="">Select Sample Type...</option>
                                                            <option value="Flower">Flower</option>
                                                            <option value="Shake/Trim">Shake/Trim</option>
                                                            <option value="Concentrate">Concentrate</option>
                                                            <option value="Rosin">Rosin</option>
                                                            <option value="Resin">Resin</option>
                                                            <option value="Vape Cart">Vape Cart</option>
                                                            <option value="Gummy">Gummy</option>
                                                            <option value="Brownie">Brownie</option>
                                                            <option value="Tincture">Tincture</option>
                                                            <option value="Chocolate">Chocolate</option>
                                                            <option value="Cookie">Cookie</option>
                                                            <option value="Beverage">Beverage</option>
                                                            <option value="Capsule">Capsule</option>
                                                            <option value="Oil">Oil</option>
                                                            <option value="Topical">Topical</option>
                                                            <option value="Pre-Roll">Pre-Roll</option>
                                                            <option value="Infused Pre-Roll">Infused Pre-Roll</option>
                                                            <option value="Hash">Hash</option>
                                                            <option value="Kief">Kief</option>
                                                            <option value="Isolate">Isolate</option>
                                                          </select>
                                                        </div>
                                                        
                                                        {/* Additional Options */}
                                                        <div className="flex-1">
                                                          <div className="flex items-center mb-1">
                                                            <h4 className="text-sm font-medium text-gray-700">Additional Options</h4>
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
                                                            <label className="flex items-center">
                                                              <input
                                                                type="checkbox"
                                                                checked={sampleData.isRush || false}
                                                                onChange={(e) => {
                                                                  handleSampleDataChange(manifest.manifestId, idx, 'isRush', e.target.checked);
                                                                  // Recalculate deadlines
                                                                  handleAssayChange(manifest.manifestId, idx, 'dummy', false);
                                                                }}
                                                                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                                              />
                                                              <span className="text-sm flex items-center">
                                                                Rush <Zap className="w-3 h-3 text-red-600 ml-1" />
                                                              </span>
                                                            </label>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      
                                                      {/* Individual Assay Details Table */}
                                                      <div className="mb-4">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Individual Assay Deadlines</h4>
                                                        <div className="overflow-x-auto">
                                                          <table className="min-w-full border border-gray-200">
                                                            <thead className="bg-gray-50">
                                                              <tr className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                                <th className="py-2 px-3 text-left border-b">Assay</th>
                                                                <th className="py-2 px-3 text-left border-b">Category</th>
                                                                <th className="py-2 px-3 text-left border-b">Goal Due</th>
                                                                <th className="py-2 px-3 text-left border-b">Final Reporting Due</th>
                                                              </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                              {/* Render all possible assays */}
                                                              {[
                                                                { key: 'salmonella', name: 'Salmonella', type: 'microbial' },
                                                                { key: 'stec', name: 'STEC', type: 'microbial' },
                                                                { key: 'totalAerobicBacteria', name: 'Total Aerobic', type: 'microbial' },
                                                                { key: 'totalColiforms', name: 'Total Coliforms', type: 'microbial' },
                                                                { key: 'totalYeastMold', name: 'Total Yeast & Mold', type: 'microbial' },
                                                                { key: 'btgn', name: 'BTGN', type: 'microbial' },
                                                                { key: 'cannabinoids', name: 'Cannabinoids', type: 'chemistry' },
                                                                { key: 'terpenes', name: 'Terpenes', type: 'chemistry' },
                                                                { key: 'pesticides', name: 'Pesticides', type: 'chemistry' },
                                                                { key: 'mycotoxins', name: 'Mycotoxins', type: 'chemistry' },
                                                                { key: 'heavyMetals', name: 'Heavy Metals', type: 'chemistry' },
                                                                { key: 'elementalAnalysis', name: 'Elemental Analysis', type: 'chemistry' },
                                                                { key: 'totalNitrogen', name: 'Total Nitrogen', type: 'chemistry' },
                                                                { key: 'totalSulfur', name: 'Total Sulfur', type: 'chemistry' },
                                                                { key: 'residualSolvents', name: 'Residual Solvents', type: 'chemistry' },
                                                                { key: 'foreignMatter', name: 'Foreign Matter', type: 'other' },
                                                                { key: 'moistureContent', name: 'Moisture Content', type: 'other' },
                                                                { key: 'waterActivity', name: 'Water Activity', type: 'other' },
                                                                { key: 'plantPathogens', name: 'Plant Pathogens', type: 'other' },
                                                                { key: 'plantSex', name: 'Plant Sex', type: 'other' }
                                                              ].map(assay => {
                                                                const isSelected = sampleData.assays?.[assay.key] || false;
                                                                // Calculate default deadline for this assay
                                                                const calculatedDeadline = isSelected && manifest 
                                                                  ? calculateAssayDeadline(manifest.createdDate || manifest.receivedAt, assay.key, sampleData.isRush)
                                                                  : null;
                                                                const customDeadline = sampleData.assayDeadlines?.[assay.key];
                                                                const goalDeadline = customDeadline || calculatedDeadline || '';
                                                                // Calculate reporting deadline as 1 business day after goal deadline
                                                                const calculateReportingDeadline = (goalDate) => {
                                                                  if (!goalDate) return '';
                                                                  const goal = new Date(goalDate);
                                                                  const reporting = new Date(goal);
                                                                  reporting.setDate(reporting.getDate() + 1);
                                                                  // Skip weekends
                                                                  if (reporting.getDay() === 6) reporting.setDate(reporting.getDate() + 2);
                                                                  if (reporting.getDay() === 0) reporting.setDate(reporting.getDate() + 1);
                                                                  return reporting.toISOString();
                                                                };
                                                                const defaultReportingDeadline = calculateReportingDeadline(goalDeadline);
                                                                const reportingDeadline = sampleData.assayReportingDeadlines?.[assay.key] || defaultReportingDeadline;
                                                                
                                                                return (
                                                                  <tr key={assay.key} className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                                                    <td className="py-2 px-3 text-sm">
                                                                      <label className="flex items-center">
                                                                        <input
                                                                          type="checkbox"
                                                                          checked={isSelected}
                                                                          onChange={(e) => handleAssayChange(manifest.manifestId, idx, assay.key, e.target.checked)}
                                                                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                        />
                                                                        <span className={isSelected ? 'font-medium' : ''}>{assay.name}</span>
                                                                      </label>
                                                                    </td>
                                                                    <td className="py-2 px-3 text-sm">
                                                                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                                        assay.type === 'microbial' ? 'bg-purple-100 text-purple-800' : 
                                                                        assay.type === 'chemistry' ? 'bg-blue-100 text-blue-800' : 
                                                                        'bg-gray-100 text-gray-800'
                                                                      }`}>
                                                                        {assay.type === 'microbial' ? 'Micro' : 
                                                                         assay.type === 'chemistry' ? 'Chemistry' : 
                                                                         'Other'}
                                                                      </span>
                                                                    </td>
                                                                    <td className="py-2 px-3">
                                                                      <div className="relative">
                                                                        <input
                                                                          type="datetime-local"
                                                                          value={toDateTimeLocal(goalDeadline) || ''}
                                                                          onChange={(e) => handleAssayDeadlineChange(manifest.manifestId, idx, assay.key, fromDateTimeLocal(e.target.value))}
                                                                          disabled={!isSelected}
                                                                          className={`w-full px-2 py-1 border rounded text-xs ${
                                                                            isSelected 
                                                                              ? customDeadline ? 'border-orange-300 bg-orange-50' : 'border-gray-300 bg-white'
                                                                              : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                                                          }`}
                                                                          title={customDeadline ? 'Custom deadline' : 'Calculated deadline'}
                                                                        />
                                                                        {isSelected && customDeadline && (
                                                                          <button
                                                                            onClick={() => handleAssayDeadlineChange(manifest.manifestId, idx, assay.key, null)}
                                                                            className="absolute right-1 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800"
                                                                            title="Reset to default"
                                                                          >
                                                                            <X className="w-3 h-3" />
                                                                          </button>
                                                                        )}
                                                                      </div>
                                                                    </td>
                                                                    <td className="py-2 px-3">
                                                                      <input
                                                                        type="datetime-local"
                                                                        value={toDateTimeLocal(reportingDeadline) || ''}
                                                                        onChange={(e) => {
                                                                          // Handle reporting deadline change
                                                                          setManifestData(prev => {
                                                                            const updated = { ...prev };
                                                                            if (!updated[manifest.manifestId]?.samples?.[idx]) {
                                                                              if (!updated[manifest.manifestId]) updated[manifest.manifestId] = { samples: {} };
                                                                              if (!updated[manifest.manifestId].samples[idx]) updated[manifest.manifestId].samples[idx] = {};
                                                                            }
                                                                            if (!updated[manifest.manifestId].samples[idx].assayReportingDeadlines) {
                                                                              updated[manifest.manifestId].samples[idx].assayReportingDeadlines = {};
                                                                            }
                                                                            updated[manifest.manifestId].samples[idx].assayReportingDeadlines[assay.key] = fromDateTimeLocal(e.target.value);
                                                                            return updated;
                                                                          });
                                                                        }}
                                                                        disabled={!isSelected}
                                                                        className={`w-full px-2 py-1 border rounded text-xs ${
                                                                          isSelected 
                                                                            ? 'border-gray-300 bg-white' 
                                                                            : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                                                        }`}
                                                                      />
                                                                    </td>
                                                                  </tr>
                                                                );
                                                              })}
                                                            </tbody>
                                                          </table>
                                                        </div>
                                                      </div>

                                                      {/* Deadline Summary */}
                                                      {sampleData.groupedDeadlines?.hasVariability && (
                                                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                                          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                                            <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                                                            Assay Deadline Summary
                                                          </h4>
                                                          <div className="space-y-1 text-xs">
                                                            <div className="flex justify-between">
                                                              <span className="text-gray-600">Microbial Due:</span>
                                                              <span className="font-medium">{sampleData.microDue ? formatDueDate(sampleData.microDue) : 'Not set'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                              <span className="text-gray-600">Chemistry Due:</span>
                                                              <span className="font-medium">{sampleData.chemistryDue ? formatDueDate(sampleData.chemistryDue) : 'Not set'}</span>
                                                            </div>
                                                            <div className="mt-2 text-gray-500">
                                                              Note: Different assays within each category may have varying deadlines. See individual assay table above for details.
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )}

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
                                                                  checked={sampleData.uom === 'mg/g' || !sampleData.uom}
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
                                                                    const newTargets = [...(sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }])];
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
                                                                    const newTargets = [...(sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }])];
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
                                                                    const newTargets = [...(sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }])];
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
                                                                    const newTargets = [...(sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }])];
                                                                    newTargets[targetIdx] = { ...newTargets[targetIdx], rangeHigh: e.target.value };
                                                                    handleSampleDataChange(manifest.manifestId, idx, 'potencyTargets', newTargets);
                                                                  }}
                                                                  className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                                                                  placeholder="High"
                                                                />
                                                                {targetIdx === (sampleData.potencyTargets || [{ analyte: 'Total THC', target: '', rangeLow: '', rangeHigh: '' }]).length - 1 && (
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
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* Manifest History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Manifest History</h3>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="End date"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                  Search
                </button>
              </div>
            </div>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Search for historical manifests by date range</p>
            </div>
          </div>
        )}
      </div>
  );
};


export default Receiving1;