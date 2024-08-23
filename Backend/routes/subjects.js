const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.post("/", subjectController.createSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/key/:subjectKey", subjectController.getSubjectByKey);
router.patch("/:id", subjectController.updateSubject);
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
