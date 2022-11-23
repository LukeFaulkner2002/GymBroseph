require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

function tokenSender(userEmail) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "gymbroseph@gmail.com",
			pass: "jrvrrhfskhexkbqo",
		},
	});

	const token = jwt.sign(
		{
			data: "Token Data",
		},
		"ourSecretKey",
		{ expiresIn: "10m" }
	);

	const mailConfigurations = {
		// It should be a string of sender/server email
		from: "gymbroseph@gmail.com",

		to: userEmail,

		// Subject of Email
		subject: "Email Verification",

		// This would be the text of email body
		text: `Hi! There, You have recently visited
           our website and entered your email.
           Please follow the given link to verify your email
           http://192.168.4.144:9991/verify/${token}
           Thanks`,
	};

	transporter.sendMail(mailConfigurations, function (error, info) {
		if (error) throw Error(error);
		console.log("Email Sent Successfully");
		console.log(info);
	});
}

module.exports = tokenSender();
