const { ExamSchedule, Subject, Instructor, Afati } = require('../config/associations');

const createExamSchedule = async (req, res) => {
  try {
    const {
      academicYear,
      studyYear,
      date,
      hour,
      afatiId,   // now referencing 'afatiId'
      subjectId,
      instructorId,
    } = req.body;

    if (!afatiId || !subjectId || !instructorId) {
      return res.status(400).json({ error: 'Missing required fields (afatiId, subjectId, instructorId)' });
    }

    const newExam = await ExamSchedule.create({
      eventType: 'Provime',
      academicYear,
      studyYear,
      date,
      hour,
      afatiId,         // Make sure you are storing afatiId
      subjectId,
      instructorId
    });

    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam schedule:', error);
    res.status(500).json({ error: 'Failed to create exam schedule' });
  }
};

// Remainder is same but ensures includes Afati
const getAllExamSchedules = async (req, res) => {
  try {
    const exams = await ExamSchedule.findAll({
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] },
        { model: Afati, attributes: ['id', 'name'] }, // must have afatiId association
      ],
      order: [['date', 'ASC'], ['hour', 'ASC']]
    });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exam schedules:', error);
    res.status(500).json({ error: 'Failed to fetch exam schedules' });
  }
};

const getExamScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await ExamSchedule.findByPk(id, {
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] },
        { model: Afati, attributes: ['id', 'name'] },
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
      afatiId,
      subjectId,
      instructorId,
    } = req.body;

    const exam = await ExamSchedule.findByPk(id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam schedule not found' });
    }

    await exam.update({
      academicYear: academicYear ?? exam.academicYear,
      studyYear: studyYear ?? exam.studyYear,
      date: date ?? exam.date,
      hour: hour ?? exam.hour,
      afatiId: afatiId ?? exam.afatiId,
      subjectId: subjectId ?? exam.subjectId,
      instructorId: instructorId ?? exam.instructorId,
    });

    res.status(200).json(exam);
  } catch (error) {
    console.error('Error updating exam schedule:', error);
    res.status(500).json({ error: 'Failed to update exam schedule' });
  }
};

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
  updateExamSchedule,
  deleteExamSchedule,
};
