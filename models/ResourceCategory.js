const { DataTypes } = require('sequelize');
const sequelize = require('../util/index');

const ResourceCategory = sequelize.define('ResourceCategory', {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category_name: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { timestamps: false });

module.exports = ResourceCategory;
