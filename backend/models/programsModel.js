const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const programSchema = new Schema(
	{
		userid: {
			type: Number,
			required: false,
		},
		exerciseid: {
			type: [Number],
			required: true,
		},
		routineid: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
