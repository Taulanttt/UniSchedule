// models/AcademicYear.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AcademicYear = sequelize.define('AcademicYear', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // p.sh. a është aktual, apo jo
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'AcademicYears',
  timestamps: false, // ose true, sipas dëshirës
});

module.exports = AcademicYear;
