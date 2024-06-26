const jwt=require('jsonwebtoken');
const express=require('express');
const mongoose=require('mongoose');
jwtPassword="123456";
const app=express();
app.use(express.json());
//mongoose.connect('mongodb+srv://sriram26112001:zoq8V22NF5dK000PcXi@cluster0.dm2ez0w.mongodb.net/user_app');//for making a connection to the database

mongoose.connect('mongodb+srv://sriram26112001:zoq8V22NF5dKPcXi@cluster0.dm2ez0w.mongodb.net/user_app');
//lets define the schema

const userSchema=new mongoose.Schema({
    name :{type :String,required : true},
    password :{type :String, required :true}
},{
    timestamps :true
});

//create the model

const users=mongoose.model("users",userSchema);

//export the model

module.exports=users;

//instead of creating the in-memory database we are going to store the data in the backend

app.post('/signup',async function(req,res){
    try
    {
        const name1=req.body.name;
        const password1=req.body.password;
        const existingUser=await users.findOne({name : name1});
        if(existingUser)
        {
            return res.json({
            msg : "User already exist"
            });
        }
        else
        {
            const user1=new users({
                name : name1,
                password : password1
            });
            await user1.save();
            return res.json({
                msg:"dataBase Updated"
            });
        }
    }
    catch(error)
    {
        console.error(error);
        return res.json({
            msg:"Internal server error"
        });
    }
});

//now lets create other end points

app.post("/signin",function(req,res){
    //so here the thing we have to do is we have to check in dataBase whether the user is present in the dataBase if yes we have to create a token for him
    //so lets see from harkirat how to verify whether the user is present in the dataBase.

});


// Define the port number to listen on
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, function(){
  console.log('Server is running on http://localhost:'+PORT);
});
