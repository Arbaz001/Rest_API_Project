const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
} 

async function handlegetUserById(req, res) {
    const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "user not found" });
      return res.json(user);
}
async function handleupdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
      return res.json({ status: "Success" });
}
async function handledeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Delete Succesfully" });
}
async function handlecreateNewUserById(req, res) {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "All fields are required....." });
    }
  
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      jobTitle: body.job_title,
      gender: body.gender,
    });
    
    return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleupdateUserById,
    handledeleteUserById,
    handlecreateNewUserById
};