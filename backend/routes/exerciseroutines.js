const express = require("express");
const {
	getExerciseroutines,
	getExerciseroutine,
	createExerciseroutine,
	deleteExerciseroutine,
	updateExerciseroutine,
} = require("../controllers/exerciseroutineController");

const router = express.Router();

// GET all exerciseroutines
router.get("/", getExerciseroutines);

// GET a single exerciseroutine
router.get("/:id", getExerciseroutine);

// POST a new exerciseroutine
router.post("/", createExerciseroutine);

// DELETE a exerciseroutine
router.delete("/:id", deleteExerciseroutine);

// UPDATE a exerciseroutine
router.patch("/:id", updateExerciseroutine);

module.exports = router;
