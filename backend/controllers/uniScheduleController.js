// controllers/uniScheduleController.js
const {
  UniSchedule,
  Subject,
  Instructor,
  Semester,
  ClassLocation
} = require('../config/associations');

exports.createSchedule = async (req, res) => {
  try {
    const {
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classroom,        // rename in your JSON request => "classroom" is the ID
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    } = req.body;

    // 1. Validate foreign keys
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(400).json({ error: 'Invalid subjectId' });
    }

    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) {
      return res.status(400).json({ error: 'Invalid instructorId' });
    }

    const semester = await Semester.findByPk(semesterId);
    if (!semester) {
      return res.status(400).json({ error: 'Invalid semesterId' });
    }

    const classLocation = await ClassLocation.findByPk(classroom);
    if (!classLocation) {
      return res.status(400).json({ error: 'Invalid classLocationId' });
    }

    // 2. Create the schedule
    const schedule = await UniSchedule.create({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId: classroom, // store classroom ID as classLocationId
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    });

    // 3. Return result
    res.status(201).json({
      message: 'Schedule created successfully',
      schedule
    });
  } catch (error) {
    console.error('Create Schedule Error:', error);
    res.status(500).json({
      error: 'An error occurred while creating the schedule.'
    });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    // Include all relationships
    const schedules = await UniSchedule.findAll({
      include: [Subject, Instructor, Semester, ClassLocation],
    });
    res.json(schedules);
  } catch (error) {
    console.error('Get Schedules Error:', error);
    res.status(500).json({
      error: 'An error occurred while fetching schedules.'
    });
  }
};
