const Users = require("../models/usersModel");
mongoose = require("mongoose");
const blueimp = require("blueimp-md5");

//Create a user
const createUser = async (req, res) => {
	const { firstName, lastName, login, password, email } = req.body;

	let emptyFields = [];

	if (!firstName) {
		emptyFields.push("firstName");
	}
	if (!lastName) {
		emptyFields.push("lastName");
	}
	if (!login) {
		emptyFields.push("login");
	}
	if (!password) {
		emptyFields.push("password");
	}
	if (!email) {
		emptyFields.push("email");
	}

	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	// add to the database

	try {
		const user = await Users.create({
			firstName,
			lastName,
			login,
			password: blueimp(password),
			email,
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const loginUser = async (req, res) => {
	const { login, password } = req.body;

	const user = await Users.findOne({
		login: login,
		password: blueimp(password),
	});

	if (!user) {
		return res.status(404).json({ error: "No such user" });
	}

	//needs email confirmation
	if (!user.confirmed) {
		verifyUserEmail(email);
	}

	res.status(200).json(user);
};

//email
const verifyEmail = async (req, res) => {
	const { email } = req.body;

	const user = await Users.findOne({ email });

	if (!user) {
		return res.status(404).json({ error: "No such user" });
	}

	verifyUserEmail(user.firstName, user.email);

	res.status(200).json(user);
};

//Edit User
const updateUser = async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such user" });
	}

	const user = await Users.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!user) {
		return res.status(404).json({ error: "No such user" });
	}

	res.status(204).json(user);
};

module.exports = {
	createUser,
	loginUser,
	verifyEmail,
	updateUser,
};
