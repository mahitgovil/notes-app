const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/notes_db")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
