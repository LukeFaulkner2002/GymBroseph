const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseroutineSchema = new Schema(
	{
		userid: {
			type: Number,
			required: true,
		},
		exerciseid: {
			type: Number,
			required: true,
		},
		routineid: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exerciseroutine", exerciseroutineSchema);
