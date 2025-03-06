const express = require('express');
const app = express();
const path = require("path");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('./util'); // Ensure database connection

// Import Models
const User = require('./models/userSchema');
const AffectedArea = require('./models/AffectedArea');
const Volunteer = require('./models/Volunteer');
const ResourceCategory = require('./models/ResourceCategory');
const Resource = require('./models/Resource');
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const VolunteerAssignment = require('./models/VolunteerAssignment');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './html'));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**  Show SignIn Page at `localhost:5002/` **/
app.get('/', (req, res) => {
    res.render("loginAcc");
});

/**  Signup Page **/
app.get('/signup', (req, res) => {
    res.render("CreateAcc");
});

/**  Home Page **/
app.get('/home', (req, res) => {
    res.render("Home", { showTables: false, data: {} });
});

/**  Fetch All Tables Data When Button Clicked **/
app.get('/fetch-all-tables', async (req, res) => {
    try {
        const affectedAreas = await AffectedArea.findAll();
        const volunteers = await Volunteer.findAll();
        const donors = await Donor.findAll();
        const donations = await Donation.findAll();
        const resources = await Resource.findAll();
        const resourceCategories = await ResourceCategory.findAll();
        const assignments = await VolunteerAssignment.findAll();

        res.json({
            affectedAreas,
            volunteers,
            donors,
            donations,
            resources,
            resourceCategories,
            assignments
        });
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**  Signup API **/
app.post('/Signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.send("All fields are required!");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });
        res.redirect('/home'); // Redirect to Home after signup
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

/**  Login API **/
app.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send("Email and password are required!");

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).send("Invalid email or password!");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Invalid email or password!");

        res.redirect('/home'); // Redirect to Home after login
    } catch (err) {
        console.error(err);
        res.status(500).send("Error signing in");
    }
});

/** ✅ Start Server **/
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
