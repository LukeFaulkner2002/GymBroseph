Answers = require("../models/answersModel");
mongoose = require("mongoose");

//get All answers
const getAnswers = async (req, res) => {
	const answers = await Answers.find({}).sort({ createAt: -1 });

	res.status(200).json(answers);
};

//get a single answer
const getAnswer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such answer" });
	}

	const answer = await Answers.findById(id);

	if (!answer) {
		return res.status(404).json({ error: "No such answer" });
	}

	res.status(200).json(answer);
};

//create a new answer
const createAnswer = async (req, res) => {
	const { answer, userid } = req.body;

	let emptyFields = [];

	if (!answer) {
		emptyFields.push("answer");
	}
	if (!userid) {
		emptyFields.push("userid");
	}

	if (emptyFields.length > 0) {
		return res.status(400).json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database
	try {
		const Answer = await Answers.create({ answer, userid });
		res.status(200).json(Answer);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a answer
const deleteAnswer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such answer" });
	}

	const answer = await Answers.findOneAndDelete({ _id: id });

	if (!answer) {
		return res.status(400).json({ error: "No such answer" });
	}

	res.status(200).json(answer);
};

//update a answer
const updateAnswer = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "No such answer" });
	}

	const answer = await Answers.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!answer) {
		return res.status(400).json({ error: "No such answer" });
	}

	res.status(200).json(answer);
};

module.exports = {
	getAnswers,
	getAnswer,
	createAnswer,
	deleteAnswer,
	updateAnswer,
};
