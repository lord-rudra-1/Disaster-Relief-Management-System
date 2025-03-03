const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');

const AffectedArea = sequelize.define('AffectedArea', {
    area_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    location: { type: DataTypes.STRING, allowNull: false },
    disaster_type: { type: DataTypes.STRING, allowNull: false },
    severity: { type: DataTypes.ENUM('Low', 'Medium', 'High'), allowNull: false },
    population: { type: DataTypes.INTEGER, allowNull: false },
    casualties: { type: DataTypes.INTEGER, defaultValue: 0 },
    immediate_needs: { type: DataTypes.TEXT }
});

module.exports = AffectedArea;