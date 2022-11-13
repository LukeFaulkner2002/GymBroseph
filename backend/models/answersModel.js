const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answersSchema = new Schema(
	{
		Answer: {
			type: Number,
			required: true,
		},
		UserId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Answers", answersSchema);
