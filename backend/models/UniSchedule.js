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
    type: DataTypes.STRING, // e.g. 'exam group1'
    allowNull: false,
  },
  // Foreign key to ClassLocation
  classLocationId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Using TIME type for "HH:MM:SS"
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  // e.g. ['Monday','Wednesday']
  daysOfWeek: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  // e.g. '2024/25'
  academicYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // e.g. 1, 2, 3...
  studyYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = UniSchedule;
