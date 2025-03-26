// controllers/semesterController.js
const Semester = require('../models/Semester');

// Create a new semester
exports.createSemester = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const semester = await Semester.create({ name });

    res.status(201).json({ message: 'Semester created successfully', semester });
  } catch (error) {
    console.error('Create Semester Error:', error);
    res.status(500).json({ error: 'Error creating semester.' });
  }
};

// Get all semesters
exports.getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.findAll();
    res.json(semesters);
  } catch (error) {
    console.error('Get Semesters Error:', error);
    res.status(500).json({ error: 'Error fetching semesters.' });
  }
};

// Get semester by ID
exports.getSemesterById = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findByPk(id);

    if (!semester) {
      return res.status(404).json({ error: 'Semester not found.' });
    }

    res.json(semester);
  } catch (error) {
    console.error('Get Semester Error:', error);
    res.status(500).json({ error: 'Error fetching semester.' });
  }
};

// Update semester
exports.updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const semester = await Semester.findByPk(id);
    if (!semester) {
      return res.status(404).json({ error: 'Semester not found.' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required for update.' });
    }

    semester.name = name;
    await semester.save();

    res.json({ message: 'Semester updated successfully', semester });
  } catch (error) {
    console.error('Update Semester Error:', error);
    res.status(500).json({ error: 'Error updating semester.' });
  }
};

// Delete semester
exports.deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findByPk(id);

    if (!semester) {
      return res.status(404).json({ error: 'Semester not found.' });
    }

    await semester.destroy();
    res.json({ message: 'Semester deleted successfully' });
  } catch (error) {
    console.error('Delete Semester Error:', error);
    res.status(500).json({ error: 'Error deleting semester.' });
  }
};
