const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentKey: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  subjectKey: { type: String, required: true },
  grade: { type: Number, required: true },
  remarks: {
    type: String,
    enum: ["PASS", "FAIL"],
    default: function () {
      return this.grade >= 75 ? "PASS" : "FAIL";
    },
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
