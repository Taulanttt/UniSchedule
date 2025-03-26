// config/associations.js
const Semester = require('../models/Semester');
const Instructor = require('../models/Instructor');
const Subject = require('../models/Subject');
const UniSchedule = require('../models/UniSchedule');
const ClassLocation = require('../models/ClassLocation'); // ADD THIS

// 1. Semester → UniSchedule
Semester.hasMany(UniSchedule, {
  foreignKey: 'semesterId',
  onDelete: 'CASCADE',
});
UniSchedule.belongsTo(Semester, { foreignKey: 'semesterId' });

// 2. Instructor → UniSchedule
Instructor.hasMany(UniSchedule, {
  foreignKey: 'instructorId',
  onDelete: 'CASCADE',
});
UniSchedule.belongsTo(Instructor, { foreignKey: 'instructorId' });

// 3. Subject → UniSchedule
Subject.hasMany(UniSchedule, {
  foreignKey: 'subjectId',
  onDelete: 'CASCADE',
});
UniSchedule.belongsTo(Subject, { foreignKey: 'subjectId' });

// 4. ClassLocation → UniSchedule
ClassLocation.hasMany(UniSchedule, {
  foreignKey: 'classLocationId',
  onDelete: 'CASCADE',
});
UniSchedule.belongsTo(ClassLocation, { foreignKey: 'classLocationId' });

// Export them all
module.exports = {
  Semester,
  Instructor,
  Subject,
  UniSchedule,
  ClassLocation, // Export this if needed in the controller
};
