const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Listing = require('../models/Listing');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new listing (admin only)
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    const listing = new Listing({
      ...req.body,
      images: imageUrls
    });
    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update listing (admin only)
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const updates = { ...req.body };
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    Object.assign(listing, updates);
    listing.updatedAt = Date.now();
    
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete listing (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    await listing.remove();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 