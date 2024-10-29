const express = require("express");

const {connectMongoDb} = require("./connection")

const {logReqRes} = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const port = 8080;

//conection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDb Connected"));

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
//Middleware
app.use(logReqRes("log.txt"));
 
//Routes
app.use("/api/users",userRouter);


//listenig to the port
app.listen(port, () => console.log(`server startd at port number ${port}`));
