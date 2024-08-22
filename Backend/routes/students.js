const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// CRUD routes
router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);

module.exports = router;
