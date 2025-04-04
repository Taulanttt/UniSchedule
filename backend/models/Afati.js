const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Afati = sequelize.define('Afati', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // Example: "February"
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = Afati;
