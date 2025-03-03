const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');

const Donor = sequelize.define('Donor', {
    donor_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    donor_name: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.STRING, unique: true, allowNull: false }
});

module.exports = Donor;
