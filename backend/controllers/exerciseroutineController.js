import Exerciseroutines from "../schemas/exerciseroutinesModel";
import mongoose from "mongoose";

//get All exerciseroutines
const getExerciseroutines = async (req, res) => {
	const exerciseroutines = await Exerciseroutines.find({}).sort({
		createAt: -1,
	});

	res.status(200).json(exerciseroutines);
};

//get a single exerciseroutine
const getExerciseroutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such exerciseroutine" });
	}

	const exerciseroutine = await Exerciseroutines.findById(id);

	if (!exerciseroutine) {
		return res.status(404).json({ error: "No such exerciseroutine" });
	}

	res.status(200).json(exerciseroutine);
};

//create a new exerciseroutine
const createExerciseroutine = async (req, res) => {
	const { title, load, reps } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database
	try {
		const exerciseroutine = await Exerciseroutines.create({
			title,
			load,
			reps,
		});
		res.status(200).json(exerciseroutine);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a exerciseroutine
const deleteExerciseroutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such exerciseroutine" });
	}

	const exerciseroutine = await Exerciseroutines.findOneAndDelete({ _id: id });

	if (!exerciseroutine) {
		return res.status(400).json({ error: "No such exerciseroutine" });
	}

	res.status(200).json(exerciseroutine);
};

//update a exerciseroutine
const updateExerciseroutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such exerciseroutine" });
	}

	const exerciseroutine = await Exerciseroutines.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!exerciseroutine) {
		return res.status(400).json({ error: "No such exerciseroutine" });
	}

	res.status(200).json(exerciseroutine);
};

module.exports = {
	getExerciseroutines,
	getExerciseroutine,
	createExerciseroutine,
	deleteExerciseroutine,
	updateExerciseroutine,
};