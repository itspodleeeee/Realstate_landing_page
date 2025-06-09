// API endpoints
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const elements = {
    listingsGrid: document.querySelector('.listings-grid'),
    loginBtn: document.getElementById('loginBtn'),
    loginModal: document.getElementById('loginModal'),
    listingModal: document.getElementById('listingModal'),
    contactModal: document.getElementById('contactModal'),
    loginForm: document.getElementById('loginForm'),
    searchInput: document.querySelector('.search-box input'),
    searchBtn: document.querySelector('.search-box .btn'),
    navbar: document.querySelector('.navbar')
};

// State management
const state = {
    isAdmin: false,
    currentListing: null,
    isLoading: false,
    currentPage: 1,
    listingsPerPage: 6,
    totalListings: 0,
    searchTimeout: null
};

// Sample listings data
const sampleListings = [
    {
        _id: '1',
        title: 'Prime Commercial Property',
        price: 25000000,
        location: { address: 'Bayleaf Business District, Makati City' },
        size: 250,
        type: 'Commercial Property',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Premium commercial property in the heart of Makati\'s business district. Perfect for corporate offices or retail spaces.',
        agent: { name: 'Bayleaf Agent', phone: '+63 2 8123 4567', email: 'info@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '2',
        title: 'Residential Land Development',
        price: 15000000,
        location: { address: 'Green Valley Estates, Quezon City' },
        size: 180,
        type: 'Residential Land',
        images: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Prime residential land ready for development. Located in a peaceful neighborhood with excellent accessibility.',
        agent: { name: 'Bayleaf Agent', phone: '+63 2 8123 4567', email: 'info@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '3',
        title: 'Industrial Property',
        price: 35000000,
        location: { address: 'Bayleaf Industrial Park, Taguig' },
        size: 500,
        type: 'Industrial Property',
        images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Strategic industrial property with excellent logistics access. Ideal for manufacturing or warehousing.',
        agent: { name: 'Michael Chen', phone: '+63 934 567 8901', email: 'michael@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '4',
        title: 'Beachfront Property',
        price: 18000000,
        location: { address: 'Bayleaf Beach Residences, Batangas' },
        size: 120,
        type: 'Residential Property',
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Exclusive beachfront property with stunning ocean views. Perfect for luxury residential development.',
        agent: { name: 'Maria Santos', phone: '+63 945 678 9012', email: 'maria@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '5',
        title: 'Mountain View Property',
        price: 28000000,
        location: { address: 'Bayleaf Mountain Estates, Tagaytay' },
        size: 300,
        type: 'Residential Property',
        images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Scenic mountain property with panoramic views. Ideal for luxury residential development.',
        agent: { name: 'David Lee', phone: '+63 956 789 0123', email: 'david@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '6',
        title: 'Urban Development Property',
        price: 8000000,
        location: { address: 'Bayleaf Urban Living, Manila' },
        size: 45,
        type: 'Commercial Property',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Prime urban property in Manila\'s business district. Perfect for commercial development.',
        agent: { name: 'Anna Garcia', phone: '+63 967 890 1234', email: 'anna@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '7',
        title: 'Suburban Land Property',
        price: 12000000,
        location: { address: 'Bayleaf Garden Estates, Pasig' },
        size: 150,
        type: 'Residential Land',
        images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Spacious suburban land perfect for residential development. Located in a peaceful neighborhood.',
        agent: { name: 'Robert Tan', phone: '+63 978 901 2345', email: 'robert@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '8',
        title: 'Corporate Property',
        price: 20000000,
        location: { address: 'Bayleaf Corporate Plaza, Bonifacio Global City' },
        size: 200,
        type: 'Commercial Property',
        images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Premium corporate property in BGC. Ideal for office buildings or commercial development.',
        agent: { name: 'Lisa Wong', phone: '+63 989 012 3456', email: 'lisa@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '9',
        title: 'Mixed-Use Property',
        price: 16000000,
        location: { address: 'Bayleaf Mixed-Use Development, Mandaluyong' },
        size: 100,
        type: 'Mixed-Use Property',
        images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Versatile mixed-use property in a prime location. Perfect for commercial and residential development.',
        agent: { name: 'James Wilson', phone: '+63 990 123 4567', email: 'james@bayleafbuilders.com' },
        status: ''
    },
    {
        _id: '10',
        title: 'Industrial Land Property',
        price: 40000000,
        location: { address: 'Bayleaf Industrial Park, Cavite' },
        size: 1000,
        type: 'Industrial Land',
        images: ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
        description: 'Large industrial land property with excellent infrastructure. Ideal for manufacturing or logistics development.',
        agent: { name: 'Patricia Cruz', phone: '+63 991 234 5678', email: 'patricia@bayleafbuilders.com' },
        status: ''
    }
];

// Add testimonial data
const testimonials = [
    {
        content: "The quality of construction and attention to detail in my Bayleaf property is exceptional. The team was professional and delivered beyond my expectations.",
        author: "Maria Santos",
        title: "Property Owner, Bayleaf Residences"
    },
    {
        content: "Investing in Bayleaf properties was one of the best decisions I've made. The location and amenities are perfect, and the value has increased significantly.",
        author: "David Wilson",
        title: "Property Investor"
    },
    {
        content: "The customer service at Bayleaf Builders is outstanding. They were there for us every step of the way, making our first property purchase smooth and enjoyable.",
        author: "Lisa Anderson",
        title: "First-time Homebuyer"
    },
    {
        content: "As a real estate agent, I confidently recommend Bayleaf properties to my clients. Their reputation speaks for itself.",
        author: "Robert Taylor",
        title: "Real Estate Agent"
    },
    {
        content: "The location and amenities of my Bayleaf property are perfect. It's been a great investment.",
        author: "Emily Brown",
        title: "Property Investor"
    },
    {
        content: "Bayleaf Builders' attention to security and community development is impressive. I feel safe and at home.",
        author: "James Martinez",
        title: "Community Resident"
    }
];

// Testimonial Slider
const testimonialSlider = {
    currentIndex: 0,
    cards: document.querySelectorAll('.testimonial-card'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.prev-testimonial'),
    nextBtn: document.querySelector('.next-testimonial'),
    container: document.querySelector('.testimonials-grid'),

    init() {
        this.prevBtn.addEventListener('click', () => this.slide('prev'));
        this.nextBtn.addEventListener('click', () => this.slide('next'));
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto slide every 5 seconds
        setInterval(() => this.slide('next'), 5000);
    },

    slide(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        }
        this.updateSlider();
    },

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    },

    updateSlider() {
        // Update active card
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Calculate and apply transform
        const offset = -this.currentIndex * (100 / this.cards.length);
        this.container.style.transform = `translateX(${offset}%)`;
    }
};

// Initialize testimonial slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    testimonialSlider.init();
});

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handling
const handleScroll = debounce(() => {
    const listingsSection = document.getElementById('listings');
    const navbar = elements.navbar;
    const headerSearch = document.querySelector('.header-search');
    if (!listingsSection || !navbar || !headerSearch) return;
    const listingsTop = listingsSection.getBoundingClientRect().top + window.scrollY;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY + navbar.offsetHeight >= listingsTop) {
        navbar.classList.add('scrolled');
        headerSearch.style.opacity = '1';
        headerSearch.style.visibility = 'visible';
    } else {
        navbar.classList.remove('scrolled');
        headerSearch.style.opacity = '0';
        headerSearch.style.visibility = 'hidden';
    }
}, 10);

// Search functionality
const searchState = {
    currentInput: '',
    suggestions: [],
    filters: {
        type: '',
        price: '',
        size: ''
    },
    visibleListings: [],
    currentPage: 1,
    listingsPerPage: 6
};

function initializeSearch() {
    const heroSearchInput = document.querySelector('.hero-search-input');
    const headerSearchInput = document.querySelector('.header-search-input');
    const searchBtn = document.querySelector('.search-box .btn');
    const filterInputs = document.querySelectorAll('.filter-type, .filter-price, .filter-size');

    // Initialize search inputs
    [heroSearchInput, headerSearchInput].forEach(input => {
        if (input) {
            input.addEventListener('input', handleSearchInput);
            input.addEventListener('focus', showSuggestions);
            input.addEventListener('blur', () => {
                setTimeout(hideSuggestions, 200);
            });
        }
    });

    // Initialize search button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = heroSearchInput.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
                window.location.href = '#listings';
            }
        });
    }

    // Initialize filters
    filterInputs.forEach(filter => {
        filter.addEventListener('change', () => {
            searchState.filters[filter.classList[0].replace('filter-', '')] = filter.value;
            applyFilters();
        });
    });
}

function handleSearchInput(e) {
    const searchTerm = e.target.value.trim();
    searchState.currentInput = searchTerm;

    if (searchTerm.length < 2) {
        hideSuggestions();
        return;
    }

    // Generate suggestions based on current listings
    const suggestions = sampleListings
        .filter(listing => {
            const searchLower = searchTerm.toLowerCase();
            return (
                listing.title.toLowerCase().includes(searchLower) ||
                listing.location.address.toLowerCase().includes(searchLower) ||
                listing.type.toLowerCase().includes(searchLower)
            );
        })
        .slice(0, 5);

    showSuggestions(suggestions);
}

function showSuggestions(suggestions = []) {
    const suggestionContainers = document.querySelectorAll('.search-suggestions');
    
    suggestionContainers.forEach(container => {
        if (suggestions.length > 0) {
            container.innerHTML = suggestions.map(listing => `
                <div class="suggestion-item" data-id="${listing._id}">
                    <img src="${listing.images[0]}" alt="${listing.title}">
                    <div class="suggestion-info">
                        <div class="suggestion-title">${listing.title}</div>
                        <div class="suggestion-price">₱${listing.price.toLocaleString()}</div>
                    </div>
                </div>
            `).join('');

            // Add click events to suggestions
            container.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const listingId = item.dataset.id;
                    const listing = sampleListings.find(l => l._id === listingId);
                    if (listing) {
                        showListingDetails(listing);
                    }
                });
            });

            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    });
}

function hideSuggestions() {
    document.querySelectorAll('.search-suggestions').forEach(container => {
        container.classList.remove('show');
    });
}

function performSearch(searchTerm) {
    searchState.currentInput = searchTerm;
    searchState.currentPage = 1;
    applyFilters();
}

function applyFilters() {
    const { currentInput, filters } = searchState;
    
    // Filter listings based on search term and filters
    let filteredListings = sampleListings.filter(listing => {
        const matchesSearch = !currentInput || 
            listing.title.toLowerCase().includes(currentInput.toLowerCase()) ||
            listing.location.address.toLowerCase().includes(currentInput.toLowerCase()) ||
            listing.type.toLowerCase().includes(currentInput.toLowerCase());

        const matchesType = !filters.type || listing.type === filters.type;
        
        const matchesPrice = !filters.price || (() => {
            const [min, max] = filters.price.split('-').map(Number);
            return listing.price >= min && listing.price <= max;
        })();
        
        const matchesSize = !filters.size || (() => {
            const [min, max] = filters.size.split('-').map(Number);
            return listing.size >= min && listing.size <= max;
        })();

        return matchesSearch && matchesType && matchesPrice && matchesSize;
    });

    searchState.visibleListings = filteredListings;
    displayFilteredResults();
}

function displayFilteredResults() {
    const { visibleListings, currentPage, listingsPerPage } = searchState;
    const startIndex = (currentPage - 1) * listingsPerPage;
    const endIndex = startIndex + listingsPerPage;
    const displayedListings = visibleListings.slice(startIndex, endIndex);

    const listingsGrid = document.querySelector('.listings-grid');
    const noResults = document.querySelector('.no-results');
    const endMessage = document.querySelector('.end-message');

    if (!listingsGrid) {
        console.error('Listings grid not found during filtered results display');
        return;
    }

    // Clear current listings
    listingsGrid.innerHTML = '';

    if (visibleListings.length === 0) {
        // Show no results message with suggestions
        noResults.style.display = 'block';
        endMessage.style.display = 'none';
        
        // Generate suggestions based on filters
        const suggestions = sampleListings
            .filter(listing => {
                if (searchState.filters.type && listing.type !== searchState.filters.type) return false;
                if (searchState.filters.price) {
                    const [min, max] = searchState.filters.price.split('-').map(Number);
                    if (listing.price < min || listing.price > max) return false;
                }
                if (searchState.filters.size) {
                    const [min, max] = searchState.filters.size.split('-').map(Number);
                    if (listing.size < min || listing.size > max) return false;
                }
                return true;
            })
            .slice(0, 3);

        const suggestedListings = document.querySelector('.suggested-listings');
        if (suggestedListings) {
            suggestedListings.innerHTML = suggestions.map(listing => createListingCard(listing)).join('');
        }
    } else {
        noResults.style.display = 'none';
        
        // Display filtered listings
        displayedListings.forEach(listing => {
            const card = createListingCard(listing);
            listingsGrid.appendChild(card);
        });

        // Show end message if all listings are displayed
        if (endIndex >= visibleListings.length) {
            endMessage.style.display = 'block';
        } else {
            endMessage.style.display = 'none';
        }
    }
}

// Helper to update admin UI
function updateAdminUI() {
    // Show/hide admin controls on all listing cards
    document.querySelectorAll('.admin-actions').forEach(el => {
        el.style.display = state.isAdmin ? 'flex' : 'none';
    });
    // Update login/logout button
    if (state.isAdmin) {
        elements.loginBtn.textContent = 'Logout';
        elements.loginBtn.onclick = handleLogout;
    } else {
        elements.loginBtn.textContent = 'Login';
        elements.loginBtn.onclick = () => showModal(elements.loginModal);
    }
    renderAddListingBtn();
    // Show/hide Messages button
    const messagesBtn = document.getElementById('messagesBtn');
    if (messagesBtn) {
        messagesBtn.style.display = state.isAdmin ? 'inline-flex' : 'none';
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    state.isAdmin = false;
    updateAdminUI();
    // Re-render listings to hide admin controls
    displayInitialListings();
    // Hide login modal if open and clear fields
    if (elements.loginModal) {
        elements.loginModal.style.display = 'none';
        document.body.style.overflow = '';
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }
    setTimeout(() => showSuccess('Successfully logged out!'), 100);
}

// Update the createListingCard function to use admin state
function createListingCard(listing, index) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.style.animationDelay = `${index * 0.1}s`;
    let statusText = 'Available';
    let statusClass = 'available';
    if (listing.status === 'sold') { statusText = 'Sold'; statusClass = 'sold'; }
    else if (listing.status === 'reserved') { statusText = 'Reserved'; statusClass = 'reserved'; }
    else if (listing.status === 'under_contract') { statusText = 'Under Contract'; statusClass = 'under-contract'; }
    // Status label or dropdown (top right of image)
    let statusHTML = '';
    if (state.isAdmin) {
        statusHTML = `<div class="status-dropdown-container">
            <select class="status-dropdown ${statusClass}" data-id="${listing._id}">
                <option value="available" ${listing.status === '' ? 'selected' : ''}>Available</option>
                <option value="sold" ${listing.status === 'sold' ? 'selected' : ''}>Sold</option>
                <option value="reserved" ${listing.status === 'reserved' ? 'selected' : ''}>Reserved</option>
                <option value="under_contract" ${listing.status === 'under_contract' ? 'selected' : ''}>Under Contract</option>
            </select>
        </div>`;
    } else {
        statusHTML = `<span class="status-label ${statusClass}">${statusText}</span>`;
    }
    card.innerHTML = `
        <div class="listing-image-container">
            <img src="${listing.images[0]}" alt="${listing.title}" class="listing-image" loading="lazy">
            <div class="listing-type">${listing.type}</div>
            ${statusHTML}
        </div>
        <div class="listing-details">
            <div class="listing-header">
                <h3 class="listing-title">${listing.title}</h3>
                <p class="listing-price">₱${listing.price.toLocaleString()}</p>
            </div>
            <div class="listing-info">
                <p class="listing-location"><i class="fas fa-map-marker-alt"></i> ${listing.location.address}</p>
                <p class="listing-size"><i class="fas fa-ruler-combined"></i> ${listing.size} sqm</p>
            </div>
            <p class="listing-description">${listing.description.substring(0, 100)}...</p>
            <div class="listing-actions">
                <button class="btn view-details" data-id="${listing._id}" type="button">View Details</button>
                <div class="admin-actions" style="display: ${state.isAdmin ? 'flex' : 'none'}; gap: 0.5rem; flex-wrap: nowrap; align-items: center;">
                    <button class="btn edit-listing" data-id="${listing._id}" type="button"><i class="fas fa-edit"></i></button>
                    <button class="btn delete-listing" data-id="${listing._id}" type="button"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `;
    // Add event listeners
    card.querySelector('.view-details').addEventListener('click', (e) => { e.preventDefault(); showListingDetails(listing); });
    if (state.isAdmin) {
        card.querySelector('.edit-listing').addEventListener('click', (e) => { e.preventDefault(); editListing(listing); });
        card.querySelector('.delete-listing').addEventListener('click', (e) => { e.preventDefault(); showDeleteModal(listing._id); });
        card.querySelector('.status-dropdown').addEventListener('change', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const newStatus = e.target.value === 'available' ? '' : e.target.value;
            updateListingStatus(listing._id, newStatus);
        });
    }
    return card;
}

// Custom Delete Confirmation Modal
function showDeleteModal(listingId) {
    let modal = document.getElementById('deleteModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'deleteModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <span class="close" style="position:absolute;right:1rem;top:1rem;cursor:pointer;font-size:1.5rem;">&times;</span>
                <h3>Are you sure you want to delete this listing?</h3>
                <div style="margin-top:2rem;display:flex;gap:1rem;justify-content:center;">
                    <button class="btn btn-cancel">Cancel</button>
                    <button class="btn btn-delete" style="background:#e74c3c;">Delete</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Close modal
    modal.querySelector('.close').onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
    modal.querySelector('.btn-cancel').onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
    // Confirm delete
    modal.querySelector('.btn-delete').onclick = () => {
        deleteListing(listingId, true);
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
}

// Update deleteListing to support modal
function deleteListing(id, fromModal = false) {
    if (!fromModal) {
        showDeleteModal(id);
        return;
    }
    const idx = sampleListings.findIndex(l => l._id === id);
    if (idx !== -1) {
        sampleListings.splice(idx, 1);
        // Remove from localStorage customListings
        let savedListings = JSON.parse(localStorage.getItem('customListings') || '[]');
        savedListings = savedListings.filter(l => l._id !== id);
        localStorage.setItem('customListings', JSON.stringify(savedListings));
        displayInitialListings();
    }
}

// Enhance login feedback
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const modalContent = elements.loginModal.querySelector('.modal-content');
    try {
        state.isLoading = true;
        const data = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        localStorage.setItem('token', data.token);
        state.isAdmin = true;
        updateAdminUI();
        // Success animation
        modalContent.classList.add('success');
        setTimeout(() => {
            modalContent.classList.remove('success');
            hideAllModals();
            displayInitialListings();
        }, 800);
    } catch (error) {
        // Shake and red border for failure
        modalContent.classList.add('shake');
        modalContent.style.border = '2px solid #e74c3c';
        setTimeout(() => {
            modalContent.classList.remove('shake');
            modalContent.style.border = '';
        }, 600);
        showError('Login failed. Please check your credentials.');
    } finally {
        state.isLoading = false;
    }
}

// After login status check, update UI
async function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        state.isAdmin = false;
        updateAdminUI();
        return;
    }
    try {
        const data = await fetchAPI('/auth/verify');
        if (data.isAdmin) {
            state.isAdmin = true;
        } else {
            state.isAdmin = false;
        }
        updateAdminUI();
    } catch (error) {
        localStorage.removeItem('token');
        state.isAdmin = false;
        updateAdminUI();
    }
}

// After displaying listings, update admin UI
function displayInitialListings() {
    console.log('Displaying initial listings...');
    const listingsGrid = document.querySelector('.listings-grid');
    if (!listingsGrid) {
        console.error('Listings grid element not found');
        return;
    }
    listingsGrid.innerHTML = '';
    sampleListings.forEach((listing, index) => {
        const card = createListingCard(listing, index);
        listingsGrid.appendChild(card);
    });
    updateAdminUI();
    // Re-attach event listeners for edit/delete after rendering
    document.querySelectorAll('.edit-listing').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const listing = sampleListings.find(l => l._id === id);
            if (listing) editListing(listing);
        };
    });
    document.querySelectorAll('.delete-listing').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            showDeleteModal(id);
        };
    });
    console.log('Initial listings displayed');
}

// On page load, apply saved statuses from localStorage
function applySavedStatuses() {
    const savedStatuses = JSON.parse(localStorage.getItem('listingStatuses') || '{}');
    sampleListings.forEach(listing => {
        if (savedStatuses[listing._id] !== undefined) {
            listing.status = savedStatuses[listing._id];
        }
    });
}

// Update status and persist to localStorage
function updateListingStatus(id, status) {
    const idx = sampleListings.findIndex(l => l._id === id);
    if (idx !== -1) {
        sampleListings[idx].status = status;
        // Save to localStorage
        const savedStatuses = JSON.parse(localStorage.getItem('listingStatuses') || '{}');
        savedStatuses[id] = status;
        localStorage.setItem('listingStatuses', JSON.stringify(savedStatuses));
        displayInitialListings();
    }
}

// Add Listing Modal Logic
const listingFormModal = document.getElementById('listingFormModal');
const listingForm = document.getElementById('listingForm');
const closeListingForm = document.getElementById('closeListingForm');
const imageInput = document.getElementById('listingImages');
const imagePreview = document.getElementById('imagePreview');
const addListingBtn = document.querySelector('.add-listing-btn');
const customUploadBtn = document.getElementById('customUploadBtn');

let selectedFiles = [];
let editingListingId = null;

// Image Upload Preview (max 8, file names only, images only, multi-file support)
imageInput.addEventListener('change', function() {
    // Add new files to selectedFiles (no duplicates, up to 8)
    const newFiles = Array.from(imageInput.files).filter(f => f.type.startsWith('image/'));
    let added = 0;
    for (const file of newFiles) {
        if (selectedFiles.length >= 8) break;
        if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            selectedFiles.push(file);
            added++;
        }
    }
    if (selectedFiles.length >= 8 && newFiles.length > added) {
        showWarning('You can upload up to 8 images only.');
    }
    renderImagePreview();
    // Reset file input so same file can be re-added if removed
    imageInput.value = '';
});

function renderImagePreview() {
    imagePreview.innerHTML = '';
    selectedFiles.forEach((file) => {
        const fileNameDiv = document.createElement('div');
        fileNameDiv.className = 'file-name';
        fileNameDiv.style.display = 'flex';
        fileNameDiv.style.alignItems = 'center';
        fileNameDiv.style.gap = '0.5rem';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = file.name;
        fileNameDiv.appendChild(nameSpan);
        imagePreview.appendChild(fileNameDiv);
    });
}

function showWarning(message) {
    const warning = document.createElement('div');
    warning.className = 'warning-message';
    warning.textContent = message;
    document.body.appendChild(warning);
    setTimeout(() => {
        warning.remove();
    }, 2000);
}

// Handle Add Listing Form Submission
listingForm.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('listingTitle').value.trim();
    const price = parseInt(document.getElementById('listingPrice').value, 10);
    const location = document.getElementById('listingLocation').value.trim();
    const size = parseInt(document.getElementById('listingSize').value, 10);
    const type = document.getElementById('listingType').value;
    const description = document.getElementById('listingDescription').value.trim();
    // If editing, keep old images and add new ones
    if (editingListingId) {
        const listingIdx = sampleListings.findIndex(l => l._id === editingListingId);
        if (listingIdx !== -1) {
            const oldListing = sampleListings[listingIdx];
            // Convert selectedFiles to data URLs
            let images = oldListing.images ? [...oldListing.images] : [];
            if (selectedFiles.length > 0) {
                // Only add up to 8 total
                const filesToAdd = Math.max(0, 8 - images.length);
                const files = selectedFiles.slice(0, filesToAdd);
                let filesProcessed = 0;
                files.forEach((file, idx) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        images.push(e.target.result);
                        filesProcessed++;
                        if (filesProcessed === files.length) {
                            saveEditedListing(listingIdx, title, price, location, size, type, description, images);
                        }
                    };
                    reader.readAsDataURL(file);
                });
                if (files.length === 0) {
                    saveEditedListing(listingIdx, title, price, location, size, type, description, images);
                }
            } else {
                saveEditedListing(listingIdx, title, price, location, size, type, description, images);
            }
        }
    } else {
        // Add Listing logic (unchanged)
        if (selectedFiles.length === 0) {
            showError('Please upload at least one image.');
            return;
        }
        const images = [];
        let filesProcessed = 0;
        selectedFiles.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                images[idx] = e.target.result;
                filesProcessed++;
                if (filesProcessed === selectedFiles.length) {
                    saveNewListing(title, price, location, size, type, description, images);
                }
            };
            reader.readAsDataURL(file);
        });
    }
};

function saveEditedListing(idx, title, price, location, size, type, description, images) {
    sampleListings[idx] = {
        ...sampleListings[idx],
        title,
        price,
        location: { address: location },
        size,
        type,
        description,
        images
    };
    // Update localStorage customListings if present
    let savedListings = JSON.parse(localStorage.getItem('customListings') || '[]');
    const savedIdx = savedListings.findIndex(l => l._id === sampleListings[idx]._id);
    if (savedIdx !== -1) {
        savedListings[savedIdx] = sampleListings[idx];
        localStorage.setItem('customListings', JSON.stringify(savedListings));
    }
    displayInitialListings();
    listingFormModal.style.display = 'none';
    document.body.style.overflow = '';
    listingForm.reset();
    imagePreview.innerHTML = '';
    selectedFiles = [];
    editingListingId = null;
    showError('Listing updated successfully!');
}

// Reset editing state when opening/closing modal for add
function showAddListingModal() {
    editingListingId = null;
    document.getElementById('listingFormTitle').textContent = 'Add Listing';
    listingForm.reset();
    imagePreview.innerHTML = '';
    selectedFiles = [];
    listingFormModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
closeListingForm.onclick = function() {
    listingFormModal.style.display = 'none';
    document.body.style.overflow = '';
    selectedFiles = [];
    imagePreview.innerHTML = '';
    editingListingId = null;
};
window.addEventListener('click', function(e) {
    if (e.target === listingFormModal) {
        listingFormModal.style.display = 'none';
        document.body.style.overflow = '';
        selectedFiles = [];
        imagePreview.innerHTML = '';
        editingListingId = null;
    }
});

// On page load, also load custom listings from localStorage
function applySavedListings() {
    const savedListings = JSON.parse(localStorage.getItem('customListings') || '[]');
    if (savedListings.length > 0) {
        // Avoid duplicate IDs
        const existingIds = new Set(sampleListings.map(l => l._id));
        savedListings.forEach(listing => {
            if (!existingIds.has(listing._id)) {
                sampleListings.unshift(listing);
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    console.log('Listings grid element:', elements.listingsGrid); // Debug log
    applySavedStatuses();
    applySavedListings();
    initializeEventListeners();
    initializeSearch();
    checkAuthStatus();
    displayInitialListings(); // New function for initial display
});

// Event Listeners
function initializeEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Login
    elements.loginBtn.addEventListener('click', () => showModal(elements.loginModal));
    elements.loginForm.addEventListener('submit', handleLogin);
    
    // Search
    elements.searchInput.addEventListener('input', handleSearchInput);
    elements.searchBtn.addEventListener('click', () => {
        const searchTerm = elements.searchInput.value.trim();
        if (searchTerm) {
            performSearch(searchTerm);
            window.location.href = '#listings';
        }
    });
    
    // Service Learn More buttons
    document.querySelectorAll('.service-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = button.getAttribute('data-service');
            const modal = document.getElementById(`modal-${serviceType}`);
            if (modal) {
                showModal(modal);
            }
        });
    });
    
    // Service modal CTA contact logic
    document.querySelectorAll('.service-modal').forEach(modal => {
        const ctaBtn = modal.querySelector('.service-contact-btn');
        const ctaSection = modal.querySelector('.service-cta');
        const agentSection = modal.querySelector('.service-agent-contact');
        const backBtn = modal.querySelector('.service-back-btn');
        if (ctaBtn && ctaSection && agentSection && backBtn) {
            ctaBtn.addEventListener('click', () => {
                ctaSection.style.display = 'none';
                modal.querySelector('.service-description').style.display = 'none';
                modal.querySelector('.service-features').style.display = 'none';
                agentSection.style.display = 'block';
            });
            backBtn.addEventListener('click', () => {
                agentSection.style.display = 'none';
                ctaSection.style.display = 'block';
                modal.querySelector('.service-description').style.display = '';
                modal.querySelector('.service-features').style.display = '';
            });
        }
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideAllModals();
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideAllModals();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });

    // Custom Upload Button
    customUploadBtn.addEventListener('click', function() {
        imageInput.click();
    });

    // Contact Form Submission and Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            // Simple email validation
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!name || !email || !message) {
                showError('Please fill in all fields.');
                return;
            }
            if (!emailValid) {
                showError('Please enter a valid email address.');
                return;
            }
            // Save message to localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({ name, email, message, date: new Date().toISOString() });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            // Show success and reset form
            showSuccess('Message sent! Thank you for contacting us.');
            contactForm.reset();
        });
    }

    // Messages Modal logic
    const messagesBtn = document.getElementById('messagesBtn');
    const messagesModal = document.getElementById('messagesModal');
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesBtn && messagesModal && messagesContainer) {
        messagesBtn.addEventListener('click', () => {
            // Load messages from localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            if (messages.length === 0) {
                messagesContainer.innerHTML = '<p style="text-align:center;color:#888;">No messages yet.</p>';
            } else {
                messagesContainer.innerHTML = messages.map(msg => `
                    <div class="admin-message-card" style="background:#f8f9fa;padding:1rem 1.5rem;margin-bottom:1.2rem;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                        <div style="font-weight:600;color:#2d5a27;">${msg.name} <span style="color:#888;font-weight:400;">(${msg.email})</span></div>
                        <div style="margin:0.5rem 0 0.7rem 0;color:#333;">${msg.message}</div>
                        <div style="font-size:0.9rem;color:#888;">${new Date(msg.date).toLocaleString()}</div>
                    </div>
                `).join('');
            }
            showModal(messagesModal);
        });
    }
}

// Modal handling
function showModal(modal) {
    hideAllModals();
    if (modal.classList.contains('service-modal')) {
        modal.classList.add('active');
    } else {
        modal.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
    // Add event listener to close button
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            hideAllModals();
        };
    }
}

function hideAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('service-modal')) {
            modal.classList.remove('active');
        } else {
            modal.style.display = 'none';
        }
    });
    document.body.style.overflow = '';
}

// API calls
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(localStorage.getItem('token') && {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }),
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Update the showListingDetails function
function showListingDetails(listing) {
    state.currentListing = listing;
    const detailsContainer = document.getElementById('listingDetails');
    
    detailsContainer.innerHTML = `
        <div class="listing-details-modal">
            <div class="carousel">
                <div class="carousel-inner">
                    ${listing.images.map(img => `
                        <div class="carousel-item">
                            <img src="${img}" alt="${listing.title}">
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control carousel-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="carousel-control carousel-next"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="listing-info-modal">
                <h2>${listing.title}</h2>
                <p class="listing-price">₱${listing.price.toLocaleString()}</p>
                <div class="listing-details-grid">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${listing.location.address}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${listing.size} sqm</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-home"></i>
                        <span>${listing.type}</span>
                    </div>
                </div>
                <p class="listing-description">${listing.description}</p>
                <div class="agent-info">
                    <h3>Contact Agent</h3>
                    <p><i class="fas fa-user"></i> ${listing.agent.name}</p>
                    <p><i class="fas fa-phone"></i> ${listing.agent.phone}</p>
                    <p><i class="fas fa-envelope"></i> ${listing.agent.email}</p>
                </div>
                <button class="btn contact-btn" onclick="showContactInfo('${listing._id}')">
                    <i class="fas fa-envelope"></i> Contact Agent
                </button>
            </div>
        </div>
    `;

    // Add carousel functionality
    let currentSlide = 0;
    const items = detailsContainer.querySelectorAll('.carousel-item');
    const prevBtn = detailsContainer.querySelector('.carousel-prev');
    const nextBtn = detailsContainer.querySelector('.carousel-next');

    function showSlide(index) {
        const offset = index * -100;
        detailsContainer.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + items.length) % items.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % items.length;
        showSlide(currentSlide);
    });

    showModal(elements.listingModal);
}

// Update the showContactInfo function
function showContactInfo(listingId) {
    const listing = sampleListings.find(l => l._id === listingId);
    const contactDetails = document.getElementById('contactDetails');
    
    contactDetails.innerHTML = `
        <div class="contact-info-modal">
            <h3>Contact Information</h3>
            <div class="agent-details">
                <div class="agent-info">
                    <h4>Bayleaf Agent</h4>
                    <p>Professional Real Estate Agent</p>
                </div>
            </div>
            <div class="contact-methods">
                <a href="tel:+63281234567" class="contact-method">
                    <i class="fas fa-phone"></i>
                    <span>+63 2 8123 4567</span>
                </a>
                <a href="mailto:info@bayleafbuilders.com" class="contact-method">
                    <i class="fas fa-envelope"></i>
                    <span>info@bayleafbuilders.com</span>
                </a>
            </div>
            <p class="contact-note">Our agent will get back to you within 24 hours.</p>
        </div>
    `;

    showModal(elements.contactModal);
}

// Add Listing Button (admin only)
function renderAddListingBtn() {
    let btn = document.querySelector('.add-listing-btn');
    if (state.isAdmin) {
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'add-listing-btn';
            btn.innerHTML = '<i class="fas fa-plus"></i>';
            btn.title = 'Add Listing';
            btn.onclick = showAddListingModal;
            document.body.appendChild(btn);
        }
        btn.style.display = 'flex';
    } else if (btn) {
        btn.style.display = 'none';
    }
}

function editListing(listing) {
    editingListingId = listing._id;
    document.getElementById('listingFormTitle').textContent = 'Edit Listing';
    listingFormModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Pre-fill fields
    document.getElementById('listingTitle').value = listing.title;
    document.getElementById('listingPrice').value = listing.price;
    document.getElementById('listingLocation').value = listing.location.address;
    document.getElementById('listingSize').value = listing.size;
    document.getElementById('listingType').value = listing.type;
    document.getElementById('listingDescription').value = listing.description;
    // Show current images as file names (no removal, just display)
    selectedFiles = [];
    imagePreview.innerHTML = '';
    if (listing.images && listing.images.length > 0) {
        listing.images.forEach((img, idx) => {
            const fileNameDiv = document.createElement('div');
            fileNameDiv.className = 'file-name';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `Image ${idx + 1}`;
            fileNameDiv.appendChild(nameSpan);
            imagePreview.appendChild(fileNameDiv);
        });
    }
}

function showSuccess(msg) {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = msg;
    document.body.appendChild(success);
    setTimeout(() => { success.remove(); }, 2000);
} 