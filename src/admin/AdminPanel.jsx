import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    organization: '',
    price: '',
    status: 'draft',
    location: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    floors: '',
    amenities: '',
    youtube: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

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
    const storedProperties = localStorage.getItem('adminProperties');
    if (storedProperties) {
      const parsedProperties = JSON.parse(storedProperties);
      setProperties(parsedProperties);
      updateStats(parsedProperties);
    }
  }, []);

  const updateStats = (propertiesList) => {
    const total = propertiesList.length;
    const active = propertiesList.filter(p => p.status === 'active').length;
    const recent = propertiesList.filter(p => {
      const createdDate = new Date(p.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdDate > weekAgo;
    }).length;

    setStats({
      totalProperties: total,
      activeProperties: active,
      recentProperties: recent
    });
  };

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmitProperty = (e) => {
    e.preventDefault();
    const newProperty = {
      id: editingProperty ? editingProperty.id : Date.now(),
      ...formData,
      images: imagePreview,
      createdAt: editingProperty ? editingProperty.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedProperties;
    if (editingProperty) {
      updatedProperties = properties.map(p => p.id === editingProperty.id ? newProperty : p);
    } else {
      updatedProperties = [...properties, newProperty];
    }

    setProperties(updatedProperties);
    localStorage.setItem('adminProperties', JSON.stringify(updatedProperties));
    updateStats(updatedProperties);

    // Reset form
    setFormData({
      title: '',
      type: '',
      organization: '',
      price: '',
      status: 'draft',
      location: '',
      description: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      floors: '',
      amenities: '',
      youtube: ''
    });
    setImageFiles([]);
    setImagePreview([]);
    setEditingProperty(null);
    setShowModal(false);
    setActiveSection('properties');
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
      description: property.description,
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      area: property.area || '',
      floors: property.floors || '',
      amenities: property.amenities || '',
      youtube: property.youtube || ''
    });
    setImagePreview(property.images || []);
    setShowModal(true);
  };

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

  const downloadExcel = (dataType) => {
    // In a real application, you would implement actual Excel export
    alert(`Downloading ${dataType} data as Excel file...`);
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
          {properties.slice(0, 6).map(property => (
            <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900">{property.title}</h4>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-lg font-semibold text-blue-600">₹{property.price}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                property.status === 'active' ? 'bg-green-100 text-green-800' :
                property.status === 'inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {property.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">All Properties</h2>
        <button
          onClick={() => setActiveSection('add-property')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Property</span>
        </button>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {property.images && property.images[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{property.title}</h3>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="text-xl font-bold text-blue-600 mb-2">₹{property.price}</p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  property.status === 'active' ? 'bg-green-100 text-green-800' :
                  property.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProperty(property)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
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
              <option value="Alliance">Alliance</option>
              <option value="Individual Property">Individual Property</option>
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
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Location</option>
              <option value="Silicon City">Silicon City</option>
              <option value="Rau">Rau</option>
              <option value="Mhow">Mhow</option>
              <option value="Pithampur">Pithampur</option>
              <option value="CAT Road">CAT Road</option>
              <option value="Ujjain Road">Ujjain Road</option>
              <option value="AB Bypass Road">AB Bypass Road</option>
              <option value="Bicholi">Bicholi</option>
            </select>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
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
                status: 'draft',
                location: '',
                description: '',
                bedrooms: '',
                bathrooms: '',
                area: '',
                floors: '',
                amenities: '',
                youtube: ''
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
        <h2 className="text-2xl font-semibold text-gray-900 capitalize">{sectionType}</h2>
        <button
          onClick={() => downloadExcel(sectionType)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-file-excel"></i>
          <span>Download Excel</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">No {sectionType} data available yet. Data will be displayed here once available.</p>
      </div>
    </div>
  );

  const renderImageUploadSection = (sectionType) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">{sectionType.replace('-', ' ')}</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id={`${sectionType}Images`}
            />
            <label htmlFor={`${sectionType}Images`} className="cursor-pointer">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-600">Drag & drop images here or click to browse</p>
            </label>
          </div>
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
        return renderImageUploadSection('activities');
      case 'property-news':
        return renderImageUploadSection('property-news');
      case 'gallery':
        return renderImageUploadSection('gallery');
      case 'updates':
        return renderImageUploadSection('updates');
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
