const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineSchema = new Schema(
	{
		userid: {
			type: String,
			required: true,
		},
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
