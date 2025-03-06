const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');
const Volunteer = require('./Volunteer');
const AffectedArea = require('./AffectedArea');

const VolunteerAssignment = sequelize.define('VolunteerAssignment', {
    assignment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    volunteer_id: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'volunteer_id' } },
    area_id: { type: DataTypes.INTEGER, references: { model: AffectedArea, key: 'area_id' } },
    task: { type: DataTypes.STRING, allowNull: false },
    assigned_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM('Pending', 'Ongoing', 'Completed'), defaultValue: 'Pending' }
}, { timestamps: false });

module.exports = VolunteerAssignment;
