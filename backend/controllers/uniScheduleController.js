// controllers/scheduleController.js
const {
  UniSchedule,
  Subject,
  Instructor,
  Semester,
  ClassLocation,
  AcademicYear,
} = require('../config/associations');
const { v4: uuidv4 } = require('uuid');

/* ---------------------------------------------------- */
/*  Helper                                              */
/* ---------------------------------------------------- */
const mapSchedule = (sch) => ({
  id: sch.id,
  eventType: sch.eventType,
  startTime: sch.startTime,
  endTime: sch.endTime,
  daysOfWeek: sch.daysOfWeek,
  academicYear: sch.AcademicYear?.name ?? null,
  studyYear: sch.studyYear,
  subjectName: sch.Subject?.name ?? null,
  instructorName: sch.Instructor?.name ?? null,
  semesterName: sch.Semester?.name ?? null,
  locationName: sch.ClassLocation?.roomName ?? null,

  /* foreign keys */
  subjectId: sch.subjectId,
  instructorId: sch.instructorId,
  semesterId: sch.semesterId,
  classLocationId: sch.classLocationId,
  academicYearId: sch.academicYearId,

  /* preview / publish */
  status: sch.status,
  previewToken: sch.previewToken,

  /* timestamps */
  createdAt: sch.createdAt,
  updatedAt: sch.updatedAt,
});

/* ---------------------------------------------------- */
/*  CREATE                                              */
/* ---------------------------------------------------- */
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
      academicYearId,
      studyYear,
      status = 'draft',              // <- default
    } = req.body;

    /* ---- FK validation (short-circuit) ---------------- */
    const validations = [
      [subjectId, Subject,       'subjectId'],
      [instructorId, Instructor, 'instructorId'],
      [semesterId, Semester,     'semesterId'],
      [classLocationId, ClassLocation, 'classLocationId'],
      [academicYearId, AcademicYear,   'academicYearId'],
    ];
    for (const [val, Model, label] of validations) {
      if (val && !(await Model.findByPk(val)))
        return res.status(400).json({ error: `Invalid ${label}` });
    }

    /* ---- create row ----------------------------------- */
    let schedule = await UniSchedule.create({
      subjectId,
      instructorId,
      semesterId,
      eventType,
      classLocationId,
      startTime,
      endTime,
      daysOfWeek,
      academicYearId,
      studyYear,
      status,
      previewToken: status === 'draft' ? uuidv4() : null,
    });

    schedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.status(201).json({
      message: 'Schedule created successfully',
      schedule: mapSchedule(schedule),
    });
  } catch (err) {
    console.error('Create Schedule Error:', err);
    res.status(500).json({ error: 'An error occurred while creating the schedule.' });
  }
};

// controllers/scheduleController.js
/* ------------------------------------------------------------------ */
/*  READ  – vetëm published                                           */
/* ------------------------------------------------------------------ */
exports.getPublishedSchedules = async (_req, res) => {
  try {
    const schedules = await UniSchedule.findAll({
      where  : { status: "published" },         // ← vetëm published
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
      order  : [["createdAt", "DESC"]],
    });
    res.json(schedules.map(mapSchedule));
  } catch (err) {
    console.error("Get Published Error:", err);
    res.status(500).json({ error: "Error while fetching published schedules." });
  }
};

/* ------------------------------------------------------------------ */
/*  READ  – admin: draft + published                                  */
/* ------------------------------------------------------------------ */
exports.getSchedules = async (req, res) => {
  try {
    /* nëse do të lejosh filtrimin me query ?status=draft|published */
    const where = {};
    if (req.query.status) where.status = req.query.status;

    const schedules = await UniSchedule.findAll({
      where,
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
      order  : [["createdAt", "DESC"]],
    });
    res.json(schedules.map(mapSchedule));
  } catch (err) {
    console.error("Get Schedules Error:", err);
    res.status(500).json({ error: "Error while fetching schedules." });
  }
};


/* ---------------------------------------------------- */
/*  UPDATE                                              */
/* ---------------------------------------------------- */
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
      studyYear,
      status,                 // <- allow status change
    } = req.body;

    const schedule = await UniSchedule.findByPk(id);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    /* optional FK validation */
    const checks = [
      [subjectId, Subject, 'subjectId'],
      [instructorId, Instructor, 'instructorId'],
      [semesterId, Semester, 'semesterId'],
      [classLocationId, ClassLocation, 'classLocationId'],
      [academicYearId, AcademicYear, 'academicYearId'],
    ];
    for (const [val, Model, label] of checks) {
      if (val && !(await Model.findByPk(val)))
        return res.status(400).json({ error: `Invalid ${label}` });
    }

    /* apply updates */
    await schedule.update({
      subjectId:        subjectId        ?? schedule.subjectId,
      instructorId:     instructorId     ?? schedule.instructorId,
      semesterId:       semesterId       ?? schedule.semesterId,
      eventType:        eventType        ?? schedule.eventType,
      classLocationId:  classLocationId  ?? schedule.classLocationId,
      startTime:        startTime        ?? schedule.startTime,
      endTime:          endTime          ?? schedule.endTime,
      daysOfWeek:       daysOfWeek       ?? schedule.daysOfWeek,
      academicYearId:   academicYearId   ?? schedule.academicYearId,
      studyYear:        studyYear        ?? schedule.studyYear,
      status:           status           ?? schedule.status,
      previewToken:
        status && status !== schedule.status && status === 'draft'
          ? uuidv4()
          : schedule.previewToken,
    });

    const updated = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.json({
      message: 'Schedule updated successfully',
      schedule: mapSchedule(updated),
    });
  } catch (err) {
    console.error('Update Schedule Error:', err);
    res.status(500).json({ error: 'An error occurred while updating the schedule.' });
  }
};

/* ---------------------------------------------------- */
/*  DELETE                                              */
/* ---------------------------------------------------- */
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UniSchedule.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Schedule not found' });
    res.status(204).send();
  } catch (err) {
    console.error('Delete Schedule Error:', err);
    res.status(500).json({ error: 'An error occurred while deleting the schedule.' });
  }
};
