// controllers/instructorController.js
const { Instructor } = require('../config/associations');

/**
 * Create a new Instructor
 */
exports.createInstructor = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required.' });
    }

    const instructor = await Instructor.create({ name, role });
    res.status(201).json({ message: 'Instructor created successfully', instructor });
  } catch (error) {
    console.error('Create Instructor Error:', error);
    res.status(500).json({ error: 'Error creating instructor.' });
  }
};

/**
 * Get all Instructors
 */
exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll();
    res.json(instructors);
  } catch (error) {
    console.error('Get Instructors Error:', error);
    res.status(500).json({ error: 'Error fetching instructors.' });
  }
};

/**
 * Get an Instructor by ID
 */
exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found.' });
    }

    res.json(instructor);
  } catch (error) {
    console.error('Get Instructor Error:', error);
    res.status(500).json({ error: 'Error fetching instructor.' });
  }
};

/**
 * Update an Instructor
 */
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found.' });
    }

    instructor.name = name ?? instructor.name;
    instructor.role = role ?? instructor.role;
    await instructor.save();

    res.json({ message: 'Instructor updated successfully', instructor });
  } catch (error) {
    console.error('Update Instructor Error:', error);
    res.status(500).json({ error: 'Error updating instructor.' });
  }
};

/**
 * Delete an Instructor
 */
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found.' });
    }

    await instructor.destroy();
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    console.error('Delete Instructor Error:', error);
    res.status(500).json({ error: 'Error deleting instructor.' });
  }
};
