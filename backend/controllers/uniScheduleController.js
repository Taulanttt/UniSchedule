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
      classroom, // classLocationId
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    } = req.body;

    // Validate foreign keys (Subject, Instructor, Semester, ClassLocation)
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(400).json({ error: 'Invalid subjectId' });

    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) return res.status(400).json({ error: 'Invalid instructorId' });

    const semester = await Semester.findByPk(semesterId);
    if (!semester) return res.status(400).json({ error: 'Invalid semesterId' });

    const classLocation = await ClassLocation.findByPk(classroom);
    if (!classLocation) return res.status(400).json({ error: 'Invalid classLocationId' });

    // 1. Create the schedule
    let schedule = await UniSchedule.create({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId: classroom,
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    });

    // 2. Reload with associations
    //    This refetches the record along with its related models
    schedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation]
    });

    // 3. Build a custom response with only the fields you want
    res.status(201).json({
      message: 'Schedule created successfully',
      schedule: {
        id: schedule.id,
        eventType: schedule.eventType,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        daysOfWeek: schedule.daysOfWeek,
        academicYear: schedule.academicYear,
        studyYear: schedule.studyYear,

        // We can grab the "subject" name from schedule.Subject
        subjectName: schedule.Subject ? schedule.Subject.name : null,
        instructorName: schedule.Instructor ? schedule.Instructor.name : null,
        semesterName: schedule.Semester ? schedule.Semester.name : null,
        locationName: schedule.ClassLocation ? schedule.ClassLocation.roomName : null,

        // If you still want to show IDs:
        subjectId: schedule.subjectId,
        instructorId: schedule.instructorId,
        semesterId: schedule.semesterId,
        classLocationId: schedule.classLocationId,
      }
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
    const schedules = await UniSchedule.findAll({
      include: [Subject, Instructor, Semester, ClassLocation],
    });

    // map each schedule to a custom JSON
    const mapped = schedules.map((sch) => ({
      id: sch.id,
      eventType: sch.eventType,
      startTime: sch.startTime,
      endTime: sch.endTime,
      daysOfWeek: sch.daysOfWeek,
      academicYear: sch.academicYear,
      studyYear: sch.studyYear,
      subjectName: sch.Subject ? sch.Subject.name : null,
      instructorName: sch.Instructor ? sch.Instructor.name : null,
      semesterName: sch.Semester ? sch.Semester.name : null,
      locationName: sch.ClassLocation ? sch.ClassLocation.roomName : null,
      // if you still want the raw IDs for further usage
      subjectId: sch.subjectId,
      instructorId: sch.instructorId,
      semesterId: sch.semesterId,
      classLocationId: sch.classLocationId,
    }));

    res.json(mapped);
  } catch (error) {
    console.error('Get Schedules Error:', error);
    res.status(500).json({
      error: 'An error occurred while fetching schedules.'
    });
  }
};

// Update existing schedule
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classroom, // classLocationId
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    } = req.body;

    const schedule = await UniSchedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Optional: Validate foreign keys again
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(400).json({ error: 'Invalid subjectId' });

    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) return res.status(400).json({ error: 'Invalid instructorId' });

    const semester = await Semester.findByPk(semesterId);
    if (!semester) return res.status(400).json({ error: 'Invalid semesterId' });

    const classLocation = await ClassLocation.findByPk(classroom);
    if (!classLocation) return res.status(400).json({ error: 'Invalid classLocationId' });

    // Update fields
    await schedule.update({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId: classroom,
      startTime,
      endTime,
      daysOfWeek,
      academicYear,
      studyYear
    });

    const updatedSchedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation],
    });

    res.json({
      message: 'Schedule updated successfully',
      schedule: {
        id: updatedSchedule.id,
        eventType: updatedSchedule.eventType,
        startTime: updatedSchedule.startTime,
        endTime: updatedSchedule.endTime,
        daysOfWeek: updatedSchedule.daysOfWeek,
        academicYear: updatedSchedule.academicYear,
        studyYear: updatedSchedule.studyYear,
        subjectName: updatedSchedule.Subject?.name || null,
        instructorName: updatedSchedule.Instructor?.name || null,
        semesterName: updatedSchedule.Semester?.name || null,
        locationName: updatedSchedule.ClassLocation?.roomName || null,
        subjectId: updatedSchedule.subjectId,
        instructorId: updatedSchedule.instructorId,
        semesterId: updatedSchedule.semesterId,
        classLocationId: updatedSchedule.classLocationId,
      }
    });
  } catch (error) {
    console.error('Update Schedule Error:', error);
    res.status(500).json({ error: 'An error occurred while updating the schedule.' });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await UniSchedule.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Delete Schedule Error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the schedule.' });
  }
};

