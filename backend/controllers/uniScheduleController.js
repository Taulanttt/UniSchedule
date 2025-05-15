// controllers/scheduleController.js
const {
  UniSchedule,
  Subject,
  Instructor,
  Semester,
  ClassLocation,
  AcademicYear,
} = require("../config/associations");

/* ------------------------------------------------------------------ */
/* helper to shape the schedule we send back to the client             */
/* ------------------------------------------------------------------ */
const mapSchedule = (sch) => ({
  id: sch.id,
  eventType: sch.eventType,
  startTime: sch.startTime,
  endTime: sch.endTime,
  daysOfWeek: sch.daysOfWeek,
  academicYear: sch.AcademicYear ? sch.AcademicYear.name : null,
  studyYear: sch.studyYear,
  subjectName: sch.Subject?.name || null,
  instructorName: sch.Instructor?.name || null,
  semesterName: sch.Semester?.name || null,
  locationName: sch.ClassLocation?.roomName || null,

  /* foreign‑key ids */
  subjectId: sch.subjectId,
  instructorId: sch.instructorId,
  semesterId: sch.semesterId,
  classLocationId: sch.classLocationId,
  academicYearId: sch.academicYearId,

  /* timestamps */
  createdAt: sch.createdAt,
  updatedAt: sch.updatedAt,
});

/* ------------------------------------------------------------------ */
/* CREATE                                                              */
/* ------------------------------------------------------------------ */
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
    } = req.body;

    /* foreign‑key validation */
    const refs = await Promise.all([
      Subject.findByPk(subjectId),
      Instructor.findByPk(instructorId),
      Semester.findByPk(semesterId),
      ClassLocation.findByPk(classLocationId),
      AcademicYear.findByPk(academicYearId),
    ]);
    const names = [
      "subjectId",
      "instructorId",
      "semesterId",
      "classLocationId",
      "academicYearId",
    ];
    for (let i = 0; i < refs.length; i++) {
      if (!refs[i])
        return res.status(400).json({ error: `Invalid ${names[i]}` });
    }

    /* create */
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
    });

    schedule = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.status(201).json({
      message: "Schedule created successfully",
      schedule: mapSchedule(schedule),
    });
  } catch (err) {
    console.error("Create Schedule Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the schedule." });
  }
};

/* ------------------------------------------------------------------ */
/* READ ALL                                                            */
/* ------------------------------------------------------------------ */
exports.getSchedules = async (_req, res) => {
  try {
    const schedules = await UniSchedule.findAll({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.json(schedules.map(mapSchedule));
  } catch (err) {
    console.error("Get Schedules Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching schedules." });
  }
};

/* ------------------------------------------------------------------ */
/* UPDATE                                                              */
/* ------------------------------------------------------------------ */
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
    } = req.body;

    const schedule = await UniSchedule.findByPk(id);
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });

    /* optional FK validation */
    const checks = [
      [subjectId, Subject, "subjectId"],
      [instructorId, Instructor, "instructorId"],
      [semesterId, Semester, "semesterId"],
      [classLocationId, ClassLocation, "classLocationId"],
      [academicYearId, AcademicYear, "academicYearId"],
    ];
    for (const [val, Model, name] of checks) {
      if (val && !(await Model.findByPk(val)))
        return res.status(400).json({ error: `Invalid ${name}` });
    }

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

    const updated = await schedule.reload({
      include: [Subject, Instructor, Semester, ClassLocation, AcademicYear],
    });

    res.json({
      message: "Schedule updated successfully",
      schedule: mapSchedule(updated),
    });
  } catch (err) {
    console.error("Update Schedule Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the schedule." });
  }
};

/* ------------------------------------------------------------------ */
/* DELETE                                                              */
/* ------------------------------------------------------------------ */
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UniSchedule.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Schedule not found" });
    res.status(204).send();
  } catch (err) {
    console.error("Delete Schedule Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the schedule." });
  }
};
