const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exercisesSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		musclegroup: {
			type: Number,
			required: true,
		},
		accessibiility: {
			type: Number,
			required: true,
		},
		difficulty: {
			type: Number,
			required: true,
		},
		warmupreq: {
			type: Boolean,
			required: false,
		},
		rpe: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exercises", exercisesSchema);
