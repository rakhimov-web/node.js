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
