Programss = require("../models/programsModel");
mongoose = require("mongoose");

//get All programs
const getPrograms = async (req, res) => {
	const programs = await Programs.find({}).sort({
		createAt: -1,
	});

	res.status(200).json(programs);
};

//get a single program
const getProgram = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such program" });
	}

	const program = await Programs.findById(id);

	if (!program) {
		return res.status(404).json({ error: "No such program" });
	}

	res.status(200).json(program);
};

//create a new program
const createProgram = async (req, res) => {
	const { userid, exerciseid, routineid } = req.body;

	let emptyFields = [];

	if (!userid) {
		emptyFields.push("userid");
	}
	if (!exerciseid) {
		emptyFields.push("exerciseid");
	}
	if (!routineid) {
		emptyFields.push("routineid");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database
	try {
		const program = await Programs.create({
			userid,
			exerciseid,
			routineid,
		});
		res.status(200).json(program);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a program
const deleteProgram = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such program" });
	}

	const program = await Programs.findOneAndDelete({ _id: id });

	if (!program) {
		return res.status(400).json({ error: "No such program" });
	}

	res.status(200).json(program);
};

//update a program
const updateProgram = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such program" });
	}

	const program = await Programs.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!program) {
		return res.status(400).json({ error: "No such program" });
	}

	res.status(200).json(program);
};

module.exports = {
	getPrograms,
	getProgram,
	createProgram,
	deleteProgram,
	updateProgram,
};
