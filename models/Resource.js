const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');
const ResourceCategory = require('./ResourceCategory');
const AffectedArea = require('./AffectedArea');

const Resource = sequelize.define('Resource', {
    resource_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_id: { type: DataTypes.INTEGER, references: { model: ResourceCategory, key: 'category_id' } },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    area_id: { type: DataTypes.INTEGER, references: { model: AffectedArea, key: 'area_id' } }
}, { timestamps: false });

module.exports = Resource;
