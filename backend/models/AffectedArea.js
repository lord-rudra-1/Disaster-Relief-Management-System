const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const AffectedArea = sequelize.define('AffectedArea', {
    area_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    location: { type: DataTypes.STRING, allowNull: false },
    disaster_type: { type: DataTypes.STRING, allowNull: false },
    severity: { type: DataTypes.STRING, allowNull: false },
    population: { type: DataTypes.INTEGER, allowNull: false },
    casualties: { type: DataTypes.INTEGER, allowNull: false },
    immediate_needs: { type: DataTypes.TEXT, allowNull: false },
}, { timestamps: false });

module.exports = AffectedArea;