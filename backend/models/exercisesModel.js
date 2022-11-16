const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exercisesSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		musclegroup: {
			type: String,
			required: true,
		},
		accessibiility: {
			type: String,
			required: true,
		},
		warmupreq: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exercises", exercisesSchema);
