// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // For loading environment variables

const app = express();
const PORT = process.env.PORT || 5002;

// MongoDB connection string from MongoDB Atlas (put this in your .env file)
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// // Middleware to parse JSON
// app.use(express.json());

// // Import routes
// const studentRoutes = require("./routes/studentRoutes");
// const subjectRoutes = require("./routes/subjectRoutes");

// // Use routes
// app.use("/students", studentRoutes);
// app.use("/subjects", subjectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
