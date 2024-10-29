const express = require("express");

const {
  handleGetAllUsers,
  handlegetUserById,
  handleupdateUserById,
  handledeleteUserById,
  handlecreateNewUserById,
} = require("../controllers/user");

const router = express.Router();

//REST API  ROUTES
router.route("/").get(handleGetAllUsers).post(handlecreateNewUserById);

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleupdateUserById)
  .delete(handledeleteUserById);

module.exports = router;
