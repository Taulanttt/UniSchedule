const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ExamSchedule = sequelize.define('ExamSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING,
    defaultValue: 'exam',
  },
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studyYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD format
    allowNull: false,
  },
  hour: {
    type: DataTypes.TIME, // HH:MM:SS format
    allowNull: false,
  },
  afatiId: {
    type: DataTypes.UUID, // e.g. "February"
    allowNull: false,
  },
  // models/ExamSchedule.js
subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  instructorId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
  
}, {
  timestamps: true,
});

module.exports = ExamSchedule;
