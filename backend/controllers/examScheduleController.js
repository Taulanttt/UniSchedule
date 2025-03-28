// controllers/examScheduleController.js
const { ExamSchedule, Subject, Instructor } = require('../config/associations');

// Create new exam schedule
const createExamSchedule = async (req, res) => {
  try {
    const {
      academicYear,
      studyYear,
      date,
      hour,
      afati,
      subjectId,
      instructorId
    } = req.body;

    const newExam = await ExamSchedule.create({
      academicYear,
      studyYear,
      date,
      hour,
      afati,
      subjectId,
      instructorId
    });

    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam schedule:', error);
    res.status(500).json({ error: 'Failed to create exam schedule' });
  }
};

// Get all exam schedules
const getAllExamSchedules = async (req, res) => {
  try {
    const exams = await ExamSchedule.findAll({
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] }
      ],
      order: [['date', 'ASC'], ['hour', 'ASC']]
    });

    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exam schedules:', error);
    res.status(500).json({ error: 'Failed to fetch exam schedules' });
  }
};

// Get single exam schedule by ID
const getExamScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await ExamSchedule.findByPk(id, {
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] }
      ]
    });

    if (!exam) {
      return res.status(404).json({ error: 'Exam schedule not found' });
    }

    res.status(200).json(exam);
  } catch (error) {
    console.error('Error fetching exam schedule:', error);
    res.status(500).json({ error: 'Failed to fetch exam schedule' });
  }
};

const updateExamSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        academicYear,
        studyYear,
        date,
        hour,
        afati,
        subjectId,
        instructorId
      } = req.body;
  
      const exam = await ExamSchedule.findByPk(id);
      if (!exam) {
        return res.status(404).json({ error: 'Exam schedule not found' });
      }
  
      await exam.update({
        academicYear,
        studyYear,
        date,
        hour,
        afati,
        subjectId,
        instructorId
      });
  
      res.status(200).json(exam);
    } catch (error) {
      console.error('Error updating exam schedule:', error);
      res.status(500).json({ error: 'Failed to update exam schedule' });
    }
  };

// Delete exam schedule
const deleteExamSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ExamSchedule.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Exam schedule not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting exam schedule:', error);
    res.status(500).json({ error: 'Failed to delete exam schedule' });
  }
};

module.exports = {
  createExamSchedule,
  getAllExamSchedules,
  getExamScheduleById,
  deleteExamSchedule,
  updateExamSchedule
};
