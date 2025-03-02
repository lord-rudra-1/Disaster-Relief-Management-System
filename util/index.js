const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project', 'root', 'kali',{
    host: 'localhost',
    dialect: 'mysql',
    port:33061
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