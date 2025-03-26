// models/Semester.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Semester = sequelize.define('Semester', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // e.g. 'Winter', 'Summer'
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Semester;
