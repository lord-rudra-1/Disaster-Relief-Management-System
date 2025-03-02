const express = require('express')
const app  = express()
const ejs = require('ejs')
const path = require("path");
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
require('./util')
const User = require('./models/userSchema');


app.set("view engine","ejs")
app.set('views', path.join(__dirname,'./html'))
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.render("CreateAcc")
})

app.get('/login',(req,res)=>{
    res.render("loginAcc");
})

app.post('/Signup',async(req,res)=>{
    console.log(req.body); 
    console.log(req.body.firstName);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    
    if (!firstName || !lastName || !email || !password) {
        return res.send("All fields are required!");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).send("User created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
})

app.post('/Signin',async(req,res)=>{
    const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password are required!");
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email or password!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid email or password!");
    }
    res.render("Home");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing in");
  }
})


app.get('/admin/access',async(req,res)=>{
    const user = await User.findAll({});
    res.json(user);
});

app.listen(5000,()=>{
    console.log("port listen at 5000");
})
