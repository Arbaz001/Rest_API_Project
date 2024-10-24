// import the express module
const express=require("express");

// import users data file
const users=require("./MOCK_DATA.json")
const app=express();
const port=8080;

//routes define

//html render without api
// app.get('/users',(req,res) => {
//     return res.json(users)
// });

//REST API
//json render with api

//GET /api/users - List all Users
app.get('/api/users', (req,res) => {
    return res.json(users);
});

//GET /api/users/1 - Get the user with ID 1
app.route('/api/users/:id')
.get((req,res) => {
    // id leli
    const id=Number(req.params.id);
    // id find karoonga data me
    const user=users.find((user)=>user.id===id);
    return res.json(user);
})
.patch((req,res) => {
    //Edit user with id
    return res.json({status: "pending"});
})
.delete((req,res) => {
    //Delete user with id
    return res.json({status: "pending"});
});

// POST /api/users 8- Create new user
app.post('/api/users',(req,res) => {
    return res.json({status: "pending"});
})

// PATCH /api/users/1 - Edit the user with ID 1
// app.patch('/api/users/:id',(req,res) => {
//     //TODO: Edit the user with id
// })

// // DELETE /api/users/1 - Delete the user with ID 1
// app.delete('/api/users/:id',(req,res) => {
//     //TODO: Delete the user with id
// })


//listenig to the port
app.listen(port,() => console.log(`server startd at port number ${port}`));