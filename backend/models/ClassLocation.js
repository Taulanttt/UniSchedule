// models/ClassLocation.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClassLocation = sequelize.define('ClassLocation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  roomName: {
    type: DataTypes.STRING, // e.g. 'Room 205'
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = ClassLocation;
