const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { users } = require("./routes/userRoute");

const app = express();
// middleware

app.use(express.json());
app.use(cors());
app.use("/users", users);

// database connection
async function connecToDB() {
  try {
    await connect(process.env.MOGNO_URL);
    console.log("MognoDB is connected!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

connecToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`"Server is running on http://localhost:3000/ ${PORT}"`);
});
