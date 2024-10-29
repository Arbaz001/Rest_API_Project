// import the express module
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");


const { type } = require("os");
const app = express();
const port = 8080;

//Connection of mongoose
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log('MongoDB connected'))
.catch((err) => console.log('Mongo Error',err));

// M1-Schema --> Define the Structure
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type: String,
    },
},
{timestamps: true},
);

// M2 -->Schema model
const User =  mongoose.model("user",userSchema);

//use middleware for user request  (assume use as a plugin)
//Middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // console.log("hello from middleware 1");
    // return res.json({msg : 'hello from middleware 1'});
    fs.appendFile('log.txt', `${req.ip}: ${Date.now()}: ${req.method}: ${req.path} \n`,
        (err, data) => {
            next();
        }
    );
});



//routes define

//html render without api
// app.get('/users',(req,res) => {
//     return res.json(users)
// });

//REST API
//json render with api

//GET /api/users - List all Users
app.get('/api/users', async(req, res) => {
    const allDBUsers= await User.find({});
    //custom headers response     //Always add X to custom headers --> it,s good practices
    res.setHeader("X-myName", "Arbaz ali");
    //custom headers request
    return res.json(allDBUsers);
});

//GET /api/users/1 - Get the user with ID 1
app.route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({error : "user not found"});
        return res.json(user);
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
        //Edit user with id
        return res.json({ status: "Success" });
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status:"Delete Succesfully"});
        //Delete user with id
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);

        // users.pop({ id: users.length - 1, ...user });
        // return res.json({ status: "deleted", id: users.length + 1 });
        // const body=req.body;
        // users.pop({ id:users.length-1,...body});
        // fs.unlink('./MOCK_DATA.json', (err,data)=>{
        //  return res.json({status: "succes",id: users.length});
        // });

    });

// POST /api/users 8- Create new user
app.post('/api/users', async(req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required....." });
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender,
    });
    return res.status(201).json({msg: 'success'});
});

// PATCH /api/users/1 - Edit the user with ID 1
// app.patch('/api/users/:id',(req,res) => {
//     //TODO: Edit the user with id
// })

// // DELETE /api/users/1 - Delete the user with ID 1
// app.delete('/api/users/:id',(req,res) => {
//     //TODO: Delete the user with id
// })


//listenig to the port
app.listen(port, () => console.log(`server startd at port number ${port}`));