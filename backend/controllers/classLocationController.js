// controllers/classLocationController.js
const ClassLocation = require('../models/ClassLocation');

// Create a new class location
exports.createLocation = async (req, res) => {
  try {
    const { roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({ error: 'roomName is required' });
    }

    const location = await ClassLocation.create({ roomName });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location', details: error.message });
  }
};

// Get all class locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await ClassLocation.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations', details: error.message });
  }
};

// Get a location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await ClassLocation.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location', details: error.message });
  }
};

// Update a class location
exports.updateLocation = async (req, res) => {
  try {
    const { roomName } = req.body;
    const location = await ClassLocation.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    if (!roomName) {
      return res.status(400).json({ error: 'roomName is required for update' });
    }

    location.roomName = roomName;
    await location.save();

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update location', details: error.message });
  }
};

// Delete a class location
exports.deleteLocation = async (req, res) => {
  try {
    const location = await ClassLocation.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    await location.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete location', details: error.message });
  }
};
