// controllers/examScheduleController.js
const { ExamSchedule, Subject, Instructor, Afati, AcademicYear } = require('../config/associations');

/*
  KRIJIMI I EXAMSCHEDULE
  Tani pranon academicYearId në vend të academicYear si string
*/
const createExamSchedule = async (req, res) => {
  try {
    const {
      academicYearId,
      studyYear,
      date,
      hour,
      afatiId,
      subjectId,
      instructorId,
    } = req.body;

    // Validim i fushave kyçe
    if (!afatiId || !subjectId || !instructorId || !academicYearId) {
      return res.status(400).json({
        error: 'Missing required fields (afatiId, subjectId, instructorId, academicYearId)'
      });
    }

    // Mund të validoni edhe ID-të e tjera me .findByPk(...) nëse dëshironi

    const newExam = await ExamSchedule.create({
      eventType: 'Provime',
      academicYearId, // ruajmë ID
      studyYear,
      date,
      hour,
      afatiId,
      subjectId,
      instructorId
    });

    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam schedule:', error);
    res.status(500).json({ error: 'Failed to create exam schedule' });
  }
};

/*
  MERR TË GJITHË EXAMSCHEDULE
  përfshin gjithashtu modelet e lidhura, tani shtojmë edhe AcademicYear
*/
const getAllExamSchedules = async (req, res) => {
  try {
    const exams = await ExamSchedule.findAll({
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] },
        { model: Afati, attributes: ['id', 'name'] },
        { model: AcademicYear, attributes: ['id', 'name', 'isActive'] },
      ],
      order: [['date', 'ASC'], ['hour', 'ASC']]
    });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exam schedules:', error);
    res.status(500).json({ error: 'Failed to fetch exam schedules' });
  }
};

/*
  MERR NJË EXAMSCHEDULE SË BASHKU ME ASOCIMET
*/
const getExamScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await ExamSchedule.findByPk(id, {
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Instructor, attributes: ['id', 'name'] },
        { model: Afati, attributes: ['id', 'name'] },
        { model: AcademicYear, attributes: ['id', 'name', 'isActive'] },
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

/*
  UPDATE EXAMSCHEDULE
*/
const updateExamSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      academicYearId,
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

    // Përditëso vetëm fushat që vijnë
    await exam.update({
      academicYearId: academicYearId ?? exam.academicYearId,
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

/*
  FSHIJE NJË EXAMSCHEDULE
*/
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
