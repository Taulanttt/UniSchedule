const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Instructor = sequelize.define('Instructor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('professor', 'assistant'),
    allowNull: false,
  }
});

  module.exports = Instructor;