const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exercisesSchema = new Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		MuscleGroup: {
			type: Enumerator,
			required: true,
		},
		Accessibiility: {
			type: Enumerator,
			required: true,
		},
		Difficulty: {
			type: Enumerator,
			required: true,
		},
		WarmUpReq: {
			type: Boolean,
			required: false,
		},
		RPE: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Exercises", exercisesSchema);
