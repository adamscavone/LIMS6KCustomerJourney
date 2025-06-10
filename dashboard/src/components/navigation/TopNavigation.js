import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Home,
  Package,
  FileText,
  FlaskConical,
  Microscope,
  ClipboardCheck,
  Settings,
  User
} from 'lucide-react';

const TopNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const navigationRef = useRef(null);
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [location]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveSubDropdown(null);
  };

  const handleSubDropdownToggle = (subDropdownName, event) => {
    event.stopPropagation();
    setActiveSubDropdown(activeSubDropdown === subDropdownName ? null : subDropdownName);
  };

  const navigationItems = [
    {
      id: 'receiving',
      label: 'Receiving',
      icon: Package,
      items: [
        { label: 'Import Manifests from Metrc', path: '/receiving' },
        { label: 'Import Manifests from PELs', path: '/receiving' },
        { label: 'Current Manifests', path: '/receiving' },
        { label: 'Manifest Archive', path: '/receiving' }
      ]
    },
    {
      id: 'prep',
      label: 'Prep',
      icon: FlaskConical,
      items: [
        { label: 'Cannabinoids Prep', path: '/prep-batch/cannabinoids' },
        { label: 'Terpenes Prep', path: '/prep-batch/terpenes' },
        { label: 'Pesticides Prep', path: '/prep-batch/pesticides' }
      ]
    },
    {
      id: 'analysis',
      label: 'Analysis',
      icon: Microscope,
      items: [
        { label: 'Upload Results - Cannabinoids', path: '/analysis-batch/cannabinoids' },
        { label: 'Upload Results - Pesticides', path: '/analysis-batch/pesticides' },
        { label: 'Upload Results - Terpenes', path: '/analysis-batch/terpenes' }
      ]
    },
    {
      id: 'review',
      label: 'Review',
      icon: ClipboardCheck,
      items: [
        { label: 'Review Queue - Cannabinoids', path: '/review-queue/cannabinoids' },
        { label: 'Review Queue - Pesticides', path: '/review-queue/pesticides' },
        { label: 'Review Queue - Terpenes', path: '/review-queue/terpenes' }
      ]
    },
    {
      id: 'reporting',
      label: 'Reporting',
      icon: FileText,
      items: [
        { label: 'Samples Due Today', path: '/' },
        { label: 'Samples Due Tomorrow', path: '/' },
        { label: 'Turnaround Time Tracker', path: '/' },
        { label: 'Pre-Reporting Review Queue', path: '/' }
      ]
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Settings,
      items: [
        { label: 'COT Files', path: '/' },
        { label: 'Users', path: '/' },
        { label: 'Menu', path: '/' },
        {
          label: 'Asset Types',
          submenu: [
            { label: 'Asset Mapping', path: '/' },
            { label: 'Instrument Management', path: '/' },
            { label: 'Purchased Reagent', path: '/' },
            { label: 'Prepared Reagent', path: '/' },
            { label: 'Durable Asset', path: '/' }
          ]
        },
        { label: 'Sudoku Tables', path: '/' }
      ]
    }
  ];

  return (
    <nav ref={navigationRef} className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Branding and Navigation */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg font-bold text-base mr-3">
              NCTL
            </div>
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            {navigationItems.map((item) => (
              <DropdownNavItem
                key={item.id}
                item={item}
                isOpen={activeDropdown === item.id}
                onToggle={() => handleDropdownToggle(item.id)}
                activeSubDropdown={activeSubDropdown}
                onSubDropdownToggle={handleSubDropdownToggle}
              />
            ))}
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Dr. Sarah Chen</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const DropdownNavItem = ({ item, isOpen, onToggle, activeSubDropdown, onSubDropdownToggle }) => {
  const Icon = item.icon;
  
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isOpen ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-700'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon className="w-4 h-4" />
        <span>{item.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
          {item.items.map((subItem, index) => (
            <div key={index}>
              {subItem.submenu ? (
                <SubDropdownItem
                  item={subItem}
                  isOpen={activeSubDropdown === `${item.id}-${index}`}
                  onToggle={(e) => onSubDropdownToggle(`${item.id}-${index}`, e)}
                />
              ) : (
                <DropdownLink item={subItem} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SubDropdownItem = ({ item, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <ChevronRight className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute left-full top-0 ml-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1">
          {item.submenu.map((subItem, index) => (
            <DropdownLink key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownLink = ({ item }) => {
  return (
    <Link
      to={item.path}
      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <span>{item.label}</span>
        {item.badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            item.badge === 'Out-blue' 
              ? 'bg-cyan-100 text-cyan-800 border border-cyan-300' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            {item.badge}
          </span>
        )}
      </div>
    </Link>
  );
};

export default TopNavigation;