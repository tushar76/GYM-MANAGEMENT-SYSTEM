const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/static', express.static('static'))
app.use(express.static("public")); // Static files are in the public folder

mongoose.connect('mongodb://localhost:27017/gymDb', { useNewUrlParser: true });
const validSchema = new mongoose.Schema({
    username: String,
    gymName: String,
    phone: Number,
    email: String,
    password: String
})

const clientSchema = new mongoose.Schema({
    username: String,
    phone: String,
    email: String,
    address: String,
    
    // inlineRadioOptions: String,
    city:String,
    zip:String,
    state:String
})
const Auth =new  mongoose.model("Auth", validSchema);
const Client =new  mongoose.model("Client", clientSchema);
app.get("/",(req,res)=>{
    res.render('signup')
})
app.get("/signup", (req, res) => {
    res.render('signup')
})


app.post("/signup", (req, res) => {
   
    const user = req.body.username;
    const pass = req.body.password;
    const gym = req.body.gymName;
    const emai = req.body.email;
    const pho = req.body.phone;

    
    // Auth.findOne({ username: uname, gymName: gym, phone: pho, email: emai, password: pass }, (err, foundP) => {
        Auth.findOne({username:user},(err,foundP)=>{
        if (foundP) {
            res.render("signup")
        }
        else {
            const person = new Auth({
                username: user,
                gymName: gym,
                phone: pho,
                email: emai,
                password: pass
            })
            person.save();
            res.redirect("/index")
        }
    })

})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", (req, res) => {
    const uname = req.body.username;
    const gym = req.body.gymName;
    const pho = req.body.phone;
    const emai = req.body.email;
    const pass = req.body.password;
    Auth.find({ username: uname, gymName: gym, phone: pho, email: emai, password: pass }, (err, foundItems) => {
        if (foundItems) {
            res.redirect("/index")
        }
        else {
            res.redirect("/signup")
        }
    })
})
app.get("/cinfo",(req,res)=>{

    Client.find({},(err,foundC)=>{
        res.render('cinfo',{clients:foundC})
    })

})
app.get("/index", (req, res) => {
    res.render("index");
})

app.get("/diet", (req, res) => {
    res.render("diet");
})
app.get("/workout", (req, res) => {
    res.render("workout");
})
app.get("/clients", (req, res) => {
    res.render("clients");
})


app.post("/client",(req,res)=>{
    const uname = req.body.username;
    const pno = req.body.phone;
    const mail = req.body.email; 
    const adrs = req.body.address;   
    const ct = req.body.city;
    const zp = req.body.zip;
    const client = new Client({
        username: uname,
        phone: pno,
        email: mail,
        address: adrs,
        city:ct,
        zip:zp,
    })
    client.save(function(err)
    {
        if(!err)
        {
            res.render("index");
        }
        else 
        {
            res.write("404,OOPS! SOMETHING WENT WRONG,PLEASE TRY AGAIN LATER.WE ARE SORRY FOR THIS. ");
        }
    });
})

app.get("/contactus", (req, res) => {
    res.render("contactus");
})

app.get("/workoutmen", (req, res) => {
    res.render("workoutmen");
})

app.get("/workoutwomen", (req, res) => {
    res.render("workoutwomen");
})

app.get("/musclebuilding", (req, res) => {
    res.render("musclebuilding");
})

app.get("/fullbody", (req, res) => {
    res.render("fullbody");
})

app.listen(2900, function () {
    console.log("Server started on port 3000");
});

