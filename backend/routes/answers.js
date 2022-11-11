const express = require("express");
const {
	getAnswers,
	getAnswer,
	createAnswer,
	deleteAnswer,
	updateAnswer,
} = require("../controllers/answerController");

const router = express.Router();

// GET all answers
router.get("/", getAnswers);

// GET a single answer
router.get("/:id", getAnswer);

// POST a new answer
router.post("/", createAnswer);

// DELETE a answer
router.delete("/:id", deleteAnswer);

// UPDATE a answer
router.patch("/:id", updateAnswer);

module.exports = router;
