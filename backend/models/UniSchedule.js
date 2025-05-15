// models/UniSchedule.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UniSchedule = sequelize.define(
  'UniSchedule',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    /* ---- BUSINESS FIELDS ----------------------------------------- */
    eventType: {
      type: DataTypes.STRING, // p.sh. "Ligjërata", "Ushtrime G1" …
      allowNull: false,
    },
    classLocationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME, // "HH:MM:SS"
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    daysOfWeek: {
      type: DataTypes.ARRAY(DataTypes.STRING), // ["Monday", "Wednesday"]
      allowNull: false,
    },
    academicYearId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    studyYear: {
      type: DataTypes.INTEGER, // 1 | 2 | 3
      allowNull: false,
    },

    /* ---- NEW: preview / publish ---------------------------------- */
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'draft',
    },
    previewToken: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: 'UniSchedules',
  }
);

module.exports = UniSchedule;
