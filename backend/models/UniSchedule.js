// models/UniSchedule.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UniSchedule = sequelize.define('UniSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.STRING, // e.g. 'lecture', 'lab'
    allowNull: false,
  },
  classCode: {
    type: DataTypes.STRING, // e.g. 'CS-101-GroupA'
    allowNull: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  recurrence: {
    type: DataTypes.STRING, // e.g. 'Weekly', 'None', 'Daily'
    allowNull: true,
  },
  daysOfWeek: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g. ['Monday','Wednesday']
    allowNull: true,
  },
  academicYear: {
    type: DataTypes.STRING, // e.g. '2024/25'
    allowNull: false,
  },
  studyYear: {
    type: DataTypes.INTEGER, // 1,2,3...
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = UniSchedule;
