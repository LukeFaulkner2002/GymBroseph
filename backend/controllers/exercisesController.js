import Exercises from "../schemas/exercisesModel";
import mongoose from "mongoose";

//get All exercises
const getExercises = async (req, res) => {
	const exercises = await Exercises.find({}).sort({ createAt: -1 });

	res.status(200).json(exercises);
};

//get a single exercise
const getExercise = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such exercise" });
	}

	const exercise = await Exercises.findById(id);

	if (!exercise) {
		return res.status(404).json({ error: "No such exercise" });
	}

	res.status(200).json(exercise);
};

//create a new exercise
const createExercise = async (req, res) => {
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
		const exercise = await Exercises.create({ title, load, reps });
		res.status(200).json(exercise);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a exercise
const deleteRountine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such exercise" });
	}

	const exercise = await Exercises.findOneAndDelete({ _id: id });

	if (!exercise) {
		return res.status(400).json({ error: "No such exercise" });
	}

	res.status(200).json(exercise);
};

//update a exercise
const updateExercise = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such exercise" });
	}

	const exercise = await Exercises.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!exercise) {
		return res.status(400).json({ error: "No such exercise" });
	}

	res.status(200).json(exercise);
};

module.exports = {
	getExercises,
	getExercise,
	createExercise,
	deleteExercise,
	updateExercise,
};
