const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineSchema = new Schema(
	{
		numberofdays: {
			type: Number,
			required: true,
		},
		numberofexercises: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Routine", routineSchema);
