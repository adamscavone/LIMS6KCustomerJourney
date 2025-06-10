import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Clock, 
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Navigation,
  Timer,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  Building2,
  Search,
  Edit2,
  Check,
  X
} from 'lucide-react';

const SamplingDashboard = () => {
  const drivers = [
    'Patty', 'Brandon', 'Tasha', 'Luke', 'Aric', 
    'Joe', 'Chris', 'Alex', 'Charles', 'Nadia', 'Adam'
  ];

  // Client data parsed from CSV
  const clientData = [
    { dbaName: '', name: 'Agri-Med', address: '33590 Salem School Lot Road', city: 'Langsville', zip: '45741' },
    { dbaName: '', name: 'Ancient Roots', address: '2420 S. US Highway 68', city: 'Wilmington', zip: '45177' },
    { dbaName: '', name: 'Appalachian Pharm Processing', address: '16064 Beaver Pike', city: 'Jackson', zip: '45640' },
    { dbaName: '', name: 'Ascension Biomedical', address: '200 Artino St', city: 'Oberlin', zip: '44074' },
    { dbaName: '', name: 'Ayr Wellness', address: '', city: 'Akron', zip: '44310' },
    { dbaName: '', name: 'Battle Green', address: '1225 Boltonfield St.', city: 'Columbus', zip: '43228' },
    { dbaName: '', name: 'Beneleaves Unlimited', address: '745 Harrison Drive', city: 'Columbus', zip: '43204' },
    { dbaName: '', name: 'Buckeye Relief', address: '33525 Curtis Blvd', city: 'Eastlake', zip: '44095' },
    { dbaName: '', name: 'CannAscend Ohio', address: '100 Davids Drive', city: 'Wilmington', zip: '45177' },
    { dbaName: '', name: 'Certified Cultivators', address: '1654 Springfield St.', city: 'Dayton', zip: '45403' },
    { dbaName: '', name: 'Cielo Jardin', address: '21700 St. Clair', city: 'Euclid', zip: '44117' },
    { dbaName: '', name: 'Columbia Care Ohio', address: '223 Homan Way', city: 'Mt Orab', zip: '45154' },
    { dbaName: '', name: 'Corsa Verde', address: '630 N Hague Ave', city: 'Columbus', zip: '43204' },
    { dbaName: '', name: 'Cresco', address: '1130 Springs Way', city: 'Yellow Springs', zip: '45387' },
    { dbaName: '', name: 'Curaleaf', address: '150 Commerce Blvd.', city: 'Johnstown', zip: '43031' },
    { dbaName: '', name: 'Diamond Science, LLC', address: '2046 Valley Street', city: 'Dayton', zip: '45404' },
    { dbaName: '', name: 'Farkas Farms', address: '19341 Vermont St', city: 'Grafton', zip: '44044' },
    { dbaName: '', name: 'Farm to Flower', address: '18681 Vermont St.', city: 'Grafton', zip: '44044' },
    { dbaName: '', name: 'Farmaceutical RX', address: '2000 Harvey Ave.', city: 'East Liverpool', zip: '43920' },
    { dbaName: '', name: 'Fire Rock', address: '1076 Home Ave', city: 'Akron', zip: '44310' },
    { dbaName: '', name: 'Fire Rock Processing', address: '873 N 20th St', city: 'Columbus', zip: '43219' },
    { dbaName: '', name: 'Firelands Scientific', address: '2300 University Drive E', city: 'Huron', zip: '44839' },
    { dbaName: '', name: 'FN Group Holdings (Wellspring Fields)', address: '4000 Lake Rockwell Rd', city: 'Ravenna', zip: '44266' },
    { dbaName: '', name: 'Franklin BioScience Ohio', address: '3087 East 14th Ave', city: 'Columbus', zip: '43219' },
    { dbaName: '', name: 'Galenas', address: '1956 S. Main St', city: 'Akron', zip: '44301' },
    { dbaName: '', name: 'Grassroots Cannabis (Ohio Green Grow)', address: '367 E. State Line Rd', city: 'Toledo', zip: '43612' },
    { dbaName: '', name: 'Green Investment Partners', address: '1516 Alum Industrial Dr S', city: 'Columbus', zip: '43209' },
    { dbaName: '', name: 'GreenLeaf Gardens', address: '15335 Madison Rd', city: 'Middlefield', zip: '44062' },
    { dbaName: '', name: 'GreenLeaf Therapeutics', address: '15335 Madison Rd', city: 'Middlefield', zip: '44062' },
    { dbaName: '', name: 'Grow Ohio', address: '6440 Maysville Pike', city: 'East Fultonham', zip: '43735' },
    { dbaName: '', name: 'GTI Ohio Cultivation', address: '5835 Jason St', city: 'Toledo', zip: '43605' },
    { dbaName: '', name: 'GTI Ohio Processing', address: 'Jason St', city: 'Toledo', zip: '43611' },
    { dbaName: '', name: 'Harvest Grows, LLC', address: '1265 County Road', city: 'Irontown', zip: '45638' },
    { dbaName: '', name: 'Hemma', address: '100 Edison Dr', city: 'Middletown', zip: '45044' },
    { dbaName: '', name: 'Hundred % Labs (Real Growth Investments II, RGI)', address: '103 Day Rd', city: 'Mt Orab', zip: '45154' },
    { dbaName: '', name: 'Innovative Healing Solutions, LLC', address: '11127 Spencerville Rd', city: 'Spencerville', zip: '45887' },
    { dbaName: '', name: 'Jushi Processing', address: '3087 E 14th Ave', city: 'Columbus', zip: '43219' },
    { dbaName: '', name: 'Klutch Cannabis', address: '', city: 'Akron', zip: '44302' },
    { dbaName: '', name: 'Lighthouse Sciences', address: '34099 Melinz Parkway Unit F', city: 'Eastlake', zip: '44095' },
    { dbaName: '', name: 'Main Street Health', address: '7631 North Main St.', city: 'Clayton', zip: '45415' },
    { dbaName: '', name: 'Mother Grows Best', address: 'Lot #5 Steinway Blvd SE', city: 'Canton', zip: '44707' },
    { dbaName: '', name: 'NEN Holdings', address: '101 Kemple Dr.', city: 'East Palestine', zip: '44413' },
    { dbaName: '', name: 'NEN Holdings', address: '102 Kemple Dr.', city: 'East Palestine', zip: '44413' },
    { dbaName: '', name: 'North Coast Testing Labs - Internal Samples', address: '10100 Wellman Road', city: 'Streetsboro', zip: '44241' },
    { dbaName: '', name: 'North Coast Therapeutics', address: '8231 Murray Ridge Rd', city: 'Elyria', zip: '44035' },
    { dbaName: '', name: 'Ohio Clean Leaf', address: '2046 Valley Street', city: 'Dayton', zip: '45404' },
    { dbaName: '', name: 'Ohio Green Systems', address: '8100 Old Granger Rd', city: 'Garfield Heights', zip: '44125' },
    { dbaName: '', name: 'One Orijin Labs (Schottenstein)', address: '4308 E Fifth Ave', city: 'Columbus', zip: '43219' },
    { dbaName: '', name: 'PharmaCann Ohio', address: '10767 Mill Dam Rd', city: 'Hebron', zip: '43025' },
    { dbaName: '', name: 'PharmaCann Ohio', address: '4020 Hunts Landing Rd.', city: 'Buckeye Lake', zip: '43008' },
    { dbaName: '', name: 'Pure Ohio Wellness', address: '4020 Dayton Springfield Rd.', city: 'Springfield', zip: '45502' },
    { dbaName: '', name: 'Purpose Leaf', address: '6913 Dayton-Springfield Rd', city: 'Enon', zip: '45323' },
    { dbaName: '', name: 'Ritegene Technologies, LLC', address: '4444 Tobias Road', city: 'Marion', zip: '43302' },
    { dbaName: '', name: 'Riviera Creek Holdings, LLC', address: '1275 Crescent St', city: 'Youngstown', zip: '44502' },
    { dbaName: '', name: 'Rope-A-Dope', address: '10100 Wellman Rd', city: 'Streetboro', zip: '44241' },
    { dbaName: '', name: 'Solomon Cultivation Corp', address: '155 Commerce Blvd', city: 'Johnstown', zip: '43031' },
    { dbaName: '', name: 'Standard Farms', address: '14646 Neo Parkway', city: 'Cleveland', zip: '44128' },
    { dbaName: '', name: 'Standard Wellness', address: '105 Commerce Drive', city: 'Gibsonburg', zip: '43431' },
    { dbaName: '', name: 'Sun Theory Ohio, LLC', address: '8231 Murray Ridge Rd', city: 'Elyria', zip: '44035' },
    { dbaName: 'Appalachian Pharm Products', name: 'Appalachian Pharm Products', address: '16064 Beaver Pike', city: 'Jackson', zip: '45640' },
    { dbaName: 'Ayr Wellness Cultivation', name: 'Ayr Wellness Cultivation', address: '', city: 'Parma', zip: '' },
    { dbaName: 'BaM', name: 'NMG OH P1', address: '716 Sugar Ln', city: 'Elyria', zip: '44035' },
    { dbaName: 'Battle Green', name: 'Battle Green', address: '1225 Boltonfield St.', city: 'Columbus', zip: '43228' },
    { dbaName: 'Cielo Jardin', name: 'Cielo Jardin', address: '21700 St. CLair', city: 'Euclid', zip: '44117' },
    { dbaName: 'Farm to Flower', name: 'Strive Wellness of Ohio LLC', address: '18681 Vermont St', city: 'Grafton', zip: '44044' },
    { dbaName: 'Harvest Processing', name: 'Harvest Processing', address: '1265 County Road 1A', city: 'Ironton', zip: '45638' },
    { dbaName: 'Jushi Cultivation', name: 'OhiGrow', address: '367 E State Line Rd', city: 'Toledo', zip: '43612' },
    { dbaName: 'King City Gardens', name: 'King City Gardens', address: '12171 Omniplex Court', city: 'Cincinnati', zip: '45240' },
    { dbaName: 'Leaf Relief Ohio', name: 'Quest Wellness Ohio', address: '4900 Market St', city: 'Youngstown', zip: '44512' },
    { dbaName: 'Marichron Pharma LLC', name: 'Marichron Pharma LLC', address: '1011 Baker Drive', city: 'Baker Drive', zip: '45050' },
    { dbaName: 'Noohra Labs, LLC', name: 'Noohra Labs, LLC', address: '3700 Inpark Circle', city: 'Dayton', zip: '45414' },
    { dbaName: 'Ohio Processing Plant', name: 'Ohio Processing Plant', address: '23024 County Road', city: 'Coshocton', zip: '43812' },
    { dbaName: 'Paragon', name: 'Paragon Development Group', address: '9292 OH-201', city: 'Tipp City', zip: '45371' },
    { dbaName: 'Terradiol', name: 'Terradiol Ohio, LLC', address: '3800 Harmont Ave', city: 'Canton', zip: '44705' }
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState({});
  const [selectedDriver, setSelectedDriver] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [editingPickup, setEditingPickup] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Get unique client names
  const uniqueClients = Array.from(new Set(clientData.map(client => 
    client.dbaName || client.name
  ))).sort();

  // Get all locations for a client
  const getClientLocations = (clientName) => {
    return clientData.filter(client => 
      (client.dbaName || client.name) === clientName
    );
  };

  // Format date key for storage
  const getDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get schedule for selected date
  const getDateSchedule = () => {
    const dateKey = getDateKey(selectedDate);
    return schedules[dateKey] || { pickups: [] };
  };

  // Add a new pickup
  const addPickup = (client, location, time) => {
    const dateKey = getDateKey(selectedDate);
    const newPickup = {
      id: Date.now(),
      client,
      location,
      address: location.address,
      city: location.city,
      zip: location.zip,
      time,
      assignedDriver: null,
      status: 'scheduled',
      notes: ''
    };

    setSchedules(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        pickups: [...(prev[dateKey]?.pickups || []), newPickup]
      }
    }));
    setShowClientSelector(false);
  };

  // Assign pickup to driver
  const assignDriver = (pickupId, driverName) => {
    const dateKey = getDateKey(selectedDate);
    setSchedules(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        pickups: prev[dateKey].pickups.map(pickup =>
          pickup.id === pickupId 
            ? { ...pickup, assignedDriver: driverName }
            : pickup
        )
      }
    }));
  };

  // Update pickup details
  const updatePickup = (pickupId, field, value) => {
    const dateKey = getDateKey(selectedDate);
    setSchedules(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        pickups: prev[dateKey].pickups.map(pickup =>
          pickup.id === pickupId ? { ...pickup, [field]: value } : pickup
        )
      }
    }));
  };

  // Remove pickup
  const removePickup = (pickupId) => {
    const dateKey = getDateKey(selectedDate);
    setSchedules(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        pickups: prev[dateKey].pickups.filter(pickup => pickup.id !== pickupId)
      }
    }));
  };

  // Navigate calendar
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Check if date is today
  const isToday = () => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  };

  // Get pickups for a specific driver
  const getDriverPickups = (driverName) => {
    const schedule = getDateSchedule();
    return schedule.pickups
      .filter(pickup => pickup.assignedDriver === driverName)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  // Get unassigned pickups
  const getUnassignedPickups = () => {
    const schedule = getDateSchedule();
    return schedule.pickups
      .filter(pickup => !pickup.assignedDriver)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Format date for display
  const formatDateHeader = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return selectedDate.toLocaleDateString('en-US', options);
  };

  // Search clients
  const filteredClients = uniqueClients.filter(client =>
    client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'at-location': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full px-2 py-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sampling Dispatch</h1>
              <p className="text-gray-600 mt-1">Schedule client pickups and assign drivers</p>
            </div>
            <div className="text-sm text-gray-500">
              Current Time: {formatTime(currentTime)}
            </div>
          </div>
          
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold">{formatDateHeader()}</h2>
                {isToday() && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    TODAY
                  </span>
                )}
              </div>
              <button
                onClick={() => navigateDate(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Go to Today
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Unassigned Pickups & Add New */}
          <div className="col-span-4 space-y-4">
            {/* Add New Pickup */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Schedule New Pickup
              </h2>
              <button
                onClick={() => setShowClientSelector(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Building2 className="w-5 h-5 mr-2" />
                Add Client Pickup
              </button>
            </div>

            {/* Unassigned Pickups */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Unassigned Pickups ({getUnassignedPickups().length})
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getUnassignedPickups().map(pickup => (
                  <div key={pickup.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{pickup.client}</h4>
                        <p className="text-sm text-gray-600 mt-1">{pickup.address}</p>
                        <p className="text-sm text-gray-600">{pickup.city}, {pickup.zip}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="font-medium">{pickup.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removePickup(pickup.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3">
                      <select
                        onChange={(e) => assignDriver(pickup.id, e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Assign to driver...</option>
                        {drivers.map(driver => (
                          <option key={driver} value={driver}>{driver}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {getUnassignedPickups().length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No unassigned pickups for this date
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Driver Schedules */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Driver Schedules
              </h2>
              
              {/* Driver Columns */}
              <div className="grid grid-cols-3 gap-4">
                {drivers.map(driver => {
                  const pickups = getDriverPickups(driver);
                  return (
                    <div key={driver} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium text-gray-900">{driver}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {pickups.length} stops
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-2 space-y-2 min-h-[400px] max-h-[600px] overflow-y-auto">
                        {pickups.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-8">
                            No pickups scheduled
                          </p>
                        ) : (
                          <>
                            {/* Lab Start */}
                            <div className="p-2 bg-blue-50 rounded text-xs">
                              <div className="flex items-center font-medium text-blue-900">
                                <MapPin className="w-3 h-3 mr-1" />
                                NCTL Lab
                              </div>
                              <div className="ml-4 text-blue-700">Depart: 8:00 AM</div>
                            </div>
                            
                            {/* Pickups */}
                            {pickups.map((pickup, index) => (
                              <div key={pickup.id} className="p-2 bg-gray-50 rounded text-xs">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                      {index + 1}. {pickup.client}
                                    </div>
                                    <div className="text-gray-600 mt-1">
                                      {pickup.address}
                                    </div>
                                    <div className="text-gray-600">
                                      {pickup.city}, {pickup.zip}
                                    </div>
                                    <div className="flex items-center mt-1 text-gray-700">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {pickup.time}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      assignDriver(pickup.id, null);
                                    }}
                                    className="text-gray-400 hover:text-red-600 p-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                            {/* Lab Return */}
                            {pickups.length > 0 && (
                              <div className="p-2 bg-blue-50 rounded text-xs">
                                <div className="flex items-center font-medium text-blue-900">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  Return to Lab
                                </div>
                                <div className="ml-4 text-blue-700">Est: Calculate</div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Selector Modal */}
      {showClientSelector && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedLocation ? 'Schedule Pickup' : 'Select Client for Pickup'}
              </h3>
              <button
                onClick={() => {
                  setShowClientSelector(false);
                  setSelectedLocation(null);
                  setPickupDate('');
                  setPickupTime('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {!selectedLocation ? (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search clients..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Client List */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredClients.map(clientName => {
                      const locations = getClientLocations(clientName);
                      return (
                        <div key={clientName} className="border border-gray-200 rounded-lg">
                          <div className="p-3 bg-gray-50">
                            <h4 className="font-medium text-gray-900">{clientName}</h4>
                            <p className="text-sm text-gray-600">
                              {locations.length} location{locations.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {locations.map((location, idx) => (
                              <div key={idx} className="p-3 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-900">{location.address}</p>
                                    <p className="text-sm text-gray-600">{location.city}, {location.zip}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setSelectedLocation({ ...location, clientName });
                                      // Set default date to selected date
                                      const dateStr = selectedDate.toISOString().split('T')[0];
                                      setPickupDate(dateStr);
                                    }}
                                    className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                  >
                                    Select
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Date/Time Picker */
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{selectedLocation.clientName}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedLocation.address}</p>
                  <p className="text-sm text-gray-600">{selectedLocation.city}, {selectedLocation.zip}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Time
                    </label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setSelectedLocation(null);
                      setPickupDate('');
                      setPickupTime('');
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (pickupDate && pickupTime) {
                        // Format time for display
                        const [hours, minutes] = pickupTime.split(':');
                        const hour = parseInt(hours);
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                        const formattedTime = `${displayHour}:${minutes} ${ampm}`;
                        
                        // If date is different from currently selected date, update it
                        const newDate = new Date(pickupDate);
                        if (newDate.toDateString() !== selectedDate.toDateString()) {
                          setSelectedDate(newDate);
                        }
                        
                        addPickup(selectedLocation.clientName, selectedLocation, formattedTime);
                        setSelectedLocation(null);
                        setPickupDate('');
                        setPickupTime('');
                      }
                    }}
                    disabled={!pickupDate || !pickupTime}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Schedule Pickup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SamplingDashboard;