Routines = require("../models/routinesModel");
mongoose = require("mongoose");

//get All routines
const getRoutines = async (req, res) => {
	const routines = await Routines.find({}).sort({ createAt: -1 });

	res.status(200).json(routines);
};

//get a single routine
const getRoutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such routine" });
	}

	const routine = await Routines.findById(id);

	if (!routine) {
		return res.status(404).json({ error: "No such routine" });
	}

	res.status(200).json(routine);
};

//create a new routine
const createRoutine = async (req, res) => {
	const { userid, numberofdays, numberofexercises } = req.body;

	let emptyFields = [];

	if (!userid) {
		emptyFields.push("userid");
	}
	if (!numberofdays) {
		emptyFields.push("load");
	}
	if (!numberofexercises) {
		emptyFields.push("numberofexercises");
	}
	if (emptyFields.length > 0) {
		return res.status(400).json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database
	try {
		const routine = await Routines.create({
			userid,
			numberofdays,
			numberofexercises,
		});
		res.status(200).json(routine);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a routine
const deleteRoutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such routine" });
	}

	const routine = await Routines.findOneAndDelete({ _id: id });

	if (!routine) {
		return res.status(400).json({ error: "No such routine" });
	}

	res.status(204).json(routine);
};

//update a routine
const updateRoutine = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such routine" });
	}

	const routine = await Routines.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!routine) {
		return res.status(400).json({ error: "No such routine" });
	}

	res.status(200).json(routine);
};

module.exports = {
	getRoutines,
	getRoutine,
	createRoutine,
	deleteRoutine,
	updateRoutine,
};
