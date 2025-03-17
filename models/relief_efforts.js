const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');
const Volunteer = require('./Volunteer')
const Resource = require('./Resource');
const ResourceCategory = require('./ResourceCategory');

const relief_efforts = sequelize.define('relief_efforts', {
    effort_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    area_id: { type: DataTypes.INTEGER, allowNull: false },
    disaster_type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('active', 'inactive'), allowNull: false },
    volunteer_id: { type: DataTypes.INTEGER, references: { model: Volunteer, key: 'volunteer_id' },allowNull: false },
    resource_id: { type: DataTypes.INTEGER, references: { model: ResourceCategory, key: 'category_id' }, defaultValue: 0 },
    quantity_dispatch: {type: DataTypes.INTEGER, allowNull: true}
}, { timestamps: false });

module.exports = relief_efforts;