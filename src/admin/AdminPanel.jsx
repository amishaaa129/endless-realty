import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [activityFiles, setActivityFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [propertyNewsFiles, setPropertyNewsFiles] = useState([]);
  const [updatesFiles, setUpdatesFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    organization: '',
    price: '',
    status: '',
    location: [],
    address: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floors: '',
    amenities: '',
    youtube: '',
    thumbnailUrl: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.endlessrealty.in';

  // Statistics
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    recentProperties: 0
  });

  // Define admin users - in production, this should be stored securely in backend
  const adminUsers = [
    { email: 'admin@gmail.com', name: 'Admin' },
    { email: 'manager@endlessrealty.com', name: 'Manager' },
    { email: 'rohit@endlessrealty.com', name: 'Rohit Singhal' },
    { email: 'amisha@endlessrealty.com' , name: 'Amisha'}
  ];

  useEffect(() => {
    // Check if user is logged in to the main site
    const mainSiteLoginStatus = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (mainSiteLoginStatus === 'true' && userData) {
      const user = JSON.parse(userData);
      
      // Check if the logged-in user is an admin
      const isAdmin = adminUsers.some(adminUser => adminUser.email === user.email);
      
      if (isAdmin) {
        const adminUser = adminUsers.find(adminUser => adminUser.email === user.email);
        setIsLoggedIn(true);
        setIsAdminUser(true);
        setCurrentUser(adminUser.name);
      } else {
        setIsLoggedIn(false);
        setIsAdminUser(false);
        setAuthError('Access denied. You do not have admin privileges.');
      }
    } else {
      setIsLoggedIn(false);
      setIsAdminUser(false);
      setAuthError('Please log in to the main site first.');
    }

    // Load properties from localStorage or initialize empty array
    // Fetch properties from backend API
const fetchProperties = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/properties/all`);
    const data = await res.json();

    // Ensure images are always arrays
    const parsedData = data.map(p => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images || []
    }));

    setProperties(parsedData);
    updateStats(parsedData);
    localStorage.setItem('adminProperties', JSON.stringify(parsedData));
  } catch (err) {
    console.error('Failed to fetch properties:', err);
  }
};
fetchProperties();

  }, []);

  const updateStats = (propertiesList) => {
    const total = propertiesList.length;

    const active = propertiesList.filter(p => 
      p.status?.toLowerCase() === 'ready-to-move'
    ).length;

    const recentProperties = propertiesList.filter(p => {
      const createdAt = new Date(p.created_at); // ✅ PostgreSQL column
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return createdAt >= oneWeekAgo;
    });

    setStats({
      totalProperties: total,
      activeProperties: active,
      recentProperties: recentProperties.length
    });

    // Store for cards in dashboard
    setRecentProperties(recentProperties.slice(0, 6));
  };


  const fetchUsersByRole = async (role) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/role/${role}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Failed to fetch ${role}s:`, err);
    return [];
  }
};
useEffect(() => {
  return () => {
    imagePreview.forEach(url => URL.revokeObjectURL(url));
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
  };
}, [imagePreview, thumbnailPreview]);


useEffect(() => {
  const loadUsers = async () => {
    if (['buyers', 'sellers', 'associates'].includes(activeSection)) {
      const roleMap = {
        buyers: 'buyer',
        sellers: 'seller',
        associates: 'business_associate',
      };
      const role = roleMap[activeSection];
      const data = await fetchUsersByRole(role);
      setUsers(data);
    }
  };
  loadUsers();
}, [activeSection]);


  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check if user is an admin
    const adminUser = adminUsers.find(admin => admin.email === email);
    
    if (adminUser && password === process.env.ADMIN_PASSWORD) {
      // Store admin login state
      const userData = {
        name: adminUser.name,
        email: adminUser.email
      };
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setCurrentUser(adminUser.name);
      setIsLoggedIn(true);
      setIsAdminUser(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin credentials or access denied.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setIsAdminUser(false);
    setCurrentUser('');
    setActiveSection('dashboard');
    navigate('/');
  };

  const handleMultipleImageUpload = async (files, category) => {
  console.log("Supabase URL:", process.env.SUPABASE_URL);
  console.log("🔄 Starting image upload...");
  console.log("📁 Category:", category);
  console.log("📷 Files to upload:", files);

  const uploadedUrls = [];

  for (const file of files) {
    const fileName = `${Date.now()}_${file.name}`.replace(/\s+/g, "_");
    console.log(`🆙 Uploading file: ${fileName}`);

    try {
      const { data, error } = await supabase.storage
        .from(category)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type, // ✅ Ensure proper MIME type is set
        });

      if (error) {
        console.error(`❌ Upload failed for ${fileName}:`, error.message);
        continue;
      }

      console.log(`✅ Uploaded: ${fileName}`);

      const publicUrl = supabase
        .storage
        .from(category)
        .getPublicUrl(fileName).data.publicUrl;

      console.log("🌐 Public URL:", publicUrl);
      uploadedUrls.push(publicUrl);
    } catch (err) {
      console.error(`🚨 Unexpected error uploading ${fileName}:`, err);
    }
  }

  console.log(`✅ Uploaded ${uploadedUrls.length}/${files.length} images`);
  alert(`${uploadedUrls.length} images uploaded to ${category}`);
  return uploadedUrls;
};

  const redirectToMainSite = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (file, category) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/api/uploads/${category}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.fileUrl;
};

  const handleSubmitProperty = async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('thumbnail', thumbnailFile);
  console.log(form.images);
  console.log(imageFiles);

      Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => form.append(key, v)); // handles location[] correctly
      } else {
        form.append(key, value);
      }
    });


  imageFiles.forEach(file => {
    form.append('images', file); // "images" matches multer field name
  });

  try {
    const res = await fetch(`${API_BASE_URL}/api/properties/add`, {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    if (res.ok) {
      alert('Property added successfully!');
      setFormData({ title: '',
    type: '',
    organization: '',
    price: '',
    status: '',
    location: [],
    address: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floors: '',
    amenities: '',
    youtube: '',
  thumbnailUrl:''});
      setImageFiles([]);
      setImagePreview([]);
    } else {
      console.error('Upload error:', data.error);
      alert('Upload failed');
    }
  } catch (err) {
    console.error('Server error:', err);
  }
};

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      type: property.type,
      organization: property.organization,
      price: property.price,
      status: property.status,
      location: property.location,
      address: property.address,
      description: property.description,
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      area: property.area || '',
      floors: property.floors || '',
      amenities: property.amenities || '',
      youtube: property.youtube || '',
      thumbnailUrl: property.thumbnailUrl || ''
    });
    setImagePreview(property.images || []);
    setShowModal(true);
  };
  useEffect(() => {
  return () => {
    imagePreview.forEach(url => URL.revokeObjectURL(url));
  };
}, [imagePreview]);

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      setProperties(updatedProperties);
      localStorage.setItem('adminProperties', JSON.stringify(updatedProperties));
      updateStats(updatedProperties);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadExcel = (sectionType, users) => {
  if (!users || users.length === 0) return;

  // Convert users to worksheet
  const worksheet = XLSX.utils.json_to_sheet(users);

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sectionType);

  // Convert workbook to binary
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // Trigger download
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(dataBlob, `${sectionType}_data.xlsx`);
};

  const renderNavigation = () => {
    const navItems = [
      { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
      { id: 'properties', icon: 'fas fa-home', label: 'Properties' },
      { id: 'add-property', icon: 'fas fa-plus', label: 'Add Property' },
      { id: 'associates', icon: 'fas fa-users', label: 'Associates' },
      { id: 'buyers', icon: 'fas fa-user-tie', label: 'Buyers' },
      { id: 'sellers', icon: 'fas fa-user-tag', label: 'Sellers' },
      { id: 'activities', icon: 'fas fa-tasks', label: 'Activities' },
      { id: 'property-news', icon: 'fas fa-newspaper', label: 'Property News' },
      { id: 'gallery', icon: 'fas fa-images', label: 'Gallery' },
      { id: 'updates', icon: 'fas fa-bell', label: 'Updates' },
      { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
    ];

    return (
      <nav className="bg-gray-800 text-white p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
              activeSection === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-home text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProperties}</h3>
              <p className="text-gray-600">Total Properties</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-eye text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeProperties}</h3>
              <p className="text-gray-600">Active Listings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <i className="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.recentProperties}</h3>
              <p className="text-gray-600">Recent Additions</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProperties.map(property => (
            <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={property.thumbnail_url || 'https://via.placeholder.com/400x250'}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">{property.title}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>{property.address}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  {property.type?.toLowerCase() !== 'plot' && (
                    <div className="flex items-center">
                      <i className="fas fa-bed mr-1 text-blue-600"></i>
                      <span>{property.bhk} BHK</span>
                    </div>
                    )}

                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>{property.area_sqft} sq.ft.</span>
                  </div>
                        {property.price_label !== 'Coming Soon' && (
                <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                </div>
                )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting at</span>
                    <div className="text-xl font-bold text-gray-900">
                      {property.price_label || `₹${(property.price_value / 100000).toFixed(2)} Lakhs`}
                    </div>
                  </div>
                  <a
                    href={`/${property.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );

  const renderProperties = () => {
    const filteredProperties = statusFilter === 'all'
    ? properties
    : properties.filter(prop => prop.status?.toLowerCase() === statusFilter);

  return (
    <div className="mt-10">
  <div className="mb-4">
  <h2 className="text-xl font-semibold mb-2">All Properties</h2>
  <div className="w-full md:w-60">
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full border px-3 py-2 rounded-md text-sm"
    >
      <option value="all">All Status</option>
      <option value="ready-to-move">Ready to Move</option>
      <option value="sold-out">Sold Out</option>
      <option value="coming-soon">Coming Soon</option>
    </select>
  </div>
</div>

  <div className="w-screen overflow-x-auto">
    <div className="min-w-[4000px] px-6 pb-10">
      <table className="table-auto w-full text-sm text-left border-collapse">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="px-4 py-3 whitespace-nowrap min-w-[150px]">Title</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[100px]">Type</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Organization</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Price (₹)</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Status</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[200px]">Location</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[200px]">Address</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[300px]">Description</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[80px]">BHK</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[100px]">Bathrooms</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[130px]">Area (sqft)</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[80px]">Floors</th>
      <th className="px-4 py-3 whitespace-nowrap min-w-[180px]">YouTube</th>
    </tr>
  </thead>
  <tbody>
    {filteredProperties.map((property) => (
      <tr key={property.id} className="border-t hover:bg-gray-50">
        <td className="px-4 py-2">{property.title}</td>
        <td className="px-4 py-2">{property.type}</td>
        <td className="px-4 py-2">{property.organization}</td>
        <td className="px-4 py-2">{property.price_value}</td>
        <td className="px-4 py-2">{property.status}</td>
        <td className="px-4 py-2">{Array.isArray(property.location) ? property.location.join(', ') : property.location}</td>
        <td className="px-4 py-2">{property.address}</td>
        <td className="px-4 py-2">{property.description}</td>
        <td className="px-4 py-2">{property.bhk}</td>
        <td className="px-4 py-2">{property.bathrooms}</td>
        <td className="px-4 py-2">{property.area_sqft}</td>
        <td className="px-4 py-2">{property.floors}</td>
        <td className="px-4 py-2">
          <a href={property.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Link
          </a>
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

  const renderAddProperty = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Property</h2>
      <form onSubmit={handleSubmitProperty} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Property Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="row-houses">Row Houses</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
              Organization *
            </label>
            <select
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Organization</option>
              <option value="alliance">Alliance</option>
              <option value="individual-property">Individual Property</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="ready-to-move">Ready to Move</option>
          <option value="sold-out">Sold Out</option>
          <option value="coming-soon">Coming Soon</option>
            </select>
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Silicon City",
              "Rau",
              "Mhow",
              "Pithampur",
              "CAT Road",
              "Ujjain Road",
              "AB Bypass Road",
              "Bicholi"
            ].map((loc) => (
              <label key={loc} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={loc}
                  checked={formData.location?.includes(loc)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const checked = e.target.checked;
                    setFormData((prev) => {
                      let updated = prev.location || [];
                      if (checked) {
                        updated = [...updated, value];
                      } else {
                        updated = updated.filter((item) => item !== value);
                      }
                      return { ...prev, location: updated };
                    });
                  }}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">{loc}</span>
              </label>
            ))}
          </div>
        </div>



          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Property Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
  
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            required
            placeholder="Enter detailed property description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Thumbnail Image
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      setThumbnailFile(file);
      if (file) {
        setThumbnailPreview(URL.createObjectURL(file));
      }
    }}
    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
  />
  {thumbnailPreview && (
    <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 h-32 rounded border" />
  )}
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files);

                setImageFiles((prevFiles) => {
                  const merged = [...prevFiles, ...selectedFiles];
                  
                  // Optional: remove duplicates by name
                  const unique = Array.from(new Map(merged.map(file => [file.name, file])).values());
                  
                  return unique;
                });

                // Update previews
                const selectedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
                setImagePreview((prev) => [...prev, ...selectedPreviews]);
              }}
              className="hidden"
              id="propertyImages"
            />
            <label htmlFor="propertyImages" className="cursor-pointer">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-600">Drag & drop images here or click to browse</p>
            </label>
          </div>
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
              Area (sq ft)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-2">
              Floors
            </label>
            <input
              type="number"
              id="floors"
              name="floors"
              value={formData.floors}
              onChange={handleInputChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <textarea
            id="amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            rows={3}
            placeholder="Enter amenities (separated by commas)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video Link
          </label>
          <input
            type="url"
            id="youtube"
            name="youtube"
            value={formData.youtube}
            onChange={handleInputChange}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Property
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({...formData, status: 'draft'});
              setTimeout(() => handleSubmitProperty(new Event('submit')), 0);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                type: '',
                organization: '',
                price: '',
                status: '',
                location: [],
                address: '',
                description: '',
                bedrooms: '',
                bathrooms: '',
                area: '',
                floors: '',
                amenities: '',
                youtube: '',
                thumbnailUrl: ''
              });
              setImageFiles([]);
              setImagePreview([]);
              setActiveSection('properties');
            }}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const renderDataSection = (sectionType) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold capitalize">{sectionType}</h2>
      <button
        onClick={() => downloadExcel(sectionType, users)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
      >
        <i className="fas fa-file-excel"></i>
        <span>Download Excel</span>
      </button>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      {users.length === 0 ? (
        <p className="text-gray-600">No {sectionType} data available yet.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

  const renderImageUploadSection = (files, setFiles, category) => {
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select images first.");
      return;
    }

    await handleMultipleImageUpload(files, category);
    setFiles([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">{category.replace("-", " ")}</h2>
      <form onSubmit={handleUploadSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id={`${category}Images`}
              onChange={handleFileChange}
            />
            <label htmlFor={`${category}Images`} className="cursor-pointer">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-600">Drag & drop images here or click to browse</p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload
        </button>
      </form>
    </div>
  );
};


  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">API Integration</h3>
          <p className="text-gray-600 mb-4">Integrate with your main website</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-2">Public API Endpoint:</p>
            <code className="bg-gray-800 text-green-400 px-3 py-1 rounded">GET /api/public/properties</code>
            <p className="text-sm text-gray-600 mt-2">Use this endpoint to fetch properties on your main website</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Image Settings</h3>
          <p className="text-gray-600 mb-4">Configure image upload settings</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maximum file size: 10MB</li>
            <li>• Supported formats: JPG, PNG, GIF</li>
            <li>• Images are automatically optimized</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
  switch (activeSection) {
    case 'dashboard':
      return renderDashboard();
    case 'properties':
      return renderProperties();
    case 'add-property':
      return renderAddProperty();
    case 'associates':
      return renderDataSection('associates');
    case 'buyers':
      return renderDataSection('buyers');
    case 'sellers':
      return renderDataSection('sellers');
    case 'activities':
      return renderImageUploadSection(activityFiles, setActivityFiles, 'activities');
    case 'property-news':
      return renderImageUploadSection(propertyNewsFiles, setPropertyNewsFiles, 'property-news');
    case 'gallery':
      return renderImageUploadSection(galleryFiles, setGalleryFiles, 'gallery');
    case 'updates':
      return renderImageUploadSection(updatesFiles, setUpdatesFiles, 'updates');
    case 'settings':
      return renderSettings();
    default:
      return renderDashboard();
  }
};

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <i className="fas fa-building text-blue-600 mr-2"></i>
              EndlessRealty
            </h1>
            <p className="text-gray-600">Property Management Admin</p>
          </div>
          
          {authError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                <span className="text-red-700">{authError}</span>
              </div>
              {authError.includes('log in to the main site') && (
                <div className="mt-3">
                  <button
                    onClick={redirectToMainSite}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    Go to Main Site
                  </button>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Login to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <i className="fas fa-building text-blue-600 mr-2"></i>
              EndlessRealty Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {currentUser}</span>
            <button
              onClick={() => navigate('/')}
              className="border border-blue-300 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Go to Main Site
            </button>
            <button
              onClick={handleLogout}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-800 min-h-screen">
          {renderNavigation()}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Property</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProperty(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              {renderAddProperty()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
