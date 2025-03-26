const { Semester } = require('../config/associations');

exports.createSemester = async (req, res) => {
  try {
    const { name, startDate, endDate, academicYear } = req.body;

    const semester = await Semester.create({
      name,
      startDate,
      endDate,
      academicYear
    });

    res.status(201).json({ message: 'Semester created successfully', semester });
  } catch (error) {
    console.error('Create Semester Error:', error);
    res.status(500).json({ error: 'Error creating semester.' });
  }
};

exports.getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.findAll();
    res.json(semesters);
  } catch (error) {
    console.error('Get Semesters Error:', error);
    res.status(500).json({ error: 'Error fetching semesters.' });
  }
};

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

exports.updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, academicYear } = req.body;

    const semester = await Semester.findByPk(id);
    if (!semester) {
      return res.status(404).json({ error: 'Semester not found.' });
    }

    semester.name = name ?? semester.name;
    semester.startDate = startDate ?? semester.startDate;
    semester.endDate = endDate ?? semester.endDate;
    semester.academicYear = academicYear ?? semester.academicYear;
    await semester.save();

    res.json({ message: 'Semester updated successfully', semester });
  } catch (error) {
    console.error('Update Semester Error:', error);
    res.status(500).json({ error: 'Error updating semester.' });
  }
};

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
