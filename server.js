const sequelize = require('./util/index');
const User = require('./models/userSchema');

(async () => {
    try {
      await sequelize.sync({ force: false }); // Set force: true to drop & recreate tables
      console.log("User table created successfully!");
    } catch (error) { 
      console.error("Error syncing database:", error);
    } finally {
      await sequelize.close();
    }
  })();