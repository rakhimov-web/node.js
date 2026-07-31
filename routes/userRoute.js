const { Router } = require("express");
const users = Router();

const {
  postRegister,
  getUserById,
  getUsers,
  updateUser,
} = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/getUsers", getUsers);
users.put("/updateUser/:id", updateUser);
users.get("/getUserById/:id", getUserById);

module.exports = { users };
