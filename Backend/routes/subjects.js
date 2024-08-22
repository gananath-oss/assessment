const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

// CRUD routes
router.post("/", subjectController.createSubject);
router.get("/", subjectController.getAllSubjects);

module.exports = router;
