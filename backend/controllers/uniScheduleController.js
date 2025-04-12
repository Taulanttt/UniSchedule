// controllers/uniScheduleController.js
const {
  UniSchedule,
  Subject,
  Instructor,
  Semester,
  ClassLocation,
  AcademicYear
} = require('../config/associations');

//
// KRIJIMI I ORARIT
//
exports.createSchedule = async (req, res) => {
  try {
    const {
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId,
      startTime,
      endTime,
      daysOfWeek,
      academicYearId, // vendosim ID e vitit akademik
      studyYear
    } = req.body;

    // Validim i foreign keys
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(400).json({ error: 'Invalid subjectId' });

    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) return res.status(400).json({ error: 'Invalid instructorId' });

    const semester = await Semester.findByPk(semesterId);
    if (!semester) return res.status(400).json({ error: 'Invalid semesterId' });

    const classLocation = await ClassLocation.findByPk(classLocationId);
    if (!classLocation) return res.status(400).json({ error: 'Invalid classLocationId' });

    const academicYear = await AcademicYear.findByPk(academicYearId);
    if (!academicYear) return res.status(400).json({ error: 'Invalid academicYearId' });

    // Krijimi i orarit
    let schedule = await UniSchedule.create({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId,
      startTime,
      endTime,
      daysOfWeek,
      academicYearId, // fusha e re
      studyYear
    });

    // Rimbushim me modelet e lidhura
    schedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear]
    });

    // Kthejmë një përgjigje me të dhënat e nevojshme
    res.status(201).json({
      message: 'Schedule created successfully',
      schedule: {
        id: schedule.id,
        eventType: schedule.eventType,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        daysOfWeek: schedule.daysOfWeek,
        // Marrim emrin e vitit akademik
        academicYear: schedule.AcademicYear ? schedule.AcademicYear.name : null,
        studyYear: schedule.studyYear,
        subjectName: schedule.Subject ? schedule.Subject.name : null,
        instructorName: schedule.Instructor ? schedule.Instructor.name : null,
        semesterName: schedule.Semester ? schedule.Semester.name : null,
        locationName: schedule.ClassLocation ? schedule.ClassLocation.roomName : null,
        // IDs
        subjectId: schedule.subjectId,
        instructorId: schedule.instructorId,
        semesterId: schedule.semesterId,
        classLocationId: schedule.classLocationId,
        academicYearId: schedule.academicYearId,
      }
    });
  } catch (error) {
    console.error('Create Schedule Error:', error);
    res.status(500).json({
      error: 'An error occurred while creating the schedule.'
    });
  }
};

//
// MARRJA E TË GJITHA ORAREVE
//
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await UniSchedule.findAll({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    const mapped = schedules.map((sch) => ({
      id: sch.id,
      eventType: sch.eventType,
      startTime: sch.startTime,
      endTime: sch.endTime,
      daysOfWeek: sch.daysOfWeek,
      academicYear: sch.AcademicYear ? sch.AcademicYear.name : null,
      studyYear: sch.studyYear,
      subjectName: sch.Subject ? sch.Subject.name : null,
      instructorName: sch.Instructor ? sch.Instructor.name : null,
      semesterName: sch.Semester ? sch.Semester.name : null,
      locationName: sch.ClassLocation ? sch.ClassLocation.roomName : null,
      subjectId: sch.subjectId,
      instructorId: sch.instructorId,
      semesterId: sch.semesterId,
      classLocationId: sch.classLocationId,
      academicYearId: sch.academicYearId,
    }));

    res.json(mapped);
  } catch (error) {
    console.error('Get Schedules Error:', error);
    res.status(500).json({
      error: 'An error occurred while fetching schedules.'
    });
  }
};

//
// PËRDITËSIMI I ORARIT
//
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId,
      startTime,
      endTime,
      daysOfWeek,
      academicYearId,
      studyYear
    } = req.body;

    const schedule = await UniSchedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Validim (opsionale)
    if (subjectId) {
      const subject = await Subject.findByPk(subjectId);
      if (!subject) return res.status(400).json({ error: 'Invalid subjectId' });
    }
    if (instructorId) {
      const instructor = await Instructor.findByPk(instructorId);
      if (!instructor) return res.status(400).json({ error: 'Invalid instructorId' });
    }
    if (semesterId) {
      const semester = await Semester.findByPk(semesterId);
      if (!semester) return res.status(400).json({ error: 'Invalid semesterId' });
    }
    if (classLocationId) {
      const classLocation = await ClassLocation.findByPk(classLocationId);
      if (!classLocation) return res.status(400).json({ error: 'Invalid classLocationId' });
    }
    if (academicYearId) {
      const academicYear = await AcademicYear.findByPk(academicYearId);
      if (!academicYear) return res.status(400).json({ error: 'Invalid academicYearId' });
    }

    // Update fields
    await schedule.update({
      subjectId: subjectId ?? schedule.subjectId,
      instructorId: instructorId ?? schedule.instructorId,
      semesterId: semesterId ?? schedule.semesterId,
      eventType: eventType ?? schedule.eventType,
      classLocationId: classLocationId ?? schedule.classLocationId,
      startTime: startTime ?? schedule.startTime,
      endTime: endTime ?? schedule.endTime,
      daysOfWeek: daysOfWeek ?? schedule.daysOfWeek,
      academicYearId: academicYearId ?? schedule.academicYearId,
      studyYear: studyYear ?? schedule.studyYear,
    });

    const updatedSchedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.json({
      message: 'Schedule updated successfully',
      schedule: {
        id: updatedSchedule.id,
        eventType: updatedSchedule.eventType,
        startTime: updatedSchedule.startTime,
        endTime: updatedSchedule.endTime,
        daysOfWeek: updatedSchedule.daysOfWeek,
        academicYear: updatedSchedule.AcademicYear ? updatedSchedule.AcademicYear.name : null,
        studyYear: updatedSchedule.studyYear,
        subjectName: updatedSchedule.Subject?.name || null,
        instructorName: updatedSchedule.Instructor?.name || null,
        semesterName: updatedSchedule.Semester?.name || null,
        locationName: updatedSchedule.ClassLocation?.roomName || null,
        subjectId: updatedSchedule.subjectId,
        instructorId: updatedSchedule.instructorId,
        semesterId: updatedSchedule.semesterId,
        classLocationId: updatedSchedule.classLocationId,
        academicYearId: updatedSchedule.academicYearId,
      }
    });
  } catch (error) {
    console.error('Update Schedule Error:', error);
    res.status(500).json({ error: 'An error occurred while updating the schedule.' });
  }
};

//
// FSHIRJA E ORARIT
//
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
