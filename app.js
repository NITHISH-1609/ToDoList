const express = require("express");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const importer=require(__dirname+"/function.js");

let items=["Buy food","Cook food"];
let workitems=[];
const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const day=importer.send();

app.get("/", (req, res) => {
res.render("list", {
        wday: day,
        Addme:items
    })

})

app.post("/",(req,res)=>{
    console.log(req.body);
    let Text=req.body.text;
    if(req.body.button==="Work")
    {
        workitems.push(Text);
        res.redirect("/work");
    }
    else{

    items.push(Text);
    res.redirect("/");}
    
})

app.get("/work",(req,res)=>{

    res.render("list", {
        wday:"Work List",
        Addme:workitems
    })


})

app.get("/about",(req,res)=>{
    res.render("about",{Message:"Hey,You found me!"});
})



app.listen(process.env.PORT ||3000, () => {
    console.log("Started at port 3000");
})