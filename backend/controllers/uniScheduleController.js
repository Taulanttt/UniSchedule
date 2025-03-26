// controllers/uniScheduleController.js
const { UniSchedule, Subject, Instructor, Semester } = require('../config/associations');

exports.createSchedule = async (req, res) => {
  try {
    const {
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classCode,
      startTime,
      endTime,
      recurrence,
      daysOfWeek,
      academicYear,
      studyYear
    } = req.body;

    // Optionally verify that subject, instructor, and semester exist:
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(400).json({ error: 'Invalid subjectId' });

    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) return res.status(400).json({ error: 'Invalid instructorId' });

    const semester = await Semester.findByPk(semesterId);
    if (!semester) return res.status(400).json({ error: 'Invalid semesterId' });

    const schedule = await UniSchedule.create({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classCode,
      startTime,
      endTime,
      recurrence,
      daysOfWeek,
      academicYear,
      studyYear
    });

    res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    console.error('Create Schedule Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the schedule.' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await UniSchedule.findAll({
      include: [Subject, Instructor, Semester],
    });
    res.json(schedules);
  } catch (error) {
    console.error('Get Schedules Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching schedules.' });
  }
};
