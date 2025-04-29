const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ListEmail = sequelize.define('ListEmail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // Example: "First Year Students"
    allowNull: false,
    unique: true,
  },
  emails: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of student emails
    allowNull: false,
    defaultValue: [], // default empty list
  },
}, {
  timestamps: true, // Automatically adds createdAt, updatedAt
});

module.exports = ListEmail;
