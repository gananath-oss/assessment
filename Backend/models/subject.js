const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectKey: { type: String, required: true, unique: true },
  subjectName: { type: String, required: true },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
