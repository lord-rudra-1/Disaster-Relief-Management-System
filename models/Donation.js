const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');
const Donor = require('./Donor');
const ResourceCategory = require('./ResourceCategory');
const AffectedArea = require('./AffectedArea');

const Donation = sequelize.define('Donation', {
    donation_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    donor_id: { type: DataTypes.INTEGER, references: { model: Donor, key: 'donor_id' } },
    donation_type: { type: DataTypes.ENUM('Cash', 'Resource'), allowNull: false },
    amount: { type: DataTypes.FLOAT, defaultValue: null },
    category_id: { type: DataTypes.INTEGER, references: { model: ResourceCategory, key: 'category_id' }, defaultValue: null },
    quantity: { type: DataTypes.INTEGER, defaultValue: null },
    allocated_to: { type: DataTypes.INTEGER, references: { model: AffectedArea, key: 'area_id' } },
    donation_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Donation;
