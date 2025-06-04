import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronRight, BarChart3, Calendar, Beaker, Grid, List, Package, FlaskConical, Building2, AlertCircle, CalendarDays, CalendarClock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [expandedBatches, setExpandedBatches] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});
  const [expandedDPMCustomers, setExpandedDPMCustomers] = useState({});
  const [expandedWorkflowStatuses, setExpandedWorkflowStatuses] = useState({});
  const [expandedDateSections, setExpandedDateSections] = useState({});
  const [viewModes, setViewModes] = useState({
    cannabinoids: 'order',
    terpenes: 'order',
    pesticides: 'order'
  }); // Pipeline-specific view modes
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for "Last Updated"
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getDueDateUrgency = (dueDate) => {
    if (!dueDate) return { 
      color: 'text-gray-500', 
      label: 'No due date',
      borderClass: 'border-gray-300',
      bgClass: 'bg-gray-50',
      icon: null
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    
    if (isNaN(due.getTime())) return { 
      color: 'text-gray-500', 
      label: 'Invalid date',
      borderClass: 'border-gray-300',
      bgClass: 'bg-gray-50',
      icon: null
    };
    
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { 
      color: 'text-red-700 font-bold', 
      label: 'OVERDUE',
      borderClass: 'border-red-700',
      bgClass: 'bg-red-50',
      icon: 'alert'
    };
    if (diffDays === 0) return { 
      color: 'text-orange-800 font-semibold', 
      label: 'TODAY',
      borderClass: 'border-orange-800',
      bgClass: 'bg-orange-50',
      icon: 'today'
    };
    if (diffDays === 1) return { 
      color: 'text-blue-700', 
      label: 'TOMORROW',
      borderClass: 'border-blue-700',
      bgClass: 'bg-blue-50',
      icon: 'tomorrow'
    };
    return { 
      color: 'text-gray-600', 
      label: `${diffDays} days`,
      borderClass: 'border-gray-400',
      bgClass: 'bg-gray-50',
      icon: null
    };
  };

  // Calculate goal date (one business day before reporting due)
  const getGoalDate = (reportingDue) => {
    if (!reportingDue) return null;
    const date = new Date(reportingDue);
    let businessDaysBack = 0;
    
    while (businessDaysBack < 1) {
      date.setDate(date.getDate() - 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDaysBack++;
      }
    }
    
    return date.toISOString().split('T')[0];
  };

  // Helper function to get business days in the past
  const getBusinessDaysAgo = (daysAgo) => {
    const date = new Date();
    let businessDaysCount = 0;
    
    while (businessDaysCount < daysAgo) {
      date.setDate(date.getDate() - 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
        businessDaysCount++;
      }
    }
    
    return date.toISOString().split('T')[0];
  };

  // Helper function to get future business days
  const getBusinessDaysFromNow = (daysFromNow) => {
    const date = new Date();
    let businessDaysCount = 0;
    
    while (businessDaysCount < daysFromNow) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
        businessDaysCount++;
      }
    }
    
    return date.toISOString().split('T')[0];
  };

  // Get various dates for mock data
  const today = new Date().toISOString().split('T')[0];
  const yesterday = getBusinessDaysAgo(1);
  const twoDaysAgo = getBusinessDaysAgo(2);
  const threeDaysAgo = getBusinessDaysAgo(3);
  const tomorrow = getBusinessDaysFromNow(1);
  const twoDaysFromNow = getBusinessDaysFromNow(2);
  const threeDaysFromNow = getBusinessDaysFromNow(3);

  // Mock data representing realistic sample loads
  // Updated to align with manifests.csv structure
  const mockSamples = {
    cannabinoids: [
      // King City Gardens - Multiple samples (aligned with CSV manifest structure)
      {
        id: 'S001',
        ccId: '.14872',
        limsId: '171747',
        orderId: 'ORD-2024-1156',
        manifestId: '0001268426',
        client: 'King City Gardens',
        sampleName: 'Cookie Kush Big Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'Cookie Kush',
        packageId: '1A4070300005C31000012260',
        tests: ['TERPS', 'DPM'],
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        reportingDue: tomorrow,
        status: 'secondary_review',
        priority: 'rush',
        prepDue: yesterday,
        analysisDue: today,
        shippedQuantity: 28.62,
        thcTarget: '-',
        cbdTarget: '-'
      },
      {
        id: 'S002',
        ccId: '.14873',
        limsId: '171748',
        orderId: 'ORD-2024-1156',
        manifestId: '0001268426',
        client: 'King City Gardens',
        sampleName: 'Cookie Kush Small Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'Cookie Kush',
        packageId: '1A4070300005C31000012261',
        tests: ['TERPS', 'DPM'],
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        reportingDue: tomorrow,
        status: 'needs_confirmation',
        priority: 'rush',
        prepDue: yesterday,
        analysisDue: today,
        notes: 'Initial result: 23.5% THC (expected: 18-20%). Requires confirmation run.',
        shippedQuantity: 27.79,
        thcTarget: '-',
        cbdTarget: '-'
      },
      {
        id: 'S003',
        ccId: '.14874',
        limsId: '171749',
        orderId: 'ORD-2024-1156',
        manifestId: '0001268426',
        client: 'King City Gardens',
        sampleName: 'Slurri Crasher Small Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'Slurri Crasher',
        packageId: '1A4070300005C31000012262',
        tests: ['TERPS', 'DPM'],
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        reportingDue: tomorrow,
        status: 'ready_to_report',
        priority: 'rush',
        prepDue: yesterday,
        analysisDue: today,
        shippedQuantity: 6.0,
        thcTarget: '-',
        cbdTarget: '-'
      },
      // Pure Ohio Wellness - Multiple samples across different tests
      {
        id: 'S004',
        ccId: '.17367',
        limsId: '174145',
        orderId: 'ORD-2024-1157',
        manifestId: '0001273927',
        client: 'Pure Ohio Wellness',
        sampleName: 'Raspberry Trophy Wife - Bulk Flower/Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'Raspberry Trophy Wife',
        packageId: '1A40703000004B2000004928',
        tests: ['DPM', 'TERPS'],
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'primary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow,
        shippedQuantity: 33.85,
        thcTarget: '-',
        cbdTarget: '-'
      },
      {
        id: 'S005',
        ccId: '.17368',
        limsId: '174146',
        orderId: 'ORD-2024-1157',
        manifestId: '0001273927',
        client: 'Pure Ohio Wellness',
        sampleName: 'First Class Funk - Bulk Flower/Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'First Class Funk',
        packageId: '1A40703000004B2000004929',
        tests: ['DPM', 'TERPS'],
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'analysis',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow,
        shippedQuantity: 23.99,
        thcTarget: '-',
        cbdTarget: '-'
      },
      {
        id: 'S006',
        ccId: '.17378',
        limsId: '174156',
        orderId: 'ORD-2024-1168',
        manifestId: '0001273927',
        client: 'Pure Ohio Wellness',
        sampleName: 'Skunky Jack - Bulk Flower/Buds',
        productCategory: 'Bulk Flower/Buds',
        strain: 'Super Skunk x Jack Herer',
        packageId: '1A40703000004B2000004939',
        tests: ['MICRO to DPM', 'TERPS'],
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'in_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow,
        shippedQuantity: 24.34,
        thcTarget: '-',
        cbdTarget: '-',
        notes: 'ES'
      },
      {
        id: 'S007',
        orderId: 'ORD-2024-1168',
        client: 'Mountain Peak Cannabis',
        sampleName: 'MPC-Hybrid-Special-02',
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'in_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      // Urban Harvest Co - 3 samples in one order (Due Tomorrow)
      {
        id: 'S008',
        orderId: 'ORD-2024-1158',
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-8',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'S009',
        orderId: 'ORD-2024-1158',
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-9',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'S010',
        orderId: 'ORD-2024-1158',
        client: 'Urban Harvest Co',
        sampleName: 'UHC-Hybrid-Premium-10',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      // Sunset Gardens - Multiple orders with various states
      {
        id: 'S011',
        orderId: 'ORD-2024-1169',
        client: 'Sunset Gardens',
        sampleName: 'SG-OG-Kush-22',
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday, // Overdue
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      {
        id: 'S012',
        orderId: 'ORD-2024-1169',
        client: 'Sunset Gardens',
        sampleName: 'SG-OG-Kush-23',
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday,
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      // Pacific Herbs Co - Large order
      {
        id: 'S013',
        orderId: 'ORD-2024-1170',
        client: 'Pacific Herbs Co',
        sampleName: 'PHC-Blue-Dream-88',
        receivedOn: today,
        coaDueDate: today,
        goalDate: today,
        status: 'analysis',
        priority: 'rush',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S014',
        orderId: 'ORD-2024-1170',
        client: 'Pacific Herbs Co',
        sampleName: 'PHC-Blue-Dream-89',
        receivedOn: today,
        coaDueDate: today,
        goalDate: today,
        status: 'analyzed',
        priority: 'rush',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S015',
        orderId: 'ORD-2024-1170',
        client: 'Pacific Herbs Co',
        sampleName: 'PHC-Blue-Dream-90',
        receivedOn: today,
        coaDueDate: today,
        goalDate: today,
        status: 'primary_review',
        priority: 'rush',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      // Crystal Gardens - Mixed status order (Due Tomorrow)
      {
        id: 'S016',
        orderId: 'ORD-2024-1171',
        client: 'Crystal Gardens',
        sampleName: 'CG-Purple-Haze-33',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'S017',
        orderId: 'ORD-2024-1171',
        client: 'Crystal Gardens',
        sampleName: 'CG-Purple-Haze-34',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'in_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'S018',
        orderId: 'ORD-2024-1171',
        client: 'Crystal Gardens',
        sampleName: 'CG-Purple-Haze-35',
        receivedOn: yesterday,
        coaDueDate: tomorrow,
        goalDate: today,
        status: 'analyzed',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      // Organic Labs - Future samples
      {
        id: 'S019',
        orderId: 'ORD-2024-1172',
        client: 'Organic Labs',
        sampleName: 'OL-Diesel-44',
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'S020',
        orderId: 'ORD-2024-1172',
        client: 'Organic Labs',
        sampleName: 'OL-Diesel-45',
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'S021',
        orderId: 'ORD-2024-1172',
        client: 'Organic Labs',
        sampleName: 'OL-Diesel-46',
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'S022',
        orderId: 'ORD-2024-1172',
        client: 'Organic Labs',
        sampleName: 'OL-Diesel-47',
        receivedOn: today,
        coaDueDate: threeDaysFromNow,
        goalDate: twoDaysFromNow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      // Emerald Fields - Review samples
      {
        id: 'S023',
        orderId: 'ORD-2024-1173',
        client: 'Emerald Fields',
        sampleName: 'EF-Gorilla-Glue-01',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'secondary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S024',
        orderId: 'ORD-2024-1173',
        client: 'Emerald Fields',
        sampleName: 'EF-Gorilla-Glue-02',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'secondary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S025',
        orderId: 'ORD-2024-1173',
        client: 'Emerald Fields',
        sampleName: 'EF-Gorilla-Glue-03',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      // Northern Lights - Large batch ready
      {
        id: 'S026',
        orderId: 'ORD-2024-1174',
        client: 'Northern Lights',
        sampleName: 'NL-Amnesia-Haze-11',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S027',
        orderId: 'ORD-2024-1174',
        client: 'Northern Lights',
        sampleName: 'NL-Amnesia-Haze-12',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S028',
        orderId: 'ORD-2024-1174',
        client: 'Northern Lights',
        sampleName: 'NL-Amnesia-Haze-13',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S029',
        orderId: 'ORD-2024-1174',
        client: 'Northern Lights',
        sampleName: 'NL-Amnesia-Haze-14',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'S030',
        orderId: 'ORD-2024-1174',
        client: 'Northern Lights',
        sampleName: 'NL-Amnesia-Haze-15',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      }
    ],
    terpenes: [
      // Coastal Cannabis - 2 samples in one order (Due Today)
      {
        id: 'T001',
        orderId: 'ORD-2024-1159',
        client: 'Coastal Cannabis',
        sampleName: 'CC-Terpene-Profile-A',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T002',
        orderId: 'ORD-2024-1159',
        client: 'Coastal Cannabis',
        sampleName: 'CC-Terpene-Profile-B',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      // Desert Bloom - 3 samples in one order
      {
        id: 'T003',
        orderId: 'ORD-2024-1160',
        client: 'Desert Bloom',
        sampleName: 'DB-Myrcene-Study-3',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'in_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'T004',
        orderId: 'ORD-2024-1160',
        client: 'Desert Bloom',
        sampleName: 'DB-Myrcene-Study-4',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'in_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'T005',
        orderId: 'ORD-2024-1160',
        client: 'Desert Bloom',
        sampleName: 'DB-Myrcene-Study-5',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'in_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      // Alpine Terps - 2 samples (Due Tomorrow)
      {
        id: 'T006',
        orderId: 'ORD-2024-1165',
        client: 'Alpine Terps Co',
        sampleName: 'ATC-Limonene-Test-01',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T007',
        orderId: 'ORD-2024-1165',
        client: 'Alpine Terps Co',
        sampleName: 'ATC-Limonene-Test-02',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      // Terpene Masters - Large overdue order
      {
        id: 'T008',
        orderId: 'ORD-2024-1175',
        client: 'Terpene Masters',
        sampleName: 'TM-Pinene-Study-01',
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday,
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      {
        id: 'T009',
        orderId: 'ORD-2024-1175',
        client: 'Terpene Masters',
        sampleName: 'TM-Pinene-Study-02',
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday,
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      {
        id: 'T010',
        orderId: 'ORD-2024-1175',
        client: 'Terpene Masters',
        sampleName: 'TM-Pinene-Study-03',
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday,
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      // Essence Labs - Mixed status order
      {
        id: 'T011',
        orderId: 'ORD-2024-1176',
        client: 'Essence Labs',
        sampleName: 'EL-Terpinolene-Mix-A',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'analysis',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'T012',
        orderId: 'ORD-2024-1176',
        client: 'Essence Labs',
        sampleName: 'EL-Terpinolene-Mix-B',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'analyzed',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'T013',
        orderId: 'ORD-2024-1176',
        client: 'Essence Labs',
        sampleName: 'EL-Terpinolene-Mix-C',
        receivedOn: yesterday,
        coaDueDate: today,
        goalDate: today,
        status: 'primary_review',
        priority: 'standard',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      // Flavor Sciences - Review samples
      {
        id: 'T014',
        orderId: 'ORD-2024-1177',
        client: 'Flavor Sciences',
        sampleName: 'FS-Caryophyllene-01',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'secondary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'T015',
        orderId: 'ORD-2024-1177',
        client: 'Flavor Sciences',
        sampleName: 'FS-Caryophyllene-02',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      // Aromatic Research - Future samples
      {
        id: 'T016',
        orderId: 'ORD-2024-1178',
        client: 'Aromatic Research',
        sampleName: 'AR-Humulene-Test-X1',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'T017',
        orderId: 'ORD-2024-1178',
        client: 'Aromatic Research',
        sampleName: 'AR-Humulene-Test-X2',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'T018',
        orderId: 'ORD-2024-1178',
        client: 'Aromatic Research',
        sampleName: 'AR-Humulene-Test-X3',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      // Scent Dynamics - Large batch in prep
      {
        id: 'T019',
        orderId: 'ORD-2024-1179',
        client: 'Scent Dynamics',
        sampleName: 'SD-Linalool-Batch-01',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'in_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T020',
        orderId: 'ORD-2024-1179',
        client: 'Scent Dynamics',
        sampleName: 'SD-Linalool-Batch-02',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'in_prep',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T021',
        orderId: 'ORD-2024-1179',
        client: 'Scent Dynamics',
        sampleName: 'SD-Linalool-Batch-03',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T022',
        orderId: 'ORD-2024-1179',
        client: 'Scent Dynamics',
        sampleName: 'SD-Linalool-Batch-04',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'T023',
        orderId: 'ORD-2024-1179',
        client: 'Scent Dynamics',
        sampleName: 'SD-Linalool-Batch-05',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      }
    ],
    pesticides: [
      // Sun Theory Ohio - Concentrate and Edible samples
      {
        id: 'P001',
        ccId: '.15009',
        limsId: '171884',
        orderId: 'ORD-2024-1161',
        manifestId: '0001268929',
        client: 'Sun Theory Ohio, LLC',
        sampleName: 'Bulk Sativa Rosin',
        productCategory: 'Bulk Concentrate',
        strain: '',
        packageId: '1A4070300002D51000001706',
        tests: ['TERPS', 'NSPNPT'],
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday, // Overdue
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow,
        shippedQuantity: 4.2,
        grossWeight: null,
        notes: 'Blind Duplicate Concentrate',
        thcTarget: 'Blind DUP',
        cbdTarget: '-'
      },
      {
        id: 'P002',
        ccId: '.15010',
        limsId: '171913',
        orderId: 'ORD-2024-1161',
        manifestId: '0001268929',
        client: 'Sun Theory Ohio, LLC',
        sampleName: 'Bulk Indica Gummy',
        productCategory: 'Bulk Edible',
        strain: '',
        packageId: '1A4070300002D51000001707',
        tests: ['PPPT'],
        receivedOn: threeDaysAgo,
        coaDueDate: yesterday,
        goalDate: twoDaysAgo,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow,
        shippedQuantity: 10.0,
        grossWeight: 59.51,
        notes: '',
        thcTarget: '1.67 mg/g',
        cbdTarget: '-'
      },
      {
        id: 'P003',
        ccId: '.16872',
        limsId: '173649',
        orderId: 'ORD-2024-1170',
        manifestId: '0001273022',
        client: 'King City Gardens',
        sampleName: 'Shake/Trim',
        productCategory: 'Shake/Trim',
        strain: '',
        packageId: '1A4070300005C31000012379',
        tests: ['PPM'],
        receivedOn: twoDaysAgo,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow,
        shippedQuantity: 52.15,
        grossWeight: null,
        notes: '',
        thcTarget: '-',
        cbdTarget: '-'
      },
      {
        id: 'P004',
        ccId: '.17671',
        limsId: '174449',
        orderId: 'ORD-2024-1170',
        manifestId: '0001273936',
        client: 'Pure Ohio Wellness',
        sampleName: 'Tincture Oral Admin -22-0-30-Mint RSO',
        productCategory: 'Tinctures for Oral Administration',
        strain: '',
        packageId: '1A4070300001E79000011011',
        tests: ['PPPT'],
        receivedOn: twoDaysAgo,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow,
        shippedQuantity: 1.0,
        grossWeight: 30.0,
        notes: '22 mg/g Tincture',
        thcTarget: '22 mg/g',
        cbdTarget: '-'
      },
      // Vaporization product
      {
        id: 'P005',
        ccId: '.17672',
        limsId: '174450',
        orderId: 'ORD-2024-1172',
        manifestId: '0001273936',
        client: 'Pure Ohio Wellness',
        sampleName: 'Oil or Sol Vap 10-70 Cranberry Kush Pod',
        productCategory: 'Metered Oil or Solid for Vaporization',
        strain: '',
        packageId: '1A4070300001E79000011012',
        tests: ['TERPS', 'PPPT'],
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow,
        shippedQuantity: 4.2,
        grossWeight: null,
        notes: '70-77% Concentrate',
        thcTarget: '70-77%',
        cbdTarget: '-'
      },
      // Additional comprehensive test data for various states
      
      // High Priority Labs - Multiple orders with various statuses
      {
        id: 'P006',
        orderId: 'ORD-2024-1180',
        client: 'High Priority Labs',
        sampleName: 'HPL-Critical-01',
        receivedOn: threeDaysAgo,
        coaDueDate: today,
        goalDate: yesterday,
        status: 'ready_for_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      {
        id: 'P007',
        orderId: 'ORD-2024-1180',
        client: 'High Priority Labs',
        sampleName: 'HPL-Critical-02',
        receivedOn: threeDaysAgo,
        coaDueDate: today,
        goalDate: yesterday,
        status: 'in_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      {
        id: 'P008',
        orderId: 'ORD-2024-1180',
        client: 'High Priority Labs',
        sampleName: 'HPL-Critical-03',
        receivedOn: threeDaysAgo,
        coaDueDate: today,
        goalDate: yesterday,
        status: 'in_prep',
        priority: 'rush',
        prepDue: twoDaysAgo,
        analysisDue: yesterday,
        reportingDue: today
      },
      
      // Botanical Sciences - Large order with mixed statuses
      {
        id: 'P009',
        orderId: 'ORD-2024-1181',
        client: 'Botanical Sciences Inc',
        sampleName: 'BSI-Pesticide-Panel-A1',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'ready_to_report',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'P010',
        orderId: 'ORD-2024-1181',
        client: 'Botanical Sciences Inc',
        sampleName: 'BSI-Pesticide-Panel-A2',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'secondary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'P011',
        orderId: 'ORD-2024-1181',
        client: 'Botanical Sciences Inc',
        sampleName: 'BSI-Pesticide-Panel-A3',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'primary_review',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'P012',
        orderId: 'ORD-2024-1181',
        client: 'Botanical Sciences Inc',
        sampleName: 'BSI-Pesticide-Panel-A4',
        receivedOn: twoDaysAgo,
        coaDueDate: today,
        goalDate: today,
        status: 'analyzed',
        priority: 'standard',
        prepDue: yesterday,
        analysisDue: today,
        reportingDue: tomorrow
      },
      
      // Green Thumb Gardens - Overdue samples
      {
        id: 'P013',
        orderId: 'ORD-2024-1175',
        client: 'Green Thumb Gardens',
        sampleName: 'GTG-Overdue-01',
        receivedOn: getBusinessDaysAgo(5),
        coaDueDate: twoDaysAgo,
        goalDate: threeDaysAgo,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: getBusinessDaysAgo(4),
        analysisDue: threeDaysAgo,
        reportingDue: twoDaysAgo
      },
      {
        id: 'P014',
        orderId: 'ORD-2024-1175',
        client: 'Green Thumb Gardens',
        sampleName: 'GTG-Overdue-02',
        receivedOn: getBusinessDaysAgo(5),
        coaDueDate: twoDaysAgo,
        goalDate: threeDaysAgo,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: getBusinessDaysAgo(4),
        analysisDue: threeDaysAgo,
        reportingDue: twoDaysAgo
      },
      
      // Testing Tomorrow samples
      {
        id: 'P015',
        orderId: 'ORD-2024-1182',
        client: 'Tomorrow Testing Co',
        sampleName: 'TTC-Tomorrow-01',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'prepped',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'P016',
        orderId: 'ORD-2024-1182',
        client: 'Tomorrow Testing Co',
        sampleName: 'TTC-Tomorrow-02',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'analysis',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      {
        id: 'P017',
        orderId: 'ORD-2024-1182',
        client: 'Tomorrow Testing Co',
        sampleName: 'TTC-Tomorrow-03',
        receivedOn: yesterday,
        coaDueDate: twoDaysFromNow,
        goalDate: today,
        status: 'analyzed',
        priority: 'standard',
        prepDue: today,
        analysisDue: tomorrow,
        reportingDue: twoDaysFromNow
      },
      
      // Complex Lab Services - Various stages
      {
        id: 'P018',
        orderId: 'ORD-2024-1183',
        client: 'Complex Lab Services',
        sampleName: 'CLS-Multi-01',
        receivedOn: today,
        coaDueDate: twoDaysFromNow,
        goalDate: tomorrow,
        status: 'ready_for_prep',
        priority: 'standard',
        prepDue: tomorrow,
        analysisDue: twoDaysFromNow,
        reportingDue: threeDaysFromNow
      },
      {
        id: 'P019',
        orderId: 'ORD-2024-1184',
        client: 'Complex Lab Services',
        sampleName: 'CLS-Rush-01',
        receivedOn: today,
        coaDueDate: today,
        goalDate: today,
        status: 'in_prep',
        priority: 'rush',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      },
      {
        id: 'P020',
        orderId: 'ORD-2024-1184',
        client: 'Complex Lab Services',
        sampleName: 'CLS-Rush-02',
        receivedOn: today,
        coaDueDate: today,
        goalDate: today,
        status: 'prepped',
        priority: 'rush',
        prepDue: today,
        analysisDue: today,
        reportingDue: tomorrow
      }
    ]
  };

  // Updated DPM Early Start data - grouped by customer, sorted by due date priority
  const rawDPMByCustomer = [
    {
      customer: 'Mountain Ridge Testing',
      sampleCount: 6,
      esDue: '2025-05-29', // Overdue
      priority: 'rush',
      orders: [
        { orderId: 'ORD-2024-1199', sampleCount: 6 }
      ],
      samples: [
        {
          id: 'DPM005',
          orderId: 'ORD-2024-1199',
          sampleName: 'MRT-Overdue-1',
          status: 'micro_secondary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Pacific Northwest Cannabis',
      sampleCount: 8,
      esDue: '2025-05-30', // Today
      priority: 'standard',
      orders: [
        { orderId: 'ORD-2024-1200', sampleCount: 5 },
        { orderId: 'ORD-2024-1203', sampleCount: 3 }
      ],
      samples: [
        {
          id: 'DPM001',
          orderId: 'ORD-2024-1200',
          sampleName: 'PNW-Early-Test-1',
          status: 'micro_in_progress',
          microbialTests: { completed: 4, total: 6, remaining: ['STEC', 'Salmonella'] }
        },
        {
          id: 'DPM004',
          orderId: 'ORD-2024-1200',
          sampleName: 'PNW-Early-Test-2',
          status: 'micro_primary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Northern Lights Labs',
      sampleCount: 12,
      esDue: '2025-06-01', // Tomorrow
      priority: 'rush',
      orders: [
        { orderId: 'ORD-2024-1201', sampleCount: 12 }
      ],
      samples: [
        {
          id: 'DPM002',
          orderId: 'ORD-2024-1201',
          sampleName: 'NLL-Conditional-2',
          status: 'micro_primary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    },
    {
      customer: 'Cascade Cannabis Co',
      sampleCount: 4,
      esDue: '2025-06-03', // Future
      priority: 'standard',
      orders: [
        { orderId: 'ORD-2024-1202', sampleCount: 4 }
      ],
      samples: [
        {
          id: 'DPM003',
          orderId: 'ORD-2024-1202',
          sampleName: 'CCC-DPM-Sample-A',
          status: 'micro_secondary_review',
          microbialTests: { completed: 6, total: 6, remaining: [] }
        }
      ]
    }
  ];

  // Sort DPM customers by due date priority (overdue first, then by date)
  const mockDPMByCustomer = [...rawDPMByCustomer].sort((a, b) => {
    const urgencyA = getDueDateUrgency(a.esDue);
    const urgencyB = getDueDateUrgency(b.esDue);
    
    if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
    if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
    if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
    if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
    
    // Then by actual date
    return new Date(a.esDue) - new Date(b.esDue);
  });

  const mockPrimaryBatches = [
    {
      id: 'BATCH-CB-240530-001',
      type: 'cannabinoids',
      status: 'ready_for_review',
      sampleCount: 24,
      prepDate: '2025-05-29',
      analysisDate: '2025-05-30',
      qcStatus: 'pass',
      analyst: 'Dr. Sarah Chen'
    },
    {
      id: 'BATCH-TP-240530-002',
      type: 'terpenes',
      status: 'in_progress',
      sampleCount: 16,
      prepDate: '2025-05-30',
      analysisDate: '2025-05-31',
      qcStatus: 'pending',
      analyst: 'Dr. Sarah Chen'
    }
  ];

  const mockSecondaryBatches = [
    {
      id: 'BATCH-PM-240529-003',
      type: 'pesticides',
      status: 'ready_for_secondary',
      sampleCount: 12,
      prepDate: '2025-05-28',
      analysisDate: '2025-05-29',
      qcStatus: 'deviation',
      analyst: 'Dr. Mike Rodriguez',
      primaryReviewer: 'Dr. Mike Rodriguez'
    },
    {
      id: 'BATCH-CB-240528-004',
      type: 'cannabinoids',
      status: 'ready_for_secondary',
      sampleCount: 18,
      prepDate: '2025-05-27',
      analysisDate: '2025-05-28',
      qcStatus: 'pass',
      analyst: 'Dr. Lisa Park',
      primaryReviewer: 'Dr. Lisa Park'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready_for_prep': return 'bg-blue-100 text-blue-800';
      case 'prep': return 'bg-indigo-100 text-indigo-800';
      case 'prepped': return 'bg-purple-100 text-purple-800';
      case 'analysis': return 'bg-orange-100 text-orange-800 border border-orange-300';
      case 'analyzed': return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'ready_for_review': return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'ready_for_secondary': return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'micro_in_progress': return 'bg-pink-100 text-pink-800';
      case 'micro_primary_review': return 'bg-teal-100 text-teal-800';
      case 'micro_secondary_review': return 'bg-cyan-100 text-cyan-800';
      case 'needs_confirmation': return 'bg-red-100 text-red-800 border-2 border-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ready_for_prep': return 'Available for Prep';
      case 'prep': return 'In Prep';
      case 'in_prep': return 'In Prep';
      case 'prepped': return 'Prep Complete';
      case 'analysis': return 'On Instrument';
      case 'analyzed': return 'Awaiting Review';
      case 'primary_review': return 'Primary Review';
      case 'secondary_review': return 'Secondary Review';
      case 'ready_to_report': return 'Secondary Review Complete';
      case 'reported': return 'Reported';
      case 'needs_confirmation': return 'Needs Confirmation';
      default: return status.replace('_', ' ').toUpperCase();
    }
  };

  const getWorkflowStatusGroup = (status) => {
    switch (status) {
      case 'ready_to_report':
      case 'reported':
        return 'ready_to_report';
      case 'secondary_review':
        return 'secondary_review_pending';
      case 'primary_review':
        return 'primary_review_pending';
      case 'analyzed':
        return 'awaiting_instrument_data';
      case 'prepped':
        return 'prep_complete';
      case 'prep':
      case 'in_prep':
        return 'in_prep';
      case 'ready_for_prep':
        return 'available_for_prep';
      case 'analysis':
        return 'on_instrument';
      default:
        return 'other';
    }
  };

  const workflowStatusOrder = [
    'available_for_prep',
    'in_prep',
    'prep_complete',
    'on_instrument',
    'awaiting_instrument_data',
    'primary_review_pending',
    'secondary_review_pending',
    'ready_to_report'
  ];

  const workflowStatusLabels = {
    'ready_to_report': 'Secondary Review Complete',
    'secondary_review_pending': 'Secondary Review Pending',
    'primary_review_pending': 'Primary Review Pending',
    'awaiting_instrument_data': 'Awaiting Instrument Data',
    'on_instrument': 'On Instrument',
    'prep_complete': 'Prep Complete (Awaiting Batch)',
    'in_prep': 'In Preparation',
    'available_for_prep': 'Available for Prep'
  };

  const getPriorityColor = (priority) => {
    return priority === 'rush' ? 'bg-red-100 text-red-800 border border-red-300' : null;
  };

  const getPriorityLabel = (priority) => {
    return priority === 'rush' ? 'RUSH' : null;
  };

  const getQCStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-blue-700" />;
      case 'deviation': return <XCircle className="w-4 h-4 text-red-700" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-700" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleBatchExpansion = (batchId) => {
    setExpandedBatches(prev => ({
      ...prev,
      [batchId]: !prev[batchId]
    }));
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const toggleDPMCustomerExpansion = (customer) => {
    setExpandedDPMCustomers(prev => ({
      ...prev,
      [customer]: !prev[customer]
    }));
  };

  const toggleWorkflowStatusExpansion = (assayType, statusGroup) => {
    const key = `${assayType}-${statusGroup}`;
    setExpandedWorkflowStatuses(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleDateSectionExpansion = (assayType, section) => {
    const key = `${assayType}-${section}`;
    setExpandedDateSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sortSamplesByPriority = (samples) => {
    return [...samples].sort((a, b) => {
      // First by due date urgency
      const urgencyA = getDueDateUrgency(a.coaDueDate);
      const urgencyB = getDueDateUrgency(b.coaDueDate);
      
      if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
      if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
      
      // Then by priority
      if (a.priority === 'rush' && b.priority !== 'rush') return -1;
      if (b.priority === 'rush' && a.priority !== 'rush') return 1;
      
      // Then by client name
      return a.client.localeCompare(b.client);
    });
  };

  const groupSamplesByOrder = (samples) => {
    const grouped = samples.reduce((acc, sample) => {
      if (!acc[sample.orderId]) {
        acc[sample.orderId] = {
          orderId: sample.orderId,
          client: sample.client,
          samples: [],
          earliestDueDate: sample.coaDueDate,
          highestPriority: sample.priority,
          overallStatus: sample.status,
          receivedOn: sample.receivedOn
        };
      }
      acc[sample.orderId].samples.push(sample);
      
      // Update order-level metadata
      if (new Date(sample.coaDueDate) < new Date(acc[sample.orderId].earliestDueDate)) {
        acc[sample.orderId].earliestDueDate = sample.coaDueDate;
      }
      if (sample.priority === 'rush') {
        acc[sample.orderId].highestPriority = 'rush';
      }
      // Use earliest receivedOn date for the order
      if (new Date(sample.receivedOn) < new Date(acc[sample.orderId].receivedOn)) {
        acc[sample.orderId].receivedOn = sample.receivedOn;
      }
      
      return acc;
    }, {});
    
    return Object.values(grouped).sort((a, b) => {
      // Sort orders by same logic as samples
      const urgencyA = getDueDateUrgency(a.earliestDueDate);
      const urgencyB = getDueDateUrgency(b.earliestDueDate);
      
      if (urgencyA.label === 'OVERDUE' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'OVERDUE' && urgencyA.label !== 'OVERDUE') return 1;
      if (urgencyA.label === 'TODAY' && urgencyB.label !== 'TODAY' && urgencyB.label !== 'OVERDUE') return -1;
      if (urgencyB.label === 'TODAY' && urgencyA.label !== 'TODAY' && urgencyA.label !== 'OVERDUE') return 1;
      
      if (a.highestPriority === 'rush' && b.highestPriority !== 'rush') return -1;
      if (b.highestPriority === 'rush' && a.highestPriority !== 'rush') return 1;
      
      return a.client.localeCompare(b.client);
    });
  };

  const renderAnalyticalBatch = (analyticalBatch, allSamples) => {
    const isExpanded = expandedBatches[analyticalBatch.id];
    const totalSamples = analyticalBatch.prepBatches.reduce((sum, pb) => sum + pb.sampleCount, 0);
    
    const getStatusIcon = () => {
      switch (analyticalBatch.status) {
        case 'in_progress':
          return <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse border border-blue-800"></div>;
        case 'queued':
          return <div className="w-2 h-2 bg-orange-600 rounded-full border border-orange-800"></div>;
        default:
          return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
      }
    };

    const getTimeDisplay = () => {
      if (analyticalBatch.status === 'in_progress') {
        return `Started: ${analyticalBatch.startTime} • Est. Complete: ${analyticalBatch.estimatedCompletion}`;
      } else if (analyticalBatch.status === 'queued') {
        return `Queued for: ${analyticalBatch.estimatedStart}`;
      }
      return '';
    };
    
    return (
      <div key={analyticalBatch.id} className="border border-gray-200 rounded">
        <div className="hover:bg-gray-50">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleBatchExpansion(analyticalBatch.id)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              {getStatusIcon()}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {analyticalBatch.id}
                </p>
                <p className="text-xs text-gray-500">
                  {analyticalBatch.prepBatches.length} prep batch{analyticalBatch.prepBatches.length !== 1 ? 'es' : ''} • {totalSamples} samples
                </p>
                {getTimeDisplay() && (
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeDisplay()}
                  </p>
                )}
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              analyticalBatch.status === 'in_progress' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {analyticalBatch.status === 'in_progress' ? 'RUNNING' : 'QUEUED'}
            </span>
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-200">
            {analyticalBatch.prepBatches.map(prepBatch => (
              <div key={prepBatch.id} className="p-3 ml-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {prepBatch.id}
                    </p>
                    <p className="text-xs text-gray-600">
                      Prep by: {prepBatch.prepAnalyst} • {prepBatch.sampleCount} samples
                    </p>
                  </div>
                </div>
                
                {/* Show individual samples in this prep batch */}
                <div className="mt-2 space-y-1">
                  {prepBatch.samples.map(sampleId => {
                    const sample = allSamples.find(s => s.id === sampleId);
                    if (!sample) return null;
                    
                    const urgency = getDueDateUrgency(sample.coaDueDate);
                    const priorityColor = getPriorityColor(sample.priority);
                    const priorityLabel = getPriorityLabel(sample.priority);
                    
                    return (
                      <div key={sample.id} className="p-2 bg-white rounded border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-xs font-medium text-gray-800 truncate">
                              {sample.sampleName}
                            </p>
                            {priorityLabel && (
                              <span className={`inline-flex px-1 py-0.5 text-xs rounded ${priorityColor}`}>
                                {priorityLabel}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs ${urgency.color}`}>
                            {urgency.label}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {sample.client} • {sample.orderId}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSampleRowCompact = (sample) => {
    const urgency = getDueDateUrgency(sample.dueDate);
    const priorityColor = getPriorityColor(sample.priority);
    const priorityLabel = getPriorityLabel(sample.priority);
    
    return (
      <div key={sample.id} className="hover:bg-gray-50 rounded">
        <div className="p-2 grid grid-cols-12 gap-2 items-center text-sm">
          {/* Sample Name & Client */}
          <div className="col-span-5 min-w-0">
            <div className="flex items-center space-x-1">
              <p className="font-medium text-gray-900 truncate text-xs">
                {sample.sampleName}
              </p>
              {priorityLabel && (
                <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${priorityColor}`}>
                  {priorityLabel}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">
              {sample.client}
            </p>
          </div>
          
          {/* Due Date */}
          <div className="col-span-3 text-right">
            <p className={`text-xs ${urgency.color}`}>
              {urgency.label}
            </p>
          </div>
          
          {/* Status - Removed */}
          <div className="col-span-3"></div>
          
          {/* Action */}
          <div className="col-span-1"></div>
        </div>
      </div>
    );
  };

  const renderOrderRowCompact = (order) => {
    const urgency = getDueDateUrgency(order.earliestDueDate);
    const priorityColor = getPriorityColor(order.highestPriority);
    const priorityLabel = getPriorityLabel(order.highestPriority);
    const isExpanded = expandedOrders[order.orderId];
    
    return (
      <div key={order.orderId}>
        <div className="hover:bg-gray-50 rounded">
          <div className="p-2 grid grid-cols-12 gap-2 items-center text-sm">
            {/* Expand Button */}
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => toggleOrderExpansion(order.orderId)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? 
                  <ChevronDown className="w-3 h-3" /> : 
                  <ChevronRight className="w-3 h-3" />
                }
              </button>
            </div>
            
            {/* Order Info */}
            <div className="col-span-4 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="font-medium text-gray-900 truncate text-xs">
                  {order.orderId}
                </p>
                {priorityLabel && (
                  <span className={`inline-flex px-1 py-0.5 text-xs font-medium rounded ${priorityColor}`}>
                    {priorityLabel}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">
                {order.client} • {order.samples.length} samples • Received: {new Date(order.receivedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            
            {/* Due Date - removed redundant chips since orders are already grouped by date */}
            <div className="col-span-5 text-right">
            </div>
            
            {/* Action */}
            <div className="col-span-2"></div>
          </div>
        </div>
        
        {/* Expanded Samples */}
        {isExpanded && (
          <div className="bg-gray-50 ml-4">
            {order.samples.map(sample => (
              <div key={sample.id} className="p-2 border-t border-gray-100 first:border-t-0">
                <div className="grid grid-cols-12 gap-2 items-center text-xs">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 text-gray-700">
                    {sample.sampleName}
                  </div>
                  <div className="col-span-5 text-right text-gray-500">
                    Due: {sample.coaDueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSampleRow = (sample, isNested = false) => {
    const urgency = getDueDateUrgency(sample.coaDueDate);
    const indentClass = isNested ? 'ml-6 border-l-2 border-gray-200 pl-4' : '';
    const priorityColor = getPriorityColor(sample.priority);
    const priorityLabel = getPriorityLabel(sample.priority);
    
    return (
      <div key={sample.id} className={`hover:bg-gray-50 ${indentClass}`}>
        <div className="p-4 grid grid-cols-12 gap-4 items-center">
          {/* Column 1-6: Sample Name and Client (flexible) */}
          <div className="col-span-6 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {sample.sampleName} {sample.limsId && <span className="text-xs text-gray-400">({sample.limsId})</span>}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {sample.client} • {sample.productCategory || 'Bulk Flower/Buds'} • Received: {new Date(sample.receivedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            {sample.tests && (
              <p className="text-xs text-gray-400">
                Tests: {sample.tests.join(', ')}
              </p>
            )}
          </div>
          
          {/* Column 7: Priority Chip (fixed narrow column) */}
          <div className="col-span-1 flex justify-center space-x-1">
            {priorityLabel && (
              <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${priorityColor}`}>
                {priorityLabel}
              </span>
            )}
            {sample.status === 'needs_confirmation' && (
              <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800 border border-red-300" title={sample.notes}>
                CONF
              </span>
            )}
          </div>
          
          {/* Column 8-9: Due Date Info (fixed width) */}
          <div className="col-span-2 text-right">
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md border ${urgency.borderClass} ${urgency.bgClass}`}>
              {urgency.icon === 'alert' && <AlertCircle className="w-3 h-3" />}
              {urgency.icon === 'today' && <Clock className="w-3 h-3" />}
              {urgency.icon === 'tomorrow' && <CalendarDays className="w-3 h-3" />}
              <span className={`text-sm ${urgency.color}`}>
                {urgency.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Goal: {sample.goalDate || getGoalDate(sample.reportingDue)}
            </p>
            <p className="text-xs text-gray-400">
              Report: {sample.reportingDue}
            </p>
          </div>
          
          {/* Column 10-11: Status Chip - Removed */}
          <div className="col-span-2"></div>
          
          {/* Column 12: Actions (fixed narrow) */}
          <div className="col-span-1"></div>
        </div>
        
        {/* Timeline breakdown */}
        {!isNested && (
          <div className="px-4 pb-3">
            <div className="flex space-x-4 text-xs text-gray-500">
              <span>Prep Due: {sample.prepDue}</span>
              <span>Analysis Due: {sample.analysisDue}</span>
              <span>Reporting Due: {sample.reportingDue}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDPMCustomerRow = (customerData) => {
    const urgency = getDueDateUrgency(customerData.esDue);
    const isExpanded = expandedDPMCustomers[customerData.customer];
    const priorityColor = getPriorityColor(customerData.priority);
    const priorityLabel = getPriorityLabel(customerData.priority);
    
    return (
      <div key={customerData.customer}>
        <div className="hover:bg-gray-50">
          <div className="p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleDPMCustomerExpansion(customerData.customer)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-3 h-3" /> : 
                    <ChevronRight className="w-3 h-3" />
                  }
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {customerData.customer}
                      </p>
                      {priorityLabel && (
                        <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${priorityColor}`}>
                          {priorityLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{customerData.sampleCount} samples</span>
                    <span className={urgency.color}>ES Due: {customerData.esDue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-100">
            <div className="px-6 py-2">
              <div className="text-xs text-gray-600 space-y-1">
                {customerData.orders.map(order => (
                  <div key={order.orderId} className="flex justify-between">
                    <span className="font-medium">{order.orderId}</span>
                    <span>{order.sampleCount} samples</span>
                  </div>
                ))}
              </div>
            </div>
            {customerData.samples.slice(0, 2).map(sample => (
              <div key={sample.id} className="px-6 py-1 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="truncate">{sample.sampleName}</span>
                  <span>Micro: {sample.microbialTests.completed}/{sample.microbialTests.total}</span>
                </div>
              </div>
            ))}
            {customerData.samples.length > 2 && (
              <div className="px-6 py-1 text-xs text-gray-400 text-center border-t border-gray-100">
                +{customerData.samples.length - 2} more samples
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOrderRow = (order) => {
    const urgency = getDueDateUrgency(order.earliestDueDate);
    const isExpanded = expandedOrders[order.orderId];
    const priorityColor = getPriorityColor(order.highestPriority);
    const priorityLabel = getPriorityLabel(order.highestPriority);
    
    // Check if all samples have the same due date
    const allDueDates = order.samples.map(sample => sample.dueDate);
    const uniqueDueDates = [...new Set(allDueDates)];
    const allSameSameDate = uniqueDueDates.length === 1;
    const dueDateLabel = allSameSameDate ? 'All Due:' : 'Earliest:';
    
    return (
      <div key={order.orderId}>
        <div className="hover:bg-gray-50">
          <div className="p-4 grid grid-cols-12 gap-4 items-center">
            {/* Column 1: Expand Button */}
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => toggleOrderExpansion(order.orderId)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
            </div>
            
            {/* Column 2-5: Order Info */}
            <div className="col-span-4 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {order.orderId}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {order.client} • {order.samples.length} sample{order.samples.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Column 6: Priority Chip */}
            <div className="col-span-1 flex justify-center">
              {priorityLabel && (
                <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full ${priorityColor}`}>
                  {priorityLabel}
                </span>
              )}
            </div>
            
            {/* Column 7-8: Due Date Info */}
            <div className="col-span-2 text-right">
              <p className={`text-sm ${urgency.color}`}>
                {urgency.label}
              </p>
              <p className="text-xs text-gray-500">
                {dueDateLabel} {order.earliestDueDate}
              </p>
            </div>
            
            {/* Column 9-11: Order Icon and Space */}
            <div className="col-span-2 text-center">
              <Package className="w-4 h-4 text-gray-400 mx-auto" />
            </div>
            
            {/* Column 12: Actions */}
            <div className="col-span-1"></div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50">
            {order.samples.map(sample => renderSampleRow(sample, true))}
          </div>
        )}
      </div>
    );
  };

  const getCurrentData = (assayType) => {
    const samples = mockSamples[assayType];
    if (viewModes[assayType] === 'order') {
      return groupSamplesByOrder(samples);
    }
    return sortSamplesByPriority(samples);
  };

  const getCount = (assayType) => {
    if (viewModes[assayType] === 'order') {
      return groupSamplesByOrder(mockSamples[assayType]).length;
    }
    return mockSamples[assayType].length;
  };

  // Mock analytical batches data
  const mockAnalyticalBatches = {
    cannabinoids: [
      {
        id: 'AB-CB-240602-001',
        status: 'in_progress',
        startTime: '2025-06-01 22:30',
        estimatedCompletion: '2025-06-02 08:45',
        prepBatches: [
          {
            id: 'PB-CB-240601-A',
            sampleCount: 12,
            prepAnalyst: 'Dr. Sarah Chen',
            samples: ['S002', 'S006'] // Updated to include analyzed sample
          },
          {
            id: 'PB-CB-240601-B', 
            sampleCount: 8,
            prepAnalyst: 'Tech Johnson',
            samples: ['S004'] // Sample currently in prep
          }
        ]
      }
    ],
    terpenes: [
      {
        id: 'AB-TP-240602-001',
        status: 'queued',
        estimatedStart: '2025-06-02 14:00',
        prepBatches: [
          {
            id: 'PB-TP-240602-A',
            sampleCount: 16,
            prepAnalyst: 'Dr. Chen',
            samples: ['T002', 'T004'] // Include both analyzed and prepped terpenes samples
          }
        ]
      }
    ],
    pesticides: []
  };

  const renderPipelineSection = (assayType, title, icon) => {
    const allSamples = mockSamples[assayType];
    const analyticalBatches = mockAnalyticalBatches[assayType] || [];
    
    // Group samples by workflow phase for Sample View
    const samplesByPhase = {
      prepNeeded: allSamples.filter(s => s.status === 'ready_for_prep' || s.status === 'needs_confirmation'),
      readyForBatch: allSamples.filter(s => s.status === 'prepped'),
      inProgress: allSamples.filter(s => ['prep', 'analysis'].includes(s.status)),
      dataReady: allSamples.filter(s => s.status === 'analyzed')
    };
    
    // Group orders by due date for Order View
    const getBusinessDayAfterTomorrow = () => {
      const today = new Date();
      let daysToAdd = 2;
      let resultDate = new Date(today);
      
      while (daysToAdd > 0) {
        resultDate.setDate(resultDate.getDate() + 1);
        const dayOfWeek = resultDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
          daysToAdd--;
        }
      }
      
      return resultDate.toISOString().split('T')[0];
    };
    
    const ordersByDueDate = viewModes[assayType] === 'order' ? (() => {
      const orders = groupSamplesByOrder(allSamples);
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      const dayAfterTomorrow = getBusinessDayAfterTomorrow();
      
      return {
        dueToday: orders.filter(order => {
          const urgency = getDueDateUrgency(order.earliestDueDate);
          return urgency.label === 'OVERDUE' || order.earliestDueDate === today;
        }),
        dueTomorrow: orders.filter(order => order.earliestDueDate === tomorrowStr),
        dueDayAfter: orders.filter(order => order.earliestDueDate === dayAfterTomorrow)
      };
    })() : null;
    
    const totalSamples = allSamples.length;
    
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {React.createElement(icon, { className: "w-5 h-5 text-blue-600" })}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{totalSamples} total samples</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation Button */}
              {/* Sample Prep button moved to individual workflow status sections */}
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewModes(prev => ({ ...prev, [assayType]: 'order' }))}
                  className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    viewModes[assayType] === 'order'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package className="w-4 h-4 mr-1.5" />
                  Order View
                </button>
                <button
                  onClick={() => setViewModes(prev => ({ ...prev, [assayType]: 'sample' }))}
                  className={`flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    viewModes[assayType] === 'sample'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4 mr-1.5" />
                  Sample View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on view mode */}
        <div className="divide-y divide-gray-200">
          {viewModes[assayType] === 'order' ? (
            // Date-based grouping for Order View
            <>
              {/* Due Today (includes Overdue) - Grouped by Status */}
              {ordersByDueDate.dueToday.length > 0 && (
                <div className="p-4">
                  <button
                    onClick={() => toggleDateSectionExpansion(assayType, 'dueToday')}
                    className="flex items-center justify-between mb-3 w-full text-left hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-2">
                      {expandedDateSections[`${assayType}-dueToday`] ? 
                        <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      }
                      <h4 className="text-sm font-semibold text-gray-900">Due Today</h4>
                      <span className="text-xs text-gray-500">({ordersByDueDate.dueToday.length} orders)</span>
                    </div>
                  </button>
                  
                  {/* Group orders by workflow status */}
                  {expandedDateSections[`${assayType}-dueToday`] && (() => {
                    const ordersByStatus = {};
                    
                    // Group orders by their worst-case sample status
                    ordersByDueDate.dueToday.forEach(order => {
                      // Find the most critical (earliest in workflow) status among all samples in the order
                      let mostCriticalStatus = null;
                      let mostCriticalIndex = workflowStatusOrder.length;
                      
                      order.samples.forEach(sample => {
                        const statusGroup = getWorkflowStatusGroup(sample.status);
                        const statusIndex = workflowStatusOrder.indexOf(statusGroup);
                        if (statusIndex < mostCriticalIndex) {
                          mostCriticalIndex = statusIndex;
                          mostCriticalStatus = statusGroup;
                        }
                      });
                      
                      if (!ordersByStatus[mostCriticalStatus]) {
                        ordersByStatus[mostCriticalStatus] = [];
                      }
                      ordersByStatus[mostCriticalStatus].push(order);
                    });
                    
                    // Render groups in workflow order
                    return workflowStatusOrder.map(statusGroup => {
                      if (!ordersByStatus[statusGroup] || ordersByStatus[statusGroup].length === 0) {
                        return null;
                      }
                      
                      const isExpanded = expandedWorkflowStatuses[`${assayType}-${statusGroup}`] === true;
                      
                      return (
                        <div key={statusGroup} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={() => toggleWorkflowStatusExpansion(assayType, statusGroup)}
                              className="flex items-center space-x-1 text-left hover:text-gray-900"
                            >
                              {isExpanded ? 
                                <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              }
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                {workflowStatusLabels[statusGroup]} ({ordersByStatus[statusGroup].length})
                              </h5>
                            </button>
                            {/* Context-specific navigation buttons */}
                            <div className="w-28">
                              {statusGroup === 'available_for_prep' && (
                                <button
                                  onClick={() => navigate(`/prep-batch/${assayType}`)}
                                  className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                >
                                  Sample Prep
                                </button>
                              )}
                              {statusGroup === 'on_instrument' && (
                                <button
                                  onClick={() => navigate(`/analysis-batch/${assayType}`)}
                                  className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                >
                                  Upload Results
                                </button>
                              )}
                              {statusGroup === 'secondary_review_pending' && (
                                <button
                                  onClick={() => navigate(`/secondary-review/${assayType}`)}
                                  className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                >
                                  Review Queue
                                </button>
                              )}
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="ml-4 space-y-1">
                              {ordersByStatus[statusGroup].slice(0, 3).map(order => renderOrderRowCompact(order))}
                              {ordersByStatus[statusGroup].length > 3 && (
                                <div className="text-xs text-gray-500 text-center py-1">
                                  +{ordersByStatus[statusGroup].length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }).filter(Boolean);
                  })()}
                </div>
              )}

              {/* Due Tomorrow */}
              {ordersByDueDate.dueTomorrow.length > 0 && (
                <div className="p-4">
                  <button
                    onClick={() => toggleDateSectionExpansion(assayType, 'dueTomorrow')}
                    className="flex items-center justify-between mb-3 w-full text-left hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-2">
                      {expandedDateSections[`${assayType}-dueTomorrow`] ? 
                        <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      }
                      <h4 className="text-sm font-semibold text-gray-900">Due Tomorrow</h4>
                      <span className="text-xs text-gray-500">({ordersByDueDate.dueTomorrow.length} orders)</span>
                    </div>
                  </button>
                  {/* Group orders by workflow status */}
                  {expandedDateSections[`${assayType}-dueTomorrow`] && (() => {
                    const ordersByStatus = {};
                    
                    // Group orders by their worst-case sample status
                    ordersByDueDate.dueTomorrow.forEach(order => {
                      // Find the most critical (earliest in workflow) status among all samples in the order
                      let mostCriticalStatus = null;
                      let mostCriticalIndex = workflowStatusOrder.length;
                      
                      order.samples.forEach(sample => {
                        const statusGroup = getWorkflowStatusGroup(sample.status);
                        const statusIndex = workflowStatusOrder.indexOf(statusGroup);
                        if (statusIndex < mostCriticalIndex) {
                          mostCriticalIndex = statusIndex;
                          mostCriticalStatus = statusGroup;
                        }
                      });
                      
                      if (!ordersByStatus[mostCriticalStatus]) {
                        ordersByStatus[mostCriticalStatus] = [];
                      }
                      ordersByStatus[mostCriticalStatus].push(order);
                    });
                    
                    // Render groups in workflow order
                    return workflowStatusOrder.map(statusGroup => {
                      if (!ordersByStatus[statusGroup] || ordersByStatus[statusGroup].length === 0) {
                        return null;
                      }
                      
                      const isExpanded = expandedWorkflowStatuses[`${assayType}-${statusGroup}`] === true;
                      
                      return (
                        <div key={statusGroup} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={() => toggleWorkflowStatusExpansion(assayType, statusGroup)}
                              className="flex items-center space-x-1 text-left hover:text-gray-900"
                            >
                              {isExpanded ? 
                                <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              }
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                {workflowStatusLabels[statusGroup]} ({ordersByStatus[statusGroup].length})
                              </h5>
                            </button>
                          </div>
                          {isExpanded && (
                            <div className="ml-4 space-y-1">
                              {ordersByStatus[statusGroup].slice(0, 3).map(order => renderOrderRowCompact(order))}
                              {ordersByStatus[statusGroup].length > 3 && (
                                <div className="text-xs text-gray-500 text-center py-1">
                                  +{ordersByStatus[statusGroup].length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }).filter(Boolean);
                  })()}
                </div>
              )}

              {/* Due Day After Tomorrow */}
              {ordersByDueDate.dueDayAfter.length > 0 && (
                <div className="p-4">
                  <button
                    onClick={() => toggleDateSectionExpansion(assayType, 'dueDayAfter')}
                    className="flex items-center justify-between mb-3 w-full text-left hover:text-gray-900"
                  >
                    <div className="flex items-center space-x-2">
                      {expandedDateSections[`${assayType}-dueDayAfter`] ? 
                        <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      }
                      <h4 className="text-sm font-semibold text-gray-900">
                        Due {new Date(getBusinessDayAfterTomorrow()).toLocaleDateString('en-US', { weekday: 'long' })}
                      </h4>
                      <span className="text-xs text-gray-500">({ordersByDueDate.dueDayAfter.length} orders)</span>
                    </div>
                  </button>
                  
                  {/* Group orders by workflow status */}
                  {expandedDateSections[`${assayType}-dueDayAfter`] && (() => {
                    const ordersByStatus = {};
                    
                    // Group orders by their worst-case sample status
                    ordersByDueDate.dueDayAfter.forEach(order => {
                      // Find the most critical (earliest in workflow) status among all samples in the order
                      let mostCriticalStatus = null;
                      let mostCriticalIndex = workflowStatusOrder.length;
                      
                      order.samples.forEach(sample => {
                        const statusGroup = getWorkflowStatusGroup(sample.status);
                        const statusIndex = workflowStatusOrder.indexOf(statusGroup);
                        if (statusIndex < mostCriticalIndex) {
                          mostCriticalIndex = statusIndex;
                          mostCriticalStatus = statusGroup;
                        }
                      });
                      
                      if (!ordersByStatus[mostCriticalStatus]) {
                        ordersByStatus[mostCriticalStatus] = [];
                      }
                      ordersByStatus[mostCriticalStatus].push(order);
                    });
                    
                    // Render groups in workflow order
                    return workflowStatusOrder.map(statusGroup => {
                      if (!ordersByStatus[statusGroup] || ordersByStatus[statusGroup].length === 0) {
                        return null;
                      }
                      
                      const isExpanded = expandedWorkflowStatuses[`${assayType}-${statusGroup}`] === true;
                      
                      return (
                        <div key={statusGroup} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={() => toggleWorkflowStatusExpansion(assayType, statusGroup)}
                              className="flex items-center space-x-1 text-left hover:text-gray-900"
                            >
                              {isExpanded ? 
                                <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              }
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                                {workflowStatusLabels[statusGroup]} ({ordersByStatus[statusGroup].length})
                              </h5>
                            </button>
                          </div>
                          {isExpanded && (
                            <div className="ml-4 space-y-1">
                              {ordersByStatus[statusGroup].slice(0, 3).map(order => renderOrderRowCompact(order))}
                              {ordersByStatus[statusGroup].length > 3 && (
                                <div className="text-xs text-gray-500 text-center py-1">
                                  +{ordersByStatus[statusGroup].length - 3} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }).filter(Boolean);
                  })()}
                </div>
              )}
            </>
          ) : (
            // Phase-based grouping for Sample View
            <>
              {/* Awaiting Prep Phase */}
              {samplesByPhase.prepNeeded.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">Awaiting Prep</h4>
                      <span className="text-xs text-gray-500">({samplesByPhase.prepNeeded.length})</span>
                    </div>
                    <button
                      onClick={() => navigate(`/prep-batch/${assayType}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Sample Prep
                    </button>
                  </div>
                  <div className="space-y-1">
                    {sortSamplesByPriority(samplesByPhase.prepNeeded).slice(0, 3).map(sample => 
                      renderSampleRowCompact(sample)
                    )}
                    {samplesByPhase.prepNeeded.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-2">
                        +{samplesByPhase.prepNeeded.length - 3} more samples
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Checked Out for Prep Phase */}
              {samplesByPhase.inProgress.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">Checked Out for Prep</h4>
                      <span className="text-xs text-gray-500">({samplesByPhase.inProgress.length})</span>
                    </div>
                    <button
                      onClick={() => navigate(`/prep-batch/${assayType}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Manage Batches
                    </button>
                  </div>
                  <div className="space-y-1">
                    {sortSamplesByPriority(samplesByPhase.inProgress).slice(0, 3).map(sample => 
                      renderSampleRowCompact(sample)
                    )}
                    {samplesByPhase.inProgress.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-2">
                        +{samplesByPhase.inProgress.length - 3} more samples
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ready for Analysis Phase */}
              {samplesByPhase.readyForBatch.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">Ready for Analysis</h4>
                      <span className="text-xs text-gray-500">({samplesByPhase.readyForBatch.length})</span>
                    </div>
                    <button
                      onClick={() => navigate(`/analysis-batch/${assayType}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Create Analysis Batch
                    </button>
                  </div>
                  <div className="space-y-1">
                    {sortSamplesByPriority(samplesByPhase.readyForBatch).slice(0, 3).map(sample => 
                      renderSampleRowCompact(sample)
                    )}
                    {samplesByPhase.readyForBatch.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-2">
                        +{samplesByPhase.readyForBatch.length - 3} more samples
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* On Instrument (Analysis section) */}
              {analyticalBatches.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">On Instrument</h4>
                      <span className="text-xs text-gray-500">({analyticalBatches.length})</span>
                    </div>
                    <button
                      onClick={() => navigate(`/analysis-batch/${assayType}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Upload Results
                    </button>
                  </div>
                  <div className="space-y-2">
                    {analyticalBatches.map(batch => renderAnalyticalBatch(batch, allSamples))}
                  </div>
                </div>
              )}

              {/* Awaiting Instrument Data */}
              {samplesByPhase.dataReady.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">Awaiting Instrument Data</h4>
                      <span className="text-xs text-gray-500">({samplesByPhase.dataReady.length})</span>
                    </div>
                    <button
                      onClick={() => navigate(`/primary-review/${assayType}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Review Queue
                    </button>
                  </div>
                  <div className="space-y-1">
                    {sortSamplesByPriority(samplesByPhase.dataReady).slice(0, 3).map(sample => 
                      renderSampleRowCompact(sample)
                    )}
                    {samplesByPhase.dataReady.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-2">
                        +{samplesByPhase.dataReady.length - 3} more samples
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          
          {totalSamples === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Beaker className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No samples in queue for {title.toLowerCase()}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Calculate total potential samples across all DPM customers
  const totalDPMSamples = mockDPMByCustomer.reduce((sum, customer) => sum + customer.sampleCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome</h1>
              <p className="text-sm text-gray-600">Dr. Sarah Chen • {getCurrentDate()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {getCurrentTime()}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Today's Overview + DPM Early Start */}
          <div className="lg:col-span-3 space-y-6">
            {/* Today's Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Today's Overview</h3>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overdue Samples</span>
                  <span className="text-lg font-semibold text-red-700">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Due Today</span>
                  <span className="text-lg font-semibold text-orange-700">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Batches to Review</span>
                  <span className="text-lg font-semibold text-blue-700">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">QC Deviations</span>
                  <span className="text-lg font-semibold text-red-700">1</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Potential DPM</span>
                    <span className="text-lg font-semibold text-purple-700">{totalDPMSamples}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DPM Early Start Pipeline - Customer Grouped */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <FlaskConical className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">DPM Early Start</h3>
                      <p className="text-sm text-gray-600">{mockDPMByCustomer.length} customers • {totalDPMSamples} potential samples</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {mockDPMByCustomer.map(renderDPMCustomerRow)}
                
                {mockDPMByCustomer.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <FlaskConical className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No DPM Early Start samples</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Work Area - Pipelines */}
          <div className="lg:col-span-9 space-y-6">
            {/* Pipeline Sections */}
            {renderPipelineSection('cannabinoids', 'Cannabinoids Pipeline', Beaker)}
            {renderPipelineSection('terpenes', 'Terpenes Pipeline', Beaker)}
            {renderPipelineSection('pesticides', 'Pesticides/Mycotoxins Pipeline', Beaker)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;