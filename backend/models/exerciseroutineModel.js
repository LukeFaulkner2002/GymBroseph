const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseroutineSchema = new Schema(
	{
		UserID: {
			type: Number,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		load: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exerciseroutine", workoutSchema);
