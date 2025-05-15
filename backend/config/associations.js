// config/associations.js
const Semester      = require('../models/Semester');
const Instructor    = require('../models/Instructor');
const Subject       = require('../models/Subject');
const UniSchedule   = require('../models/UniSchedule');
const ClassLocation = require('../models/ClassLocation');
const ExamSchedule  = require('../models/ExamSchedule');
const Afati         = require('../models/Afati');
const ListEmail     = require('../models/ListEmail');
const AcademicYear  = require('../models/AcademicYear');

/*  Semester → UniSchedule */
Semester.hasMany(UniSchedule, { foreignKey: 'semesterId', onDelete: 'CASCADE' });
UniSchedule.belongsTo(Semester, { foreignKey: 'semesterId' });

/*  Instructor → UniSchedule */
Instructor.hasMany(UniSchedule, { foreignKey: 'instructorId', onDelete: 'CASCADE' });
UniSchedule.belongsTo(Instructor, { foreignKey: 'instructorId' });

/*  Subject → UniSchedule */
Subject.hasMany(UniSchedule, { foreignKey: 'subjectId', onDelete: 'CASCADE' });
UniSchedule.belongsTo(Subject, { foreignKey: 'subjectId' });

/*  ClassLocation → UniSchedule */
ClassLocation.hasMany(UniSchedule, { foreignKey: 'classLocationId', onDelete: 'CASCADE' });
UniSchedule.belongsTo(ClassLocation, { foreignKey: 'classLocationId' });

/*  Exam-specific relations (unchanged) */
Subject.hasMany(ExamSchedule, { foreignKey: 'subjectId', onDelete: 'CASCADE' });
ExamSchedule.belongsTo(Subject,   { foreignKey: 'subjectId'  });
Instructor.hasMany(ExamSchedule, { foreignKey: 'instructorId', onDelete: 'CASCADE' });
ExamSchedule.belongsTo(Instructor,{ foreignKey: 'instructorId'});
Afati.hasMany(ExamSchedule,      { foreignKey: 'afatiId', onDelete: 'CASCADE' });
ExamSchedule.belongsTo(Afati,    { foreignKey: 'afatiId'  });

AcademicYear.hasMany(ExamSchedule,{ foreignKey: 'academicYearId' });
ExamSchedule.belongsTo(AcademicYear,{ foreignKey: 'academicYearId' });

AcademicYear.hasMany(UniSchedule, { foreignKey: 'academicYearId' });
UniSchedule.belongsTo(AcademicYear,{ foreignKey: 'academicYearId' });

module.exports = {
  Semester,
  Instructor,
  Subject,
  UniSchedule,
  ClassLocation,
  ExamSchedule,
  Afati,
  AcademicYear,
  ListEmail,
};
