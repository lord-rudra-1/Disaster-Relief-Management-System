const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');

const Volunteer = sequelize.define('volunteers', {
    volunteer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    //lname: { type: DataTypes.STRING, allowNull: false}, 
    contact: { type: DataTypes.STRING, unique: true, allowNull: false },
    skills: { type: DataTypes.TEXT, allowNull: false },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: false });

module.exports = Volunteer;
