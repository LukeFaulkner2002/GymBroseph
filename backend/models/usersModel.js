const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		login: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
