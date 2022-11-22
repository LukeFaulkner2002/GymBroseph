require("dotenv").config;
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	secure: false,
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASS,
	},
});

async function verifyUserEmail(name, userEmail) {
	try {
		const mailData = {
			from: process.env.AUTH_EMAIL,
			to: userEmail,
			subject: "Hello, " + name,
			text: "test",
			html: "<b> hello world </b>",
		};

		await transporter.sendMail(mailData);
	} catch (error) {
		console.log("email not sent");
		console.log(error);
	}
}

module.exports = {
	verifyUserEmail,
};
