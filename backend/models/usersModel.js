const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		login: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		confirmed: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
