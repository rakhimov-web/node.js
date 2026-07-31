const { Router } = require("express");
const users = Router();

const {
  postRegister,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/getUsers", getUsers);
users.put("/updateUser/:id", updateUser);
users.get("/getUserById/:id", getUserById);
users.delete("/deleteUser/:id", deleteUser);

module.exports = { users };
