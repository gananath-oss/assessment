const Subject = require("../models/subject");

exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).send(subject);
  } catch (error) {
    res.status(400).send(error.errorResponse.errmsg);
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSubjectByKey = async (req, res) => {
  try {
    const subject = await Subject.findOne({
      subjectKey: req.params.subjectKey,
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json({ data: subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const subject = await Subject.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!subject) {
      return res.status(404).send({ message: "Subject not found" });
    }

    res.status(200).send(subject);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).send({ message: "Subject not found" });
    }

    res.status(200).send({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
