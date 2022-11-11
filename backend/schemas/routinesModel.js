const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineSchema = new Schema(
	{
		NumberOfDays: {
			type: Number,
			required: true,
		},
		NumberOfExercises: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Routine", routineSchema);
