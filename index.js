const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser'); 
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { Op } = require("sequelize")
require('dotenv').config();
require('./util');

// Import Models
const User = require('./models/userSchema');
const AffectedArea = require('./models/AffectedArea');
const Volunteer = require('./models/Volunteer');
const ResourceCategory = require('./models/ResourceCategory');
const Resource = require('./models/Resource');
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const VolunteerAssignment = require('./models/VolunteerAssignment');
const relief_efforts = require('./models/relief_efforts');
const ejs = require('ejs');
const volunteer_assign = require('./models/VolunteerAssignment');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './html'));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); 

app.get('/', (req, res) => {
    res.render("loginAcc");
});

/**  Signup Page **/
app.get('/signup', (req, res) => {
    res.render("CreateAcc");
});

app.get('/home',async (req, res) => {
    const Show = false;
    let flag = false;
    const  id  = req.cookies?.id;
    if (!id) 
    {
        return res.render("Home", {flag : flag, showTables:false});
    }
    const user = await User.findOne({ where: { id } });
    if(user.role === "admin")
    {
        flag = true;
    }
    res.render("Home", {flag : flag, showTables:false});
});

app.get('/volunteer',(req,res)=>{
    res.render("volunteer");
})


app.get('/admin/dashboard', async (req, res) => {
    
    const { id } = req.cookies; 
    if (!id) 
    {
        return res.status(401).send("Unauthorized: No ID found in cookies");
    }

    const user = await User.findOne({ where: { id } });

    if (!user) 
    {
        return res.status(404).send("User not found");
    }
    if (user.role === "admin") 
        {
        const users = await User.findAll();
        return res.render('adminDashboard');
    } 
    else 
    {
        return res.status(403).send("Forbidden: You do not have admin access");
    }
});


app.get('/show-tables', async (req, res) => {
    try {
        const affectedAreas = await AffectedArea.findAll();
        const volunteers = await Volunteer.findAll();
        const donors = await Donor.findAll();
        const donations = await Donation.findAll();
        const resources = await Resource.findAll();
        const resourceCategories = await ResourceCategory.findAll();
        const assignments = await VolunteerAssignment.findAll();
        const relief_effort = await relief_efforts.findAll();

        res.render('all_table_display', {
            affectedAreas,
            volunteers,
            donors,
            donations,
            resources,
            resourceCategories,
            assignments,
            relief_effort
        });
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/Signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.send("All fields are required!");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });
        res.redirect('/'); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});


app.post('/Signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send("Email and password are required!");

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).send("Invalid email or password!");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send("Invalid email or password!");
        res.cookie("id",user.id);
        res.redirect('/home'); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error signing in");
    }
});

app.get('/admin/Dashboard',async(req,res)=>{
    res.render("adminDashboard");
})

app.get('/donor',(req,res)=>{
    res.render('NewDonorForm');
})

app.post('/donor',async(req,res)=>{
    const name = req.body.donor_name;
    const contact = req.body.contact
    await Donor.create({
        donor_name: name,
        contact: contact,
    });
    const count = await Donor.count();
    res.render("NewDonorForm",{id: count});
})

app.get('/donation',(req,res)=>{
    res.render('donations');
})


app.post('/volunteerSignup',async(req,res)=>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contact = req.body.contact;
    const skill = req.body.skills;
    console.log(fname + lname + contact + skill);
    await Volunteer.create({
        name : fname,
        //lname : lname,
        contact : contact,
        skills : skill,
    });
    res.redirect("/volunteer");
})

app.get('/add_resource', (req, res) => {
    res.render('add_resource');  
});


app.post('/add_resource', async (req, res) => {
    const category_id = req.body.category_id;
    const quantity = req.body.quantity;
    const area_id = req.body.area_id;

    console.log(`Category: ${category_id}, Quantity: ${quantity}, Area: ${area_id}`);

    try {
        await Resource.create({
            category_id: category_id,
            quantity: quantity,
            area_id: area_id,
        });
        res.redirect("/add_resource");  
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).send('Error adding resource');
    }
});

app.post('/donations', async (req, res) => {
    const donor_id = req.body.donor_id;
    const donation_type = req.body.donation_type;
    const amount = req.body.amount;
    const category_id = req.body.category_id;
    const quantity = req.body.quantity;
    const allocated_to = req.body.quantity;

    try {
        await Donation.create({
            donor_id : donor_id,
            donation_type : donation_type,
            amount : amount,
            category_id : category_id,
            quantity : quantity,
            allocated_to : quantity,
        });
        res.redirect("/home"); 
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).send('Error adding resource');
    }
});

app.get('/affected-area', async (req, res) => {
    try {
        const affectedAreas = await AffectedArea.findAll();
        res.render('affected-area', { affectedAreas });
    } catch (error) {
        console.error("Error fetching affected areas:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/relief_effort", async (req, res) => {
    try {
        res.render('relief-effortForm');
    } catch (error) {
        console.error("Error fetching affected areas:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/relief_effort', async (req, res) => {
    const area_id = req.body.area_id;
    const disaster_type = req.body.disaster_type;
    const status = req.body.status;
    const volunteer_id = req.body.volunteer_id;
    const resource_id = req.body.resource_id;
    const quantity_dispatch = req.body.quantity_dispatch;

    try {
        await relief_efforts.create({
            area_id : area_id,
            disaster_type : disaster_type,
            status : status,
            volunteer_id : volunteer_id,
            resource_id : resource_id,
            quantity_dispatch : quantity_dispatch,
        });
        const R = await Resource.findAll({where :{ resource_id: resource_id }});
        await Resource.update(
            { quantity:  R.quantity - quantity_dispatch},
            { where: { resource_id: resource_id } }
        );
        await Volunteer.update(
            { availability: false },
            { where: { volunteer_id: volunteer_id } }
        );

        res.redirect("/admin/dashboard");  // Redirect to resources page after adding
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).send('Error adding resource');
    }
});

app.get("/1", async (req, res) => {
    try {
        const affectedAreas = await AffectedArea.findAll({
            where: { severity: 'High' }
        });

        console.log("Fetched Affected Areas:", JSON.stringify(affectedAreas, null, 2));

        res.render("one", { affectedAreas }); 
    } catch (error) {
        console.error("Error fetching high severity affected areas:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/2', async (req, res) => {
    try {
        const vol = await Volunteer.findAll({    
            where: {
                skills: {
                    [Op.like]: '%Medical%' 
                },
                availability: true
            }
        });
        res.render("two",{volunteers:vol}); 
    } catch (error) {
        console.error("Error retrieving medical volunteers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/volunteer_assign",(req,res)=>{
    return res.render('volunteer_assign');
})

app.post('/volunteer_assign', async (req, res) => {
    const volunteer_id = req.body.volunteer_id;
    const area_id = req.body.area_id;
    const task = req.body.task;
    const assigned_date = req.body.assigned_date;
    const status = req.body.status;

    try {
        await volunteer_assign.create({
            volunteer_id : volunteer_id,
            area_id : area_id,
            task : task,
            assigned_date : assigned_date,
            status : status,
        });
        await Volunteer.update(
            { availability: false },
            { where: { volunteer_id: volunteer_id } }
        );
        res.redirect("/admin/dashboard");  
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).send('Error adding resource');
    }
});

// app.get("/3", async (req, res) => {
//     try {
//         const reliefEfforts = await relief_efforts.findAll({
//             include: [
//                 {
//                     model: Volunteer,
//                     attributes: ["volunteer_id", "name", "skills", "contact"],
//                 },
//                 {
//                     model: AffectedArea,
//                     attributes: ["area_id", "location", "disaster_type", "severity"],
//                 }
//             ]
//         });

//         res.json(reliefEfforts);
//     } catch (error) {
//         console.error("Error retrieving relief efforts:", error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

app.get('/4',async (req,res)=>{
    const donations = await Donation.findAll({
        where:{
            allocated_to: null,
        },
    })
    return res.render("four",{donations: donations});
})
const PORT = process.env.PORT_SERVER;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
