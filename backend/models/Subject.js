// models/Subject.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,  // e.g. 'Matematika 1'
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,  // e.g. 'MAT101'
    unique: true,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Subject;
