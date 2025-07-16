// Global variables
let currentUser = null;
let properties = [];
let selectedImages = [];

// API Base URL
const API_BASE = window.location.origin;

// Utility functions
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const adminContent = document.querySelector('.admin-content');
    adminContent.insertBefore(messageDiv, adminContent.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Authentication functions
async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        currentUser = data.user;
        
        showLoginScreen(false);
        updateUserInfo();
        loadDashboard();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    showLoginScreen(true);
}

function showLoginScreen(show) {
    const loginScreen = document.getElementById('loginScreen');
    const adminInterface = document.getElementById('adminInterface');
    
    if (show) {
        loginScreen.style.display = 'flex';
        adminInterface.style.display = 'none';
    } else {
        loginScreen.style.display = 'none';
        adminInterface.style.display = 'flex';
    }
}

function updateUserInfo() {
    const userInfo = document.getElementById('userInfo');
    if (currentUser) {
        userInfo.textContent = `Welcome, ${currentUser.username}`;
    }
}

// Navigation functions
function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Property management functions
async function loadProperties() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/properties`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load properties');
        }

        properties = await response.json();
        renderProperties();
        updateDashboardStats();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function renderProperties() {
    const propertiesList = document.getElementById('propertiesList');
    const recentPropertiesList = document.getElementById('recentPropertiesList');
    
    if (!propertiesList || !recentPropertiesList) return;

    // Filter properties based on search and status
    const searchTerm = document.getElementById('searchProperties')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    let filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchTerm) ||
                            property.location.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || property.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Render properties list
    propertiesList.innerHTML = filteredProperties.map(property => `
        <div class="property-card">
            <img src="${property.images[0] || '/placeholder-property.jpg'}" alt="${property.title}" class="property-image">
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="property-price">${formatPrice(property.price)}</p>
                <span class="property-status ${property.status}">${property.status}</span>
                <div class="property-actions">
                    <button class="btn btn-outline" onclick="editProperty(${property.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary" onclick="deleteProperty(${property.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Render recent properties (last 6)
    const recentProperties = properties.slice(-6).reverse();
    recentPropertiesList.innerHTML = recentProperties.map(property => `
        <div class="property-card">
            <img src="${property.images[0] || '/placeholder-property.jpg'}" alt="${property.title}" class="property-image">
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="property-price">${formatPrice(property.price)}</p>
                <span class="property-status ${property.status}">${property.status}</span>
            </div>
        </div>
    `).join('');
}

function updateDashboardStats() {
    const totalProperties = document.getElementById('totalProperties');
    const activeProperties = document.getElementById('activeProperties');
    const recentProperties = document.getElementById('recentProperties');

    if (totalProperties) totalProperties.textContent = properties.length;
    if (activeProperties) activeProperties.textContent = properties.filter(p => p.status === 'active').length;
    if (recentProperties) recentProperties.textContent = properties.filter(p => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(p.createdAt) > oneWeekAgo;
    }).length;
}

async function addProperty(formData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/properties`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to add property');
        }

        const newProperty = await response.json();
        properties.push(newProperty);
        
        showMessage('Property added successfully!');
        document.getElementById('propertyForm').reset();
        selectedImages = [];
        updateImagePreview();
        if(document.getElementById('youtubeLink')) document.getElementById('youtubeLink').value = '';
        
        // Switch to properties list
        switchSection('properties');
        renderProperties();
        updateDashboardStats();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function deleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/api/properties/${propertyId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete property');
        }

        properties = properties.filter(p => p.id !== propertyId);
        showMessage('Property deleted successfully!');
        renderProperties();
        updateDashboardStats();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Image upload functions
function setupImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('propertyImages');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#667eea';
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e1e5e9';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e1e5e9';
        
        const files = Array.from(e.dataTransfer.files);
        handleImageFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleImageFiles(files);
    });
}

function handleImageFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImages.push({
                file: file,
                preview: e.target.result
            });
            updateImagePreview();
        };
        reader.readAsDataURL(file);
    });
}

function updateImagePreview() {
    const previewContainer = document.getElementById('imagePreview');
    if (!previewContainer) return;

    previewContainer.innerHTML = selectedImages.map((image, index) => `
        <div class="preview-item">
            <img src="${image.preview}" alt="Preview">
            <button class="remove-btn" onclick="removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function removeImage(index) {
    selectedImages.splice(index, 1);
    updateImagePreview();
}

// Helper for section image uploads
function setupSectionImageUpload(section) {
    const uploadArea = document.getElementById(`${section}ImageUploadArea`);
    const fileInput = document.getElementById(`${section}Images`);
    const previewContainer = document.getElementById(`${section}ImagePreview`);
    let selectedImages = [];

    if (!uploadArea || !fileInput || !previewContainer) return;

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#667eea';
    });
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e1e5e9';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e1e5e9';
        const files = Array.from(e.dataTransfer.files);
        handleSectionImageFiles(files);
    });
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleSectionImageFiles(files);
    });
    function handleSectionImageFiles(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedImages.push({ file, preview: e.target.result });
                updateSectionImagePreview();
            };
            reader.readAsDataURL(file);
        });
    }
    function updateSectionImagePreview() {
        previewContainer.innerHTML = selectedImages.map((image, index) => `
            <div class="preview-item">
                <img src="${image.preview}" alt="Preview">
                <button class="remove-btn" onclick="removeSectionImage('${section}', ${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    window[`removeSectionImage_${section}`] = function(index) {
        selectedImages.splice(index, 1);
        updateSectionImagePreview();
    };
    window[`removeSectionImage`] = function(sectionName, index) {
        if (sectionName === section) window[`removeSectionImage_${section}`](index);
    };
    // Form submit
    const form = document.getElementById(`${section}ImageForm`);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!selectedImages.length) {
                showMessage('Please select at least one image to upload.', 'error');
                return;
            }
            const formData = new FormData();
            selectedImages.forEach(img => formData.append('images', img.file));
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/upload/${section}`, {
                    method: 'POST',
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                    body: formData
                });
                if (!response.ok) throw new Error('Upload failed');
                showMessage('Images uploaded successfully!');
                selectedImages = [];
                updateSectionImagePreview();
                form.reset();
            } catch (err) {
                showMessage('Upload failed', 'error');
            }
        });
    }
}

// Form handling
function setupPropertyForm() {
    const form = document.getElementById('propertyForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const propertyData = {
            title: document.getElementById('propertyTitle').value,
            type: document.getElementById('propertyType').value,
            organization: document.getElementById('organizationType').value,
            price: parseFloat(document.getElementById('propertyPrice').value),
            status: document.getElementById('propertyStatus').value,
            location: document.getElementById('propertyLocation').value,
            description: document.getElementById('propertyDescription').value,
            bedrooms: parseInt(document.getElementById('propertyBedrooms').value) || 0,
            bathrooms: parseInt(document.getElementById('propertyBathrooms').value) || 0,
            area: parseInt(document.getElementById('propertyArea').value) || 0,
            floors: parseInt(document.getElementById('propertyFloors').value) || 1,
            amenities: document.getElementById('propertyAmenities').value,
            youtube: document.getElementById('youtubeLink').value
        };

        formData.append('property', JSON.stringify(propertyData));
        
        selectedImages.forEach((image, index) => {
            formData.append('images', image.file);
        });

        await addProperty(formData);
    });

    // Save as draft button
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            document.getElementById('propertyStatus').value = 'draft';
            form.dispatchEvent(new Event('submit'));
        });
    }

    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                form.reset();
                selectedImages = [];
                updateImagePreview();
                switchSection('properties');
            }
        });
    }
}

// Search and filter functions
function setupFilters() {
    const searchInput = document.getElementById('searchProperties');
    const statusFilter = document.getElementById('statusFilter');

    if (searchInput) {
        searchInput.addEventListener('input', renderProperties);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', renderProperties);
    }
}

// Dashboard functions
function loadDashboard() {
    loadProperties();
}

// Demo data for tables
const associates = [
    { name: 'John Doe', email: 'john@example.com', phone: '9876543210' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '9123456780' }
];
const buyers = [
    { name: 'Buyer One', email: 'buyer1@example.com', phone: '9000000001' },
    { name: 'Buyer Two', email: 'buyer2@example.com', phone: '9000000002' }
];
const sellers = [
    { name: 'Seller One', email: 'seller1@example.com', phone: '8000000001' },
    { name: 'Seller Two', email: 'seller2@example.com', phone: '8000000002' }
];

function renderTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!data.length) {
        container.innerHTML = '<p>No data available.</p>';
        return;
    }
    const headers = Object.keys(data[0]);
    container.innerHTML = `
        <div class="table-responsive">
        <table class="admin-table">
            <thead><tr>${headers.map(h => `<th>${h.charAt(0).toUpperCase() + h.slice(1)}</th>`).join('')}</tr></thead>
            <tbody>
                ${data.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('')}
            </tbody>
        </table>
        </div>
    `;
}

function setupDownloadButtons() {
    document.getElementById('downloadAssociates')?.addEventListener('click', () => {
        window.location.href = '/api/excel/associates';
    });
    document.getElementById('downloadBuyers')?.addEventListener('click', () => {
        window.location.href = '/api/excel/buyers';
    });
    document.getElementById('downloadSellers')?.addEventListener('click', () => {
        window.location.href = '/api/excel/sellers';
    });
}

function renderAllTables() {
    renderTable('associatesTableContainer', associates);
    renderTable('buyersTableContainer', buyers);
    renderTable('sellersTableContainer', sellers);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        showLoginScreen(false);
        updateUserInfo();
        loadDashboard();
    } else {
        showLoginScreen(true);
    }

    // Setup event listeners
    setupLoginForm();
    setupNavigation();
    setupPropertyForm();
    setupImageUpload();
    setupFilters();
    setupLogout();
    setupAddPropertyButton();
    renderAllTables();
    setupDownloadButtons();
    ['activities', 'propertyNews', 'gallery', 'updates'].forEach(section => {
        setupSectionImageUpload(section.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/-/g, ''));
    });
});

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }
}

function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            switchSection(section);
        });
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function setupAddPropertyButton() {
    const addPropertyBtn = document.getElementById('addPropertyBtn');
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', () => {
            switchSection('add-property');
        });
    }
}

// Global functions for HTML onclick handlers
window.editProperty = function(propertyId) {
    // Implementation for editing property
    showMessage('Edit functionality coming soon!', 'error');
};

window.deleteProperty = deleteProperty;
window.removeImage = removeImage; 