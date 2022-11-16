const express = require("express");
const {
	getPrograms,
	getProgram,
	createProgram,
	deleteProgram,
	updateProgram,
} = require("../controllers/programsController");

const router = express.Router();

// GET all programs
router.get("/", getPrograms);

// GET a single program
router.get("/:id", getProgram);

// POST a new program
router.post("/", createProgram);

// DELETE a program
router.delete("/:id", deleteProgram);

// UPDATE a program
router.patch("/:id", updateProgram);

module.exports = router;
