const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
