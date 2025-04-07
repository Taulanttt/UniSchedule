// controllers/subjectController.js
const { Subject } = require('../config/associations'); 
// or: const Subject = require('../models/Subject'); 
// if you don't have a central associations file

/**
 * Create a new Subject
 */
exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if code already exists
    const existingSubject = await Subject.findOne({ where: { name } });
    if (existingSubject) {
      return res.status(400).json({ error: 'Subject already in use.' });
    }

    const subject = await Subject.create({ name });
    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (error) {
    console.error('Create Subject Error:', error);
    res.status(500).json({ error: 'Error creating subject.' });
  }
};

/**
 * Get all Subjects
 */
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    console.error('Get Subjects Error:', error);
    res.status(500).json({ error: 'Error fetching subjects.' });
  }
};

/**
 * Get a Subject by ID
 */
exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    res.json(subject);
  } catch (error) {
    console.error('Get Subject Error:', error);
    res.status(500).json({ error: 'Error fetching subject.' });
  }
};

/**
 * Update a Subject
 */
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const subject = await Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    // Optionally check if code is already in use by another Subject
    if (name && name !== subject.name) {
      const existingCode = await Subject.findOne({ where: { name } });
      if (existingCode) {
        return res.status(400).json({ error: 'Subject code already in use.' });
      }
    }

    subject.name = name ?? subject.name;
    await subject.save();

    res.json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    console.error('Update Subject Error:', error);
    res.status(500).json({ error: 'Error updating subject.' });
  }
};

/**
 * Delete a Subject
 */
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    await subject.destroy();
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete Subject Error:', error);
    res.status(500).json({ error: 'Error deleting subject.' });
  }
};
