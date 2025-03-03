const sequelize = require('./util/index');
const User = require('./models/userSchema');

(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("Database synced successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();
