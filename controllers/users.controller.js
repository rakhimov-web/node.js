const { User } = require("../model/userSchema");

const postRegister = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthday,
      jinsi,
      address,
      phone,
    } = req.body;
    const existingUser = await User.findOne({ username });
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu nom bilan ro'yxatdan o'tgan user mavjud",
      });
    } else {
      const newUser = new User({
        username,
        firstname,
        lastname,
        birthday,
        jinsi,
        address,
        phone,
        password,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!",
      });
    }
  } catch (error) {
    console.error("Xato", error.message);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Ro'yxatdan o'tish da xato yuz berdi",
    });
  }
};

// -----------------Get Users-----------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      message: "Barcha foydalanuvchilar ro'yxati olingan.",
      innerData: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Foydalanuvchilarni olishda xato yuz berdi.",
    });
  }
};

// -----------------Get user by id -----------------

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

// -------------------------Update users--------------------
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, firstname, lastname, phone, address, password } =
      req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        firstname,
        lastname,
        phone,
        address,
        password,
      },
      { new: true },
    );
    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User updated successfully!",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete User

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deleteUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postRegister,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
