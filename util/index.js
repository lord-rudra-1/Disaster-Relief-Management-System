const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log("DB Config:", process.env.DB_NAME, process.env.USERNAME, process.env.PASS, process.env.HOST, process.env.DIALECT, process.env.PORT);


const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASS,{
    host: process.env.HOST,
    dialect: process.env.DIALECT || 'mysql',
    port:process.env.PORT
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
testConnection();

module.exports = sequelize;

