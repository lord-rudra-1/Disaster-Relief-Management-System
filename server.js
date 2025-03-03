const sequelize = require('./util/index');
const User = require('./models/userSchema');
const AffectedArea = require('./models/AffectedArea');
const Volunteer = require('./models/Volunteer');
const ResourceCategory = require('./models/ResourceCategory');
const Resource = require('./models/Resource');
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const VolunteerAssignment = require('./models/VolunteerAssignment');

(async () => {
    try {
        await sequelize.sync({ force: false }); // Set force: true to recreate tables
        console.log("Database synced successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();