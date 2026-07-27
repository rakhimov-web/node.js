const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
// middleware

app.use(express.json());
app.use(cors());

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
