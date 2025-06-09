const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample listings data
const sampleListings = [
  {
    title: "5 Hectares Agricultural Land",
    type: "agricultural",
    price: 2500000,
    location: {
      address: "123 Farm Road, Rural District",
      coordinates: {
        lat: 14.5995,
        lng: 120.9842
      }
    },
    description: "Prime agricultural land with rich soil, perfect for farming. Includes irrigation system and storage facilities.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Commercial Lot in Business District",
    type: "commercial",
    price: 5000000,
    location: {
      address: "456 Business Avenue, Metro City",
      coordinates: {
        lat: 14.5995,
        lng: 120.9842
      }
    },
    description: "Prime commercial lot in the heart of the business district. High foot traffic area, perfect for retail or office space.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Industrial Zone Property",
    type: "industrial",
    price: 7500000,
    location: {
      address: "789 Industry Street, Industrial Park",
      coordinates: {
        lat: 14.5995,
        lng: 120.9842
      }
    },
    description: "Large industrial property with warehouse space and loading docks. Located in established industrial zone with good transport links.",
    images: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Import the Listing model
const Listing = require('./models/Listing');

// Function to add sample data
async function addSampleData() {
  try {
    // Clear existing listings
    await Listing.deleteMany({});
    console.log('Cleared existing listings');

    // Add new listings
    const listings = await Listing.insertMany(sampleListings);
    console.log('Added sample listings:', listings.length);
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample data:', error);
    process.exit(1);
  }
}

// Run the function
addSampleData(); 