const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const programSchema = new Schema(
	{
		userid: {
			type: String,
			required: true,
		},
		exerciseid: {
			type: [String],
			required: true,
		},
		routineid: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
