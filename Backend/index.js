require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/students");
const subjectRoutes = require("./routes/subjects");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.use("/students", studentRoutes);
app.use("/subjects", subjectRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
