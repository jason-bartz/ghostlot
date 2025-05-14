import React, { useState, useEffect } from 'react';
import { Car, BarChart2, QrCode, Calendar, Users, LogOut, Settings, Edit, Trash2, Plus, Filter, 
  CheckCircle, XCircle, Clock, DollarSign, Upload, ArrowUp, Save, Eye, Share } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GhostLotDemo = () => {
  const [activeTab, setActiveTab] = useState('qr-codes');
  
  // Navigation items
  const navItems = [
    { id: 'qr-codes', label: 'QR Code Generator', icon: <QrCode className="h-5 w-5 mr-3" /> },
    { id: 'inventory', label: 'Inventory', icon: <Car className="h-5 w-5 mr-3" /> },
    { id: 'test-drives', label: 'Test Drive Requests', icon: <Calendar className="h-5 w-5 mr-3" /> },
    { id: 'reservations', label: 'Reservations', icon: <Users className="h-5 w-5 mr-3" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="h-5 w-5 mr-3" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5 mr-3" /> },
    { id: 'sign-out', label: 'Sign Out', icon: <LogOut className="h-5 w-5 mr-3" /> },
  ];
  
  // Common mock vehicle data used across tabs
  const vehicles = [
    { id: "v1", selected: false, stock_number: 'A12345', year: 2023, make: 'Toyota', model: 'Camry', trim: 'XLE', price: 32999, vin: '1HGCM82633A123456', status: 'Active', mileage: 12, exterior_color: 'Blue', interior_color: 'Beige', mpg: '28/39', engine: '2.5L 4-cylinder', transmission: 'Automatic', drivetrain: 'FWD', fuel_type: 'Gasoline', features: ['Leather Seats', 'Navigation', 'Sunroof'] },
    { id: "v2", selected: false, stock_number: 'A12346', year: 2022, make: 'Honda', model: 'Accord', trim: 'Sport', price: 28995, vin: '5UXWX7C5+BA123457', status: 'Active', mileage: 9857, exterior_color: 'White', interior_color: 'Black', mpg: '30/38', engine: '1.5L Turbo', transmission: 'CVT', drivetrain: 'FWD', fuel_type: 'Gasoline', features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay'] },
    { id: "v3", selected: false, stock_number: 'T98765', year: 2021, make: 'Ford', model: 'F-150', trim: 'Lariat', price: 45999, vin: 'JH4KB16534C123458', status: 'Reserved', mileage: 22456, exterior_color: 'Red', interior_color: 'Brown', mpg: '20/25', engine: '3.5L V6', transmission: 'Automatic', drivetrain: '4WD', fuel_type: 'Gasoline', features: ['Tow Package', 'Leather Seats', 'Heated Seats'] },
    { id: "v4", selected: false, stock_number: 'S54321', year: 2023, make: 'Tesla', model: 'Model 3', trim: 'Long Range', price: 52990, vin: 'WBABN33481J123459', status: 'Active', mileage: 5, exterior_color: 'Silver', interior_color: 'White', mpg: 'Electric', engine: 'Electric', transmission: 'Electric', drivetrain: 'AWD', fuel_type: 'Electric', features: ['Autopilot', 'Premium Sound', 'Glass Roof'] },
    { id: "v5", selected: false, stock_number: 'C67890', year: 2020, make: 'Chevrolet', model: 'Silverado', trim: 'LT Trail Boss', price: 38500, vin: '3VWPD71K05M123460', status: 'Sold', mileage: 35621, exterior_color: 'Black', interior_color: 'Gray', mpg: '16/21', engine: '5.3L V8', transmission: 'Automatic', drivetrain: '4WD', fuel_type: 'Gasoline', features: ['Off-Road Package', 'Tow Package', 'Bed Liner'] },
    { id: "v6", selected: false, stock_number: 'H24381', year: 2023, make: 'Hyundai', model: 'Tucson', trim: 'Limited', price: 36450, vin: 'KM8J3CAL4PU193826', status: 'Active', mileage: 8, exterior_color: 'Blue', interior_color: 'Black', mpg: '26/33', engine: '2.5L 4-cylinder', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['Panoramic Sunroof', 'Leather Seats', 'Navigation'] },
    { id: "v7", selected: false, stock_number: 'K76521', year: 2022, make: 'Kia', model: 'Telluride', trim: 'SX Prestige', price: 47250, vin: '5YJ3E1EA4KF305981', status: 'Active', mileage: 11243, exterior_color: 'Gray', interior_color: 'Black', mpg: '20/26', engine: '3.8L V6', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['3rd Row Seating', 'Heated/Ventilated Seats', 'Head-Up Display'] },
    { id: "v8", selected: false, stock_number: 'M71932', year: 2023, make: 'Mazda', model: 'CX-5', trim: 'Signature', price: 39800, vin: 'WA1AVAF5K2087329', status: 'Reserved', mileage: 7, exterior_color: 'Red', interior_color: 'Brown', mpg: '24/30', engine: '2.5L Turbo', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['Leather Seats', 'Navigation', 'Bose Sound System'] },
    { id: "v9", selected: false, stock_number: 'B98234', year: 2022, make: 'BMW', model: '330i', trim: 'xDrive', price: 49950, vin: 'WBAJA5C52KBW63935', status: 'Active', mileage: 9876, exterior_color: 'Black', interior_color: 'Beige', mpg: '25/34', engine: '2.0L Turbo', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['Premium Package', 'Navigation', 'Heated Seats'] },
    { id: "v10", selected: false, stock_number: 'N35781', year: 2023, make: 'Nissan', model: 'Altima', trim: 'SR', price: 31340, vin: '1N4BL4EV8KC215734', status: 'Active', mileage: 9, exterior_color: 'White', interior_color: 'Black', mpg: '27/37', engine: '2.5L 4-cylinder', transmission: 'CVT', drivetrain: 'FWD', fuel_type: 'Gasoline', features: ['Bluetooth', 'Backup Camera', 'Remote Start'] },
    { id: "v11", selected: false, stock_number: 'J87952', year: 2022, make: 'Jeep', model: 'Wrangler', trim: 'Rubicon', price: 52780, vin: '3GNAXSEV1KS612938', status: 'Active', mileage: 8764, exterior_color: 'Green', interior_color: 'Black', mpg: '17/23', engine: '3.6L V6', transmission: 'Automatic', drivetrain: '4WD', fuel_type: 'Gasoline', features: ['Removable Top', 'Off-Road Package', 'Alpine Audio'] },
    { id: "v12", selected: false, stock_number: 'V35217', year: 2023, make: 'Volvo', model: 'XC60', trim: 'Recharge', price: 59950, vin: 'YV4A22RK5K1257812', status: 'Active', mileage: 6, exterior_color: 'Silver', interior_color: 'Brown', mpg: 'Hybrid', engine: '2.0L Hybrid', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Hybrid', features: ['Premium Package', 'Bowers & Wilkins Audio', 'Pilot Assist'] },
    { id: "v13", selected: false, stock_number: 'A98726', year: 2022, make: 'Audi', model: 'Q5', trim: 'Premium Plus', price: 54750, vin: 'WA1BAAF6K2179023', status: 'Active', mileage: 12567, exterior_color: 'Blue', interior_color: 'Black', mpg: '23/28', engine: '2.0L Turbo', transmission: 'Automatic', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Panoramic Sunroof'] },
    { id: "v14", selected: false, stock_number: 'S73621', year: 2023, make: 'Subaru', model: 'Outback', trim: 'Wilderness', price: 38990, vin: '4S4BSANCOK3392682', status: 'Active', mileage: 11, exterior_color: 'Green', interior_color: 'Gray', mpg: '22/26', engine: '2.4L Turbo', transmission: 'CVT', drivetrain: 'AWD', fuel_type: 'Gasoline', features: ['Off-Road Package', 'Heated Seats', 'Roof Rails'] },
  ];

  // Mock test drive data
  const testDrives = [
    {
      id: "td1",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      vehicle: {
        id: "v1",
        year: 2023,
        make: "Toyota",
        model: "Camry",
        trim: "XLE"
      },
      customer: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567"
      },
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: "10:30 AM",
      status: "Pending",
      notes: "Customer is interested in upgrading from a 2018 Camry"
    },
    {
      id: "td2",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      vehicle: {
        id: "v2",
        year: 2022,
        make: "Honda",
        model: "Accord",
        trim: "Sport"
      },
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "(555) 987-6543"
      },
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      time: "3:00 PM",
      status: "Confirmed",
      notes: "Customer is comparing with Toyota Camry and Mazda 6"
    },
    {
      id: "td3",
      created_at: new Date(Date.now() - 259200000).toISOString(),
      vehicle: {
        id: "v3",
        year: 2021,
        make: "Ford",
        model: "F-150",
        trim: "Lariat"
      },
      customer: {
        name: "Michael Brown",
        email: "m.brown@example.com",
        phone: "(555) 456-7890"
      },
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      time: "1:45 PM",
      status: "Completed",
      notes: "Customer is trading in a 2015 Chevrolet Silverado"
    },
    {
      id: "td4",
      created_at: new Date(Date.now() - 345600000).toISOString(),
      vehicle: {
        id: "v4",
        year: 2023,
        make: "Tesla",
        model: "Model 3",
        trim: "Long Range"
      },
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        phone: "(555) 234-5678"
      },
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      time: "11:00 AM",
      status: "Cancelled",
      notes: "Customer rescheduled then cancelled due to financing"
    }
  ];

  // Mock reservations data
  const reservations = [
    {
      id: "res1",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      vehicle: {
        id: "v1",
        year: 2023,
        make: "Toyota",
        model: "Camry",
        trim: "XLE",
        price: 32999
      },
      customer: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567"
      },
      deposit_amount: 500,
      status: "Pending",
      has_trade_in: false,
      pickup_date: new Date(Date.now() + 604800000).toISOString().split('T')[0],
      notes: "Customer wants to add extended warranty"
    },
    {
      id: "res2",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      vehicle: {
        id: "v2",
        year: 2022,
        make: "Honda",
        model: "Accord",
        trim: "Sport",
        price: 28995
      },
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "(555) 987-6543"
      },
      deposit_amount: 1000,
      status: "Confirmed",
      has_trade_in: true,
      trade_in_details: {
        year: 2017,
        make: "Honda",
        model: "Civic",
        estimated_value: 12500
      },
      pickup_date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
      notes: "Customer needs financing through dealership"
    },
    {
      id: "res3",
      created_at: new Date(Date.now() - 259200000).toISOString(),
      vehicle: {
        id: "v3",
        year: 2021,
        make: "Ford",
        model: "F-150",
        trim: "Lariat",
        price: 45999
      },
      customer: {
        name: "Michael Brown",
        email: "m.brown@example.com",
        phone: "(555) 456-7890"
      },
      deposit_amount: 750,
      status: "Completed",
      has_trade_in: true,
      trade_in_details: {
        year: 2015,
        make: "Chevrolet",
        model: "Silverado",
        estimated_value: 17000
      },
      pickup_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      notes: "Deal completed 5/1/25"
    },
    {
      id: "res4",
      created_at: new Date(Date.now() - 345600000).toISOString(),
      vehicle: {
        id: "v4",
        year: 2023,
        make: "Tesla",
        model: "Model 3",
        trim: "Long Range",
        price: 52990
      },
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        phone: "(555) 234-5678"
      },
      deposit_amount: 1500,
      status: "Cancelled",
      has_trade_in: false,
      pickup_date: null,
      notes: "Customer found vehicle at another dealership"
    }
  ];

  // Mock analytics data
  const analyticsData = {
    summary: {
      totalScans: { value: 876, change: "+12% from last month" },
      testDrives: { value: 42, change: "+8% from last month" },
      savedVehicles: { value: 183, change: "+15% from last month" },
      userProfiles: { value: 291, change: "+5% from last month" }
    },
    directLinkPerformance: {
      totalLinksShared: { value: 345, change: "+18%" },
      linkClickThrough: { value: "68%", change: "+5%" },
      conversions: { value: 29, change: "+12%" },
      conversionRate: { value: "8.4%", change: "+2.1%" }
    },
    vehicleLinkPerformance: [
      { vehicle: "2023 Toyota Camry XLE", linksShared: 42, views: 38, conversion: "9.5%", source: "Email" },
      { vehicle: "2022 Honda Accord Sport", linksShared: 36, views: 32, conversion: "12.5%", source: "SMS" },
      { vehicle: "2021 Ford F-150 Lariat", linksShared: 29, views: 24, conversion: "16.7%", source: "Email" },
      { vehicle: "2023 Tesla Model 3 Long Range", linksShared: 53, views: 48, conversion: "10.4%", source: "SMS" }
    ],
    topPerformingVehicles: [
      { vehicle: "2023 Tesla Model 3 Long Range", qrScans: 87, testDrives: 12, saved: 34, conversionRate: "13.8%" },
      { vehicle: "2021 Ford F-150 Lariat", qrScans: 76, testDrives: 8, saved: 29, conversionRate: "10.5%" },
      { vehicle: "2022 Honda Accord Sport", qrScans: 68, testDrives: 7, saved: 24, conversionRate: "10.3%" },
      { vehicle: "2023 Toyota Camry XLE", qrScans: 65, testDrives: 9, saved: 21, conversionRate: "13.8%" }
    ],
    charts: {
      eventDistribution: [
        { name: 'QR Scans', value: 876 },
        { name: 'Views', value: 624 },
        { name: 'Test Drives', value: 42 },
        { name: 'Reservations', value: 29 }
      ],
      dailyActivity: Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 30) + 10
        };
      })
    }
  };

  // Mock dealer settings data
  const dealerSettings = {
    name: 'City Auto Group',
    email: 'info@cityautogroup.com',
    phone: '(555) 123-4567',
    location: '123 Main Street, Grand Island, NY 14072',
    website: 'https://www.cityautogroup.com',
    primary_color: '#5046e5',
    text_color: '#ffffff',
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    social_media: {
      facebook: 'https://facebook.com/cityautogroup',
      instagram: 'https://instagram.com/cityautogroup',
      twitter: '',
      youtube: ''
    }
  };

  // =============== QR CODES TAB STATE AND FUNCTIONS ===============
  const [vehicleData, setVehicleData] = useState(vehicles.map(v => ({ ...v, selected: false })));
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [generateLoading, setGenerateLoading] = useState(false);

  const handleSelectAll = () => {
    const updatedVehicles = vehicleData.map(vehicle => ({ ...vehicle, selected: true }));
    setVehicleData(updatedVehicles);
    setSelectedVehicles(updatedVehicles);
  };

  const handleDeselectAll = () => {
    const updatedVehicles = vehicleData.map(vehicle => ({ ...vehicle, selected: false }));
    setVehicleData(updatedVehicles);
    setSelectedVehicles([]);
  };

  const toggleVehicleSelection = (id) => {
    const updatedVehicles = vehicleData.map(vehicle => 
      vehicle.id === id ? { ...vehicle, selected: !vehicle.selected } : vehicle
    );
    setVehicleData(updatedVehicles);
    setSelectedVehicles(updatedVehicles.filter(v => v.selected));
  };

  const handleGenerateQR = () => {
    if (selectedVehicles.length === 0) {
      alert('Please select at least one vehicle');
      return;
    }
    
    setGenerateLoading(true);
    setTimeout(() => {
      setGenerateLoading(false);
      setShowPrintMenu(true);
    }, 1000);
  };

  const handleGenerateSingle = (vehicle) => {
    setGenerateLoading(true);
    setTimeout(() => {
      setGenerateLoading(false);
      alert(`QR code generated for ${vehicle.year} ${vehicle.make} ${vehicle.model}`);
    }, 500);
  };

  const handlePreview = (vehicle) => {
    alert(`Preview for ${vehicle.year} ${vehicle.make} ${vehicle.model}`);
  };

  const handlePrint = () => {
    setShowPrintMenu(false);
    alert('Printing QR codes for selected vehicles');
  };

  // =============== INVENTORY TAB STATE AND FUNCTIONS ===============
  const [inventoryVehicles, setInventoryVehicles] = useState(vehicles);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [syncMethod, setSyncMethod] = useState('manual');
  const [inventoryFilter, setInventoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form data for editing/adding vehicles
  const [formData, setFormData] = useState({
    stock_number: '',
    vin: '',
    year: 0,
    make: '',
    model: '',
    trim: '',
    price: 0,
    mileage: 0,
    exterior_color: '',
    interior_color: '',
    mpg: '',
    engine: '',
    transmission: '',
    drivetrain: '',
    fuel_type: '',
    features: [],
    status: 'Active'
  });

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      stock_number: vehicle.stock_number,
      vin: vehicle.vin,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      price: vehicle.price,
      mileage: vehicle.mileage,
      exterior_color: vehicle.exterior_color,
      interior_color: vehicle.interior_color,
      mpg: vehicle.mpg,
      engine: vehicle.engine,
      transmission: vehicle.transmission,
      drivetrain: vehicle.drivetrain,
      fuel_type: vehicle.fuel_type,
      features: vehicle.features || [],
      status: vehicle.status
    });
    setShowEditModal(true);
  };

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      stock_number: '',
      vin: '',
      year: new Date().getFullYear(),
      make: '',
      model: '',
      trim: '',
      price: 0,
      mileage: 0,
      exterior_color: '',
      interior_color: '',
      mpg: '',
      engine: '',
      transmission: '',
      drivetrain: '',
      fuel_type: '',
      features: [],
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleDeleteConfirm = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!vehicleToDelete) return;
    setInventoryVehicles(inventoryVehicles.filter(v => v.id !== vehicleToDelete.id));
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFormData({ ...formData, status });
  };

  const handleFeaturesChange = (e) => {
    const featuresText = e.target.value;
    const featuresArray = featuresText.split('\n').map(feature => feature.trim()).filter(Boolean);
    setFormData({ ...formData, features: featuresArray });
  };

  const handleFilterChange = (e) => {
    setInventoryFilter(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    
    if (editingVehicle) {
      // Update existing vehicle
      setInventoryVehicles(
        inventoryVehicles.map(vehicle => 
          vehicle.id === editingVehicle.id 
            ? { ...vehicle, ...formData } 
            : vehicle
        )
      );
      setShowEditModal(false);
    } else {
      // Add new vehicle
      const newVehicle = {
        ...formData,
        id: `v${inventoryVehicles.length + 1}`,
        created_at: new Date().toISOString()
      };
      setInventoryVehicles([...inventoryVehicles, newVehicle]);
      setShowAddModal(false);
    }
  };

  const changeStatus = (vehicleId, newStatus) => {
    setInventoryVehicles(
      inventoryVehicles.map(vehicle => 
        vehicle.id === vehicleId 
          ? { ...vehicle, status: newStatus } 
          : vehicle
      )
    );
  };

  const copyToClipboard = (vehicle) => {
    alert(`URL for ${vehicle.year} ${vehicle.make} ${vehicle.model} copied to clipboard!`);
  };

  // Filter inventory vehicles based on filter and search
  const filteredInventoryVehicles = inventoryVehicles
    .filter(vehicle => {
      // Apply status filter
      if (inventoryFilter !== 'all' && vehicle.status !== inventoryFilter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          vehicle.stock_number.toLowerCase().includes(query) ||
          vehicle.vin.toLowerCase().includes(query) ||
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          (vehicle.trim && vehicle.trim.toLowerCase().includes(query))
        );
      }
      
      return true;
    });

  // =============== TEST DRIVES TAB STATE AND FUNCTIONS ===============
  const [testDriveData, setTestDriveData] = useState(testDrives);
  const [showTestDriveDetails, setShowTestDriveDetails] = useState(null);
  const [testDriveFilter, setTestDriveFilter] = useState('all');

  const updateTestDriveStatus = (id, status) => {
    setTestDriveData(
      testDriveData.map(td => 
        td.id === id ? { ...td, status } : td
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // =============== RESERVATIONS TAB STATE AND FUNCTIONS ===============
  const [reservationData, setReservationData] = useState(reservations);
  const [showReservationDetails, setShowReservationDetails] = useState(null);
  const [reservationFilter, setReservationFilter] = useState('all');

  const updateReservationStatus = (id, status) => {
    setReservationData(
      reservationData.map(res => 
        res.id === id ? { ...res, status } : res
      )
    );
  };

  // =============== ANALYTICS TAB STATE AND FUNCTIONS ===============
  const [analytics, setAnalytics] = useState(analyticsData);
  const [dateRange, setDateRange] = useState('30days');

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // =============== SETTINGS TAB STATE AND FUNCTIONS ===============
  const [dealerData, setDealerData] = useState(dealerSettings);
  const [success, setSuccess] = useState(false);

  const handleDealerInputChange = (e) => {
    const { name, value } = e.target;
    setDealerData({
      ...dealerData,
      [name]: value
    });
  };

  const handleHoursChange = (day, value) => {
    setDealerData({
      ...dealerData,
      hours: {
        ...dealerData.hours,
        [day]: value
      }
    });
  };

  const handleSocialMediaChange = (platform, value) => {
    setDealerData({
      ...dealerData,
      social_media: {
        ...dealerData.social_media,
        [platform]: value
      }
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  // =============== TAB RENDERING FUNCTIONS ===============

  // Render the QR Code Generator Tab
  const renderQRCodesTab = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">QR Code Generator</h2>
          <div className="flex gap-3">
            <button 
              onClick={handleGenerateQR}
              className={`bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium ${generateLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={selectedVehicles.length === 0 || generateLoading}
            >
              {generateLoading ? 'Generating...' : 'Generate QR Codes'}
            </button>
            <button 
              onClick={handleSelectAll}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Select All
            </button>
            <button 
              onClick={handleDeselectAll}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={selectedVehicles.length === 0}
            >
              Deselect All
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Select
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicleData.map((vehicle) => (
                <tr key={vehicle.id} className="transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={vehicle.selected}
                      onChange={() => toggleVehicleSelection(vehicle.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.stock_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${vehicle.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.vin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleGenerateSingle(vehicle)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Generate Single QR
                    </button>
                    <button 
                      onClick={() => handlePreview(vehicle)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Print Menu Modal */}
        {showPrintMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Print QR Codes</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Print Options</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    You are about to print QR codes for {selectedVehicles.length} vehicles.
                  </p>
                  
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="include-details" 
                        name="print-option" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" 
                        defaultChecked 
                      />
                      <label htmlFor="include-details" className="ml-2 text-sm text-gray-700">
                        Include vehicle details
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="qr-only" 
                        name="print-option" 
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" 
                      />
                      <label htmlFor="qr-only" className="ml-2 text-sm text-gray-700">
                        QR codes only
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">QR Code Size</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="small">Small (4 per page)</option>
                    <option value="medium" selected>Medium (2 per page)</option>
                    <option value="large">Large (1 per page)</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowPrintMenu(false)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the Inventory Management Tab
  const renderInventoryTab = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <div className="flex gap-3">
            <select
              value={syncMethod}
              onChange={(e) => setSyncMethod(e.target.value)}
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <option value="manual">Manual Import</option>
              <option value="frazer">Frazer DMS</option>
              <option value="dealertrack">Dealertrack DMS</option>
            </select>
            
            <button 
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {syncMethod === 'manual' ? 'Upload CSV' : 'Sync Inventory'}
            </button>
            
            <button 
              onClick={handleAddVehicle}
              className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="inline h-4 w-4 mr-1" />
              Add Vehicle
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="relative rounded-md shadow-sm flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={inventoryFilter}
                onChange={handleFilterChange}
                className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Vehicles</option>
                <option value="Active">Active Only</option>
                <option value="Reserved">Reserved Only</option>
                <option value="Sold">Sold Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VIN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventoryVehicles.map((vehicle) => (
                <tr 
                  key={vehicle.id} 
                  className={`${vehicle.status === 'Sold' ? 'bg-gray-100' : ''} cursor-pointer hover:bg-gray-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vehicle.stock_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${vehicle.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.vin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        vehicle.status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => copyToClipboard(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Copy URL
                    </button>
                    <button 
                      onClick={() => handleEditVehicle(vehicle)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Edit className="h-4 w-4 inline" />
                      <span className="ml-1">Edit</span>
                    </button>
                    {vehicle.status !== 'Sold' && (
                      <button 
                        onClick={() => changeStatus(vehicle.id, 'Sold')}
                        className="text-gray-600 hover:text-gray-900 mr-2"
                      >
                        Mark Sold
                      </button>
                    )}
                    {vehicle.status === 'Active' && (
                      <button 
                        onClick={() => changeStatus(vehicle.id, 'Reserved')}
                        className="text-yellow-600 hover:text-yellow-900 mr-2"
                      >
                        Reserve
                      </button>
                    )}
                    {vehicle.status === 'Reserved' && (
                      <button 
                        onClick={() => changeStatus(vehicle.id, 'Active')}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Unreserve
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteConfirm(vehicle)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredInventoryVehicles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No vehicles found. Add a vehicle to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && vehicleToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete the {vehicleToDelete.year} {vehicleToDelete.make} {vehicleToDelete.model}? This action cannot be undone.
                </p>
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Vehicle Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Edit Vehicle</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSaveVehicle} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Number
                    </label>
                    <input
                      type="text"
                      name="stock_number"
                      value={formData.stock_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VIN
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleNumberInputChange}
                      required
                      min={1900}
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trim
                    </label>
                    <input
                      type="text"
                      name="trim"
                      value={formData.trim}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleNumberInputChange}
                      required
                      min={0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mileage
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleNumberInputChange}
                      required
                      min={0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    name="features"
                    value={formData.features.join('\n')}
                    onChange={handleFeaturesChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Vehicle Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Add New Vehicle</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSaveVehicle} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Number
                    </label>
                    <input
                      type="text"
                      name="stock_number"
                      value={formData.stock_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      VIN
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleNumberInputChange}
                      required
                      min={1900}
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleNumberInputChange}
                      required
                      min={0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleStatusChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the Test Drive Requests Tab
  const renderTestDrivesTab = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Test Drive Requests</h2>
          <div className="flex gap-4">
            <select
              value={testDriveFilter}
              onChange={(e) => setTestDriveFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Calendar className="h-4 w-4 inline mr-2" />
              Calendar View
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testDriveData.map((td) => (
                <React.Fragment key={td.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setShowTestDriveDetails(showTestDriveDetails === td.id ? null : td.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{td.customer.name}</div>
                      <div className="text-sm text-gray-500">{td.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {td.vehicle.year} {td.vehicle.make} {td.vehicle.model} {td.vehicle.trim}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(td.date).toLocaleDateString()}</div>
                      <div>{td.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusClass(td.status)}`}>
                        {getStatusIcon(td.status)}
                        <span className="ml-1">{td.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {td.status === 'Pending' && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateTestDriveStatus(td.id, 'Confirmed'); }}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateTestDriveStatus(td.id, 'Cancelled'); }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {td.status === 'Confirmed' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateTestDriveStatus(td.id, 'Completed'); }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                  {showTestDriveDetails === td.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="mb-2">
                          <h4 className="text-sm font-medium text-gray-900">Customer Details:</h4>
                          <p className="text-sm text-gray-500">{td.customer.phone}</p>
                        </div>
                        <div className="mb-2">
                          <h4 className="text-sm font-medium text-gray-900">Notes:</h4>
                          <p className="text-sm text-gray-500">{td.notes || 'No notes provided'}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Request Created:</h4>
                          <p className="text-sm text-gray-500">{new Date(td.created_at).toLocaleString()}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {testDriveData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No test drive requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render the Reservations Tab
  const renderReservationsTab = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Vehicle Reservations</h2>
          <div className="flex gap-4">
            <select
              value={reservationFilter}
              onChange={(e) => setReservationFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Reservations</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Export Report
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deposit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservationData.map((res) => (
                <React.Fragment key={res.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setShowReservationDetails(showReservationDetails === res.id ? null : res.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{res.customer.name}</div>
                      <div className="text-sm text-gray-500">{res.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {res.vehicle.year} {res.vehicle.make} {res.vehicle.model} {res.vehicle.trim}
                      <div className="font-medium text-gray-900">${res.vehicle.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center text-sm font-medium text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {res.deposit_amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {res.pickup_date ? new Date(res.pickup_date).toLocaleDateString() : 'Not scheduled'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusClass(res.status)}`}>
                        {getStatusIcon(res.status)}
                        <span className="ml-1">{res.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {res.status === 'Pending' && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateReservationStatus(res.id, 'Confirmed'); }}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateReservationStatus(res.id, 'Cancelled'); }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {res.status === 'Confirmed' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateReservationStatus(res.id, 'Completed'); }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Mark Completed
                        </button>
                      )}
                    </td>
                  </tr>
                  {showReservationDetails === res.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Details:</h4>
                            <p className="text-sm text-gray-500">Phone: {res.customer.phone}</p>
                            <p className="text-sm text-gray-500">Financing Pre-approved: {res.has_trade_in ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            {res.has_trade_in && res.trade_in_details && (
                              <>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Trade-in Vehicle:</h4>
                                <p className="text-sm text-gray-500">
                                  {res.trade_in_details.year} {res.trade_in_details.make} {res.trade_in_details.model}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Estimated Value: ${res.trade_in_details.estimated_value.toLocaleString()}
                                </p>
                              </>
                            )}
                          </div>
                          <div className="col-span-2">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Notes:</h4>
                            <p className="text-sm text-gray-500">{res.notes || 'No notes provided'}</p>
                          </div>
                          <div className="col-span-2">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Reservation Created:</h4>
                            <p className="text-sm text-gray-500">{new Date(res.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {reservationData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render the Analytics Dashboard Tab
  const renderAnalyticsTab = () => {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          
          <div className="mt-4 sm:mt-0">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <select
              id="dateRange"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Scans</p>
                <h2 className="text-3xl font-bold text-indigo-600">{analytics.summary.totalScans.value}</h2>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.summary.totalScans.change}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Test Drives</p>
                <h2 className="text-3xl font-bold text-blue-600">{analytics.summary.testDrives.value}</h2>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.summary.testDrives.change}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Saved Vehicles</p>
                <h2 className="text-3xl font-bold text-purple-600">{analytics.summary.savedVehicles.value}</h2>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.summary.savedVehicles.change}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">User Profiles</p>
                <h2 className="text-3xl font-bold text-teal-600">{analytics.summary.userProfiles.value}</h2>
                <p className="text-green-500 text-xs mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {analytics.summary.userProfiles.change}
                </p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Direct Link Performance Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Direct Link Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Total Links Shared</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.totalLinksShared.value}</h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                {analytics.directLinkPerformance.totalLinksShared.change}
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Link Click-Through</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.linkClickThrough.value}</h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                {analytics.directLinkPerformance.linkClickThrough.change}
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Conversions</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.conversions.value}</h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                {analytics.directLinkPerformance.conversions.change}
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <p className="text-gray-500 text-sm">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">{analytics.directLinkPerformance.conversionRate.value}</h3>
              <p className="text-green-500 text-xs mt-1 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                {analytics.directLinkPerformance.conversionRate.change}
              </p>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Event Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.charts.eventDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.charts.eventDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Activity Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.charts.dailyActivity}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Event Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Performing Vehicles Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Top Performing Vehicles</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    QR Scans
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Drives
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Saved
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analytics.topPerformingVehicles.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.vehicle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.qrScans}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.testDrives}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.saved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.conversionRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render the Settings Tab
  const renderSettingsTab = () => {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Dealer Settings</h2>
          <button
            onClick={handleSaveSettings}
            className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
        
        {success && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Settings saved successfully!
          </div>
        )}
        
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dealership Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={dealerData.name}
                  onChange={handleDealerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={dealerData.email}
                  onChange={handleDealerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={dealerData.phone}
                  onChange={handleDealerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={dealerData.location}
                  onChange={handleDealerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={dealerData.website}
                  onChange={handleDealerInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          {/* Branding */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Branding</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="flex items-center">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 inline mr-1" />
                        Upload Logo
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 400x200 pixels, max 2MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full mr-3 border border-gray-300" 
                      style={{ backgroundColor: dealerData.primary_color }}
                    ></div>
                    <input
                      type="text"
                      name="primary_color"
                      value={dealerData.primary_color}
                      onChange={handleDealerInputChange}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="color"
                      value={dealerData.primary_color}
                      onChange={(e) => setDealerData({ ...dealerData, primary_color: e.target.value })}
                      className="ml-2 h-8 w-8 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Used for buttons and primary UI elements
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                                      <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full mr-3 border border-gray-300" 
                      style={{ backgroundColor: dealerData.text_color }}
                    ></div>
                    <input
                      type="text"
                      name="text_color"
                      value={dealerData.text_color}
                      onChange={handleDealerInputChange}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="color"
                      value={dealerData.text_color}
                      onChange={(e) => setDealerData({ ...dealerData, text_color: e.target.value })}
                      className="ml-2 h-8 w-8 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Used for text on primary-colored elements
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    className="py-2 px-4 rounded-md w-48 text-center" 
                    style={{ 
                      backgroundColor: dealerData.primary_color, 
                      color: dealerData.text_color
                    }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Business Hours */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Business Hours</h3>
            
            <div className="space-y-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="flex items-center">
                  <div className="w-1/4 text-sm font-medium text-gray-700">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                  <div className="w-3/4">
                    <input
                      type="text"
                      value={dealerData.hours[day]}
                      onChange={(e) => handleHoursChange(day, e.target.value)}
                      placeholder="9:00 AM - 6:00 PM or Closed"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
              
              <p className="text-xs text-gray-500 mt-1">
                Format: "9:00 AM - 6:00 PM" or "Closed"
              </p>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={dealerData.social_media.facebook}
                  onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourdealership"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={dealerData.social_media.instagram}
                  onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourdealership"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={dealerData.social_media.twitter}
                  onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourdealership"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube
                </label>
                <input
                  type="url"
                  value={dealerData.social_media.youtube}
                  onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/c/yourdealership"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
                    
};

export default GhostLotDemo;