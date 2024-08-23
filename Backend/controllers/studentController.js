const Student = require("../models/student");
const Subject = require("../models/subject");

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getStudentsWithSubjects = async (req, res) => {
  try {
    const students = await Student.find();

    const studentDataWithSubjects = await Promise.all(
      students.map(async (student) => {
        const subject = await Subject.findOne({
          subjectKey: student.subjectKey,
        });
        return {
          _id: student._id,
          studentName: student.studentName,
          subjectKey: student.subjectKey,
          subjectName: subject ? subject.subjectName : "Unknown",
          grade: student.grade,
          remarks: student.remarks,
        };
      })
    );

    res.status(200).json({ data: studentDataWithSubjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(student);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
